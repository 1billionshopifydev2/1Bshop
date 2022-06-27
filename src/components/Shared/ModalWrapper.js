import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { hideDiscussModal } from '@b2s_core/src/reducers/ui'

const ModalWrapperTmpl = require(`../../../themes/${process.env.B2S_THEME_NAME}/Shared/ModalWrapperTmpl`).default

const ModalWrapper = ({ ui, id, children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (ui.showDiscussModal) {
      $(document).ready(function() {
        const $modal = $(`#${id}`)
        $modal.modal('show')
      })
    } else {
      $(document).ready(function() {
        const $modal = $(`#${id}`)
        $modal.modal('hide')
        $('body')
          .removeClass('modal-open')
          .attr('style', '')
        $('.modal-backdrop').hide()
      })
    }
  }, [ui.showDiscussModal])

  const handleCloseOnBg = e => {
    if (e.target.id === id) {
      dispatch(hideDiscussModal())
    }
  }

  const onwProps = {
    handleCloseOnBg,
    id,
    children,
  }

  return <ModalWrapperTmpl {...onwProps} />
}

ModalWrapper.propTypes = {
  ui: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
}

export default ModalWrapper
