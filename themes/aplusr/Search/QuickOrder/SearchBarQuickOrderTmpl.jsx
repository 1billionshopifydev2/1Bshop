import React, { memo } from 'react'
import * as Components from '../../../../src/components/Search/QuickOrder/SearchBar'


const SearchBarQuickOrderTmpl = props => {
  // Not found results
  if (props.products.length === 0) {
    return (
      <div
        className={`search__suggestions suggestions not-found ${
          props.isMobile
            ? 'suggestions--location--mobile-header'
            : 'suggestions--location--header'
        }`}
      >
        0 Product Results for &apos;{props.searchQuery}&apos;
      </div>
    )
  }
  // If has results
  if (props.products.length > 0) {
    return (
      <div className="search__suggestions suggestions suggestions--location--header">
        <ul className="suggestions__list">
          {props.products.slice(0, process.env.SEARCH_MAX_RESULTS).map(product => {
            return product.variants.map(variant => {
              if (variant.availableForSale) {
                return (
                  <li key={variant.id} className="suggestions__item">
                    <div
                      className="suggestions__item-link"
                      onClick={() => props.handleClickProduct(product, variant)}
                    >
                      <Components.SearchBarProduct product={product} variant={variant} />
                    </div>
                  </li>
                )
              }
            })   
          })}
        </ul>
      </div>
    )
  }
  return null
}

export default memo(SearchBarQuickOrderTmpl)
