import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { throttle } from 'lodash'
import { generateId } from '@b2s_core/src/utils/helpers'

const EndlessLineTmpl = require(`../../../../themes/${process.env.B2S_THEME_NAME}/Shared/PaginatedList/EndlessLineTmpl`).default

const EndlessLine = ({ page, setPage }) => {
  const [id] = useState(() => generateId('endless-'))

  useEffect(() => {
    const lineEl = document.getElementById(id)
    const handleScroll = () => {
      if (lineEl) {
        const bottomEdgeOfWrapper = lineEl.getBoundingClientRect().bottom
        const scrolled = window.innerHeight + window.scrollY
        const pageHeight = document.body.scrollHeight
        if (scrolled >= pageHeight || scrolled >= bottomEdgeOfWrapper) {
          setPage(page + 1)
        }
      }
    }
    handleScroll()
    const throttledScroll = throttle(handleScroll, 1200)

    window.addEventListener('scroll', throttledScroll)
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [page])

  return <EndlessLineTmpl id={id} />
}
EndlessLine.propTypes = {
  page: PropTypes.string,
  setPage: PropTypes.number.isRequired,
}

export default EndlessLine
