import { defineAction, defineAsyncActions } from '../utils/define-action'
import { getToken, setToken, clearSession } from '../utils/session'
import {
  getCustomer,
  createCustomerAccessToken,
  createCustomer,
  recoverCustomer,
  resetCustomer,
  addCustomerAddress,
  updateCustomerAddress,
  deleteCustomerAddress,
  updateCustomerDefaultAddress,
  fetchWishlist,
  createWishlist,
  updateWishlist,
  updateCustomer,
} from '../utils/api'

const INITIALIZE_SESSION = defineAsyncActions('INITIALIZE_SESSION')
const LOGIN = defineAsyncActions('LOGIN')
const LOGOUT = defineAction('LOGOUT')
const SIGNUP = defineAsyncActions('SIGNUP')
const RECOVER = defineAsyncActions('RECOVER')
const RESET = defineAsyncActions('RESET')
const PASSWORD = defineAsyncActions('PASSWORD')
const CHANGE_PASSWORD = defineAsyncActions('CHANGE_PASSWORD')
const UPDATE = defineAsyncActions('UPDATE')
const ADD_ADDRESS = defineAsyncActions('ADD_ADDRESS')
const UPDATE_ADDRESS = defineAsyncActions('UPDATE_ADDRESS')
const UPDATE_DEFAULT_ADDRESS = defineAsyncActions('UPDATE_DEFAULT_ADDRESS')
const DELETE_ADDRESS = defineAsyncActions('DELETE_ADDRESS')
const GET_WISHLIST = defineAsyncActions('GET_WISHLIST')
const ADD_PRODUCT_TO_WISHLIST = defineAsyncActions('ADD_PRODUCT_TO_WISHLIST')
const REMOVE_PRODUCT_FROM_WISHLIST = defineAsyncActions(
  'REMOVE_PRODUCT_FROM_WISHLIST'
)
const GET_COMPARELIST = defineAsyncActions('GET_COMPARELIST')
const ADD_PRODUCT_TO_COMPARELIST = defineAsyncActions(
  'ADD_PRODUCT_TO_COMPARELIST'
)
const REMOVE_PRODUCT_FROM_COMPARELIST = defineAsyncActions(
  'REMOVE_PRODUCT_FROM_COMPARELIST'
)
const REMOVE_ERRORS = defineAsyncActions('REMOVE_ERRORS')

const initialState = {
  loaded: false,
  isLoggedIn: false,
  isOldPasswordCorrect: false,
  customer: null,
  wishlist: null,
  wishlistLoading: false,
  comparelist: [],
  compareListLoading: false,
}

export const initializeSession = () => {
  return async (dispatch) => {
    const token = getToken()
    if (!token) {
      dispatch({ type: INITIALIZE_SESSION.FULFILLED })
      return
    }

    dispatch({ type: INITIALIZE_SESSION.PENDING })

    try {
      const res = await getCustomer(token)
      dispatch({
        type: INITIALIZE_SESSION.FULFILLED,
        payload: {
          ...res.data.customer,
          addresses: res.data.customer.addresses.edges.map((edge) => edge.node),
          orders: res.data.customer.orders.edges.map((edge) => edge.node),
        },
      })

      dispatch(getWishlist())
    } catch (e) {
      console.error(e)
      dispatch({ type: INITIALIZE_SESSION.REJECTED })
    }
  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN.PENDING })

    const res = await createCustomerAccessToken(email, password)

    if (
      res.data.customerAccessTokenCreate.customerUserErrors &&
      res.data.customerAccessTokenCreate.customerUserErrors.length > 0
    ) {
      dispatch({
        type: LOGIN.REJECTED,
        payload: res.data.customerAccessTokenCreate.customerUserErrors,
      })
      throw new Error('Invalid credentials')
    }

    // Get customer data with token
    const { accessToken, expiresAt } =
      res.data.customerAccessTokenCreate.customerAccessToken

    setToken(accessToken, expiresAt)

    // We hard refresh the window, and customer is fetched on initialize
    // Uncomment this if we don't refresh anymore, and want it to navigate in the SPA
    /* const customerDataRes = await getCustomer(accessToken)
    dispatch({
      type: LOGIN.FULFILLED,
      payload: {
        ...customerDataRes.data.customer,
        addresses: customerDataRes.data.customer.addresses.edges.map(
          edge => edge.node
        ),
        orders: customerDataRes.data.customer.orders.edges.map(
          edge => edge.node
        ),
      },
     }) */
  }
}

