import React from 'react'
import Link from '@b2s_core/src/utils/Link'

import { Layout } from '../../layouts'
import SEO from '@b2s_core/src/components/seo'
import { priceFormatter, resizedImgURL } from '@b2s_core/src/utils/helpers'
import useCategoryCore from '@b2s_core/src/components/CategoryPage/useCategoryCore'

const CategroyListTmpl = require(`../../../themes/${process.env.B2S_THEME_NAME}/CategoryPage/CategoryFilters/CategroyListTmpl`)
  .default
const ProductFilterTmpl = require(`../../../themes/${process.env.B2S_THEME_NAME}/CategoryPage/CategoryFilters/ProductFilterTmpl`)
  .default

const categoryCore = (data, pageContext, location) => HocComponent => () => {
  const { optionsProps, filtersProps } = useCategoryCore(location, pageContext, data)

  const ownProps = {
    ...optionsProps,
    ...filtersProps,
    pageContext,
    collection: pageContext,
    priceFormatter,
    resizedImgURL,
    pathname: location.pathname,
  }

  return <HocComponent {...ownProps} />
}

export default categoryCore

export {
  Link,
  Layout,
  SEO,
  CategroyListTmpl,
  ProductFilterTmpl,
}
