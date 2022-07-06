const productFragment = require("./fragment-product")

const query = `query products($ids: [ID!]!) {
  nodes(ids: $ids) {
    ...on Product {
      ${productFragment}
    }
  }
}`

module.exports = query
