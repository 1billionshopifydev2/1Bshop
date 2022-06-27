import React from 'react'
import PropTypes from 'prop-types'
import Link from '@b2s_core/src/utils/Link'
import RenderIfPathExists from './RenderIfPathExists'
const TagsTmpl = require(`../../../themes/${process.env.B2S_THEME_NAME}/Shared/TagsTmpl`).default

const Tags = ({
  prefix = '',
  tags = [],
  showSpanTag = false,
  onClick = () => {},
  className = 'product__tags tags',
}) => {
  const tagToPath = tag => {
    return `${prefix}/${tag.toLowerCase().replace(' ', '-')}`
  }

  const ownProps = {
    tags,
    tagToPath,
    showSpanTag,
    onClick,
    className,
  }

  return <TagsTmpl {...ownProps} />
}

Tags.propTypes = {
  className: PropTypes.string,
  prefix: PropTypes.string,
  showSpanTag: PropTypes.bool,
  tags: PropTypes.array.isRequired,
  onClick: PropTypes.func,
}
export default Tags

export { RenderIfPathExists, Link }
