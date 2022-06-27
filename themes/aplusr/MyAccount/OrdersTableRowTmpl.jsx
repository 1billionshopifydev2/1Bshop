import React, { useState } from 'react'

const OrderTableRowTmpl = props => {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleExpand = event => {
    event.preventDefault()
    setIsExpanded(prevState => !prevState)
  }

  return (
    <article className="card card border-0">
      <header className="card-header">
        <a
          // data-toggle="collapse"
          // data-target={`#order${props.order.orderNumber}`}
          href="#"
          role="button"
          aria-expanded={isExpanded ? 'true' : 'false'}
          aria-controls={`#order${props.order.orderNumber}`}
          className={props.classnames('stretched-link text-decoration-none', {
            collapsed: !isExpanded,
          })}
          onClick={toggleExpand}
        >
          <strong className="d-inline-block mr-3">
            Order ID: #{props.order.orderNumber}
          </strong>
          <span>
            Order Date:{' '}
            {props.moment(new Date(props.order.processedAt)).format('LL')}
          </span>
        </a>
      </header>
      <div
        id={`order${props.order.orderNumber}`}
        className={props.classnames('collapse border-bottom', {
          show: isExpanded,
        })}
        // data-parent="#ordersContainer"
      >
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <div className="d-flex">
                <h6 className="text-muted mb-0">Order status: </h6>
                <span className="ml-2">
                  {props.order.lineItems.edges.length ===
                  props.order.successfulFulfillments.length
                    ? 'Fulfilled'
                    : 'Unfulfilled'}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            {props.order.shippingAddress !== null && (
              <div className="col-md-8">
                <h6 className="text-muted">Delivery to</h6>
                <p className="mb-0">{`${props.order.shippingAddress.firstName} ${props.order.shippingAddress.lastName}`}</p>
                {props.order.shippingAddress.phone && (
                  <p className="mb-0">
                    <span className="text-muted">Phone:</span>{' '}
                    {props.order.shippingAddress.phone}
                  </p>
                )}
                {props.order.shippingAddress.address1 && (
                  <p className="mb-0">
                    <span className="text-muted">Location:</span>{' '}
                    {props.order.shippingAddress.address1},{' '}
                    {props.order.shippingAddress.address2 && (
                      <>{props.order.shippingAddress.address2}, </>
                    )}
                    {props.order.shippingAddress.city}{' '}
                    {props.order.shippingAddress.provinceCode},{' '}
                    {props.order.shippingAddress.country}
                  </p>
                )}
                {props.order.shippingAddress.zip && (
                  <p className="mb-0">
                    <span className="text-muted">Zip code:</span>{' '}
                    {props.order.shippingAddress.zip}
                  </p>
                )}
              </div>
            )}
            <div className="col-md-4">
              <h6 className="text-muted">Payment</h6>
              {props.priceFormatter(
                props.order.subtotalPriceV2.amount,
                props.order.currencyCode
              ) && (
                <p className="mb-0">
                  <span className="text-muted">Subtotal:</span>{' '}
                  {props.priceFormatter(
                    props.order.subtotalPriceV2.amount,
                    props.order.currencyCode
                  )}
                </p>
              )}
              {props.priceFormatter(
                props.order.totalShippingPriceV2.amount,
                props.order.currencyCode
              ) && (
                <p className="mb-0">
                  <span className="text-muted">Shipping:</span>{' '}
                  {props.priceFormatter(
                    props.order.totalShippingPriceV2.amount,
                    props.order.currencyCode
                  )}
                </p>
              )}
              {props.priceFormatter(
                props.order.totalTaxV2.amount,
                props.order.currencyCode
              ) && (
                <p className="mb-0">
                  <span className="text-muted">Tax:</span>{' '}
                  {props.priceFormatter(
                    props.order.totalTaxV2.amount,
                    props.order.currencyCode
                  )}
                </p>
              )}
              {props.priceFormatter(
                props.order.totalPriceV2.amount,
                props.order.currencyCode
              ) && (
                <p className="mb-0 b">
                  <span className="text-muted">Total:</span>{' '}
                  {props.priceFormatter(
                    props.order.totalPriceV2.amount,
                    props.order.currencyCode
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="table-responsive px-2">
          <table className="table table-hover">
            <tbody>
              {props.order.lineItems.edges.map(
                edge =>
                  edge.node.variant && (
                    <tr key={edge.node.variant.id}>
                      <td colSpan="3">
                        <p className="title mb-0">
                          {edge.node.variant.product.title}
                        </p>
                        <var className="price text-muted">
                          {props.priceFormatter(
                            edge.node.variant.priceV2.amount,
                            edge.node.variant.priceV2.currencyCode
                          )}
                        </var>
                      </td>
                      <td>
                        <div className="text-center">
                          SKU:
                          <br />
                          {edge.node.variant.sku || '-'}
                        </div>
                      </td>
                      <td>
                        <div className="text-center">
                          Quantity:
                          <br />
                          {edge.node.quantity}
                        </div>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  )
}

export default OrderTableRowTmpl
