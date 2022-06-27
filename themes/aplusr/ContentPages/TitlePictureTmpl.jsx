import React from 'react'
import Link from '@b2s_core/src/utils/Link'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const TitlePictureTmpl = ({ data }) => {
  const urlPath = data.URL.replace(/http(s)*:\/\/aplusrstore.com/g, '')

  if (data.title_position === 'top') {
    return (
      <div className={`d-flex flex-wrap title-picture`}>
        {
          data.title_position === 'top' && <h4>{data.title}</h4>
        }
        <Link to={urlPath}>
          <LazyLoadImage src={`${process.env.STRAPI_URL}${data.picture.url}`} alt={data.picture.alternativeText} />
        </Link>
      </div>
    )
  }

  return (
    <div className={`d-flex flex-wrap justify-content-center title-picture`}>
      <LazyLoadImage src={`${process.env.STRAPI_URL}${data.picture.url}`} alt={data.picture.alternativeText} />
      {
        data.title_position === 'bottom' && <Link to={urlPath}>{data.title}</Link>
      }
    </div>
  )
}

export default TitlePictureTmpl