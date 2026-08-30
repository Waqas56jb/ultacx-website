import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const HASH_ROUTES = {
  home: '/',
  overview: '/',
  'why-ultacx': '/',
  industries: '/',
  partner: '/',
  about: '/about',
  values: '/about',
  'why-rwanda': '/about',
  'quality-security': '/about',
  services: '/services',
  'how-it-works': '/services',
  'delivery-models': '/services',
  contact: '/contact',
}

export default function HashRedirect() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname !== '/') return
    const id = decodeURIComponent(location.hash.replace(/^#/, ''))
    const next = HASH_ROUTES[id]
    if (!next || next === '/') return
    navigate(`${next}${location.hash}`, { replace: true })
  }, [location.hash, location.pathname, navigate])

  return null
}
