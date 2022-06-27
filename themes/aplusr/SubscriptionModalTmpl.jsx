import React from 'react'
import '@themes/aplusr/assets/styles/ecommerce/subscription-modal.scss'
const SubscriptionModalTmpl = (props) => (
  <div
    aria-hidden="true"
    aria-labelledby="subscriptionModalLabel"
    className="modal fade"
    id="subscriptionModal"
    role="dialog"
    tabIndex="-1"
  >
    {!props.submitted ? (
      <div className="modal-dialog">
        <div className="modal-content">
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          ></button>
          <div className="modal-header">
            <div className="image-container">
              <img src="/images/arLogo.jpeg" />
            </div>
            <h5 className="modal-title" id="subscriptionModalLabel">
              EXCLUSIVE TO YOU
            </h5>
          </div>
          <div className="modal-body">
            Sign up for the latest arrivals + new from A+R.<br></br>And claim
            your code off the first purchase.
          </div>
          <div className="modal-footer">
            {/* eslint-disable-next-line */}
            <form onSubmit={props.handleNewsletterSubscribe}>
              <input
                placeholder="Enter your email address"
                ref={ props.newsletterEmailField } //eslint-disable-line
                required
                type="email"
              ></input>
              <button className="btn btn-primary" type="submit">
                subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    ) : (
      // eslint-disable-next-line
      <div className={`modal-dialog${props.submitted ? ' submitted' : ''}`}>
        <div className="modal-content">
          <button
            aria-label="Close"
            className="btn-close"
            data-bs-dismiss="modal"
            type="button"
          ></button>
          <div className="modal-header">
            <div className="message">
              {props.newsletterResponseMessages.map((message, i) => (
                <div key={i}>{message}</div> // eslint-disable-line
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
)

export default SubscriptionModalTmpl
