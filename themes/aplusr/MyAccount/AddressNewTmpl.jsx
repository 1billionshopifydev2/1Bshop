import React from 'react'
import * as Components from '../../../src/components/MyAccount/AddressNew'

const AddressNewTmpl = props => (
  <>
    <Components.SEO title="Add Addresses" />
    <div className="py-5 my-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="mb-5">Add New Address</h1>
          </div>

          <div className="col-auto">
            <div className="text-right">
              <Components.Link
                className="btn btn-link py-2"
                to="/dashboard/addresses"
              >
                Back to Addresses
              </Components.Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Components.AddressForm
              submitText="Add new address"
              onSubmit={props.onSubmit}
              isProcessing={props.isProcessing}
            />
          </div>
        </div>
      </div>
    </div>
  </>
)
export default AddressNewTmpl
