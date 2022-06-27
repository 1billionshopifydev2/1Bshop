import React from 'react'
import * as Components from '../../../src/components/Home/SpecialOffersSection'

const SpecialOffersTmpl = (props) => (
  <div
    className={props.classNames('', {
      [`${props.customClass}`]: props.customClass,
    })}
  >
    <Components.BlockHeader title={props.description} />
    <div className="block-product-columns__column">
      {props.products.map((p, i) => {
        if (i < 3) {
          return (
            <div className="block-product-columns__item" key={i}>
              <Components.ProductCard product={p} horizontal imgSize="small" itemSide />
            </div>
          )
        }
      })}
    </div>
  </div>
)
 

export default SpecialOffersTmpl
