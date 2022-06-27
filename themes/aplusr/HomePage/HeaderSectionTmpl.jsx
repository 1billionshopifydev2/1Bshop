import React from 'react'
import * as Components from '../../../src/components/Home/HeaderSection'

const HeaderSectionTmpl = props => (
  <section className="section-main bg padding-y mb-5">
    <div className="container">
      <div className="row">
        <aside className="d-none d-lg-block col-lg-3">
          <nav className="card">
            <ul className="menu-category">
              <li className="has-submenu">
                <Components.Link className="dropdown-item" to="/category/power-tools/">Power Tools</Components.Link>
                <ul className="submenu">
                  <li><Components.Link className="dropdown-item" to='/category/power-tools/engravers'>Engravers</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/power-tools/drills'>Drills</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/power-tools/wrenches'>Wrenches</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/power-tools/plumbing'>Plumbing</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/power-tools/wall-chaser'>Wall Chaser</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/power-tools/pneumatic-tools'>Pneumatic Tools</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/power-tools/milling-cutters'>Milling Cutters</Components.Link></li>
                </ul>
              </li>
              <li className="has-submenu"><Components.Link className="dropdown-item" to="/category/hand-tools/">Hand Tools</Components.Link>
                <ul className="submenu">
                  <li><Components.Link className="dropdown-item" to='/category/hand-tools/screwdrivers'>Screwdrivers</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/hand-tools/handsaws'>Handsaws</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/hand-tools/knives'>Knives</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/hand-tools/axes'>Axes</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/hand-tools/multitools'>Multitools</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/hand-tools/paint-tools'>Paint Tools</Components.Link></li>
                </ul>
              </li>
              <li className="has-submenu">
                <Components.Link className="dropdown-item" to="/category/machine-tools/">Machine Tools</Components.Link>
                <ul className="submenu">
                  <li><Components.Link className="dropdown-item" to='/category/machine-tools/thread-cutting'>Thread Cutting</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/machine-tools/chip-blowers'>Chip Blowers</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/machine-tools/sharpening-machines'>Sharpening Machines</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/machine-tools/pipe-cutters'>Pipe Cutters</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/machine-tools/slotting-machines'>Slotting Machines</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/machine-tools/lathes'>Lathes</Components.Link></li>
                </ul>
              </li>
              <li className="has-submenu"><Components.Link className="dropdown-item" to="/category/garden-equipment">Garden Equipment</Components.Link>
                <ul className="submenu">
                  <li><Components.Link className="dropdown-item" to='/category/garden-equipment/motor-pumps'>Motor Pumps</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/garden-equipment/chainsaws'>Chainsaws</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/garden-equipment/electric-saws'>Electric Saws</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/garden-equipment/brush-cutters'>Brush Cutters</Components.Link></li>
                </ul>
              </li>
              <li className="has-submenu"><Components.Link className="dropdown-item" to="/category/instruments">Instruments</Components.Link>
                <ul className="submenu">
                  <li><Components.Link className="dropdown-item" to='/category/instruments/welding-equipment'>Welding Equipment</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/power-tools'>Power Tools</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/hand-tools'>Hand Tools</Components.Link></li>
                  <li><Components.Link className="dropdown-item" to='/category/measuring-tool'>Measuring Tool</Components.Link></li>
                </ul>
              </li>
              <li className="has-submenu">
                <a href="#" className="dropdown-item">Brands</a>
                <ul className="submenu" style={{ columns: "2 auto" }}>
                  {Object.keys(props.BRANDS).map(key => (
                    <li key={key}>
                      <Components.Link
                        to={props.BRANDS[key].handle}
                        className="dropdown-item"
                      >
                        {props.BRANDS[key].title}
                      </Components.Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="col-12 col-lg-9">
          <div className="block-slideshow block-slideshow--layout--with-departments mb-0">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="block-slideshow__body">
                    {props.data.banner.slides.length > 1 && (
                      <div className="owl-carousel">
                        {props.data.banner.slides.map(item => (
                          <Components.Link className="block-slideshow__slide" key={item.id} to={item.cta.path}>
                            <div className="block-slideshow__slide-image block-slideshow__slide-image--desktop">
                              <img src={item.image.desktop} alt={item.title} loading="lazy" width="860px" height="395px" /> 
                            </div>
                            <div className="block-slideshow__slide-image block-slideshow__slide-image--mobile" style={{ backgroundImage: `url(${item.image.mobile})` }}></div>
                            <div className="block-slideshow__slide-content">
                              <div className="block-slideshow__slide-title" dangerouslySetInnerHTML={{ __html: item.title }} />
                              <div className="block-slideshow__slide-text" dangerouslySetInnerHTML={{ __html: item.description }} />
                              <div className="block-slideshow__slide-button">
                                <span className="btn btn-primary">{item.cta.label}</span>
                              </div>
                            </div>
                          </Components.Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default HeaderSectionTmpl
