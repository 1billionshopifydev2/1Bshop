import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const PageHeadingTmpl = require(`../../../themes/${process.env.B2S_THEME_NAME}/Shared/PageHeadingTmpl`).default


const PageHeading = ({ title, blue, gray, textCenter, textLeft, children }) => {
  const ownProps = {
    title,
    blue,
    gray,
    textCenter,
    textLeft,
    children,
    classNames,
  }

  return <PageHeadingTmpl {...ownProps} />
}

PageHeading.propTypes = {
  title: PropTypes.string.isRequired,
  blue: PropTypes.bool,
  gray: PropTypes.bool,
  textCenter: PropTypes.bool,
  textLeft: PropTypes.bool,
  children: PropTypes.node,
}

PageHeading.defaultProps = {
  title: '',
  blue: false,
  gray: true,
  textCenter: false,
  textLeft: true,
}

export default PageHeading
