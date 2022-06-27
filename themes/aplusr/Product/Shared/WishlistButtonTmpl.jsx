import React from 'react'

const WishlistButtonTmpl = props => {
  if (props.isBtnView) {
    return (
      <a
        href="#"
        className={`btn btn-light btn-with-blue ${props.className} ${
          props.isInWishlist ? 'active' : ''
        }`}
        onClick={props.handleClick}
        disabled={props.wishlistLoading}
      >
        <i className="fa fa-heart"></i>
      </a>
    )
  }

  return (
    <span className="topbar">
      <a
        className={`float-right ${props.className} ${
          props.isInWishlist ? 'active' : ''
        }`}
        href="#"
        onClick={props.handleClick}
        disabled={props.wishlistLoading}
      >
        <i className="fa fa-heart"></i>
      </a>
    </span>
  )
}

export default WishlistButtonTmpl
