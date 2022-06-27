import React from 'react'

const PageSizeSwitchTmpl = (props) =>  
    <select
      className="mr-2 form-control"
      onChange={e => props.onChange(e.target.value)}
      value={props.value}
    >
      {props.pageSizes.map(size => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select> 
 
export default PageSizeSwitchTmpl
