import React from 'react'
import { Layout } from '../../../src/components/Layout/Layout'
import SEO from '@b2storefront/b2s_core/dist/components/snippets/SEO'
import { CategoryType } from '@b2storefront/b2s_core/dist/types/category'
import { Link } from 'gatsby'
import { useCustomJavascript } from '@b2storefront/b2s_core/dist/hooks/useCustomJavascript'
import { arrayOf } from 'prop-types'
import { ProductType } from '@b2storefront/b2s_core/dist/types/product'
import { PageType } from '@b2storefront/b2s_core/dist/types/page'
import { getProductPath } from '@b2storefront/b2s_core/dist/utils/routing'

/** 
 * @param {BrandPageTmpl.propTypes} props
 **/
const BrandPageTmpl = ({ allCollections, allProducts, collections, products, page }) => {
  useCustomJavascript(() => {
    
  })

  return (
    <Layout>
      <SEO
        title={page.title}
        description=""
      />
      <section className="section section-home-page">
        <div className="container">
          <h1 className="text-center">Brand Page{page.title}</h1>
          <div dangerouslySetInnerHTML={{__html: page.content}}></div>

          {page.metafields["b2s.shoppable_content"].value && (
            <div>
              <h3>Adidas products</h3>
              {(page.metafields["b2s.assigned_collection"] && collections[page.metafields["b2s.assigned_collection"].value])&&(
                <div className="categories__list">
                {collections[page.metafields["b2s.assigned_collection"].value].products.map((product) => (
                  <div className="product__item" key={product.id}>
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
                      {!!product.prices.old_min && (
                        <span className="badge badge-sale">Sale</span>
                      )}
                    </div>
                    <div className="product__item--name">
                      <a href="#">{product.title}</a>
                    </div>
                    <div className="product__item--price">
                      <span className="new-price">${product.prices.min}</span>
                      {!!product.prices.old_min && (
                        <span className="old-price">${product.prices.old_min}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              )}
            </div>
          )}



        </div>
      </section>
    </Layout>
  )
}

BrandPageTmpl.propTypes = {
  collections: arrayOf(CategoryType),
  products: arrayOf(ProductType),
  page: PageType,
}

export default BrandPageTmpl
