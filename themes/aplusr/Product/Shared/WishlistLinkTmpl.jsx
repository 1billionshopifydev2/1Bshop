import React from 'react'

const WishlistLinkTmpl = props =>
  props.isInWishlist ? (
    <a
      href="#"
      className="wishlist-link active"
      onClick={props.handleClick}
      disabled={props.wishlistLoading}
    >
      <i className="fa fa-heart"></i>
    </a>
  ) : (
    <a
      href="#"
      className="wishlist-link small d-block"
      onClick={props.handleClick}
      disabled={props.wishlistLoading}
    >
      <i className="fa fa-heart mr-2"></i>
      Add to wishlist
    </a>
  )

export default WishlistLinkTmpl
