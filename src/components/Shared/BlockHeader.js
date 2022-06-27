import React from 'react'
import PropTypes from 'prop-types'

const BlockHeaderTmpl = require(`../../../themes/${process.env.B2S_THEME_NAME}/Shared/BlockHeaderTmpl`).default

const BlockHeader = ({ title, children }) => {
  return <BlockHeaderTmpl title={title}>{children}</BlockHeaderTmpl>
}

BlockHeader.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}

BlockHeader.defaultProps = {
  title: '',
}

export default BlockHeader
