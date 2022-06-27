import React from 'react'

const FeaturesTmpl = () => (
  <section className="section-specials border-bottom pb-5">
    <div className="container">
      <div className="row">
        <div className="col-md-3  mb-3 mb-md-0">
          <article className="card card-body">
            <figure className="text-center">
              <span className="icon-sm rounded-circle bg-danger">
                <i className="fa fa-comment-dots white"></i>
              </span>
              <figcaption className="pt-4">
                <h5 className="title">Support 24/7</h5>
                <p>Call us anytime</p>
              </figcaption>
            </figure>
          </article>
        </div>
        <div className="col-md-3  mb-3 mb-md-0">
          <article className="card card-body">
            <figure className="text-center">
              <span className="icon-sm rounded-circle bg-primary">
                <i className="fa fa-money-bill-alt white"></i>
              </span>
              <figcaption className="pt-4">
                <h5 className="title">Hot Offers</h5>
                <p>Discounts up to 90%</p>
              </figcaption>
            </figure>
          </article>
        </div>
        <div className="col-md-3  mb-3 mb-md-0">
          <article className="card card-body">
            <figure className="text-center">
              <span className="icon-sm rounded-circle bg-warning">
                <i className="fa fa-lock white"></i>
              </span>
              <figcaption className="pt-4">
                <h5 className="title">100% Safety</h5>
                <p>Only secure payments</p>
              </figcaption>
            </figure>
          </article>
        </div>
        <div className="col-md-3  mb-3 mb-md-0">
          <article className="card card-body">
            <figure className="text-center">
              <span className="icon-sm rounded-circle bg-success">
                <i className="fa fa-truck white"></i>
              </span>
              <figcaption className="pt-4">
                <h5 className="title">Free Shipping</h5>
                <p>For orders from $50</p>
              </figcaption>
            </figure>
          </article>
        </div>
      </div>
    </div>
  </section>
)

export default FeaturesTmpl
