import axios from 'axios'

const api = axios.create({
  baseURL: `https://${process.env.SHOP_NAME}.myshopify.com/api/2021-04/graphql`,
  headers: {
    Accept: 'application/json',
    'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
  },
})

const PRODUCT_NODE = `
  id
  handle
  title
  tags
  description
  vendor
  images (first: 5) {
    edges {
      node {
        originalSrc
      }
    }
  }
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
    maxVariantPrice {
      amount
      currencyCode
    }
  }
  imagesResized: images (first: 1, maxWidth: 200) {
    edges {
      node {
        originalSrc
      }
    }
  }
  variants (first: 5) {
    edges {
      node {
        id
        price
        compareAtPrice
        title
        availableForSale
        sku
        selectedOptions {
          name
          value
        }
        weight
        weightUnit
        image {
          id
          originalSrc
        }
        presentmentPrices(first: 30) {
          edges {
            node {
              price {
                currencyCode
                amount
              }
              compareAtPrice {
                currencyCode
                amount
              }
            }
          }
        }
      }
    }
  }
  metafields (first: 10) {
    edges {
      node {
        key
        value
        namespace
      }
    }
  }
`

const GET_PRODUCTS = `query ($first: Int = 200 $sortKey: ProductSortKeys, $reverse: Boolean, $query: String!) {
  products (first: $first query: $query sortKey: $sortKey reverse: $reverse) {
    edges {
      cursor
      node {
        ${PRODUCT_NODE}
      }
    }
  }
}`

const INSTANT_SEARCH_PRODUCTS = `query ($first: Int = 200 $sortKey: ProductSortKeys, $reverse: Boolean, $query: String!) {
  products (first: $first query: $query sortKey: $sortKey reverse: $reverse) {
    edges {
      node {
        id
        handle
        title
      }
    }
  }
}`

const GET_PRODUCT_BY_ID = `query ($id: ID!) {
  node(id: $id) {
    id
    ... on Product {
      ${PRODUCT_NODE}
    }
  }
}`

const GET_PRODUCTS_BY_IDS = `query ($ids: [ID!]!) {
  nodes(ids: $ids) {
    id
    ... on Product {
      ${PRODUCT_NODE}
    }
  }
}`

const GET_PRODUCT_BY_HANDLE = `query ($handle: String!) {
  productByHandle(handle: $handle) {
    ${PRODUCT_NODE}
  }
}`

const GET_VARIANT_DESCRIPTION = `query ($id: ID!) {
  node(id: $id) {
    id
    ... on ProductVariant {
      id
      title
      metafield(namespace: "instructions", key: "description") {
        value
      }
    }
  }
}`

const GET_VARIANT_OLD_ID = `query ($id: ID!) {
  node(id: $id) {
    id
    ... on ProductVariant {
      id
      title
      sku
      metafield(namespace: "legacy", key: "entity_id") {
        value
      }
    }
  }
}`

const GET_VARIANT_PRODUCT = `query ($id: ID!) {
  node(id: $id) {
    id
    ... on ProductVariant {
      title
      sku
      product {
        title
      }
    }
  }
}`

const SEARCH_ARTICLES = `query ($first: Int = 200 $query: String! $sortKey: ArticleSortKeys $reverse: Boolean) {
  articles (first: $first query: $query sortKey: $sortKey reverse: $reverse) {
    edges {
      node {
        id
        title
        url
        content
        tags
        blog {
          id
          title
        }
        publishedAt
        image {
          originalSrc
        }
      }
    }
  }
}`

const GET_SHIPPING_RATES = `query ($checkoutId: ID!) {
  node(id: $checkoutId) {
    id
    ... on Checkout {
      id
      shippingLine {
        handle
      }
      availableShippingRates {
        ready
        shippingRates {
          handle
          title
          priceV2 {
            amount
            currencyCode
          }
        }
      }
    }
  }
}`

