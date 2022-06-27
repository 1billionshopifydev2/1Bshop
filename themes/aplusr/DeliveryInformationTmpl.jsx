import React from 'react'
import * as Components from '../../src/components/ContentPages/DeliveryInformation/DeliveryInformationCore'

// IT'S DYNAMIC PAGE
// HOW TO FIND THIS PAGE IN SHOPIFY ADMIN PANEL:
// Online Store => Pages => Delivery Information

// PROPS DESCRIPTION
// deliveryInformation {
  // id => Unique page ID
  // title => HTML inside id="title"
  // subtitle => HTML inside id="subtitle" 
  // content => HTML inside id="content"
// }

const DeliveryInformationTmpl = deliveryInformation => (
  <Components.Layout>
    <Components.SEO title={deliveryInformation.title} />
    <Components.PageHeading title={deliveryInformation.title} blue textCenter />
    <div className="block">
      <div className="container">
        <div className="row">
          <h5 className="col-12 text-muted text-center py-4">
            {deliveryInformation.subtitle}
          </h5>
        </div>
        <div
          className="typography"
          dangerouslySetInnerHTML={{ __html: deliveryInformation.content }}
        />
      </div>
    </div>
  </Components.Layout>
)

DeliveryInformationTmpl.propTypes = Components.componentPropTypes
DeliveryInformationTmpl.defaultProps = Components.componentDefaultProps
export default DeliveryInformationTmpl
