import React from 'react'
import * as Components from '../../src/components/ContentPages/Returns/ReturnsCore'

// IT'S DYNAMIC PAGE
// HOW TO FIND THIS PAGE IN SHOPIFY ADMIN PANEL:
// Online Store => Pages => Terms And Conditions

// PROPS DESCRIPTION
// terms {
//   id => Unique page ID
//   title => HTML inside id="title"
//   subtitle => HTML inside id="subtitle"
//   content => HTML inside id="content"
// }

const TermsAndConditionsTmpl = terms => (
  <Components.Layout>
    <Components.SEO title={terms.title} />
    <Components.PageHeading title={terms.title} blue textCenter />
    <div className="block">
      <div className="container">
        <div className="row">
          <h5 className="col-12 text-muted text-center py-4">
            {terms.subtitle}
          </h5>
        </div>
        <div
          className="typography"
          dangerouslySetInnerHTML={{ __html: terms.content }}
        />
      </div>
    </div>
  </Components.Layout>
)

TermsAndConditionsTmpl.propTypes = Components.componentPropTypes
TermsAndConditionsTmpl.defaultProps = Components.componentDefaultProps
export default TermsAndConditionsTmpl
