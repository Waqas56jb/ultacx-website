import { useEffect, useRef, useState } from 'react'
import useReducedMotion from '../../hooks/useReducedMotion.js'

/**
 * Reveals a line of text word by word as it scrolls into view.
 *
 * Words are split on whitespace and each is wrapped in an inline-block that
 * rises and fades on a stagger. The original spacing is preserved with a real
 * space between spans, so the text still selects, copies and wraps normally
 * and screen readers read one continuous string.
 */
export default function TextReveal({
  text,
  as: Tag = 'span',
  stagger = 45,
  delay = 0,
  className = '',
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduced])

  const words = String(text || '').split(' ')

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <span
            className={[
              'inline-block transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
              shown ? 'translate-y-0 opacity-100' : 'translate-y-[0.9em] opacity-0',
            ].join(' ')}
            style={{ transitionDelay: `${delay + i * stagger}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
