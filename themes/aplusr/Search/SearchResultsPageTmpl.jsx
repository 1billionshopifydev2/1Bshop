import React from 'react'
import * as Components from '../../../src/components/Search/SearchResultsCore'

const SearchResultsPageTmpl = props => {
  return (
    <Components.Layout>
      <Components.SEO title="Results page" />
      <Components.SubHeader>
        {!props.isLoading && (
          <div className="search-subheader mt-4">
            {!props.products.length ? (
              <h3>{`No results found for ${props.searchQuery}`}</h3>
            ) : (
              <h3>
                We found
                {`${
                  props.products.length && props.products.length > 1
                    ? ` ${props.products.length} results `
                    : ` ${props.products.length} result `
                }`}
                for: &apos;{props.searchQuery}&apos;
              </h3>
            )}
          </div>
        )}
      </Components.SubHeader>

      <div className="block page-search-results mt-4">
        <div className="container">
          <div className="row">
            <Components.PaginatedList
              page={props.page}
              setPage={props.setPage}
              perPage={8}
              list={props.sortedFilteredProducts}
              sortOption={props.sortOption}
              isLoading={props.isLoading}
              renderItem={product => (
                <div
                  key={product.id}
                  className="col-12 col-sm-6 col-lg-4 col-xl-3 pb-3 pb-sm-3 px-2 d-flex align-self-stretch"
                >
                  <Components.ProductCard product={product} />
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </Components.Layout>
  )
}

export default SearchResultsPageTmpl
