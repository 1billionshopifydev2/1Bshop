import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const showToast = content => toast(content)

const ToasterNotification = ({
  position,
  autoClose,
  hideProgressBar,
  newestOnTop,
  closeOnClick,
  rtl,
  pauseOnVisibilityChange,
  draggable,
  pauseOnHover,
}) => {
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      newestOnTop={newestOnTop}
      closeOnClick={closeOnClick}
      rtl={rtl}
      pauseOnVisibilityChange={pauseOnVisibilityChange}
      draggable={draggable}
      pauseOnHover={pauseOnHover}
    />
  )
}
ToasterNotification.defaultProps = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: true,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnVisibilityChange: true,
  draggable: true,
  pauseOnHover: true,
}

export default ToasterNotification
