/* eslint-disable */

const { sortStringsAndNumbers, getMinCompareAtPrice, getMaxCompareAtPrice } = require('./helpers')

const getSplittedDescription = (html) => {
  const splitted = html.split('<!-- split -->')
  let parts = []
  let index = 0
  for (let i = 0; i < splitted.length; i++) {
    if (i % 2 === 0) {
      parts[index] = {
        header: splitted[i],
        text: splitted[i + 1],
      }
      index++
    }
  }
  return parts
}

const getMetafieldValue = (metafields, namespace, key) => {
  const field = metafields && metafields.find((field) => field.namespace === namespace && field.key === key)
  return field ? field.value : ''
}

const getVariantPrices = (presentmentPrices, currencyCode = 'USD') => {
  let currencies = presentmentPrices
  if (!currencies) {
    return {}
  }
  if (presentmentPrices.edges) {
    // Array of edges have nodes objects so we remapping them
    currencies = presentmentPrices.edges.map((edge) => ({ ...edge.node }))
  }
  if (Array.isArray(currencies)) {
    const matchedCurrencies = currencies.filter((currency) => currency.price.currencyCode === currencyCode)
    if (matchedCurrencies.length === 1) {
      const currency = matchedCurrencies[0]
      return {
        currency: currencyCode,
        price: Number(currency.price.amount),
        oldPrice: currency.compareAtPrice && Number(currency.compareAtPrice.amount) > Number(currency.price.amount) ? Number(currency.compareAtPrice.amount) : null,
      }
    }
  }
  return {}
}


const getPrices = (product) => ({
  min: product.priceRangeV2?.minVariantPrice,
  max: product.priceRangeV2?.maxVariantPrice,
  minCompareAtPrice: getMinCompareAtPrice(product.variants),
  maxCompareAtPrice: getMaxCompareAtPrice(product.variants),
})

const getSubtotalBeforeDiscounts = (
  lineItems,
  checkoutCurrencyCode = 'USD'
) => {
  if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
    return 0
  }
  return lineItems.reduce((acc, current) => {
    const priceData = current.variant.presentmentPrices.find((p) => p.price.currencyCode === checkoutCurrencyCode)
    const compareAtPrice = current.variant.presentmentPrices.find((p) => p.compareAtPrice && p.compareAtPrice.currencyCode === checkoutCurrencyCode)

    const price = compareAtPrice ? Number(compareAtPrice.compareAtPrice.amount) : Number(priceData.price.amount)

    const response = acc + price * current.quantity
    const responseRounded = Math.round(response * 100) / 100 // It somtimes returned 105.00001
    return responseRounded
  }, 0)
}

const getSubtotalDiscount = (subtotal, lineItems, checkoutCurrencyCode = 'USD') => {
  const subtotalBefore = getSubtotalBeforeDiscounts(lineItems, checkoutCurrencyCode)
  const subtotalNumber = Number(subtotal)
  return subtotalBefore > subtotalNumber ? subtotalBefore - subtotalNumber : 0
}

// Variants size/color etc.
const getVariantOptions = (variant) => {
  if (!variant) {
    return []
  }
  if (Array.isArray(variant.selectedOptions)) {
    return variant.selectedOptions.filter((option) => option.value !== 'Default Size' && option.value !== 'Default Title')
  }
}

const getUpholsteriesGroup = (variants, upholsterersByVendor) => {
  let upholsteryColumn

  const hasUpolterers = variants.some(({ selectedOptions }) =>
    selectedOptions.some(({ value, name }) => {
      if (upholsterersByVendor && typeof upholsterersByVendor[value] !== 'undefined') {
        upholsteryColumn = name

        return true
      }
    })
  )

  if (Boolean(variants.length) && hasUpolterers) {
    const upholsteriesGroup = variants.reduce((accumulator, current) => {
      const { selectedOptions, price } = current
      const upholstery = selectedOptions.find(({ name }) => upholsteryColumn === name)

      if (upholstery && !accumulator.includes(upholstery.value)) {
        upholstery.price = price
        accumulator.push(upholstery)
      }
      return accumulator
    }, [])
    upholsteriesGroup.upholsteryColumn = upholsteryColumn
    return upholsteriesGroup
  }

  return []
}

