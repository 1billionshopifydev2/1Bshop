import React from 'react'
import * as Components from '../../../src/components/Wishlist/WishlistCore'
import Breadcrumb from '../Shared/BreadcrumbTmpl';

const WishlistTmpl = props => (
  <Components.Layout>
    <Components.SEO title="Wishlist" />
    <Components.PageHeading title="Wishlist">
      <Breadcrumb>
        <Breadcrumb.Item to="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item>Wishlist</Breadcrumb.Item>
      </Breadcrumb>
    </Components.PageHeading>
    <div className="container py-5">
      <div className="row">
        <aside className="col-12">
          {props.isLoading ? (
            <Components.Loader />
          ) : (
            <Components.WishlistTableCore items={props.products} />
          )}
        </aside>
      </div>
    </div>
  </Components.Layout>
) 

export default WishlistTmpl
