import { useEffect, useRef } from 'react'
import useReducedMotion from './useReducedMotion.js'

/**
 * Scroll-linked parallax.
 *
 * Attach the returned ref to a layer and it translates as the element crosses
 * the viewport. `speed` is the travel in pixels across a full pass — negative
 * moves the layer against the scroll (reads as "further away").
 *
 * Work happens on a rAF frame driven by a passive scroll listener, and only
 * while the element is actually on screen (IntersectionObserver gate), so
 * offscreen layers cost nothing.
 */
export default function useParallax({ speed = 60, axis = 'y' } = {}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || reduced) return undefined

    let frame = 0
    let visible = false

    const update = () => {
      const rect = node.getBoundingClientRect()
      const viewport = window.innerHeight || 0

      // -1 when the element sits just below the fold, +1 when just above it.
      const progress = (rect.top + rect.height / 2 - viewport / 2) / (viewport / 2 + rect.height / 2)
      const offset = Math.max(-1, Math.min(1, progress)) * speed

      node.style.transform =
        axis === 'x' ? `translate3d(${offset}px,0,0)` : `translate3d(0,${offset}px,0)`
    }

    const onScroll = () => {
      if (!visible) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) onScroll()
      },
      { rootMargin: '120px 0px' },
    )

    observer.observe(node)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      node.style.transform = ''
    }
  }, [speed, axis, reduced])

  return ref
}
