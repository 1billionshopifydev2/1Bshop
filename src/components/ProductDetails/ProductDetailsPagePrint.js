import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { productDetailsCore } from './ProductDetailsCore'

const ProductDetailsPrintTmpl =
  require(`../../../themes/${process.env.B2S_THEME_NAME}/ProductDetailsPrintTmpl`).default

const ProductDetailsPagePrint = ({ location, pageContext }) => {
  const product = { ...pageContext.product }
  const Component = productDetailsCore(location, product)(ProductDetailsPrintTmpl)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.print()
      }, 500)
    }
  }, [])

  return <Component />
}


ProductDetailsPagePrint.propTypes = {
  pageContext: PropTypes.object,
  location: PropTypes.object,
}

ProductDetailsPagePrint.defaultProps = {
  pageContext: {},
  location: {},
}

export default ProductDetailsPagePrint
