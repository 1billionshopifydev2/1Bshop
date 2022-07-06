const collectionFragment = require("./fragment-collection")

const query = `query collections($query: String!) {
  collections(query: $query) {
    edges {
      node {
        ${collectionFragment}
      }
    }
  }
}`

module.exports = query
