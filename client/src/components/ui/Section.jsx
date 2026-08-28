/**
 * Standard page section wrapper. Owns vertical rhythm and background variant
 * so spacing stays identical across every section on the page.
 *
 * tone: 'light'  — white
 *       'tint'   — very soft navy wash
 *       'dark'   — deep navy with mesh gradient + grid texture
 */
export default function Section({
  id,
  tone = 'light',
  className = '',
  containerClassName = '',
  children,
}) {
  const tones = {
    light: 'bg-white text-navy-700',
    tint: 'bg-navy-50/60 text-navy-700',
    dark: 'bg-navy-900 text-navy-100',
  }

  return (
    <section
      id={id}
      className={[
        'relative scroll-mt-24 overflow-hidden py-20 sm:py-24 lg:py-32',
        tones[tone] || tones.light,
        className,
      ].join(' ')}
    >
      {tone === 'dark' && (
        <>
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-mesh-navy" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-texture opacity-40" />
        </>
      )}
      <div className={['container-x relative', containerClassName].join(' ')}>{children}</div>
    </section>
  )
}
