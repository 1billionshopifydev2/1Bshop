/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import { priceFormatter, promoPercent } from '@b2s_core/src/utils/helpers'

const PricesTmpl = require(`../../../../themes/${process.env.B2S_THEME_NAME}/Product/Shared/PricesTmpl`)
  .default

const Prices = ({ price, priceRangeV2, old, currency, quantity, showAffirm = true }) => {
  const discounted = old && old > price
  let dataAmount = (price && `${price.replace('.', '')}`) || `${priceRangeV2.minCompareAtPrice.amount && priceRangeV2.minCompareAtPrice.amount.replace('.', '')}0`
  const ownProps = {
    discounted,
    dataAmount,
    priceFormatter,
    promoPercent,
    currency,
    quantity,
    price,
    priceRangeV2,
    old,
    showAffirm
  }

  return <PricesTmpl {...ownProps} />
}

Prices.propTypes = {
  price: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  old: PropTypes.number,
  currency: PropTypes.string,
  quantity: PropTypes.number,
}

export default Prices
