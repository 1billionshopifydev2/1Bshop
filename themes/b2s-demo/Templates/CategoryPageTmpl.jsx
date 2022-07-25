import React from 'react'
import { Layout } from '../../../src/components/Layout/Layout'
import SEO from '@b2storefront/b2s_core/dist/components/snippets/SEO'
import { CategoryType } from '@b2storefront/b2s_core/dist/types/category'
import { getProductPath } from '@b2storefront/b2s_core/dist/utils/routing'
import { Link } from 'gatsby'
import { useCustomJavascript } from '@b2storefront/b2s_core/dist/hooks/useCustomJavascript'

/** 
 * @param {CategoryPageTmpl.propTypes} props
 **/
const CategoryPageTmpl = ({ category }) => {
  useCustomJavascript(() => {
    
  })

  return (
    <Layout>
      <SEO
        title={category.seo.title}
        description={category.seo.description}
      />
      <main className="main">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item breadcrumb-item--home">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Men`s Tops</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">T-Shirt</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                T-Shirt Summer Vibes
              </li>
            </ol>
          </nav>
          <div className="row">
            <aside className="filter col-12 col-md-4 col-lg-3">
              <div className="filter__head">
                <div className="filter__head--title">Filters</div>
                <div className="filter__filter-btn">
                  <span className="" open="" onclick="toggleFilters()">
                    <img src="image/close.svg" alt="filters" />
                  </span>
                </div>
              </div>
              <div className="filter__item">
                <div className="filter__item--head">
                  <a
                    className="filter__item--title"
                    data-bs-toggle="collapse"
                    href="#collapseFilter-1"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseFilter-1"
                  >
                    <span>Product type</span>
                  </a>
                </div>
                <div
                  className="filter__item--content collapse show"
                  id="collapseFilter-1"
                >
                  <div className="check-block">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="flexCheck-1"
                      />
                      <label className="form-check-label" htmlFor="flexCheck-1">
                        T-Shirts <span>(411)</span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="flexCheck-2"
                      />
                      <label className="form-check-label" htmlFor="flexCheck-2">
                        Sweatshirts <span>(131)</span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="flexCheck-3"
                      />
                      <label className="form-check-label" htmlFor="flexCheck-3">
                        Tank Tops <span>(56)</span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="flexCheck-4"
                      />
                      <label className="form-check-label" htmlFor="flexCheck-4">
                        Dress shirts <span>(8)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter__item">
                <div className="filter__item--head">
                  <a
                    className="filter__item--title"
                    data-bs-toggle="collapse"
                    href="#collapseFilter-2"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseFilter-2"
                  >
                    <span>Price</span>
                  </a>
                </div>
                <div
                  className="filter__item--content collapse show"
                  id="collapseFilter-2"
                >
                  <div className="filter-price__labels">
                    <span id="filter-price-min-label" />
                    <span id="filter-price-max-label" />
                  </div>
                  <div id="filter-price__block" className="filter-price__block">
                    <input
                      id="filter-price"
                      data-slider-id="filter-price"
                      type="text"
                      data-slider-min={0}
                      data-slider-max={500}
                      data-slider-step={1}
                      data-slider-value={1}
                    />
                  </div>
                </div>
              </div>
              <div className="filter__item">
                <div className="filter__item--head">
                  <a
                    className="filter__item--title collapsed"
                    data-bs-toggle="collapse"
                    href="#collapseFilter-3"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseFilter-3"
                  >
                    <span>Collection</span>
                  </a>
                </div>
                <div
                  className="filter__item--content collapse"
                  id="collapseFilter-3"
                >
                  <div className="radio-block">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="collection-1"
                      />
                      <label className="form-check-label" htmlFor="collection-1">
                        Winter
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="collection-2"
                        defaultChecked=""
                      />
                      <label className="form-check-label" htmlFor="collection-2">
                        Spring
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="collection-3"
                      />
                      <label className="form-check-label" htmlFor="collection-3">
                        Summer
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="collection-4"
                        defaultChecked=""
                      />
                      <label className="form-check-label" htmlFor="collection-4">
                        Autumn
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter__item">
                <div className="filter__item--head">
                  <a
                    className="filter__item--title"
                    data-bs-toggle="collapse"
                    href="#collapseFilter-4"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseFilter-4"
                  >
                    <span>Size</span>
                  </a>
                </div>
                <div
                  className="filter__item--content collapse show"
                  id="collapseFilter-4"
                >
                  <div className="check-size">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="sizeCheck-1"
                      />
                      <label className="form-check-label" htmlFor="sizeCheck-1">
                        XS
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="sizeCheck-2"
                      />
                      <label className="form-check-label" htmlFor="sizeCheck-2">
                        S
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="sizeCheck-3"
                      />
                      <label className="form-check-label" htmlFor="sizeCheck-3">
                        M
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="sizeCheck-4"
                      />
                      <label className="form-check-label" htmlFor="sizeCheck-4">
                        L
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="sizeCheck-5"
                      />
                      <label className="form-check-label" htmlFor="sizeCheck-5">
                        XL
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="sizeCheck-6"
                      />
                      <label className="form-check-label" htmlFor="sizeCheck-6">
                        XXL
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter__item">
                <div className="filter__item--head">
                  <a
                    className="filter__item--title"
                    data-bs-toggle="collapse"
                    href="#collapseFilter-5"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseFilter-5"
                  >
                    <span>Color</span>
                  </a>
                </div>
                <div
                  className="filter__item--content collapse show"
                  id="collapseFilter-5"
                >
                  <div className="check-color">
                    <div className="form-check form-check-inline">
                      <label className="form-check-label" htmlFor="black">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="black"
                          id="black"
                          defaultValue="black"
                        />
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <label className="form-check-label" htmlFor="brown">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="brown"
                          id="brown"
                          defaultValue="brown"
                        />
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <label className="form-check-label" htmlFor="yellow">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="yellow"
                          id="yellow"
                          defaultValue="yellow"
                        />
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <label className="form-check-label" htmlFor="grey">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="grey"
                          id="grey"
                          defaultValue="grey"
                        />
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <label className="form-check-label" htmlFor="white">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="white"
                          id="white"
                          defaultValue="white"
                        />
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <label className="form-check-label" htmlFor="blue">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="blue"
                          id="blue"
                          defaultValue="blue"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            <div className="col-12 col-md-8 col-lg-9">
              <div className="categories__head">
                <h1 className="categories__name">
                  Men's Tops <span>(133)</span>
                </h1>
                <div className="categories__sort">
                  <div className="categories__sort--title">Show products:</div>
                  <select className="form-select">
                    <option selected="">9</option>
                    <option value={1}>30</option>
                    <option value={2}>60</option>
                    <option value={3}>120</option>
                  </select>
                  <div className="categories__sort--title">Sort:</div>
                  <select className="form-select">
                    <option selected="">popular</option>
                    <option value={1}>price</option>
                    <option value={2}>name</option>
                    <option value={3}>quantity</option>
                  </select>
                </div>
                <div className="categories__filter-btn">
                  <span className="open" onclick="toggleFilters()">
                    <img src="image/filters.svg" alt="filters" />
                  </span>
                </div>
              </div>
              <div className="categories__list">
                {category.products.map((product) => (
                  <div className="product__item">
                    <div className="product__item--image">
                      <Link href={getProductPath(product.slug)}>
                        <img
                          src={product.featured_image.url}
                          data-src={product.featured_image.url}
                          className="lazy"
                          alt={product.title}
                          width={272}
                          height={385}
                        />
                      </Link>
                      <span className="badge badge-sale">Sale</span>
                      <div className="product__item--wish">
                        <span className="wish active">
                          <img src="image/heart.svg" alt="" width={17} height={17} />
                        </span>
                      </div>
                    </div>
                    <div className="product__item--name">
                      <a href="#">T-Shirt Summer Vibes</a>
                    </div>
                    <div className="product__item--price">
                      <span className="new-price">$89.99</span>
                      <span className="old-price">$119.99</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="categories__pagination">
                <ul className="pagination">
                  <li className="page-item page-prev">
                    <a className="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  <li className="page-item active" aria-current="page">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item page-next">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="sibscribe">
            <div className="row">
              <div className="col-12 col-lg-5 sibscribe__desc">
                Subscribe to our newsletter and receive exclusive offers every week
              </div>
              <div className="col-12 col-lg-5 sibscribe__form">
                <form className="row">
                  <div className="col-12 col-md-4 col-lg">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="col-12 col-md-4 col-lg">
                    <button type="submit" className="btn btn-primary">
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

CategoryPageTmpl.propTypes = {
  category: CategoryType,
}

export default CategoryPageTmpl
