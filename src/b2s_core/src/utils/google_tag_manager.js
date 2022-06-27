import { loadHeadScript, loadHeadScriptContent } from './helpers'

export const trackEvent = (eventName, info) => {
  if (typeof window === 'undefined') {
    return
  }

  if (window.dataLayer) {
    window.dataLayer.push({ event: eventName, gtm: info })
  } else {
    window.addEventListener('gtm_loaded', function () {
      window.dataLayer.push({ event: eventName, gtm: info })
    })
  }
}

export const init = async (gtmID, gaID) => {
  if (typeof document !== 'undefined' && document.body) {
    document.body.insertAdjacentHTML('afterbegin', '<noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${gtmID}`} height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>')
  }

  await loadHeadScriptContent(
    'b2s_gtm',
    `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;j.addEventListener('load', function() {
      var _ge = new CustomEvent('gtm_loaded', { bubbles: true });
      d.dispatchEvent(_ge);
    });f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmID}');`
  )
  await loadHeadScript(`https://www.googletagmanager.com/gtag/js?id=${gaID}`)
  await loadHeadScriptContent(
    'b2s_ga',
    `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaID}');`
  )
}

export const dataLayerPush = (data) => {
  if (typeof window === 'undefined') {
    return
  }

  if (window.dataLayer) {
    window.dataLayer.push({ gtm: data })
  } else {
    window.addEventListener('gtm_loaded', function () {
      window.dataLayer.push({ gtm: data })
    })
  }
}
