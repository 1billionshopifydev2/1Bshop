import React, { useEffect, useState } from 'react'
import Link from '@b2s_core/src/utils/Link'
import { connectStateResults } from 'react-instantsearch-core'

import { saveSearchOnLocalStorage } from '../../../src/b2s_core/src/utils/helpers'

const CollectionSearchHits = connectStateResults(({ searchResults, query }) => {
  const [resultFound, setResultFound] = useState(false)

  useEffect(() => {
    setResultFound(searchResults?.hits.length)
  }, [searchResults])

  const handleCollectionSearchClick = (event) => {
    typeof window !== 'undefined' && saveSearchOnLocalStorage(searchResults.query)
  }
 
  return (
    resultFound
      ?
      <div className="category-search">
        <p className="pt-2 px-2"><strong>Category</strong></p>
        <div className="category-list">
          {
            searchResults?.hits.map(({ handle, title, objectID }, i) => (
              i < 6 &&
              <Link
                key={objectID}
                onClick={handleCollectionSearchClick}
                to={`/collections/${handle}`}
              >
                {title}
              </Link>
            ))
          }
        </div>
      </div>
      :
      <></>
  )
})

export default CollectionSearchHits