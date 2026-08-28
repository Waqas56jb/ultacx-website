import Reveal from './Reveal.jsx'

/**
 * Eyebrow + heading + optional intro block.
 * Every section opens with this so the typographic entry point is identical.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  dark = false,
  className = '',
  children,
}) {
  const centered = align === 'center'

  return (
    <div
      className={[
        centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl text-left',
        className,
      ].join(' ')}
    >
      {eyebrow && (
        <Reveal>
          <div
            className={[
              'flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em]',
              centered ? 'justify-center' : 'justify-start',
              dark ? 'text-azure-200' : 'text-azure-600',
            ].join(' ')}
          >
            <span aria-hidden="true" className="h-px w-7 bg-accent-sweep" />
            {eyebrow}
            {centered && <span aria-hidden="true" className="h-px w-7 bg-accent-sweep" />}
          </div>
        </Reveal>
      )}

      {title && (
        <Reveal delay={90}>
          <h2
            className={[
              'mt-5 text-display-md text-balance',
              dark ? 'text-white' : 'text-navy-800',
            ].join(' ')}
          >
            {title}
          </h2>
        </Reveal>
      )}

      {intro && (
        <Reveal delay={170}>
          <p
            className={[
              'mt-5 text-lg leading-relaxed',
              dark ? 'text-navy-100/75' : 'text-navy-500',
            ].join(' ')}
          >
            {intro}
          </p>
        </Reveal>
      )}

      {children}
    </div>
  )
}
