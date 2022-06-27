import React from 'react'
import * as Components from '../../../src/components/Header/WishlistIcon'

const WishlistIconTmpl = props => (
  <Components.Link to="/wishlist" className={`${props.className}`}>
    <div className="icontext">
      <div className="icon">
        <i
          className={`${
            props.isMobile ? 'icon-xs' : 'icon-sm'
          } rounded-circle border fa fa-heart`}
        ></i>
        <span className="notify">{props.qty}</span>
      </div>
    </div>
  </Components.Link>
)

export default WishlistIconTmpl