const UPDATE_SHIPPING_RATE = `mutation checkoutShippingLineUpdate($checkoutId: ID!, $shippingRateHandle: String!) {
  checkoutShippingLineUpdate(checkoutId: $checkoutId, shippingRateHandle: $shippingRateHandle) {
    checkout {
      id
    }
    checkoutUserErrors {
      code
      field
      message
    }
  }
}`

const GET_CUSTOMER = `query ($accessToken: String!){
  customer(customerAccessToken: $accessToken) {
    id
    email
    firstName
    lastName
    phone
    orders(first: 100, reverse: true) {
      edges {
        node {
          orderNumber
          processedAt
          currencyCode
          statusUrl
          shippingAddress {
            id
            formatted(withName: true)
            address1
            address2
            city
            country
            countryCode
            countryCodeV2
            phone
            provinceCode
            zip
            firstName
            lastName
          }
          discountApplications(first:200) {
            edges {
              node {
                value
              }
            }
          }
          lineItems(first: 200) {
            edges {
              node {
                title
                quantity
                discountAllocations {
                  allocatedAmount {
                    amount
                  }
                }
                variant {
                  id
                  priceV2 {
                    amount
                    currencyCode
                  }
                  sku
                  product {
                    handle
                    title
                  }
                }
              }
            }
          }
          successfulFulfillments(first: 200) {
            fulfillmentLineItems(first: 5) {
              edges {
                node {
                  quantity
                }
              }
            }
          }
          totalPriceV2 {
            amount
          }
          totalShippingPriceV2 {
            amount
          }
          subtotalPriceV2 {
            amount
          }
          totalTaxV2 {
            amount
          }
        }
      }
    }
    defaultAddress {
      id
      formatted(withName: true)
      address1
      address2
      city
      company
      country
      countryCode
      countryCodeV2
      phone
      provinceCode
      zip
      firstName
      lastName
    }
    addresses(first: 100) {
      edges {
        node {
          id
          formatted(withName: true)
          address1
          address2
          city
          company
          country
          countryCode
          countryCodeV2
          phone
          provinceCode
          zip
          firstName
          lastName
        }
      }
    }
  }
}`

const CREATE_CUSTOMER_ACCESS_TOKEN = `mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerAccessToken {
      accessToken
      expiresAt
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}`

const CREATE_CUSTOMER = `mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer {
      id
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}`

const CHECKOUT_CUSTOMER_ASSOCIATE = `mutation checkoutCustomerAssociateV2($checkoutId: ID!, $customerAccessToken: String!) {
  checkoutCustomerAssociateV2(checkoutId: $checkoutId, customerAccessToken: $customerAccessToken) {
    checkout {
      id
    }
    checkoutUserErrors {
      code
      field
      message
    }
    customer {
      id
    }
  }
}
`

const CUSTOMER_RECOVER = `mutation customerRecover($email: String!) {
  customerRecover(email: $email) {
    customerUserErrors {
      code
      field
      message
    }
  }
}
`

const CUSTOMER_RESET = `mutation customerResetByUrl($resetUrl: URL!, $password: String!) {
  customerResetByUrl(resetUrl: $resetUrl, password: $password) {
    customer {
      id
    }
    customerAccessToken {
      accessToken
      expiresAt
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`

const CUSTOMER_ACTIVATE = `mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
  customerActivate(id: $id, input: $input) {
    customer {
      id
    }
    customerAccessToken {
      accessToken
      expiresAt
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`

const CUSTOMER_ADDRESS_CREATE = `mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
  customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
    customerAddress {
      id
      formatted(withName: true)
      address1
      address2
      city
      country
      phone
      provinceCode
      zip
      firstName
      lastName
      company
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`

const CUSTOMER_ADDRESS_UPDATE = `mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
  customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
    customerAddress {
      id
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`

const CUSTOMER_ADDRESS_DELETE = `mutation customerAddressDelete($id: ID!, $customerAccessToken: String!) {
  customerAddressDelete(id: $id, customerAccessToken: $customerAccessToken) {
    customerUserErrors {
      code
      field
      message
    }
    deletedCustomerAddressId
  }
}
`

