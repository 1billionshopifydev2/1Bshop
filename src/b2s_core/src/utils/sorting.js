export const BEST_SELLING = 'best-selling-sort'
export const PRICE_ASC = 'price-asc-sort'
export const PRICE_DESC = 'price-desc-sort'
export const NAME_ASC = 'name-asc-sort'
export const NAME_DESC = 'name-desc-sort'
export const NEWEST = 'newest-sort'
export const OLDEST = 'oldest-sort'
const TITLE_ASC = 'title-asc-sort'
const TITLE_DESC = 'title-desc-sort'

export const PRODUCT_SORT_OPTIONS = {
  [BEST_SELLING]: {
    id: BEST_SELLING,
    label: 'Best Selling',
  },
  [PRICE_ASC]: {
    id: PRICE_ASC,
    label: 'Price (low to high)',
  },
  [PRICE_DESC]: {
    id: PRICE_DESC,
    label: 'Price (high to low)',
  },
  [NAME_ASC]: {
    id: NAME_ASC,
    label: 'Name A - Z',
  },
  [NAME_DESC]: {
    id: NAME_DESC,
    label: 'Name Z - A',
  },
  [NEWEST]: {
    id: NEWEST,
    label: 'Newest Arrival',
  },
  [OLDEST]: {
    id: OLDEST,
    label: 'Oldest Arrival',
  },
}

export const ARTICLE_SORT_OPTIONS = {
  [TITLE_ASC]: {
    id: TITLE_ASC,
    label: 'Title A - Z',
    sortKey: 'TITLE',
    reverse: false,
  },
  [TITLE_DESC]: {
    id: TITLE_DESC,
    label: 'Title Z - A',
    sortKey: 'TITLE',
    reverse: true,
  },
  [NEWEST]: {
    id: NEWEST,
    label: 'Newest',
    sortKey: 'PUBLISHED_AT',
    reverse: false,
  },
}
