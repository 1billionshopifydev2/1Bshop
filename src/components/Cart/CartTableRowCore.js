import React, { useState } from 'react'
import { priceFormatter, resizedImgURL } from '@b2s_core/src/utils/helpers'
import {
  getVariantPrices,
  // getProductUrlFromHandle,
  getVariantOptions,
} from '@b2s_core/src/utils/helpers_product'
import { useDispatch, useSelector } from 'react-redux'
import { getCheckoutCurrency } from '@b2s_core/src/utils/selectors'
import { updateLineItemQuantity } from '@b2s_core/src/reducers/checkout'

const CartTableRowTmpl = require(`../../../themes/${process.env.B2S_THEME_NAME}/Cart/CartTableRowTmpl`).default

const cartTableRowCore = ({ product }) => {
  const { variant, quantity, customAttributes } = product

  const [quantityFormValue, setQuantityFormValue] = useState(quantity)
  const dispatch = useDispatch()
  const currency = useSelector(getCheckoutCurrency)

  const vendorAttribute = customAttributes.find((attr) => attr.key === 'vendor')
  const image = variant?.image ? resizedImgURL(variant.image.src, 'medium') : ''
  const productVariantOptions = getVariantOptions(variant)
  const upholsteryOption = customAttributes.find((attr) => attr.key === 'Upholstery')
  const { price } = getVariantPrices(variant?.presentmentPrices, currency)
  const priceForEachProduct = priceFormatter(price, currency)
  const priceTotal = priceFormatter(price * quantity, currency)
  // const productURL = getProductUrlFromHandle(variant.product.handle)

  const handleQuantityUpdate = async () => {
    await dispatch(updateLineItemQuantity(product?.id, quantityFormValue))
  }

  const handleQuantityFormChange = (event) => {
    const value = parseInt(event.target.value.trim())
    setQuantityFormValue(isNaN(value) ? '' : value)
  }

  const ownProps = {
    product,
    image,
    variant,
    vendorAttribute,
    quantityFormValue,
    buttonDisabled: quantityFormValue === '',
    priceTotal,
    priceForEachProduct,
    productVariantOptions,
    upholsteryOption,
    // productURL,
    handleQuantityFormChange,
    handleQuantityUpdate,
  }

  return <CartTableRowTmpl {...ownProps} /> // eslint-disable-line
}

export default cartTableRowCore
