/* eslint-disable */

import Link from '@b2s_core/src/utils/Link'
import React from 'react'

const SuggestionItemTmpl = ({
  data: { headline, handle, image, vendor, title, priceRangeV2 },
  priceFormatter,
}) => (
  <div className="suggestion-item">
    <div className="container px-2 px-md-0">
      {headline && <p className="">{headline}</p>}
    </div>
    <Link to={handle} className="suggestion-item--container container">
      {!!image && (
        <div className="suggestion-item--image">
          <img src={image} alt={title} />
        </div>
      )}
      <div className="suggestion-item--content">
        <p className="suggestion-item--content--vendor mb-0">{vendor}</p>
        <p className="mb-0">{title}</p>
        {!!priceRangeV2 && (
          <p className="text-secondary mb-0">
            {priceFormatter(priceRangeV2.minVariantPrice.amount)}
            {priceRangeV2.minVariantPrice.amount <
              priceRangeV2.maxVariantPrice.amount && (
              <>
                {' – '}
                {priceFormatter(priceRangeV2.maxVariantPrice.amount)}
              </>
            )}
          </p>
        )}
      </div>
    </Link>
  </div>
)

export default SuggestionItemTmpl
