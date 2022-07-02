/* eslint-disable */

import { defineAsyncActions } from '../utils/define-action'
import Client from '../utils/client'
import { apiIdToId, associateCustomerCheckout, shopifyIdToApi, storefrontIdToId } from '../utils/api'
import { getToken } from '../utils/session'
import axios from 'axios'

// Define actions
const CREATE = defineAsyncActions('CREATE_CHECKOUT')
const UPDATE_CHECKOUT = defineAsyncActions('UPDATE_CHECKOUT')
const REFRESH = defineAsyncActions('REFRESH_CHECKOUT')
const UPDATE_ADDRESS = defineAsyncActions('UPDATE_CHECKOUT_ADDRESS')
const UPDATE_ITEMS = defineAsyncActions('UPDATE_CHECKOUT_ITEMS')
const APPLY_COUPON = defineAsyncActions('APPLY_COUPON')
const REMOVE_COUPON = defineAsyncActions('REMOVE_COUPON')
const ASSOCIATE_CUSTOMER = defineAsyncActions('ASSOCIATE_CUSTOMER')

const client = Client.getInstance()

const isSplitTrafficMode = typeof window !== 'undefined' && window.location.host === 'aplusrstore.com'
const initialState = {
  model: null,
  loading: null,
  userErrors: [],
}

const getCheckout = async (checkoutId) => {
  let checkout = await client.checkout.fetch(checkoutId)

  if (!checkout) {
    /* Retry */
    checkout = await client.checkout.fetch(checkoutId)
  }

  return checkout
}

const getVariantIdFromLineItem = (lineItemId, model) => {
  const lineItem = model?.lineItems.find(lineItem => lineItem.id === lineItemId)

  if (!lineItem) {
    return
  }

  return lineItem.variant?.id 
}

export const recoverCheckout = (checkoutId) => {
  return async (dispatch) => {
    if (!isSplitTrafficMode) {
      return
    }

    const checkout = await getCheckout(checkoutId)
    const shopifyCartResponse = await axios.get(`https://aplusrstore.com/cart.json`)
    const shopifyCart = shopifyCartResponse.data

    const isEmptyShopifyCart = !Array.isArray(shopifyCart?.items) || !shopifyCart.items.length
    const isEmptyCart = !Array.isArray(checkout?.lineItems) || !checkout.lineItems.length

    for (let shopifyItem of shopifyCart.items) {
      const lineItem = checkout?.lineItems.find(lineItem => apiIdToId(lineItem.variant?.id) == shopifyItem.variant_id)

      if (lineItem && lineItem.quantity != shopifyItem.quantity) {
        await dispatch(updateLineItemQuantity(lineItem.id, shopifyItem.quantity))
      }

      if (isEmptyCart || !lineItem) {
        await dispatch(addNoShopifyLineItem(shopifyIdToApi('ProductVariant', shopifyItem.variant_id), shopifyItem.quantity, shopifyItem.vendor))
      }
    }

    for (let lineItem of checkout.lineItems) {
      const shopifyItem = shopifyCart.items.find(shopifyItem => shopifyItem.variant_id == apiIdToId(lineItem.variant?.id))

      if (isEmptyShopifyCart || !shopifyItem) {
        await dispatch(removeLineItem(lineItem.id))
      }
    }
  }
}

export const createCheckout = (presentmentCurrencyCode) => {
  return async (dispatch) => {
    dispatch({ type: CREATE.PENDING, payload: { data: checkout } })
    const checkout = await client.checkout.create({
      presentmentCurrencyCode,
    })
    localStorage.setItem('shopify_checkout_id', checkout?.id)
    dispatch({ type: CREATE.FULFILLED, payload: { data: checkout } })
  }
}

