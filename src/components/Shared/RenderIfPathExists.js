import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

const RenderIfPathExists = ({ data, path, children, fallback = null }) => {
  const pages =
    data && data.allSitePage && data.allSitePage.edges
      ? data.allSitePage.edges.map(edge => edge.node)
      : []
  return pages.some(page => page.path === path) ? (
    <>{children}</>
  ) : (
    <>{fallback}</>
  )
}
RenderIfPathExists.propTypes = {
  data: PropTypes.shape({
    allSitePage: PropTypes.object.isRequired,
  }),
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  fallback: PropTypes.any,
}
const RenderIfPathExistsQuery = props => (
  <StaticQuery
    query={graphql`
      query {
        allSitePage {
          edges {
            node {
              path
            }
          }
        }
      }
    `}
    render={data => (
      <RenderIfPathExists data={data} {...props}></RenderIfPathExists>
    )}
  />
)
export default RenderIfPathExistsQuery
