import React, { useEffect } from 'react'
import {
  Index,
  connectStateResults,
} from 'react-instantsearch-dom'

import * as Components from '../../../src/components/Header/HeaderSearch'
import SuggestionSearchHits from './SuggestionSearchHits'
import CollectionSearchHits from './CollectionSearchHits'
import ProductSearchHits from './ProductSearchHits'
import RecentSearchesHits from './RecentSearchesHits'
import { productIndex, collectionIndex } from '../../../src/utils/algolia_queries'

const SearchBox = (props) => {

  useEffect(() => {
    if (props.inputFocus) {
      document.addEventListener('click', props.handleClick)
    }
    return () => document.removeEventListener('click', props.handleClick)
  }, [])

  return (
    <div id="search-box" className="search-box">
      {
        props.phrase === '' || (typeof props.phrase === 'undefined')
          ? <PopularAndRecentSearchHits topSearches={props.topSearches} />
          : <SearchResult indices={props.indices} />
      }
    </div>
  )
}

const PopularAndRecentSearchHits = ({ topSearches }) => {
  return (
    <>
      <p className="pt-2 px-2"><strong>Popular Searches</strong></p>
      <div className="popular-searches">
        {
          topSearches.searches?.map(({ search, nbHits }, i) => (
            search !== "" &&
            <Components.Link key={`${search}-${nbHits}-${i}`} to={`/pages/search-results?q=${search.trim()}`}>{search}</Components.Link>
          ))
        }
      </div>
      <RecentSearchesHits />
    </>
  )
}

const SearchResult = () => {
  return (
    <div className="pt-3">
      <button id="svg-close" className="close-button">
        <svg xmlns="http://www.w3.org/2000/svg" className="uc_icon uc_icon__close" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
        </svg>
      </button>
      <SuggestionSearchHits />
      <CollectionAndProductHist />
    </div>
  )
}

const CollectionAndProductHist = connectStateResults(({ searchResults }) => {
  return searchResults && searchResults.nbHits ?
    <>
      <Index indexName={collectionIndex}>
        <CollectionSearchHits />
      </Index>
      <Index indexName={productIndex}>
        <ProductSearchHits />
      </Index>
    </>
    :
    <div className="no-result-box">
      Please try another search term...
    </div>
})

export default SearchBox