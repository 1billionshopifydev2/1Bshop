import React from 'react'

import * as Components from 'src/utils/shared'
import ContentSections from 'src/components/ContentPages/ContentSections'
import EditButtons from './EditButtons/EditButtons'

const AboutUsTmpl = ({ aboutUs }) => {
  return (
    <Components.Layout renderNewsletter={!aboutUs.newsletter}>
      <Components.SEO title={aboutUs.seo?.title} description={aboutUs.seo?.description} />
      <div className="page">
        <div className="py-5">
          <div className="container">
            <hr className="border-dark border m-0" />
            <div className="row">
              <div className="col-lg-6">
                <h1 className="my-3">{ aboutUs.headline }</h1>
              </div>
              <div className="col-lg-6">
                <img className="w-100" src={`${process.env.STRAPI_URL}${aboutUs.hero_image.url}`} alt=""/>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col-lg-6">
                <Components.ReactMarkdown>{aboutUs.content}</Components.ReactMarkdown>
              </div>
              <div className="col-lg-6">
                <ContentSections sections={aboutUs.sidebar} />
              </div>
            </div>
            <div className="row">
            </div>
          </div>
          <ContentSections sections={aboutUs.bottom_sections} />
          <div className="container">
          <div className="row">
            <hr className="border-dark border footer-row mx-2 my-3" />
            <ContentSections sections={aboutUs.newsletter} />
            </div>
          </div>
        </div>
      </div>

      <EditButtons editStrapiUrl={`${process.env.STRAPI_URL}/admin/plugins/content-manager/singleType/application::about-us.about-us`} />
    </Components.Layout>
  )

}

export default AboutUsTmpl