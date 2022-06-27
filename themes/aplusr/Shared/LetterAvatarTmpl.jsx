import React from 'react'

const LetterAvatarTmpl = (props) => (
  <div
    className={props.classNames('letter-avatar', {
      'large': props.large,
    })}
  >
    {props.text && <span>{props.getInitials(props.text)}</span>}
  </div>
)

export default LetterAvatarTmpl
