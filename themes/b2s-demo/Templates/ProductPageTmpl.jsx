import React from 'react'
import {Layout} from '../../../src/components/Layout/Layout'
import SEO from '@b2storefront/b2s_core/dist/components/snippets/SEO'
import { useCustomJavascript } from '@b2storefront/b2s_core/dist/hooks/useCustomJavascript'
import { AddToHead } from '@b2storefront/b2s_core/dist/components/snippets/AddToHead'
import { JSONLD } from '@b2storefront/b2s_core/dist/components/snippets/JSONLD'
import { ProductType } from '@b2storefront/b2s_core/dist/types/product'

/** 
 * @param {ProductPageTmpl.propTypes} props
 **/
const ProductPageTmpl = ({ product }) => {  
  useCustomJavascript(() => {
    console.log('Hello World')
  })

  return (
    <Layout>
      <SEO title={product.seo.title} description={product.seo.description} />
      <JSONLD type="product" data={product} />
      <AddToHead>
        {/** Other custom code which should be aded to HEAD */}
      </AddToHead>
      <main class="main">
        <div class="container">
            <code>
              {JSON.stringify(product)}
            </code>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                <li class="breadcrumb-item breadcrumb-item--home"><a href="#">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Men`s Tops</a></li>
                <li class="breadcrumb-item"><a href="#">T-Shirt</a></li>          
                <li class="breadcrumb-item active" aria-current="page">T-Shirt Summer Vibes</li>
                </ol>
            </nav>

            <div class="product">
                <div class="row">
                    <div class="col-12 col-lg-6 product__images">
                        <div id="mobileplaceholder" class="row product__images--wrapper">
                            <div class="col-auto swiper product__images--info swiper-initialized swiper-horizontal swiper-pointer-events swiper-backface-hidden">
                                <div class="swiper-wrapper" id="swiper-wrapper-7109d39cb5578cb6d" aria-live="polite" css="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">
                                    <div class="swiper-slide swiper-slide-active" role="group" aria-label="1 / 1"  css="width: 100%;">
                                        <img src="image/product-1.webp" class="swiper-lazy swiper-lazy-loaded" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                    </div>                                                                                                  
                                </div>
                                <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal swiper-pagination-lock"><span class="swiper-pagination-bullet swiper-pagination-bullet-active" tabindex="0" role="button" aria-label="Go to slide 1" aria-current="true" css="width: 319px;"></span></div>
                            <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
                        </div>


                        
                        <div id="swipernormal" class="row product__images--wrapper">
                            <div class="col-auto swiper product__images--tumbs">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">
                                        <img src="image/product-1.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-2.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-3.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-1.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-2.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-3.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-1.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-2.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-3.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-1.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-2.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-3.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                </div>
                                <span class="product__images--tumbs-navigation-prev"></span>
                                <span class="product__images--tumbs-navigation-next"></span>                                
                            </div>
                            <div class="col-auto swiper product__images--info">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">
                                        <img src="image/product-1.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-2.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-3.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-1.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-2.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-3.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-1.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-2.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-3.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-1.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-2.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>
                                    <div class="swiper-slide">
                                        <img src="image/product-3.webp" class="swiper-lazy" alt="T-Shirt Summer Vibes" width="720" height="720" />
                                        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                    </div>                                                                                                            
                                </div>
                                <div class="swiper-pagination"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6 product__info">
                        <div class="product__info--shipping">
                            <div class="product__info--shipping-item standart">
                                <span>Standard shipment</span>
                                Free within 3-6 business days
                            </div>
                            <div class="product__info--shipping-item express">
                                <span>Express delivery</span>
                                $35,00 available
                            </div>                            
                        </div> 
                        <div class="row align-items-center">
                            <div class="col">
                                <span class="badge badge-sale">Sale</span>
                            </div>
                            <div class="col">
                                <div class="product__info--model">
                                    Product ID:
                                    <span>261311</span>
                                </div>
                            </div>
                        </div>
                        <h1>T-Shirt Summer Vibes</h1>
                        <div class="row">
                            <div class="col product__info--price">
                                <span class="new-price">$89.99</span>
                                <span class="old-price">$119.99</span>
                            </div>
                            <div class="col product__info--manufacturer">
                                House my Brand
                            </div>                            
                        </div>
                        <div class="product__info--options">
                            <div class="product__info--options-item">
                                <div class="option-title">
                                    Color:
                                </div>
                                <div class="option-list radio-color">
                                    <div class="form-check form-check-inline">
                                        <label for="black">
                                            <input class="form-check-input" type="radio" name="color" id="black" value="black" />
                                        </label>
                                      </div>
                                      <div class="form-check form-check-inline">
                                        <label for="yellow">
                                            <input class="form-check-input" type="radio" name="color" id="yellow" value="yellow" />
                                        </label>
                                      </div>
                                      <div class="form-check form-check-inline">
                                        <label for="green">
                                            <input class="form-check-input" type="radio" name="color" id="green" value="green" />
                                        </label>
                                      </div>  
                                      <div class="form-check form-check-inline">
                                        <label for="white">
                                            <input class="form-check-input" type="radio" name="color" id="white" value="white" />
                                        </label>
                                      </div>                                                                            
                                </div>
                            </div>
                            <div class="product__info--options-item">
                                <div class="option-title">
                                    Size: <span class="size-modal-link" data-bs-toggle="modal" data-bs-target="#sizeModal">See size table</span>
                                </div>
                                <div class="option-list">
                                    <select class="form-select form-select-inline" aria-label="Default select example">
                                        <option selected>Choose size</option>
                                        <option value="1">XS</option>
                                        <option value="2">S</option>
                                        <option value="3">L</option>
                                      </select>
                                </div>
                            </div>
                        </div>
                        <div class="product__info--btns">
                            <div class="product__info--qty">
                                <div class="qty-title">Quantity:</div>
                                <div class="input-group">
                                    <button class="btn btn-outline-secondary btn-minus" type="button" id="minus">-</button>
                                    <input type="text" class="form-control" value="1" />
                                    <button class="btn btn-outline-secondary btn-plus" type="button" id="plus">+</button>
                                  </div>
                            </div>
                            <div class="product__info--buy">
                                <button class="btn btn-primary" type="button">Add to cart</button>
                            </div>
                            <div class="product__info--wish">
                                <button class="btn btn-outline-secondary" type="button"><img src="image/heart.svg" alt="" width="17" height="17" /></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12">
                    <ul class="nav nav-tabs" id="productTab" role="tablist">
                        <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="desc-tab" data-bs-toggle="tab" data-bs-target="#desc-tab-pane" type="button" role="tab" aria-controls="desc-tab-pane" aria-selected="true">Description</button>
                        </li>
                        <li class="nav-item" role="presentation">
                        <button class="nav-link" id="review-tab" data-bs-toggle="tab" data-bs-target="#review-tab-pane" type="button" role="tab" aria-controls="review-tab-pane" aria-selected="false">Reviews</button>
                        </li>
                    </ul>
                    <div class="tab-content" id="productTabContent">
                        <div class="tab-pane fade show active" id="desc-tab-pane" role="tabpanel" aria-labelledby="desc-tab" tabindex="0">
                           <div class="row">
                            <div class="col-12 col-lg-7 desc-details">
                                <div class="desc-title">
                                    Details and product description
                                </div>
                                <div class="desc-text">
                                    <p>White Summer Vibes T-shirt in the uiKit line with a colorful print.</p>
                                    <p>Made of jersey cotton. T-shirt fits perfectly with jeans, pants or shorts.</p>
                                </div>
                            </div>
                            <div class="col-12 col-lg-5 desc-materials">
                                <div class="desc-title">
                                    Material(s) and care
                                </div>
                                <div class="desc-text">
                                    <p class="text-center">Body: 98% COTTON - 2% ELASTANE</p>
                                    <p class="text-center"><img src="image/material.png" alt="care" width="215" height="28" /></p>
                                </div>
                            </div>                            
                           </div>
                        </div>
                        <div class="tab-pane fade" id="review-tab-pane" role="tabpanel" aria-labelledby="review-tab" tabindex="0">
                            <div class="row">
                                <div class="col-12 col-lg-6">
                                    <div class="review__total">
                                        <div class="row justify-content-center">
                                            <div class="col-6 col-lg-4">
                                                <div class="review__total--amount">4.5</div>
                                                <div class="review__total--stars">
                                                    <span class="ratting-star"></span>
                                                    <span class="ratting-star"></span>
                                                    <span class="ratting-star"></span>
                                                    <span class="ratting-star"></span>
                                                    <span class="ratting-star ratting-star-o"></span>
                                                </div>
                                                <div class="review__total--qty"><span>81 all opinions</span></div>
                                            </div>
                                            <div class="col-6 col-lg-4 review__total--bar">
                                                <div class="review__progress">
                                                    <span class="ratting-star"></span>
                                                    <span>1</span>
                                                    <div class="progress">
                                                        <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                                <div class="review__progress">
                                                    <span class="ratting-star"></span>
                                                    <span>2</span>
                                                    <div class="progress">
                                                        <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                                <div class="review__progress">
                                                    <span class="ratting-star"></span>
                                                    <span>3</span>
                                                    <div class="progress">
                                                        <div class="progress-bar" role="progressbar" css="width: 10%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                                <div class="review__progress">
                                                    <span class="ratting-star"></span>
                                                    <span>4</span>
                                                    <div class="progress">
                                                        <div class="progress-bar" role="progressbar" css="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                                <div class="review__progress">
                                                    <span class="ratting-star"></span>
                                                    <span>5</span>
                                                    <div class="progress">
                                                        <div class="progress-bar" role="progressbar" css="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>                                                                                                                                             
                                            </div>
                                            <div class="col-12 review__total--btn">
                                                <button class="btn btn-primary" type="button">Add opinion</button>
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-lg-6">
                                    <div class="review__item">
                                        <div class="review__item--img"><img src="image/autor-1.png" alt="John Doe" /></div>
                                        <div class="review__item--text">
                                            <div class="review__item--autor">John Doe</div>
                                            <div class="review__item--ratting">
                                                <span class="ratting-star"></span>
                                                <span class="ratting-star"></span>
                                                <span class="ratting-star"></span>
                                                <span class="ratting-star"></span>
                                                <span class="ratting-star"></span>
                                            </div>
                                            <div class="review__item--desc">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                            </div>
                                        </div>
                                    </div>
                                    <div class="review__item">
                                        <div class="review__item--img"><img src="image/autor-2.png" alt="Eveline Gosok" /></div>
                                        <div class="review__item--text">
                                            <div class="review__item--autor">Eveline Gosok</div>
                                            <div class="review__item--ratting">
                                                <span class="ratting-star"></span>
                                                <span class="ratting-star"></span>
                                                <span class="ratting-star"></span>
                                                <span class="ratting-star"></span>
                                                <span class="ratting-star ratting-star-o"></span>
                                            </div>
                                            <div class="review__item--desc">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                            </div>
                                        </div>
                                    </div>
                                    <div class="review__item">
                                        <div class="review__item--img"><img src="image/autor-3.png" alt="Anne Okombo" /></div>
                                        <div class="review__item--text">
                                            <div class="review__item--autor">Anne Okombo</div>
                                            <div class="review__item--ratting">
                                                <span class="ratting-star"></span>
                                                <span class="ratting-star"></span>
                                                <span class="ratting-star"></span>
                                                <span class="ratting-star"></span>
                                                <span class="ratting-star ratting-star-o"></span>
                                            </div>
                                            <div class="review__item--desc">
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                            </div>
                                        </div>
                                    </div>                                                                        
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>          
            </div>

            <div class="product__featured">
                <div class="product__list--head">
                    <h2 class="product__list--title">Selected just for you</h2>
                    <div class="product__list--more">
                        <button class="btn btn-outline-secondary" type="button">Show more</button>
                    </div>                
                </div>
                <div class="swiper product__list">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide product__item">
                            <div class="product__item--image">
                                <a href="#"><img src="image/item-1.webp"alt="T-Shirt Summer Vibes" width="272" height="385" /></a>
                                <span class="badge badge-sale">Sale</span>
                            </div>
                            <div class="product__item--name">
                                <a href="#">T-Shirt Summer Vibes</a>
                            </div>
                            <div class="product__item--price">
                                <span class="new-price">$89.99</span>
                                <span class="old-price">$119.99</span>                        
                            </div>
                        </div>
                        <div class="swiper-slide product__item">
                            <div class="product__item--image">
                                <a href="#"><img src="image/item-2.webp" alt="Loose Knit 3/4 Sleeve" width="272" height="385" /></a>
                            </div>
                            <div class="product__item--name">
                                <a href="#">Loose Knit 3/4 Sleeve</a>
                            </div>
                            <div class="product__item--price">
                                $119.99
                            </div>
                        </div>
                        <div class="swiper-slide product__item">
                            <div class="product__item--image">
                                <a href="#"><img src="image/item-3.webp" alt="Basic Slim Fit T-Shirt" width="272" height="385" /></a>
                            </div>
                            <div class="product__item--name">
                                <a href="#">Basic Slim Fit T-Shirt</a>
                            </div>
                            <div class="product__item--price">
                                $79.99
                            </div>
                        </div>
                        <div class="swiper-slide product__item">
                            <div class="product__item--image">
                                <a href="#"><img src="image/item-4.webp" alt="Loose Textured T-Shirt" width="272" height="385" /></a>
                            </div>
                            <div class="product__item--name">
                                <a href="#">Loose Textured T-Shirt</a>
                            </div>
                            <div class="product__item--price">
                                $119.99
                            </div>
                        </div>
                        <div class="swiper-slide product__item">
                            <div class="product__item--image">
                                <a href="#"><img src="image/item-5.webp" alt="Premium Dress Shirt" width="272" height="385" /></a>
                            </div>
                            <div class="product__item--name">
                                <a href="#">Premium Dress Shirt</a>
                            </div>
                            <div class="product__item--price">
                                $119.99
                            </div>
                        </div>                                                                
                    </div>

                </div>
                <div class="product__list--navigation">
                    <span class="product__list--navigation-prev"></span>
                    <span class="product__list--navigation-next"></span>
                </div>
            </div>

            <div class="sibscribe">
                <div class="row">
                    <div class="col-12 col-lg-5 sibscribe__desc">
                        Subscribe to our newsletter and receive exclusive offers every week
                    </div>
                    <div class="col-12 col-lg-5 sibscribe__form">
                        <form class="row">
                            <div class="col-12 col-md-4 col-lg">
                              <input type="email" class="form-control" id="email" placeholder="Enter your email" />
                            </div>
                            <div class="col-12 col-md-4 col-lg">
                              <button type="submit" class="btn btn-primary">Subscribe</button>
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

ProductPageTmpl.propTypes = {
    product: ProductType,
}

export default ProductPageTmpl
