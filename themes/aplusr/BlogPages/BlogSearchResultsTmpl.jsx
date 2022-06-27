import React from 'react'
import * as Components from '../../../src/components/BlogPages/BlogSearchResults/BlogSearchResultsCore'
 
const BlogSearchResultsTmpl = props => (
  <Components.Layout>
    <Components.SEO title="Search in blog" ignoreTemplate />
    <Components.SubHeader>
      <Components.Breadcrumb>
        <Components.Breadcrumb.Item to="/">Home</Components.Breadcrumb.Item>
        <Components.Breadcrumb.Item to="/blog">Blog</Components.Breadcrumb.Item>
        <Components.Breadcrumb.Item>{`Results ${
          props.searchQuery && props.articles.length > 0
            ? `for "${props.searchQuery}"`
            : 'not found'
        }`}</Components.Breadcrumb.Item>
      </Components.Breadcrumb>
      {props.articles.length > 0 && (
        <div className="page-header__title">
          <h1>{props.articles.length} results</h1>
        </div>
      )}
    </Components.SubHeader>
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="row">
            <Components.PaginatedList
              page={props.page}
              setPage={props.setPage}
              perPage={props.perPage}
              list={props.articles}
              isLoading={props.isLoading}
              titleForEmpty="There are no posts matching the search"
              renderItem={article => (
                <div className="col-12 col-md-6 mb-5" key={article.id}>
                  <Components.BlogCard
                    imageSrc={props.resizedImgURL(
                      props.get(article.image, 'originalSrc'),
                      '450x400'
                    )}
                    title={article.title}
                    handle={props.getBlogHandleFromUrl(article.url)}
                    description={props.cutLongText(article.content, 200)}
                    publishedAt={article.publishedAt}
                  />
                </div>
              )}
            />
          </div>
        </div>
        <Components.BlogSidebar />
      </div>
    </div>
  </Components.Layout>
)
 
export default BlogSearchResultsTmpl