export const updateCurrencyForCheckout = (presentmentCurrencyCode) => {
  return async (dispatch, getState) => {
    dispatch({ type: UPDATE_CHECKOUT.PENDING })

    const model = getState().checkout.model
    let currentCheckout = await client.checkout.fetch(model?.id)
    const lineItemsToUpdate = []
    currentCheckout.lineItems.forEach((p) => {
      lineItemsToUpdate.push({
        variantId: p.variant?.id,
        quantity: parseInt(p.quantity, 10),
      })
    })

    try {
      const checkout = await client.checkout.create({
        presentmentCurrencyCode,
      })
      localStorage.setItem('shopify_checkout_id', checkout?.id)
      dispatch({ type: UPDATE_CHECKOUT.FULFILLED, payload: { data: checkout } })

      dispatch(addLineItems(lineItemsToUpdate))
    } catch (e) {
      console.error(e)
      dispatch(createCheckout())
    }
  }
}

export const resetCompletedCart = (checkout) => {
  if (checkout.completedAt !== null) {
    localStorage.removeItem('shopify_checkout_id')
    location.reload()
  }
}

export const refreshCheckout = (id) => {
  return async (dispatch) => {
    dispatch({ type: REFRESH.PENDING })
    try {
      let checkout = await client.checkout.fetch(id)

      if (!checkout) {
        /* Retry */
        checkout = await client.checkout.fetch(id)
      }

      if (checkout) {
        resetCompletedCart(checkout)

        dispatch({ type: REFRESH.FULFILLED, payload: { data: checkout } })
      } else {
        dispatch({
          type: REFRESH.REJECTED,
          payload: 'Fetching shopify cart error.',
        })
        dispatch(createCheckout())
      }
    } catch (e) {
      console.error(e)
      dispatch({
        type: REFRESH.REJECTED,
        payload: 'Fetching shopify cart error.',
      })
      dispatch(createCheckout())
    }
  }
}

export const associateCustomer = () => {
  return async (dispatch, getState) => {
    dispatch({ type: ASSOCIATE_CUSTOMER.PENDING })

    try {
      const model = getState().checkout.model
      await associateCustomerCheckout(model?.id, getToken())

      dispatch({ type: ASSOCIATE_CUSTOMER.FULFILLED })
      dispatch(refreshCheckout(model?.id))
    } catch (e) {
      console.error(e)
      dispatch({ type: ASSOCIATE_CUSTOMER.REJECTED })
    }
  }
}

export const addLineItems = (products, updateShopify = true) => {
  return async (dispatch, getState) => {
    if (!products) {
      console.error("Can't find array with products") // eslint-disable-line
      return
    }

    dispatch({ type: UPDATE_ITEMS.PENDING })

    const lineItemsToUpdate = []
    products.forEach((element) => {
      lineItemsToUpdate.push({
        variantId: element.variantId,
        quantity: parseInt(element.quantity, 10),
      })
    })
    const model = getState().checkout.model
    try {
      const checkout = await client.checkout.addLineItems(
        model?.id,
        lineItemsToUpdate
      )

      if (isSplitTrafficMode && updateShopify) {
        await axios.post(`https://aplusrstore.com/cart/add.js`, {
          items: products.map(product => ({
            'id': storefrontIdToId(product.variantId),
            'quantity': parseInt(element.quantity, 10),
          }))
        })
      }

      resetCompletedCart(checkout)

      dispatch({
        type: UPDATE_ITEMS.FULFILLED,
        payload: { data: checkout },
      })
    } catch (e) {
      console.error(e)
    }
  }
}

