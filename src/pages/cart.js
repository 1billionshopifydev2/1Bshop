import React from 'react'
import { cartCore } from '../components/Cart/CartCore'

const CartTmpl = require(`../../themes/${process.env.B2S_THEME_NAME}/Cart/CartTmpl`)
  .default

const CartPage = () => {
  const Component = cartCore()(CartTmpl)
  return <Component />
}

export default CartPage
