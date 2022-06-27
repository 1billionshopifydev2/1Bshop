import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import MailchimpSubscribe from 'react-mailchimp-subscribe'

const NewsletterFormTmpl = require(`../../../themes/${process.env.B2S_THEME_NAME}/Shared/NewsletterFormTmpl`).default

const NewsletterForm = ({ status, message, onValidated }) => {
  const email = useRef('')
  const submit = () => {
    email &&
      email.current.value.indexOf('@') > -1 &&
      onValidated({
        EMAIL: email.current.value,
      })
  }

  const ownProps = {
    submit,
    status,
    message,
    email
  }

  return <NewsletterFormTmpl {...ownProps} />
}

NewsletterForm.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string,
  onValidated: PropTypes.func.isRequired,
}

const Newsletter = () => {
  return (
    <MailchimpSubscribe
      url={process.env.MAILCHIMP_URL}
      render={({ subscribe, status, message }) => (
        <NewsletterForm
          status={status}
          message={message}
          onValidated={formData => subscribe(formData)}
        />
      )}
    />
  )
}

export default Newsletter