const CUSTOMER_UPDATE = `mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
  customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
    customer {
      id
    }
    customerAccessToken {
      accessToken
      expiresAt
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`

const CUSTOMER_ADDRESS_DEFAULT_UPDATE = `mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
  customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
    customer {
      id
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}`

export const fetchProducts = (variables) => {
  return api
    .post('', {
      query: GET_PRODUCTS,
      variables,
    })
    .then((res) => {
      return res.data.data.products.edges.map((edge) => ({
        ...edge.node,
        images: edge.node.images.edges.map((edge) => edge.node),
        imagesResized: edge.node.imagesResized.edges.map((edge) => edge.node),
        variants: edge.node.variants.edges.map((edge) => edge.node),
        metafields: edge.node.metafields.edges.map((edge) => edge.node),
      }))
    })
}

export const fetchProductById = (id) => {
  return api
    .post('', {
      query: GET_PRODUCT_BY_ID,
      variables: { id },
    })
    .then((res) => {
      return {
        ...res.data.data.node,
        images: res.data.data.node.images.edges.map((edge) => edge.node),
        imagesResized: res.data.data.node.imagesResized.edges.map(
          (edge) => edge.node
        ),
      }
    })
}

const mapNode = (node) => ({
  ...node,
  images: node.images?.edges.map((edge) => edge.node),
  imagesResized: node.imagesResized?.edges.map((edge) => edge.node),
  variants: node.variants?.edges.map((edge) => edge.node),
  metafields: node.metafields?.edges.map((edge) => edge.node),
})

export const fetchProductsByIds = (ids) => {
  return api
    .post('', {
      query: GET_PRODUCTS_BY_IDS,
      variables: { ids },
    })
    .then((res) => {
      if (res.data.errors && res.data.errors.length) {
        throw 'An error happened on fetchProductsByIds'
      }
      return res.data.data.nodes
        .filter((node) => !!node)
        .map((node) => mapNode(node))
    })
}

export const fetchProductByHandle = async (handle) => {
  return api
    .post('', {
      query: GET_PRODUCT_BY_HANDLE,
      variables: { handle },
    })
    .then((res) => res.data.data.productByHandle)
    .catch((err) => console.error('fetchProductByHandle error:', err))
}

export const fetchProductsByHandles = async (handles) => {
  const res = await Promise.all(
    handles.map((handle) =>
      api.post('', {
        query: GET_PRODUCT_BY_HANDLE,
        variables: { handle },
      })
    )
  )

  return [].concat(
    ...res
      .filter((r) => !!r.data.data.productByHandle)
      .map((r) => mapNode(r.data.data.productByHandle))
  )
}

// XXX Prioritize search with title over description and other fields
// fullResponse set to false is an optimization in instant search
// Instead of requesting 250 products with all fields, which is slow..
// Better to introduce client side pagination into search page
export const searchProducts = (term, fullResponse = true) => {
  return Promise.all([
    api.post('', {
      query: fullResponse ? GET_PRODUCTS : INSTANT_SEARCH_PRODUCTS,
      variables: {
        query: `title:${term}*`,
        sortKey: 'BEST_SELLING',
      },
    }),
    api.post('', {
      query: fullResponse ? GET_PRODUCTS : INSTANT_SEARCH_PRODUCTS,
      variables: {
        query: term,
        sortKey: 'BEST_SELLING',
      },
    }),
  ]).then((res) => {
    const products = res[0].data.data.products.edges
    res[1].data.data.products.edges.forEach((e) => {
      if (!products.find((p) => p.node.id === e.node.id)) {
        products.push(e)
      }
    })

    const sortByTitleIndex = (a, b) => {
      const aIndex = a.title.toLowerCase().indexOf(term.toLowerCase())
      const bIndex = b.title.toLowerCase().indexOf(term.toLowerCase())

      return aIndex > -1 ? aIndex - bIndex : 0
    }

    if (!fullResponse) {
      return products.map((edge) => edge.node).sort(sortByTitleIndex)
    }

    return products
      .map((edge) => ({
        ...edge.node,
        images: edge.node.images.edges.map((edge) => edge.node),
        imagesResized: edge.node.imagesResized.edges.map((edge) => edge.node),
        variants: edge.node.variants.edges.map((edge) => edge.node),
        metafields: edge.node.metafields.edges.map((edge) => edge.node),
      }))
      .sort(sortByTitleIndex)
  })
}

