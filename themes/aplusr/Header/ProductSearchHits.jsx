/* eslint-disable */

import React from 'react'
import Link from '@b2s_core/src/utils/Link'
import { connectStateResults } from 'react-instantsearch-core'

import * as Components from '../../../src/components/Header/HeaderSearch'
import { saveSearchOnLocalStorage } from '../../../src/b2s_core/src/utils/helpers'

const ProductSearchHits = connectStateResults(({ searchResults }) => {

  const handleCollectionSearchClick = (event) => {
    typeof window !== 'undefined' && saveSearchOnLocalStorage(searchResults.query)
  }

  return (
    <div className="w-100 pt-2">
      <div className="d-flex justify-content-between px-2">
        <span className="pl-2"><strong>Products</strong></span>
        <Link to={`/pages/search-results?q=${searchResults.query}`} ><span><strong>View all</strong></span></Link>
      </div>
      {
        searchResults.hits
          .slice(0, 4)
          .map(({ id, handle, product_image, Brand, price, title, variants_min_price, variants_max_price }, i) => (
            <Link onClick={handleCollectionSearchClick} key={`${id}-${i}`} className="search-product-row" to={`/products/${handle}`}>
              <div className="image-wrap">
                <img src={product_image} alt="" />
              </div>
              <div className="product-info d-flex flex-column">
                <p>{Brand}</p>
                <p className="vendor">{title}</p>
                <div>
                  {
                    !!(Number(variants_min_price) - Number(variants_max_price))
                    &&
                    <span className="starting">Starting at {' '}</span>
                  }
                  <span className="price">{Components.priceFormatter(variants_min_price)}</span>
                </div>
              </div>
            </Link>
          ))
      }
    </div>
  )
})

export default ProductSearchHits