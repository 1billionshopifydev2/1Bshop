import React, { useState, useEffect } from 'react'
const ScrollToTopTmpl = require(`../../../themes/${process.env.B2S_THEME_NAME}/Shared/ScrollToTopTmpl`).default

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    document.addEventListener('scroll', toggleVisibility)
    return () => document.removeEventListener('scroll', toggleVisibility)
  }, [])

  const ownProps = {
    scrollToTop,
    isVisible,
  }

  return <ScrollToTopTmpl {...ownProps} />
}

export default ScrollToTop
