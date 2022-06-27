import React from 'react'
import * as Components from '../../../../src/components/Product/Shared/ReviewsStats'


const ReviewsTmpl = (props) => {
  if (!props.rating) {
    return (
      <Components.ReviewsStatsFallback handle={props.handle} inCard={props.inCard} onClick={props.onClick} />
    )
  }

  if (props.inCard) {
    return (
      <div className="rating-wrap">
        <ul className="rating-stars d-flex align-items-center">
          {[...new Array(5)].map((star, index) =>
            ((props.rating.total > 0 ? props.rating.average : 0) > index) ?
              <Components.Fragment key={index}>
                <i className="fa fa-star filled"></i>
              </Components.Fragment> : <Components.Fragment key={index}>
                <i className="fa fa-star empty"></i>
              </Components.Fragment>
          )}
          <span className="ml-2 text-muted text-dark">({props.rating.total})</span>
        </ul>
      </div>
    )
  } else {
    return (
      <div className="rating-wrap d-flex mb-3">
        <div className="rating-stars mr-2">
          {[...new Array(5)].map((star, index) =>
            ((props.rating.total > 0 ? props.rating.average : 0) > index) ?
              <Components.Fragment key={index}>
                <i className="fa fa-star filled"></i>
              </Components.Fragment> : <Components.Fragment key={index}>
                <i className="fa fa-star empty"></i>
              </Components.Fragment>
          )}
        </div>
        <div className="product__rating-legend">
          <Components.Link
            to={props.getProductUrlFromHandle(props.handle) + '#reviews'}
            onClick={props.onClick}
            state={{ activeReviews: true }}
            className="text-dark"
          >
            ({props.rating.total})
          </Components.Link>
          <span>/</span>
          <Components.Link
            to={props.getProductUrlFromHandle(props.handle) + '#reviews'}
            onClick={props.onClick}
            state={{ activeReviews: true }}
            className="text-dark"
          >
            Write A Review
          </Components.Link>
        </div>
      </div>
    )
  }
}


export default ReviewsTmpl
