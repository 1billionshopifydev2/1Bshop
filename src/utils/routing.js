const generateURL = (path) => {
    return `${process.env.GATSBY_SHOP_URL}${path}`
}

const generateProductURL = (slug) => {
    return generateURL(getProductPath(slug))
}

const getProductPath = (slug) => {
    return `/products/${slug}`
}

export {
    generateURL,
    generateProductURL,
    getProductPath,
}