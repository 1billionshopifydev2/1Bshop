import React from 'react'

const SocialTmpl = props => (
  <ul className="share-links__list">
      {props.location && props.SOCIAL_BUTTONS.map( button => 
        <li key={button.platform} className={`share-links__item share-links__item--type--${button.classAffix}`}>{props.renderSocialButton(button)}</li>
      )}
    </ul>
)

export default SocialTmpl
