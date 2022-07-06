const productFragment = require("./fragment-product")

const query = `query product($handle: String!) {
  productByHandle(handle: $handle) {
    ${productFragment}
  }
}`

module.exports = query
