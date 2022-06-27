import React from 'react'
import * as Components from '../../../src/components/BlogPages/BlogSidebar/BlogSidebarCore'

 
const BlogSidebarTmpl = props => (
  <div className="col-12 col-lg-4 mt-5 mt-lg-0">
    <div className="blog-sidebar">
      <div ref={props.searchRef} className="card">
        <div className="card-body">
          <form method="get" className="mb-3" onSubmit={props.handleShowAll}>
            <div className="input-group">
              <input
                className="form-control"
                placeholder="Blog search..."
                type="search"
                value={props.search}
                name="q"
                onChange={props.handleSearchChange}
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">About Stroyka Blog</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            tincidunt, erat in malesuada aliquam, est erat faucibus purus, eget
            viverra nulla sem vitae neque. Quisque id sodales libero.
          </p>
          <ul className="list-menu d-flex">
            <li>
              <a href="#" target="_blank">
                <i className="fas fa-rss"></i>
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                <i className="fab fa-youtube"></i>
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#" target="_blank">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Categories</h5>
          <ul className="list-menu">
            {props.categories.edges.map(edge => (
              <li key={edge.node.id} className="with-icon">
                <Components.Link to={`/blogs/${props.getBlogHandleFromUrl(edge.node.url)}`}>
                  <i className="fa fa-chevron-right"></i>
                  {edge.node.title}
                </Components.Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Latest Posts</h5>
          <ul className="list-menu">
            {props.latestPosts.edges.map((p, i) => (
              <figure className="itemside mb-3" key={i}>
                <div className="aside">
                  <Components.Link to={`/blog/${props.getBlogHandleFromUrl(p.node.url)}`}>
                    <img
                      src={props.resizedImgURL(
                        props.get(p.node.image, 'src'),
                        '200x200'
                      )}
                      alt={p.node.title}
                      className="img-sm border"
                      loading="lazy"
                    />
                  </Components.Link>
                </div>
                <figcaption className="info align-self-start">
                  <p className="title mb-0">
                    <Components.Link
                      to={`/blogs/${props.getBlogHandleFromUrl(p.node.url)}`}
                    >
                      {p.node.title}
                    </Components.Link>
                  </p>
                  <span className="text-muted">{p.node.publishedAt}</span>
                </figcaption>
              </figure>
            ))}
          </ul>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Our Newsletter</h5>
          <p>
            Phasellus eleifend sapien felis, at sollicitudin arcu semper mattis.
            Mauris quis mi quis ipsum tristique lobortis. Nulla vitae est
            blandit rutrum.
          </p>
          <Components.Newsletter />
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Tags Cloud</h5>
          <ul className="list-menu d-flex flex-wrap">
            <li>
              <Components.Link
                to="/category/power-tools/"
                className="btn btn-light btn-sm"
              >
                Power Tool
              </Components.Link>
            </li>
            <li>
              <Components.Link to="/blog/new-arrivals" className="btn btn-light btn-sm">
                New Arrivals
              </Components.Link>
            </li>
            <li>
              <Components.Link
                to="/category/hand-tools/screwdrivers"
                className="btn btn-light btn-sm"
              >
                Screwdriver
              </Components.Link>
            </li>
            <li>
              <Components.Link
                to="/category/power-tools/wrenches"
                className="btn btn-light btn-sm"
              >
                Wrenches
              </Components.Link>
            </li>
            <li>
              <Components.Link
                to="/category/garden-equipment/chainsaws"
                className="btn btn-light btn-sm"
              >
                Chainsaws
              </Components.Link>
            </li>
            <li>
              <Components.Link to="/blogs/latest-news" className="btn btn-light btn-sm">
                Latest News
              </Components.Link>
            </li>
            <li>
              <Components.Link
                to="/blog/cordless-screwdrivers"
                className="btn btn-light btn-sm"
              >
                Cordless Screwdrivers
              </Components.Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)

BlogSidebarTmpl.propTypes = Components.componentPropTypes
BlogSidebarTmpl.defaultProps = Components.componentDefaultProps
export default BlogSidebarTmpl
