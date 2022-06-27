import React from 'react'
import * as Components from '../../src/components/ContentPages/Returns/ReturnsCore'

// IT'S DYNAMIC PAGE
// HOW TO FIND THIS PAGE IN SHOPIFY ADMIN PANEL:
// Online Store => Pages => Returns

// PROPS DESCRIPTION
// returns {
//   id => Unique page ID
//   title => HTML inside id="title"
//   subtitle => HTML inside id="subtitle"
//   content => HTML inside id="content"
// }

const ReturnsTmpl = returns => (
  <Components.Layout>
    <Components.SEO title={returns.title} />
    <Components.PageHeading title={returns.title} blue textCenter />
    <div className="block">
      <div className="container">
        <div className="row">
          <h5 className="col-12 text-muted text-center py-4">
            {returns.subtitle}
          </h5>
        </div>
        <div
          className="typography"
          dangerouslySetInnerHTML={{ __html: returns.content }}
        />
      </div>
    </div>
  </Components.Layout>
)

ReturnsTmpl.propTypes = Components.componentPropTypes
ReturnsTmpl.defaultProps = Components.componentDefaultProps
export default ReturnsTmpl
