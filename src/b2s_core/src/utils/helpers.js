const { useEffect, useState } = require('react')
const urlParse = require('url-parse')
const phone = require('phone')

function slugify(text) {
  if (!text) return ''
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

function currencyName(currencyCode = 'USD') {
  switch (currencyCode) {
    case 'USD':
      return '$ US Dollar'
    case 'CAD':
      return '$ CA Dollar'
    case 'AUD':
      return '$ AU Dollar'
    case 'NZD':
      return '$ NZ Dollar'
    case 'HKD':
      return '$ HK Dollar'
    case 'SGD':
      return '$ SG Dollar'
    case 'EUR':
      return '€ Euro'
    case 'GBP':
      return '£ Pound Sterling'
    case 'JPY':
      return '¥ Yen'
    case 'DKK':
      return 'Danish krone'
    case 'SEK':
      return 'Swedish krona'
    case 'RUB':
      return '₽ Russian Ruble'
    case 'UAH':
      return '₴ Ukrainian hryvnia'
    default:
      return currencyCode
  }
}

/* 5.5 -> 5.50 */
function priceFormatter(amount, currencyCode = 'USD') {
  const formatedAmount = Number(amount)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    .replace('.00', '')

  switch (currencyCode) {
    case 'USD':
    case 'CAD':
    case 'AUD':
    case 'NZD':
    case 'HKD':
    case 'SGD':
      return `$${formatedAmount}`
    case 'EUR':
      return `€${formatedAmount}`
    case 'GBP':
      return `£${formatedAmount}`
    case 'JPY':
      return `¥${formatedAmount}`
    case 'DKK':
      return `${formatedAmount} kr.`
    case 'SEK':
      return `${formatedAmount} kr.`
    case 'RUB':
      return `${formatedAmount}₽`
    case 'UAH':
      return `${formatedAmount}₴`
    default:
      return `${formatedAmount}`
  }
}

function getBlogHandleFromUrl(url) {
  if (typeof url !== 'string') {
    throw Error('Url must be a string to get blog handle')
  }

  const parts = url.split('/')
  const handle = parts[parts.length - 1]
  return handle
}

const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email)
}

function divideIntoSmallerArrays(arr, sizeOfSmallerArray) {
  const newArr = []
  arr.forEach((item) => {
    if (!newArr.length || newArr[newArr.length - 1].length === sizeOfSmallerArray) {
      newArr.push([])
    }
    newArr[newArr.length - 1].push(item)
  })
  return newArr
}

function filterProductsByTags(products, tags) {
  if (!products) {
    console.warn('Empty products passed to filter.')
    return []
  }
  return [...products].filter((p) => p.tags.some((r) => tags.indexOf(r) >= 0))
}

