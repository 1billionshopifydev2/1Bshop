import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Link from '@b2s_core/src/utils/Link'

import HeaderSearch from './Header/HeaderSearch'
import { cartQtyFromModel } from '@b2s_core/src/utils/helpers'

const HeaderDesktopTmpl =
  require(`@themes/${process.env.B2S_THEME_NAME}/HeaderDesktopTmpl`).default

const HeaderDesktopCore = ({ menuItems }) => {
  const { model } = useSelector((store) => store.checkout)
  const { isLoggedIn } = useSelector((store) => store.session)
  const [desktopMoreMenuItems, setDesktopMoreMenuItems] = useState([])
  const qty = cartQtyFromModel(model)

  useEffect(() => {
    const menuMobile = document.getElementById('menu-mobile')
    document
      .querySelector('button[data-toggle="stage"]')
      .addEventListener('click', () => {
        if (!menuMobile.classList.contains('show')) {
          document.body.classList.add('stage-open')
          menuMobile.classList.add('show')
          menuMobile.setAttribute('aria-expanded', 'true')
        } else {
          document.body.classList.remove('stage-open')
          menuMobile.classList.remove('show')
          menuMobile.setAttribute('aria-expanded', 'false')
        }
      })

    if (typeof window !== 'undefined' && window.innerWidth > 767) {
      let menuItems = []
      let menuWidth = 0
      for (let element of document.querySelectorAll(
        '.menu-category > .nav-item'
      )) {
        if (element.classList.contains('menu-category-item')) {
          menuItems.push({
            item: element,
            data: {
              href: element.firstElementChild.href,
              text: element.firstElementChild.text,
            },
          })
          menuWidth += element.offsetWidth
        }
      }

      const logoWidth = document.querySelector(
        '.navigation .navbar-brand'
      ).offsetWidth
      const searchWidth = document.querySelector(
        '.navigation .menu-search'
      ).offsetWidth
      const cartWidth = document.querySelector(
        '.navigation .menu-cart'
      ).offsetWidth

      const setMenuItems = () => {
        const maxMenuWidth =
          window.innerWidth - logoWidth - searchWidth - cartWidth - 90
        let countWidth = 0
        let moreMenuItems = []
        menuItems.forEach(({ item, data }) => {
          countWidth += item.offsetWidth
          if (countWidth > maxMenuWidth) {
            moreMenuItems.push(data)
            item.classList.add('d-none')
          } else {
            moreMenuItems.filter((link) => link.href !== data.href)
            item.classList.remove('d-none')
          }
        })
        setDesktopMoreMenuItems(moreMenuItems)
      }

      let resizeTimer
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(function() {
          setMenuItems()
        }, 500)
      })
      setMenuItems()
    }
  }, [])

  return (
    <HeaderDesktopTmpl
      isLoggedIn={isLoggedIn}
      desktopMoreMenuItems={desktopMoreMenuItems}
      menuItems={menuItems}
      cart={{ qty }}
    />
  )
}

export {
  Link,
  HeaderDesktopCore,
  HeaderSearch,
}
