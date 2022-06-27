import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const BigSaleTmpl = ({ data }) => {
  return (
    <section id="shopify-section-3">
      <div className="container">
        <div className="row">
          <div className="col-12 pb-3">
            <div className="pb-3">
              <a
                className="bg-light d-block"
                href={data.URL}
              >
                <div className="embed-responsive embed-responsive-16by9">
                  <div className="embed-responsive-item">
                    <LazyLoadImage
                      className="w-100"
                      src={`${process.env.STRAPI_URL}${data.image.url}`}
                      alt="Shimmer and Smoke"
                      loading="lazy"
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="col-lg-8 pb-5">
            <h3 className="mb-3">
              <a href={data.URL} >{data.title}</a>
            </h3>
            <p className="fs-16 fw-300 mb-3">{ data.description }</p>
            <div className="mb-3">
              <a
                href={data.URL}
              >
                {data.cta_bottom}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BigSaleTmpl