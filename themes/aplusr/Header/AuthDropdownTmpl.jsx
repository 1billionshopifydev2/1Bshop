import React from 'react'
import * as Components from '../../../src/components/Header/AuthDropdown'

const AuthDropdownTmpl = props => (
  <div className="widget-header blue-Components.link dropdown">
    <a
      href="#"
      data-toggle="dropdown"
      className="dropdown-toggle"
      data-offset="0,30"
    >
      <div className="icontext">
        <div className="icon mr-0">
          <div
            className={`${
              props.isMobile ? 'icon-xs' : 'icon-sm'
            } icon rounded-circle border mr-0`}
          >
            <i className="fa fa-user"></i>
          </div>
        </div>
      </div>
      <span className="sr-only">Profile actions</span>
    </a>
    <div className="dropdown-menu dropdown-menu-right">
      {!props.isLoggedIn ? (
        <>
          <form
            className="px-4 py-3"
            onSubmit={props.handleSubmit(props.onSubmit)}
          >
            <div className="form-group">
              <label htmlFor="header-signin-email">Email address</label>
              <input
                id="header-signin-email"
                type="email"
                name="email"
                className={`form-control ${props.errors.email ? 'error' : ''}`}
                placeholder="Email address"
                autoComplete="off"
                ref={props.register({
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {props.errors.email && (
                <div className="invalid-feedback d-block">
                  {props.errors.email.message}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="header-signin-password">Password</label>
              <input
                id="header-signin-password"
                type="password"
                className={`form-control ${
                  props.errors.password ? 'error' : ''
                }`}
                placeholder="Password"
                name="password"
                ref={props.register({
                  required: "Password can't be blank.",
                  minLength: {
                    value: 5,
                    message: 'Min length is 5',
                  },
                })}
              />
              {props.errors.password && (
                <div className="invalid-feedback d-block">
                  {props.errors.password.message}
                </div>
              )}
              {props.userErrors && props.userErrors.length > 0 && (
                <div className="invalid-feedback d-block">
                  Email or password are invalid
                </div>
              )}
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={props.isProcessing}
              >
                {props.isProcessing ? 'Loading' : 'Sign in'}
              </button>
            </div>
          </form>
          <hr className="dropdown-divider" />
          <Components.Link to="/login" className="dropdown-item">
            Create An Account
          </Components.Link>
          <Components.Link to="/recover" className="dropdown-item">
            Forgot password?
          </Components.Link>
        </>
      ) : (
        <div>
          <Components.Link
            to="/account"
            className="icontext align-items-start"
            style={{ minWidth: '300px', maxWidth: '300px', padding: '0.25rem 1.5rem' }}
          >
            <div className="mr-2">
              <Components.LetterAvatar text={props.fullName} />
            </div>
            <div className="text">
              <h6 className="title">{props.fullName}</h6>
              <p>{props.email}</p>
            </div>
          </Components.Link>
          <hr className="dropdown-divider" />
          <Components.Link className="dropdown-item" to="/dashboard/profile">
            Edit Profile
          </Components.Link>
          <Components.Link className="dropdown-item" to="/dashboard/orders">
            Order History
          </Components.Link>
          <Components.Link className="dropdown-item" to="/dashboard/addresses">
            Addresses
          </Components.Link>
          <Components.Link className="dropdown-item" to="/dashboard/password">
            Password
          </Components.Link>
          <hr className="dropdown-divider" />
          <Components.Link to="/" className="dropdown-item" onClick={props.handleLogout}>
            Logout
          </Components.Link>
        </div>
      )}
    </div>
  </div>
)

export default AuthDropdownTmpl
