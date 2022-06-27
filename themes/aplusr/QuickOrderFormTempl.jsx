import React from 'react'
import * as Components from '../../src/components/QuickOrderForm/QuickOrderFormCore'

const QuickOrderFormTempl = props => (
  <Components.Layout>
    <Components.SEO title="Quick Order Form" />
    <Components.PageHeading title="Quick Order Form" />
    <div className="block quick-order pt-5">
      <div className="container">
        <div className="card">
          <div className="table-responsive">
            <table className="table table-border">
              <thead>
                <tr scope="col">
                  {props.columns.map(col => (
                    <th key={col.key}>{col.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {props.list.map((product, i) => (
                  <Components.QuickOrderTableTmpl
                    key={i}
                    index={i}
                    product={product}
                    columns={props.columns}
                    list={props.list}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="mx-auto my-4 text-center">
            <button className="btn btn-secondary" onClick={props.addNewRow}>
              Add More Rows
            </button>
          </div>
          <div className="row">
            <div className="col text-right my-4">
              <button
                disabled={props.list.length === 0}
                className="btn btn-primary btn-lg mr-3"
                onClick={() => props.addToCart()}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Components.Layout>
)

export default QuickOrderFormTempl
