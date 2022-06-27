/* eslint-disable */

import classNames from 'classnames';
import React, { useState, useRef } from 'react'
import { validateEmail } from 'src/b2s_core/src/utils/helpers';
import { subscribe } from 'src/b2s_core/src/utils/klaviyo';

const SubscribeAndSocialNetworksTmpl = () => {
  const newsletterEmailField = useRef('')
  const [newsletterResponseMessages, setNewsletterResponseMessages] = useState([])
  const [isSuccess, setIsSuccess] = useState(true);

  const handleNewsletterSubscribe = async (event) => {
    event.preventDefault()
    const email = newsletterEmailField.current.value
    const isInvalidEmail = !validateEmail(email)

    if (isInvalidEmail) {
      setNewsletterResponseMessages(['Invalid e-mail address!'])
      setIsSuccess(false)
      return
    }

    try {
      const { data: { is_subscribed }, success } = await subscribe(process.env.KLAVIYO_ID, email)
      if (!is_subscribed && success) {
        setNewsletterResponseMessages(['Thanks for subscribing!', 'Check your email for a confirmation message.'])
      }
      if (is_subscribed && success) {
        setNewsletterResponseMessages(['You are already subscribe!'])
      }
      if (!success) setNewsletterResponseMessages(['Something went wrong!'])
      setIsSuccess(success)
    } catch (err) {
      console.error(err)
      setIsSuccess(false)
      setNewsletterResponseMessages(['Something went wrong!'])
    }
  }

  return (
    <div className="row justify-content-between mb-5">
      <div className="col-12">
        <hr className="border-dark border mb-4" />
      </div>
      <div className="col-lg-4">
        <div className="subscribe mb-3">
          <form
            method="post"
            action="/contact#contact_form"
            id="contact_form"
            acceptCharset="UTF-8"
            className="contact-form"
            noValidate="novalidate"
            onSubmit={handleNewsletterSubscribe}
          >
            <div className="klaviyo_messages text-center">
              <div className={classNames(isSuccess ? 'success_message' : 'error_message', 'mb-2')}>
                {
                  newsletterResponseMessages.map((message, i) => <div key={i}>{message}</div>)
                }
              </div>
            </div>
            <div className="input-group">
              <input
                className="form-control border-dark border-end-0 h-auto py-2"
                type="email"
                title="Email"
                autoCapitalize="off"
                name="contact[email]"
                placeholder="Let's stay in touch!"
                ref={newsletterEmailField}
              />
              <button className="btn btn-outline-dark border-start-0 h-auto py-2" type="submit">→</button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-auto d-flex align-items-center">
        <div className="social">
          <div className="d-flex">
            <a
              className="d-inline-block p-2 mx-1"
              href="https://www.instagram.com/aplusrdesign/"
              target="_blank" rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 13 13"
                width="16"
              >
                <title>Instagram</title>
                <path
                  d="M12.41,0H.59A.58.58,0,0,0,0,.59V12.41A.58.58,0,0,0,.59,13H12.41a.58.58,0,0,0,.59-.59V.59A.58.58,0,0,0,12.41,0ZM8.77,6.5A2.27,2.27,0,1,1,6.5,4.23,2.27,2.27,0,0,1,8.77,6.5Zm2.61,4.88H1.62V5.69H2.7a3.59,3.59,0,0,0-.09.81,3.89,3.89,0,0,0,7.78,0,3.59,3.59,0,0,0-.09-.81h1.08Zm0-7.32H8.94V1.62h2.44Z"
                ></path>
              </svg>
            </a>
            <a
              className="d-inline-block p-2 mx-1"
              href="https://twitter.com/aplusrdesign"
              target="_blank" rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 15 12.19"
                width="16"
              >
                <title>Twitter</title>
                <path
                  d="M14.59.22a6.13,6.13,0,0,1-2,.75A3.08,3.08,0,0,0,7.31,3.08a3.27,3.27,0,0,0,.08.7A8.73,8.73,0,0,1,1.05.56,3,3,0,0,0,.63,2.11,3.06,3.06,0,0,0,2,4.67,3.15,3.15,0,0,1,.6,4.28v0a3.08,3.08,0,0,0,2.47,3,3.1,3.1,0,0,1-.81.11,2.78,2.78,0,0,1-.58-.06A3.1,3.1,0,0,0,4.56,9.53,6.23,6.23,0,0,1,.73,10.85a6,6,0,0,1-.73,0,8.66,8.66,0,0,0,4.72,1.39,8.69,8.69,0,0,0,8.75-8.76c0-.13,0-.27,0-.4A6,6,0,0,0,15,1.44a6.11,6.11,0,0,1-1.77.49A3.09,3.09,0,0,0,14.59.22Z"
                ></path>
              </svg>
            </a>
            <a
              className="d-inline-block p-2 mx-1"
              href="https://www.pinterest.com/aplusrdesign/"
              target="_blank" rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 11 14.14"
                height="16"
              >
                <title>Pinterest</title>
                <path
                  d="M2,8.18C2.68,7,1.77,6.7,1.63,5.83c-.58-3.58,4.13-6,6.6-3.52,1.7,1.73.58,7-2.17,6.5S7.35,4,5.25,3.21C3.54,2.53,2.63,5.28,3.44,6.64,3,9,1.94,11.2,2.36,14.14c1.34-1,1.79-2.84,2.16-4.79a3.82,3.82,0,0,0,1.9.9c3.18.25,4.95-3.17,4.52-6.32C10.55,1.14,7.76-.29,4.79.05A5.3,5.3,0,0,0,0,4.93C0,6.58.42,7.83,2,8.18Z"
                ></path>
              </svg>
            </a>
            <a
              className="d-inline-block p-2 mx-1"
              href="https://www.facebook.com/AplusRdesign/"
              target="_blank" rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 7 13.95"
                height="16"
              >
                <title>Facebook</title>
                <path
                  d="M1.75,14H4.37V7H6.75L7,4.57H4.37V3.37c0-.63,0-1,.94-1H7V0H4.59C2.28,0,1.75,1.19,1.75,3.16V4.57H0V7H1.75Z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscribeAndSocialNetworksTmpl