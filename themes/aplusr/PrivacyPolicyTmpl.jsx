import React from 'react'
import * as Components from '../../src/components/ContentPages/PrivacyPolicy/PrivacyPolicyCore'

// IT'S DYNAMIC PAGE
// HOW TO FIND THIS PAGE IN SHOPIFY ADMIN PANEL:
// Online Store => Pages => Privacy Policy

// PROPS DESCRIPTION
// privacyPolicy {
//   id => Unique page ID
//   title => HTML inside id="title"
//   subtitle => HTML inside id="subtitle"
//   content => HTML inside id="content"
// }

const PrivacyPolicyTmpl = privacyPolicy => (
  <Components.Layout>
    <Components.SEO title={privacyPolicy.title} />
    <Components.PageHeading title={privacyPolicy.title} blue textCenter />
    <div className="block">
      <div className="container">
        <div className="row">
          <h5 className="col-12 text-muted text-center py-4">
            {privacyPolicy.subtitle}
          </h5>
        </div>
        <div
          className="typography"
          dangerouslySetInnerHTML={{ __html: privacyPolicy.content }}
        />
      </div>
    </div>
  </Components.Layout>
)

PrivacyPolicyTmpl.propTypes = Components.componentPropTypes
PrivacyPolicyTmpl.defaultProps = Components.componentDefaultProps
export default PrivacyPolicyTmpl
