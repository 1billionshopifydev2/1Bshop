import React from 'react'

const WishlistTableTmpl = props => (
  <div className="card">
    <div className="table-responsive">
      <table className={`table table-borderless table-wishlist`}>
        <thead className="text-muted">
          <tr className="small text-uppercase">
            {props.rows.map(row => (
              <th
                key={row.key}
                className={`wishlist__column wishlist__column--${row.key}`}
              >
                {row.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>  
            {props.items.map(item => props.wishlistProductRows(props.rows, item))}
        </tbody>
      </table>
    </div>
  </div>
)
export default WishlistTableTmpl
