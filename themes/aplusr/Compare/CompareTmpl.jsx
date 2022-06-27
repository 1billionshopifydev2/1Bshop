import React from 'react'
import * as Components from '../../../src/components/Compare/CompareCore'

const CompareTmpl = props => (
  <Components.Layout>
    <Components.SEO title="Compare products" />
    <Components.PageHeading title="Compare products">
      <Components.Breadcrumb>
        <Components.Breadcrumb.Item to="/">Home</Components.Breadcrumb.Item>
        <Components.Breadcrumb.Item>
          Compare products
        </Components.Breadcrumb.Item>
      </Components.Breadcrumb>
    </Components.PageHeading>
    <div className="container py-5">
      <div className="row">
        <aside className="col-12">
          {props.isLoading ? (
            <Components.Loader />
          ) : (
            <Components.CompareTableCore items={props.products} />
          )}
        </aside>
      </div>
    </div>
  </Components.Layout>
)

export default CompareTmpl
