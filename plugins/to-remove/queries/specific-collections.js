const collectionFragment = require("./fragment-collection")

const query = `query collections($ids: [ID!]!) {
  nodes(ids: $ids) {
    ...on Collection {
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
}`

module.exports = query
