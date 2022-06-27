const query = `mutation bulkOperationCancel($id: ID!) {
  bulkOperationCancel(id: $id) {
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
