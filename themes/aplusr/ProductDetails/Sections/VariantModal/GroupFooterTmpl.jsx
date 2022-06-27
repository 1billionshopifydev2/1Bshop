/* eslint-disable */

import React, { useContext } from 'react'

import { priceFormatter } from '../../../../../src/b2s_core/src/utils/helpers'
import { VariantContext } from '../../../../../src/components/VariantModal/VariantContext'

const GroupFooterTmpl = ({ addToCart, ...props }) => {
  const { swatchVariant: { variant, group } } = useContext(VariantContext)

  return (
    <div className="modal-footer border-dark p-0">
      <div className="container-fluid px-2 px-lg-3">
        <div className="row no-gutters">
          <div className="col-lg-3 px-2">
            <div className="title">
              <div className="text-left">
                <h2 className="my-2">{props.productTitle}</h2>
              </div>
              <div className="text-left">
                {priceFormatter(props.variantContext.swatchVariant.selectedSwatchPrice)}
              </div>
            </div>
          </div>
          <div className="col-lg-4 d-lg-block d-none px-0">
            <div className="options">
              <div className="my-3">
                <div className="option">
                  <div className="row no-gutters">
                    <div className="col px-2">
                      <div className="name">
                        <div className="text-left">
                          <p className="text-secondary m-0">Base Finish</p>
                        </div>
                      </div>
                    </div>
                    <div className="col px-2">
                      <div className="value">
                        <div className="text-left">
                          <p className="m-0">{ variant?.title }</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="option">
                  <div className="row no-gutters">
                    <div className="col px-2">
                      <div className="name">
                        <div className="text-left">
                          <p className="text-secondary m-0">Upholstery Group</p>
                        </div>
                      </div>
                    </div>
                    <div className="col px-2">
                      <div className="value">
                        <div className="text-left">
                          <p className="m-0">{ group }</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2 d-lg-block d-none px-2">
            <div className="image">
              <div className="my-3">
                <div className="card d-inline-block p-4">
                  <div className="card-img-overlay rounded-circle bg-light p-0" style={{ borderWidth: '2px !important' }}>
                    {
                      Boolean(variant.image) &&
                      <img className="rounded-circle preview w-100" src={`${variant?.image?.url}`} />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 px-2">
            <div className="my-lg-3 mb-3">
              <button
                onClick={addToCart}
                className={`btn btn-block btn-primary text-lowercase h-auto py-2${!variant?.title ? ' disabled' : ''}`}
              >
                Add to Cart
              </button>
              <div className="availability">
                <div className="text-center">
                  <div className="my-2">
                    Average lead time: 10-12 weeks
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupFooterTmpl