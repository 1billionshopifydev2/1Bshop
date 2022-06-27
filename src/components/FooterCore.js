import React from 'react'
import Link from '@b2s_core/src/utils/Link'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import Newsletter from './Shared/Newsletter'

const FooterTmpl = require(`../../themes/${process.env.B2S_THEME_NAME}/FooterTmpl`).default;

const FooterCore = ({ renderNewsletter }) => {
  const { isLoggedIn } = useSelector(store => store.session)

  return <FooterTmpl renderNewsletter={renderNewsletter} isLoggedIn={isLoggedIn} />
}

FooterCore.propTypes = {
  renderNewsletter: PropTypes.bool
}

export {
  FooterCore,
  Link,
  Newsletter
}