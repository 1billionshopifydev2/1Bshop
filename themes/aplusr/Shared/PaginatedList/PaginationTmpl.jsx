/* eslint-disable */

import React from 'react'

const PaginationTmpl = props => (
  <ul className="pagination pt-4 pb-1">
    {
      props.page === 1 ||
      <li
        className={props.classNames('page-item', {
          disabled: props.page === 1,
        })}
      >
        <button
          className="page-link page-link--with-arrow"
          onClick={() => props.setPage(props.page - 1)}
        >
          <span aria-label="Previous">« Previous</span>
        </button>
      </li>
    }

    {props.pages}

    {
      props.page === props.totalPages ||
      <li
        className={props.classNames('page-item', {
          disabled: props.page === props.totalPages,
        })}
      >
        <button
          className="page-link page-link--with-arrow"
          onClick={() => props.setPage(props.page + 1)}
        >
          <span aria-label="Next">Next »</span>
        </button>
      </li>
    }
  </ul>
)

export default PaginationTmpl
