import React from 'react'
import Link from '@b2s_core/src/utils/Link'
import { connectAutoComplete } from 'react-instantsearch-core'

const SuggestionSearchHits = connectAutoComplete(({ hits, currentRefinement }) => {
  let isEmpty = true
  let results = 0

  if (currentRefinement) {
    hits?.forEach(indices => {
      indices.hits?.forEach(({ _highlightResult }) => {
        if (_highlightResult.title.matchLevel === 'full') {
          isEmpty = false
        }
      })
    })
  }

  return (
    !isEmpty &&
    <div className="suggestion">
      <p className="pt-2 px-2"><strong>Suggestions</strong></p>
      <div className="category-list">
        {
          hits.map(({ hits }, i) => (
            hits?.map(({ _highlightResult, title }, i) => {
              results++

              return (
                results < 6 && currentRefinement && _highlightResult.title.matchLevel === 'full' &&
                <Link tabIndex={i} key={i} to={`/pages/search-results?q=${title}`}>
                  <span dangerouslySetInnerHTML={{
                    __html:
                      _highlightResult.title.value.replace(/ais-highlight-0000000000/g, 'strong')
                  }} />
                </Link>)
            })
          ))
        }
      </div>
    </div>
  )
})

export default SuggestionSearchHits