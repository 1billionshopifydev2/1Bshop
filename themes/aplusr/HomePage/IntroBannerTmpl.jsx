import React from 'react'
import * as Components from '../../../src/components/Home/IntroBannerSection'

const IntroBannerTmpl = () => (
  <div className="block block-banner card-banner overlay-gradient">
    <div className="container">
      <Components.Link to="/category/hand-tools">
        <div className="card-img-overlay white p-0 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <h3 className="card-title">Hundreds Hand Tools</h3>
            <p className="card-text mx-auto" style={{ maxWidth: '400px' }}>
              Hammers, Chisels, Universal Pliers, Nippers, Jigsaws, Saws
            </p>
            <span className="btn btn-warning">Shop Now</span>
          </div>
        </div>
      </Components.Link>
    </div>
  </div>
)

export default IntroBannerTmpl
