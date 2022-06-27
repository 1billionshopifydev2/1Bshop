import React, { Fragment } from 'react'
import * as Components from '../../../src/components/MyAccount/Addresses'

const AddressesTmpl = props => (
  <>
    <Components.SEO title="Addresses" />
    <div className="py-5 my-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="py-2 mb-5">Addresses</h1>
          </div>

          <div className="col-auto">
            <div className="text-right">
              <Components.Link
                className="btn btn-link px-4 py-2"
                to="/dashboard"
              >
                Back to Account
              </Components.Link>
            </div>
          </div>

          <div className="col-auto">
            <div className="text-center">
              <Components.Link
                to="/dashboard/addresses/new"
                className="btn btn-block btn-primary px-4 py-2"
              >
                Add New Address
              </Components.Link>
            </div>
          </div>
        </div>

        <div className="row">
          {!!props.defaultAddress && (
            <div className="col-lg-3">
              <p>Default Address</p>
              <Components.AddressCard address={props.defaultAddress} />
            </div>
          )}

          {!!props.addresses.length && (
            <>
              {props.addresses.map((address, index) => (
                <div key={address.id} className="col-lg-3">
                  <p>Address {index + 2}</p>
                  <Components.AddressCard address={address} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  </>
)

export default AddressesTmpl
