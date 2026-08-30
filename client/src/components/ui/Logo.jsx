import { company } from '../../data/content.js'

/**
 * Transparent globe mark plus a typeset wordmark.
 * The PNG has no white plate, so the icon sits cleanly on navy or white.
 */
export default function Logo({
  className = 'h-10 w-auto',
  onDark = false,
  loading = 'eager',
}) {
  return (
    <span className="inline-flex items-center gap-2.5 sm:gap-3">
      <img
        src="/logo-nav.png"
        alt=""
        width="966"
        height="987"
        loading={loading}
        decoding="async"
        className={[
          'block w-auto shrink-0 origin-center select-none',
          'animate-spin-mark motion-reduce:animate-none',
          className,
        ].join(' ')}
      />
      <span className="min-w-0 leading-none">
        <span
          className={[
            'block font-display text-[1.35rem] font-extrabold tracking-tight sm:text-[1.55rem]',
            onDark ? 'text-white' : 'text-navy-800',
          ].join(' ')}
        >
          Ulta<span className={onDark ? 'text-moss-300' : 'text-moss-600'}>CX</span>
        </span>
        <span
          className={[
            'mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.14em] sm:text-[10px]',
            onDark ? 'text-navy-100/75' : 'text-navy-500',
          ].join(' ')}
        >
          {company.tagline}
        </span>
      </span>
    </span>
  )
}
