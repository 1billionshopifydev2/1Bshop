/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import { productDetailsCore } from '../../../components/ProductDetailsPage/ProductDetailsCore'
import { buildRequest } from '../../../../plugins/gatsby-b2s-shopify/utils'
import axios from 'axios'
import productByHandleQuery from '../../../../plugins/gatsby-b2s-shopify/queries/product-by-handle'
import { transformProduct } from '@b2s_core/src/data/transformers/shopify'

const ProductDetailsTmpl = require(`@themes/${process.env.B2S_THEME_NAME}/ProductDetailsPage/ProductDetailsPageTmpl`).default

const ProductDetailsPageSSR = ({ location, serverData }) => {
  console.log(serverData.product)
  
  const Component = productDetailsCore(
    location,
    serverData.product
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

    const product = transformProduct(response.data.data.productByHandle)

    return {
      props: {
        product,  
      }
    }
  } catch (error) {
    console.log(error)
    return {
      status: 404,
      headers: {},
      props: {}
    }
  }
}