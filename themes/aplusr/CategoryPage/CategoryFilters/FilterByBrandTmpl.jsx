import React from 'react'

const FilterByBrandTmpl = props => {
  return (
    <article className="filter-group brandOptions">
      <header className="card-header">
        <a
          className="btn btn-primary"
          data-toggle="collapse"
          href="#brands"
          role="button"
          aria-expanded="false"
          aria-controls="brands"
          className="collapsed"
        >
          <i className="icon-control fa fa-chevron-down"></i>
          <h6 className="title">Brands</h6>
        </a>
      </header>
      <div className="filter-content collapse" id="brands">
        <div className="card-body">
          {props.isBrandPage
            ? props.vendors &&
              props.brands &&
              props.brands.map((brand, i) => (
                <label className="custom-control custom-checkbox" key={i}>
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    id={brand.fieldValue.toLowerCase()}
                    name={brand.fieldValue.toLowerCase()}
                    onChange={e =>
                      props.handleBrandOptionsChange(
                        e,
                        brand.fieldValue.toLowerCase()
                      )
                    }
                    value={brand.fieldValue}
                  />
                  <div className="custom-control-label">{brand.fieldValue}</div>
                </label>
              ))
            : props.brands &&
              props.sortedBrands &&
              props.sortedBrands.map((brand, i) => (
                <label className="custom-control custom-checkbox" key={i}>
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    id={brand.vendor.toLowerCase()}
                    name={brand.vendor.toLowerCase()}
                    onChange={e =>
                      props.handleBrandOptionsChange(
                        e,
                        brand.vendor.toLowerCase()
                      )
                    }
                    value={brand.vendor}
                  />
                  <div className="custom-control-label"> {brand.vendor}</div>
                </label>
              ))}
        </div>
      </div>
    </article>
  )
} 
export default FilterByBrandTmpl
