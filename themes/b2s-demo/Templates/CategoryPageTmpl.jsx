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
      <div className="row">
        {category.products.map((product) => (
          <div className="col-4">
            <Link href={getProductPath(product.slug)} className="d-block">
              {product.title}<br />
              <img src={product.featured_image.url} alt={product.title} />
              <code>
                {JSON.stringify(product)}
              </code>
            </Link>
          </div>
        ))}
      </div>
      <SEO
        title={category.seo.title}
        description={category.seo.description}
      />
  
    </Layout>
  )
}

CategoryPageTmpl.propTypes = {
  category: CategoryType,
}

export default CategoryPageTmpl
