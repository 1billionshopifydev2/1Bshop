/* eslint-disable */
import React from 'react'
import { last } from 'lodash'

import * as Components from 'src/components/ProductDetails/ProductDetailsCore'
import SuggestionItemTmpl from '@themes/aplusr/ProductDetails/Sections/SuggestionItemTmpl'
import EditButtons from '@themes/aplusr/EditButtons/EditButtons'

const ProductShopifySection = props => {
  const productId = last(props.productId.split('/'))
  const editStrapiUrl = `to-do`

  const scrollTo = (event, id) => {
    event.preventDefault();

    if (typeof window === 'undefined') {
      return
    }

    if (id && document.getElementById(id)) {
      document.getElementById(id).scrollIntoView()
    } else {
      window.scrollTo(0,0) 
    }
  }

  return (
    <div id="shopify-section-product" className="shopify-section">
      <div itemScope itemType="http://schema.org/Product">
        <meta itemProp="name" content={props.title} />
        <meta itemProp="brand" content={props.vendorTitle} />
        <meta itemProp="url" content={props.productUrl} />
        {props.images[0] && (
          <meta itemProp="image" content={props.images[0].originalSrc} />
        )}
        <meta
          itemProp="description"
          content={props.descriptionParts.description}
        />

        <div className="px-lg-1">
          <div className="container-fluid px-2">
            <div className="row g-0">
              <div className="col p-0">
                <ul className="nav fs-14">
                  <li className="nav-item">
                    <a href="#" className="nav-link" onClick={(e) => scrollTo(e, '')}>
                      Options
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#details" className="nav-link" onClick={(e) => scrollTo(e, 'details')}>
                      Details
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#details" className="nav-link" onClick={(e) => scrollTo(e, 'details')}>
                      Specifications
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#brand" className="nav-link" onClick={(e) => scrollTo(e, 'brand')}>
                      Brand + Designer
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row justify-content-between g-0">
              <Components.Gallery
                images={props.images}
                variant={props.variant}
                title={props.title}
              />

              <div className="col-lg-3 px-2">
                <p className="lead">
                  <Components.Link
                    className="d-inline-block"
                    to={`/collections/${props.brandHandle}`}
                  >
                    {props.brand}
                  </Components.Link>
                  {props.designer && ' × '}
                  {props.designer && (
                    <Components.Link to={`/collections/${props.designerHandle}`}>
                      {props.designer}
                    </Components.Link>
                  )}
                </p>

                <h1>{props.title}</h1>

                <Components.Prices
                  price={props.price}
                  old={props.old}
                  priceRangeV2={props.priceRangeV2}
                  currency={'USD'}
                  quantity={props.quantity}
                />

                <p
                  className={
                    'text-secondary pb-3' + (props.sku ? '' : ' mb-3')
                  }
                >
                  {props.sku && <>SKU: {props.sku}</>}
                </p>

                <Components.Options
                  groups={props.groups}
                  variantId={props.variantId}
                  availableForSale={props.availableForSale}
                  options={props.options}
                  onChange={props.handleVariantChange}
                />
                <button
                  className="btn btn-block btn-primary py-2"
                  disabled={
                    (props.hasUpholsteries && !props.upholsteriesLoaded) || !props.availableForSale
                  }
                  onClick={props.triggerAddToCartOrOpenModal}
                >
                  {
                    props.productButtonLabel
                  }
                </button>
                <button
                  style={{ display: 'none' }}
                  onClick={() => props.setShowModal(true)}
                >
                  Show Modal
                </button>
                {!!props.suggestionItem && (
                  <SuggestionItemTmpl
                    data={props.suggestionItem}
                    priceFormatter={props.priceFormatter}
                  />
                )}
                {(!!props.inventoryQuantity && props.inventoryQuantity > 0) && <div className="text-success text-center my-2">
                  In stock and ready for quick ship!
                </div>}
                {(!props.inventoryQuantity || props.inventoryQuantity <= 0) && props.variant.id && <div className="availability text-center my-2">
                  {props.availability || <>
                    Contact <a href="mailto:info@aplusrstore.com"><u>info@aplusrstore.com</u></a> for current lead times
                  </>}
                </div>}

                <EditButtons
                  editStrapiUrl={editStrapiUrl}
                  editShopifyUrl={`https://${process.env.SHOP_NAME}.myshopify.com/admin/products/${productId}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ProductShopifySection.propTypes = Components.componentPropTypes
ProductShopifySection.defaultProps = Components.componentDefaultProps

export default ProductShopifySection