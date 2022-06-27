import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchProductsByIds } from '../../../utils/api'

const useCompareIcon = () => {
  const [qty, setQty] = useState(0)
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { comparelist, isLoggedIn, loaded } = useSelector(
    store => store.session
  )

  useEffect(() => {
    if (loaded) {
      if (!comparelist) {
        return
      }
      setQty(comparelist.length)

      let skip = false

      const fetchProducts = async () => {
        setIsLoading(true)
        const products = await fetchProductsByIds(comparelist)
        if (!skip) {
          setProducts(products)
          setIsLoading(false)
        }
      }

      fetchProducts()

      return () => (skip = true)
    }
  }, [comparelist, isLoggedIn, loaded])

  return {
    qty,
    comparelist,
    products,
  }

}

export default useCompareIcon;
