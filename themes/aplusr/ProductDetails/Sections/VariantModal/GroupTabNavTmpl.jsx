/* eslint-disable */

import React from 'react'

const GroupTabNavTmpl = (props) => (
  <div className="row no-gutters">
    <div className="col p-0">
      <nav id="upholsteries-navbar">
        <ul id="upholstery-groups-anchors" className="nav mx-3">
          {props.groups.map((group, i) => (
            <li key={i} className="nav-item">
              <a
                onClick={(event) => {
                  event.preventDefault()
                  props.scrollToGroup(group.groupLink)
                }}
                className={`nav-link p-1 m-1 m-lg-3`}
                href={`#${group.groupLink}`}
              >
                {group.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
    <div className="col-auto p-0">
      <a onClick={props.closeModal} className="d-block p-3" data-dismiss="modal" href="#upholstery">
        <svg className="d-block" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" width="20" height="20">
          <title>Close</title>
          <polyline points="3,3 17,17"></polyline>
          <polyline points="3,17 17,3"></polyline>
        </svg>
      </a>
    </div>
  </div>
)

export default GroupTabNavTmpl
