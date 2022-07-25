import React from 'react'
import PropTypes from 'prop-types'
import useProductDetailsCore from '@b2storefront/b2s_core/dist/components/ProductDetails/useProductDetailsCore'
import useDebug from '@b2storefront/b2s_core/dist/hooks/useDebug'
import { useDispatch } from 'react-redux'

const ProductPageTmpl = require(`@themes/${process.env.B2S_THEME_NAME}/Templates/ProductPageTmpl`).default

const ProductDetailsPage = ({ location, data, pageContext }) => {
  const dispatch = useDispatch()
  const ownProps = useProductDetailsCore({
    location,
    product: pageContext.product,
  })

  ownProps.dispatch = dispatch

  console.log(dispatch)
  console.log(ownProps)

  useDebug('ProductPageTmpl properties:', ownProps)

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