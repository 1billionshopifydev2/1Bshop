/* eslint-disable */

import React, { useEffect, useState } from 'react'

import { cutLongText, slugify } from '@b2s_core/src/utils/helpers'
import SwatchItem from './SwatchItem'

const GroupTypeTmpl = (props) => {
  const {
    device,
    fabric,
    id,
    group,
    vendor,
    swatchFromWizzard = false,
    fabricFromWizzard = false,
  } = props


  const descriptions = fabric?.description?.split('\n')
  const [accordionOpened, setAccordionOpened] = useState(false)
  const [wizzardSwatch, setWizzardSwatchSelected] = useState({})
  const fabricName = slugify(fabric.title)

  useEffect(() => {
    const wizzardSelectedSwatch = fabric.variants.find(
      ({ title }) =>
        swatchFromWizzard === slugify(title) && fabricFromWizzard === fabricName
    )

    if (wizzardSelectedSwatch) {
      setAccordionOpened(prevState => !prevState)
      setWizzardSwatchSelected(wizzardSelectedSwatch)
    }
  }, [])

  const handleViewMore = (event) => setAccordionOpened(prevState => !prevState)

  return (
    <div className="pb-5" data-fabric-id={`${group.groupLink}_${fabricName}`} id="accordionExampleThree" data-b2s={JSON.stringify({
      "productVendor": vendor,
      "groupStrapiId": group.groupLink,
      "fabricsTitle": fabric.title,
      "fabricsCount": fabric.variants.length,
      "fabricStrapiId": fabric.id,
    })}>
      <div className="row py-3">
        <div className="col-lg-2">
          <h3 className="mb-3">{fabric.title}</h3>
        </div>
        <div className="col-lg-10">
          <div className="row">
            <div className="col">
              <h4 className="mb-3">{`${fabric.variants.length} `}Colors</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="row pb-5">
        <div className="d-none d-lg-flex">
          {
            descriptions && Boolean(descriptions.length) &&
            descriptions.map((description, i) => (
              description && description.includes(':') &&
              <div key={i} className={`col-12 col-lg-2 shortened-text ${i === 0 ? 'offset-lg-2' : ''}`}>
                <div className="text-secondary">
                  {description?.split(':')?.[0]}:
                </div>
                {
                  ['tablet', 'mobile'].includes(device) || description?.split(':')?.[1].length < 30
                    ?
                    <span>{description?.split(':')?.[1]}</span>
                    :
                    <>
                      {cutLongText(description?.split(':')?.[1], 30)}
                      <span className="text-tooltip">{description?.split(':')?.[1]}</span>
                    </>
                }
              </div>
            ))
          }
        </div>
        <div className="col justify-content-end">
          {
            Boolean(fabric.variants?.length > 6) &&
            <h4 className="text-end">
              <div onClick={handleViewMore} id={`headingSimpleProd${id}`} data-bs-toggle="collapse" data-bs-target={`#collapseSimpleProd${id}`} aria-expanded={`${accordionOpened}`} aria-controls={`collapseSimpleProd${id}`}>
                <span>View</span>
              </div>
            </h4>
          }
        </div>
      </div>
      <div className="row">
        <div className="col-lg-10" >
          <div className="row swatches" >
            {
              //the firsts 6
              fabric.variants?.slice(0, 6).map(variant => (
                <SwatchItem
                  key={variant.id}
                  group={group}
                  fabricSlug={fabricName}
                  fabric={fabric.title}
                  variant={variant}
                  productVariant={props.variant}
                  wizzardSwatch={wizzardSwatch} />
              ))
            }
            <div
              id={`collapseSimpleProd${id}`}
              className={`row collapse ${accordionOpened ? 'show' : ''}`}
              aria-labelledby={`headingSimpleProd${id}`}
              data-bs-parent="#accordionExampleThree">
              {
                // the lasts before 6
                accordionOpened && fabric.variants?.slice(6).map(variant => (
                  <SwatchItem
                    key={variant.id}
                    group={group}
                    fabricSlug={fabricName}
                    fabric={fabric.title}
                    variant={variant}
                    productVariant={props.variant}
                    wizzardSwatch={wizzardSwatch} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default GroupTypeTmpl
