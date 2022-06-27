import React from 'react'
import classnames from 'classnames'

import ProductCardTmpl from '../Shared/ProductCardTmpl'
import * as Components from '../../../src/components/CategoryPage/CategoryCore'

const CategoryPageTmpl = props => (
  <Components.Layout>
    <Components.SEO
      title={props.seo.title}
      description={props.seo.description}
    />
    <div className="my-3 mb-5 search-result-page">
      <div className="container mb-5">
        <div className="row">
          <div className="col">
            <hr className="border-dark border" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-lg-9">
            <h1>{props.collection.title}</h1>
          </div>
          <div className="col-sm-12 col-lg-3 text-end">
            <div className="d-flex align-items-center justify-content-end">
              {props.products.length > props.pageSize && (
                <a
                  className="me-2"
                  href="#"
                  onClick={event => {
                    event.preventDefault()
                    props.setPageSize(props.products.length)
                  }}
                >
                  View all
                </a>
              )}
              <div>
                <Components.ProductFilterTmpl {...props} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-3 mb-4">
            <h4 className="mb-3">{props.collection.title} Categories</h4>
            <div className="mb-4">
              {props.categoriesLink.map(({ title, url }, i) => (
                <div key={i}>
                  <Components.Link
                    to={url}
                    className={classnames({
                      'category-link-active': props.pathname === url,
                    })}
                  >
                    {title}
                  </Components.Link>
                </div>
              ))}
            </div>
            <hr className="border-dark my-2" />
            <Components.CategroyListTmpl
              brands={props.brands}
              rangePrice={props.rangePrice}
              refineSelection={props.refineSelection}
              filter={props.filter}
              setFilter={props.handleFilterChange}
            />
          </div>
          <div className="col-lg-9">
            <div className="row">
              <Components.PaginatedList
                list={props.products}
                page={props.page}
                setPage={props.setPage}
                perPage={props.pageSize}
                setPerPage={props.setPageSize}
                viewAll
                titleForEmpty="There are no products matching the search"
                render={page =>
                  props.products
                    .slice(
                      props.pageSize * (props.page - 1),
                      props.pageSize * props.page
                    )
                    .map(product => (
                      <ProductCardTmpl key={product.id} product={product} />
                    ))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Components.Layout>
)

export default CategoryPageTmpl
