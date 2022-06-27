import React from 'react'
import PropTypes from 'prop-types'

const EditButtons = ({ editStrapiUrl, editShopifyUrl }) => {
  if (!process.env.GATSBY_BUILD_MODE === 'preview') {
    return null
  }

  return (
    <div className="pages__edit-buttons">
      {
        editStrapiUrl &&
        <a
          href={editStrapiUrl}
          className="btn btn-primary py-2"
          target="_blank" rel="noreferrer" >
          Edit on Strapi
        </a>
      }
      {
        editShopifyUrl &&
        <a
          href={editShopifyUrl}
          className="btn btn-primary py-2"
          target="_blank" rel="noreferrer" >
          Edit on Shopify
        </a>
      }
    </div>
  )
}

EditButtons.propTypes = {
  editShopifyUrl: PropTypes.string,
  editStrapiUrl: PropTypes.string
}

export default EditButtons