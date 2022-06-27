import React from 'react'
import UserErrorsTmpl from './UserErrorsTmpl'
import * as Components from '../../../src/components/Forms/RegisterForm'

const RegisterFormTmpl = props => (
  <>
    <UserErrorsTmpl errors={props.userErrors} />

    <form onSubmit={props.handleSubmit(props.onSubmit)} noValidate>
      <div className="form-group">
        <input
          type="text"
          className="form-control border-primary"
          placeholder="First Name"
          name="firstName"
          ref={props.register(props.firstNameValidation())}
        />
        {props.renderFieldError(props.errors.firstName)}
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control border-primary"
          placeholder="Last Name"
          name="lastName"
          ref={props.register(props.lastNameValidation())}
        />
        {props.renderFieldError(props.errors.lastName)}
      </div>

      <div className="form-group">
        <input
          type="email"
          className="form-control border-primary"
          placeholder="Email"
          name="email"
          ref={props.register(props.emailValidation())}
        />
        {props.renderFieldError(props.errors.email)}
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control border-primary"
          placeholder="Password"
          name="password"
          required
          ref={props.register(props.passwordValidation())}
        />
        {props.renderFieldError(props.errors.password)}
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control border-primary"
          placeholder="Repeat Password"
          name="password2"
          required
          ref={props.register(props.passwordRepeatValidation(props.password))}
        />
        {props.renderFieldError(props.errors.password2)}
      </div>

      <div className="d-flex justify-content-center">
        <Components.ReCAPTCHA
          hl="en"
          sitekey={process.env.RECAPTCHA_SITE_KEY}
          onChange={props.handleRecaptchaChange}
          onExpired={props.handleRecaptchaExpire}
        />
      </div>

      <button
        type="submit"
        className="btn btn-block btn-primary my-3 py-2"
        disabled={props.isProcessing || props.isButtonDisabled}
      >
        {props.isProcessing ? 'Loading' : 'Sign Up'}
      </button>
    </form>
  </>
)

export default RegisterFormTmpl
