/* eslint-disable */

import React from 'react'

const FilterByPriceTmpl = ({ priceRangeV2, priceFormatter, handleActivePrice, getPricesRange, filtersActive }) => {
  const rangeAmount = 3

  const prices = getPricesRange(priceRangeV2, rangeAmount)

  return (
    <article className="filter-group">
      <div>
        <h6 className="title">Price</h6>
      </div>
      <div className="filter-content" id="priceFilter">
        {
          Boolean(prices.length) &&
          prices.map((price, i) => (
            <div
              key={i}
              onClick={() => handleActivePrice(price)}
              className={`filter-price__title text-value ${filtersActive.priceFilter.lowPrice === price.lowPrice && 'active'}`}>
              <span className="filter-price__min-value">
                {priceFormatter(price.lowPrice)}
              </span>
              {' - '}
              <span className="filter-price__max-value">
                {priceFormatter(price.topPrice)}
              </span>
            </div>
          ))
        }
      </div>
    </article>
  )
}

  export default FilterByPriceTmpl
