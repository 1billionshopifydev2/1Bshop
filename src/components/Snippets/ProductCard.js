import React from 'react'

const ProductCardTmpl = require(`@themes/${process.env.B2S_THEME_NAME}/Snippets/ProductCardTmpl`)
  .default

const ProductCard = ({product,parent}) => <ProductCardTmpl product={product} parent={parent} />

export default ProductCard