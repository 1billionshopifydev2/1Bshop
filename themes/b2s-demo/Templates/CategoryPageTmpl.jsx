import React from 'react'
import * as Components from '../../../src/components/CategoryPage/CategoryCore'

const CategoryPageTmpl = props => (
  <Components.Layout>
    <Components.SEO
      title={props.seo.title}
      description={props.seo.description}
    />
    
  </Components.Layout>
)

export default CategoryPageTmpl
