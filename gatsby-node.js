const path = require('path')
const { getData } = require('@b2storefront/gatsby-b2storefront-shopify/requests')

exports.createPages = async ({ cache, actions, reporter }) => {
  const { createPage } = actions

  const { allProducts, allCollections } = await getData(reporter, cache)

  for (let product of allProducts) {
    createPage({
      path: `/products/${product.slug}`,
      component: path.resolve('./src/components/Templates/ProductPage.js'),
      context: {
        product,
      },
    })
  }

  for (let collection of allCollections) {
    createPage({
      path: `/collections/${collection.slug}`,
      component: path.resolve('./src/components/Templates/CategoryPage.js'),
      context: {
        collection,
      },
    })
  }
}

exports.sourceNodes = async (args) => {
  const { actions, createNodeId, createContentDigest } = args
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@themes': path.resolve(__dirname, 'themes'),
      },
    },
  })
}
