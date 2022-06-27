import React from 'react'

const ModalWrapperTmpl = (props) => (
  <div
    id={props.id}
    className="modal fade show"
    tabIndex="-1"
    onClick={props.handleCloseOnBg}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">{props.children}</div>
    </div>
  </div>
)

export default ModalWrapperTmpl
