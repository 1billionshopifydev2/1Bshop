import React from 'react'

const CompareTableTmpl = props => {
  if (props.items.length === 0) {
    return <div className="text-center">Add products to compare them.</div>
  } else {
    return (
      <div className="card">
        <div className="table-responsive compare-table-wrapper">
          <table className="table table-borderless table-compare">
            <tbody>
              {props.rows.map(row => {
                if (
                  props.SHOW_EMPTY_ROWS ||
                  props.productsRows.some(item => item[row.key])
                ) {
                  return (
                    <tr key={row.key}>
                      <th>{row.name}</th>
                      {props.productsRows.map((item, index) => (
                        <td key={index}>{item[row.key]}</td>
                      ))}
                    </tr>
                  )
                } else {
                  return null
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
 
export default CompareTableTmpl