export const addLineItem = (id, quantity, vendor, afterAdd, custom, updateShopify = true) => {
  return async (dispatch, getState) => {
    if (!id || !quantity) {
      console.error('Both a size and quantity are required.')
      return
    }

    dispatch({ type: UPDATE_ITEMS.PENDING })

    let customAttributes = [{ key: 'vendor', value: vendor }]

    if (custom) {
      customAttributes = [...customAttributes, ...custom]
    }

    const lineItemsToUpdate = [
      {
        variantId: id,
        quantity: parseInt(quantity, 10),
        customAttributes,
      },
    ]
    const model = getState().checkout.model

    try {
      const checkout = await client.checkout.addLineItems(
        model?.id,
        lineItemsToUpdate
      )
      if (isSplitTrafficMode && updateShopify) {
        const properties = {}
        for (let customAttribute of customAttributes) {
          if (customAttribute.key !== 'vendor') {
            properties[customAttribute.key] = customAttribute.value
          }
        }
        await axios.post(`https://aplusrstore.com/cart/add.js`, {
          items: [{
            'id': storefrontIdToId(id),
            'quantity': parseInt(quantity, 10),
            "properties": properties
          }]
        })
      }
      resetCompletedCart(checkout)
      if (afterAdd) afterAdd()
      dispatch({
        type: UPDATE_ITEMS.FULFILLED,
        payload: { data: checkout },
      })
    } catch (e) {
      console.error(e)
    }
  }
}

export const addNoShopifyLineItem = (id, quantity, vendor, afterAdd, custom) => {
  return async (dispatch, getState) => {
    if (!id || !quantity) {
      console.error('Both a size and quantity are required.')
      return
    }

    dispatch({ type: UPDATE_ITEMS.PENDING })

    let customAttributes = [{ key: 'vendor', value: vendor }]

    if (custom) {
      customAttributes = [...customAttributes, ...custom]
    }

    const lineItemsToUpdate = [
      {
        variantId: id,
        quantity: parseInt(quantity, 10),
        customAttributes,
      },
    ]
    const model = getState().checkout.model

    try {
      const checkout = await client.checkout.addLineItems(
        model?.id,
        lineItemsToUpdate
      )
      resetCompletedCart(checkout)
      if (afterAdd) afterAdd()
      dispatch({
        type: UPDATE_ITEMS.FULFILLED,
        payload: { data: checkout },
      })
    } catch (e) {
      console.error(e)
    }
  }
}

export const removeLineItem = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: UPDATE_ITEMS.PENDING })

    const model = getState().checkout.model
    const variantId = getVariantIdFromLineItem(id, model)

    try {
      const checkout = await client.checkout.removeLineItems(model?.id, [id])

      if (isSplitTrafficMode) {
        await axios.post(`https://aplusrstore.com/cart/change.js`, {
          'id': storefrontIdToId(variantId),
          'quantity': 0
        })
      }

      resetCompletedCart(checkout)

      dispatch({
        type: UPDATE_ITEMS.FULFILLED,
        payload: { data: checkout },
      })
    } catch (e) {
      console.error(e)
    }
  }
}

export const removeLineItems = (ids) => {
  return async (dispatch, getState) => {
    dispatch({ type: UPDATE_ITEMS.PENDING })

    const model = getState().checkout.model

    try {
      const checkout = await client.checkout.removeLineItems(model?.id, ids)

      if (isSplitTrafficMode) {
        for (let i = 0; i < ids.length; i++) {
          const variantId = getVariantIdFromLineItem(ids[i], model)
          await axios.post(`https://aplusrstore.com/cart/change.js`, {
            'id': storefrontIdToId(variantId),
            'quantity': 0
          })
        }
      }

      resetCompletedCart(checkout)

      dispatch({
        type: UPDATE_ITEMS.FULFILLED,
        payload: { data: checkout },
      })
    } catch (e) {
      console.error(e)
    }
  }
}

export const updateLineItemQuantity = (id, quantity) => {
  return async (dispatch, getState) => {
    dispatch({ type: UPDATE_ITEMS.PENDING })

    const model = getState().checkout.model
    const lineItemsToUpdate = [
      {
        id,
        quantity: parseInt(quantity, 10),
      },
    ]
    const variantId = getVariantIdFromLineItem(id, model)

    try {
      const checkout = await client.checkout.updateLineItems(
        model?.id,
        lineItemsToUpdate
      )

      await axios.post(`https://aplusrstore.com/cart/change.js`, {
        'id': storefrontIdToId(variantId),
        'quantity': parseInt(quantity, 10)
      })

      resetCompletedCart(checkout)

      dispatch({
        type: UPDATE_ITEMS.FULFILLED,
        payload: { data: checkout },
      })
    } catch (e) {
      console.error(e)
    }
  }
}

