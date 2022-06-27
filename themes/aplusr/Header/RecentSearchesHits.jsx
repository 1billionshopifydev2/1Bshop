import React, { useEffect, useState } from 'react'
import Link from '@b2s_core/src/utils/Link'

const RecentSearchesHits = () => {
  const [recentSearches, setRecentSearches] = useState([])

  useEffect(() => {
    const recentSearchesString = typeof window !== 'undefined' && window.localStorage.getItem('recentSearches')
    try {
      setRecentSearches(JSON.parse(recentSearchesString))
    } catch (err) {}
  }, [])

  return (
    <>
      <p className="pt-2 px-2"><strong>Recent Searches</strong></p>
      <div className="popular-searches">
        {
          recentSearches?.map((recentSearch, i) => (
            <Link key={`${recentSearch}-${i}`} to={`/pages/search-results?q=${recentSearch}`}>{recentSearch}</Link>
          ))
        }
      </div>
    </>
  )
}

export default RecentSearchesHits
