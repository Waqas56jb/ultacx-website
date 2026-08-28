import { useEffect, useState } from 'react'

/**
 * Tracks the user's reduced-motion preference and keeps it live.
 *
 * Every interactive-motion primitive in the site gates on this. Motion here is
 * decoration; for anyone who has asked the OS to reduce it, the page must still
 * be complete and legible with all of it switched off.
 */
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)

    const onChange = (event) => setReduced(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}
