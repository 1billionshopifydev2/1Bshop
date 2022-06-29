import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Layout } from '../../../src/layouts/index'
import SEO from '@b2s_core/src/components/seo'
import { generateProductURL } from '../../../src/utils/routing'
import { componentDefaultProps, componentPropTypes } from '../../../src/components/ProductDetailsPage/ProductDetailsCore'

const ProductDetailsTmpl = (props) => {
  console.log(props)
  
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }


  }, [])

  return (
    <Layout>
      <SEO title={props.product.seo.title} description={props.product.seo.description} />
      <Helmet
        script={[
          {
            type: 'application/ld+json',
            innerHTML: `
            {
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": "${props.product.title}",
              "image": [${props.product.images.map((image) => `"${image.url}"`).slice(0, 5)}],
              "description": "${props.product.description}",
              "sku": "${props.product.variant.sku}",
              "brand": {
              "@type": "Brand",
              "name": "${props.product.brand}"
              },
              "offers": {
                "@type": "Offer",
                "url": "${generateProductURL(props.product.slug)}",
                "priceCurrency": "${props.product.currency}",
                "price": "${props.product.prices.min}",
                "availability": "${props.product.availability}"
              }
            }
          `,
          },
        ]}
      />
      Product Details Page for {props.product.title}
    </Layout>
  )
}

ProductDetailsTmpl.propTypes = componentPropTypes
ProductDetailsTmpl.defaultProps = componentDefaultProps

export default ProductDetailsTmpl
