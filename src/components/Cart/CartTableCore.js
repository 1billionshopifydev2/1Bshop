import React from 'react'
import PropTypes from 'prop-types'
import Link from '@b2s_core/src/utils/Link'
import { priceFormatter } from '@b2s_core/src/utils/helpers'
import cartTableRowCore from './CartTableRowCore'

const CartTableTmpl = require(`../../../themes/${process.env.B2S_THEME_NAME}/Cart/CartTableTmpl`)
  .default

const cartTableCore = ({ model }) => {
  const ownProps = {
    model,
    priceFormatter,
  }

  return <CartTableTmpl {...ownProps} />
}

cartTableCore.propTypes = {
  model: PropTypes.object.isRequired,
}

cartTableCore.defaultProps = {
  model: {},
}

export { cartTableCore, cartTableRowCore, Link }
