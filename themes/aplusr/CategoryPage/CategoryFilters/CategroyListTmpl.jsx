import React from 'react'

const CategroyListTmpl = ({ brands, rangePrice, refineSelection, filter, setFilter }) => {
  const sortedBrands = brands.sort((a, b) => a.brand.localeCompare(b.brand))

  const handleCheckboxFilter = (selectedType, selectedValue) => { 
    const updatedFilter = filter.map(({type, value}) => {
      if (type === selectedType && value !== selectedValue) return { type, value: selectedValue }
      if (type === selectedType && value === selectedValue) return null
      return {type, value}
    })
      .filter(Boolean) 
    if (!filter.some(({type}) => type === selectedType)) {
      setFilter([...updatedFilter, {type: selectedType, value: selectedValue}])
    } else {
      setFilter(updatedFilter)
    }
  }

  return (
    <div className="ais-Panel">
      {/* More Categories */}
      <div className="ais-RefinementList">
        <div>
          <h4 className="mb-3">Refine Selection</h4>
          <ul>
            {
              refineSelection.map(({ label, refineSlug }, i) => (
                <li key={i}>
                  <label onClick={() => handleCheckboxFilter('refine', refineSlug)}>
                    <span className="ais-RefinementList-checkbox">
                      {
                        filter.some(({ value }) => value === refineSlug) &&
                        <span className="ais-RefinementList-isRefined" />
                      }
                    </span>
                    <span>{label}</span>
                  </label>
                </li>
              ))
            }
          </ul>
          <hr className="border-dark my-3" />
        </div>
        <div>
          <h4 className="mb-3">Price</h4>
          <ul>
            {
              rangePrice.map((range, i) => (
                <li key={i}>
                  <label onClick={() => handleCheckboxFilter('price', `${range.low}-${range.to}`)}>
                    <span className="ais-RefinementList-checkbox">
                      {
                        filter.some(({ value }) => value === `${range.low}-${range.to}`) &&
                        <span className="ais-RefinementList-isRefined" />
                      }
                    </span>
                    <span>{range.low === 0 ? 'Up to' : `$${range.low}`}</span>
                    <span>{range.to === 9999999 ? ' and Up' : ` ${i === 0 ? '' : '–'} $${range.to}`}</span>
                  </label>
                </li>
              ))
            }
          </ul>
          <hr className="border-dark my-3" />
        </div>
        <div className="brands">
          <h4 className="mb-3">Brand</h4>
          <ul className="brand-filter">
          {sortedBrands.map(({ brand, slugBrand }) =>
            !brand.includes('•') && (
                <li key={brand}>
                  <label onClick={() => handleCheckboxFilter('brand', slugBrand)}>
                    <span className="ais-RefinementList-checkbox">
                      {
                        filter.some(({ value }) => value === slugBrand) &&
                        <span className="ais-RefinementList-isRefined" />
                      }
                    </span>
                    <span>{brand}</span>
                  </label>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CategroyListTmpl