import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import 'url-search-params-polyfill'

import Loader from '../../Loader'
import EndlessLine from './EndlessLine'
import Pagination from './Pagination'

const PaginatedListTmpl = require(`../../../../themes/${process.env.B2S_THEME_NAME}/Shared/PaginatedList/PaginatedListTmpl`).default

const PaginatedList = ({
  perPage,
  page,
  setPage,
  isLoading,
  list,
  renderItem,
  render,
  onResetFilters,
  onPageUpdate,
  endlessScroll = false,
  pageReload = true,
  titleForEmpty,
  setPerPage,
  viewAll = false,
}) => {
  if (isLoading !== false) {
    return <Loader />
  }

  if (list.length === 0 && !isLoading) {
    return (
      <div className="empty px-3">
        <h6>{titleForEmpty}</h6>
        {onResetFilters && (
          <button className="btn btn-red" onClick={onResetFilters}>
            Reset
          </button>
        )}
      </div>
    )
  }

  const slice = {
    from: endlessScroll ? 0 : perPage * (page - 1),
    to: perPage * page,
  }

  const totalPages = Math.ceil(list.length / perPage)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const pageFromURL = searchParams.get('page')
    if (pageReload && pageFromURL) {
      setPage(Number(pageFromURL))
    }
  }, [])

  useEffect(() => {
    if (onPageUpdate) {
      onPageUpdate({
        visible: list.slice(slice.from, slice.to).length,
      })
    }
  }, [page, perPage, list])

  useEffect(() => {
    if (!endlessScroll) {
      if ('URLSearchParams' in window) {
        const searchParams = new URLSearchParams(window.location.search)
        const pageFromURL = searchParams.get('page')
        if (page === 1) {
          if (pageFromURL) {
            searchParams.delete('page')
            const newRelativePathQuery = searchParams.toString()
              ? window.location.pathname + '?' + searchParams.toString()
              : window.location.pathname
            history.pushState(null, '', newRelativePathQuery)
          }
        } else {
          searchParams.set('page', page)
          const newRelativePathQuery = searchParams.toString()
            ? window.location.pathname + '?' + searchParams.toString()
            : window.location.pathname
          history.pushState(null, '', newRelativePathQuery)
        }
      }
    }
  }, [endlessScroll, page])

  const ownProps = {
    perPage,
    page,
    setPage,
    isLoading,
    list,
    slice,
    renderItem,
    render,
    onResetFilters,
    onPageUpdate,
    endlessScroll,
    titleForEmpty,
    totalPages,
    setPerPage,
    viewAll,
  }

  return <PaginatedListTmpl {...ownProps} />
}

PaginatedList.propTypes = {
  perPage: PropTypes.number,
  list: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  renderItem: PropTypes.func,
  render: PropTypes.func,
  onResetFilters: PropTypes.func,
  onPageUpdate: PropTypes.func,
  endlessScroll: PropTypes.bool,
  page: PropTypes.number,
  setPage: PropTypes.func,
}

PaginatedList.defaultProps = {
  isLoading: false,
  perPage: 12,
}

export {
  PaginatedList,
  EndlessLine,
  Pagination
}
