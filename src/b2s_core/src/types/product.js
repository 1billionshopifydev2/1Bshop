import { shape, string, number, bool, arrayOf } from 'prop-types';
import { ProductVariantType, ProductVariantTypeDefaultValues } from './product-variant';
import { SEOType, SEOTypeDefaultValues } from './seo';

const ProductType = {
    title: string,
    description: string,
    vendor: string,
    variant: shape(ProductVariantType).isRequired,
    variants: arrayOf(shape(ProductVariantType)).isRequired,
    images: arrayOf(shape({
        url: string
    })).isRequired,
    slug: string,
    price: number,
    old_price: number,
    prices: shape({
        min: number,
        max: number,
        old_min: number,
        old_max: number,
    }).isRequired,
    currency: string,
    availability: bool,
    seo: shape(SEOType),
}

const ProductTypeDefaultValues = {
    title: '',
    description: '',
    vendor: '',
    images: [],
    variant: ProductVariantTypeDefaultValues,
    variants: [
        ProductVariantTypeDefaultValues,
    ],
    slug: '',
    price: 0,
    old_price: null,
    prices: {
        min: 0,
        max: 0,
        old_min: null,
        old_max: null,
    },
    currency: 'USD',
    availability: false,
    seo: SEOTypeDefaultValues,
  }

export {
    ProductType,
    ProductTypeDefaultValues,
}