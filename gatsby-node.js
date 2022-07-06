const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
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
