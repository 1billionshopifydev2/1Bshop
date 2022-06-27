import React from 'react'
import OrdersTableRowTmpl from './OrdersTableRowTmpl'

const OrderTableTmpl = props => (
  <div className="table-responsive-sm">
    {((props.show && props.orders.slice(0, props.show)) || props.orders).map(
      order => (
        <OrdersTableRowTmpl
          key={order.orderNumber}
          order={order}
          priceFormatter={props.priceFormatter}
          moment={props.moment}
          classnames={props.classnames}
        />
      )
    )}
  </div>
)

export default OrderTableTmpl
