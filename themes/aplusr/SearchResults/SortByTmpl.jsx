/* eslint-disable */

import React from 'react'

export const SortByTmpl = ({
  items,
  refine,
  createURL,
  selectLabel,
  setSelectLabel,
}) => {
  return (
    <div className="dropdown">
      <button
        aria-expanded="false"
        aria-haspopup="true"
        className="btn btn-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
        id="dropdownMenuButton"
        type="button"
      >
        {selectLabel}
      </button>
      <div aria-labelledby="dropdownMenuButton" className="dropdown-menu">
        {items.map((item) => (
          <a
            className={`dropdown-item${item.isRefined ? ' active' : ''}`}
            key={item.value}
            href={createURL(item.value)}
            onClick={(event) => {
              event.preventDefault()
              setSelectLabel(item.label)
              refine(item.value)
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}
