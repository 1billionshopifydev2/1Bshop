import React from 'react'
import Link from '@b2s_core/src/utils/Link'

import { BlogCard } from '../../../src/components/BlogPages/BlogCardCore'

import { slugify } from '../../../src/b2s_core/src/utils/helpers'

const LatestNewsTmpl = ({ blogData }) => (
  <section id="shopify-section-6">
    <div className="container">
      <hr className="border border-dark" />
      <div className="row">
        <div className="col">
          <h2 className="mb-5">
            <Link to="/blogs/the-edit"> Read The Edit. </Link>
          </h2>
        </div>
        <div className="col-auto">
          <div className="mb-5">
            <Link to="/blogs/the-edit" className="fw-500">Read more →</Link>
          </div>
        </div>
      </div>
      <div className="row">
        {
          blogData.map(({ node }, i) => (
            <div key={i} className="col-lg-4 mb-5">
              <BlogCard
                imageSrc={node.hero.localFile.childImageSharp.fluid}
                title={node.Title}
                slug={node.slug}
                description={node.abstract}
                authorFirstLastName={node.author}
                publishedAt={node.published_at}
                category={node.Title}
                cardWithHover
              />
            </div>
          ))
        }
      </div>
    </div>
  </section>
)

export default LatestNewsTmpl