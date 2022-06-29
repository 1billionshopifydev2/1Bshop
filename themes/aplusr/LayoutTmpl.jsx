import React from 'react'
import { Helmet } from 'react-helmet'
import ErrorBoundary from '@b2s_core/src/components/ErrorBoundary'
import { Footer } from '../../src/components/Footer'
import { Header } from '../../src/components/Header'

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
              "name": "B2Storefront",
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
    <ErrorBoundary>
      <Header isMenuOpen={props.isMenuOpen} menuItems={props.menuData} />
      {props.children}
      <Footer renderNewsletter={props.renderNewsletter} />
    </ErrorBoundary>
  </>
)

export default LayoutTmpl
