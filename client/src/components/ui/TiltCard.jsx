import useTilt from '../../hooks/useTilt.js'

/**
 * A card that tilts in 3D toward the pointer, with a glare highlight that
 * tracks the same position.
 *
 * The glare is a sibling overlay driven by the --mx/--my custom properties the
 * tilt hook publishes, so there is a single pointer listener per card.
 *
 * Children can be lifted off the surface with `translateZ` by giving them the
 * `depth-1` / `depth-2` / `depth-3` utility classes (see index.css) — that is
 * what makes it read as real depth rather than a flat card being rotated.
 */
export default function TiltCard({
  as: Tag = 'div',
  max = 8,
  scale = 1,
  glare = true,
  glareTone = 'light',
  className = '',
  innerClassName = '',
  children,
  ...props
}) {
  const ref = useTilt({ max, scale, glare })

  const glareClass =
    glareTone === 'dark'
      ? 'bg-[radial-gradient(320px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.10),transparent_62%)]'
      : 'bg-[radial-gradient(320px_circle_at_var(--mx,50%)_var(--my,50%),rgba(15,139,212,0.14),transparent_62%)]'

  return (
    <Tag
      ref={ref}
      className={[
        'relative transform-3d transition-transform duration-300 ease-out will-change-transform',
        className,
      ].join(' ')}
      {...props}
    >
      {glare && (
        <span
          aria-hidden="true"
          className={[
            'pointer-events-none absolute inset-0 rounded-[inherit] opacity-[var(--glare,0)] transition-opacity duration-300',
            glareClass,
          ].join(' ')}
        />
      )}
      <div className={['relative transform-3d', innerClassName].join(' ')}>{children}</div>
    </Tag>
  )
}
