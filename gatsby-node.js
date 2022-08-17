const path = require('path')
const newrelic = require('newrelic')
const email = require('git-user-email')
const { getData } = require('@b2storefront/gatsby-b2storefront-shopify/requests')
const util = require('util');
const { default: axios } = require('axios');
const exec = util.promisify(require('child_process').exec);

const getUserEmail = async () => {
  if (email()) {
    return email()
  }

  const { stdout } = await exec("git config user.email")

  return stdout
}

let hrstart = null

exports.onPreInit = async ({ actions }) => {
  hrstart = process.hrtime()

  newrelic.recordCustomEvent('BuildStarted', {
    email: await getUserEmail(),
  })
}

exports.onPostBootstrap = async ({ actions }) => {
  let hrend = process.hrtime(hrstart)

  newrelic.recordCustomEvent('BuildFinished', {
    email: await getUserEmail(),
    duration: hrend[0]
  })
}

exports.onCreateDevServer = async ({ app }) => {
  app.use(async (req, res, next) => {
    newrelic.recordCustomEvent('Activity', {
      email: await getUserEmail(),
    })

    next()
  })
}

exports.createPages = async ({ cache, actions, reporter }) => {
  const { createPage } = actions

  if (process.env.GATSBY_BUILD_MODE !== 'preview') {
    const { allProducts, allCollections } = await getData(reporter, cache)

    for (let product of allProducts) {
      createPage({
        path: `/products/${product.slug}`,
        component: path.resolve('./src/components/Templates/ProductPage.js'),
        context: {
          product,
          productId: product.id,
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

    createPage({
      path: '/',
      component: path.resolve('./src/components/Templates/HomePage.js'),
      context: {
        allCollections,
        allProducts,
      }
    })
  }
}

exports.sourceNodes = async (args) => {
  const { actions, createNodeId, createContentDigest } = args
}

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@themes': path.resolve(__dirname, 'themes'),
      },
    },
  })
}
