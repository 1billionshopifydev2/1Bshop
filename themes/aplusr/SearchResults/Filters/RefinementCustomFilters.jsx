import React, { useState } from 'react'
import { connectRefinementList } from 'react-instantsearch-core'
import classNames from 'classnames'

const RefinementCustomFilters = connectRefinementList(({
  items,
  refine,
  title,
  displayLimit,
}) => {
  const [showMoreState, setShowMoreState] = useState(false)

  const toggle = () => setShowMoreState(prev => !prev)

  const formattedTitle = title.toLowerCase().replace(/ /g, '-')

  return (
    Boolean(items.length) && (
      <div className={`ais-Panel ais-Panel-${formattedTitle}`}>
        <header className="ais-Panel-header">
          <h4>{title}</h4>
        </header>
        <div id={formattedTitle}>
          <div className="ais-RefinementList">
            <ul className="ais-RefinementList-list">
              {
                items.map((item, i) => (
                  (i < displayLimit || showMoreState) &&
                  <li
                    className={classNames("ais-RefinementList-item", {
                      "ais-RefinementList-item--selected": item.isRefined,
                    })}
                    key={item.label}
                    onClick={(e) => refine(item.value)}
                  >
                    <label className="ais-RefinementList-label">
                      <span className="ais-RefinementList-checkbox">
                        {
                          item.isRefined && <span className="ais-RefinementList-isRefined" />
                        }
                      </span>
                      <span className="ais-RefinementList-labelText">
                        {`${item.label} `}
                      </span>
                    </label>
                  </li>
                ))
              }
            </ul>
            {items.length > displayLimit && (
              <div
                className="ais-RefinementList-showMore"
                onClick={() => toggle()}
              >
                <img src="https://js.klevu.com/klevu-js-v1/img-1-1/klevu-view-more.png" />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  )
})

export default RefinementCustomFilters
