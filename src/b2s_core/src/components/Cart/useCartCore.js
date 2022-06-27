import { useSelector } from 'react-redux'
import { getSubtotalBeforeDiscounts } from '../../utils/helpers_product'
import { getCheckoutCurrency } from '../../utils/selectors'
import { priceFormatter } from '../../utils/helpers'

const useCartCore = () => {
  const { model, loading } = useSelector(store => store.checkout)
  const currency = useSelector(getCheckoutCurrency)

  return {
    model,
    getSubtotalBeforeDiscounts,
    currency,
    loading,
    priceFormatter,
  }
}

export default useCartCore
