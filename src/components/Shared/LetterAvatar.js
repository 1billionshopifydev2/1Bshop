import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
const LetterAvatarTmpl = require(`../../../themes/${process.env.B2S_THEME_NAME}/Shared/LetterAvatarTmpl`).default


const LetterAvatar = ({ text, large }) => {
  const getInitials = string => {
    let names = string.split(' '),
      initials = names[0].substring(0, 1).toUpperCase()

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase()
    }

    return initials
  }

  const ownProps = {
    classNames,
    getInitials,
    large,
    text
  }

  return <LetterAvatarTmpl {...ownProps} />
}

LetterAvatar.propTypes = {
  text: PropTypes.string.isRequired,
  large: PropTypes.bool,
}

LetterAvatar.defaultProps = {
  large: false,
}

export default memo(LetterAvatar)
