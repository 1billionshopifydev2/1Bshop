import React from 'react'

import * as Components from 'src/utils/shared'

const DesignerPageTmpl = ({ data, title }) => {
  return (
    <Components.Layout>
      <Components.SEO title={title} />
      <div className="page designers-appendix">
        <div className="container2">
          <div className="alphabet">
            {
              data.map(link => (
                <React.Fragment key={link.title}>
                  <a href={`#${link.title}`} key={link.title}>
                    {link.title}
                  </a>
                  <br />
                </React.Fragment>
              ))
            }
          </div>
          <div className="container">
            <div className="row">
              <hr className="border-dark border mx-0 my-3" />
              <h1 className="px-0">{title}</h1>
              <div className="appendix col-12 pt-3 px-0 pb-4">
                {
                  data.map(link => (
                    Boolean(link.children.length) &&
                    <div key={link.title} className="pb-3">
                      <div id={link.title.toUpperCase()} className="linkedLetter" />
                      <h1 className="pb-1">{link.title.toUpperCase()}</h1>
                      {
                        link.children.map(sublink => (
                          sublink.title !== '#' &&
                          <Components.Link key={sublink.title} to={sublink.url}><p>{sublink.title}</p></Components.Link>
                        ))
                      }
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </Components.Layout>
  )
}

export default DesignerPageTmpl