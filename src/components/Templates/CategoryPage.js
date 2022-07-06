import React from 'react'
import useCategoryCore from '@b2storefront/b2s_core/dist/components/CategoryPage/useCategoryCore'

const CategoryPageTmpl = require(`@themes/${process.env.B2S_THEME_NAME}/Templates/CategoryPageTmpl`).default

const CategoryPage = ({ location, data, pageContext }) => {
  const ownProps = useCategoryCore(location, pageContext, data)

  return <CategoryPageTmpl {...ownProps} />
}

export default CategoryPage
