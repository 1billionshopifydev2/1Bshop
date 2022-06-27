import React from 'react'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'

import * as Component from 'src/components/ContentPages/ContentPage'
import EditButtons from '../EditButtons/EditButtons'

const FaqPageTmpl = ({ data }) => {
  return (
    <Component.Layout>
      <Component.SEO title={data.seo?.title} description={data.seo?.description} />
      <div className="page">
        <div className="py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="title">
                  <h1 className="mb-3">{data.headline}</h1>
                </div>
                <ReactMarkdown>{ data.glossary }</ReactMarkdown>
                <hr />
                {
                  data.terms_section &&
                  data.terms_section.map(({ title, terms }) => (
                    <div>
                      <h2>{ title }</h2>
                      {
                        terms.map(({ headline, content, link_to_glossary }) => (
                          <div>
                            <div id={link_to_glossary} style={{ transform: 'translateY( -6rem )' }} />
                            <h4>{headline}</h4>
                            <ReactMarkdown>{ content }</ReactMarkdown>
                          </div>
                        ))
                      }
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditButtons editStrapiUrl={`${process.env.STRAPI_URL}/admin/plugins/content-manager/collectionType/application::glossary-pages.glossary-pages/1`} />
    </Component.Layout>
  )
}

FaqPageTmpl.propTypes = {
  data: PropTypes.object
}

export default FaqPageTmpl