import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import Link from '@b2s_core/src/utils/Link'
import { login, removeErrors } from '@b2s_core/src/reducers/session'
import { associateCustomer } from '@b2s_core/src/reducers/checkout'
import { RecoverForm } from './RecoverForm'
import useLoginForm from '@b2s_core/src/components/Forms/useLoginForm'

const LoginFormTmpl = require(`../../../themes/${process.env.B2S_THEME_NAME}/Forms/LoginFormTmpl`)
  .default

const LoginForm = ({ redirectAfterTo }) => {
  const carouselRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const cleanErrors = () => {
      dispatch(removeErrors())
    }
    cleanErrors()
    carouselRef.current.addEventListener('slide.bs.carousel', cleanErrors)
    return () => {
      carouselRef.current.removeEventListener('slide.bs.carousel', cleanErrors)
    }
  }, [])

  const ownProps = useLoginForm({ login, associateCustomer, redirectAfterTo })
  return <LoginFormTmpl ref={carouselRef} {...ownProps} />
}

LoginForm.propTypes = {
  redirectAfterTo: PropTypes.string,
}

export { LoginForm, RecoverForm, Link }
