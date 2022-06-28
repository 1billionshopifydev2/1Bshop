/* eslint-disable */

import React, { Fragment, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import * as Components from 'src/components/ProductDetails/ProductDetailsCore'
import { getPrices } from '../../src/b2s_core/src/utils/helpers_product'
import ProductShopifySection from './ProductDetails/Sections/ProductShopifySection'

const ProductDetailsTmpl = (props) => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }


  }, [])

  return (
    <Components.Layout>
      <Components.SEO title={props.seo.title} description={props.seo.description} />
      <Helmet
        script={[
          {
            type: 'application/ld+json',
            innerHTML: `
            {
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": "${props.title}",
              "image": [${props.images.map((image) => `"${image.originalSrc}"`).slice(0, 5)}],
              "description": "${props.description}",
              "sku": "${props.variant.sku}",
              "brand": {
              "@type": "Brand",
              "name": "${props.brand}"
              },
              "offers": {
                "@type": "Offer",
                "url": "${process.env.GATSBY_SHOP_URL}${props.productUrl}",
                "priceCurrency": "${getPrices(props).min?.currencyCode}",
                "price": "${getPrices(props).min?.amount}",
                "availability": "${props.availableForSale}"
              }
            }
          `,
          },
        ]}
      />
      <ProductShopifySection {...props} />

      <a className="anchor-offset" id="details"></a>
      <div className="details" data-b2s-path="ProductDetailsTmpl.jsx" data-b2s-pid={props.productId}>
        <div className="container">
          <hr className="border-dark border my-2" />
          <div className="row">
            <div className="col">
              <div className="d-flex">
                <div className="icon">
                  <div className="me-2">
                    <svg className="d-block" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 20" height="20">
                      <path d="M17.5,4H1.5A1.5,1.5,0,0,0,0,5.5v9A1.5,1.5,0,0,0,1.5,16h16A1.5,1.5,0,0,0,19,14.5v-9A1.5,1.5,0,0,0,17.5,4Zm0,1h.09l-7.53,5A1.15,1.15,0,0,1,9,10L1.41,5H17.5Zm0,10H1.5a.5.5,0,0,1-.5-.5V5.93l7.39,4.93a2.14,2.14,0,0,0,2.22,0L18,5.93V14.5A.5.5,0,0,1,17.5,15Z" />
                    </svg>
                  </div>
                </div>
                <div className="text">
                  <a href={`mailto:orders@aplusrstore.com?subject=${props.vendorTitle} ${props.title}`}>Question? Email us</a>
                </div>
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex">
                <div className="icon">
                  <div className="me-2">
                    <svg className="d-block" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" height="20">
                      <path d="M18.5,4H17V1.5A1.5,1.5,0,0,0,15.5,0H4.5A1.5,1.5,0,0,0,3,1.5V4H1.5A1.5,1.5,0,0,0,0,5.5v9A1.5,1.5,0,0,0,1.5,16H3v2.5A1.5,1.5,0,0,0,4.5,20h11A1.5,1.5,0,0,0,17,18.5V16h1.5A1.5,1.5,0,0,0,20,14.5v-9A1.5,1.5,0,0,0,18.5,4ZM4,1.5A.5.5,0,0,1,4.5,1h11a.5.5,0,0,1,.5.5V4H4Zm12,17a.5.5,0,0,1-.5.5H4.5a.5.5,0,0,1-.5-.5V12H16Zm3-4a.5.5,0,0,1-.5.5H17V12h.5a.5.5,0,0,0,0-1H2.5a.5.5,0,0,0,0,1H3v3H1.5a.5.5,0,0,1-.5-.5v-9A.5.5,0,0,1,1.5,5h17a.5.5,0,0,1,.5.5Z" />
                      <path d="M14.5,14h-9a.5.5,0,0,1,0-1h9a.5.5,0,0,1,0,1" />
                      <path d="M14.5,16h-9a.5.5,0,0,1,0-1h9a.5.5,0,0,1,0,1" />
                      <path d="M14.5,18h-9a.5.5,0,0,1,0-1h9a.5.5,0,0,1,0,1" />
                      <path d="M16.5,7a.5.5,0,1,0,.5.5A.5.5,0,0,0,16.5,7Zm0,2A1.5,1.5,0,1,1,18,7.5,1.5,1.5,0,0,1,16.5,9Z" />
                    </svg>
                  </div>
                </div>
                <div className="text">
                  <a href={`${props.productUrl}-print`} target="_blank">
                    Spec Sheet
                  </a>
                </div>
              </div>
            </div>
          </div>
          <hr class="border-dark my-2 mb-5" />
        </div>
      </div>
    </Components.Layout>
  )
}

ProductDetailsTmpl.propTypes = Components.componentPropTypes
ProductDetailsTmpl.defaultProps = Components.componentDefaultProps
export default ProductDetailsTmpl
