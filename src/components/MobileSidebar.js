import React from 'react'
import Link from '@b2s_core/src/utils/Link'
import { useSelector, useDispatch } from 'react-redux'

import { BRANDS } from '@b2s_core/src/utils/data'
import { logout } from '@b2s_core/src/reducers/session'
import HeaderSearch from './Header/HeaderSearch'

const MobileSidebarTmpl =
  require(`@themes/${process.env.B2S_THEME_NAME}/MobileSidebarTmpl`).default

const MobileSidebar = ({ menuItems }) => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((store) => store.session)

  const handleLogout = () => {
    dispatch(logout())
    window.location.replace('/')
  }

  const getSlideToGo = (pathname) => {
    let position = 0
    let itemFound = false

    menuItems.forEach((item) => {
      if (item.children.length > 1 && !itemFound) {
        position++
        itemFound = pathname === item.url
      }
    })

    menuItems.forEach((item) => {
      if (item.children.length === 1 && !itemFound) {
        position++
        itemFound = item.url === pathname
      }

      item.children.forEach((subItem) => {
        if (
          item.children.length !== 1 &&
          subItem.children?.length &&
          !itemFound
        ) {
          position++
          itemFound = pathname === subItem.url
        }
      })
    })

    return position
  }

  const goToSlideBack = (parentSlug) => {
    let itemFound = false
    const position = menuItems.reduce((innerCount, { url, children }) => {
      if (children.length > 1 && !itemFound) {
        ++innerCount
        itemFound = parentSlug === url
      }

      return innerCount
    }, 0)

    return position
  }

  const closeSideBar = () => {
    const menuMobile = document.getElementById('menu-mobile')
    if (!menuMobile.classList.contains('show')) {
      document.body.classList.add('stage-open')
      menuMobile.classList.add('show')
      menuMobile.setAttribute('aria-expanded', 'true')
    } else {
      document.body.classList.remove('stage-open')
      menuMobile.classList.remove('show')
      menuMobile.setAttribute('aria-expanded', 'false')
    }
  }

  const ownProps = {
    handleLogout,
    brands: BRANDS,
    isLoggedIn,
    menuItems,
    getSlideToGo,
    goToSlideBack,
    closeSideBar,
  }

  return <MobileSidebarTmpl { ...ownProps } />
}

export { MobileSidebar, Link, HeaderSearch }
