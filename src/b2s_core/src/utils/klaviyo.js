const axios = require('axios');

const subscribe = async (listID, email) => {
  let form = new FormData();
  form.append('g', listID)
  form.append('$fields', '$consent,$source,$method_type,$method_id,$consent_version')
  form.append('$list_fields', '$consent')
  form.append('email', email)
  form.append('$timezone_offset', '2')
  form.append('$source', '$embed')
  form.append('$method_type', 'Klaviyo Form')
  form.append('$method_id', 'embed')
  form.append('$consent_version', 'Embed default text')

  const response = await axios.post('https://manage.kmail-lists.com/ajax/subscriptions/subscribe', form)

  return response?.data
}

const notifyMe = async (variant, product, email) => {
  let form = new FormData();
  form.append('a', 'NPNsiZ')
  form.append('platform', 'shopify')
  form.append('subscribe_for_newsletter', false)
  form.append('email', email)
  form.append('variant', variant)
  form.append('product', product)

  const response = await axios.post('https://a.klaviyo.com/onsite/components/back-in-stock/subscribe', form)

  return response?.data?.success
}

export {
  subscribe,
  notifyMe
}