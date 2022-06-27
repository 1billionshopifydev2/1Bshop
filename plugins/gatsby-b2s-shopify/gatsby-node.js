const path = require('path')
const { getSpecificProducts, getSpecificCollections, getLatestProducts, getNewCollections } = require('./requests')
const { serializeProducts, serializeCollection, addProductsToCollections } = require('./utils')

const ALL_PRODUCTS = 'gatsby-b2s-shopify-all-products'
const ALL_COLLECTIONS = 'gatsby-b2s-shopify-all-collections'

let cachedShopifyData = null
let temporaryDataCache = null

async function getData(reporter, cache) {
  if (temporaryDataCache) {
    return temporaryDataCache
  }

  let allProducts = (await cache.get(ALL_PRODUCTS)) ?? []
  let allCollections = (await cache.get(ALL_COLLECTIONS)) ?? []

  if (process.env.GATSBY_PARTIAL_BUILD) {
    if (cachedShopifyData) {
      return cachedShopifyData
    }

    reporter.info('----------------------')
    reporter.info(`BUILD INFO: QUICK BUILD FOR PRODUCTS & COLLECTIONS WITH IDS ${process.env.GATSBY_PARTIAL_BUILD}`)
    reporter.info('----------------------')

    if (process.env.GATSBY_PARTIAL_BUILD.split(',').length < 2) {
      throw new Error('BUILD ERROR: You have to provide at least one product & collection in order to run quick build')
    }

    cachedShopifyData = {}
    cachedShopifyData.allProducts =  await getSpecificProducts(process.env.GATSBY_PARTIAL_BUILD)
    cachedShopifyData.allCollections = await getSpecificCollections(process.env.GATSBY_PARTIAL_BUILD, cachedShopifyData.allProducts)

    if (cachedShopifyData.allProducts.length === 0 || cachedShopifyData.allCollections.length === 0) {
      throw new Error(`
        BUILD ERROR: You have provided wrong IDs. The build needs at least one product & collection. 
        Found Products: ${cachedShopifyData.allProducts.length}. Found Collections: ${cachedShopifyData.allCollections.length}
      `)
    }

    cachedShopifyData.allCollections = addProductsToCollections(cachedShopifyData.allCollections, cachedShopifyData.allProducts)

    cachedShopifyData.allProducts.forEach(({product}) => reporter.info(`http://localhost:8000/products/${product.handle}`))
    cachedShopifyData.allCollections.forEach(collection => reporter.info(`http://localhost:8000/collections/${collection.handle}`))

    reporter.info('----------------------')

    return cachedShopifyData
  }

  const newProductsBulkResult = await getLatestProducts(cachedProducts, node.completedAt)

  if (newProductsBulkResult && newProductsBulkResult.url) {
    allProducts = await serializeProducts(allProducts, newProductsBulkResult.url)
  }

  let newCollectionsBulkResult = await getNewCollections(node.completedAt, collections)

  if (newCollectionsBulkResult && newCollectionsBulkResult.url) {
    const serializedCollections = await serializeCollection(collections, newCollectionsBulkResult.url)
    allCollections = addProductsToCollections(serializedCollections, [...allProducts])
  }

  await cache.set(ALL_PRODUCTS, allProducts)
  await cache.set(ALL_COLLECTIONS, allCollections)

  temporaryDataCache = {
    allProducts: Object.values(allProducts),
    allCollections,
  }

  return temporaryDataCache
}

exports.createPages = async ({ cache, reporter, actions }) => {
  if (process.env.GATSBY_BUILD_MODE === 'preview') {
    console.log('Skip PDP building because it is preview mode') // eslint-disable-line

    return
  }

  let { allProducts, allCollections } = await getData(reporter, cache)

  reporter.info(`Generating ${allCollections.length} collections and ${allProducts.length} products`)

  let i = 0;
  for (const { product } of allProducts) {
    if (product.variants?.length && product.variants[0].price == 0) {
      continue
    }
    
    actions.createPage({
      path: `/products/${product.handle}`,
      component: path.resolve('./src/components/ProductDetails/ProductDetailsPage.js'),
      context: {
        product,
        upholsteries,
        brandHandle: product.brandHandle,
        designerHandle: product.designerHandle,
      },
      defer: true,
    })
  }

  allCollections.forEach((collection) => {
    actions.createPage({
      path: `/collections/${collection.handle}`,
      component: path.resolve('./src/components/CategoryPage/CategoryPage.js'),
      context: {
        ...collection,
        images: collection?.images?.slice(0, 3) ?? [],
      },
      defer: true,
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MoreProductsByCollection implements Node {
      handle: String
      title: String
      descriptionHtml: String
      products: [MoreProductsByCollectionProduct]
    }
    type MoreProductsByCollectionProduct implements Node {
      id: String
      handle: String
      title: String
      images: [MoreProductsByCollectionProductImages]
      priceRangeV2: MoreProductsByCollectionProductPriceRangeV2
      tags: [String]
      vendor: String
    }
    type MoreProductsByCollectionProductImages implements Node {
      id: String
      originalSrc: String
      altText: String
    }
    type MoreProductsByCollectionProductPriceRangeV2 implements Node {
      minVariantPrice: MoreProductsByCollectionProductPriceRangeV2variant
      maxVariantPrice: MoreProductsByCollectionProductPriceRangeV2variant
    }
    type MoreProductsByCollectionProductPriceRangeV2variant implements Node {
      amount: String
      currencyCode: String
    }
  `
  createTypes(typeDefs)
}

exports.sourceNodes = async (args) => {
  const { actions, createNodeId, createContentDigest, reporter, cache } = args

  if (process.env.GATSBY_BUILD_MODE === 'preview') {
    console.log('Skip PDP building because it is preview mode') // eslint-disable-line

    return
  }

  const { allCollections } = await getData(reporter, cache)

  allCollections.forEach((collection) => {
    actions.createNode({
      id: createNodeId(collection.id),
      title: collection.title,
      handle: collection.handle,
      products: collection.products.slice(0, 4) ?? [],
      descriptionHtml: collection?.descriptionHtml ?? '',
      internal: {
        type: 'MoreProductsByCollection',
        contentDigest: createContentDigest({
          handle: collection.handle,
          products: collection.products.slice(0, 4) ?? [],
          descriptionHtml: collection?.descriptionHtml ?? '',
        }),
      },
    })
  })
}