// //////////////////////////////////
export const fetchOldVariantId = (id) => {
  return api
    .post('', {
      query: GET_VARIANT_OLD_ID,
      variables: { id },
    })
    .then((res) => {
      return res.data.data.node && res.data.data.node.metafield
        ? res.data.data.node.metafield.value
        : null
    })
}
// //////////////////////////////////

export const fetchVariantDescription = (id) => {
  return api.post('', {
    query: GET_VARIANT_DESCRIPTION,
    variables: { id },
  })
}

export const fetchVariantProduct = (id) => {
  return api
    .post('', {
      query: GET_VARIANT_PRODUCT,
      variables: { id },
    })
    .then((res) => {
      return res.data.data.node
        ? {
            title: // eslint-disable-line
              res.data.data.node.product && res.data.data.node.product.title // eslint-disable-line
                ? res.data.data.node.product.title // eslint-disable-line
                : '', // eslint-disable-line
          variantTitle: res.data.data.node.title, // eslint-disable-line
          sku: res.data.data.node.sku, // eslint-disable-line
        } // eslint-disable-line
        : null
    })
}

export const searchArticles = (variables) => {
  return api
    .post('', {
      query: SEARCH_ARTICLES,
      variables,
    })
    .then((res) => {
      return res.data.data.articles.edges.map((edge) => edge.node)
    })
}

export const fetchProductReviews = ({ handle, page }) => {
  const url = `https://api.yotpo.com/v1/widget/${process.env.YOTPO_APP_KEY}/products/${handle}/reviews.json?sort=date&per_page=${process.env.YOTPO_APP_ITEMS_PER_PAGE}&page=${page}`

  return axios.get(url)
}

export const writeReview = ({ product, review }) => {
  const { handle: sku, title: product_title, url: product_url } = product
  const {
    author: display_name,
    email,
    content: review_content,
    title: review_title,
    score: review_score,
  } = review
  const url = 'https://api.yotpo.com/v1/widget/reviews'
  return axios
    .post(url, {
      appkey: process.env.YOTPO_APP_KEY,
      sku,
      product_title,
      product_url,
      display_name,
      email,
      review_content,
      review_title,
      review_score,
    })
    .then(() => {
      return { success: true }
    })
    .catch((error) => {
      if (error.response.data && error.response.data.status.message) {
        return { success: false, message: error.response.data.status.message }
      }
      return { success: false, message: 'System is temporarily unavailable.' }
    })
}

export const fetchShippingRates = (checkoutId) => {
  return api
    .post('', {
      query: GET_SHIPPING_RATES,
      variables: { checkoutId },
    })
    .then((res) => res.data)
}

export const updateShippingHandle = (checkoutId, handle) => {
  return api
    .post('', {
      query: UPDATE_SHIPPING_RATE,
      variables: {
        checkoutId,
        shippingRateHandle: handle,
      },
    })
    .then((res) => res.data)
}

export const getCustomer = (accessToken) => {
  return api
    .post('', {
      query: GET_CUSTOMER,
      variables: { accessToken },
    })
    .then((res) => res.data)
}

export const createCustomerAccessToken = (email, password) => {
  return api
    .post('', {
      query: CREATE_CUSTOMER_ACCESS_TOKEN,
      variables: {
        input: {
          email,
          password,
        },
      },
    })
    .then((res) => res.data)
}

export const createCustomer = (email, password, firstName, lastName) => {
  return api
    .post('', {
      query: CREATE_CUSTOMER,
      variables: {
        input: {
          email,
          password,
          firstName,
          lastName,
        },
      },
    })
    .then((res) => res.data)
}

