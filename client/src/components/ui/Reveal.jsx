import { useEffect, useRef, useState } from 'react'

/**
 * Reveals children on scroll with an optional stagger delay.
 * Falls back to visible-immediately when IntersectionObserver is unavailable
 * or the user prefers reduced motion.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        'transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
        shown ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-[2px]',
        className,
      ].join(' ')}
    >
      {children}
    </Tag>
  )
}
