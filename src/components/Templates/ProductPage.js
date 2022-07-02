import React from 'react'
import PropTypes from 'prop-types'
import useProductDetailsCore from '@b2s_core/src/components/ProductDetails/useProductDetailsCore'

const ProductPageTmpl = require(`@themes/${process.env.B2S_THEME_NAME}/ProductPageTmpl`).default

const ProductDetailsPage = ({ location, data, pageContext }) => {
  const ownProps = useProductDetailsCore({
    location,
    product,
  })

  return <ProductPageTmpl {...ownProps} />
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