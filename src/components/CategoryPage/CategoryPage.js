import React from 'react'
import PropTypes from 'prop-types'

import categoryCore from './CategoryCore'

const CategoryPageTmpl = require(`../../../themes/${process.env.B2S_THEME_NAME}/CategoryPage/CategoryPageTmpl`)
  .default

const CategoryPage = ({ location, data, pageContext }) => {
  const Component = categoryCore(data, pageContext, location)(CategoryPageTmpl)

  return <Component />
}

CategoryPage.propTypes = {
  pageContext: PropTypes.shape({
    parentTitle: PropTypes.string,
    parentPath: PropTypes.string,
  }).isRequired,
}

export default CategoryPage
