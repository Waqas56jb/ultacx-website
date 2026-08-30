import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

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

function targetId(pathname, hash) {
  const hashId = decodeURIComponent(String(hash || '').replace(/^#/, ''))
  if (hashId && SECTION_IDS.includes(hashId)) return hashId
  return sectionFromPath(pathname)
}

function scrollToSection(id, behavior) {
  const node = document.getElementById(id)
  if (!node) return false
  node.scrollIntoView({ behavior, block: 'start' })
  return true
}

export default function useHashScroll() {
  const location = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const id = targetId(location.pathname, location.hash)
    if (!id) return undefined

    let frames = 0
    let rafId = 0

    const retry = () => {
      if (scrollToSection(id, 'auto') || frames++ > 60) return
      rafId = window.requestAnimationFrame(retry)
    }

    retry()
    return () => window.cancelAnimationFrame(rafId)
  }, [location.pathname, location.hash])
}
