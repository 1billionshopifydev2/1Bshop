const path = require('path')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const plugins = [
  'gatsby-plugin-sass',
  'gatsby-plugin-styled-components',
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-plugin-static-folders',
    options: {
      folders: [`/@themes/${process.env.B2S_THEME_NAME}/Assets`],
    },
  },
  '@b2storefront/gatsby-b2storefront-shopify',
  {
    resolve: 'gatsby-plugin-root-import',
    options: {
      '~': path.join(__dirname, 'src/'),
    },
  },
  {
    resolve: 'gatsby-plugin-no-sourcemaps',
  },
  'gatsby-plugin-image',
]

if (process.env.SENTRY_DSN) {
  plugins.push({
    resolve: '@sentry/gatsby',
    options: {
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      sampleRate: 0.7,
      enabled: (() =>
        ['production', 'stage'].indexOf(process.env.NODE_ENV) !== -1)(),
      tracesSampleRate: 0.2,
    },
  })
}

module.exports = {
  siteMetadata: {
    title: 'B2Storefront Shopify Boilerplate',
    description: '',
    author: 'b2storefront',
  },
  plugins: plugins,
}
