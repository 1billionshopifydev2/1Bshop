const collectionFragment = require("./fragment-collection")

const query = `query collection($handle: String!, $numOfProducts: Int!) {
  collectionByHandle(handle: $handle) {
    ${collectionFragment}
    products(first: $numOfProducts) {
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
          images(sortKey: POSITION, first: 10) {
            edges {
                node {
                    id
                    altText
                    src
                    originalSrc
                    width
                    height
                }
            }
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
}`

module.exports = query
