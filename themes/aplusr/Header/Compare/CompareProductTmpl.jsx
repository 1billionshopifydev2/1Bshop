import React from 'react'
import * as Components from '../../../../src/components/Header/Compare/CompareProduct'

const CompareProductTmpl = props => (
  <figure className="itemside mb-3">
    <div className="aside">
      <Components.Link to={props.productURL}>
        <img
          src={props.image}
          alt={props.title}
          loading="lazy"
          style={{ maxWidth: '44px' }}
        />
      </Components.Link>
    </div>
    <figcaption className="info">
      <div className="dropcart__product-name">
        <Components.Link to={props.productURL}>{props.title}</Components.Link>
      </div>
    </figcaption>
    <a
      href="#"
      className="float-right"
      onClick={() => props.dispatch(props.removeProductFromComparelist(props.id))}
    >
      <i className="fa fa-trash"></i>
    </a>
  </figure>
)

export default CompareProductTmpl
