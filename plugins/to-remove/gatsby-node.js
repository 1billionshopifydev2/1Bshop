const { getData } = require("./requests")

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MoreProductsByCollection implements Node {
      handle: String
      title: String
      descriptionHtml: String
      products: [MoreProductsByCollectionProduct]
    }
    type MoreProductsByCollectionProduct implements Node {
      id: String
      handle: String
      title: String
      images: [MoreProductsByCollectionProductImages]
      priceRangeV2: MoreProductsByCollectionProductPriceRangeV2
      tags: [String]
      vendor: String
    }
    type MoreProductsByCollectionProductImages implements Node {
      id: String
      originalSrc: String
      altText: String
    }
    type MoreProductsByCollectionProductPriceRangeV2 implements Node {
      minVariantPrice: MoreProductsByCollectionProductPriceRangeV2variant
      maxVariantPrice: MoreProductsByCollectionProductPriceRangeV2variant
    }
    type MoreProductsByCollectionProductPriceRangeV2variant implements Node {
      amount: String
      currencyCode: String
    }
  `
  createTypes(typeDefs)
}

exports.sourceNodes = async (args) => {
  const { actions, createNodeId, createContentDigest, reporter, cache } = args

  if (process.env.GATSBY_BUILD_MODE === 'preview') {
    reporter.info('Skipping generating nodes for MoreProductsByCollection as it is preview mode')

    return
  }

  const { allCollections } = await getData(reporter, cache)

  allCollections.forEach((collection) => {
    actions.createNode({
      id: createNodeId(collection.id),
      title: collection.title,
      handle: collection.handle,
      products: collection.products.slice(0, 4) ?? [],
      descriptionHtml: collection?.descriptionHtml ?? '',
      internal: {
        type: 'MoreProductsByCollection',
        contentDigest: createContentDigest({
          handle: collection.handle,
          products: collection.products.slice(0, 4) ?? [],
          descriptionHtml: collection?.descriptionHtml ?? '',
        }),
      },
    })
  })
}