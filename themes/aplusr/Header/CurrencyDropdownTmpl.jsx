import React from 'react'

const CurrencyDropdownTmpl = (props) => (
  <li className="nav-item dropdown">
    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
      Currency: <span className="topbar__item-value">{props.model.currencyCode}</span>
    </a>
    {props.availableCurrencies.length > 1 && (
      <ul className="dropdown-menu dropdown-menu-right">
        {props.availableCurrencies.map(currency => (
          <li key={currency.currencyCode}>
            <a
              className={`dropdown-item ${
                currency.currencyCode === props.model.currencyCode ? 'active' : ''
              }`}
              onClick={() =>
                props.dispatch(props.updateCurrencyForCheckout(currency.currencyCode))
              }
            >
              {currency.name}
            </a>
          </li>
        ))}
      </ul>
    )}
  </li>
)

export default CurrencyDropdownTmpl
