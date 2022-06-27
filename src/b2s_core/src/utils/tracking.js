/* eslint-disable */

import { trackConversionAPIEvent } from './facebook_conversion_api'
import * as gtm from './google_tag_manager'

export const trackSignUp = ({ from = '', email = '' }) => {
  const google = {
    send_to: 'UA-164115039-1',
    method: from,
  }

  if (process.env.NODE_ENV === 'development') {
    console.groupCollapsed('Page view tracked - events preview')
    console.log('gtag', 'event', 'sign_up', google)
    console.log('wisepops', 'goal', 'signUp')
    console.groupEnd()
  } else if (process.env.NODE_ENV === 'production') {
    if (window['gtag']) {
      window.gtag('event', 'sign_up', google)
    } else {
      console.warn('Tracking event not fired.')
    }

    if (window['wisepops']) {
      window['wisepops']('goal', 'signUp')
    } else {
      console.warn('Tracking event not fired.')
    }
  }
}

export const trackPageView = () => {
  gtm.trackEvent('b2s_route_change')
  trackConversionAPIEvent('PageView')

  const wisepops_page_view = 'pageview'

  if (process.env.NODE_ENV === 'development') {
    console.groupCollapsed('Page view tracked - events preview')
    console.log('wisepops', wisepops_page_view)
    console.groupEnd()
  } else if (process.env.NODE_ENV === 'production') {
    if (window['wisepops']) {
      window['wisepops'](wisepops_page_view)
    } else {
      console.warn('Tracking event not fired.')
    }
  }
}

export const trackAddToCart = async (customer, item, variant, price, quantity, cart) => {
  const product = {
    value: price,
    content_ids: [Number(item?.id.replace(/[^0-9]+/, ''))],
    content_currency: cart?.currencyCode,
    content_name: item?.title,
    content_category: item?.productType,
    content_type: 'product',
    content_variant: variant,
    num_items: quantity
  }

  let customerPayload = {}

  if (customer) {
    const address = customer.defaultAddress || customer.addresses[0]
    customerPayload = {
      customer_email: customer.email,
      customer_first_name: customer.firstName,
      customer_last_name: customer.lastName,
      customer_phone: address?.phone,
      customer_id: customer.id,
      customer_city: address?.city,
      customer_province: address?.provinceCode,
      customer_zip: address?.zip,
      customer_country: address?.countryCode,
    }
  }

  gtm.trackEvent('b2s_add_to_cart', {...product, ...customerPayload})
  await trackConversionAPIEvent('AddToCart', customerPayload, [item?.id], product.name, product.category, cart?.currencyCode, product.price, quantity)
}

export const trackPurchase = ({
  transaction_id = '',
  transaction_date = '',
  transaction_time = '',
  products = [],
  user_id = null,
  total = 0,
  currency = 'USD',
}) => {
  console.log(
    '-------------------trackprogress: trackPurchase function start --------------------'
  )

  // const wasTrackedAlready =
  //   localStorage.getItem(`transaction_${transaction_id}`) || false
  // if (wasTrackedAlready) {
  //   console.warn(`Order ${transaction_id} was already tracked`)
  //   return
  // } else {
  //   localStorage.setItem(`transaction_${transaction_id}`, '1')
  // }

  let products_ids = []
  if (products.length === 1) {
    products_ids = products[0].old_id ? products[0].old_id : products[0].id
  } else if (products.length > 1) {
    products_ids = products.map(product =>
      product.old_id ? product.old_id : product.id
    )
  }

  const google_purchase_aw = {
    send_to: 'UA-164115039-1',
    user_id: user_id,
    transaction_id: transaction_id,
    currency: currency,
    ecomm_currency: currency,
    ecomm_pagetype: 'purchase',
    ecomm_prodid: products_ids,
    ecomm_totalvalue: total,
  }
  console.log(
    '-------------------trackprogress: google_purchase_aw--------------------'
  )
  console.log(google_purchase_aw)

  const google_purchase_ad = {
    send_to: 'UA-164115039-1',
    affiliation: 'Gatsby demo',
    value: total,
    currency: currency,
    transaction_id: transaction_id,
    date: transaction_date ? transaction_date : '',
    time: transaction_time ? transaction_time : '',
    items: products.map(product => ({
      id: product.old_id ? product.old_id : product.id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    })),
  }
  console.log(
    '-------------------trackprogress: google_purchase_ad--------------------'
  )
  console.log(google_purchase_ad)

  const google_conversion = {
    send_to: `${process.env.GOOGLE_AW_ID}/${process.env.GOOGLE_AW_REVENUE_CONVERSION}`,
    value: total,
    currency: currency,
    transaction_id: transaction_id,
  }
  console.log(
    '-------------------trackprogress: google_conversion--------------------'
  )
  console.log(google_conversion)

  const fb_pixel_track = {
    currency: currency,
    content_type: 'product',
    content_ids: products_ids,
    value: total,
  }
  console.log(
    '-------------------trackprogress: fb_pixel_track--------------------'
  )
  console.log(fb_pixel_track)

  const wisepops = total

  if (process.env.NODE_ENV === 'development') {
    console.log(
      '-------------------trackprogress: development mode--------------------'
    )
    console.groupCollapsed('Pursche tracked - events preview')
    console.log('gtag', 'event', 'purchase', google_purchase_ad)
    console.log('gtag', 'event', 'purchase', google_purchase_aw)
    console.log('gtag', 'event', 'conversion', google_conversion)
    console.log('fbq', 'track', 'Purchase', fb_pixel_track)
    console.log('wisepops', 'goal', 'purchase', wisepops)
    console.groupEnd()
  } else if (process.env.NODE_ENV === 'production') {
    if (window['fbq']) {
      window['fbq']('track', 'Purchase', fb_pixel_track)
    } else {
      console.warn('Tracking event not fired.')
    }

    if (window['gtag']) {
      console.log(
        '-------------------trackprogress: production mode gtag find--------------------'
      )
      window.gtag('event', 'purchase', google_purchase_ad)
      window.gtag('event', 'purchase', google_purchase_aw)
      window.gtag('event', 'conversion', google_conversion)
    } else {
      console.log(
        '-------------------trackprogress: production mode gtag not find--------------------'
      )
      console.warn('Tracking event not fired.')
    }

    if (window['wisepops']) {
      window['wisepops']('goal', 'purchase', wisepops)
    } else {
      console.warn('Tracking event not fired.')
    }
  }
}

