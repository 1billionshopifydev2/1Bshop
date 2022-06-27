const collectionFragment = require("./fragment-collection")

const query = `query collection($id: ID!) {
  collection(id: $id) {
    ${collectionFragment}
  }
}`

module.exports = query
