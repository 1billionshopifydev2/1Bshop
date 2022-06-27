import React from 'react'
import { navigate } from 'gatsby'
import Link from '@b2s_core/src/utils/Link'


import SEO from '@b2s_core/src/components/seo'

const Page404Tmpl = require(`../../themes/${process.env.B2S_THEME_NAME}/404Tmpl`)
  .default

const NotFoundPage = ({ location }) => {
  const handleSearchForm = evt => {
    evt.preventDefault()
    const q = new FormData(evt.target).get('q') ?? ''
    navigate(`/pages/search-results?q=${q}`)
  }

  const splitPath = location.pathname.split('/')
  const defaultSearchParam = splitPath[splitPath.length - 1] ?? ''

  const handlePreviousPage = () => {
    navigate(-1)
  }

  const ownProps = {
    handleSearchForm,
    defaultSearchParam,
    state: location.state,
    handlePreviousPage,
  }

  return <Page404Tmpl {...ownProps} />
}

export default NotFoundPage
export { SEO, Link }
