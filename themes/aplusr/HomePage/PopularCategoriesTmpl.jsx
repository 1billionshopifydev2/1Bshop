import React from 'react'
import * as Components from '../../../src/components/Home/PopularCategoriesSection'

const PopularCategoriesTmpl = props => (
  <div className="block padding-y-sm ">
    <div className="container">
      <header className="section-heading">
        <h3 className="section-title">Popular Categories</h3>
      </header>
      <div className="row">
        {props.CATEGORIES_LIST.map((cat, i) => (
          <div className="col-md-4 mb-4" key={i}>
            <Components.Link to={cat.url}>
              <div
                className="card-banner popular-categories"
                style={{ backgroundImage: `url(${cat.image})` }}
              >
                <article className="caption bottom">
                  <h5 className="card-title">{cat.title}</h5>
                  <p>{props.cutLongText(cat.desc, 100)}</p>
                  <span className="btn btn btn-warning">View more</span>
                </article>
              </div>
            </Components.Link>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default PopularCategoriesTmpl
