import { useCallback, useEffect, useRef } from 'react'
import useReducedMotion from './useReducedMotion.js'

/**
 * Pointer-driven 3D tilt.
 *
 * Returns a ref to attach to the element that should tilt. Rotation is written
 * straight to style inside a rAF frame rather than through React state — a
 * setState per mousemove would re-render the subtree on every pointer sample.
 *
 * Also publishes --mx / --my (0-100%) so a child can position a glare or
 * spotlight against the same pointer position without its own listener.
 *
 * Disabled entirely for reduced-motion users and for coarse pointers (touch),
 * where a tilt that never resets just leaves the card crooked.
 */
export default function useTilt({ max = 8, scale = 1, glare = true } = {}) {
  const ref = useRef(null)
  const frame = useRef(0)
  const reduced = useReducedMotion()

  const reset = useCallback(() => {
    const node = ref.current
    if (!node) return
    cancelAnimationFrame(frame.current)
    node.style.transform = ''
    if (glare) {
      node.style.setProperty('--mx', '50%')
      node.style.setProperty('--my', '50%')
      node.style.setProperty('--glare', '0')
    }
  }, [glare])

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    // Touch devices have no hover, and coarse pointers make tilt feel janky.
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (reduced || !fine.matches) {
      reset()
      return undefined
    }

    const onMove = (event) => {
      const rect = node.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height

      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        const rotateY = (px - 0.5) * 2 * max
        const rotateX = (0.5 - py) * 2 * max

        node.style.transform =
          `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) ` +
          `rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`

        if (glare) {
          node.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`)
          node.style.setProperty('--my', `${(py * 100).toFixed(1)}%`)
          node.style.setProperty('--glare', '1')
        }
      })
    }

    node.addEventListener('mousemove', onMove)
    node.addEventListener('mouseleave', reset)

    return () => {
      cancelAnimationFrame(frame.current)
      node.removeEventListener('mousemove', onMove)
      node.removeEventListener('mouseleave', reset)
    }
  }, [max, scale, glare, reduced, reset])

  return ref
}
