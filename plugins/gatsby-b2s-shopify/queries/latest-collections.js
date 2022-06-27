const collectionFragment = require("./fragment-collection")

const query = `query collections($query: String!) {
  collections(query: $query) {
    edges {
      node {
        ${collectionFragment}
        products(first: 50) {
          edges {
            node {
              id
              handle
              title
              vendor
              tags
              featuredImage {
                  src
                  altText
              }
              priceRangeV2 {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              updatedAt
            }
          }
        }
      }
    }
  }
}`

module.exports = query
