/* eslint-disable */

import React from 'react'

const typeOptions = {
  i: 1,
  type: 'Type',
  options: ['Cotton', 'Linen', 'Leather', 'Viscose', 'Polyester', 'Silk', 'Trevira']
}

const FilterByOptionsTmpl = ({ handleTypeFilterCheck, filtersActive }) => {

  return (
    <article className="filter-group">
      <div>
        <h6 className="title">{typeOptions.type}</h6>
      </div>
      <div id="typeOptions" className="filter-content">
        {typeOptions.options
          .sort((a, b) => a.localeCompare(b))
          .map((option, i) => (
            <label className="checkbox-btn mr-2" key={option}>
              <input
                className="custom-control-input"
                type="checkbox"
                checked={filtersActive.typeFilter.includes(option.toLowerCase())}
                onChange={e => handleTypeFilterCheck(option.toLowerCase())}
              />
              <div className="btn text-value">{option}</div>
            </label>
          ))}
      </div>
    </article>
  )
}

export default FilterByOptionsTmpl