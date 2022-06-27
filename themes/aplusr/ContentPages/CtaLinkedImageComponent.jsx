import React from 'react'
import Link from '@b2s_core/src/utils/Link'

const CtaLinkedImageComponent = ({ data }) => {
  return (
    <div className="container">
      <hr class="border-dark border" />
      <div className="row">
        <div className="col-lg-6">
          <h2 className="mb-5">
            <Link to={`/pages/${data.cta_url}`} >{data.title}</Link>
          </h2>
        </div>
        <div className="col-lg-6">
          <p>{data.description}</p>
          <Link to={`/pages/${data.cta_url}`}>{data.cta_label}</Link>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Link to={`/pages/${data.cta_url}`}>
            <img className="m-auto w-100" src={`${process.env.STRAPI_URL}${data.image.url}`} alt={data.image.alternativeText} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CtaLinkedImageComponent