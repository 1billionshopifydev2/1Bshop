import React from 'react'
import * as Components from '../../../src/components/MyAccount/AddressEdit'

const AddressEditTmpl = props => (
  <>
    <Components.SEO title="Edit Address" />
    <div className="py-5 my-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="mb-5">Edit Address</h1>
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
            {props.addressId ? (
              <Components.AddressForm
                submitText="Update address"
                onSubmit={props.onSubmit}
                isProcessing={props.isProcessing}
                addressId={props.addressId}
              />
            ) : (
              <Components.Loader />
            )}
          </div>
        </div>
      </div>
    </div>
  </>
)

export default AddressEditTmpl
