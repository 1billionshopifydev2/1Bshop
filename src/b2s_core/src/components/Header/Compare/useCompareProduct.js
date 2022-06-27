import { useDispatch } from 'react-redux'
import { resizedImgURL } from '../../../utils/helpers'
import { getProductUrlFromHandle } from '../../../utils/helpers_product'

const useCompareProduct = ({ item, removeProductFromComparelist }) => {
  const dispatch = useDispatch()
  const { id, title, handle, images } = item
  const image = images ? resizedImgURL(images[0].originalSrc, 'small') : ''
  const productURL = getProductUrlFromHandle(handle)

  return {
    id,
    title,
    productURL,
    image,
    dispatch,
  }
}

export default useCompareProduct;
