import React from 'react'
import * as Components from '../../../../src/components/Shared/PaginatedList/PaginatedList'

const PaginatedListTmpl = props => (
  <>
    {props.render && props.render(props.page)}

    {props.renderItem &&
      props.list
        .slice(props.slice.from, props.slice.to)
        .map((item, index) => props.renderItem(item, index))}

    <div className="posts-view__pagination" style={{ width: '100%' }}>
      {props.endlessScroll && props.page < props.totalPages && (
        <Components.EndlessLine page={props.page} setPage={props.setPage} />
      )}

      {!props.endlessScroll && props.totalPages > 1 && (
        <Components.Pagination
          page={props.page}
          setPage={props.setPage}
          setPerPage={props.setPerPage}
          totalPages={props.totalPages}
          viewAll={props.viewAll}
        />
      )}
    </div>
  </>
)

export default PaginatedListTmpl
