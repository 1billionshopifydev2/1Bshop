import React from 'react'
import * as Components from '../../src/components/HeaderMobileCore'


const HeaderMobileTmpl = (props) => {
  return (
    <header className="site__header d-lg-none">
      <div
        className="mobile-header mobile-header--sticky"
        data-sticky-mode="pullToShow"
      >
        <div className="mobile-header__panel">
          <div className="container">
            <div className="mobile-header__body">
              <button className="mobile-header__menu-button">
                <div className="icon">
                  <i className="icon-sm fa fa-bars"></i>
                </div>
              </button>
              <Components.Link to="/" className="mobile-header__logo">
                <img
                  src={props.logoImg}
                  width="165" height="46"
                  alt="Stroyka - Tools Store"
                  loading="lazy"
                />
              </Components.Link>
              <Components.HeaderSearch
                isMobileSearchOpen={props.isMobileSearchOpen}
                setIsMobileSearchOpen={props.setIsMobileSearchOpen}
              />
              <div className="mobile-header__indicators">
                <div className="indicator indicator--search indicator--mobile-search indicator--mobile d-md-none">
                  <div
                    className="indicator__button"
                    onClick={() => {
                      props.setIsMobileSearchOpen(true)
                    }}
                  >
                    <div className="icontext">
                      <div className="icon">
                        <i className="icon-xs rounded-circle border fa fa-search"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <Components.CompareIcon
                  className="widget-header blue-link dropdown"
                  isMobile
                />
                <Components.WishlistIcon
                  className="widget-header blue-link dropdown"
                  isMobile
                />
                <Components.CartIcon
                  className="widget-header blue-link dropdown"
                  isMobile
                />
                <Components.AuthDropdown isMobile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderMobileTmpl
