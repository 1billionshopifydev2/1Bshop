const fragmentProduct = `
    id
    storefrontId
    createdAt
    description
    descriptionHtml
    featuredImage {
        id
        altText
        height
        width
        originalSrc
        transformedSrc
    }
    avaialbility: metafield(namespace: "availability", key: "text") {
        key
        value
    }
    featuredMedia {
        alt
        mediaContentType
        mediaErrors {
            details
        }
        preview {
            image {
                id
                altText
                height
                width
                originalSrc
                transformedSrc
            }
            status
        }
        status
    }
    handle
    options {
        id
        name
        position
        values
    }
    priceRangeV2 {
        maxVariantPrice {
            amount
            currencyCode
        }
        minVariantPrice {
            amount
            currencyCode
        }
    }
    productType
    publishedAt
    seo {
        description
        title
    }
    status
    tags
    templateSuffix
    title
    totalInventory
    totalVariants
    tracksInventory
    updatedAt
    vendor
    images(sortKey: POSITION, first: 100) {
        edges {
            node {
                id
                altText
                src
                originalSrc
                width
                height
            }
        }
    }
    variants(first: 100) {
        edges {
            node {
                availableForSale
                compareAtPrice
                id
                image {
                    altText
                    originalSrc
                    id
                }
                price
                selectedOptions {
                    name
                    value
                }
                sku
                title
                avaialbility: metafield(namespace: "availability", key: "text") {
                    key
                    value
                }
                inventoryQuantity
            }
        }
    }
`

module.exports = fragmentProduct