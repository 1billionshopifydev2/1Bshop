import React from 'react'
import * as Components from '../../../../src/components/Header/Cart/CartIcon'

const CartIconTmpl = props => (
  <div className={props.className}>
    {props.isMobile ? (
      <Components.Link to="/cart">
        <div className="icontext">
          <div className="icon">
            <i className="icon-xs rounded-circle border fa fa-shopping-cart"></i>
            <span className="notify">{props.qty}</span>
          </div>
        </div>
      </Components.Link>
    ) : (
      <a href="#" data-offset="0,30" id="cartDropdown">
        <div className="icontext">
          <div className="icon">
            <i className="icon-sm rounded-circle border fa fa-shopping-cart"></i>
            <span className="notify">{props.qty}</span>
          </div>
        </div>
      </a>
    )}
    {props.model && (
      <div className="dropdown-menu dropdown-menu-right p-3">
        <div className="dropcart__body">
          {props.dropdownProps.items.length > 0 && (
            <div className="dropcart__products-list">
              {props.dropdownProps.items.map((item, index) => (
                <Components.CartProduct key={index} item={item} />
              ))}
            </div>
          )}
          {props.dropdownProps.items.length === 0 && (
            <>
              <div className="text-center">Your cart is empty.</div>
            </>
          )}
          {props.dropdownProps.items.length > 0 && (
            <>
              <hr className="dropdown-divider" />
              <div className="mb-3">
                <table className="w-100">
                  <tbody>
                    {props.dropdownProps.summary.shipping && (
                      <tr>
                        <th className="w-50">Shipping</th>
                        <td className="w-50 text-right">
                          {props.dropdownProps.priceFormatter(
                            props.dropdownProps.summary.shipping,
                            props.dropdownProps.currency
                          )}
                        </td>
                      </tr>
                    )}
                    {props.dropdownProps.summary.subtotal && (
                      <tr>
                        <th className="w-50">Subtotal</th>
                        <td className="w-50 text-right">
                          {props.dropdownProps.priceFormatter(
                            props.dropdownProps.summary.subtotal,
                            props.dropdownProps.currency
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <p>All discounts will be reflected at the checkout</p>
              </div>
              <div className="d-flex justify-content-between">
                <Components.Link
                  className="btn btn-secondary text-white w-50 mr-2"
                  to="/cart"
                >
                  View Cart
                </Components.Link>
                <a
                  className="btn btn-primary text-white w-50 ml-2"
                  href={props.dropdownProps.checkoutUrl}
                  target="_blank"
                >
                  Checkout
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    )}
  </div>
)

export default CartIconTmpl