const getProductOptions = (product, selectedOptions = [], checkForAvailable = true) => {
  let options = selectedOptions.map((item) => ({
    name: item.name,
    values: [item.value],
    selected: item.value,
    disabled: [],
  }))

  if (Array.isArray(product.variants)) {
    product.variants.forEach((variant) => {
      variant.selectedOptions.forEach((option) => {
        const { name, value } = option
        if (value !== 'Default Size' && value !== 'Default Title') {
          const optionIndex = options.findIndex((item) => item.name === name)
          if (optionIndex >= 0) {
            if (!options[optionIndex].values.includes(value)) {
              options[optionIndex].values.push(value)
            }
          } else {
            options.push({ name: name, values: [value] })
          }
        }
      })
    })
    options = options.map((option) => ({
      ...option,
      values: option.values,
    }))
    options = options // eslint-disable-line
  } else {
    console.error('Missing variants')
  }

  /* Used for preview */
  if (checkForAvailable) {
    options = options.map((item) => {
      const disabled = item.values.filter((selectValue) => {
        const testSelected = updateSelectedOptions(selectedOptions, {
          name: item.name,
          value: selectValue,
        })
        const variantOptions = getVariantForOptionsDisabled(product, testSelected)
        const availableForSale = variantOptions?.availableForSale
        return !availableForSale
      })
      return { ...item, disabled }
    })
  }

  return options
}

const updateSelectedOptions = (selectedOptions = [], newOption = {}) => {
  if (selectedOptions.some((prevOption) => prevOption.name === newOption.name)) {
    return selectedOptions.map((item) => {
      if (item.name === newOption.name) {
        return { ...item, value: newOption.value }
      } else {
        return item
      }
    })
  } else {
    return [...selectedOptions, newOption]
  }
}

const getVariantForOptions = (product, selectedOptions = []) => {
  /* Each variant has selectedOptions array I compare here those arrays with array recvied above */
  const selectedVariant = product.variants.filter((variant) => {
    const testedOptions = variant.selectedOptions.filter((variantOption) => {
      const testIndex = selectedOptions.findIndex((item) => item.name === variantOption.name && item.value === variantOption.value)
      return testIndex >= 0
    })
    /* Some variants have right color, but different material - that is why i'm comparing length here */
    return variant.selectedOptions.length > 0 && variant.selectedOptions.length === testedOptions.length
  })
  return selectedVariant.length > 0 ? selectedVariant[0] : null
}

const getVariantForOptionsDisabled = (product, selectedOptions = []) => {
  /* Each variant has selectedOptions array I compare here those arrays with array recvied above */
  const selectedVariant = product.variants.filter((variant) => {
    const testedOptions = variant.selectedOptions.filter((variantOption) => {
      const testIndex = selectedOptions.findIndex((item) => item.name === variantOption.name && item.value === variantOption.value)
      return testIndex >= 0
    })
    /* Some variants have right color, but different material - that is why i'm comparing length here */
    return variant.selectedOptions.length > 0 && selectedOptions.length === testedOptions.length
  })
  return selectedVariant.length > 0 ? selectedVariant[0] : null
}

const getProductUrlFromHandle = (handle) => {
  return `/products/${handle}`
}

const getProductVendorUrlFromVendor = (vendor) => {
  return `/brands/${vendor
    .toLowerCase()
    .toLowerCase()
    .replace(' ', '-')
    .replace(/[^a-z0-9-]+/, '')}`
}

const getBadges = (metafields) => {
  if (!metafields) return

  let badges = []
  const promoLabel = getMetafieldValue(metafields, 'product', 'promo_label')
  const labelsArr = promoLabel.split(',').map((item) => item.trim())

  if (labelsArr) {
    labelsArr.forEach((el) => {
      const label = el.split('-').map((item) => item.trim())
      if (label[0] === '') return
      badges.push(label)
    })
  }
  return badges
}

const pushHistoryUrl = (path) => {
  const { origin, pathname, search } = window.location
  const [productUrl, _] = pathname.split(/\/wizzard(\/)*/)
  const a = productUrl.length - 1
  const cleanProductPath = productUrl[a] === '/' ? productUrl.substr(0, a) : productUrl
  const url = `${origin}${cleanProductPath}`

  // window.history.pushState('', '', `${url}/wizzard/${path}${search}`)
}

module.exports.getSplittedDescription = getSplittedDescription
module.exports.getMetafieldValue = getMetafieldValue
module.exports.getProductUrlFromHandle = getProductUrlFromHandle
module.exports.getPrices = getPrices
module.exports.getVariantPrices = getVariantPrices
module.exports.getSubtotalBeforeDiscounts = getSubtotalBeforeDiscounts
module.exports.getSubtotalDiscount = getSubtotalDiscount
module.exports.getVariantOptions = getVariantOptions
module.exports.getUpholsteriesGroup = getUpholsteriesGroup
module.exports.getProductOptions = getProductOptions
module.exports.updateSelectedOptions = updateSelectedOptions
module.exports.getVariantForOptions = getVariantForOptions
module.exports.getProductVendorUrlFromVendor = getProductVendorUrlFromVendor
module.exports.getBadges = getBadges
module.exports.pushHistoryUrl = pushHistoryUrl
