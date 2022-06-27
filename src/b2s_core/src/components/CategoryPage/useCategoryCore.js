import { useState, useEffect } from 'react'
import { PRICE_ASC, PRICE_DESC, NAME_ASC, NAME_DESC, NEWEST, OLDEST, BEST_SELLING } from '../../utils/sorting'
import { slugify } from '../../utils/helpers'

const useCategoryCore = (location, pageContext, data) => {
  const collection = pageContext
  const { siteMenu } = data
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  siteMenu.siteMenu.menuItems[3].megaMenus[3].menu_link = siteMenu.siteMenu.menuItems[3].megaMenus[0].menu_link
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(48)
  const [products, setFilteredProducts] = useState(collection.products)
  const [filter, setFilter] = useState([])

  const { search } = location

  const rangePrice = [
    { low: 0, to: 300 },
    { low: 300, to: 600 },
    { low: 600, to: 1000 },
    { low: 1000, to: 1500 },
    { low: 1500, to: 2000 },
    { low: 2000, to: 9999999 },
  ]
  const { seo = {}, title, description } = collection

  seo.title = seo?.title || title || 'A+R Collection'
  seo.description = seo?.description || (description && `${description.substr(0, 160).trim()}...`) || 'A+R Collection'
  const [sortOption, setSortOption] = useState(BEST_SELLING)

  const handleSort = (sortType, isFirstRender = false) => {
    setSortOption(sortType)

    let newProducts = [...products]

    switch (sortType) {
      case PRICE_ASC:
        newProducts = newProducts.sort((p1, p2) => p1.priceRangeV2.minVariantPrice.amount - p2.priceRangeV2.minVariantPrice.amount)
        break

      case PRICE_DESC:
        newProducts = newProducts.sort((p1, p2) => p2.priceRangeV2.minVariantPrice.amount - p1.priceRangeV2.minVariantPrice.amount)
        break
      case NAME_ASC:
        newProducts = newProducts.sort((p1, p2) => p1.title.localeCompare(p2.title))
        break

      case NAME_DESC:
        newProducts = newProducts.sort((p1, p2) => p1.title.localeCompare(p2.title)).reverse()
        break
      case NEWEST:
        newProducts = newProducts.sort((p1, p2) => new Date(p2.updatedAt) - new Date(p1.updatedAt))
        break
      case OLDEST:
        newProducts = newProducts.sort((p1, p2) => new Date(p1.updatedAt) - new Date(p2.updatedAt))
        break
      case BEST_SELLING:
        newProducts = collection.products
        break
    }

    setFilteredProducts(newProducts)

    if (!isFirstRender) {
      handlePageUpdate(1)
    }
    handleSortByUpdate(sortType)
  }

  const handleFilterChange = (filter, isFirstRender = false) => {
    const produductsFiltered = collection.products.filter(({ tags, priceRangeV2: { minVariantPrice, maxVariantPrice }, vendor }) => {
      const matchAll = filter.filter(({ type, value }) => {
        let matchType = true

        if (type === 'refine') {
          matchType = tags.some((tag) => slugify(tag) === slugify(value))
        }
        if (type === 'price') {
          const [low, to] = value.split('-')

          matchType = Number(maxVariantPrice.amount) >= Number(low) && Number(minVariantPrice.amount) <= Number(to)
        }
        if (type === 'brand') {
          matchType = slugify(vendor).includes(value)
        }
        if (type === 'page') {
          matchType = true
        }
        return matchType
      })
      return matchAll.length === filter.length
    })

    setFilteredProducts(produductsFiltered)

    if (!filter.length) {
      setFilteredProducts(collection.products)
    }

    if (!isFirstRender) {
      setPage(1)
    }

    const params = filter.reduce((path, { type, value }, i) => {
      if (!isFirstRender && type === 'page') {
        value = 1
      }

      if (i === 0) {
        return `?${type}=${slugify(value)}`
      }
      return `${path}&${type}=${slugify(value)}`
    }, '')

    const url = `${location.origin}${location.pathname}${params}`
    window.history.pushState('', '', url)

    setFilter(filter)
  }

  const handlePageUpdate = (newPage) => {
    params.set('page', newPage)
    setPage(newPage)
    const newRelativePathQuery = params.toString() ? window.location.pathname + '?' + params.toString() : window.location.pathname
    history.pushState(null, '', newRelativePathQuery)
  }

  const handleSortByUpdate = (newSortBy) => {
    params.set('sort_by', newSortBy)
    const newRelativePathQuery = params.toString() ? window.location.pathname + '?' + params.toString() : window.location.pathname
    history.pushState(null, '', newRelativePathQuery)
  }

  const { perPage } = location.state || {}

  const searchFilters = search?.replace('?', '').split('&')
  const searchFilterArr = searchFilters?.reduce((acc, curr) => {
    const [type, value] = curr.split('=')
    acc.push({ type, value })
    return acc
  }, [])
  const sortValue = searchFilterArr?.find((filter) => filter.type === 'sort_by')?.value

  useEffect(() => {
    if (perPage) {
      location.state.perPage = false
      setPageSize(2000)
    } else {
      setPageSize(48)
    }
    if (!search) return

    handleFilterChange(searchFilterArr, true)
    if (sortValue) handleSort(sortValue, true)
  }, [])

  const optionsProps = {
    page,
    setPage,
    pageSize,
    setPageSize,
    seo,
    handleSort,
    sortOption,
    searchFilterArr,
    sortValue,
  }

  let filtersProps = {
    brands,
    rangePrice,
    refineSelection,
    setFilter,
    handleFilterChange,
    products,
    filter,
    categoriesLink,
  }

  return { optionsProps, filtersProps }
}

export default useCategoryCore
