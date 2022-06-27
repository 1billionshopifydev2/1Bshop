import React from 'react'
import * as Components from '../../../src/components/Home/BrandsSection'


const BrandsTmpl = props => (
  <div className="block block-brands mb-5 bg py-5">
    <div className="container">
      <div className="block-header">
        <h3 className="block-header__title">Brands</h3>
      </div>
      <div className="block-brands__slider">
        <div className="owl-carousel">
          {props.vendors.map((vendor, i) => {
            if (
              props.brandsForSlider.includes(vendor.fieldValue.toLowerCase()) &&
              vendor.totalCount > 0
            ) {
              const vendorUrl = props.getProductVendorUrlFromVendor(vendor.fieldValue)
              return (
                <figure className="box item-logo" key={i}>
                  <Components.Link to={vendorUrl}>
                    <img
                      src={`images/logos/new/logo-${vendor.fieldValue}.png`}
                      alt={i}
                      loading="lazy"
                    />
                  </Components.Link>
                  <figcaption className="border-top pt-3">
                    {vendor.totalCount} Products
                  </figcaption>
                </figure>
              )
            }
          })}
        </div>
      </div>
    </div>
  </div>
)

export default BrandsTmpl
