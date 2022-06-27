import React from 'react'
import * as Components from '../../../src/components/Home/FeaturedProductsSection'

const FeaturedProductsTmpl = (props) => (
  <section className="section-products padding-y-sm bg">
    <div className="container">
      <header className="section-heading">
        <Components.Link
          to="/category/featured-products"
          className="btn btn-outline-primary float-right"
        >
          See all
        </Components.Link>
        <h3 className="section-title">Featured Products</h3>
      </header>

      <div className="row">
        {props.products.slice(0, 8).map((p, i) => (
          <div key={i} className="col-md-6 col-lg-3 mb-4">
            <Components.ProductCard product={p} minimalCard />
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default FeaturedProductsTmpl
