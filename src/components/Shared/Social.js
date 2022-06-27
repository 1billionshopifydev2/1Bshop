import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const SocialTmpl = require(`../../../themes/${process.env.B2S_THEME_NAME}/Shared/SocialTmpl`).default


const Social = ({ url, img = null, title = '' }) => {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    if (!location) {
      if (typeof window !== 'undefined') {
        setLocation(window.location.origin)
      }
    }
  }, [])

  const SOCIAL_BUTTONS = [
    { platform: 'facebook', classAffix: 'like', cta: 'Share' },
    { platform: 'twitter', classAffix: 'tweet', cta: 'Tweet' },
    { platform: 'pinterest', classAffix: 'pin', cta: 'Pin It' },
  ]

  const onSocialClick = e => {
    e.preventDefault()
    const url = e.target.href
    window.open(url, 'newwindow', 'width=550,height=670')
  }

  if (!url) {
    return null
  }

  const renderSocialButton = button => {
    switch (button.platform) {
      case 'facebook':
        return (
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${location}${url}`}
            target="_blank"
            rel="nofollow noopener noreferrer"
            onClick={onSocialClick}
            aria-label="Facebook"
          >
            {button.cta}
          </a>
        )
      case 'twitter':
        return (
          <a
            href={`http://twitter.com/share?text=${title}%20&url=${location}${url}`}
            target="_blank"
            rel="nofollow noopener noreferrer"
            onClick={onSocialClick}
            aria-label="Twitter"
          >
            {button.cta}
          </a>
        )
      case 'pinterest':
        if (!img) {
          return null
        }
        return (
          <a
            href={`https://pinterest.com/pin/create/button/?url=${location}${url}&media=${img}&description=${title}`}
            target="_blank"
            rel="nofollow noopener noreferrer"
            onClick={onSocialClick}
            aria-label="Pinterest"
          >
            {button.cta}
          </a>
        )
      default:
        return null
    }
  }
  const ownProps = {
    SOCIAL_BUTTONS,
    location,
    renderSocialButton,
  }
  return <SocialTmpl {...ownProps} />
}

Social.propTypes = {
  url: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string,
}

export default Social
