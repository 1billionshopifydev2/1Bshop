/* eslint-disable */

const axios = require('axios')
const { buildRequest, wait } = require('./utils')
const bulkOperationByIdQuery = require('./queries/bulk-operation-by-id')
const specificProductsQuery = require('./queries/specific-products')
const latestProductsQuery = require('./queries/latest-products')
const latestCollectionsQuery = require('./queries/latest-collections')
const specificCollectionsQuery = require('./queries/specific-collections')
const runBulkMutation = require('./queries/bulk-run-mutation')
const cancelBulkMutation = require('./queries/bulk-cancel-mutation')
const currentBulkOperation = require('./queries/bulk-current-operation')
const { QUERY_CREATED, QUERY_RUNNING } = require('./constants')
const { XMLParser } = require('fast-xml-parser');
const Fastly = require('fastly')
const { productFormatter } = require('../../src/utils/product-formatter')

Fastly.ApiClient.instance.authenticate(process.env.GATSBY_FASTLY_API_TOKEN);

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

async function getSpecificProducts(ids) {
  if (!ids) {
    return []
  }
  
  const config = buildRequest({
    query: specificProductsQuery,
    variables: { ids: ids.split(',').map(id => `gid://shopify/Product/${id.trim()}`) },
  })

  const {
    data: {
      data: { nodes },
    },
  } = await axios(config)

  return nodes.filter(node => !!node).map(node => {
    if (!node) {
      return
    }

    return {
      product: productFormatter(node)
    }
  })
}

async function getSpecificCollections(ids, allProducts) {
  if (!ids) {
    return []
  }

  const config = buildRequest({
    query: specificCollectionsQuery,
    variables: { ids: ids.split(',').map(id => `gid://shopify/Collection/${id.trim()}`) },
  })

  const {
    data: {
      data: { nodes },
    },
  } = await axios(config)

  return nodes.filter(node => !!node).map(node => {
    if (!node) {
      return
    }

    return {
      ...node,
      handle: node.handle,
      shopifyHandle: node.handle,
      title: node.title,
      products: allProducts.map(({ product }) => ({
        ...product,
        images: product.images,
        variants: product.variants,
      })),
      page_type: 'collections',
    }
  })
}

async function getLatestProducts(cachedProducts, lastCacheDate, secondAttempt = false) {
  if (!lastCacheDate) {
    return []
  }

  let params = {
    url: `${process.env.GATSBY_SHOP_URL}/sitemap.xml`,
    access_key: 'cfb8bfb4b909c3c82d19257f1add2395',
    render_js: 0
  }
  const response = await axios.get(`https://api.scrapestack.com/scrape`, {params})
  const parser = new XMLParser();
  let sitemapIndex = parser.parse(response.data);
  let productSitemaps = []
  let updatedProductSlugs = []
  let sitemapProducts = []

  for (let sitemap of sitemapIndex.sitemapindex.sitemap) {
    if (sitemap.loc.includes('products')) {
      productSitemaps.push(sitemap.loc)
    }
  }

  for (let sitemapUrl of productSitemaps) {
    let params = {
      url: sitemapUrl,
      access_key: 'cfb8bfb4b909c3c82d19257f1add2395',
      render_js: 0
    }
    const response = await axios.get(`https://api.scrapestack.com/scrape`, {params})
    const parser = new XMLParser();
    let sitemap = parser.parse(response.data);

    for (link of sitemap.urlset.url) {
      let handle = link.loc.replace('https://checkout.aplusrstore.com/products/', '')

      sitemapProducts.push(handle)

      if (new Date(link.lastmod) > new Date(lastCacheDate)) {
        updatedProductSlugs.push(`'${handle}'`)
      }
    }
  }

  updateUnpublishedProductsList(sitemapProducts, Object.values(cachedProducts))

  if (!updatedProductSlugs.length) {
    // Adding at least one product to the build to avoid error with missing JS for Product Details Page
    updatedProductSlugs.push(sitemapProducts[0])
  }

  if (updatedProductSlugs.length > 100) {
    // Shopify GraphQL can't handle more than 100 products in request filter, so we have to limit it
    console.log('Too many updated products in latest time, limiting bulk request to 100 latest products')
    updatedProductSlugs = updatedProductSlugs.slice(0, 100)
  }

  const newProductsQuery = latestProductsQuery.replace('query: $query', `query: "(${updatedProductSlugs.join(' OR ')}) AND status:active AND published_status:published"`).replace('($query: String!)', '')

  const config = buildRequest({
    query: runBulkMutation,
    variables: { query: newProductsQuery },
  })

  const result = await axios(config)
  const errors = result.data.data.bulkOperationRunQuery.userErrors.length

  if (errors > 0 && !secondAttempt) {
    const currentOperation = await axios(buildRequest({
      query: currentBulkOperation,
      variables: { query: newProductsQuery },
    }))

    console.log(`Canceling bulk operation with ID: ${currentOperation.data.data.currentBulkOperation.id} (Object Count: ${currentOperation.data.data.currentBulkOperation.objectCount})`)
    console.log(currentOperation.data.data)

    await axios(buildRequest({
      query: cancelBulkMutation,
      variables: { id: currentOperation.data.data.currentBulkOperation.id },
    }))

    return getLatestProducts(cachedProducts, lastCacheDate, true)
  }

  if (errors > 0 && secondAttempt) {
    throw new Error(JSON.stringify(result.data.data.bulkOperationRunQuery.userErrors))
  }

  return await bulkOperationById(result.data.data.bulkOperationRunQuery.bulkOperation.id)
}

