import { fetch as fetchPolyfill } from 'isomorphic-fetch'
import ShopifyClient from 'shopify-buy'

function Client() {
  let instance
  function createInstance() {
    const instanceParams = {
      storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      domain: process.env.SHOPIFY_ORIGINAL_DOMAIN,
    }
    let newInstance
    if (
      typeof window !== 'undefined' &&
      typeof window['fetch'] === 'undefined'
    ) {
      newInstance = ShopifyClient.buildClient(instanceParams, fetchPolyfill)
    } else {
      newInstance = ShopifyClient.buildClient(instanceParams)
    }
    return newInstance
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance()
      }
      return instance
    },
  }
}

const client = new Client()
export default client
