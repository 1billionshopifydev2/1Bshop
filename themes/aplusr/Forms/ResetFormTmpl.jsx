import React from 'react'
import UserErrorsTmpl from './UserErrorsTmpl'

const ResetFormTmpl = props => (
  <>
    <div className="py-5 my-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <div className="text-center">
              <h1 className="mb-3">Reset Password</h1>

              {props.userEmail && (
                <p>Enter a new password for {props.userEmail}</p>
              )}
            </div>

            <UserErrorsTmpl errors={props.userErrors} />

            <form method="post" onSubmit={props.handleSubmit(props.onSubmit)}>
              <div className="form-group">
                <input
                  className="form-control border-primary py-2"
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={props.register(props.passwordValidation())}
                />
                {props.renderFieldError(props.errors.password)}
              </div>

              <div className="form-group">
                <input
                  className="form-control border-primary py-2"
                  type="password"
                  name="password2"
                  placeholder="Password Confirmation"
                  ref={props.register(
                    props.passwordRepeatValidation(props.password)
                  )}
                />
                {props.renderFieldError(props.errors.password2)}
              </div>

              <button className="btn btn-block btn-primary py-2" type="submit">
                {props.isProcessing ? 'Loading' : 'Reset'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default ResetFormTmpl
