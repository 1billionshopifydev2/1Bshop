import React from 'react'
import { getProductPath } from '@b2storefront/b2s_core/dist/utils/routing'
import { Link } from 'gatsby'

const ProductCardTmpl = ({product, parent}) => (
<div className="product__item" key={product.id}>
    <div className="product__item--image">
      <Link href={getProductPath(product.slug)}>
        {parent === "HomePage" && (
            <img
            src={product.featured_image.url}
            data-src={product.featured_image.url}
            className="lazy"
            alt={product.title}
            width={272}
            height={385}
          />
        )}
        {parent === "UpsellContainer" && (
            <img
            src={product.featured_image.url}
            data-src={product.featured_image.url}
            className="lazy"
            alt={product.title}
            width={80}
          />
        )}
        
      </Link>
      {!!product.prices.old_min && (
        <span className="badge badge-sale">Sale</span>
      )}
    </div>
    <div className="product__item--name">
    <Link href={getProductPath(product.slug)}>{product.title}</Link>
    </div>
    <div className="product__item--price">
      <span className="new-price">${product.prices.min}</span>
      {!!product.prices.old_min && (
        <span className="old-price">${product.prices.old_min}</span>
      )}
    </div>
  </div>
)

export default ProductCardTmpl
