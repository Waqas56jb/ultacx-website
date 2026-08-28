import { useCallback, useRef } from 'react'
import useReducedMotion from '../../hooks/useReducedMotion.js'

/**
 * Grid wrapper that lights a soft radial glow under the pointer.
 *
 * One listener on the container serves every child in the grid, rather than a
 * listener per card. Position is written to --sx/--sy on the container and the
 * glow layer reads them, so pointer movement never triggers a React render.
 */
export default function Spotlight({
  as: Tag = 'div',
  tone = 'light',
  radius = 380,
  className = '',
  children,
  ...props
}) {
  const ref = useRef(null)
  const frame = useRef(0)
  const reduced = useReducedMotion()

  const onMove = useCallback(
    (event) => {
      const node = ref.current
      if (!node || reduced) return

      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect()
        node.style.setProperty('--sx', `${event.clientX - rect.left}px`)
        node.style.setProperty('--sy', `${event.clientY - rect.top}px`)
        node.style.setProperty('--slight', '1')
      })
    },
    [reduced],
  )

  const onLeave = useCallback(() => {
    const node = ref.current
    if (!node) return
    cancelAnimationFrame(frame.current)
    node.style.setProperty('--slight', '0')
  }, [])

  const glow =
    tone === 'dark'
      ? `radial-gradient(${radius}px circle at var(--sx, 50%) var(--sy, 50%), rgba(99,192,240,0.13), transparent 70%)`
      : `radial-gradient(${radius}px circle at var(--sx, 50%) var(--sy, 50%), rgba(15,139,212,0.10), transparent 70%)`

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={['group/spot relative', className].join(' ')}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 rounded-[inherit] opacity-[var(--slight,0)] transition-opacity duration-500"
        style={{ background: glow }}
      />
      {children}
    </Tag>
  )
}
