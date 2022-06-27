import React from 'react'
import * as Components from '../../src/layouts'

const LayoutPrintTmpl = props => (
  <Components.ErrorBoundary>
      {props.children}
  </Components.ErrorBoundary>
)

export default LayoutPrintTmpl
