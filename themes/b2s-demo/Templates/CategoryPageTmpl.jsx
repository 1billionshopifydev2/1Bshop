import React from 'react'
import {Layout} from '../../../src/components/Layout/Layout'
import SEO from '@b2storefront/b2s_core/dist/components/snippets/SEO'

const CategoryPageTmpl = props => (
  <Layout>
    <SEO
      title={props.seo.title}
      description={props.seo.description}
    />
    
  </Layout>
)

export default CategoryPageTmpl
