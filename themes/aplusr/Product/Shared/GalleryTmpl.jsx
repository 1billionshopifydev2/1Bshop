/* eslint-disable */

import React, { forwardRef } from 'react'

const GalleryTmpl = forwardRef((props, ref) => {
  const { desktopThumbSliderRef, mobileSliderRef, desktopModalZoomRef, desktopModalZoomSliderRef } = ref
  return (
    <>
      {/* desktop thumbs slider */}
      <div className={`col-lg-1 px-2 d-none${!props.sliderInitialized ? ' d-lg-block' : ''}`}>
        {!props.sliderInitialized && (
          <div className="position-relative overflow-hidden px-lg-1 py-3">
            {props.images?.length > 0 &&
              props.initialImages.map((p, i) => (
                <div key={`thumb-${p.id}`} className="mb-3">
                  <a className="bg-light d-block" data-bs-slide-to={i} href="#desktop-gallery-slider">
                    <div className="embed-responsive embed-responsive-1by1">
                      <div className="embed-responsive-item">
                        <img className="w-100" src={props.resizedImgURL(p.originalSrc, 'medium')} alt={p.altText} loading="lazy" />
                      </div>
                    </div>
                  </a>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className={`col-lg-1 px-2 ${props.sliderInitialized ? 'visible d-none d-lg-block' : 'position-absolute invisible'}`}>
        <div ref={desktopThumbSliderRef} id="thumbnails-slider" className="position-relative overflow-hidden px-lg-1 py-3">
          {props.images?.length > 0 &&
            props.images.map((p, i) => (
              <div key={`thumb-${p.id}`} className="">
                <a className="bg-light d-block" data-bs-slide-to={i} href="#desktop-gallery-slider">
                  <div className="embed-responsive embed-responsive-1by1">
                    <div className="embed-responsive-item">
                      <img className="w-100 tns-lazy-img" data-src={props.resizedImgURL(p.originalSrc, 'medium')} alt={p.altText} />
                    </div>
                  </div>
                </a>
              </div>
            ))}
        </div>
      </div>




      <div className="col-lg-6 px-2">
        <div className="px-lg-1">
          <div className="d-lg-none">
            {/* mobile standalone slider */}
            <div ref={mobileSliderRef} id="mobile-slider" className="position-relative overflow-hidden">
              {props.images &&
                props.images.length > 0 &&
                props.images.map((p, i) => (
                  <div key={`mobile-${p.id}`}>
                    <img className="w-100 tns-lazy-img" data-src={p.originalSrc} alt={p.altText} />
                    <div className="text-secondary mb-3">{p.altText}</div>
                  </div>
                ))}
            </div>
          </div>
          <div className="d-none d-lg-block">
            {/* desktop slider - change slides from thumbs slider */}
            <div id="desktop-gallery-slider" className="carousel carousel-fade slide" data-bs-interval="0">
              <div className="carousel-inner">
                {props.images &&
                  props.images.length > 0 &&
                  props.images.map((p, i) => (
                    <div key={`desktop-${p.id}`} className={'carousel-item' + (i == 0 ? ' active' : '')}>
                      <a href="#magnifications" data-bs-toggle="modal" data-bs-set-slide={i}>
                        <img className="w-100" src={p.originalSrc} alt={p.altText} loading="lazy" />
                      </a>
                      <div className="text-secondary mb-3">{p.altText}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal window with desktop gallery zoom */}
      <div ref={desktopModalZoomRef} className="modal fade" id="magnifications" tabIndex="-1" aria-labelledby="dektopGalleryZoomLabel" aria-hidden="true">
        <div className="modal-dialog mw-100 m-0 px-0 modal-fullscreen-xl-lg">
          <div className="modal-content border-0">
            <div className="modal-header border-0 py-0 ps-4 pe-0 align-self-end">
              <a href="#" className="p-3 me-2" data-bs-dismiss="modal" aria-label="Close">
                <svg className="d-block" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 20 20" fill="none" height="20">
                  <title>Close</title>
                  <polyline points="8,4 20,16"></polyline>
                  <polyline points="8,16 20,4"></polyline>
                </svg>
              </a>
            </div>
            <div className="modal-body bg-white p-0 mx-0">
              <div className="row align-items-center justify-content-between g-0">
                <div className="col-auto p-0">
                  <a className="d-block p-3 ms-2" href="#magnifications-carousel" data-bs-slide="prev">
                    <svg className="d-block" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 20 20" fill="none" height="20">
                      <title>Previous</title>
                      <polyline points="8.5,6.5 5,10 8.5,13.5"></polyline>
                      <circle cx="10" cy="10" r="9.5"></circle>
                      <polyline points="5,10 15,10"></polyline>
                    </svg>
                  </a>
                </div>
                <div className="col-8 col-lg-6 px-2 slide-container">
                  <div ref={desktopModalZoomSliderRef} id="magnifications-carousel" className="carousel slide carousel-fade" data-bs-interval="0">
                    <div className="carousel-inner">
                      {props.images && props.images.length > 0 && props.images.map((p, i) => (
                       <div key={`zoom-${p.id}`} data-index={i} className={'carousel-item' + (i === 0 ? ' active' : '')}>
                        <h4 className="bg-white p-3 ms-2 text-start fw-bold">{props.title} <span className="ps-3 pe-2 fw-normal">{p.altText}</span></h4>
                        <div className="mt-5 embed-responsive embed-responsive-1by1">
                          <div className="embed-responsive-item">
                            <img className="w-100" src={p.originalSrc} alt={p.altText} loading="lazy" />
                          </div>
                        </div>
                      </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-auto p-0">
                  <a className="d-block p-3 me-2" href="#magnifications-carousel" data-bs-slide="next">
                    <svg className="d-block" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 20 20" fill="none" height="20">
                      <title>Next</title>
                      <polyline points="11.5,6.5 15,10 11.5,13.5"></polyline>
                      <circle cx="10" cy="10" r="9.5"></circle>
                      <polyline points="5,10 15,10"></polyline>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

export default GalleryTmpl
