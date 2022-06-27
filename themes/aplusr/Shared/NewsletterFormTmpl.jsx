import React from 'react'

const NewsletterFormTmpl = props => (
  <>
    <div className="d-flex form-inline flex-nowrap mb-3">
      <label className="sr-only" htmlFor="footer-newsletter-address">
        Email Address
      </label>
      <input
        ref={props.email}
        type="email"
        placeholder="Your email"
        className="footer-newsletter__form-input form-control"
        id="footer-newsletter-address"
        placeholder="Email Address..."
      />
      <button
        className="footer-newsletter__form-button btn ml-2 btn-warning"
        onClick={props.submit}
      >
        {(props.status === 'sending' && 'Sending..') || 'Subscribe'}
      </button>
    </div>
    <div className="d-flex">
      {props.status === 'success' && (
        <div
          style={{ color: 'green' }}
          dangerouslySetInnerHTML={{ __html: props.message }}
        />
      )}
      {props.status === 'error' && (
        <div
          style={{ color: 'red' }}
          dangerouslySetInnerHTML={{ __html: props.message }}
        />
      )}
    </div>
  </>
)

export default NewsletterFormTmpl
