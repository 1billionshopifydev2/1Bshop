import React from 'react'
import * as Components from '../../../../src/components/CategoryPage/CategoryViewOptions/CategoryViewOptions'

const CategoryViewOptionsTmpl = props => (
  <header className="border-bottom mb-4 pb-3">
    <div className="form-inline">
      <span className="mr-md-auto my-3 my-md-0">
        Showing {props.visibleProducts} of{' '}
        {props.productsLength ? props.productsLength : 0} products
      </span>
      <div className="d-flex align-items-start">
        <Components.SortSwitch
          onChange={props.handleSort}
          value={props.sortOption}
        />
        <Components.PageSizeSwitch
          onChange={size => props.setPageSize(size)}
          value={props.pageSize}
        />
        <div className="btn-group layout-switcher">
          {props.types.map((t, index) => (
            <button
              key={index}
              className={props.classNames(
                'btn btn-outline-secondary switcher__button',
                {
                  active: props.activeType === t,
                }
              )}
              onClick={() => props.selectViewType(t)}
              data-layout={t}
              type="button"
            >
              {t === 'list' ? (
                <i className="fa fa-bars"></i>
              ) : (
                <i className="fa fa-th"></i>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  </header>
)

export default CategoryViewOptionsTmpl
