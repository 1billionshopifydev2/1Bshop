import { array } from 'prop-types'
export const productOwl = {
  options: {
    items: 4,
    margin: 14,
    nav: false,
    dots: false,
    loop: false,
    stagePadding: 1,
  },
  layouts: {
    'grid-4': {
      responsive: {
        1200: { items: 4, margin: 14 },
        992: { items: 4, margin: 10 },
        768: { items: 3, margin: 10 },
        576: { items: 2, margin: 10 },
        475: { items: 2, margin: 10 },
        0: { items: 1 },
      },
    },
    'grid-4-sm': {
      responsive: {
        1200: { items: 4, margin: 14 },
        992: { items: 3, margin: 10 },
        768: { items: 3, margin: 10 },
        576: { items: 2, margin: 10 },
        475: { items: 1, margin: 10 },
        0: { items: 1 },
      },
    },
    'grid-5': {
      responsive: {
        1200: { items: 5, margin: 12 },
        992: { items: 4, margin: 10 },
        768: { items: 3, margin: 10 },
        576: { items: 2, margin: 10 },
        475: { items: 2, margin: 10 },
        0: { items: 1 },
      },
    },
    horizontal: {
      items: 3,
      responsive: {
        1200: { items: 3, margin: 14 },
        992: { items: 3, margin: 10 },
        768: { items: 2, margin: 10 },
        576: { items: 1 },
        475: { items: 1 },
        0: { items: 1 },
      },
    },
  },
}

export const initProductSlider = (selector, allItems) => {
  $(selector).each(function() {
    const layout = $(this).data('layout')
    const owl = $('.owl-carousel', this)
    owl.owlCarousel(
      $.extend({}, productOwl.options, productOwl.layouts[layout])
    )
    let activeItems = $(this).find('.owl-item.active')
    const arrows = $(this).find('.block-header__arrow')

    const checkActiveItems = () => {
      if (activeItems.length === allItems) {
        arrows.each((index, arrow) => {
          arrow.disabled = true
        })
      } else {
        arrows.each((index, arrow) => {
          arrow.disabled = false
        })
      }
    }
    checkActiveItems()

    owl.on('resized.owl.carousel', function() {
      activeItems = $(this).find('.owl-item.active')
      checkActiveItems()
    })
  })
}

export const initProductSliderArrows = selector => {
  $(selector).each(function() {
    const owl = $('.owl-carousel', this)
    $(this)
      .find('.block-header__arrow--left')
      .on('click', function() {
        owl.trigger('prev.owl.carousel', [500])
      })
    $(this)
      .find('.block-header__arrow--right')
      .on('click', function() {
        owl.trigger('next.owl.carousel', [500])
      })
  })
}
