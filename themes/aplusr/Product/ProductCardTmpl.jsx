import React from 'react'
import * as Components from '../../../src/components/Product/ProductCard'
import ProductCardItemSideTmpl from './ProductCardItemSide'
import ProductCardMinimalTmpl from './ProductCardMinimalTmpl '


const ProductCardTmpl = (props) => {

  // horizontal card

  if (props.itemSide) {
    return (
      <ProductCardItemSideTmpl
        id={props.variantId}
        image={props.image}
        title={props.title}
        availableForSale={props.availableForSale}
        productURL={props.productURL}
        price={props.price}
        oldPrice={props.oldPrice}
        currency={props.currency}
        addLineItem={props.addLineItem}
        dispatch={props.dispatch}
      />
    )
  }

  // minimal card view, eg: on Bestsellers section (homepage)
  if (props.minimalCard) {
    return <ProductCardMinimalTmpl
      id={props.variantId}
      image={props.image}
      title={props.title}
      badges={props.badges}
      availableForSale={props.availableForSale}
      productURL={props.productURL}
      price={props.price}
      oldPrice={props.oldPrice}
      currency={props.currency}
      openQuickShop={props.openQuickShop}
    />
  }

  return (
    <figure
      className={props.classNames('card product', {
        'card-product-list': props.horizontal,
      })}
    >
      <div className="row no-gutters">
        <div className="col-12">
          <div className="img-wrap">
            <div
              className="flex-row product-card__badges-list"
              data-mf="product - promo_label"
            >
              {props.badges.map(badge => (
                <span
                  key={badge[0]}
                  className={`badge ${badge[0] &&
                    `product-card__badge--${badge[0].toLowerCase()}`}`}
                  style={{ backgroundColor: badge[1] ? badge[1] : null }}
                >
                  {badge[0]}
                </span>
              ))}
            </div>
            <Components.Link to={props.productURL}>
              <img src={props.image} alt={props.title} className="w-auto" loading="lazy" />
            </Components.Link>
            <div className="list-view-grid">
              <div className="topbar-wrapper">
                <Components.WishlistButton productId={props.productId} productUrl={props.productURL} />
                <Components.CompareButton productId={props.productId} />
              </div>
            </div>
            <a
              href="#"
              className="d-flex flex-row justify-content-center align-items-center btn-overlay"
              type="button"
              onClick={e => {
                e.preventDefault()
                props.openQuickShop()
              }}
            >
              <i className="fa fa-search-plus mr-2"></i>
              <span>Quick view</span>
            </a>
          </div>
        </div>
        <div className="col-12">
          <figcaption className="info-wrap">
            <div className="list-view-grid">
              <div className="fix-height">
                <Components.Link className="title mb-1" to={props.productURL}>
                  {props.title}
                </Components.Link>
                <div className="vendor mb-1">{props.vendor}</div>
                <Components.Prices price={props.price} old={props.oldPrice} currency={props.currency} />
                {props.rating && Object.keys(props.rating).length > 0 && (
                  <Components.ReviewsStats rating={props.rating} handle={props.handle} inCard />
                )}
              </div>
              <button
                className="btn btn-block btn-primary"
                type="button"
                onClick={() => props.dispatch(props.addLineItem(props.variantId, 1))}
                disabled={!props.availableForSale}
              >
                {props.availableForSale ? 'Add to Cart' : 'Out of stock'}
                <i className="fa fa-shopping-cart pl-2"></i>
              </button>
            </div>
            <div className="list-view-list">
              <Components.Link className="title h5 mb-1" to={props.productURL}>
                {props.title}
              </Components.Link>
              <div className="vendor mb-1">{props.vendor}</div>
              <Components.ReviewsStats rating={props.rating} handle={props.handle} inCard />
              {props.description && (
                <p
                  data-mf="card - description"
                  className="description"
                  dangerouslySetInnerHTML={{ __html: props.description }}
                />
              )}
            </div>
          </figcaption>
        </div>
        <div className="col-12 list-view-list">
          <div className="bottom-wrap">
            <Components.Prices price={props.price} old={props.oldPrice} currency={props.currency} />
            <p>
              Availability:{' '}
              {props.availableForSale ? (
                <span className="text-success">In Stock</span>
              ) : (
                  <span className="text-danger">Out of Stock</span>
                )}
            </p>
            <div className="bottom-wrap-buttons">
              <Components.Link className="btn btn-primary btn-block" to={props.productURL}>
                Details
              </Components.Link>
              <div className="product-card-links mt-2">
                <Components.WishlistLink productId={props.productId} productUrl={props.productURL} />
                <Components.CompareLink productId={props.productId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}


export default ProductCardTmpl
