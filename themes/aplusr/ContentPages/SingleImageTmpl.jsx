import React from 'react'

const SingleImageTmpl = ({ data }) => {
  return (
    <img
      className="w-100 my-2"
      src={`${process.env.STRAPI_URL}${data.picture.url}`}
      alt={data.picture.alternativeText} />
  )
}

export default SingleImageTmpl