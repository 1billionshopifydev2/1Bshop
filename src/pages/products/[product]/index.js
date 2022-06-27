/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import { productDetailsCore } from '../../../components/ProductDetails/ProductDetailsCore'
import { buildRequest } from '../../../../plugins/gatsby-b2s-shopify/utils'
import axios from 'axios'
import productByHandleQuery from '../../../../plugins/gatsby-b2s-shopify/queries/product-by-handle'
import { productFormatter } from '../../../utils/product-formatter'

const ProductDetailsTmpl = require(`@themes/${process.env.B2S_THEME_NAME}/ProductDetailsTmpl`).default

const ProductDetailsPageSSR = ({ location, serverData }) => {
  const Component = productDetailsCore(
    location,
    serverData.product,
    {
      brand: serverData.brand,
      designer: serverData.designer,
    },
    serverData.upholsteries
  )(ProductDetailsTmpl)

  return <Component />
}

ProductDetailsPageSSR.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
  pageContext: PropTypes.object,
}

ProductDetailsPageSSR.defaultProps = {
  data: {},
  location: {},
}

export default ProductDetailsPageSSR

export async function getServerData(context) {
  try {    
    const response = await axios(buildRequest({
      query: productByHandleQuery,
      variables: {
        handle: context.params.product
      }
    }))

    const product = productFormatter(response.data.data.productByHandle)

    return {
      props: {
        product,  
      }
    }
  } catch (error) {
    return {
      status: 404,
      headers: {},
      props: {}
    }
  }
}