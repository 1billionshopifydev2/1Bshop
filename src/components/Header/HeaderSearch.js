/* eslint-disable */

import React, { useEffect, useState } from 'react'
import Link from '@b2s_core/src/utils/Link'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'
import { Configure } from 'react-instantsearch-core'

import { getTopSearchesAnalytic } from '../../utils/algoliaApi'
import {
  getSearchQueryParsedFromUrl,
  priceFormatter,
} from '../../b2s_core/src/utils/helpers'
import { collectionIndex, productIndex } from '../../utils/algolia_queries'

const HeaderSearchTmpl = require(`@themes/${process.env.B2S_THEME_NAME}/Header/HeaderSearchTmpl`)
  .default

const HeaderSearch = () => {
  const [phrase, setPhrase] = useState('')
  const [inputFocus, setInputFocus] = useState()
  const [topSearches, setTopSearches] = useState([])
  const indices = [
    { name: productIndex, title: 'Products' },
    { name: collectionIndex, title: 'Collections' },
  ]
  const algoliaClient = algoliasearch(
      process.env.GATSBY_ALGOLIA_APP_ID,
      process.env.GATSBY_ALGOLIA_SEARCH_KEY
  );

  const searchClient = {
    search(requests) {
      if (requests[0].params.query === "") {
        return [];
      }
      return algoliaClient.search(requests);
    },
  }

  useEffect(() => {
    const fetchTopSearches = async () => {
      const topSearches = await getTopSearchesAnalytic(productIndex)
      setTopSearches(topSearches)
    }

    fetchTopSearches()
  }, [])

  useEffect(() => {
    const { q } = getSearchQueryParsedFromUrl(window.location.href)
    if (q) {
      const query = q?.replace(/\+/g, ' ')
      q && setPhrase(query)
    }
  }, [])

  const handleInput = event => {
    setPhrase(event.target.value)
  }

  const includeSearchBoxInPath = ({ id }) => id === 'search-box'

  const includeCloseInPath = ({ id }) => id === 'svg-close'

  const handleClick = event => {
    if (!event.path.find(includeSearchBoxInPath)) {
      setInputFocus(false)
      return
    }

    if (event.path.find(includeCloseInPath)) {
      setInputFocus(false)
      return
    }
  }

  const ownProps = {
    topSearches,
    phrase,
    setInputFocus,
    inputFocus,
    handleClick,
    indices,
    handleInput,
  }

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={productIndex}
      numericFilters="price>0"
      attributeForDistinct="handle"
      distinct
      onSearchStateChange={({ query }) => setPhrase(query)}
    >
      <Configure
        filters="price > 0"
        hitsPerPage={1000}
      />
      <HeaderSearchTmpl {...ownProps} />
    </InstantSearch>
  )
}

export default HeaderSearch

export { Link, priceFormatter }
