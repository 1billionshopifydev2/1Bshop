import React from 'react'
import PropTypes from 'prop-types'

const QuantityTmpl = require(`../../../../themes/${process.env.B2S_THEME_NAME}/Product/Shared/QuantityTmpl`).default

const QuantityController = ({ variant, setQuantity, quantity }) => {

  const ownProps = {
    quantity,
    setQuantity,
    variant
  }

  return <QuantityTmpl {...ownProps} /> 
}

QuantityController.propTypes = {
  variant: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
}

export default QuantityController
