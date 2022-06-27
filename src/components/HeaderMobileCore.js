import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Link from '@b2s_core/src/utils/Link'
import { CartIcon } from './Header/Cart/CartIcon'
import { WishlistIcon } from './Header/WishlistIcon'
import { HeaderSearch } from './Header/HeaderSearch'
import CurrencyDropdown from './Header/CurrencyDropdown'
import { MyAccountDropdown } from './Header/MyAccountDropdown'
import { AuthDropdown } from './Header/AuthDropdown'
import { CompareIcon } from './Header/Compare/CompareIcon'
const logoImg = require(`../../themes/${process.env.B2S_THEME_NAME}/assets/images/logo.png`)
const HeaderMobileTmpl = require(`../../themes/${process.env.B2S_THEME_NAME}/HeaderMobileTmpl`)
  .default

const HeaderMobileCore = () => {
  const [qty, setQty] = useState(0)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  const { comparelist, loaded } = useSelector(store => store.session)

  useEffect(() => {
    if (loaded) {
      setQty(comparelist.length)
    }
  }, [comparelist, loaded])

  useEffect(() => {
    $(document).ready(function() {
      const body = $('body')
      const mobileSearch = $('.mobile-header__search')

      if (mobileSearch.length) {
        $('.indicator--mobile-search .indicator__button').on(
          'click',
          function() {
            if (mobileSearch.is('.mobile-header__search--open')) {
              mobileSearch.removeClass('mobile-header__search--open')
              body.removeClass('search-is-open')
            } else {
              mobileSearch.addClass('mobile-header__search--open')
              body.addClass('search-is-open')
              mobileSearch.find('input')[0].focus()
            }
          }
        )

        mobileSearch
          .find('.search__button--type--close')
          .on('click', function() {
            mobileSearch.removeClass('mobile-header__search--open')
            body.removeClass('search-is-open')
          })

        document.addEventListener(
          'click',
          function(event) {
            if (
              !$(event.target).closest(
                '.indicator--mobile-search, .mobile-header__search'
              ).length
            ) {
              mobileSearch.removeClass('mobile-header__search--open')
              body.removeClass('search-is-open')
            }
          },
          true
        )
      }

      $(function() {
        const body = $('body')
        const mobilemenu = $('.mobilemenu')

        if (mobilemenu.length) {
          const open = function() {
            const bodyWidth = body.width()
            body.css('overflow', 'hidden')
            body.css('paddingRight', body.width() - bodyWidth + 'px')

            mobilemenu.addClass('mobilemenu--open')
          }
          const close = function() {
            body.css('overflow', '')
            body.css('paddingRight', '')

            mobilemenu.removeClass('mobilemenu--open')
          }

          $('.mobile-header__menu-button').on('click', function() {
            open()
          })
          $('.mobilemenu__backdrop, .mobilemenu__close').on(
            'click',
            function() {
              close()
            }
          )
        }
      })
    })
  }, [])

  const ownProps = {
    isMobileSearchOpen,
    setIsMobileSearchOpen,
    logoImg,
  }

  return <HeaderMobileTmpl {...ownProps} />
}

export {
  HeaderMobileCore,
  Link,
  CartIcon,
  WishlistIcon,
  HeaderSearch,
  CurrencyDropdown,
  MyAccountDropdown,
  AuthDropdown,
  CompareIcon,
}
