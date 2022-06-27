import React from 'react'
import PropTypes from 'prop-types'
import { SEO, Layout, Link } from 'src/utils/shared'
import RenderIfPathExists from '../../components/Shared/RenderIfPathExists'
import Options from '../../components/Product/Shared/Options'
import { Gallery } from '../../components/Product/Shared/Gallery'
import Quantity from '../../components/Product/Shared/Quantity'
import Prices from '../../components/Product/Shared/Prices'
import { addLineItem } from '@b2s_core/src/reducers/checkout'
import useProductDetailsCore from '@b2s_core/src/components/ProductDetails/useProductDetailsCore'

const productDetailsCore = (location, product, data) => (HocComponent) => () => {
  const ownProps = useProductDetailsCore({
    location,
    product,
    data,
    addLineItem,
  })

  return <HocComponent {...ownProps} /> // eslint-disable-line
}

const componentPropTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  dispatch: PropTypes.func,
  variantId: PropTypes.string,
  productId: PropTypes.string,
  vendor: PropTypes.string,
  vendorUrl: PropTypes.string,
  images: PropTypes.array,
  variant: PropTypes.object,
  badges: PropTypes.array,
  rating: PropTypes.object,
  handle: PropTypes.string,
  descriptionParts: PropTypes.array,
  availableForSale: PropTypes.bool,
  productButton: PropTypes.string,
  sku: PropTypes.string,
  options: PropTypes.array,
  handleVariantChange: PropTypes.func,
  productUrl: PropTypes.string,
  resizedImgURL: PropTypes.func,
  quantity: PropTypes.number,
  setQuantity: PropTypes.func,
  prices: PropTypes.object,
  addItemToCart: PropTypes.func,
  tags: PropTypes.array,
  upholsteries: PropTypes.object,
}

const componentDefaultProps = {
  title: '',
  description: '',
  dispatch: () => {},
  variantId: '',
  productId: '',
  vendor: '',
  vendorUrl: '',
  images: [],
  variant: {},
  badges: [],
  rating: {},
  handle: '',
  descriptionParts: {},
  availableForSale: false,
  sku: '',
  options: [],
  handleVariantChange: () => {},
  productUrl: '',
  resizedImgURL: () => {},
  quantity: 1,
  setQuantity: () => {},
  prices: {},
  addItemToCart: () => {},
  tags: [],
  upholsteries: {}
}

export { Layout, SEO, RenderIfPathExists, Options, Gallery, Quantity, Prices, Link, componentPropTypes, componentDefaultProps, productDetailsCore }
