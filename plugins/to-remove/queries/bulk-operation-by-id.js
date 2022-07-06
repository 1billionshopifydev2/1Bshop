const query = `query($id: ID!) {
    node(id: $id) {
      ... on BulkOperation {
        id
        url
        completedAt
        status
      }
    }
  }  
`

module.exports = query
