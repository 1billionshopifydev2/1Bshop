import React, { forwardRef } from 'react'
import UserErrorsTmpl from './UserErrorsTmpl'
import * as Components from '../../../src/components/Forms/LoginForm'

const LoginFormTmpl = forwardRef((props, carouselRef) => (
  <>
    <div className="row justify-content-center">
      <div className="col-lg-4">
        <div
          ref={carouselRef}
          id="carousel"
          className="carousel carousel-fade slide"
          data-bs-touch="false"
          data-bs-interval="false"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <h1 className="mb-3 text-center">Sign In</h1>

              <UserErrorsTmpl
                errors={props.userErrors}
                overrides={{
                  UNIDENTIFIED_CUSTOMER: 'Incorrect email or password',
                }}
              />

              <form onSubmit={props.handleSubmit(props.onSubmit)} noValidate>
                <div className="form-group">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="form-control border-dark"
                    placeholder="Email"
                    autoComplete="off"
                    ref={props.register(props.emailValidation())}
                  />
                  {props.renderFieldError(props.errors.email)}
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control border-dark"
                    placeholder="Password"
                    name="password"
                    ref={props.register(props.passwordValidation())}
                  />
                  {props.renderFieldError(props.errors.password)}
                </div>

                <button
                  className="btn btn-dark btn-block py-2"
                  type="submit"
                  disabled={props.isProcessing}
                >
                  {props.isProcessing ? 'Loading' : 'Sign In'}
                </button>

                <Components.Link
                  className="btn btn-link btn-block mt-2 py-2"
                  to="/account/register"
                >
                  Don't have an account? Sign Up.
                </Components.Link>

                <a
                  className="btn btn-link btn-block mt-2 py-2"
                  data-bs-slide-to="1"
                  href="#carousel"
                >
                  Forgot your password?
                </a>
              </form>
            </div>
            <div className="carousel-item">
              <Components.RecoverForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
))

export default LoginFormTmpl
