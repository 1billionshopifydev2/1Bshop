import React from 'react'

import * as Components from '../../../src/pages/404'

const Page404Tmpl = props => (
  <div className="page-not-found">
    <Components.SEO title="404: Not found" />
    <div className="page-not-found-card">
      <div className="page-not-found-card-header">
        <h3>Not Found</h3>
        <span>404</span>
      </div>
      <form
        action="/"
        method="post"
        onSubmit={props.handleSearchForm}
        className="page-not-found-cart-body"
      >
        <div>
          <p className="mb-2 text-center">
            The page you were looking for does not exist.
          </p>
          <p className="mb-2 text-center">
            Maybe you want to try the search instead?
          </p>
        </div>
        <div className="pt-2">
          <div className="page-not-found-form">
            <input
              defaultValue={props.defaultSearchParam}
              name="q"
              type="text"
              autoComplete="off"
            />
            <button type="submit">Search</button>
          </div>
        </div>
      </form>
      <div className="d-flex px-2 py-2 justify-content-center">
        Back to{' '}
        <Components.Link className="mx-1" to="/">
          A+R
        </Components.Link>
        <>
          <div>|</div>
          <button
            className="ms-1 p-0 btn btn-link"
            onClick={() => {
              props.handlePreviousPage()
            }}
          >
            Previous Page
          </button>
        </>
      </div>
    </div>
  </div>
)

export default Page404Tmpl
