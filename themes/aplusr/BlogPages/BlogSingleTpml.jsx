import React from 'react'
import PropType from 'prop-types'

import * as Components from 'src/components/BlogPages/BlogSingle/BlogSingleCore'
import ContentSections from 'src/components/ContentPages/ContentSections'
import EditButtons from '../EditButtons/EditButtons'

const BlogSingleTmpl = props => {
  return (
    <Components.Layout mainClassAffix="single-blog">
      <Components.SEO
        title={props.SEO?.title || props.title}
        description={Components.cutLongText(
          !!props.SEO?.description ? props.SEO?.description : props.abstract,
          150
        )}
        type="article"
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6 blog-content mt-5">
            <h2>THE EDIT.</h2>
            <h1>{props.title}</h1>
            <p>
              {!!props.author && (
                <span>
                  <i>By {props.author}</i> |
                </span>
              )} 
              {' '}{props.published}
            </p>
            <div dangerouslySetInnerHTML={{__html: props.legacy_content}} />
            <ContentSections sections={props.content} />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <Components.Link
              to="/blogs/the-edit"
              className="btn btn-primary border-0 px-4 py-2 mb-4"
            >
              {' '}
              ← back to The Edit.{' '}
            </Components.Link>
          </div>
        </div>
      </div>

      <EditButtons editStrapiUrl={`${process.env.STRAPI_URL}/admin/plugins/content-manager/collectionType/application::posts.posts/${props.id}`} />
    </Components.Layout>
  )
}

BlogSingleTmpl.propTypes = {
  title: PropType.string.isRequired,
  abstract: PropType.string.isRequired,
  content: PropType.array,
  author: PropType.string.isRequired,
  hero: PropType.string.isRequired,
  id: PropType.number,
  published: PropType.string.isRequired,
}

export default BlogSingleTmpl
