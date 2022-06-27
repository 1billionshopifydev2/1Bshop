import React from 'react'
import PropTypes from 'prop-types'

const OptionsTmpl = require(`@themes/${process.env.B2S_THEME_NAME}/Product/Shared/OptionsTmpl`)
  .default

const Options = ({
  variantId,
  availableForSale,
  options,
  onChange,
  groups,
  addItemToCart,
}) => {
  if (!options || options.length === 0) {
    return null
  }

  const ownProps = {
    variantId,
    groups,
    availableForSale,
    options,
    onChange,
    addItemToCart,
  }

  return <OptionsTmpl {...ownProps} />
}

Options.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  variantId: PropTypes.string,
  availableForSale: PropTypes.bool,
  groups: PropTypes.array,
  addItemToCart: PropTypes.func,
}

export default Options
