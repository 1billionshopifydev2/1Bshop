/* eslint-disable */

import React from 'react'
import { Helmet } from 'react-helmet'

import * as Components from '../../src/layouts'

const LayoutTmpl = (props) => (
  <>
    <Helmet
      script={[
        {
          type: 'application/ld+json',
          innerHTML: `
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "A+R",
              "url": "${process.env.GATSBY_SHOP_URL}",
              "description": "${props.description}",
              "logo": "${process.env.GATSBY_SHOP_URL}/images/arLogo.jpeg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "1318 E 7th Street, Suite 100",
                "addressLocality": "Los Angeles",
                "postalCode": "90021",
                "addressCountry": "US" 
              }
            }`,
        },
      ]}
    />
    <Components.ErrorBoundary>
      <div id="stage">
        <Components.HeaderDesktopCore isMenuOpen={props.isMenuOpen} menuItems={props.menuData} />
        <main className='site__body page'>
          {props.children}
        </main>
        <Components.FooterCore renderNewsletter={props.renderNewsletter} />
        <div id="b2storefront-helper" style={{display: 'none'}}>
          BUILD_MODE: {process.env.GATSBY_BUILD_MODE}
        </div>
      </div>
      <Components.MobileSidebar menuItems={props.menuData} />
      <div className="modal-backdrop fade" style={{ display: 'none' }} />
    </Components.ErrorBoundary>
  </>
)

export default LayoutTmpl
