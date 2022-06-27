import React from 'react'
import ReactMarkdown from 'react-markdown'

import * as Components from '../../../src/components/ContentPages/ContentPage'

const SimplePageTmpl = ({ data }) => (
  <Components.Layout>
    <Components.SEO title={data.SEO?.title} description={data.SEO?.description} />
    <div className="page">
      <div className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="title">
                <h1 className="mb-3">{data.headline}</h1>
              </div>
              <ReactMarkdown className="content fs-14" >{data.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Components.Layout>
)

export default SimplePageTmpl
