import React from 'react'

const SearchBarProductTmpl = props => (
  <>
    <div className="suggestions__item-image">
      <img src={props.image} alt={props.title} />
    </div>
    <div className="suggestions__item-info">
      <div className="suggestions__item-name">{props.title}</div>
      <div className="suggestions__item-meta">{props.variants[0].sku}</div>
    </div>
    <div className="suggestions__item-price">
      {props.priceFormatted}
      {props.oldPriceFormatted && (
        <div className="suggestions__item-price__old">
          {props.oldPriceFormatted}
        </div>
      )}
    </div>
  </>
)

export default SearchBarProductTmpl