export const trackProductView = ({
  id = '',
  currency = '',
  title = '',
  productType = 'Home/Products',
  customer = null,
  value = '',
  url = '',
  brand = '',
  variant = '',
}) => {

  const product = {
    value,
    content_ids: [id],
    content_currency: currency,
    content_name: title,
    content_category: productType,
    content_type: 'product',
    content_brand: brand,
    content_variant: variant,
  }

  let customerPayload = {}

  if (customer) {
    const address = customer.defaultAddress || customer.addresses[0]
    customerPayload = {
      customer_email: customer.email,
      customer_first_name: customer.firstName,
      customer_last_name: customer.lastName,
      customer_phone: address?.phone,
      customer_id: customer.id,
      customer_city: address?.city,
      customer_province: address?.provinceCode,
      customer_zip: address?.zip,
      customer_country: address?.countryCode,
    }
  }

  const wisepops = id

  // if (process.env.NODE_ENV === 'development') {
  if (process.env.NODE_ENV === 'production') {
    console.groupCollapsed('Product view tracked - preview')
    console.log('wisepops', 'goal', 'productView', wisepops)
    console.groupEnd()
  // } else if (process.env.NODE_ENV === 'production') {
  } else if (process.env.NODE_ENV === 'development') {

    gtm.trackEvent('b2s_product_view', {...product, ...customerPayload})
    trackConversionAPIEvent('ViewContent', customerPayload, [id], title, productType, currency, '', 1, url)
    
    if (window['wisepops']) {
      window['wisepops']('goal', 'productView', wisepops)
    } else {
      console.warn('Tracking event not fired.')
    }
  }
}

export const trackProductSearchedListView = ({
  phrase = 'other',
  products,
  user_id = null,
  currency = 'USD',
}) => {
  const google_page_view = {
    send_to: 'UA-164115039-1',
    ecomm_pagetype: 'view_search_results',
    ecomm_phrase: phrase,
    ecomm_prodid: products.map(product => product.old_id),
    user_id: user_id,
  }

  const fb_pixel_track = {
    content_name: name,
    content_ids: products.map(product => product.old_id),
    search_string: phrase,
    currency: currency,
  }

  if (process.env.NODE_ENV === 'development') {
    console.groupCollapsed('Search result tracked - preview')
    console.log('gtag', 'event', 'page_view', google_page_view)
    console.log('fbq', 'track', 'Search', fb_pixel_track)
    console.groupEnd()
  } else if (process.env.NODE_ENV === 'production') {
    if (window['fbq']) {
      window['fbq']('track', 'Search', fb_pixel_track)
    } else {
      console.warn('Tracking event not fired.')
    }
    if (window['gtag']) {
      window.gtag('event', 'page_view', google_page_view)
    } else {
      console.warn('Tracking event not fired.')
    }
  }
}

export const trackInitCheckout = ({ value, currency = 'USD' }) => {
  const fb_pixel_track = {
    value: value,
    currency: currency,
  }

  if (process.env.NODE_ENV === 'development') {
    console.groupCollapsed('Init checkout tracked - preview')
    console.log('fbq', 'track', 'Search', fb_pixel_track)
    console.groupEnd()
  } else if (process.env.NODE_ENV === 'production') {
    if (window['fbq']) {
      window['fbq']('track', 'InitiateCheckout', fb_pixel_track)
    } else {
      console.warn('Tracking event not fired.')
    }
  }
}

export const trackProductListView = ({
  list_name = 'other',
  products,
  user_id = null,
}) => {
  const google_page_view = {
    send_to: 'UA-164115039-1',
    ecomm_pagetype: 'category',
    ecomm_listname: list_name,
    ecomm_prodid: products.map(product => product.old_id),
    user_id: user_id,
  }

  const fb_pixel_track = {
    content_name: list_name,
    content_type: 'category',
    content_ids: products.map(product => product.old_id),
  }

  if (process.env.NODE_ENV === 'development') {
    console.groupCollapsed('Product list view tracked - preview')
    console.log('gtag', 'event', 'page_view', google_page_view)
    console.log('fbq', 'track', 'ViewContent', fb_pixel_track)
    console.groupEnd()
  } else if (process.env.NODE_ENV === 'production') {
    if (window['fbq']) {
      window['fbq']('track', 'ViewContent', fb_pixel_track)
    } else {
      console.warn('Tracking event not fired.')
    }

    if (window['gtag']) {
      window.gtag('event', 'page_view', google_page_view)
    } else {
      console.warn('Tracking event not fired.')
    }
  }
}
