import { string } from 'prop-types';

const SEOType = {
    title: string,
    description: string,
    keywords: string,
}

const SEOTypeDefaultValues = {
    title: '',
    description: '',
    keywords: '',
  }

export {
    SEOType,
    SEOTypeDefaultValues,
}