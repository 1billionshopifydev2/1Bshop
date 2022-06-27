import React from 'react'
import PropTypes from 'prop-types'

const TradeContactTmpl = ({ onHandleSubmit, successMessage, errorMessage }) => {
  return (
    <div className="py-5 trade-contact">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="mb-5">
              Apply for a trade account
            </h1>
          </div>
        </div>
        {
          successMessage &&
          <div className="col">
            <div className="mb-5">
              <p className="success-message">{successMessage}</p>
            </div>
          </div>
        }
        {
          errorMessage && 
          <div className="col">
            <div className="mb-5">
              <p className="error-message">{errorMessage}</p>
            </div>
          </div>
        }
        <div className="row">
          <div className="col">
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="mb-5">
              <p>
                As a perk, we offer easy online quote submissions for registered trade clients. Once your selection of products and desired quantity for the project have been added to your cart, simply complete the short form below to request a quote. Our team will review and get back to you shortly.
              </p>
            </div>
          </div>
          <div className="col-lg-4 offset-lg-2">
            <div className="mb-5">
              <div className="text-secondary">
                Need help?
              </div>
              <p>
                Please call 800.913.0071 x106 or send us an email at <a href="mailto:trade@aplusrstore.com">trade@aplusrstore.com</a> for personal assistance.
              </p>
            </div>
          </div>
        </div>
        <form onSubmit={onHandleSubmit} >
          <div className="row">
            <div className="col-lg-3">
              <div className="form-group">
                <input className="form-control border-dark h-auto p-2" type="text" title="First Name" required placeholder="First Name" name="firstname" />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-group">
                <input className="form-control border-dark h-auto p-2" type="text" title="Last Name" placeholder="Last Name" name="lastname" />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-group">
                <input className="form-control border-dark h-auto p-2" type="text" title="E-Mail" required placeholder="E-Mail" name="email" />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-group">
                <input className="form-control border-dark h-auto p-2" type="text" title="Phone" placeholder="Phone" name="phone" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <div className="form-group">
                <input className="form-control border-dark h-auto p-2" type="text" title="Company" placeholder="Company" name="company" />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-group">
                <input className="form-control border-dark h-auto p-2" type="text" title="Website" placeholder="Website" name="website" />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-group">
                <input className="form-control border-dark h-auto p-2" type="text" title="Address 1" placeholder="Address 1" name="address" />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-group">
                <input className="form-control border-dark h-auto p-2" type="text" title="Address 2" placeholder="Address 2" name="unit" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <div className="form-group">
                <input className="form-control border-dark h-auto p-2" type="text" title="City" required placeholder="City" name="city" />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-group">
                <input className="form-control border-dark h-auto p-2" type="text" title="State" required placeholder="State" name="state" />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-group">
                <input className="form-control border-dark h-auto p-2" type="text" title="Zip" placeholder="Zip" name="zip" />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-group">
                <input className="form-control border-dark h-auto p-2" type="text" title="Country" required placeholder="Country" name="country" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="custom-control custom-checkbox py-1">
                <input type="checkbox" className="custom-control-input" name="aia" id="aia" />
                <label className="custom-control-label py-1" htmlFor="aia">AIA</label>
              </div>
            </div>
            <div className="col">
              <div className="custom-control custom-checkbox py-1">
                <input type="checkbox" className="custom-control-input" name="idi" id="idi" />
                <label className="custom-control-label py-1" htmlFor="idi">IDI</label>
              </div>
            </div>
            <div className="col">
              <div className="custom-control custom-checkbox py-1">
                <input type="checkbox" className="custom-control-input" name="asid" id="asid" />
                <label className="custom-control-label py-1" htmlFor="asid">ASID</label>
              </div>
            </div>
            <div className="col">
              <div className="custom-control custom-checkbox py-1">
                <input type="checkbox" className="custom-control-input" name="ncid" id="ncid" />
                <label className="custom-control-label py-1" htmlFor="ncid">NCID</label>
              </div>
            </div>
            <div className="col">
              <div className="custom-control custom-checkbox py-1">
                <input type="checkbox" className="custom-control-input" name="ccidc" id="ccidc" />
                <label className="custom-control-label py-1" htmlFor="ccidc">CCIDC</label>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="form-group">
                <input className="form-control border-dark h-auto p-2" type="text" title="Other" placeholder="Other" name="other" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 offset-lg-8">
              <button className="btn btn-block btn-primary h-auto px-4 py-2" type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

TradeContactTmpl.propTypes = {
  onHandleSubmit: PropTypes.func,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
}

export default TradeContactTmpl