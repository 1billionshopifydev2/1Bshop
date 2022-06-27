/* eslint-disable */

import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { resizedImgURL } from '@b2s_core/src/utils/helpers'
import 'tiny-slider/dist/tiny-slider.css'

const GalleryTmpl = require(`../../../../themes/${process.env.B2S_THEME_NAME}/Product/Shared/GalleryTmpl`)
  .default
  
let desktopModalSlider
let mobileTinySlider
  
const Gallery = ({ images, title, variant }) => {
  const [sliderInitialized, setSliderInitialized] = useState(false)

  const checkSliderAvailability = async () => {
    setSliderInitialized(true)
  }
  
  const initMobileSlider = (tinySlider, container) => {
    return tinySlider({
      container,
      controls: false,
      nav: false,
      loop: true,
      swipeAngle: 15,
      preventScrollOnTouch: "force",
      lazyload: true,
    })
  }
  
  const initDesktopThumbSlider = async (tinySlider, container) => {
    window.desktopSlider = await tinySlider({
      container,
      items: 6,
      slideBy: 'page',
      axis: 'vertical',
      controls: true,
      controlsPosition: 'bottom',
      nav: false,
      touch: false,
      loop: true,
      lazyload: true,
      gutter: 15,
      edgePadding: 10,
    })
  }


  const desktopThumbSliderRef = useRef()
  const mobileSliderRef = useRef()
  const desktopModalZoomRef = useRef()
  const desktopModalZoomSliderRef = useRef()

  useEffect(() => {
    checkSliderAvailability()
  }, [])

  useEffect(() => {
    if (variant.image) {
      const variantImageIndex = images.findIndex(
        productImage => productImage.id === variant.image.id
      )
      if (
        variantImageIndex !== '-1' &&
        desktopThumbSliderRef.current?.children
      ) {
        const variantThumbLink = desktopThumbSliderRef.current.querySelector(
          `[data-bs-slide-to="${variantImageIndex}"]`
        )
        variantThumbLink?.firstChild.click()
        mobileTinySlider && mobileTinySlider.goTo(variantImageIndex)
      }
    }
  }, [variant])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    // tiny-slider import
    const { tns: tinySlider } = require('tiny-slider/src/tiny-slider')

    // mobile
    mobileTinySlider = initMobileSlider(tinySlider, mobileSliderRef.current)

    // desktop
    if (window.innerWidth > 991) {
      const desktopThumbSliderContainer = desktopThumbSliderRef.current
      const desktopModalContainer = desktopModalZoomRef.current
      const desktopModalZoomSlider = desktopModalZoomSliderRef.current
      initDesktopThumbSlider(tinySlider, desktopThumbSliderContainer)

      desktopModalContainer.addEventListener('show.bs.modal', event => {
        const referer = event.relatedTarget
        const slideIndex = referer.getAttribute('data-bs-set-slide')
        for (let item of desktopModalZoomSlider.querySelectorAll(
          '.carousel-item'
        )) {
          item.classList.remove('active')
        }
        desktopModalZoomSlider
          .querySelector('.carousel-item[data-index="' + slideIndex + '"]')
          .classList.add('active')

        if (!desktopModalSlider) {
          desktopModalSlider = new bootstrap.Carousel(desktopModalZoomSlider, {
            interval: false,
            touch: false,
          })
          desktopModalZoomSlider.addEventListener('slid.bs.carousel', event => {
            const slideTo = event.to
            desktopThumbSliderContainer
              .querySelector('a[data-bs-slide-to="' + slideTo + '"]')
              .click()
          })
          desktopModalContainer
            .querySelector('a[data-bs-slide="prev"]')
            .addEventListener('click', event => {
              event.preventDefault()
              desktopModalSlider.prev()
            })
          desktopModalContainer
            .querySelector('a[data-bs-slide="next"]')
            .addEventListener('click', event => {
              event.preventDefault()
              desktopModalSlider.next()
            })
        }
      })
    }
  }, [])

  const ownProps = {
    images,
    initialImages: images.slice(0, 6),
    classNames,
    title,
    resizedImgURL,
    sliderInitialized,
  }

  return (
    <GalleryTmpl
      ref={{
        desktopThumbSliderRef,
        mobileSliderRef,
        desktopModalZoomRef,
        desktopModalZoomSliderRef,
      }}
      {...ownProps}
    />
  )
}

Gallery.propTypes = {
  images: PropTypes.array.isRequired,
  title: PropTypes.string,
  variant: PropTypes.object.isRequired,
}

Gallery.defaultProps = {
  title: 'Product photo',
  variant: {},
}

export { Gallery }
