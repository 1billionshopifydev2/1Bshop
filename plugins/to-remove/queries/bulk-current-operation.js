const query = `query OPERATION_STATUS {
  currentBulkOperation {
      id
      status
      errorCode
      createdAt
      completedAt
      objectCount
      fileSize
      url
      partialDataUrl
  }
}
`

module.exports = query
