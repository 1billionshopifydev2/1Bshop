import React from 'react'
import * as Components from '../../../src/components/Header/MyAccountDropdown'

const MyAccountDropdownTmpl = props => (
  <li className="nav-item dropdown">
    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
      My Account
    </a>
    <ul className="dropdown-menu dropdown-menu-right">
      <li>
        <Components.Link className="dropdown-item" to="/dashboard">
          Dashboard
        </Components.Link>
      </li>
      <li>
        <Components.Link className="dropdown-item" to="/dashboard/profile">
          Edit Profile
        </Components.Link>
      </li>
      <li>
        <Components.Link className="dropdown-item" to="/dashboard/orders">
          Order History
        </Components.Link>
      </li>
      <li>
        <Components.Link className="dropdown-item" to="/dashboard/addresses">
          Addresses
        </Components.Link>
      </li>
      <li>
        <Components.Link className="dropdown-item" to="/dashboard/password">
          Password
        </Components.Link>
      </li>
      <li>
        <button className="dropdown-item" onClick={props.handleLogout}>
          Logout
        </button>
      </li>
    </ul>
  </li>
)

export default MyAccountDropdownTmpl
