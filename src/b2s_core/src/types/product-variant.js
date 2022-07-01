import { number, string } from 'prop-types';

const ProductVariantType = {
    id: string,
    sku: string,
    title: string,
    price: number,
}

const ProductVariantTypeDefaultValues = {
    id: '',
    sku: '',
    title: '',
    price: '',
}

export {
    ProductVariantType,
    ProductVariantTypeDefaultValues,
}