import React from 'react'
import * as Components from '../../../src/components/Product/RelatedProducts'

const RelatedProductsTmpl = props => (
  <div
    id="related-products"
    className="block block-products-carousel"
    data-layout="grid-5"
  >
    <div className="container">
      <Components.BlockHeader title={props.title}>
        <Components.BlockHeaderArrowListTmpl />
      </Components.BlockHeader>
      <div className="block-products-carousel__slider">
        <div className="block-products-carousel__preloader"></div>
        <div className="owl-carousel">
          {props.products.map((p, i) => (
            <div key={i} className="block-products-carousel__column">
              <div className="block-products-carousel__cell">
                <Components.ProductCard product={p} hideReviews />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default RelatedProductsTmpl
