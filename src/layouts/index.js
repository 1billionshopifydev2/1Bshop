/* eslint-disable */

import 'svgxuse'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import ErrorBoundary from '@b2s_core/src/components/ErrorBoundary'
import { createCheckout, refreshCheckout, recoverCheckout } from '@b2s_core/src/reducers/checkout'
import { initializeSession } from '@b2s_core/src/reducers/session'
import { setToken } from '@b2s_core/src/utils/session'

import { HeaderDesktopCore } from '../components/HeaderDesktopCore'
import { FooterCore } from '../components/FooterCore'
import { MobileSidebar } from '../components/MobileSidebar'

const LayoutTmpl =
  require(`@themes/${process.env.B2S_THEME_NAME}/LayoutTmpl`).default

const Layout = ({children}) => {
  const { checkout, session } = useSelector((store) => store)

  const dispatch = useDispatch()

  useEffect(() => {
    if (checkout.model && checkout.model.id) {
      dispatch(recoverCheckout(checkout.model.id))

      return
    }
    
    const existingCheckoutID = localStorage.getItem('shopify_checkout_id')
    if (existingCheckoutID) {
      dispatch(refreshCheckout(existingCheckoutID))
    } else {
      dispatch(createCheckout())
    }
  }, [checkout?.model?.id])
  
  useEffect(() => {
    if (session.loaded) {
      return
    }
    dispatch(initializeSession())
  }, [session])
  
  useEffect(() => {
    const parts = location.search.split('?token=')
    const token = parts && parts[1]
    if (token) {
      setToken(token)
      initializeSession()
      navigate('/')
    }
  }, [])

  const ownProps = {
    children,
  }
  
  return (
    <div>
      <LayoutTmpl {...ownProps} />
    </div>
  )
}

Layout.propTypes = {
  lazy: PropTypes.bool,
  renderNewsletter: PropTypes.bool,
  isMenuOpen: PropTypes.bool,
  mainClassAffix: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  isMenuOpen: false,
}

export { Layout, ErrorBoundary, HeaderDesktopCore, FooterCore, MobileSidebar }
