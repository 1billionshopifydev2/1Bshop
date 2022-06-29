import { ProductTypeDefaultValues } from "../../types/product"

const transformProduct = (shopifyProduct) => {
    const product = ProductTypeDefaultValues

    console.log(shopifyProduct)

    product.title = shopifyProduct.title
    product.description = shopifyProduct.description
    product.vendor = shopifyProduct.vendor
    product.images = reduceEdgeNode(shopifyProduct.images).map(image => ({
        url: image.url,
    }))
    product.variants = reduceEdgeNode(shopifyProduct.variants).map(variant => ({
        sku: variant.sku,
    }))
    product.variant = product.variants[0]
    product.slug = shopifyProduct.handle
    product.price = shopifyProduct.priceRangeV2.minVariantPrice.amount
    product.prices = {
        min: shopifyProduct.priceRangeV2.minVariantPrice.amount,
        max: shopifyProduct.priceRangeV2.maxVariantPrice.amount,
        old_min: Math.min(...reduceEdgeNode(shopifyProduct.variants).map(variant => variant.compareAtPrice)),
        old_max: Math.max(...reduceEdgeNode(shopifyProduct.variants).map(variant => variant.compareAtPrice)),
    }
    product.currency = shopifyProduct.priceRangeV2.minVariantPrice.currencyCode
    product.availability = shopifyProduct.availableForSale
    product.seo = {
        title: shopifyProduct.seo.title || shopifyProduct.title,
        description: shopifyProduct.seo.description || shopifyProduct.description,
        keywords: ''
    }

    return product
}

const reduceEdgeNode = (item) => {    
    if (item.edges) {
        return item.edges.map(edge => edge.node)
    }

    return item
}

export {
    transformProduct,
}