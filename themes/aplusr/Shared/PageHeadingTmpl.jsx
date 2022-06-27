import React from 'react'

const PageHeadingTmpl = props => (
  // DIFF CLASSES FOR GRAY AND BLUE OPTIONS
  <section
    className={props.classNames('section-pagetop', {
      'bg py-2 py-md-4': props.gray,
      'bg-primary py-3 py-md-5': props.blue,
    })}
  >
    <div
      className={props.classNames('container', {
        'text-center': props.textCenter,
        'text-left': props.textLeft,
      })}
    >
      <h2
        className={props.classNames('title-page', {
          'text-white': props.blue,
        })}
      >
        {props.title}
      </h2>
      {props.children}
    </div>
  </section>
)

export default PageHeadingTmpl
