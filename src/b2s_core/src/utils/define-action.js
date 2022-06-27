import { defineAction as define } from 'redux-define'

const NS = 'gatsby-shopify'

export const defineAsyncActions = key =>
  define(key, ['PENDING', 'FULFILLED', 'REJECTED'], NS)
export const defineAction = key => define(key, NS)
