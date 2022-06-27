import React from 'react'

import StrapiImage from '../Shared/StrapiImage'

const HeroCTATmpl = ({ hero }) => {
  if (!hero.position) {
    hero.position = 'top_center'
  }

  const [align, justify] = hero.position.split('_')
  
  const positions = {
    'left': 'start',
    'center': 'center',
    'right': 'end',
    'top': 'start',
    'middle': 'center',
    'bottom': 'end'
  }

  return (
    <section id="shopify-section-1" className="pb-lg-5 mb-lg-3 position-relative">
      <div className="card bg-transparent border-0">
        <div className="card-img">
          <div className="d-lg-none">
            <div className="embed-responsive embed-responsive-2by3">
              <div className="embed-responsive-item">
                {
                  hero.image_mobile &&
                  <StrapiImage
                    className="w-100"
                    sizes="(min-width: 3000px) calc(0vw + 0px), (min-width: 2980px) calc(0vw + 0px), (min-width: 2960px) calc(0vw + 0px), (min-width: 2940px) calc(0vw + 0px), (min-width: 2920px) calc(0vw + 0px), (min-width: 2900px) calc(0vw + 0px), (min-width: 2880px) calc(0vw + 0px), (min-width: 2860px) calc(0vw + 0px), (min-width: 2840px) calc(0vw + 0px), (min-width: 2820px) calc(0vw + 0px), (min-width: 2800px) calc(0vw + 0px), (min-width: 2780px) calc(0vw + 0px), (min-width: 2760px) calc(0vw + 0px), (min-width: 2740px) calc(0vw + 0px), (min-width: 2720px) calc(0vw + 0px), (min-width: 2700px) calc(0vw + 0px), (min-width: 2680px) calc(0vw + 0px), (min-width: 2660px) calc(0vw + 0px), (min-width: 2640px) calc(0vw + 0px), (min-width: 2620px) calc(0vw + 0px), (min-width: 2600px) calc(0vw + 0px), (min-width: 2580px) calc(0vw + 0px), (min-width: 2560px) calc(0vw + 0px), (min-width: 2540px) calc(0vw + 0px), (min-width: 2520px) calc(0vw + 0px), (min-width: 2500px) calc(0vw + 0px), (min-width: 2480px) calc(0vw + 0px), (min-width: 2460px) calc(0vw + 0px), (min-width: 2440px) calc(0vw + 0px), (min-width: 2420px) calc(0vw + 0px), (min-width: 2400px) calc(0vw + 0px), (min-width: 2380px) calc(0vw + 0px), (min-width: 2360px) calc(0vw + 0px), (min-width: 2340px) calc(0vw + 0px), (min-width: 2320px) calc(0vw + 0px), (min-width: 2300px) calc(0vw + 0px), (min-width: 2280px) calc(0vw + 0px), (min-width: 2260px) calc(0vw + 0px), (min-width: 2240px) calc(0vw + 0px), (min-width: 2220px) calc(0vw + 0px), (min-width: 2200px) calc(0vw + 0px), (min-width: 2180px) calc(0vw + 0px), (min-width: 2160px) calc(0vw + 0px), (min-width: 2140px) calc(0vw + 0px), (min-width: 2120px) calc(0vw + 0px), (min-width: 2100px) calc(0vw + 0px), (min-width: 2080px) calc(0vw + 0px), (min-width: 2060px) calc(0vw + 0px), (min-width: 2040px) calc(0vw + 0px), (min-width: 2020px) calc(0vw + 0px), (min-width: 2000px) calc(0vw + 0px), (min-width: 1980px) calc(0vw + 0px), (min-width: 1960px) calc(0vw + 0px), (min-width: 1940px) calc(0vw + 0px), (min-width: 1920px) calc(0vw + 0px), (min-width: 1900px) calc(0vw + 0px), (min-width: 1880px) calc(0vw + 0px), (min-width: 1860px) calc(0vw + 0px), (min-width: 1840px) calc(0vw + 0px), (min-width: 1820px) calc(0vw + 0px), (min-width: 1800px) calc(0vw + 0px), (min-width: 1780px) calc(0vw + 0px), (min-width: 1760px) calc(0vw + 0px), (min-width: 1740px) calc(0vw + 0px), (min-width: 1720px) calc(0vw + 0px), (min-width: 1700px) calc(0vw + 0px), (min-width: 1680px) calc(0vw + 0px), (min-width: 1660px) calc(0vw + 0px), (min-width: 1640px) calc(0vw + 0px), (min-width: 1620px) calc(0vw + 0px), (min-width: 1600px) calc(0vw + 0px), (min-width: 1580px) calc(0vw + 0px), (min-width: 1560px) calc(0vw + 0px), (min-width: 1540px) calc(0vw + 0px), (min-width: 1520px) calc(0vw + 0px), (min-width: 1500px) calc(0vw + 0px), (min-width: 1480px) calc(0vw + 0px), (min-width: 1460px) calc(0vw + 0px), (min-width: 1440px) calc(0vw + 0px), (min-width: 1420px) calc(0vw + 0px), (min-width: 1400px) calc(0vw + 0px), (min-width: 1380px) calc(0vw + 0px), (min-width: 1360px) calc(0vw + 0px), (min-width: 1340px) calc(0vw + 0px), (min-width: 1320px) calc(0vw + 0px), (min-width: 1300px) calc(0vw + 0px), (min-width: 1280px) calc(0vw + 0px), (min-width: 1260px) calc(0vw + 0px), (min-width: 1240px) calc(0vw + 0px), (min-width: 1220px) calc(0vw + 0px), (min-width: 1200px) calc(0vw + 0px), (min-width: 1180px) calc(0vw + 0px), (min-width: 1160px) calc(0vw + 0px), (min-width: 1140px) calc(0vw + 0px), (min-width: 1120px) calc(0vw + 0px), (min-width: 1100px) calc(0vw + 0px), (min-width: 1080px) calc(0vw + 0px), (min-width: 1060px) calc(0vw + 0px), (min-width: 1040px) calc(0vw + 0px), (min-width: 1020px) calc(0vw + 0px), (min-width: 1000px) calc(0vw + 0px), 100vw"
                    image={hero.image_mobile}
                    width="100vw"
                  />
                }
              </div>
            </div>
          </div>
          <div className="d-none d-lg-block">
            <div className="embed-responsive embed-responsive-16by9">
              <div className="embed-responsive-item">
                {
                  hero.image &&
                  <StrapiImage
                    className="w-100"
                    sizes="(min-width: 1000px) 100vw, (min-width: 980px) calc(0vw + 0px), (min-width: 960px) calc(0vw + 0px), (min-width: 940px) calc(0vw + 0px), (min-width: 920px) calc(0vw + 0px), (min-width: 900px) calc(0vw + 0px), (min-width: 880px) calc(0vw + 0px), (min-width: 860px) calc(0vw + 0px), (min-width: 840px) calc(0vw + 0px), (min-width: 820px) calc(0vw + 0px), (min-width: 800px) calc(0vw + 0px), (min-width: 780px) calc(0vw + 0px), (min-width: 760px) calc(0vw + 0px), (min-width: 740px) calc(0vw + 0px), (min-width: 720px) calc(0vw + 0px), (min-width: 700px) calc(0vw + 0px), (min-width: 680px) calc(0vw + 0px), (min-width: 660px) calc(0vw + 0px), (min-width: 640px) calc(0vw + 0px), (min-width: 620px) calc(0vw + 0px), (min-width: 600px) calc(0vw + 0px), (min-width: 580px) calc(0vw + 0px), (min-width: 560px) calc(0vw + 0px), (min-width: 540px) calc(0vw + 0px), (min-width: 520px) calc(0vw + 0px), (min-width: 500px) calc(0vw + 0px), (min-width: 480px) calc(0vw + 0px), (min-width: 460px) calc(0vw + 0px), (min-width: 440px) calc(0vw + 0px), (min-width: 420px) calc(0vw + 0px), (min-width: 400px) calc(0vw + 0px), (min-width: 380px) calc(0vw + 0px), (min-width: 360px) calc(0vw + 0px), (min-width: 340px) calc(0vw + 0px), (min-width: 320px) calc(0vw + 0px), calc(0vw + 0px)"
                    image={hero.image}
                  />
                }
              </div>
            </div>
          </div>
        </div>
        <div className="card-img-overlay p-3">
          <div className="container h-100">
            <div className={`row h-100 hero__content justify-content-${positions[justify]}`}>
              <div className={`col-lg-6 align-self-${positions[align]}`}>
                <div className={'py-5 my-3'}>
                  <div className="title">
                    <div className={hero.position.replace(/(top_|bottom_|middle_)/, 'text-').replace('right', 'end')}>
                      <h1 
                        className={`hero__headline mb-3 ${hero.text_shadow ? 'text-shadow' : ''}`}
                        style={{color: `#${hero.text_HEX_color || 'ffffff'}`}}
                      >
                        {hero.headline}
                      </h1>
                    </div>
                  </div>
                  <div className="text">
                    <div className={hero.position.replace(/(top_|bottom_|middle_)/, 'text-').replace('right', 'end')}>
                      <p 
                        className={`fs-16 lead mb-4 ${hero.text_shadow ? 'text-shadow' : ''}`} 
                        style={{color: `#${hero.text_HEX_color || 'ffffff'}`}}
                      >
                        {hero.pitch && hero.pitch.split('\n').map((line, i) => <React.Fragment key={`${line}-${i}`}>{line}<br /></React.Fragment>)}
                      </p>
                    </div> 
                  </div>
                  {
                    hero.cta_label &&
                    <div className={hero.position.replace(/(top_|bottom_|middle_)/, 'text-').replace('right', 'end')}>
                      <a
                        className="btn btn-light bg-white border-0 px-4 py-2 stretched-link"
                        href={hero.cta_url}
                      >
                        {hero.cta_label}
                      </a>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroCTATmpl
