const path = require('path')
const dotEnv = require('dotenv')
const axios = require('axios')
const fetch = require('node-fetch')
const { createInterface } = require('readline')
const { productFormatter } = require('../../src/utils/product-formatter')

dotEnv.config({
  path: path.join(__dirname, '../../', `.env.${process.env.NODE_ENV}`),
})

const { STRAPI_URL } = process.env

const fetchFromStrapi = (apiId) => axios.get(`${STRAPI_URL}/${apiId}`)

const fetchByScrapeStack = async (url) => {
  let params = {
    url: url,
    access_key: process.env.GATSBY_SCRAPERSTACK_ACCESS_KEY,
    render_js: 0
  }

  return await axios.get(`https://api.scrapestack.com/scrape`, {params})
}

const serializeCollection = async (collections, url) => {
  const result = await fetch(url)
  const rl = createInterface({
    input: result.body,
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    if (line) {
      const collection = JSON.parse(line)

      if (collection.id) {
        const isCollection = collection.id.includes('/shopify/Collection/')
        const isProduct = collection.id.includes('/shopify/Product/')
        const isImage = collection.id.includes('/shopify/ProductImage/')

        if (isImage) {
          continue
        }

        if (isProduct) {
          const collectionIndex = collections.findIndex(
            (p) => p.id === collection.__parentId
          )

          const products = [...(collections[collectionIndex]?.products ?? [])]
          products.push(collection)

          collections[collectionIndex] = {
            ...collections[collectionIndex],
            products,
          }
        }

        if (isCollection) {
          const context = {
            ...collection,
            handle: collection.handle,
            shopifyHandle: collection.handle,
            title: collection.title,
            page_type: 'collections',
            products: [],
          }
          collections.push(context)
        }
      }
    }
  }

  return collections
}

const serializeProducts = async (products, url) => {
  const result = await fetch(url)

  console.log('Bulk downloaded')
  console.log(result)

  const strapi = await fetchFromStrapi('product-templates')
  const vendors = strapi.data.map(({ vendor }) => vendor)

  console.log('Strapi data downloaded')

  const rl = createInterface({
    input: result.body,
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    if (line) {
      const product = JSON.parse(line)
      const isProduct = product.id.includes('/shopify/Product/')
      const isImage = product.id.includes('/shopify/ProductImage/')
      const isVariant = product.id.includes('/shopify/ProductVariant/')

      if (isImage || isVariant) {
        const images = [...(products[product.__parentId]?.product?.images ?? [])]
        const variants = [...(products[product.__parentId]?.product?.variants ?? [])]

        if (isImage) {
          images.push({
            altText: product.altText,
            id: product.id,
            originalSrc: product.originalSrc,
          })
        }

        if (isVariant) {
          variants.push({
            availableForSale: product.availableForSale,
            compareAtPrice: product.compareAtPrice,
            id: product.id,
            image: product.image,
            price: product.price,
            sku: product.sku,
            availability: product.avaialbility,
            selectedOptions: product.selectedOptions,
            inventoryQuantity: product.inventoryQuantity,
          })
        }

        products[product.__parentId] = {
          product: {
            ...products[product.__parentId].product,
            images,
            variants,
          },
        }
      }

      if (isProduct) {
        const context = {
          product: productFormatter(product),
          images: [],
          variants: [],
        }

        products[product.id] = context
      }
    }
  }

  return products
}

const buildRequest = ({ query, variables = {}, isBulk = false }) => {
  const data = JSON.stringify({
    query: query,
    variables: variables,
  })

  const config = {
    method: 'post',
    url: `https://${process.env.SHOPIFY_SHOP_NAME}.myshopify.com/admin/api/2022-04/graphql.json`,
    headers: {
      'X-Shopify-Access-Token': isBulk ? process.env.SHOPIFY_ADMIN_ACCESS_TOKEN_BULK : process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
      'Content-Type': 'application/json',
      Cookie: 'request_method=POST',
    },
    data: data,
  }

  return config
}

const getLatestBulkApi = async () => {
  return axios(
    'https://5hcuazyufe.execute-api.us-east-1.amazonaws.com/get-bulk-ids'
  )
}

function addProductsToCollections(allCollections, allProducts) {
  if (process.env.GATSBY_PARTIAL_BUILD) {
    return allCollections.map((collection) => {  
      const collectionContext = {
        ...collection,
        products: allProducts
          .map(({ product }) => {
            return {
              ...product,
              images: product.images.map(image => ({
                ...image,
                altText: image.altText || 'dummy'
              })),
              variants: product.variants,
            }
          })
      }
      return collectionContext
    })
  }

  return allCollections.map((collection) => {
    const collectionsProducts = collection?.products ?? []

    const collectionContext = {
      ...collection,
      products: collectionsProducts
        .map((product) => {
          const p = allProducts.find((p) => p.product.id === product.id) ?? []
          const images = p?.product?.images ?? []
          const variants = p?.product?.variants ?? []
          return {
            ...product,
            images: images.slice(0, 1),
            variants,
          }
        })
        .filter((product) => product.images.length > 0),
    }
    return collectionContext
  })
}

const wait = async (delay = 27000) => {
  return new Promise(resolve => setTimeout(resolve, delay))
}

module.exports = {
  serializeProducts,
  serializeCollection,
  fetchFromStrapi,
  getLatestBulkApi,
  buildRequest,
  wait,
  fetchByScrapeStack,
  addProductsToCollections
}
