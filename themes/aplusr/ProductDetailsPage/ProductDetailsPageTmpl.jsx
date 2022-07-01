import React from 'react'
import { Layout } from '../../../src/layouts/index'
import SEO from '@b2s_core/src/components/seo'
import { componentDefaultProps, componentPropTypes } from '../../../src/components/ProductDetailsPage/ProductDetailsCore'
import { useCustomJavascript } from '../../../src/b2s_core/src/hooks/useCustomJavascript'
import { AddToHead } from '../../../src/b2s_core/src/components/snippets/AddToHead'
import { JSONLD } from '../../../src/b2s_core/src/components/snippets/JSONLD'

/** @param {ProductDetailsTmpl.propTypes} props */
const ProductDetailsTmpl = ({ product }) => {  
  useCustomJavascript(() => {
    console.log('Hello World')
  })

  return (
    <Layout>
      <SEO title={product.seo.title} description={product.seo.description} />
      <JSONLD type="product" data={product} />
      <AddToHead>
        <script type="text/javascript" src="test.js"></script>
      </AddToHead>
      Product Details Page for {product.title}
    </Layout>
  )
}

ProductDetailsTmpl.propTypes = componentPropTypes
ProductDetailsTmpl.defaultProps = componentDefaultProps

export default ProductDetailsTmpl
