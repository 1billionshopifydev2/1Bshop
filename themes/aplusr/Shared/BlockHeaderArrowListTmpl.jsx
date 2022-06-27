import React from 'react'

const BlockHeaderArrowListTmpl = () => {
  return (
    <div className="block-header__arrows-list">
      <button
        className="block-header__arrow block-header__arrow--left"
        type="button"
      >
        <span aria-label="Previous">‹</span>
      </button>
      <button
        className="block-header__arrow block-header__arrow--right"
        type="button"
      >
        <span aria-label="Next">›</span>
      </button>
    </div>
  )
}

export default BlockHeaderArrowListTmpl
