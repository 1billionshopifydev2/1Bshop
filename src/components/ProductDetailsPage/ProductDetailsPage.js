/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { productDetailsCore } from './ProductDetailsCore'

const ProductDetailsTmpl =
  require(`@themes/${process.env.B2S_THEME_NAME}/ProductDetailsTmpl`).default

const ProductDetailsPage = ({ location, data, pageContext }) => {
  const product = { ...pageContext.product }

  const Component = productDetailsCore(
    location,
    product,
    data,
    pageContext.upholsteries
  )(ProductDetailsTmpl)

  return <Component />
}

ProductDetailsPage.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
  pageContext: PropTypes.object,
}

ProductDetailsPage.defaultProps = {
  data: {},
  location: {},
}

export default ProductDetailsPage