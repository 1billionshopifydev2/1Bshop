import React from 'react'
import * as Components from '../../../../src/components/Header/Cart/CartProduct'

const CartProductTmpl = props => (
  <figure className="itemside mb-3">
    <div className="aside">
      <Components.Link
        to={props.productURL}
        state={{ variantId: props.variantId }}
      >
        <img
          src={props.image}
          alt={props.title}
          className="img-sm"
          loading="lazy"
        />
      </Components.Link>
    </div>
    <figcaption className="info align-self-center">
      <p className="title">
        <Components.Link
          to={props.productURL}
          state={{ variantId: props.variantId }}
        >
          {props.title}
        </Components.Link>
      </p>
      {props.itemVariantOptions.length > 0 && (
        <ul>
          {props.itemVariantOptions.map((option, index) => (
            <li key={index}>
              <span>{option.name}</span>: <span>{option.value}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="d-flex align-items-center">
        <div className="input-group input-spinner">
          <div className="input-group-prepend">
            <button
              className="btn btn-light"
              type="button"
              onClick={e => props.onQtyChange(e, props.quantity - 1)}
            >
              -
            </button>
          </div>
          <span className="form-control">{props.quantity}</span>
          <div className="input-group-append">
            <button
              className="btn btn-light"
              type="button"
              onClick={e => props.onQtyChange(e, props.quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div>
          ×&nbsp;<span>{props.priceFormatted}</span>
        </div>
      </div>
      <a
        href="#"
        className="float-right"
        onClick={e => props.openRemoveModal(e)}
      >
        <i className="fa fa-trash"></i>
      </a>
    </figcaption>
  </figure>
)

export default CartProductTmpl
