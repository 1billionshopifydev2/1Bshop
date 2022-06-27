import React from 'react'
import Link from '@b2s_core/src/utils/Link'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const SaleGridTmpl = ({ data }) => {
  return (
    <div className="container">
      <div className="row">
        {
          data.sale_item.map((item, i) => (
            <div key={i} className="col-lg-6 pb-5">
                <div className="pb-3 mb-3">
                  <Link
                    className="bg-light d-block"
                    to={item.URL}
                  >
                    <div className="embed-responsive embed-responsive-3by2">
                      <div className="embed-responsive-item">
                        <LazyLoadImage
                          className="w-100"
                          srcSet={`${process.env.STRAPI_URL}${item.picture.url}`}
                          src={`${process.env.STRAPI_URL}${item.picture.url}`}
                          alt="Statement: Steel in Rotation Table"
                        />
                      </div>
                    </div>
                  </Link>
                </div>
                <h3 className="mb-3">
                  <Link to={item.URL}>
                    { item.title }
                  </Link>
                </h3>
                <p className="mb-3">{ item.description }</p>
                <div className="mb-3">
                  <Link to={item.URL}>{ item.bottom_cta }</Link>
                </div>
              </div>
          ))
        }
      </div>
    </div>
  )
}

export default SaleGridTmpl