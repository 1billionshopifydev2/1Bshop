import React, { Fragment } from 'react'
import * as Components from '../../../src/components/MyAccount/Dashboard'

const DashboardTmpl = props => (
  <div className="py-5 my-5">
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="py-2 mb-5">My Account</h1>
        </div>
        <div className="col-auto">
          <div className="button">
            <div className="text-right">
              <button
                className="btn btn-link py-2"
                onClick={props.handleLogout}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9">
          <p>You haven't placed any orders yet.</p>
        </div>
        <div className="col-lg-3">
          <p className="mb-3">Primary Address</p>
          <hr className="mb-3" />

          <div className="mb-5">
            {!!props.defaultAddress && (
              <p>
                {props.defaultAddress.formatted.map((line, index) => (
                  <Fragment key={index}>
                    {line}
                    <br />
                  </Fragment>
                ))}
              </p>
            )}
          </div>
          <Components.Link
            className="btn btn-dark btn-block py-2"
            to="/dashboard/addresses"
          >
            Edit Addresses ( {props.addressesCount} )
          </Components.Link>
        </div>
      </div>
    </div>
  </div>
)

export default DashboardTmpl