export const signup = (
  email,
  password,
  firstName,
  lastName,
  isAutoLogin = false
) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP.PENDING })

    const res = await createCustomer(email, password, firstName, lastName)

    if (
      res.data.customerCreate.customerUserErrors &&
      res.data.customerCreate.customerUserErrors.length > 0
    ) {
      dispatch({
        type: SIGNUP.REJECTED,
        payload: res.data.customerCreate.customerUserErrors,
      })
      throw new Error(res.data.customerCreate.customerUserErrors[0].message)
    } else {
      dispatch({
        type: SIGNUP.FULFILLED,
      })
      if (isAutoLogin) {
        await dispatch(login(email, password))
      }
    }
  }
}

export const recover = (email) => {
  return async (dispatch) => {
    dispatch({ type: RECOVER.PENDING })

    const res = await recoverCustomer(email)

    if (res.errors && res.errors.length > 0) {
      dispatch({
        type: RECOVER.REJECTED,
        payload: res.errors,
      })
      throw new Error(
        'Resetting password limit exceeded. Please try again later.'
      )
    }

    if (
      res.data.customerRecover.customerUserErrors &&
      res.data.customerRecover.customerUserErrors.length > 0
    ) {
      dispatch({
        type: RECOVER.REJECTED,
        payload: res.data.customerRecover.customerUserErrors,
      })
      throw new Error('Invalid email')
    }

    return dispatch({
      type: RECOVER.FULFILLED,
    })
  }
}

export const reset = (resetUrl, password) => {
  return async (dispatch) => {
    dispatch({ type: RESET.PENDING })

    const res = await resetCustomer(resetUrl, password)

    if (res.errors && res.errors.length > 0) {
      dispatch({
        type: RESET.REJECTED,
        payload: res.errors,
      })
      throw new Error('Invalid reset url')
    }

    if (
      res.data.customerResetByUrl.customerUserErrors &&
      res.data.customerResetByUrl.customerUserErrors.length > 0
    ) {
      dispatch({
        type: RESET.REJECTED,
        payload: res.data.customerResetByUrl.customerUserErrors,
      })
      throw new Error('Invalid reset url')
    }

    // Auto login after reset success
    const { accessToken, expiresAt } =
      res.data.customerResetByUrl.customerAccessToken

    setToken(accessToken, expiresAt)
  }
}

export const checkIfPasswordCorrect = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: PASSWORD.PENDING })

    const res = await createCustomerAccessToken(email, password)

    if (
      res.data.customerAccessTokenCreate.customerUserErrors &&
      res.data.customerAccessTokenCreate.customerUserErrors.length > 0
    ) {
      dispatch({
        type: PASSWORD.REJECTED,
        payload: 'Current password is wrong',
      })
      throw new Error('Current password is wrong')
    }
    dispatch({
      type: PASSWORD.FULFILLED,
    })
  }
}

export const updateCustomerPassword = (customer) => {
  return async (dispatch) => {
    dispatch({ type: CHANGE_PASSWORD.PENDING })

    const res = await updateCustomer(getToken(), customer)
    if (res.errors && res.errors.length > 0) {
      dispatch({
        type: CHANGE_PASSWORD.REJECTED,
        payload: res.errors,
      })
      throw new Error('Something went wrong. Try later')
    }

    const { accessToken, expiresAt } =
      res.data.customerUpdate.customerAccessToken

    setToken(accessToken, expiresAt)

    const customerDataRes = await getCustomer(accessToken)

    dispatch({
      type: INITIALIZE_SESSION.FULFILLED,
      payload: {
        ...customerDataRes.data.customer,
        addresses: customerDataRes.data.customer.addresses.edges.map(
          (edge) => edge.node
        ),
        orders: customerDataRes.data.customer.orders.edges.map(
          (edge) => edge.node
        ),
      },
    })
  }
}

export const updateCustomerInfo = (data) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE.PENDING })

    const res = await updateCustomer(getToken(), data)
    if (
      res.data.customerUpdate &&
      res.data.customerUpdate.customerUserErrors.length > 0
    ) {
      dispatch({
        type: UPDATE.REJECTED,
        payload: res.data.customerUpdate.customerUserErrors,
      })
      throw new Error('Something went wrong. Try later')
    }
  }
}

export const addAddress = (address, isSetDefault) => {
  return async (dispatch) => {
    dispatch({ type: ADD_ADDRESS.PENDING })

    const res = await addCustomerAddress(address, getToken())

    if (res.errors && res.errors.length > 0) {
      dispatch({
        type: ADD_ADDRESS.REJECTED,
        payload: 'Form data is invalid',
      })
      throw new Error('Form data is invalid')
    }

    if (res.data.customerAddressCreate.customerAddress && isSetDefault) {
      await dispatch(
        updateDefaultAddress(res.data.customerAddressCreate.customerAddress.id)
      )
    }

    dispatch({
      type: ADD_ADDRESS.FULFILLED,
      payload: res.data.customerAddressCreate.customerAddress,
    })
  }
}

