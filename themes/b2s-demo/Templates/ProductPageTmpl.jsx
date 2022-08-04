import React from 'react'
import { Layout } from '../../../src/components/Layout/Layout'
import SEO from '@b2storefront/b2s_core/dist/components/snippets/SEO'
import { useCustomJavascript } from '@b2storefront/b2s_core/dist/hooks/useCustomJavascript'
import { AddToHead } from '@b2storefront/b2s_core/dist/components/snippets/AddToHead'
import { JSONLD } from '@b2storefront/b2s_core/dist/components/snippets/JSONLD'
import { ProductType } from '@b2storefront/b2s_core/dist/types/product'
import { ProductVariantType } from '@b2storefront/b2s_core/dist/types/product-variant'
import { func, number } from 'prop-types'

/**
 * @param {ProductPageTmpl.propTypes} props
 **/
const ProductPageTmpl = (props) => {
  useCustomJavascript(() => {

  })

  return (
    <Layout>
      <SEO title={props.product.seo.title} description={props.product.seo.description} />
      <JSONLD type="product" data={props.product} />
      <AddToHead>

      </AddToHead>
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

          <div className="product">
            <div className="row">
              <div className="col-12 col-lg-6 product__images">
                <img src={props.selectedVariant.image.url || props.product.featured_image.url} alt={props.selectedVariant.title} />
              </div >
              <div className="col-12 col-lg-6 product__info">
                <div className="product__info--shipping">
                  <div className="product__info--shipping-item standart">
                    <span>Standard shipment</span>
                    Free within 3-6 business days
                  </div>
                  <div className="product__info--shipping-item express">
                    <span>Express delivery</span>
                    $35,00 available
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col">
                    <span className="badge badge-sale">Sale</span>
                  </div>
                  <div className="col">
                    <div className="product__info--model">
                      Product ID:
                      <span>{props.selectedVariant.sku}</span>
                    </div>
                  </div>
                </div>
                <h1>{props.product.title}</h1>
                <div className="row">
                  <div className="col product__info--price">
                    <span className="new-price">${props.selectedVariant.price}</span>
                    {!!props.selectedVariant.old_price && (
                      <span className="old-price">${props.selectedVariant.old_price}</span>
                    )}
                  </div>
                  <div className="col product__info--manufacturer">House my Brand</div>
                </div>
                <div className="product__info--options">
                  {props.product.options.map(option => (
                    <div className="product__info--options-item">
                      <div className="option-title">{option.name}:</div>
                      {option.name === 'Color' && (
                        <div className="option-list radio-color">
                          {option.values.map(value => (
                            <div className="form-check form-check-inline">
                              <label for={value}>
                                <input className="form-check-input" type="radio" name="color" id={value} value={value} onClick={() => props.handleSelectOption(option.id, value)} />
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                      {option.name !== 'Color' && (
                        <div className="option-list">
                          <select className="form-select form-select-inline" aria-label="Default select example" onChange={(e) => props.handleSelectOption(option.id, e.target.value)}>
                            <option selected>Select value</option>
                            {option.values.map(value => (
                              <option value={value}>{value}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="product__info--btns">
                  <div className="product__info--qty">
                    <div className="qty-title">Quantity:</div>
                    <div className="input-group">
                      <button className="btn btn-outline-secondary btn-minus" type="button" id="minus" onClick={props.decreaseQuantity}>
                        -
                      </button>
                      <input type="text" className="form-control" value={props.quantity} />
                      <button className="btn btn-outline-secondary btn-plus" type="button" id="plus" onClick={props.increaseQuantity}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="product__info--buy">
                    <button className="btn btn-primary" type="button" onClick={() => props.handleAddToCart(props.dispatch, props.selectedVariant.id, props.quantity)}>
                      Add to cart
                    </button>
                  </div>
                  <div className="product__info--wish">
                    <button className="btn btn-outline-secondary" type="button">
                      <img src="image/heart.svg" alt="" width="17" height="17" />
                    </button>
                  </div>
                </div>
              </div>
  </div >

  <div className="col-12">
    <ul className="nav nav-tabs" id="productTab" role="tablist">
      <li className="nav-item" role="presentation">
        <button className="nav-link active" id="desc-tab" data-bs-toggle="tab" data-bs-target="#desc-tab-pane" type="button" role="tab" aria-controls="desc-tab-pane" aria-selected="true">
          Description
        </button>
      </li>
      <li className="nav-item" role="presentation">
        <button className="nav-link" id="review-tab" data-bs-toggle="tab" data-bs-target="#review-tab-pane" type="button" role="tab" aria-controls="review-tab-pane" aria-selected="false">
          Reviews
        </button>
      </li>
    </ul>
    <div className="tab-content" id="productTabContent">
      <div className="tab-pane fade show active" id="desc-tab-pane" role="tabpanel" aria-labelledby="desc-tab" tabindex="0">
        <div className="row">
          <div className="col-12 col-lg-7 desc-details">
            <div className="desc-title">Details and product description</div>
            <div className="desc-text">
              <p>White Summer Vibes T-shirt in the uiKit line with a colorful print.</p>
              <p>Made of jersey cotton. T-shirt fits perfectly with jeans, pants or shorts.</p>
            </div>
          </div>
          <div className="col-12 col-lg-5 desc-materials">
            <div className="desc-title">Material(s) and care</div>
            <div className="desc-text">
              <p className="text-center">Body: 98% COTTON - 2% ELASTANE</p>
              <p className="text-center">
                <img src="image/material.png" alt="care" width="215" height="28" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="tab-pane fade" id="review-tab-pane" role="tabpanel" aria-labelledby="review-tab" tabindex="0">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="review__total">
              <div className="row justify-content-center">
                <div className="col-6 col-lg-4">
                  <div className="review__total--amount">4.5</div>
                  <div className="review__total--stars">
                    <span className="ratting-star"></span>
                    <span className="ratting-star"></span>
                    <span className="ratting-star"></span>
                    <span className="ratting-star"></span>
                    <span className="ratting-star ratting-star-o"></span>
                  </div>
                  <div className="review__total--qty">
                    <span>81 all opinions</span>
                  </div>
                </div>
                <div className="col-6 col-lg-4 review__total--bar">
                  <div className="review__progress">
                    <span className="ratting-star"></span>
                    <span>1</span>
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div className="review__progress">
                    <span className="ratting-star"></span>
                    <span>2</span>
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div className="review__progress">
                    <span className="ratting-star"></span>
                    <span>3</span>
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" css="width: 10%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div className="review__progress">
                    <span className="ratting-star"></span>
                    <span>4</span>
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" css="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  <div className="review__progress">
                    <span className="ratting-star"></span>
                    <span>5</span>
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" css="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
                <div className="col-12 review__total--btn">
                  <button className="btn btn-primary" type="button">
                    Add opinion
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="review__item">
              <div className="review__item--img">
                <img src="image/autor-1.png" alt="John Doe" />
              </div>
              <div className="review__item--text">
                <div className="review__item--autor">John Doe</div>
                <div className="review__item--ratting">
                  <span className="ratting-star"></span>
                  <span className="ratting-star"></span>
                  <span className="ratting-star"></span>
                  <span className="ratting-star"></span>
                  <span className="ratting-star"></span>
                </div>
                <div className="review__item--desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>
              </div>
            </div>
            <div className="review__item">
              <div className="review__item--img">
                <img src="image/autor-2.png" alt="Eveline Gosok" />
              </div>
              <div className="review__item--text">
                <div className="review__item--autor">Eveline Gosok</div>
                <div className="review__item--ratting">
                  <span className="ratting-star"></span>
                  <span className="ratting-star"></span>
                  <span className="ratting-star"></span>
                  <span className="ratting-star"></span>
                  <span className="ratting-star ratting-star-o"></span>
                </div>
                <div className="review__item--desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem</div>
              </div>
            </div>
            <div className="review__item">
              <div className="review__item--img">
                <img src="image/autor-3.png" alt="Anne Okombo" />
              </div>
              <div className="review__item--text">
                <div className="review__item--autor">Anne Okombo</div>
                <div className="review__item--ratting">
                  <span className="ratting-star"></span>
                  <span className="ratting-star"></span>
                  <span className="ratting-star"></span>
                  <span className="ratting-star"></span>
                  <span className="ratting-star ratting-star-o"></span>
                </div>
                <div className="review__item--desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
          </div >

          <div className="product__featured">
            <div className="product__list--head">
              <h2 className="product__list--title">Selected just for you</h2>
              <div className="product__list--more">
                <button className="btn btn-outline-secondary" type="button">
                  Show more
                </button>
              </div>
            </div>
            <div className="swiper product__list">
              <div className="swiper-wrapper">
                <div className="swiper-slide product__item">
                  <div className="product__item--image">
                    <a href="#">
                      <img src="image/item-1.webp" alt="T-Shirt Summer Vibes" width="272" height="385" />
                    </a>
                    <span className="badge badge-sale">Sale</span>
                  </div>
                  <div className="product__item--name">
                    <a href="#">T-Shirt Summer Vibes</a>
                  </div>
                  <div className="product__item--price">
                    <span className="new-price">$89.99</span>
                    <span className="old-price">$119.99</span>
                  </div>
                </div>
                <div className="swiper-slide product__item">
                  <div className="product__item--image">
                    <a href="#">
                      <img src="image/item-2.webp" alt="Loose Knit 3/4 Sleeve" width="272" height="385" />
                    </a>
                  </div>
                  <div className="product__item--name">
                    <a href="#">Loose Knit 3/4 Sleeve</a>
                  </div>
                  <div className="product__item--price">$119.99</div>
                </div>
                <div className="swiper-slide product__item">
                  <div className="product__item--image">
                    <a href="#">
                      <img src="image/item-3.webp" alt="Basic Slim Fit T-Shirt" width="272" height="385" />
                    </a>
                  </div>
                  <div className="product__item--name">
                    <a href="#">Basic Slim Fit T-Shirt</a>
                  </div>
                  <div className="product__item--price">$79.99</div>
                </div>
                <div className="swiper-slide product__item">
                  <div className="product__item--image">
                    <a href="#">
                      <img src="image/item-4.webp" alt="Loose Textured T-Shirt" width="272" height="385" />
                    </a>
                  </div>
                  <div className="product__item--name">
                    <a href="#">Loose Textured T-Shirt</a>
                  </div>
                  <div className="product__item--price">$119.99</div>
                </div>
                <div className="swiper-slide product__item">
                  <div className="product__item--image">
                    <a href="#">
                      <img src="image/item-5.webp" alt="Premium Dress Shirt" width="272" height="385" />
                    </a>
                  </div>
                  <div className="product__item--name">
                    <a href="#">Premium Dress Shirt</a>
                  </div>
                  <div className="product__item--price">$119.99</div>
                </div>
              </div>
            </div>
            <div className="product__list--navigation">
              <span className="product__list--navigation-prev"></span>
              <span className="product__list--navigation-next"></span>
            </div>
          </div>

          <div className="sibscribe">
            <div className="row">
              <div className="col-12 col-lg-5 sibscribe__desc">Subscribe to our newsletter and receive exclusive offers every week</div>
              <div className="col-12 col-lg-5 sibscribe__form">
                <form className="row">
                  <div className="col-12 col-md-4 col-lg">
                    <input type="email" className="form-control" id="email" placeholder="Enter your email" />
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
        </div >
      </main >
    </Layout >
  )
}

export const ProductHeadScripts = ({ product }) => (
  <>

  </>
)

ProductPageTmpl.propTypes = {
  product: ProductType,
  selectedVariant: ProductVariantType,
  handleVariantChange: func,
  handleSelectOption: func,
  handleAddToCart: func,
  quantity: number,
  increaseQuantity: func,
  decreaseQuantity: func,
  updateQuantity: func,
}

export default ProductPageTmpl
