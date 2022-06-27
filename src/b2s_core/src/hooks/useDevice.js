import { useEffect, useState } from 'react'

const hasWindowObj = typeof window !== 'undefined'

const MOBILE = 'mobile'
const TABLET = 'tablet'
const DESKTOP = 'desktop'

export default function useDevice() {
  const [device, setDevice] = useState(
    hasWindowObj && getDeviceByWith(window.innerWidth)
  )

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDeviceByWith(window.innerWidth))
    }
    window.addEventListener('resize', handleResize)
    return () => window.addEventListener('resize', handleResize)
  }, [])

  return device
}

const getDeviceByWith = (screenSize) => {
  if (screenSize < 576) {
    return MOBILE
  } else if (screenSize < 900) {
    return TABLET
  }

  return DESKTOP
}

export {
  MOBILE,
  TABLET,
  DESKTOP,
}