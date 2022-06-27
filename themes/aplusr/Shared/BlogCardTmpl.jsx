import React from 'react'
import Img from 'gatsby-image'

import * as Components from '../../../src/components/BlogPages/BlogCardCore'

const BlogCardTmpl = props => {
  const description = props.description.replace(/!\[(.+)\]\((.+)\)/, '')

  if (props.cardWithHover) {
    return (
      <div className="card-banner blog">
        <Components.Link to={`/blogs/the-edit/${props.slug}`}>
          <Img className="card-image" fluid={props.imageSrc} alt="article feature image" loading="lazy" />
          <h3 className="card-title my-3">{props.title}</h3>
          <p className="card-text">{Components.cutLongText(description, 445)}</p>
          <span>Read More</span>
        </Components.Link>
      </div>
    )
  }
  return (
    <div className="blog-card">
      <Components.Link to={`/blogs/the-edit/${props.slug}`}>
        <h1>{props.title}</h1>
      </Components.Link>
      <p>
        
         {!!props.author && <span>By <i>{props.author}</i> | </span>}
         <span>{props.articleDate}</span>
        </p>
      <div className="blog-card__image">
        <Components.Link to={`/blogs/the-edit/${props.slug}`}>
          <Img className="" fluid={props.imageSrc} alt="article feature image" loading="lazy" />
        </Components.Link>
      </div>
      <div className="mt-2">
        <p className="blog-card__content">{Components.cutLongText(description, 445)}</p>
      </div>
      <div className="mt-3">
        <Components.Link to={`/blogs/the-edit/${props.slug}`} className="">
          Read More
        </Components.Link>
      </div>
    </div>
  )
}

export default BlogCardTmpl
