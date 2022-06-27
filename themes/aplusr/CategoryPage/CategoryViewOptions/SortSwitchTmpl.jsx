import React from 'react'

const SortSwitchTmpl = props => (
  <select
    className="mr-2 form-control"
    onChange={e => props.onChange(e.target.value)}
    value={props.value}
  >
    {Object.keys(props.PRODUCT_SORT_OPTIONS).map((key, index) => (
      <option
        key={index}
        id={props.PRODUCT_SORT_OPTIONS[key].id}
        value={props.PRODUCT_SORT_OPTIONS[key].id}
      >
        {props.PRODUCT_SORT_OPTIONS[key].label}
      </option>
    ))}
  </select>
)
export default SortSwitchTmpl
