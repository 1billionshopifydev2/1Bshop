import * as gtm from '@b2s_core/src/utils/google_tag_manager'
require(`./themes/${process.env.B2S_THEME_NAME}/assets/styles/styles.scss`)

import wrapWithProvider from './wrap-with-provider'
import { trackPageView } from './src/b2s_core/src/utils/tracking'
export const wrapRootElement = wrapWithProvider

export const onClientEntry = () => {
  const load = async () => {
    document.removeEventListener('mousemove', load)
    document.removeEventListener('touchstart', load)
    await gtm.init(process.env.GOOGLE_TAG_MANAGER_ID, process.env.GOOGLE_ANALYTICS_ID)
    await gtm.trackEvent('b2s_init')
  }
  
  document.addEventListener('mousemove', load)
  document.addEventListener('touchstart', load)
}

export const onRouteUpdate = () => {
  trackPageView()
}
