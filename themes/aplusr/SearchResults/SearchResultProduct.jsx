import React from 'react'

import ProductCardTmpl from '../Shared/ProductCardTmpl'
import * as Components from '../../../src/components/SearchResult/SearchResultCore'

const SearchResultProduct = Components.connectStateResults(({
  searchResults,
  page,
  setPage,
  pageSize,
  isViewAll
}) => {
  return (
    <Components.PaginatedList
      list={searchResults.hits}
      page={page}
      setPage={setPage}
      perPage={isViewAll ? 1000 : pageSize}
      pageReload={false}
      titleForEmpty="There are no products matching the search"
      render={_page => searchResults.hits
        .slice(pageSize * (page - 1), pageSize * page)
        .map(product => <ProductCardTmpl key={product.id} product={product} />)
      }
    />
  )
})

export default SearchResultProduct