export const associateCustomerCheckout = (checkoutId, customerAccessToken) => {
  return api
    .post('', {
      query: CHECKOUT_CUSTOMER_ASSOCIATE,
      variables: {
        checkoutId,
        customerAccessToken,
      },
    })
    .then((res) => res.data)
}

export const recoverCustomer = (email) => {
  return api
    .post('', {
      query: CUSTOMER_RECOVER,
      variables: {
        email,
      },
    })
    .then((res) => res.data)
}

export const resetCustomer = (resetUrl, password) => {
  return api
    .post('', {
      query: CUSTOMER_RESET,
      variables: {
        resetUrl,
        password,
      },
    })
    .then((res) => res.data)
}

export const activateCustomer = (id, activationToken, password) => {
  return api
    .post('', {
      query: CUSTOMER_ACTIVATE,
      variables: {
        id,
        input: {
          activationToken,
          password,
        },
      },
    })
    .then((res) => res.data)
}

export const addCustomerAddress = (address, customerAccessToken) => {
  return api
    .post('', {
      query: CUSTOMER_ADDRESS_CREATE,
      variables: {
        address,
        customerAccessToken,
      },
    })
    .then((res) => res.data)
}

export const updateCustomerAddress = (customerAccessToken, id, address) => {
  return api
    .post('', {
      query: CUSTOMER_ADDRESS_UPDATE,
      variables: {
        customerAccessToken,
        id,
        address,
      },
    })
    .then((res) => res.data)
}

export const updateCustomer = (customerAccessToken, customer) => {
  return api
    .post('', {
      query: CUSTOMER_UPDATE,
      variables: {
        customerAccessToken,
        customer,
      },
    })
    .then((res) => res.data)
}

export const updateCustomerDefaultAddress = (
  customerAccessToken,
  addressId
) => {
  return api
    .post('', {
      query: CUSTOMER_ADDRESS_DEFAULT_UPDATE,
      variables: {
        customerAccessToken,
        addressId,
      },
    })
    .then((res) => res.data)
}

export const deleteCustomerAddress = (id, customerAccessToken) => {
  return api
    .post('', {
      query: CUSTOMER_ADDRESS_DELETE,
      variables: {
        id,
        customerAccessToken,
      },
    })
    .then((res) => res.data)
}

export const fetchWishlist = (customerId) => {
  return axios.get(`${process.env.WISHLIST_API}/${customerId}`)
}

export const createWishlist = (customerId) => {
  return axios.post(`${process.env.WISHLIST_API}/${customerId}`)
}

export const updateWishlist = (customerId, fieldId, value) => {
  return axios.put(`${process.env.WISHLIST_API}/${customerId}`, {
    metafields: {
      id: fieldId,
      value: value,
    },
  })
}

export const productIdToApi = (product_id) => {
  return btoa(
    unescape(encodeURIComponent(`gid://shopify/Product/${product_id}`))
  )
}

export const variantIdToApi = (product_id) => {
  return btoa(
    unescape(encodeURIComponent(`gid://shopify/ProductVariant/${product_id}`))
  )
}

///////////////////////////////////
const RESOURCES = ['Product', 'ProductVariant', 'Blog', 'Article', 'Customer', 'Collection']
export const shopifyIdToApi = (resourceName, id) => {
  if (RESOURCES.indexOf(resourceName) < 0) {
    throw new Error('Unknown resource')
  }

  return btoa(
    unescape(encodeURIComponent(`gid://shopify/${resourceName}/${id}`))
  )
}
///////////////////////////////////

export const apiIdToId = (string) => {
  if (typeof window !== 'undefined') {
    return decodeURIComponent(escape(window.atob(string))).replace(
      /[^0-9]+/,
      ''
    )
  }
  return Buffer.from(string, 'base64')
    .toString('utf8')
    .replace(/[^0-9]+/, '')
}

export const storefrontIdToId = (string) => {
  if (string.search('gid://shopify') >= 0) {
    return string.replace(/[^0-9]+/, '')
  }

  return apiIdToId(string)
}