import React from 'react'

const BlockHeaderTmpl = ({ title, children }) => (
  <div className="block-header">
    <h3 className="block-header__title">{title}</h3>
    <div className="block-header__divider"></div>
    {children}
  </div>
)

export default BlockHeaderTmpl
