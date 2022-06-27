import React from 'react'
import * as Components from '../../src/components/TrackOrderPage/TrackOrderPageCore'

// PROPS DESCRIPTION
// returns {
//   id => Unique page ID
//   title => HTML inside id="title"
//   subtitle => HTML inside id="subtitle"
//   content => HTML inside id="content"
// }

const TrackOrderTmpl = props => (
  <Components.Layout>
    <Components.SEO title="Track Your Order" />
    <Components.PageHeading title="Track Order" blue textCenter />
    {props.loaded && (
      <div className="block">
        <div className="container">
          <div className="row justify-content-center">
            {props.customer && props.loaded && !props.showResult && (
              <div className="col-xl-5 col-lg-6 col-md-8">
                <div className="card flex-grow-1 mb-0 mt-5">
                  <div className="card-body">
                    <p className="mb-4 pt-2">Please enter your order number</p>
                    <form onSubmit={props.handleSubmit(props.onSubmit)}>
                      <div className="form-group">
                        <label htmlFor="orderId">Order ID</label>
                        <input
                          type="text"
                          name="orderId"
                          className={`form-control ${
                            props.errors.orderId ? 'error' : ''
                          }`}
                          placeholder="Order ID"
                          ref={props.register({
                            required: 'Order ID is required',
                            pattern: {
                              value: /^[0-9]+$/i,
                              message: 'Order ID should contain only numbers',
                            },
                          })}
                        />
                        {props.errors.orderId && (
                          <div className="invalid-feedback d-block">
                            {props.errors.orderId.message}
                          </div>
                        )}
                      </div>
                      <div className="pt-3">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg btn-block"
                          disabled={props.isProcessing}
                        >
                          {props.isProcessing ? 'Loading' : 'Track'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
            {props.customer && props.loaded && props.showResult && (
              <div className="card flex-grow-1 mb-0 mt-2 mt-lg-5">
                <div className="card-body">
                  <a
                    href="#"
                    className="d-flex align-items-center"
                    onClick={e => props.onBackHandle(e)}
                  >
                    <span>« Back to order search</span>
                  </a>
                </div>
                <div className="card-table">
                  <div className="card-body">
                    {props.order.length ? (
                      <Components.OrderTableTmpl {...props.tableProps} />
                    ) : (
                      <h3 className="text-center">
                        You do not have such an order
                      </h3>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
  </Components.Layout>
)

TrackOrderTmpl.propTypes = Components.componentPropTypes
TrackOrderTmpl.defaultProps = Components.componentDefaultProps
export default TrackOrderTmpl
