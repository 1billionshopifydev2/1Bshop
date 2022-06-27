/* eslint-disable */

import Link from '@b2s_core/src/utils/Link'
import React from 'react'
import Slider from 'react-slick'

import useDevice from '../../../src/b2s_core/src/hooks/useDevice'
import StrapiImage from '../Shared/StrapiImage'

const SaleSectionTmpl = ({ data }) => {
  const device = useDevice()
  const slideToShow = {
    mobile: 2,
    tablet: 2,
    desktop: 4,
  }

  const settings = {
    lazyLoad: 'progressive',
    initialSlide: 0,
    infinite: true,
    speed: 500,
    slidesToShow: slideToShow[device],
    slidesToScroll: 1,
  }

  return (
    <section id="row-sale-section">
      <div className="container">
        <hr className="border border-dark" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="mb-5">
              <a href={data.section_title_URL}>{data.title}</a>
            </h2>
          </div>
        </div>
      </div>
      <div className="container mb-md-5">
        <div className="row">
          <Slider {...settings}>
            {data.sale_item.map((item, i) => (
              <div key={item.id} className="col-6 col-lg-3 pb-5 px-1">
                <div className="mb-3">
                  <Link to={item.URL} className="bg-light d-block">
                    {
                      <StrapiImage
                        className="w-100 h-100"
                        image={item.image}
                        sizes="(min-width: 900px) 163px, 125px"
                        width="200"
                        height="200"
                        alt={item.image.alternativeText} 
                        loading="auto"
                      />
                    }
                  </Link>
                </div>
                <p className="m-0">{item.brand}</p>
                <p className="m-0 mr-1">
                  <strong className="pr-1">{item.product_name}</strong>
                </p>
                <div className="pb-3 mb-3">
                  <div className="text-secondary">
                    {item.new_price}
                    <s className="text-danger"> {item.old_price} </s>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default SaleSectionTmpl
