import React from 'react'
import { Layout } from '../../../src/components/Layout/Layout'
import SEO from '@b2storefront/b2s_core/dist/components/snippets/SEO'
import { CategoryType } from '@b2storefront/b2s_core/dist/types/category'
import { Link } from 'gatsby'
import { useCustomJavascript } from '@b2storefront/b2s_core/dist/hooks/useCustomJavascript'
import { arrayOf } from 'prop-types'
import { ProductType } from '@b2storefront/b2s_core/dist/types/product'
import { getProductPath } from '@b2storefront/b2s_core/dist/utils/routing'

/** 
 * @param {HomePageTmpl.propTypes} props
 **/
const HomePageTmpl = ({ allCollections, allProducts, collections, products }) => {
  useCustomJavascript(() => {
    
  })

  return (
    <Layout>
      <SEO
        title="My eCommerce"
        description=""
      />
      <section className="section section-home-page">
        <div className="container">
          <div>
            <h1>Product of the week</h1>
            <div>
              <Link to={getProductPath(products['adidas-classic-backpack'].slug)}>
                {products['adidas-classic-backpack'].title}
              </Link>
              <img src={products['adidas-classic-backpack'].featured_image.url}></img>
              {products['adidas-classic-backpack'].description}
              {products['adidas-classic-backpack'].prices.min}
            </div>
          </div>
          <h1 className="text-center">{collections['sale'].title}</h1>
          <p className="text-center mb-5">See our best selling products NOW</p>
          <div className="categories__list">
            {collections['sale'].products.map((product) => (
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
        </div>
      </section>
    </Layout>
  )
}

HomePageTmpl.propTypes = {
  collections: arrayOf(CategoryType),
  products: arrayOf(ProductType),
}

export default HomePageTmpl
