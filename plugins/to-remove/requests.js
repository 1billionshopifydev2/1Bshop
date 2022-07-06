const axios = require('axios')
const { buildRequest, wait } = require('./utils')
const bulkOperationByIdQuery = require('./queries/bulk-operation-by-id')
const productsQuery = require('./queries/query-products')
const collectionsQuery = require('./queries/query-collections')
const runBulkMutation = require('./queries/bulk-run-mutation')
const { QUERY_CREATED, QUERY_RUNNING } = require('./constants')
const { serializeProducts, serializeCollection, addProductsToCollections } = require('./utils')
const { transformProduct } = require('@b2storefront/b2s_core/dist/data/transformers/shopify')

const ALL_PRODUCTS = 'gatsby-b2s-shopify-all-products'
const ALL_COLLECTIONS = 'gatsby-b2s-shopify-all-collections'

async function bulkOperationById(id, isBulk = false) {
  const config = buildRequest({
    query: bulkOperationByIdQuery,
    variables: { id },
    isBulk
  })

  const {
    data: {
      data: { node },
    },
  } = await axios(config)

  if ([QUERY_CREATED, QUERY_RUNNING].indexOf(node.status) > -1) {
    console.log(`Bulk operation ${id} is still running`)

    await wait()

    return bulkOperationById(id, isBulk)
  }

  return node
}

async function getProductsBulkQueryResult() {
  const newProductsQuery = productsQuery.replace('query: $query', `query: "status:active AND published_status:published"`).replace('($query: String!)', '')

  const config = buildRequest({
    query: runBulkMutation,
    variables: { query: newProductsQuery },
  })

  const result = await axios(config)
  const errors = result.data.data.bulkOperationRunQuery.userErrors.length

  if (errors > 0) {
    throw new Error(`Another Bulk API query is still running for this store. More details: ${JSON.stringify(result.data.data.bulkOperationRunQuery.userErrors)}`)
  }

  return await bulkOperationById(result.data.data.bulkOperationRunQuery.bulkOperation.id)
}

async function getCollectionsBulkQueryResult() {
  const newCollectionsQuery = collectionsQuery.replace('query: $query', `query: "status:active AND published_status:published"`).replace('($query: String!)', '')

  const config = buildRequest({
    query: runBulkMutation,
    variables: { query: newCollectionsQuery },
  })

  const result = await axios(config)
  const errors = result.data.data.bulkOperationRunQuery.userErrors.length

  if (errors > 0) {
    throw new Error(`Another Bulk API query is still running for this store. More details: ${JSON.stringify(result.data.data.bulkOperationRunQuery.userErrors)}`)
  }

  return await bulkOperationById(result.data.data.bulkOperationRunQuery.bulkOperation.id)
}

const getData = async (reporter, cache) => {
  let allProducts = (await cache.get(ALL_PRODUCTS)) ?? []
  let allCollections = (await cache.get(ALL_COLLECTIONS)) ?? []

  if (process.env.NODE_ENV === 'development' && allProducts.length > 0 && allCollections.length > 0) {
    reporter.info('BUILDING PRODUCTS AND COLLECTIONS BASED ON THE CACHED DATA')
    reporter.info('If you want to get the fresh products & collections data please remove the Gatsby\'s cache with command `rm -rf .cache`')

    return {
      allProducts,
      allCollections,
    }
  }

  reporter.info('GETTING NEW PRODUCTS AND COLLECTIONS FROM SHOPIFY BULK API')

  const productsBulkResult = await getProductsBulkQueryResult()
  if (productsBulkResult && productsBulkResult.url) {
    allProducts = await serializeProducts(productsBulkResult.url)
  }

  let collectionsBulkResult = await getCollectionsBulkQueryResult()
  if (collectionsBulkResult && collectionsBulkResult.url) {
    const serializedCollections = await serializeCollection(collectionsBulkResult.url)

    allCollections = addProductsToCollections(serializedCollections, [...allProducts])
  }

  await cache.set(ALL_PRODUCTS, allProducts)
  await cache.set(ALL_COLLECTIONS, allCollections)

  return {
    allProducts,
    allCollections,
  }
}

module.exports = {
  bulkOperationById,
  getProductsBulkQueryResult,
  getCollectionsBulkQueryResult,
  getData,
}
