import React from 'react'
import Link from '@b2s_core/src/utils/Link'
import ReactMarkdown from 'react-markdown'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ImageTextLeftTmpl = ({ data }) => {
  return (
    <section id="shopify-section-7">
      <div className="pb-3 mb-3">
        <div className="container">
          <hr className="border-dark border mb-3" />
          <div className="row">
            <div className="col">
              <h2 className="mb-5">{data.title}</h2>
            </div>
            <div className="col-auto">
              <h4 className="text-right mb-5">
                <Link to="/pages/about-us"> {data.CTA} → </Link>
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9">
              <div className="bg-light mb-3">
                <div className="embed-responsive embed-responsive-16by9">
                  <div className="embed-responsive-item">
                    <LazyLoadImage
                      className="w-100"
                      src={`${process.env.STRAPI_URL}${data.picture.url}`}
                      alt={data.picture.alternativeText}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 py-3 lh-17">
              <ReactMarkdown
                transformImageUri={uri =>
                  uri.startsWith("http") ? uri : `${process.env.STRAPI_URL}${uri}`
                }
              >
                {data.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageTextLeftTmpl
