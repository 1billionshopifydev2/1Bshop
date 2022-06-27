import React from 'react'
import * as Components from '../../../../src/components/ProductDetails/Sections/ReviewsCore'

const ReviewsTmpl = ({
  product,
  title,
  reviews,
  page,
  setPage
}) => (
  <Components.Fragment>
    <div
      className="yotpo yotpo-main-widget"
      data-product-id={product.handle}
      data-name={product.title}
    />
    <div id="reviews" className="row">
      <div className="col-12 col-lg-6">
        <h3 className="mb-3">{title}</h3>
        <div className="reviews-header">
          <ul className="rating-stars">
            {[...new Array(5)].map((star, index) =>
              reviews.average > index ?
                <Components.Fragment key={index}>
                  <i className="fa fa-star filled"></i>
                </Components.Fragment> : <Components.Fragment key={index}>
                  <i className="fa fa-star empty"></i>
                </Components.Fragment>
            )}
          </ul>
          <span className="reviews-header_average">{reviews.average}</span>
          <span className="reviews-header_total">
            | {reviews.total} reviews
          </span>
        </div>
        <div className="reviews-list">
          {reviews.total === 0 ? (
            <p>Be the first and write about your experience now!</p>
          ) : (
            <ol className="list-unstyled">
              {reviews.items.map((review, index) => (
                <Components.Review key={index} {...review} />
              ))}
            </ol>
          )}
        </div>
        {reviews.maxPage > 1 && (
          <div className="reviews-list__pagination">
            <Components.Pagination
              page={page}
              setPage={setPage}
              totalPages={reviews.maxPage}
            />
          </div>
        )}
      </div>
      <div className="col-12 col-lg-6">
        <Components.WriteReview product={product} />
      </div>
    </div>
  </Components.Fragment>
)

export default ReviewsTmpl;
