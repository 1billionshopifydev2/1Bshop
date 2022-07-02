export const getCheckoutCurrency = store =>
  store.checkout.model
    ? store.checkout.model.currencyCode
    : process.env.GATSBY_DEFAULT_CURRENCY
