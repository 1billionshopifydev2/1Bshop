import React from 'react'
// import classNames from 'classnames'

const AnnouncementBannerTmpl = props => (
  <>
    <div className="bg-dark">
      <div className="container">
        <div className="carousel carousel-fade slide" data-ride="carousel">
          <div className="carousel-inner">
            {/* {props.announcements.map((item, index) => (
              <div key={index} className={classNames('carousel-item', { active: index === 0 }) }>
                <div className="text-center text-white my-1" dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))} */}
            <div className="carousel-item active">
              <div className="text-center text-white my-1">
                <a
                  href="https://aplusrstore.com/pages/faq#shipping"
                  className="text-reset"
                  >Free shipping on most orders over $100</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default AnnouncementBannerTmpl
