/* eslint-disable */
import React from 'react'

import * as Components from '../../../src/components/BlogPages/BlogList/BlogListCore'

const BlogListTmpl = ({
  page,
  setPage,
  perPage,
  pageContext,
  orderedPosts,
}) => {
  return (
    <Components.Layout>
      <Components.SEO
        description="A+R's digest on design + discovery."
        ignoreTemplate
        title="The Edit. — A+R Blog"
      />
      <div className="page blog-page">
        <div className="py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 page-header__title d-flex flex-column align-items-center">
                <h1 style={{ fontSize: '33px' }}>
                  {pageContext.title == 'All'
                    ? 'Blog articles'
                    : `${pageContext.title}.`}
                </h1>
                <p>A+R's digest on design + discovery</p>
              </div>
              <div className="col-12 col-lg-6">
                <div className="block">
                  <Components.PaginatedList
                    list={orderedPosts}
                    page={page}
                    perPage={perPage}
                    render={(page) => {
                      const renderCard = (post, index) => (
                        <div className="col-12 mb-5" key={index}>
                          <hr className="border-dark border my-3" />
                          <Components.BlogCard
                            authorFirstLastName={post.node.author}
                            category={post.node.Title}
                            description={post.node.abstract}
                            imageSrc={
                              post.node.hero.localFile.childImageSharp.fluid
                            }
                            publishedAt={
                              post.node.legacy_date || post.node.published_at
                            }
                            slug={post.node.slug}
                            title={post.node.Title}
                          />
                        </div>
                      )
                      return (
                        <>
                          <div className="row d-flex row-column">
                            {orderedPosts
                              ?.slice(
                                perPage * (page - perPage),
                                perPage * page
                              )
                              .map((post, index) => renderCard(post, index))}
                          </div>
                        </>
                      )
                    }}
                    setPage={setPage}
                    titleForEmpty="There are no posts matching the search"
                  />
                </div>
              </div>
              <Components.BlogSidebar />
            </div>
          </div>
        </div>
      </div>
    </Components.Layout>
  )
}

BlogListTmpl.propTypes = Components.componentPropTypes
BlogListTmpl.defaultProps = Components.componentDefaultProps
export default BlogListTmpl
