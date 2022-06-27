import React from 'react'
import Link from '@b2s_core/src/utils/Link'


const CompareButtonTmpl = props => {
  if (props.isBtnView) {
    return props.isInCompareList ? (
      <Link
        className={`btn btn-light ${props.className} ${
          props.isInCompareList ? 'active' : ''
        }`}
        to="/compare"
        onClick={props.onClick}
      >
        <i className="fa fa-chart-bar"></i>
      </Link>
    ) : (
      <a
        className={`btn btn-light ${props.className} ${
          props.isInCompareList ? 'active' : ''
        }`}
        href="#"
        onClick={props.handleClick}
        disabled={props.comparelist}
      >
        <i className="fa fa-chart-bar"></i>
      </a>
    )
  }

  return (
    <span className="topbar">
      {props.isInCompareList ? (
        <Link
          className={`${props.className} ${
            props.isInCompareList ? 'active' : ''
          }`}
          to="/compare"
          onClick={props.onClick}
        >
          <i className="fa fa-chart-bar"></i>
        </Link>
      ) : (
        <a
          className={`${props.className} ${
            props.isInCompareList ? 'active' : ''
          }`}
          href="#"
          onClick={props.handleClick}
          disabled={props.comparelist}
        >
          <i className="fa fa-chart-bar"></i>
        </a>
      )}
    </span>
  )
}

export default CompareButtonTmpl
