const query = `mutation bulkOperationRunQuery($query: String!) {
  bulkOperationRunQuery(query: $query) {
    bulkOperation {
      id
    }
    userErrors {
      field
      message
    }
  }
}
`

module.exports = query
