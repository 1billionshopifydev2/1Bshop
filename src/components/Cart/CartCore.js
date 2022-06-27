import React from 'react'
import Link from '@b2s_core/src/utils/Link'
import { Layout } from '../../layouts'
import SEO from '@b2s_core/src/components/seo'
import Loader from '../../components/Loader'
import { cartTableCore } from './CartTableCore'
import useCartCore from '@b2s_core/src/components/Cart/useCartCore'

const cartCore = () => HocComponent => () => {
  const ownProps = useCartCore()
  return <HocComponent {...ownProps} />
}

export { cartCore, Layout, SEO, Link, Loader, cartTableCore }
