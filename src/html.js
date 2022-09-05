import React from 'react'
import PropTypes from 'prop-types'
const { ProductHeadScripts } = require(`@themes/${process.env.B2S_THEME_NAME}/Templates/ProductPageTmpl`)
const { CategoryHeadScripts } = require(`@themes/${process.env.B2S_THEME_NAME}/Templates/CategoryPageTmpl`)

export default function HTML(props) {
  return (
    <html lang="en" dir="ltr" {...props.htmlAttributes}>
      <head>
        <meta name="google-site-verification" content="alqGk8Qyc1MpyUTmvN2nKWXjXXf3U6DfBeofCKKazt4" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TC5S5345GY"></script>
        <script dangerouslySetInnerHTML={{ __html:`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TC5S5345GY');`}}>
        </script>
        <script dangerouslySetInnerHTML={{ __html:`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '758522132039061');
        fbq('track', 'PageView');`}}>
        </script>
        <noscript><img height="1" width="1" style={{"display":"none"}} src="https://www.facebook.com/tr?id=758522132039061&ev=PageView&noscript=1"
/></noscript>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, shrink-to-fit=no, user-scalable=no"
        />
        {props.headComponents}
        <ProductHeadScripts />
        <CategoryHeadScripts />
        <script async defer src="https://tools.luckyorange.com/core/lo.js?site-id=97ab389e"></script>
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
