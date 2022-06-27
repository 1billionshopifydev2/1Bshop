import React from 'react'
import Link from '@b2s_core/src/utils/Link'

// Breadcrumbs wrapper
const Breadcrumb = ({ children }) => {
  return (
    <nav
      className="flex-fill my-3"
      aria-label="breadcrumb"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="breadcrumb">
        {React.Children.map(children, (child, index) =>
          child
            ? React.cloneElement(child, { ...child.props, index: index + 1 })
            : null
        )}
      </ol>
    </nav>
  )
}

// Breadcrumbs ITEM (link or text)
const Item = ({ to, children, index }) => {
  return to ? (
    <li
      className="breadcrumb-item"
      itemProp="itemListElement"
      itemScope
      itemType="https://schema.org/ListItem"
    >
      <Link to={to} className="d-inline-block" itemProp="item">
        <span itemProp="name">{children}</span>
      </Link>
      <meta itemProp="position" content={index} />
    </li>
  ) : (
    <li className="breadcrumb-item">{children}</li>
  )
}

Breadcrumb.Item = Item

export default Breadcrumb
