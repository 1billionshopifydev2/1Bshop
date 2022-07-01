import React from 'react'
import Helmet from 'react-helmet'
import { generateProductURL } from '../../../../utils/routing'

export const JSONLD_PRODUCT = 'product'
export const JSONLD_SHOP = 'shop'

export const JSONLD = ({ type, data }) => {
    switch (type) {
        case JSONLD_PRODUCT:
            return (
                <Helmet>
                    <script type="application/ld+json">{`
                    {
                        "@context": "https://schema.org/",
                        "@type": "Product",
                        "name": "${data.title}",
                        "image": [${data.images.map((image) => `"${image.url}"`).slice(0, 5)}],
                        "description": "${data.description}",
                        "sku": "${data.variant.sku}",
                        "brand": {
                            "@type": "Brand",
                            "name": "${data.brand}"
                        },
                        "offers": {
                            "@type": "Offer",
                            "url": "${generateProductURL(data.slug)}",
                            "priceCurrency": "${data.currency}",
                            "price": "${data.prices.min}",
                            "availability": "${data.availability}"
                        }
                    }
                    `}</script>
                </Helmet>
            )
        default:
            return (<></>)
    }
}