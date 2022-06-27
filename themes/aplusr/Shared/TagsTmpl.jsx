import React from 'react'
import * as Components from '../../../src/components/Shared/Tags'

const TagsTmpl = props => (
  <div className={props.className}>
    <ul className="list-menu d-flex flex-wrap">
      {props.tags && props.tags.length > 0 &&
        props.tags.map((tag, index) => (
          <li key={index}>
            <Components.RenderIfPathExists
              key={index}
              path={props.tagToPath(tag)}
              fallback={
                props.showSpanTag ? (
                  <span className="btn btn-sm btn-light">{tag}</span>
                ) : null
              }
              tag={tag}
            >
              <Components.Link
                className="btn btn-sm btn-light"
                key={index}
                to={props.tagToPath(tag)}
                onClick={props.onClick}
              >
                {tag}
              </Components.Link>
            </Components.RenderIfPathExists>
          </li>
        ))}
    </ul>
  </div>
)

export default TagsTmpl
