import React, { useState, useEffect } from 'react'
import classnames from 'classnames'

import { trackInitCheckout } from '../../../src/b2s_core/src/utils/tracking'

const CartCheckoutButtonTmpl = ({ total, url, disabled }) => {
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleClick = () => {
    setIsRedirecting(true)
  }

  useEffect(() => {
    if (isRedirecting) {
      // trackInitCheckout({ value: total })
      setTimeout(() => {
        window.location.href = url
      }, 1500)
    }
  }, [isRedirecting])

  return (
    <button
      onClick={handleClick}
      className={classnames('btn btn-block btn-primary h-auto px-4 py-2', { disabled: disabled || isRedirecting })}
    >
      Checkout{' '}
      {isRedirecting && (
        <>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">Loading...</span>
        </>
      )}
    </button>
  )
}

export default CartCheckoutButtonTmpl