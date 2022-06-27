import React from 'react'
import * as Components from '../../src/components/MobileSidebar'

const MobileSidebarTmpl = ({
  menuItems,
  getSlideToGo,
  goToSlideBack,
  closeSideBar,
}) => (
  <div className="h-100 d-xl-none" id="menu-mobile">
    <div className="h-100">
      <div
        className="carousel slide h-100"
        data-bs-interval="false"
        data-bs-ride="carousel"
        id="menu-mobile-carousel"
      >
        <div className="carousel-inner h-100">
          <div className="carousel-item active h-100">
            <div className="p-2">
              <Components.HeaderSearch />
            </div>
            <ul className="nav flex-column">
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default MobileSidebarTmpl
