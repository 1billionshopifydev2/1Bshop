const { serializeCollection, buildRequest, wait } = require('./utils')
const upholsteryCollectionsQuery = require('./queries/upholstery-collections')
const runBulkMutation = require('./queries/bulk-run-mutation')
const axios = require('axios')
const { bulkOperationById } = require('./requests')

const getUpholsteriesByTags = async () => {
    let collections = {}
    let bulkResult = await getUpholsteryCollections()
    
    if (bulkResult && bulkResult.url) {
      collections = await serializeCollection([], bulkResult.url)
    }
  
    const upholsteriesByTags = []
  
    for (let collection of collections) {  
      if (collection.groupCombo?.reference?.url) {
        const { data } = await axios.get(collection.groupCombo.reference.url)
  
        upholsteriesByTags[`b2s_upholstery_${collection.id.replace(/[^0-9]+/, '')}`] = data
      }
    }
  
    return upholsteriesByTags
  }
  
  const getUpholsteryCollections = async () => {
    const query = upholsteryCollectionsQuery.replace('query: $query', `query: "b2s_upholstery_*"`).replace('($query: String!)', '')
  
    const config = buildRequest({
      query: runBulkMutation,
      variables: { query: query },
    })
  
    const result = await axios(config)
    const errors = result.data.data.bulkOperationRunQuery.userErrors.length
  
    if (errors > 0) {
      const hasAlreadyInProgressError = result.data.data.bulkOperationRunQuery.userErrors.find(error => typeof error.message === 'string' && error.message.includes('is already in '))

      if (hasAlreadyInProgressError) {
        console.log(`Bulk operation for getting upholstery groups is still running`)

        await wait(10000)

        return await getUpholsteryCollections()
      }

      throw new Error(JSON.stringify(result.data.data.bulkOperationRunQuery.userErrors))
    }
  
    return await bulkOperationById(result.data.data.bulkOperationRunQuery.bulkOperation.id)
  }

  module.exports = {
    getUpholsteriesByTags
  }