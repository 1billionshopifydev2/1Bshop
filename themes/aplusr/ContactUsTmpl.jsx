import React from 'react'
import * as Components from '../../src/components/ContentPages/ContactUs/ContactUsCore'

// IT'S DYNAMIC PAGE
// HOW TO FIND THIS PAGE IN SHOPIFY ADMIN PANEL:
// Online Store => Pages => Contact Us

// PROPS DESCRIPTION

// formSent => React state check if form is sent
// loading =>  React state check if form is sending
// register => React Form method, more https://react-hook-form.com/get-started#Quickstart
// handleSubmit => React Form method, more https://react-hook-form.com/get-started#Quickstart
// errors => React Form method, more https://react-hook-form.com/get-started#Quickstart
// onSubmit => Function which send fields to email
// contactUs {
//   id => Unique page ID
//   title => HTML inside id="title"
//   ourAddress => HTML inside id="ourAddress"
// }

const ContactUsTmpl = props => (
  <Components.Layout>
    <Components.SEO title="Contact Us" />
    <Components.PageHeading title="Contact Us" blue textCenter />
    <div className="block-map block">
      <div className="block-map__body">
        <iframe
          src="https://maps.google.com/maps?q=8072 Melrose Ave, 90046 Los Angeles&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
        ></iframe>
      </div>
    </div>
    <div className="block">
      <div className="container">
        <div className="card mb-0">
          <div className="card-body contact-us">
            <div className="contact-us__container">
              <div className="row">
                <div className="col-12 col-lg-6 pb-4 pb-lg-0">
                  <h4 className="contact-us__header card-title">Our Address</h4>
                  <div
                    className="contact-us__address"
                    dangerouslySetInnerHTML={{ __html: props.contactUs.ourAddress }}
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <h4 className="contact-us__header card-title">
                    Leave us a Message
                  </h4>
                  {!props.formSent ? (
                    <form onSubmit={props.handleSubmit(props.onSubmit)}>
                      <div className="row g-3">
                        <div className="mb-4 col-md-6">
                          <label htmlFor="form-name" className="form-label">
                            Your Name
                          </label>
                          <input
                            name="name"
                            type="text"
                            id="form-name"
                            className="form-control"
                            placeholder="Your Name"
                            ref={props.register(props.firstNameValidation())}
                          />
                          {props.renderFieldError(props.errors.name)} 
                        </div>
                        <div className="mb-4 col-md-6">
                          <label htmlFor="form-email" className="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="form-email"
                            className="form-control"
                            placeholder="Email Address"
                            ref={props.register(props.emailValidation())}
                          />
                          {props.renderFieldError(props.errors.email)}
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="form-subject" className="form-label">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          id="form-subject"
                          className="form-control"
                          placeholder="Subject"
                          ref={props.register(props.fieldRequireValidation('Subject is required'))}
                        />
                         {props.renderFieldError(props.errors.subject)}
                      </div>
                      <div className="form-group">
                        <label htmlFor="form-message" className="form-label">
                          Message
                        </label>
                        <textarea
                          name="message"
                          id="form-message"
                          className="form-control"
                          rows="4"
                          ref={props.register(props.fieldRequireValidation('Message is required'))}
                        ></textarea>
                        {props.renderFieldError(props.errors.message)}
                         
                      </div>
                      <button className="btn btn-primary" disabled={props.loading}>
                        {!props.loading ? 'Send Message' : 'Sending'}
                      </button>
                    </form>
                  ) : (
                    <div>
                      <p>Thank you, we will contact you soon</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Components.Layout>
)

ContactUsTmpl.propTypes = Components.componentPropTypes
ContactUsTmpl.defaultProps = Components.componentDefaultProps
export default ContactUsTmpl
