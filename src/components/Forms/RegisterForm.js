import React from 'react'
import Link from '@b2s_core/src/utils/Link'
import ReCAPTCHA from 'react-google-recaptcha'
import useRemoveErrors from './useRemoveErrors'
import { signup } from '@b2s_core/src/reducers/session'
import useRegisterForm from '@b2s_core/src/components/Forms/useRegisterForm'

const RegisterFormTmpl = require(`../../../themes/${process.env.B2S_THEME_NAME}/Forms/RegisterFormTmpl`)
  .default

const RegisterForm = () => {
  useRemoveErrors()
  const ownProps = useRegisterForm({ signup })
  return <RegisterFormTmpl {...ownProps} />
}

RegisterForm.propTypes = {}

export { RegisterForm, ReCAPTCHA, Link }
