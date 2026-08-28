/**
 * Single button primitive used for every CTA on the page.
 *
 * variant: 'primary'   — navy fill (light backgrounds)
 *          'accent'    — azure→green gradient fill, the highest-emphasis action
 *          'outline'   — navy outline (light backgrounds)
 *          'onDark'    — white fill (dark backgrounds)
 *          'ghostDark' — bordered translucent (dark backgrounds)
 */
export default function Button({
  as: Tag = 'a',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const base =
    'group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold tracking-tight ' +
    'transition-all duration-300 ease-out will-change-transform ' +
    'hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60'

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-6 py-3.5 text-[15px]',
    lg: 'px-8 py-4 text-base',
  }

  const variants = {
    primary: 'bg-navy-800 text-white shadow-soft hover:bg-navy-700 hover:shadow-lift',
    accent:
      'bg-gradient-to-r from-azure-500 to-moss-500 text-white shadow-glow hover:shadow-lift hover:brightness-110',
    outline:
      'border border-navy-200 bg-white text-navy-800 shadow-soft hover:border-navy-300 hover:bg-navy-50 hover:shadow-lift',
    onDark: 'bg-white text-navy-800 shadow-deep hover:bg-navy-50',
    ghostDark:
      'border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/45 hover:bg-white/10',
  }

  return (
    <Tag
      className={[base, sizes[size], variants[variant] || variants.primary, className].join(' ')}
      {...props}
    >
      {children}
    </Tag>
  )
}
