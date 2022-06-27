import React from 'react'
import * as Components from '../../../src/components/Cart/CartCore'

const CartTmpl = props => (
  <Components.Layout>
    <Components.SEO title="Your Shopping Cart" />
    <div className="py-lg-5 pb-5">
      <div className="container">
        {props.model && props.model.lineItems.length === 0 ? (
          props.loading ? (
            <Components.Loader />
          ) : (
            <CartEmpty />
          )
        ) : props.model ? (
            <Components.cartTableCore model={props.model} />
        ) : (
          <Components.Loader />
        )}
      </div>
    </div>
  </Components.Layout>
)

const CartEmpty = () => (
  <div className="row justify-content-center">
    <div className="col-auto">
      <div className="text-center">
        <h1 className="mb-4">
          Your cart is empty
        </h1>
        <Components.Link className="btn btn-primary border-0 px-4 py-2" to="/">
          Continue shopping
        </Components.Link>
      </div>
    </div>
  </div>
)

export default CartTmpl
