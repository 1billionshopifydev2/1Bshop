import React from 'react'

const strapiUrl = process.env.STRAPI_URL

const StrapiImage = ({
  className,
  image,
  sizes,
  loading = 'lazy',
  width = '',
  height = '',
}) => {
  const {
    formats: { small, medium, large },
  } = image

  const concatSrcSet = (small = false, medium = false, large = false) => {
    let srcSet = ''
    if (small) srcSet += `${strapiUrl}${small?.url} ${small.width}w, `
    if (medium) srcSet += `${strapiUrl}${medium?.url} ${medium.width}w, `
    if (large) srcSet += `${strapiUrl}${large?.url} ${large.width}w, `
    srcSet += `${strapiUrl}${image.url} ${image.width}w`

    return srcSet
  }

  return (
    <img
      alt={image.alternativeText}
      className={className}
      height={height}
      loading={loading}
      sizes={sizes}
      src={`${strapiUrl}${image.url}`}
      srcSet={concatSrcSet(small, medium, large)}
      width={width}
    />
  )
}

export default StrapiImage