async function getNewCollections(lastCacheDate, collections, secondAttempt = false, getAll = false) {
  let params = {
    url: `${process.env.GATSBY_SHOP_URL}/sitemap_collections_1.xml`,
    access_key: 'cfb8bfb4b909c3c82d19257f1add2395',
    render_js: 0
  }
  const response = await axios.get(`https://api.scrapestack.com/scrape`, {params})
  const parser = new XMLParser()
  let collectionSitemap = parser.parse(response.data)
  let newCollectionsSlugs = []
  
  for (collectionItem of collectionSitemap.urlset.url) {
    let handle = collectionItem.loc.replace('https://checkout.aplusrstore.com/collections/', '')

    if (new Date(collectionItem.lastmod) > new Date(lastCacheDate)) {
      newCollectionsSlugs.push(handle)
    }
  }

  if (!newCollectionsSlugs.length) {
    return
  }

  console.log(`Getting ${newCollectionsSlugs.length} new collections.`)

  let newCollectionsQuery = null

  if (newCollectionsSlugs.length > 100 || getAll) {
    newCollectionsQuery = latestCollectionsQuery.replace('query: $query', `query: "status:active AND published_status:published"`).replace('($query: String!)', '')
  } else {
    newCollectionsQuery = latestCollectionsQuery.replace('query: $query', `query: "(${newCollectionsSlugs.join(' OR ')}) AND status:active AND published_status:published"`).replace('($query: String!)', '')
  }

  const config = buildRequest({
    query: runBulkMutation,
    variables: { query: newCollectionsQuery },
  })

  const result = await axios(config)
  const errors = result.data.data.bulkOperationRunQuery.userErrors.length

  if (errors > 0 && !secondAttempt) {
    const currentOperation = await axios(buildRequest({
      query: currentBulkOperation,
      variables: { query: newCollectionsQuery },
    }))

    console.log(`Canceling bulk operation with ID: ${currentOperation.data.data.currentBulkOperation.id} (Object Count: ${currentOperation.data.data.currentBulkOperation.objectCount})`)
    console.log(currentOperation.data.data)

    await axios(buildRequest({
      query: cancelBulkMutation,
      variables: { id: currentOperation.data.data.currentBulkOperation.id },
    }))

    return getNewCollections(collections, true)
  }

  if (errors > 0 && secondAttempt) {
    throw new Error(JSON.stringify(result.data.data.bulkOperationRunQuery.userErrors))
  }


  return await bulkOperationById(result.data.data.bulkOperationRunQuery.bulkOperation.id)
}

async function updateUnpublishedProductsList(sitemapProducts, cachedProducts) {
  let deletedProducts = []

  for (let {product: cachedProduct} of cachedProducts) {
    // Ignore "swatches" products as they are not rendering in the sitemap, but they are on the page
    if (cachedProduct.variants?.length && cachedProduct.variants[0].price == 0) {
      continue
    }

    if (!sitemapProducts.find((handle) => handle === cachedProduct.handle) && !deletedProducts.find(handle => cachedProduct.handle === handle)) {
      deletedProducts.push(cachedProduct.handle)
    }
  }

  try {
    const versions = await (new Fastly.VersionApi()).listServiceVersions({
      'service_id': process.env.GATSBY_FASTLY_SERVICE_ID
    });

    let currentVersionId = null
    let snippetId = null
    
    for (let version of versions) {
      if (version.active === true) {
        currentVersionId = version.number

        break
      }
    }

    const snippets = await (new Fastly.SnippetApi()).listSnippets({
      'service_id': process.env.GATSBY_FASTLY_SERVICE_ID,
      'version_id': currentVersionId,
    });

    for (let snippet of snippets) {
      if (snippet.name === 'Dynamic Snippet Disabled Products List') {
        snippetId = snippet.id

        break
      }
    }

    let snippetContent = ''

    for (let deletedProduct of deletedProducts) {
      snippetContent += `"/products/${deletedProduct}": "/products/${deletedProduct}",`
    }

    const updatedSnippet = await (new Fastly.SnippetApi()).updateSnippetDynamic({
      'service_id': process.env.GATSBY_FASTLY_SERVICE_ID,
      'version_id': currentVersionId,
      'snippet_id': snippetId,
      'name': 'Dynamic Snippet Disabled Products List',
      'type': 'init',
      'dynamic': 1,
      'content': `table disabled_products {
        ${snippetContent.slice(0, -1)}
      }`
    });
  } catch(error) {
    console.error("Error calling VersionApi.listServiceVersions", error);
  }
}

module.exports = {
  bulkOperationById,
  getSpecificProducts,
  getSpecificCollections,
  getLatestProducts,
  getNewCollections,
}
