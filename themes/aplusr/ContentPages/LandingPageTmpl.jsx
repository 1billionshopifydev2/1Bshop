import React from 'react'
import ContentSection from '../../../src/components/ContentPages/ContentSections'

import * as Components from '../../../src/components/ContentPages/ContentPage'

const LandingPageTmpl = ({ data }) => (
  <Components.Layout mainClassAffix={`landing ${data.slug ? `page-${data.slug}` : ''}`}>
    <Components.SEO title={data.SEO?.title} description={data.SEO?.description} />
    <div className="container">
      <ContentSection sections={data.sections} />
    </div>
  </Components.Layout>
)

export default LandingPageTmpl
