/* eslint-disable */

import React from 'react'

import * as Components from '../../../src/components/Cart/CartTableCore'
import CartCheckoutButtonTmpl from './CartCheckoutButtonTmpl'

const CartTableTmpl = ({ model, priceFormatter }) => (
  <div className="row">
    <div className="col">
      <div className="border-dark border-top">
        <div className="border-dark border-top">
          <div className="row">
            <div className="col col-lg-6">
              <div className="py-2">
                Product
                     </div>
            </div>
            <div className="col-lg-2 d-lg-block d-none">
              <div className="py-2">
                List Price
                     </div>
            </div>
            <div className="col-lg-1 d-lg-block d-none">
              <div className="py-2">
                Quantity
                     </div>
            </div>
            <div className="col-auto col-lg-3">
              <div className="text-end py-2">
                Subtotal
                     </div>
            </div>
          </div>
        </div>
      </div>

      {model.lineItems.map(product => (
        <Components.cartTableRowCore key={product.variant?.id} product={product} />
      ))}

      <div className="border-dark border-top">
        <div className="border-dark border-top">
          <div className="checkout">
            <div className="row">
              <div className="col-lg-8">
                <div className="py-3 pb-4">
                  <em className="text-secondary">
                    Image might not match your selection.
                    </em>
                </div>
                <Components.Link className="btn btn-primary h-auto border-0 px-4 py-2" to="/">
                  continue shopping
                  </Components.Link>
              </div>
              <div className="col-lg-4">
                <div className="py-3 pb-4">
                  <div className="row justify-content-between">
                    <div className="col-auto">
                      Subtotal
                      </div>
                    <div className="col-auto">
                      {priceFormatter(model.totalPrice)}
                    </div>
                  </div>

                  {/* <p className="affirm-as-low-as" data-page-type="cart" style="font-size:12px;" data-affirm-color="black" data-amount="18000">Starting at <span className="affirm-ala-price">$62</span>/mo with <span className="__affirm-logo __affirm-logo-black __ligature__affirm_full_logo__ __processed">Affirm</span>. <a className="affirm-modal-trigger" aria-label="Learn more (opens in modal)" href="javascript:void(0)">Learn more</a></p> */}

                </div>
                <CartCheckoutButtonTmpl
                  total={model?.totalPrice}
                  url={model?.webUrl}
                  disabled={!model || !Boolean(model.lineItems.length) }
                />
                <div className="text-center py-1">
                  Shipping, taxes, and discounts calculated at checkout.
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
)
export default CartTableTmpl
