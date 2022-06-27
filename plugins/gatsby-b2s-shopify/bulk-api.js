const {
  getAllBulkOperations,
  getBulkOperationByID,
  fetchCollections,
} = require('./utils')
const fetch = require('node-fetch')

async function wait(delay = 27000) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

async function getProducts(bulkOperationId, reporter) {
  const bulkOperation = await getBulkOperationByID(bulkOperationId)

  const { node } = bulkOperation.data.data
  const { status, url } = node

  if (status === 'COMPLETED') {
    reporter.info(`${id} is already completed`)
    return fetch(url)
  }

  if (status === 'RUNNING') {
    await wait()
    return await getProducts(bulkOperationId, reporter)
  }

  if (status === 'EXPIRED') {
    return Promise.reject(new Error('EXPIRED'))
  }
}

async function getCollections(reporter) {
  const bulkOperations = await getAllBulkOperations()
  const { collections } = bulkOperations.data.data
  const { status, url, id } = collections
  if (status === 'COMPLETED') {
    reporter.info(`${id} is already completed`)
    return fetch(url)
  }
  if (status === 'RUNNING') {
    await wait()
    return await getCollections()
  }

  if (status === 'EXPIRED') {
    await fetchCollections()
    return Promise.reject(new Error('EXPIRED'))
  }
}

async function resolveIncremental(id) {
  const bulkOperation = await getBulkOperationByID(id)
  const { node } = bulkOperation.data.data
  const { status, url } = node

  if (status === 'COMPLETED') {
    if (!url) return Promise.resolve([])
    return fetch(url)
  }

  if (status === 'RUNNING') {
    await wait()
    return await resolveIncremental(id)
  }
}

function getProductVariants() {}

module.exports = {
  getProducts,
  getCollections,
  getProductVariants,
  resolveIncremental,
}
