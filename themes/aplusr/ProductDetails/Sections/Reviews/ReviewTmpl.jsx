import React from 'react'
import * as Components from '../../../../../src/components/ProductDetails/Sections/Reviews/Review'

const ReviewTmpl = ({ user, score, datePublished, body }) =>
  <li className="card mb-3">
    <div className="review card-body">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div className="icon icon-sm rounded-circle mr-3">
            <Components.LetterAvatar text={user} />
          </div>
          <div>
            <h6 className="title">{Components.safeUnscape(user)}</h6>
            <div className="rating-wrap">
              <ul className="rating-stars d-flex align-items-center">
                {[...new Array(5)].map((star, index) =>
                  score > index ?
                    <Components.Fragment key={index}>
                      <i className="fa fa-star filled"></i>
                    </Components.Fragment> : <Components.Fragment key={index}>
                      <i className="fa fa-star empty"></i>
                    </Components.Fragment>
                )}
                <span>{Components.getScoreText(score)}</span>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className="text-muted">
            {Components.moment(datePublished).format('D MMMM, YYYY')}
          </div>
        </div>
      </div>
      <div className="d-flex mt-3">
        <div>{Components.safeUnscape(body)}</div>
      </div>
    </div>
  </li>

export default ReviewTmpl