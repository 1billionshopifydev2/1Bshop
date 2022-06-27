import React from 'react'
import Link from '@b2s_core/src/utils/Link'

const CompareLinkTmpl = props =>
  props.isInComparelist ? (
    <Link className="compare-link active" to="/compare">
      <i className="fa fa-chart-bar"></i>
    </Link>
  ) : (
    <a
      className="compare-link small d-block"
      href="#"
      onClick={props.handleClick}
      disabled={props.compareListLoading}
    >
      <i className="fa fa-chart-bar mr-2"></i>
      Add to compare
    </a>
  )

export default CompareLinkTmpl
