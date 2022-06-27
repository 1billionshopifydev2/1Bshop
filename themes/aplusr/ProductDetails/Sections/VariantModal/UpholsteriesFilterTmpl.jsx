/* eslint-disable */

import React from 'react'

import { priceFormatter, getPricesRange } from 'src/b2s_core/src/utils/helpers'
import FilterByOptionsTmpl from '../../../CategoryPage/CategoryFilters/FilterByOptionsTmpl'
import FilterByPriceTmpl from '../../../CategoryPage/CategoryFilters/FilterByPriceTmpl'
import FilterByColourTmpl from '../../../CategoryPage/CategoryFilters/FilterByColourTmpl'

const UpholsteriesFilterTmpl = (props) => {
  return (
    <div className="col-lg-2 mt-1">
      <div className="filter-container">
        <h2 className="pb-4">Filter by:</h2>
        <FilterByOptionsTmpl
          filtersActive={props.filtersActive}
          handleTypeFilterCheck={props.handleTypeFilterCheck}
        />
        <FilterByPriceTmpl
          filtersActive={props.filtersActive}
          getPricesRange={getPricesRange}
          handleActivePrice={props.handleActivePrice}
          priceFilter={props.priceFilter}
          priceFormatter={priceFormatter}
          priceRangeV2={props.priceRangeV2}
        />
        <FilterByColourTmpl
          colorsFilter={props.colorsFilter}
          filtersActive={props.filtersActive}
          onHandleColorFilterClick={props.handleColorFilterClick}
        />
        <button className="clear-filter mt-3" onClick={props.clearFilters}>
          Reset All Filters
        </button>
      </div>
    </div>
  )
}

export default UpholsteriesFilterTmpl
