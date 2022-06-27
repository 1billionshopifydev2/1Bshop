import React from 'react'
import UserErrorsTmpl from './UserErrorsTmpl'
import * as Components from '../../../src/components/Forms/RecoverForm'

const RecoverFormTmpl = props => (
  <>
    <h1 className="mb-3 text-center">Recover Password</h1>

    {props.isSuccess ? (
      <p className="text-center">Email is sent! Check your inbox.</p>
    ) : (
      <>
        <UserErrorsTmpl
          errors={props.userErrors}
          overrides={{
            UNIDENTIFIED_CUSTOMER: 'Incorrect email',
          }}
        />

        <form onSubmit={props.handleSubmit(props.onSubmit)} noValidate>
          <div className="form-group">
            <input
              className="form-control border-dark py-2"
              type="email"
              name="email"
              placeholder="Email"
              spellCheck="false"
              autoComplete="off"
              autoCapitalize="off"
              ref={props.register(props.emailValidation())}
            />
            {props.renderFieldError(props.errors.email)}
          </div>

          <div className="d-flex justify-content-center my-2">
            <Components.ReCAPTCHA
              hl="en"
              sitekey={process.env.RECAPTCHA_SITE_KEY}
              onChange={props.handleRecaptchaChange}
              onExpired={props.handleRecaptchaExpire}
            />
          </div>

          <button
            className="btn btn-dark btn-block py-2"
            type="submit"
            disabled={props.isProcessing || props.isButtonDisabled}
          >
            {props.isProcessing ? 'Loading' : 'Recover'}
          </button>

          <a
            className="btn btn-link btn-block my-2 py-2"
            data-bs-slide-to="0"
            href="#carousel"
          >
            Sign In
          </a>
        </form>
      </>
    )}
  </>
)

export default RecoverFormTmpl
