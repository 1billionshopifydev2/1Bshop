import React from 'react'
import PropTypes from 'prop-types'
import { productDetailsCore } from './ProductDetailsCore'

const ProductDetailsTmpl =
  require(`@themes/${process.env.B2S_THEME_NAME}/ProductDetailsPage/ProductDetailsPageTmpl`).default

const ProductDetailsPage = ({ location, data, pageContext }) => {
  const Component = productDetailsCore(
    location,
    pageContext.product,
    data,
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