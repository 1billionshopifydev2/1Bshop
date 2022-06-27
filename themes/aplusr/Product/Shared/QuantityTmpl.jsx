import React from 'react'

const QuantityTmpl = props => (
  <div className="input-group mb-3 input-spinner">
    <div className="input-group-prepend">
      <button
        className="btn btn-light"
        type="button"
        id="button-plus"
        onClick={() => {
          if (!props.variant.availableForSale) {
            return
          }
          props.setQuantity(props.quantity + 1)
        }}
        disabled={props.variant?.price === '0.00'}
      >
        +
      </button>
    </div>
    <input
      id="product-quantity"
      className="input-number__input form-control form-control-lg"
      type="text"
      value={props.quantity}
      onChange={e => {
        const newValue = Number(e.target.value)
        props.setQuantity(newValue > 0 ? newValue : 1)
      }}
    />
    <div className="input-group-append">
      <button
        className="btn btn-light"
        type="button"
        id="button-minus"
        onClick={() => {
          if (props.quantity === 1 || !props.variant.availableForSale) {
            return
          }

          props.setQuantity(props.quantity - 1)
        }}
      >
        −
      </button>
    </div>
  </div>
)

export default QuantityTmpl
