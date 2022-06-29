import React from 'react'
import PropTypes from 'prop-types'

const HeaderTmpl = (props) => {
  return (
    <>
      <div>Header</div>
    </>
  )
}

HeaderTmpl.propTypes = {
  isLoggedIn: PropTypes.bool,
  cart: PropTypes.object,
}

export default HeaderTmpl
