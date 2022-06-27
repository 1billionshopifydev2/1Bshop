/* eslint-disable */

import React, { useEffect } from 'react'

import GroupFooterTmpl from './GroupFooterTmpl'
import GroupTabNavTmpl from './GroupTabNavTmpl'
import GroupTypeTmpl from './GroupTypeTmpl'
import NoResultComponent from './NoResultComponent'
import UpholsteriesFilterTmpl from './UpholsteriesFilterTmpl'

const VariantModalTmpl = (props) => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    document.body.style.position = 'relative'
    document.body.style.height = '100%'
    $('#upholsteries-modal-content').scrollspy({ target: '#upholsteries-navbar' })

    return () => {
      const { href, search } = window.location
      const [productURl] = href.split(`/wizzard`)
      // window.history.replaceState('', '', `${productURl}${search}`)
      document.body.style.overflowY = 'unset'
    }
  }, [])

  return (
    <div className="container-modal">
      <div className="container-fluid p-0">
        <GroupTabNavTmpl groups={props.groups} closeModal={props.closeModal} scrollToGroup={props.scrollToGroup} groupActive={props.groupActive} />
        <div ref={props.modalBodyEl} className="modal-body" id="upholsteries-modal-content">
          <GroupsCollectionFilterTmpl {...props} />
        </div>
        <GroupFooterTmpl {...props} />
      </div>
    </div>
  )
}

export default VariantModalTmpl

const GroupsCollectionFilterTmpl = (props) => (
  <div className="container-fluid">
    <div className="row">
      <UpholsteriesFilterTmpl
        filtersActive={props.filtersActive}
        handleTypeFilterCheck={props.handleTypeFilterCheck}
        handleActivePrice={props.handleActivePrice}
        handleColorFilterClick={props.handleColorFilterClick}
        priceFilter={props.priceFilter}
        priceRangeV2={props.priceRangeV2}
        setPriceRange={props.setPriceRange}
        colorsFilter={props.colorsFilter}
        setColorFilter={props.setColorFilter}
        clearFilters={props.clearFilters}
      />
      <div className="col-lg-10">
        <div className="row">
          {
            props.groups.length ?
            props.groups.map(group => (
              <GroupCollectionTmpl key={group.id} group={group} {...props} />
            ))
            :
            <NoResultComponent />
          }
        </div>

      </div>
    </div>
  </div>
)

const GroupCollectionTmpl = (props) => {
  const { group } = props
  const groupId = group.groupLink

  return (
    <div className="col-lg-12 group " id={group.groupLink}>
      <div id={group.groupLink} className="row py-3">
        <div className="col-lg-10">
          <h2>{group.title}</h2>
        </div>
      </div>
      {group?.fabrics?.map((fabric) => (
        <GroupTypeTmpl key={`${groupId}_${fabric.id}`} id={`${groupId}_${fabric.id}`} groupName={group.title} fabric={fabric} {...props} />
      ))}
    </div>
  )
}
