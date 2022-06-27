import React, { memo } from 'react'
import * as Components from '../../../../src/components/Search/Products/SearchBar' 

const SearchBarTmpl = props => {
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
  // Has results
  if (props.products.length > 0) {
    return (
      <div className="search__suggestions suggestions suggestions--location--header">
        <ul className="suggestions__list">
          {props.products.slice(0, process.env.SEARCH_MAX_RESULTS).map(product => {
            return (
              <li key={product.id} className="suggestions__item"> 
                  <Components.Link
                    to={`/product/${product.handle}.html`}
                    className="suggestions__item-link"
                  >
                    <Components.SearchBarProduct product={product} />
                  </Components.Link> 
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
  return null
}

export default memo(SearchBarTmpl)
