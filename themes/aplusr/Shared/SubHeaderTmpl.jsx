import React from 'react'

const SubHeaderTmpl = ({ children }) => {
  return (
    <div className="page-header">
      <div className="page-header__container container">{children}</div>
    </div>
  )
}

export default SubHeaderTmpl
