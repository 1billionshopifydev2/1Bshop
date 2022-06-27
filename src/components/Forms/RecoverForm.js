import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import useRemoveErrors from './useRemoveErrors'
import { recover } from '@b2s_core/src/reducers/session'
import useRecoverForm from '@b2s_core/src/components/Forms/useRecoverForm'

const RecoverFormTmpl = require(`../../../themes/${process.env.B2S_THEME_NAME}/Forms/RecoverFormTmpl`)
  .default

const RecoverForm = () => {
  useRemoveErrors()
  const ownProps = useRecoverForm({ recover })
  return <RecoverFormTmpl {...ownProps} />
}

export { RecoverForm, ReCAPTCHA }