export const applyCoupon = (code) => {
  return async (dispatch, getState) => {
    dispatch({ type: APPLY_COUPON.PENDING })

    const model = getState().checkout.model
    const checkout = await client.checkout.addDiscount(model.id, code)

    if (checkout.userErrors.length > 0) {
      const errors = checkout.userErrors.map((error) => ({
        field: error.field[0],
        message: error.message,
      }))
      dispatch({ type: APPLY_COUPON.REJECTED, payload: errors })
      throw new Error('Invalid discount code')
    }

    dispatch({ type: APPLY_COUPON.FULFILLED, payload: { data: checkout } })
  }
}

export const removeCoupon = () => {
  return async (dispatch, getState) => {
    dispatch({ type: REMOVE_COUPON.PENDING })

    const model = getState().checkout.model
    const checkout = await client.checkout.removeDiscount(model?.id)
    dispatch({ type: REMOVE_COUPON.FULFILLED, payload: { data: checkout } })
  }
}

export const updateEmail = (email) => {
  return async (dispatch, getState) => {
    dispatch({ type: UPDATE_ADDRESS.PENDING })

    const model = getState().checkout.model

    const checkout = await client.checkout.updateEmail(model?.id, email)

    if (checkout.userErrors.length > 0) {
      const errors = checkout.userErrors.map((error) => ({
        field: error.field[1],
        message: error.message,
      }))
      dispatch({ type: UPDATE_ADDRESS.REJECTED, payload: errors })
      throw new Error('Form validation error')
    }

    dispatch({ type: UPDATE_ADDRESS.FULFILLED, payload: { data: checkout } })
  }
}

export const updateShippingAddress = (shippingAddress) => {
  return async (dispatch, getState) => {
    dispatch({ type: UPDATE_ADDRESS.PENDING })

    const model = getState().checkout.model
    const checkout = await client.checkout.updateShippingAddress(
      model?.id,
      shippingAddress
    )

    if (checkout.userErrors.length > 0) {
      const errors = checkout.userErrors.map((error) => ({
        field: error.field[1],
        message: error.message,
      }))
      dispatch({ type: UPDATE_ADDRESS.REJECTED, payload: errors })
      throw new Error('Form validation error')
    }

    dispatch({ type: UPDATE_ADDRESS.FULFILLED, payload: { data: checkout } })
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE.PENDING:
    case UPDATE_CHECKOUT.PENDING:
    case UPDATE_ITEMS.PENDING:
      return {
        ...state,
        loading: true,
      }

    case CREATE.FULFILLED:
    case UPDATE_CHECKOUT.FULFILLED:
    case REFRESH.FULFILLED:
      return {
        ...state,
        model: action.payload.data,
        loading: false,
      }

    case UPDATE_ITEMS.FULFILLED:
    case APPLY_COUPON.FULFILLED:
    case REMOVE_COUPON.FULFILLED:
      return {
        ...state,
        model: action.payload.data,
        loading: false,
      }

    case APPLY_COUPON.PENDING:
      return {
        ...state,
        userErrors: [],
      }

    case APPLY_COUPON.REJECTED:
      return {
        ...state,
        userErrors: state.userErrors.concat(action.payload),
      }

    case UPDATE_ADDRESS.PENDING:
      return {
        ...state,
        userErrors: [],
        processing: true,
      }

    case UPDATE_ADDRESS.FULFILLED:
      return {
        ...state,
        model: action.payload.data,
        processing: false,
      }

    case UPDATE_ADDRESS.REJECTED:
      return {
        ...state,
        userErrors: state.userErrors.concat(action.payload),
        processing: false,
      }

    default:
      return state
  }
}
