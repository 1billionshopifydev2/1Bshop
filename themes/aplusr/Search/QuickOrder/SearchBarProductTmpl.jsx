import React from 'react'

const SearchBarProductTmpl = props => (
  <>
    <div className="suggestions__item-image">
      <img src={props.image} alt={props.title} />
    </div>
    <div className="suggestions__item-info">
      <div className="suggestions__item-name">
        <div className="suggestions__item-name">{props.title}</div>
        <div className="suggestions__item-options">
          {props.selectedOptions &&
            props.selectedOptions.map((i, k) => (
              <span key={k}>{`${i.name}: ${i.value}`}</span>
            ))}
        </div>
      </div>
      <div className="suggestions__item-meta">
        {props.variant.sku ? `SKU: ${props.variant.sku}` : ''}
      </div>
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
