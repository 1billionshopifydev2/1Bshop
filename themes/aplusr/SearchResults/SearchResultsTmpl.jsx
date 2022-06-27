/* eslint-disable */

import React from 'react'
import { connectSearchBox, connectStateResults } from 'react-instantsearch-core'
import { ClearRefinements } from 'react-instantsearch-dom';
import { Layout } from '../../../src/layouts/index'
import SEO from '../../../src/b2s_core/src/components/seo'
import SearchResultProducts from './SearchResultProduct'
import RefinementCustomFilters from './Filters/RefinementCustomFilters'
import { CustomSortBy } from '@b2s_core/src/components/Search/SortBy';

const SearchResultsTmpl = connectSearchBox((props) => {
  props.refine(props.query)
  return (
    <Layout>
      <SEO title="Search Results" />
      <div className="page search-result-page">
        <div className="py-5">
          <div className="container">
            {
              props.loading || !props.resultsFound ?
                <div className="row flex-column align-items-center">
                  <SearchStatusListener
                    setLoading={props.setLoading}
                    setResultsFound={props.setResultsFound} />
                  <div className="title">
                    <h1 className="mb-3">Search Results</h1>
                  </div>
                  {
                    props.loading
                      ?
                      <img id="loader" src="https://js.klevu.com/klevu-js-v1/img-1-1/ku-loader.gif" alt="Loading..." />
                      :
                      <div className="not-found-content">Please try another search term...</div>
                  }
                </div>
                :
                <>
                  <div className="row d-flex justify-content-center">
                    <div className="search-product-list">
                      <div className="filter">
                        <h1 className="mb-4">{props.currentRefinement.replace(/\+/g, ' ')}</h1>
                        {
                          props.facets.map((facet, i) => (
                            i < 30 &&
                            <RefinementCustomFilters
                              attribute={facet}
                              limit={20}
                              title={facet.replace('options.', '').replace(/_/g, ' ')}
                              displayLimit={5} />
                          ))
                        }
                        <ClearRefinements
                          translations={{
                            reset: 'Clear filters',
                          }}
                        />
                      </div>
                      <div className="product-list">
                        <div className="col-12 text-right product-list-sort">
                          <div className="product-list-sort-viewall">
                            {
                              !props.isViewAll && <button className='view-all' onClick={() => props.setViewAll(true)}>
                                View all
                              </button>
                            }
                          </div>
                          <div className="sort-label">Sort:</div>
                          <CustomSortBy
                            defaultRefinement="shopify_products"
                            items={[
                              { value: 'shopify_products', label: 'Relevance' },
                              { value: 'shopify_products_price_asc', label: 'Price: Low to High' },
                              { value: 'shopify_products_price_desc', label: 'Price: High to Low' },
                            ]}
                          />
                        </div>
                        <SearchResultProducts {...props} />
                      </div>
                    </div>
                  </div>
                </>
            }
          </div>
        </div>
      </div>
    </Layout>
  )
})

const SearchStatusListener = connectStateResults(({ searchResults, searching, setLoading, setResultsFound }) => {
  !searching && setLoading(searching)
  searchResults?.hits.length && setResultsFound(true)

  return (<></>)
})

export default SearchResultsTmpl