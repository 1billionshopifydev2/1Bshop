import React from 'react'
import * as Components from '../../../src/components/Home/NewArrivalsProductsSection'

const NewArrivalsProductsTmpl = props => (
  <div
    id={props.id}
    className="block block-products-carousel"
    data-layout="horizontal"
  >
    <div className="container">
      <div className="block-header">
        <h3 className="block-header__title">{props.title}</h3>
        <div className="block-header__divider"></div>
        {props.filters.length > 0 && (
          <ul className="block-header__groups-list">
            <li>
              <button
                type="button"
                className={props.classNames('block-header__group', {
                  'block-header__group--active': !props.filter,
                })}
                onClick={() => props.updateFilter(null)}
              >
                All
              </button>
            </li>
            {props.filters.map((localFilter, i) => {
              if (
                props.filterProductsByTags(
                  props.data.collection.products,
                  localFilter.tags
                ).length > 0
              ) {
                return (
                  <li key={i}>
                    <button
                      type="button"
                      className={props.classNames('block-header__group', {
                        'block-header__group--active':
                          props.filter &&
                          props.filter.name === localFilter.name,
                      })}
                      onClick={() => props.updateFilter(localFilter)}
                    >
                      {localFilter.name}
                    </button>
                  </li>
                )
              }
              return null
            })}
          </ul>
        )}
        <Components.BlockHeaderArrowListTmpl />
      </div>
      <div className="block-products-carousel__slider">
        <div className="block-products-carousel__preloader"></div>
        <div className="owl-carousel">
          {props.productsPairs.map((productPair, i) => (
            <div key={i} className="block-products-carousel__column">
              {productPair.map((p, i) =>
                props.lazy && i > 6 ? null : (
                  <div key={i} className="block-products-carousel__cell">
                    <Components.ProductCard
                      product={p}
                      imgSize="small"
                      itemSide
                    />
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default NewArrivalsProductsTmpl
