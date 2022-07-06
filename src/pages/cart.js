import React from 'react'
import useCartCore from '@b2storefront/b2s_core/dist/components/Cart/useCartCore'

const CartTmpl = require(`@themes/${process.env.B2S_THEME_NAME}/Templates/CartTmpl`)
  .default

const CartPage = () => {
  const ownProps = useCartCore()

  return <Cart {...ownProps} />
}

export default CartPage
