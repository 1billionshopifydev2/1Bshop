import * as gtm from '@b2s_core/src/utils/google_tag_manager'
import wrapWithProvider from './wrap-with-provider'
import { trackPageView } from './src/b2s_core/src/utils/tracking'
export const wrapRootElement = wrapWithProvider

export const onClientEntry = () => {
  const load = async () => {
    document.removeEventListener('mousemove', load)
    document.removeEventListener('touchstart', load)

    if (process.env.GOOGLE_TAG_MANAGER_ID) {
      await gtm.init(process.env.GOOGLE_TAG_MANAGER_ID)
      await gtm.trackEvent('b2s_init')
    }
  }
  
  document.addEventListener('mousemove', load)
  document.addEventListener('touchstart', load)
}

export const onRouteUpdate = () => {
  trackPageView()
}
