import React from 'react'
import * as Components from '../../../src/components/Cart/CartCore'

// Props description
// product - product object
// vendor - product vendor
// variant - default variant of product
// quantity - quanitity from state
// handleQuantityChange - quantity quantity function
// handleQuantityUpdate - quantity update function
// productVariantOptions - variant's selected options
// priceForEachProduct - product price converted to user currency 
// priceTotal - products price in quantity
// image - default product image
// productURL - full product URL
// upateQuantity - quantity update function

const CartTableRowTmpl = props => (
  <div className="border-dark border-top py-3">
    <div className="row">
      <div className="col-3 col-lg-2">
        {props.image && (
          <img className="img-fluid" src={props.image} loading="lazy" />
        )}
      </div>
      <div className="col col-lg-8">
        <div className="row">
          <div className="col-lg-6">
            <div className="fw-400 fs-14">
              {props.vendorAttribute && props.vendorAttribute.value}
            </div>
            <p className="fw-500 fs-14">
              {props.product.title}
            </p>
            {props.productVariantOptions.length > 0 && props.productVariantOptions.map((option, index) => (
              <div key={index} className="cart-product-option">
                {option.name}: {option.value}
              </div>
            ))}
            {
              props.upholsteryOption &&
              <div className="cart-product-option">
                {props.upholsteryOption.value}
              </div>
            }
            <div className="availability">
              {props.variant.available && (
                <div className="text-success my-3">
                  In stock and ready for quick ship!
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-12 col-lg-6 mb-3 fw-400 fs-14">
                {props.priceForEachProduct}
              </div>
              <div className="col-6 col-lg-3">
                <div className="form-group">
                  <input
                    onChange={props.handleQuantityFormChange} value={props.quantityFormValue}
                    className="form-control border-dark text-center"
                  />
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <button
                  type="button"
                  disabled={props.buttonDisabled}
                  onClick={props.handleQuantityUpdate}
                  className="btn btn-link"
                >
                  Update
                      </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-auto col-lg-2">
        <div className="text-end fw-400 fs-14">
          {props.priceTotal}
        </div>
      </div>
    </div>
  </div>
)

export default CartTableRowTmpl
