/* eslint-disable */

import React from 'react'

const PricesTmpl = (props) => (
  <>
    <p className="text-secondary mb-2">
      {!!props.price && props.priceFormatter(props.quantity ? props.price * props.quantity : props.price, props.currency || 'USD')}
      {!props.price && props.priceFormatter(props.priceRangeV2.minVariantPrice.amount)}
      {Number(props.priceRangeV2.minVariantPrice.amount) < Number(props.old) && (
        <del className="px-1 text-danger">
          {props.priceFormatter(props.old)}
        </del>
      )}
      <br />
    </p>
    {props.showAffirm && <p className="affirm-as-low-as" data-page-type="product" data-amount={props.dataAmount}></p>}
  </>
)
export default PricesTmpl