export const updateAddress = (id, address) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ADDRESS.PENDING })

    const res = await updateCustomerAddress(getToken(), id, address)
    if (res.errors && res.errors.length > 0) {
      dispatch({
        type: UPDATE_ADDRESS.REJECTED,
        payload: 'Form data is invalid',
      })
      throw new Error('Form data is invalid')
    }

    dispatch({
      type: UPDATE_ADDRESS.FULFILLED,
      payload: res.data.customerAddressUpdate.customerAddress,
    })
  }
}

export const updateDefaultAddress = (addressId) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_DEFAULT_ADDRESS.PENDING })

    const res = await updateCustomerDefaultAddress(getToken(), addressId)
    if (
      res.data.customerDefaultAddressUpdate.customerUserErrors &&
      res.data.customerDefaultAddressUpdate.customerUserErrors.length > 0
    ) {
      dispatch({
        type: UPDATE_DEFAULT_ADDRESS.REJECTED,
        payload: res.data.customerDefaultAddressUpdate.customerUserErrors,
      })
      throw new Error('Form data is invalid')
    }

    dispatch({
      type: UPDATE_DEFAULT_ADDRESS.FULFILLED,
      payload: res.data.customerDefaultAddressUpdate.customerAddress, // ???????
    })
  }
}

export const deleteAddress = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_ADDRESS.PENDING })

    const res = await deleteCustomerAddress(id, getToken())

    if (
      res.data.customerAddressDelete.customerUserErrors &&
      res.data.customerAddressDelete.customerUserErrors.length > 0
    ) {
      dispatch({
        type: DELETE_ADDRESS.REJECTED,
        payload: res.data.customerAddressDelete.customerUserErrors,
      })
      throw new Error('An error happened')
    }

    dispatch({
      type: DELETE_ADDRESS.FULFILLED,
      payload: id,
    })
  }
}

export const getWishlist = () => {
  return async (dispatch, getState) => {
    dispatch({ type: GET_WISHLIST.PENDING })

    let res = await fetchWishlist(getState().session.customer.id)

    // create new one if it does not exist yet
    if (!res.data) {
      res = await createWishlist(getState().session.customer.id)
    }

    dispatch({
      type: GET_WISHLIST.FULFILLED,
      payload: res.data,
    })
  }
}

export const addProductToWishlist = (productId, showToast) => {
  return async (dispatch, getState) => {
    dispatch({ type: ADD_PRODUCT_TO_WISHLIST.PENDING })

    const wishlist = getState().session.wishlist

    const newValue = JSON.parse(wishlist.value).concat(productId)

    const wishlistResponse = await updateWishlist(
      getState().session.customer.id,
      wishlist.id,
      JSON.stringify(newValue)
    )
    showToast('Your product was added to wishlist.')
    return dispatch({
      type: ADD_PRODUCT_TO_WISHLIST.FULFILLED,
      payload: wishlistResponse.data,
    })
  }
}

export const removeProductFromWishlist = (productId) => {
  return async (dispatch, getState) => {
    dispatch({ type: REMOVE_PRODUCT_FROM_WISHLIST.PENDING })

    const wishlist = getState().session.wishlist

    const newValue = JSON.parse(wishlist.value).filter((id) => id !== productId)

    const wishlistResponse = await updateWishlist(
      getState().session.customer.id,
      wishlist.id,
      JSON.stringify(newValue)
    )

    return dispatch({
      type: REMOVE_PRODUCT_FROM_WISHLIST.FULFILLED,
      payload: wishlistResponse.data,
    })
  }
}

export const getComparelist = () => {
  return async (dispatch) => {
    dispatch({ type: GET_COMPARELIST.PENDING })

    const comparelist = localStorage.getItem('compare_list')
      ? JSON.parse(localStorage.getItem('compare_list'))
      : []

    dispatch({
      type: GET_COMPARELIST.FULFILLED,
      payload: comparelist,
    })
  }
}

export const addProductToComparelist = (productId, showToast) => {
  return async (dispatch, getState) => {
    dispatch({ type: ADD_PRODUCT_TO_COMPARELIST.PENDING })

    const comparelist = getState().session.comparelist
    const newComparelist = comparelist.concat(productId)

    localStorage.setItem('compare_list', JSON.stringify(newComparelist))

    showToast('Your product was added to сompare list.')
    return dispatch({
      type: ADD_PRODUCT_TO_COMPARELIST.FULFILLED,
      payload: newComparelist,
    })
  }
}

