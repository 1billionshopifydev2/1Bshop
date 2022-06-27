import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

import SearchBox from './SearchBoxTmpl'

const HeaderSearchTmpl = connectSearchBox(props => {
  return (
    <li className="nav-item dropdown menu-search">
      <form action="/pages/search-results" method="get">
        <button className="btn btn-link border-0 d-lg-none p-2" type="submit">
          <svg className="d-block" stroke="currentColor" fill="none" height="20" width="20">
            <title>Search</title>
            <polyline points="13,13 18,18" />
            <circle cx="8.5" cy="8.5" r="6.5" />
          </svg>
        </button>
        <input
          className="form-control text-secondary border-0 h-auto py-0 px-0 py-lg-3 px-lg-2 mx-1"
          name="q"
          type="text"
          placeholder="Search"
          onFocus={() => props.setInputFocus(true)}
          onChange={e => props.refine(e.target.value)}
          value={props.phrase}
          autoComplete="off"
          maxLength="255"
        />
      </form>

      { props.inputFocus && <SearchBox {...props} />}
    </li>
  )}
)

export default HeaderSearchTmpl
