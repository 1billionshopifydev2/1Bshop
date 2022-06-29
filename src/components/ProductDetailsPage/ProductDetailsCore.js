import React from 'react'
import { SEO, Layout } from 'src/utils/shared'
import useProductDetailsCore from '@b2s_core/src/components/ProductDetails/useProductDetailsCore'
import { ProductType, ProductTypeDefaultValues } from '../../b2s_core/src/types/product'

const productDetailsCore = (location, product) => (HocComponent) => () => {
  const ownProps = useProductDetailsCore({
    location,
    product,
  })

  return <HocComponent {...ownProps} /> // eslint-disable-line
}

const componentPropTypes = {
  product: ProductType,
}

const componentDefaultProps = {
  product: ProductTypeDefaultValues,
}

export { Layout, SEO, componentPropTypes, componentDefaultProps, productDetailsCore }
