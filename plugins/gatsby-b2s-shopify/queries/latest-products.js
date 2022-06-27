const productFragment = require("./fragment-product")

const query = `query products($query: String!) {
  products(query: $query) {
    edges {
      node {
        ${productFragment}
      }
    }
  }
}`

module.exports = query