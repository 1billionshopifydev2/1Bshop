import React from 'react'
import ReactMarkdown from 'react-markdown'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import * as Component from '../../../src/components/BrandPages/BrandPage'
import HeroCTATmpl from '../HomePage/HeroCTATmpl'
import ProductCardTmpl from '../Shared/ProductCardTmpl'
import ContentSection from '../../../src/components/ContentPages/ContentSections'

const BrandPageTmpl = ({ brand, collections }) => {
  return (
    <Component.Layout>
      <Component.SEO title={brand.seo.title} description={brand.seo.description} />
      <HeroCTATmpl hero={brand.hero} />
      <section className="logo-and-description__section">
        <div className="page">
          <div className="py-5">
            <div className="container">
              <div className="row">
                <div className="col-12 pb-3">
                  {
                    brand.logo &&
                    <img src={`${process.env.STRAPI_URL}${brand.logo.url}`} alt={brand.alternativeText} />
                  }
                </div>
                <div className="col-12 lead">
                  <ReactMarkdown>{brand.Description}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContentSection sections={brand.content_sections} />
      {
        collections?.map((collection, i) => (
          <section key={i} className="collection-products">
            <div className="container">
              <div className="row">
                <div className="col">
                  <hr className="border-dark border" />
                </div>
              </div>
              <div className="row ">
                <div className="col-6">
                  <a href={collection.collectionUrl}>
                    <h2 className="mb-5">{collection.collectionTitle}</h2>
                  </a>
                </div>
                <div className="col-6 d-flex justify-content-end">
                  {
                    collection.collectionLabel &&
                    <a href={collection.collectionUrl}>
                      <p className="fs-12"><strong>{`${collection.collectionLabel} →`}</strong></p>
                    </a>
                  }
                </div>
              </div>
              <div className="row">
                {
                  collection?.products?.map((product, i) => i < 50 && <ProductCardTmpl key={i} lg="3" product={product} />)
                }
              </div>
            </div>
          </section>
        ))
      }
      <section className="bottom-image">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {
                brand.bottom_img &&
                <LazyLoadImage
                  className="w-100 mt-5 mb-5"
                  src={`${process.env.STRAPI_URL}${brand.bottom_img.url}`}
                  alt={brand.bottom_img.alternativeText}
                  loading="lazy" />
              }
            </div>
          </div>
        </div>
      </section>
    </Component.Layout>
  )
}

export default BrandPageTmpl
