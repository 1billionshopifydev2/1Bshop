import React from 'react'
import * as Components from '../../../src/components/Compare/CompareTableCore'

// Props description
// row - row info, managed in CompareTable
// product - product object
// variant - default variant of product
// formattedPrice - price converted to user currency 
// oldPrice - default discount price
// formattedOldPrice - discount price converted to user currency 
// image - default product image
// productURL - full product URL
// dispatch - redux action
// addToCart - function for adding product to cart
// remove - function for removing product from cart

const CompareTableRowTmpl = props => {
  switch (props.row.key) {
    case 'product': {
      return (
        <Components.Link to={props.productURL}>
          <div>
            <img src={props.image} alt={props.product.title} loading="lazy" />
          </div>
          <div className="title text-dark">{props.product.title}</div>
        </Components.Link>
      )
    }
    case 'rating':
      return (
        <Components.ReviewsStats rating={props.product.rating} handle={props.product.handle} inCard />
      )
    case 'stock':
      return props.variant.availableForSale ? (
        <div className="badge bg-success">In Stock</div>
      ) : (
          <div className="badge bg-danger">Out of Stock</div>
        )
    case 'price':
      return (
        <div className="price-wrap">
          <div className="price">{props.formattedPrice}</div>
          {props.oldPrice && (
            <small className="text-muted text-center">
              {props.formattedOldPrice}
            </small>
          )}
        </div>
      )
    case 'tocart':
      return (
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => props.dispatch(props.addToCart(props.variant.id, 1))}
          disabled={!props.variant.availableForSale}
        >
          {props.variant.availableForSale ? 'Add to Cart' : 'Out of stock'}
          <i className="fas fa-shopping-cart pl-2"></i>
        </button>
      )
    case 'sku':
      return props.variant.sku ? props.variant.sku : props.product.sku ? props.product.sku : '-'
    case 'weight':
      return props.variant.weight && props.variant.weightUnit
        ? `${props.variant.weight} ${props.variant.weightUnit}`
        : '-'
    case 'remove':
      return (
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => props.dispatch(props.remove(props.product.id))}
        >
          Remove
          <i className="fas fa-trash pl-2"></i>
        </button>
      )
    default:
      return null
  }
}
 
export default CompareTableRowTmpl
