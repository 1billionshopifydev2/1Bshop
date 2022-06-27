import React from 'react'

import * as Components from '../../src/components/HeaderDesktopCore'
import StrapiImage from './Shared/StrapiImage'

const HeaderDesktopTmpl = (props) => {
  return (
    <>
      <div className="navigation position-sticky sticky-top">
        <nav className="navbar navbar-expand-lg align-items-end navbar-light bg-white p-0 px-lg-3">
          <button
            aria-controls="menu-mobile"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="navbar-toggler border-0 p-3"
            data-toggle="stage"
            to="#menu-mobile"
            type="button"
          >
            <svg
              className="d-block"
              height="20"
              stroke="currentColor"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <polyline points="0,6.5 20,6.5"></polyline>
              <polyline points="0,13.5 20,13.5"></polyline>
            </svg>
          </button>

          <Components.Link
            className="navbar-brand py-lg-3 py-2 px-2 my-1 mx-1"
            to="/"
          >
            <svg
              fill="#50b748"
              height="30"
              viewBox="0 0 364.52 157.66"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>A+R</title>
              <path d="M108.77,157.66V105.12l52.49,0v52.56Zm104.92,0h52.47V105.1H213.69ZM95.35,0,0,157.66H57.79l31.77-52.54h19.21V52.56h52.47l0-52.56ZM325.63,93.33A51.6,51.6,0,0,0,295.69,0h-82V.23h0V52.56h52.47V105.1h14.13l31.79,52.56h52.44Z"></path>
            </svg>
          </Components.Link>

          <div className="navbar-collapse collapse">
            <div className="d-flex flex-column w-100">
              <ul className="navbar-nav ms-auto fw-500">
                <li className="nav-item">
                  <Components.Link
                    className="nav-link px-3 py-0 my-2 fs-12"
                    to={props.isLoggedIn ? '/account' : '/account/login'}
                  >
                    {props.isLoggedIn ? 'Account' : 'Login'}
                  </Components.Link>
                </li>
                <li className="nav-item">
                  <Components.Link
                    className="nav-link border-secondary border-right border-left px-3 py-0 my-2 fs-12"
                    to="/pages/trade"
                  >
                    Trade + Contract
                  </Components.Link>
                </li>
                <li className="nav-item">
                  <Components.Link
                    className="nav-link px-3 py-0 my-2 fs-12"
                    to="/pages/about-us#visit"
                  >
                    Visit
                  </Components.Link>
                </li>
              </ul>
              <div className="d-flex w-100">
                <ul className="menu-category navbar-nav mr-auto">
                  <Components.HeaderSearch />
                </ul>
                <ul className="menu-cart navbar-nav ms-auto">
                  <li className="nav-item">
                    <Components.Link
                      className="nav-link text-body py-3 px-2 mx-1"
                      to="/cart"
                    >
                      Cart: <span id="count">{props.cart.qty}</span>
                    </Components.Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Components.Link
            className="menu-cart navbar-toggler text-dark border-0 p-3"
            to="/cart"
          >
            Cart
          </Components.Link>
        </nav>
      </div>
    </>
  )
}

const MenuItem = ({ url, title: itemTitle, children }) => (
  <li className="nav-item menu-category-item dropdown-hover position-static">
    <Components.Link
      className="nav-link text-body py-3 px-2 mx-1"
      to={url}
    >
      {itemTitle}
    </Components.Link>
    {Boolean(children.length) &&
      <div className="dropdown-menu border-0 w-100 p-0 m-0">
        <div className="container-fluid px-3 pt-2">
          <div className="row g-0">
            {children?.map((column, i) =>
              column.parent ? (
                <TeaserMegaColumn key={`${column.url}-${i}`} {...column} />
              ) : (
                <SubMenuItem key={`${column.url}-${i}`} {...column} />
              )
            )}
          </div>
        </div>
      </div>
    }
  </li>
)

const SubMenuItem = (column) => (
  <div className="col px-2">
    <div className="mb-5">
      <Components.Link
        className="dropdown-header text-body px-1"
        to={column.url}
      >
        {column.title}
      </Components.Link>
      {column.children.map(({ title, url }, i) => (
        <Components.Link
          className="dropdown-item bg-transparent text-body px-1"
          key={`${title}-${i}`}
          to={url}
        >
          {title}
        </Components.Link>
      ))}
    </div>
  </div>
)

const TeaserMegaColumn = ({ title, url, image, text }) => (
  <div className="col-lg-3 px-2">
    <div className="figure">
      <div className="px-1">
        <div className="title">
          <h4 className="mb-3">
            <Components.Link to={url}>{title}</Components.Link>
          </h4>
        </div>
        <div className="image">
          <div className="mb-2">
            <Components.Link className="bg-light" to={url} >
              <div className="embed-responsive embed-responsive-16by9">
                <div className="embed-responsive-item">
                  <StrapiImage
                    alt={title}
                    className="w-100"
                    height={image?.height}
                    sizes={image?.size}
                    image={image}
                    width={image?.width}
                  />
                </div>
              </div>
            </Components.Link>
          </div>
        </div>
        <div className="text">
          <div className="text-justify">
            <p className="pb-3 mb-4">{text}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default HeaderDesktopTmpl
