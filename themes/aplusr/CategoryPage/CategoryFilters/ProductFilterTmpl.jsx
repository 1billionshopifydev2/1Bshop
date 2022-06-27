/* eslint-disable */

import React, { useState, useEffect } from 'react'
import { PRODUCT_SORT_OPTIONS, NEWEST} from '../../../../src/b2s_core/src/utils/sorting'

function ProductFilterTmpl(props) {
  const options = Object.keys(PRODUCT_SORT_OPTIONS)
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setIsSelected] = useState(props.sortOption || NEWEST)
  const handleChange = e => {
    props.handleSort(e.target.value)
    setIsSelected(e.target.value)
    setIsOpen(false)
  }

  return (
    <div>
      <div className="filter-group">
        <a
          href="/"
          onClick={event => {
            event.preventDefault()
            setIsOpen(!isOpen)
          }}
        >
          <h6 className="title m-0">
            Sort By <span className="dropdown-title">{PRODUCT_SORT_OPTIONS[selected].label}</span>
          </h6>
        </a>
      </div>

      {isOpen && (
        <div className="dropdown-sort-container">
          <ul className="dropdown-sort">
            {options.map(key => (
              <li
                key={key}
                className={`dropdown-sort-item ${
                  PRODUCT_SORT_OPTIONS[key].id === selected
                    ? 'dropdown-sort-selected'
                    : ''
                } `}
              >
                <label htmlFor={key}>{PRODUCT_SORT_OPTIONS[key].label}</label>
                <input
                  onClick={handleChange}
                  type="radio"
                  name="sort"
                  id={key}
                  value={PRODUCT_SORT_OPTIONS[key].id}
                  checked={PRODUCT_SORT_OPTIONS[key].id === selected}
                  onChange={e => {
                    setIsSelected(e.target.value)
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ProductFilterTmpl
