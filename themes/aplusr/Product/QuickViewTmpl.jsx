import React from 'react'
import * as Components from '../../../src/components/Product/QuickView'



const QuickViewTmpl = (props) =>
  <div className="quickview">
    <button
      id="quickview-modal-close"
      type="button"
      className="modal__close"
      onClick={props.closeModal}
    >
      <i className="fa fa-times" aria-hidden="true"></i>
    </button>
    <div
      className="card product-block product--layout--quickview"
      data-layout="quickview"
    >
      <div className="row no-gutters">
        <aside className="col-lg-6 border-right">
          <Components.Gallery
            images={props.images}
            title={props.title}
            variant={props.variant}
            badges={props.badges}
          />
        </aside>
        <main className="col-lg-6">
          <article className="content-body p-3 p-md-4">
            <h3 className="title" onClick={props.closeModal}>
              <Components.Link
                to={props.productURL}
                state={{ variantId: props.id }}
                onClick={props.closeModal}
                className="text-dark"
              >
                {props.title}
              </Components.Link>
            </h3>
            <Components.ReviewsStats
              rating={props.rating}
              handle={props.handle}
              onClick={props.closeModal}
            />
            <p className="content-body-short-description" dangerouslySetInnerHTML={{ __html: props.shortDescription }} />
            <ul className="d-flex flex-column flex-md-row list-unstyled">
              <li className="mr-3">
                <span className="text-muted">Availability: </span>
                {props.availableForSale ? (
                  <span className="text-success">In Stock</span>
                ) : (
                    <span className="text-danger">Out of Stock</span>
                  )}
              </li>
              {props.vendor && (
                <li className="mr-3">
                  <span className="text-muted">Brand: </span>
                  <Components.RenderIfPathExists
                    path={props.getProductVendorUrlFromVendor(props.vendor)}
                    fallback={<span>{props.vendor}</span>}
                  >
                    <Components.Link
                      to={props.getProductVendorUrlFromVendor(props.vendor)}
                      onClick={() => props.closeModal()}
                    >
                      {props.vendor}
                    </Components.Link>
                  </Components.RenderIfPathExists>
                </li>
              )}
              {props.sku && (
                <li className="mr-3">
                  <span className="text-muted">SKU: </span> {props.sku}
                </li>
              )}
            </ul>
            <form className="product__options">
              <Components.Options options={props.options} onChange={props.handleVariantChange} />
              <div className="form-group product__option">
                <h6
                  className="product__option-label"
                  htmlFor="product-quantity"
                >
                  Quantity
                  </h6>
                <Components.Quantity
                  variant={props.variant}
                  quantity={props.quantity}
                  setQuantity={props.setQuantity}
                />
              </div>
            </form>

            <div className="row mt-3 align-items-center">
              <div className="col-12 col-md-4">
                <Components.Prices
                  price={props.price}
                  old={props.oldPrice}
                  currency={props.currency}
                  quantity={props.quantity}
                  className="h4"
                />
              </div>
              <div className="col-12 col-md mt-3 mt-md-0 text-md-right actions-buttons">
                <button
                  type="button"
                  className="btn btn-primary mr-1 mb-2"
                  onClick={() => {
                    props.dispatch(props.addLineItem(props.id, props.quantity))
                    props.closeModal()
                  }}
                  disabled={!props.availableForSale}
                >
                  {props.availableForSale ? 'Add to Cart' : 'Out of stock'}
                  <i className="fas fa-shopping-cart pl-2"></i>
                </button>

                <Components.WishlistButton
                  className="btn btn-light mr-1 mb-2"
                  productId={props.productId}
                  productUrl={props.productURL}
                  isBtnView
                />
                <Components.CompareButton
                  className="btn btn-light mb-2"
                  productId={props.productId}
                  onClick={props.closeModal}
                  isBtnView
                />
              </div>
              <div className="col-12 mt-3 d-flex justify-content-md-end">
                <Components.Tags tags={props.tags} onClick={() => props.closeModal()} />
                <div className="product__share-links share-links"> 
                  <Components.Social
                    url={props.productURL}
                    img={
                      props.images && props.images.length > 0
                        ? props.resizedImgURL(props.images[0].originalSrc, 'large')
                        : null
                    }
                    title={props.title}
                  />
                </div>
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>
  </div>

export default QuickViewTmpl