function cutLongText(text, limit = 50) {
  if (typeof text !== 'string') {
    throw Error('Text must be a string')
  }

  if (!text) return null

  return text.slice(0, limit).concat(text.length > limit ? ' ... ' : '')
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

const cartQtyFromModel = (model) => {
  if (!model || !model.lineItems) {
    return 0
  }
  return model.lineItems.reduce((acc, current) => acc + current.quantity, 0)
}

const resizedImgURL = (originalSrc, size = 'small', progressive = true) => {
  if (!originalSrc) {
    return ''
  }
  const progressiveJPG = progressive ? '.progressive' : ''

  return originalSrc.replace(/(\b\.jpg|\.png|\.gif|\.jpeg\b)(?!.*\1)/g, function (match) {
    return '_' + size + progressiveJPG + match
  })
}

let lastId = 0
const generateId = (prefix = 'id') => {
  lastId++
  return `${prefix}${lastId}`
}

/* Converts I don&#x27;t know. to I don't know. without dangerouslySetInnerHTML  */
const safeUnscape = (text) => {
  return text.replace(/&#x27;/g, "'") // eslint-disable-line
}

const checkPhoneNumber = (number) => {
  if (phone(number, '').length === 0) {
    return ''
  } else {
    const phoneNumber = phone(number, '')
    return phoneNumber[0]
  }
}

function promoPercent(price, oldPrice) {
  const discounted = oldPrice && oldPrice > price
  if (!discounted) return false

  const percentage = ((oldPrice - price) / oldPrice) * 100
  return `-${parseInt(percentage)}% off`
}

const getSearchQueryParsedFromUrl = (url) => {
  const urlObject = urlParse(url)

  if (!urlObject.query || !urlObject.query.includes('=')) {
    return false
  }

  const searchQuery = urlObject.query.replace('?', '')
  const queryKeyValues = searchQuery.split('&')

  return queryKeyValues.reduce((acc, curr) => {
    const [key, value] = curr.split('=')
    const keyValue = {
      [key]: decodeURIComponent(value),
    }

    return { ...acc, ...keyValue }
  }, {})
}

const getLengthDigit = (digits) => `${Number(digits).toFixed()}`.length

const getZeros = (amount) => Array.from({ length: amount }, () => '0').join('')

const getLowerAmount = (price, priceDiff) => {
  if (price > priceDiff) {
    const diffToSubstract = getLengthDigit(priceDiff) - 1
    const substract = `${price}`.substr((diffToSubstract || 1) * -1)
    let newRangePrice = price - Number(substract)
    return newRangePrice
  }

  const rangeLength = getLengthDigit(price)
  return Number(`${price}`[0] + getZeros(rangeLength - 1))
}

const getUpperAmount = (price, priceDiff) => {
  const diffToAdd = getLengthDigit(priceDiff) - 1 || 1
  const substract = `${price}`.substr(0, price.toString().length - diffToAdd)
  let newRangePrice = Number(substract) + 1
  return Number(`${newRangePrice}${getZeros(diffToAdd)}`)
}

const getPricesRange = (priceRange, rangeAmount) => {
  let maxVariantPrice = Number(priceRange.maxVariantPrice.amount).toFixed()
  let minVariantPrice = Number(priceRange.minVariantPrice.amount).toFixed()
  const priceDiff = (maxVariantPrice - minVariantPrice) / rangeAmount

  minVariantPrice = getLowerAmount(minVariantPrice, priceDiff)
  maxVariantPrice = getUpperAmount(maxVariantPrice, priceDiff)
  const rangeDiff = getLowerAmount(priceDiff, Number.MAX_SAFE_INTEGER)

  const prices = Array.from({ length: rangeAmount }, (_, i) => {
    const lowPrice = minVariantPrice + rangeDiff * i
    const topPrice = i + 1 === rangeAmount ? maxVariantPrice : lowPrice + rangeDiff

    return { lowPrice, topPrice }
  })

  return prices
}

const getSearchQueryParsed = (searchParam) => {
  if (!searchParam || !searchParam.includes('=')) {
    return {}
  }

  const searchQuery = searchParam.replace('?', '')
  const queryKeyValues = searchQuery.split('&')

  return queryKeyValues.reduce((acc, curr) => {
    const [key, value] = curr.split('=')
    const keyValue = {
      [key]: decodeURIComponent(value),
    }

    return { ...acc, ...keyValue }
  }, {})
}

const saveSearchOnLocalStorage = (phrase) => {
  const recentSearchesKey = 'recentSearches'
  let prevRecentSearches = []
  const recentSearchesLimit = 5
  const recentSearchesString = localStorage.getItem(recentSearchesKey)

  try {
    prevRecentSearches = JSON.parse(recentSearchesString) || []
  } catch (err) {
    console.error(err)
  }

  const recentSearches = [phrase, ...prevRecentSearches]
  const uniqueSearches = recentSearches.reduce((acc, search) => {
    const checkPhrase = (e) => e.toLowerCase().trim().includes(search.toLowerCase().trim())

    if (!acc.some(checkPhrase) && Boolean(search)) {
      acc.push(search)
    }

    return acc
  }, [])
  recentSearches.length > recentSearchesLimit && uniqueSearches.pop()

  localStorage.setItem(recentSearchesKey, JSON.stringify(uniqueSearches))
}

const sortStringsAndNumbers = (a, b) => {
  const romanNumbers = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6 }
  const splitedGroupA = a.split(' ')
  const splitedGroupB = b.split(' ')

  const aLtB = splitedGroupA.every((valueA, i) => {
    const numberA = romanNumbers[valueA] || Number(valueA)
    const numberB = romanNumbers[splitedGroupB[i]] || Number(splitedGroupB[i])
    if (typeof splitedGroupB[i] === 'undefined') return false
    if (numberA && !numberB) return false
    if (valueA === splitedGroupB[i]) return true
    if (numberA && numberB) return numberA < numberB
    return valueA < splitedGroupB[i]
  })
  if (aLtB) return -1

  const aGtB = splitedGroupA.every((valueA, i) => {
    const numberA = romanNumbers[valueA] || Number(valueA)
    const numberB = romanNumbers[splitedGroupB[i]] || Number(splitedGroupB[i])
    if (typeof splitedGroupB[i] === 'undefined') return true
    if (numberA && !numberB) return true
    if (valueA === splitedGroupB[i]) return true
    if (numberA && numberB) return numberA > numberB
    return valueA > splitedGroupB[i]
  })
  if (aGtB) return 1

  const aEqB = splitedGroupA.every((valueA, i) => {
    const numberA = romanNumbers[valueA] || Number(valueA)
    const numberB = romanNumbers[splitedGroupB[i]] || Number(splitedGroupB[i])
    if (numberA && numberB) return numberA == numberB
    return valueA == splitedGroupB[i]
  })
  if (aEqB) return 0

  return splitedGroupA.some((e) => romanNumbers[e]) || a.localeCompare(b)
}

const loadHeadScript = (url) => {
  return new Promise((resolve) => {
    if (document.head.querySelector('script[src="' + url + '"]')) {
      document.head.querySelector('script[src="' + url + '"]').remove()
    }

    const script = document.createElement('script')
    script.src = url
    script.async = true
    document.head.appendChild(script)
    script.onload = () => resolve()
  })
}

const loadHeadScriptContent = (id, content) => {
  if (document.head.querySelector(`#${id}`)) {
    document.head.querySelector(`#${id}`).remove()
  }

  const script = document.createElement('script')
  script.innerHTML = content
  document.head.appendChild(script)
}

const getMinCompareAtPrice = (variants) => {
  if (variants?.length) {
    return Math.min(...variants.map((variant) => Number(variant.compareAtPrice) || Number(variant.price)))
  }
}

const getMaxCompareAtPrice = (variants) => {
  if (variants?.length) {
    return Math.max(...variants.map((variant) => Number(variant.compareAtPrice) || Number(variant.price)))
  }
}

module.exports.slugify = slugify
module.exports.filterProductsByTags = filterProductsByTags
module.exports.priceFormatter = priceFormatter
module.exports.currencyName = currencyName
module.exports.cartQtyFromModel = cartQtyFromModel
module.exports.getBlogHandleFromUrl = getBlogHandleFromUrl
module.exports.divideIntoSmallerArrays = divideIntoSmallerArrays
module.exports.cutLongText = cutLongText
module.exports.useDebounce = useDebounce
module.exports.resizedImgURL = resizedImgURL
module.exports.generateId = generateId
module.exports.safeUnscape = safeUnscape
module.exports.checkPhoneNumber = checkPhoneNumber
module.exports.promoPercent = promoPercent
module.exports.getSearchQueryParsedFromUrl = getSearchQueryParsedFromUrl
module.exports.getPricesRange = getPricesRange
module.exports.getSearchQueryParsed = getSearchQueryParsed
module.exports.saveSearchOnLocalStorage = saveSearchOnLocalStorage
module.exports.sortStringsAndNumbers = sortStringsAndNumbers
module.exports.validateEmail = validateEmail
module.exports.loadHeadScript = loadHeadScript
module.exports.loadHeadScriptContent = loadHeadScriptContent
module.exports.getMinCompareAtPrice = getMinCompareAtPrice
module.exports.getMaxCompareAtPrice = getMaxCompareAtPrice
