import { ProductVariantTypeDefaultValues } from "../../types/product-variant"
import { ProductTypeDefaultValues } from "../../types/product"

const transformProduct = (shopifyProduct) => {
    const product = ProductTypeDefaultValues

    const priceRange = shopifyProduct.priceRangeV2 || shopifyProduct.priceRange

    product.id = convertIDToNumber(shopifyProduct.id)
    product.title = shopifyProduct.title
    product.description = shopifyProduct.description
    product.vendor = shopifyProduct.vendor
    product.images = reduceEdgeNode(shopifyProduct.images).map(image => ({
        url: image.url,
    }))
    product.variants = reduceEdgeNode(shopifyProduct.variants).map(variant => transformVariant(variant))
    product.variant = transformVariant(product.variants[0])
    product.slug = shopifyProduct.handle
    product.price = parseFloat(priceRange?.minVariantPrice.amount) || 0
    product.prices = {
        min: parseFloat(priceRange?.minVariantPrice.amount) || 0,
        max: parseFloat(priceRange?.maxVariantPrice.amount) || 0,
        old_min: Math.min(...reduceEdgeNode(shopifyProduct.variants).map(variant => variant.compareAtPrice)),
        old_max: Math.max(...reduceEdgeNode(shopifyProduct.variants).map(variant => variant.compareAtPrice)),
    }
    product.currency = priceRange?.minVariantPrice.currencyCode
    product.availability = shopifyProduct.availableForSale
    product.seo = {
        title: shopifyProduct.seo?.title || shopifyProduct.title,
        description: shopifyProduct.seo?.description || shopifyProduct.description,
        keywords: ''
    }
    product.type = shopifyProduct.productType

    return product
}

const transformVariant = (shopifyVariant) => {
    const variant = ProductVariantTypeDefaultValues

    variant.id = convertIDToNumber(shopifyVariant.id)
    variant.sku = shopifyVariant.sku
    variant.title = shopifyVariant.title
    variant.price = parseFloat(shopifyVariant.price)

    return variant
}

const reduceEdgeNode = (item) => {    
    if (item.edges) {
        return item.edges.map(edge => edge.node)
    }

    return item
}

const convertIDToNumber = (string) => {
    if (!string) {
        return ''
    }
    
    string = string.replace('Shopify__Product__', '').replace('Shopify__ProductVariant__', '')

    if (typeof window !== 'undefined') {
      return window.atob(string).replace(/[^0-9]+/, '')
    }

    return Buffer.from(string, 'base64')
      .toString('utf8')
      .replace(/[^0-9]+/, '')
  }

export {
    transformProduct,
    transformVariant,
}