/* eslint-disable */

import { useState, useEffect, useCallback } from 'react'
import { navigate } from 'gatsby'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'

import {
  resizedImgURL,
  slugify,
  getSearchQueryParsed,
} from '../../utils/helpers'
import {
  getProductOptions,
  getVariantForOptions,
  getProductUrlFromHandle,
  getPrices,
} from '../../utils/helpers_product'
import { trackAddToCart, trackProductView } from '../../utils/tracking'

const useProductDetailsCore = ({
  location,
  product,
  data,
  addLineItem,
}) => {
  const dispatch = useDispatch()
  const { model} = useSelector(store => store.checkout)
  const user = useSelector(store => store.session.customer);
  const { loaded } = useSelector(store => store.session);
  const url = typeof window !== 'undefined' ? window.location.href : ''

  const [variant, setVariant] = useState(product.variants.length === 1 ? product.variants[0] : {})
  const [selectedOptions, setSelectedOptions] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [locationState, setLocationState] = useState(location.state)
  const { id: variantId, sku, availableForSale, inventoryQuantity } = variant
  const [price, setPrice] = useState(variant.price)
  const [oldPrice, setOldPrice] = useState(getPrices(product).minCompareAtPrice)

  const {
    id: productId,
    title,
    description,
    variants,
    images,
    handle,
    tags,
    childRating,
    priceRangeV2,
    seo = {},
    availability,
    totalInventory,
    templateSuffix,
  } = product

  const vendor = product?.vendors?.shopify_slug ?? ''

  seo.title = seo.title || title
  seo.description =
    seo.description ||
    (description && `${description.substr(0, 160).trim()}...`) ||
    ''

  const productUrl = getProductUrlFromHandle(handle)
  const searchParams = getSearchQueryParsed(location.search)
  const options = getProductOptions(product, selectedOptions)
  const prices = getPrices(product)

  useEffect(() => {
    const hasQueryParams = !isEmpty(searchParams)
    const { group, prevUrl } = location.state || {}

    if (hasQueryParams) {
      initSelectOptionFromQueryParams()
    }

    if (hasQueryParams && !group) {
      initSelectOptionFromQueryParams()
    } else if (location.state?.openVariantModal) {
      const upholsteryColumn = upholsteryGroups.upholsteryColumn
      const preSelectedVariant = variants.find((variant) =>
        variant.selectedOptions.some(
          ({ name, value }) =>
            name === upholsteryColumn && slugify(value) === group
        )
      )

      if (preSelectedVariant) {
        setSelectedOptions(
          preSelectedVariant.selectedOptions.map(({ name, value }) => ({
            name,
            value,
          }))
        )
      }
    }

    window.history.replaceState('', '', prevUrl)
  }, [])

  useEffect(() => {
    variant.price && setPrice(variant.price)
    variant.compareAtPrice && setOldPrice(variant.compareAtPrice)
  }, [variant])

  const updateSelectedOptions = (option) => {
    let newSelectedOptions = []

    if (
      selectedOptions.length === 0 ||
      !selectedOptions.some((item) => item.name === option.name)
    ) {
      newSelectedOptions = [...selectedOptions, { ...option }]
    } else {
      newSelectedOptions = selectedOptions.map((item) => {
        return item.name === option.name
          ? { ...item, value: option.value }
          : item
      })
    }

    setSelectedOptions(newSelectedOptions)
    return newSelectedOptions
  }

  const addItemToCart = (id, quantity, vendor = '', custom = false) =>
    addLineItem(id, quantity, vendor, () => navigate('/cart'), custom)

  const triggerAddToCartOrOpenModal = useCallback(
    event => { // eslint-disable-line
      trackAddToCart(user, product, variant.title, variant.price, quantity, model)
      dispatch(addItemToCart(variantId, quantity, vendor, custom))
    },
    [variantId, quantity]
  )

  useEffect(() => {
    if (loaded) {
      const item = {
        ...product,
        variant: variant.title,
        id: Number(product.id.replace(/[^0-9]+/, '')),
        currency: getPrices(product)?.min?.currencyCode,
        value: getPrices(product)?.min?.amount
      }
      trackProductView({...item, user, url})
    }
  }, [loaded])

  const initSelectOptionFromQueryParams = () => {
    const paramOptions = [
      searchParams.option1,
      searchParams.option2,
      searchParams.option3,
    ]
    const options = paramOptions.filter((option) => (!!option && typeof option !== 'undefined' ))

    const preSelectedVariant = variants.find((variant) => {
      if (!variant.selectedOptions.length) return

      const variantOptions = variant.selectedOptions.map(option => option.value.toLowerCase()).sort()
      const selectedOptionFromURL = options.map(option => option?.toLowerCase()).sort()

      // Comparing if arrays content is the same for currently iterated variant and URL options set
      return variantOptions.toString() === selectedOptionFromURL.toString()
    })

    const preSelectedOptions = preSelectedVariant
      ? preSelectedVariant.selectedOptions.map(({ name, value }) => ({
        name, // eslint-disable-line
        value, // eslint-disable-line
      })) // eslint-disable-line
      : {}

    if (preSelectedVariant) {
      setVariant(preSelectedVariant)
      setSelectedOptions(preSelectedOptions)
    }
  }

  const handleVariantChange = (newOption) => {
    const optionTypes = product.variants[0].selectedOptions.map((option) => option)
    const newOptionIndex = optionTypes.findIndex((option) => option.name === newOption.name)
    const newOptions = updateSelectedOptions(newOption)
    

    let iterator = newOptionIndex
    let firstFollowingDisabledOptionIndex

    do {
      if (options[iterator+1]?.disabled.length) {
        firstFollowingDisabledOptionIndex = iterator + 1
        iterator = options.length
      }
      iterator++
    }
    while (iterator < options.length-1 && !options[iterator].disabled.length)

    if (firstFollowingDisabledOptionIndex) newOptions.splice(firstFollowingDisabledOptionIndex)

    const newVariant = getVariantForOptions(product, newOptions)
    addNewSearchParamsToUrl(newOptions)

    if (newVariant) {
      setVariant(newVariant)
    }
  }

  const addNewSearchParamsToUrl = (selectedOptions) => {
    const searchParams = selectedOptions.reduce((acc, option, i) => {
      const optionIndex = i + 1
      acc += `${i === 0 ? '' : '&'}option${optionIndex}=${option.value}`
      return acc
    }, '')

    window.history.replaceState(
      'new option',
      'Title',
      `${window.location.pathname}?${searchParams}`
    )
  }

  return {
    title: title,
    description: description,
    dispatch: dispatch,
    variantId,
    productId,
    vendor,
    vendorTitle: product?.vendors?.title || '',
    images: images,
    variant: variant,
    rating: childRating,
    handle: handle,
    availableForSale: availableForSale,
    sku: sku,
    options,
    handleVariantChange,
    productUrl: productUrl,
    resizedImgURL: resizedImgURL,
    quantity: quantity,
    setQuantity: setQuantity,
    price,
    priceRangeV2: {
      ...priceRangeV2,
      minCompareAtPrice: prices.minCompareAtPrice,
      maxCompareAtPrice: prices.maxCompareAtPrice,
    },
    priceRangeV2: {
      ...priceRangeV2,
      minCompareAtPrice: prices.minCompareAtPrice,
      maxCompareAtPrice: prices.maxCompareAtPrice,
    },
    addItemToCart,
    tags: tags,
    locationState,
    triggerAddToCartOrOpenModal,
    seo,
    availability: variant?.availability?.value || availability?.value,
    totalInventory,
    inventoryQuantity,
    old: oldPrice,
    variant,
  }
}

export default useProductDetailsCore
