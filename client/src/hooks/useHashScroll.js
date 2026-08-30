import { useEffect } from 'react'

const SECTION_IDS = [
  'home',
  'overview',
  'why-ultacx',
  'about',
  'values',
  'services',
  'industries',
  'why-rwanda',
  'how-it-works',
  'delivery-models',
  'quality-security',
  'partner',
  'contact',
]

function sectionFromPath(pathname) {
  const id = pathname.replace(/^\/+|\/+$/g, '')
  return SECTION_IDS.includes(id) ? id : ''
}

function targetId() {
  const hashId = decodeURIComponent(window.location.hash.replace(/^#/, ''))
  if (hashId && SECTION_IDS.includes(hashId)) return hashId
  return sectionFromPath(window.location.pathname)
}

function syncPathToHash() {
  const pathId = sectionFromPath(window.location.pathname)
  if (!pathId || window.location.hash === `#${pathId}`) return
  window.history.replaceState(null, '', `/${window.location.search}#${pathId}`)
}

function scrollToSection(id, behavior) {
  const node = document.getElementById(id)
  if (!node) return false
  node.scrollIntoView({ behavior, block: 'start' })
  return true
}

export default function useHashScroll() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    syncPathToHash()

    let frames = 0
    let rafId = 0

    const pin = (behavior) => {
      const id = targetId()
      if (!id) return true
      return scrollToSection(id, behavior)
    }

    const retry = () => {
      if (pin('auto') || frames++ > 60) return
      rafId = window.requestAnimationFrame(retry)
    }

    retry()

    const onLoad = () => pin('auto')
    const onHashChange = () => pin('smooth')

    window.addEventListener('load', onLoad)
    window.addEventListener('hashchange', onHashChange)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('load', onLoad)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])
}
