/* eslint-disable */

import React, { useContext, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { slugify } from '../../../../../src/b2s_core/src/utils/helpers';
import { pushHistoryUrl } from '../../../../../src/b2s_core/src/utils/helpers_product';
import { VariantContext } from '../../../../../src/components/VariantModal/VariantContext'

const SwatchItem = ({ variant, group, fabric, fabricSlug, wizzardSwatch, productVariant }) => {
  const { setSwatch, swatchVariant } = useContext(VariantContext)

  useEffect(() => {
    if (wizzardSwatch.id === variant.id) {
      setSwatch({ variant, group: group.groupLink.split('_')[0], fabric, selectedSwatchPrice: productVariant?.price })
    }
  }, [wizzardSwatch])

  const handleSelectSwatchClick = (event) => {
    const swatchSlug = slugify(variant.title)
    const path = `${group.groupLink}/${fabricSlug}/${swatchSlug}`
    pushHistoryUrl(path)
    setSwatch({ variant: { ...variant, id: group?.selectedVariant?.id }, group: group.name.split('_')[0], fabric, selectedSwatchPrice: group?.selectedVariant?.price })
  }

  return (
    <div className="col-3 col-lg-2">
      <label className="swatch d-block">
        <div onClick={handleSelectSwatchClick} className="image">
          <div className="mb-2">
            <div className={`embed-responsive embed-responsive-1by1 rounded-circle ${(variant.color === swatchVariant.variant.color && variant.title === swatchVariant.variant.title) ? 'active-rounded' : ''}`}>
              <div className={`embed-responsive-item rounded-circle border-white bg-light border`} >
                <LazyLoadImage className="rounded-circle w-100" src={`${variant.image.url}`} alt={`${variant.title} image`} />
              </div>
            </div>
          </div>
        </div>
        <div className="title">
          <div className="text-center mb-3">
            {variant.title}
          </div>
        </div>
      </label>
    </div>
  )
}

export default SwatchItem