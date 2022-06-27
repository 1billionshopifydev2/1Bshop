import React from 'react'
import * as Components from '../../../src/components/Product/ProductCard'


const ProductCardItemSideTmpl = (props) =>
  <figure className="itemside mb-4">
    <Components.Link to={props.productURL} className="aside">
      <img src={props.image} alt={props.title} className="img-sm w-auto" loading="lazy" />
    </Components.Link>
    <figcaption className="info align-self-start w-100">
      <Components.Link to={props.productURL} className="title">
        {props.title}
      </Components.Link>
      <div className="d-flex align-items-start justify-content-between">
        <Components.Prices price={props.price} old={props.oldPrice} currency={props.currency} />
        <button
          className="btn btn-sm btn-outline-primary float-right"
          type="button"
          onClick={() => props.dispatch(props.addLineItem(props.id, 1))}
          disabled={!props.availableForSale}
        >
          {props.availableForSale ? 'Add to Cart' : 'Out of stock'}
          <i className="fa fa-shopping-cart pl-2"></i>
        </button>
      </div>
    </figcaption>
  </figure>


export default ProductCardItemSideTmpl
