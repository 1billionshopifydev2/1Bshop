import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const HorizontalCTAImgTmpl = ({ data }) => {
  return (
    <section id="shopify-section-5">
      <div className="container mb-5">
        <div className="border border-2 border-dark">
          <div className="row flex-lg-row-reverse g-0">
            <div className="col-lg-8">
              <a className="bg-light d-block" href={data.URL}>
                <div className="embed-responsive embed-responsive-15by7">
                  <div className="embed-responsive-item">
                    <LazyLoadImage
                      className="w-100"
                      src={`${process.env.STRAPI_URL}${data.image.url}`}
                      alt={data.image.arternativeText}
                      loading="lazy"
                    />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 px-2">
              <div className="d-flex flex-column h-100 p-3">
                <div className="h-100">
                  <div className="title">
                    <h3 className="my-3">
                      <a href={data.URL}>{data.headline}</a>
                    </h3>
                  </div>
                  <div className="text">
                    <div className="text-justify">
                      <p className="fs-16 fw-300 mb-3">{ data.description }</p>
                    </div>
                  </div>
                </div>
                <div className="h-auto">
                  <div className="mb-3">
                    <a
                      className="btn btn-default bg-dark text-white text-small border-0 px-4 py-2"
                      href={data.URL}
                    >
                      { data.cta__button_label }
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HorizontalCTAImgTmpl
