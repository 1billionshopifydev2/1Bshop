import React from 'react'
import * as Components from '../../../../src/components/Header/Compare/CompareIcon'


const CompareIconTmpl = props => (
  <div className={props.className}>
    {props.isMobile ? (
      <Components.Link to="/compare">
        <div className="icontext">
          <div className="icon">
            <i className="icon-xs rounded-circle border fa fa-chart-bar"></i>
            <span className="notify">{props.qty}</span>
          </div>
        </div>
      </Components.Link>
    ) : (
      <a href="#" data-toggle="dropdown" data-offset="0,30">
        <div className="icontext">
          <div className="icon">
            <i className="icon-sm rounded-circle border fa fa-chart-bar"></i>
            <span className="notify">{props.qty}</span>
          </div>
        </div>
      </a>
    )}
    {props.comparelist && props.products && (
      <div className="dropdown-menu dropdown-menu-right p-3">
        <div className="dropcart__body">
          {props.products.length > 0 ? (
            <>
              <div className="dropcart__products-list pb-0">
                {props.products.map((item, index) => (
                  <Components.CompareProduct key={index} item={item} />
                ))}
              </div>
              <hr className="dropdown-divider" />
              <div className="text-center pt-0">
                <Components.Link
                  className="btn btn-primary text-white mx-auto"
                  to="/compare"
                >
                  View Compare List
                </Components.Link>
              </div>
            </>
          ) : (
            <div className="text-center">Your compare list is empty.</div>
          )}
        </div>
      </div>
    )}
  </div>
)

export default CompareIconTmpl
