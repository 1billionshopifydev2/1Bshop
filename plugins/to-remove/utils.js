const path = require('path')
const dotEnv = require('dotenv')
const fetch = require('node-fetch')
const { createInterface } = require('readline')
const { transformProduct } = require('@b2storefront/b2s_core/dist/data/transformers/shopify')

dotEnv.config({
  path: path.join(__dirname, '../../', `.env.${process.env.NODE_ENV}`),
})

const serializeCollection = async (url) => {
  const result = await fetch(url)
  const collections = []
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

const serializeProducts = async (url) => {
  const result = await fetch(url)
  const products = []

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
          product: product,
          images: [],
          variants: [],
        }

        products[product.id] = context
      }
    }
  }

  const transformedProducts = []

  for (let shopifyProduct of Object.values(products)) {
    transformedProducts.push(transformProduct(shopifyProduct.product))
  }

  return transformedProducts
}

const buildRequest = ({ query, variables = {} }) => {
  const data = JSON.stringify({
    query: query,
    variables: variables,
  })

  const config = {
    method: 'post',
    url: `https://${process.env.SHOPIFY_SHOP_NAME}.myshopify.com/admin/api/2022-04/graphql.json`,
    headers: {
      'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
      'Content-Type': 'application/json',
      Cookie: 'request_method=POST',
    },
    data: data,
  }

  return config
}

function addProductsToCollections(allCollections, allProducts) {
  return allCollections.map((collection) => {
    const collectionsProducts = collection?.products ?? []

    const collectionContext = {
      ...collection,
      products: collectionsProducts
        .map((product) => {
          const p = allProducts.find((p) => p.id === product.id) ?? []
          return {
            ...p,
          }
        }),
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
  buildRequest,
  wait,
  addProductsToCollections
}
