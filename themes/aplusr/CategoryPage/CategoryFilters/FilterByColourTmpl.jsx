import React, { useEffect, useState, useCallback } from 'react'
import tinycolor from 'tinycolor2'

import { pushHistoryUrl } from 'src/b2s_core/src/utils/helpers_product'

const FilterByColourTmpl = ({
  filtersActive: { colorFilter: activeColor },
  onHandleColorFilterClick,
}) => {
  const [colorFilter, setColorFilter] = useState({})
  const [tooltipToggle, setTooltipToggle] = useState(false)
  let timeClear = 0

  useEffect(() => {
    if (typeof colorFilter.hColor !== 'undefined') {
      const { hColor, sColor, vColor } = colorFilter

      onHandleColorFilterClick(colorFilter)

      if (!colorFilter.hColor && !colorFilter.sColor && !colorFilter.vColor) {
        pushHistoryUrl('')
      } else {
        pushHistoryUrl(`filtered/colour/${hColor}/${sColor}/${vColor}`)
      }
    }
  }, [colorFilter])

  const onHandleColorRangeChange = useCallback((event) => {
    const {
      currentTarget: { value },
    } = event

    const hColor = Math.ceil(tinycolor(value).toHsv().h) || 359
    const sColor = Math.ceil(tinycolor(value).toHsv().s * 100)
    const vColor = Math.ceil(tinycolor(value).toHsv().v * 100)

    clearTimeout(timeClear)
    timeClear = setTimeout(
      () => setColorFilter({ ...colorFilter, hColor, vColor, sColor }),
      800
    )
  }, [colorFilter])

  const handleClearClick = () => {
    const clearColor = { hColor: 0, sColor: 0, vColor: 0 }
    setColorFilter(clearColor)
  }

  const handleOnMouseToggle = () => setTooltipToggle((prev) => !prev)

  return (
    <article className="filter-group">
      <div>
        <h6 className="title mt-2" id="question-tooltip">
          Colour{' '}
          <svg
            height="16"
            onMouseEnter={handleOnMouseToggle}
            onMouseLeave={handleOnMouseToggle}
            viewBox="0 0 20 20"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm6.5-.25A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2h-.25a.75.75 0 01-.75-.75zM8 6a1 1 0 100-2 1 1 0 000 2z"
              fillRule="evenodd"
            ></path>
          </svg>
          <span data-tooltip={`tooltip-${tooltipToggle ? 'show' : 'hide'}`}>
            Select a color you desire to find.
            <br />
            <br />
            <i>Move the horizontal range to change the color you desire.</i>
            <br />
            <br />
            <i>And move dot within the rectangular to regulate the</i>
            saturation
          </span>
        </h6>
      </div>
      <div id="colourFilter">
        <label htmlFor="colorFrom">
          From:
          <input
            className="color-picker"
            name="colorFrom"
            onChange={onHandleColorRangeChange}
            type="color"
            value={
              tinycolor(`hsv(${activeColor.hColor}, ${activeColor.sColor}%, ${activeColor.vColor})%`).toHexString()
            }
          />
        </label>
        <button className="clear-filter" onClick={handleClearClick}>
          Clear color
        </button>
      </div>
    </article>
  )
}

export default FilterByColourTmpl
