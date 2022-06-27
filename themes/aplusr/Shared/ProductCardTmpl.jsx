/* eslint-disable */

import React from 'react'
import Link from '@b2s_core/src/utils/Link'
import * as Components from 'src/components/ProductDetails/ProductDetailsCore'

import {
  resizedImgURL,
  priceFormatter,
} from '../../../src/b2s_core/src/utils/helpers'
import { getPrices } from '../../../src/b2s_core/src/utils/helpers_product'

const ProductCardTmpl = ({ product, lg = 4, col = 6 }) => {
  let image = product.product_image

  if (!product.objectID) {
    image = product?.images?.[0]?.originalSrc
  }

  if (product.featuredImage?.src) {
    image = product.featuredImage.src
  }

  return (
    <div className={`col-${col} col-lg-${lg}`}>
      <div className="pb-0 pb-lg-5 product">
        <Link
          className="bg-light d-block mb-3"
          to={`/products/${product.handle}`}
        >
          <div className="embed-responsive embed-responsive-1by1">
            <div className="embed-responsive-item">
              <img
                className="w-100 my-0"
                loading="lazy"
                src={
                  image
                    ? resizedImgURL(image, 'large')
                    : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='
                }
                alt={image ? image?.altText : product.title}
              />
            </div>
          </div>
        </Link>
        <p className="m-0">{product.vendor.split(' • ')[0]}</p>
        <p className="m-0">
          <strong>{product.title}</strong>
        </p>
        <div className="pb-3 mb-3 text-secondary">
          {getPrices(product).min.amount < getPrices(product).minCompareAtPrice && (
            <>Starting at </>
          )}
          {
            product.variants?.length
              ?
                <Components.Prices
                  price={getPrices(product).min.amount}
                  old={getPrices(product).minCompareAtPrice}
                  priceRangeV2={product.priceRangeV2}
                  currency={'USD'}
                  quantity={1}
                  showAffirm={false}
                />
              :
                priceFormatter(getPrices(product).minCompareAtPrice)
          }

        </div>
      </div>
    </div>
  )
}

export default ProductCardTmpl
