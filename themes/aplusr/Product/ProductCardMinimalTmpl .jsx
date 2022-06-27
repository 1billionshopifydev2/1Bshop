import React from 'react'
import * as Components from '../../../src/components/Product/ProductCard'


const ProductCardMinimalTmpl = (props) =>
  <div className="card card-product-grid">
    <div className="img-wrap">
      <div
        className="flex-row product-card__badges-list"
        data-mf="product - promo_label"
      >
        {props.badges.map(badge => (
          <span
            key={badge[0]}
            className={`badge ${badge[0] &&
              `product-card__badge--${badge[0].toLowerCase()}`}`}
            style={{ backgroundColor: badge[1] ? badge[1] : null }}
          >
            {badge[0]}
          </span>
        ))}
      </div>
      <Components.Link to={props.productURL} className="img-wrap">
        <img src={props.image} alt={props.title} loading="lazy" />
      </Components.Link>
      <a
        href="#"
        className="d-flex flex-row justify-content-center align-items-center btn-overlay"
        type="button"
        onClick={e => {
          e.preventDefault()
          props.openQuickShop()
        }}
      >
        <i className="fa fa-search-plus mr-2"></i>
        <span>Quick view</span>
      </a>
    </div>
    <figcaption className="info-wrap border-top">
      <Components.Link to={props.productURL} className="title">
        {props.title}
      </Components.Link>
      <div className="mt-1">
        <Components.Prices price={props.price} old={props.oldPrice} currency={props.currency} />
      </div>
    </figcaption>
  </div>


export default ProductCardMinimalTmpl