export const removeProductFromComparelist = (productId) => {
  return async (dispatch, getState) => {
    dispatch({ type: REMOVE_PRODUCT_FROM_COMPARELIST.PENDING })

    const comparelist = getState().session.comparelist
    const newComparelist = comparelist.filter((id) => id !== productId)

    localStorage.setItem('compare_list', JSON.stringify(newComparelist))

    return dispatch({
      type: REMOVE_PRODUCT_FROM_COMPARELIST.FULFILLED,
      payload: newComparelist,
    })
  }
}

export const removeErrors = () => {
  return async (dispatch) => {
    return dispatch({ type: REMOVE_ERRORS.FULFILLED })
  }
}

export const logout = () => {
  clearSession()
  return { type: LOGOUT.ACTION }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SESSION.FULFILLED:
      return {
        ...state,
        loaded: true,
        customer: action.payload,
        isLoggedIn: !!action.payload,
      }

    case INITIALIZE_SESSION.REJECTED:
      return {
        ...state,
        loaded: true,
      }

    case SIGNUP.FULFILLED:
      return {
        ...state,
        userErrors: null,
      }

    case LOGIN.FULFILLED:
    case RESET.FULFILLED:
      return {
        ...initialState,
        userErrors: null,
        isLoggedIn: true,
        customer: action.payload,
      }

    case PASSWORD.FULFILLED:
      return {
        ...state,
        isOldPasswordCorrect: true,
      }

    case LOGOUT.ACTION:
      return {
        ...initialState,
      }

    case SIGNUP.PENDING:
    case LOGIN.PENDING:
    case RECOVER.PENDING:
    case RESET.PENDING:
    case CHANGE_PASSWORD.PENDING:
    case UPDATE.PENDING:
    case REMOVE_ERRORS.FULFILLED:
      return {
        ...state,
        userErrors: null,
      }

    case PASSWORD.PENDING:
      return {
        ...state,
        isOldPasswordCorrect: true,
      }

    case SIGNUP.REJECTED:
    case LOGIN.REJECTED:
    case RECOVER.REJECTED:
    case RESET.REJECTED:
    case CHANGE_PASSWORD.REJECTED:
    case UPDATE.REJECTED:
      return {
        ...state,
        userErrors: action.payload,
      }

    case PASSWORD.REJECTED:
      return {
        ...state,
        userErrors: action.payload,
        isOldPasswordCorrect: false,
      }

    case GET_WISHLIST.FULFILLED:
      return {
        ...state,
        wishlist: action.payload,
      }

    case ADD_PRODUCT_TO_WISHLIST.PENDING:
      return {
        ...state,
        wishlistLoading: true,
      }
    case ADD_PRODUCT_TO_WISHLIST.FULFILLED:
      return {
        ...state,
        wishlistLoading: false,
        wishlist: action.payload,
      }

    case REMOVE_PRODUCT_FROM_WISHLIST.FULFILLED:
      return {
        ...state,
        wishlistLoading: false,
        wishlist: action.payload,
      }

    case GET_COMPARELIST.FULFILLED:
      return {
        ...state,
        comparelist: action.payload,
      }

    case ADD_PRODUCT_TO_COMPARELIST.PENDING:
      return {
        ...state,
        compareListLoading: true,
      }

    case ADD_PRODUCT_TO_COMPARELIST.FULFILLED:
      return {
        ...state,
        compareListLoading: false,
        comparelist: action.payload,
      }

    case REMOVE_PRODUCT_FROM_COMPARELIST.FULFILLED:
      return {
        ...state,
        compareListLoading: false,
        comparelist: action.payload,
      }

    case ADD_ADDRESS.FULFILLED:
      return {
        ...state,
        customer: {
          ...state.customer,
          addresses: state.customer.addresses.concat(action.payload),
        },
      }

    case UPDATE_ADDRESS.FULFILLED:
      return {
        ...state,
        customer: {
          ...state.customer,
          addresses: state.customer.addresses.concat(action.payload),
        },
      }

    case UPDATE_DEFAULT_ADDRESS:
      return {
        ...state,
        customer: {
          ...state.customer,
          // defaultAddress: state.customer.defaultAddress.concat(action.payload),
        },
      }

    case DELETE_ADDRESS.FULFILLED:
      return {
        ...state,
        customer: {
          ...state.customer,
          addresses: state.customer.addresses.filter(
            (a) => a.id !== action.payload
          ),
        },
      }

    default:
      return state
  }
}
