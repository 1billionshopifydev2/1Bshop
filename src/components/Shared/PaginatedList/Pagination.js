import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby-link'

const PaginationTmpl = require(`../../../../themes/${process.env.B2S_THEME_NAME}/Shared/PaginatedList/PaginationTmpl`).default


const Pagination = ({ page, totalPages, setPage, viewAll, setPerPage }) => {
  const setPageAndScroll = (page) => {
    window.scroll(0, 10)
    setPage(page)
  }

  const showAllPages = (event) => {
    const pathname = window.location.pathname
    navigate(pathname, { state: { perPage: 2000 } })
  }

  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    if (i > page + 2 && i !== totalPages) {
      pages[totalPages - 1] = (
        <li key={i} className="page-item disabled">
          <span className="page-link disabled">...</span>
        </li>
      )
      continue
    }

    if (i < page - 2 && i !== 1) {
      pages[1] = (
        <li key={i} className="page-item disabled">
          <span className="page-link disabled">...</span>
        </li>
      )
      continue
    }

    pages.push(
      <li key={i} className={classNames('page-item', { active: i === page })}>
        <button className="page-link" onClick={() => setPageAndScroll(i)}>
          {i}
        </button>
      </li>
    )
  }

  const ownProps = {
    pages,
    page,
    totalPages,
    setPage: setPageAndScroll,
    showAllPages,
    viewAll,
    classNames,
  }

  return <PaginationTmpl {...ownProps} />
}

Pagination.propTypes = {
  page: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
}

export default Pagination
