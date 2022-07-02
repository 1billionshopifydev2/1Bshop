import React from 'react'
import ErrorBoundary from '@b2s_core/src/components/ErrorBoundary'
import { JSONLD } from '@b2s_core/src/components/snippets/JSONLD'
import { Footer } from './Footer'
import { Header } from './Header'

import '../Assets/styles/style.scss'

const LayoutTmpl = (props) => (
  <ErrorBoundary>
    <JSONLD type="shop" />
    <Header isMenuOpen={props.isMenuOpen} menuItems={props.menuData} />
    {props.children}
    <Footer renderNewsletter={props.renderNewsletter} />
  </ErrorBoundary>
)

export default LayoutTmpl
