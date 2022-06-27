import React, { Fragment } from 'react'
import * as Components from '../../../src/components/MyAccount/AddressCard'

const AddressCardTmpl = props => (
  <>
    <hr className="my-3" />

    <p>
      {props.address.formatted.map((line, index) => (
        <Fragment key={index}>
          {line}
          <br />
        </Fragment>
      ))}
    </p>

    <div className="row">
      <div className="col-auto">
        <u>
          <Components.Link to={`/dashboard/addresses/${props.address.id}`}>
            Edit
          </Components.Link>
        </u>
      </div>

      <div className="col-auto">
        <u>
          <a href="#" onClick={props.handleDeleteAddress}>
            Remove
          </a>
        </u>
      </div>
    </div>
  </>
)

export default AddressCardTmpl
