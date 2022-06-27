export const getCheckoutCurrency = store =>
  store.checkout.model
    ? store.checkout.model.currencyCode
    : process.env.DEFAULT_CURRENCY
