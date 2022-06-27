import axios from 'axios'
import Cookies from 'js-cookie'

export const trackConversionAPIEvent = async (eventName, customer = null, ids = [], title = '', category = '', currency = '', amount = '', numItems = 1, url = '') => {
  return await axios.post(`${process.env.GATSBY_FACEBOOK_CONVERSION_API_URL}/track`, {
    eventName: eventName,
    eventData: {
      currency: currency,
      value: amount,
      customProperties: {
        content_name: title,
        content_ids: ids,
        content_type: 'product',
        content_category: category,
        num_items: numItems,
      },
      url,
    },
    customer: {
      email: customer?.email,
      phone: customer?.phone ? customer?.phone : customer?.defaultAddress?.phone,
      firstName: customer?.firstName,
      lastName: customer?.lastName,
      address: customer?.defaultAddress,
      fbp: Cookies.get('_fbp') ? Cookies.get('_fbp') : '',
      fbc: Cookies.get('_fbc') ? Cookies.get('_fbc') : '',
    },
  })
}
