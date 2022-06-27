import React from 'react'
import * as Components from '../../../src/components/Wishlist/WishlistTableCore'
// Props description
// item - product object
// image - default product image
// variant - default variant of product
// formattedPrice - price converted to user currency 
// oldPrice - default discount price
// formattedOldPrice - discount price converted to user currency 
// productURL - full product URL
// addToCart - function for adding product to cart
// remove - function for removing product from cart
// row - row info, managed in WishlistTable

const WishlistTableRowTmpl = (props) => {
    switch (props.row.key) {
      case 'product':
        return (
          <figure className="itemside align-items-center">
            <div className="aside">
              <Components.Link className="cart-table__product-name" to={props.productURL}>
                <img src={props.image} alt={props.item.title} className="img-sm" loading="lazy" />
              </Components.Link>
            </div>
            <figcaption className="info">
              <Components.Link className="cart-table__product-name" to={props.productURL} className="title text-dark">{props.item.title}</Components.Link>
            </figcaption>
          </figure>
        )
      case 'price':
        return (<div className="price-wrap">
          <div className="price">{props.formattedPrice}</div>
          {props.oldPrice && <div className="text-muted">{props.formattedOldPrice}</div>}
        </div>)
      case 'stock':
        return (<>
          {props.variant.availableForSale ?
            <div className="badge bg-success">In Stock</div>
            :
            <div className="badge bg-danger">Out of Stock</div>
          }
        </>)
      case 'tocart':
        return (
          <button
            type="button"
            className="btn btn-primary btn-sm add-to-cart"
            onClick={() => props.dispatch(props.addToCart(props.variant.id, 1))}
            disabled={!props.variant.availableForSale}
          >
            {props.variant.availableForSale ? 'Add to Cart' : 'Out of stock'}
            <i className="fas fa-shopping-cart pl-2"></i>
          </button>
        )
      case 'remove':
        return (
          <a href="#" onClick={() => props.dispatch(props.remove(props.item.id))} className="btn btn-light btn-sm btn-with-blue">Remove<i className="fas fa-trash pl-2"></i></a>
        )
      default:
        return null
    }  
}

// WishlistTableRowTmpl.propTypes = {
//   item: PropTypes.object.isRequired,
//   variant: PropTypes.object.isRequired,
//   formattedPrice: PropTypes.string,
//   formattedOldPrice: PropTypes.string,
//   image: PropTypes.string,
//   productURL: PropTypes.string.isRequired,
//   dispatch: PropTypes.func.isRequired,
//   addToCart: PropTypes.func.isRequired,
//   remove: PropTypes.func.isRequired,
//   column: PropTypes.object.isRequired
// }

// WishlistTableRowTmpl.defaultProps = {
//   item: {},
//   variant: {},
//   formattedPrice: '',
//   formattedOldPrice: '',
//   image: '',
//   productURL: '',
//   dispatch: () => { },
//   addToCart: () => { },
//   remove: () => { },
//   column: {}
// }


export default WishlistTableRowTmpl
