import React from 'react'
import PropTypes from 'prop-types'
import SubscribeAndSocialNetworksTmpl from './ContentPages/SubscribeAndSocialNetworksTmpl'
import Link from '@b2s_core/src/utils/Link'

const FooterTmpl = ({ renderNewsletter, isLoggedIn }) => {
  return (
    <footer>
      <div className="container">
        {
          renderNewsletter &&
          <SubscribeAndSocialNetworksTmpl />
        }
      </div>
      <div className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-6 col-lg-3">
              <div className="pb-3">
                <hr className="border-dark" />
              </div>
              <div className="mb-3 fw-500">About</div>
              <div className="mb-5">
                <div>
                  <Link to="/pages/about-us"> About Us </Link>
                </div>
                <div>
                  <Link to="/pages/about-us#visit">
                    Showroom Location &amp; Hours
                  </Link>
                </div>
                <div>
                  <Link to="/blogs/the-edit"> A+R Blog </Link>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="pb-3">
                <hr className="border-dark" />
              </div>
              <div className="mb-3 fw-500">Contact</div>
              <div className="mb-5">
                <div>
                  <a href="https://goo.gl/maps/jBhqZZ9aEXm" target="_blank">
                    1318 E 7th Street, Suite 100
                  </a>
                </div>
                <div>
                  <a href="https://goo.gl/maps/jBhqZZ9aEXm" target="_blank">
                    Los Angeles, CA, 90021
                  </a>
                </div>
                <div>
                  <a href="tel:8009130071"> tel: 800-913-0071 </a>
                </div>
                <div>
                  <a href="mailto:info@aplusrstore.com">
                    email: info@aplusrstore.com
                  </a>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="m-0">
                <div className="pb-3">
                  <hr className="border-dark" />
                </div>
                <div className="title">
                  <div className="mb-3">
                    <strong> My account </strong>
                  </div>
                </div>
                <div className="mb-5">
                  <div>
                    <Link to={isLoggedIn ? '/account' : '/account/login'}> Login </Link>
                  </div>
                  <div>
                    <Link to="/account/register"> Create an Account </Link>
                  </div>
                  <div>
                    <Link to="/pages/trade"> Trade + Contract </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="pb-3">
                <hr className="border-dark" />
              </div>
              <div className="mb-3 fw-500">Support</div>
              <div className="mb-5">
                <div>
                  <Link to="/pages/faq"> FAQ </Link>
                </div>
                <div>
                  <Link to="/pages/faq#ordering"> Placing an Order </Link>
                </div>
                <div>
                  <Link to="/pages/faq#shipping"> Shipping Costs + Times </Link>
                </div>
                <div>
                  <Link to="/pages/faq#returns"> Returns + Exchanges </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-auto">
              <div className="text-left mb-5">
                <svg
                  className="d-block my-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 364.52 157.66"
                  fill="#50b748"
                  height="50"
                  title="Page is served by B2Storefront"
                >
                  <path
                    d="M108.77,157.66V105.12l52.49,0v52.56Zm104.92,0h52.47V105.1H213.69ZM95.35,0,0,157.66H57.79l31.77-52.54h19.21V52.56h52.47l0-52.56ZM325.63,93.33A51.6,51.6,0,0,0,295.69,0h-82V.23h0V52.56h52.47V105.1h14.13l31.79,52.56h52.44Z"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="col">
              <div className="text-left mb-5">
                <div className="fw-500">
                  Global Design.
                  <br />
                  Edited.
                </div>
              </div>
            </div>
            <div className="col-auto">
              <div className="mb-3 mb-lg-5">
                <small className="text-secondary fw-400">
                  © {new Date().getFullYear()} A+R {' — '}
                  <Link className="text-secondary" to="/pages/terms-conditions">Terms</Link>
                  {' '}&amp;{' '}
                  <Link className="text-secondary" to="/pages/privacy-policy">Privacy</Link>
                  {' — '}
                  <a
                    className="text-secondary"
                    href="http://mote.agency"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Site by Mote
                  </a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

FooterTmpl.propTypes = {
  renderNewsletter: PropTypes.bool,
  isLoggedIn: PropTypes.bool
}

export default FooterTmpl