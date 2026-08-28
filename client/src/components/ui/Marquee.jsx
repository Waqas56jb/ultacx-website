import useReducedMotion from '../../hooks/useReducedMotion.js'

/**
 * Seamless horizontal marquee.
 *
 * The row is rendered as two IDENTICAL groups and the track translates by
 * exactly -50%. Both halves must have the same structure and width for the
 * loop to be seamless — hence two matching wrapper divs rather than one flat
 * list plus a wrapped duplicate. The second copy is aria-hidden so assistive
 * tech reads the list once.
 *
 * For reduced-motion users the animation is dropped and the row becomes a
 * normal horizontally-scrollable strip, so the content stays reachable.
 */
export default function Marquee({
  items = [],
  renderItem,
  speed = 38,
  direction = 'left',
  gapClass = 'gap-4',
  className = '',
}) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div className={['flex overflow-x-auto pb-2', gapClass, className].join(' ')}>
        {items.map((item, i) => renderItem(item, i))}
      </div>
    )
  }

  const group = (hidden) => (
    <div aria-hidden={hidden || undefined} className={['flex shrink-0', gapClass].join(' ')}>
      {items.map((item, i) => renderItem(item, hidden ? `dup-${i}` : i))}
    </div>
  )

  return (
    <div className={['mask-fade-x overflow-hidden', className].join(' ')}>
      <div
        className={['animate-marquee pause-on-hover flex w-max', gapClass].join(' ')}
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {group(false)}
        {group(true)}
      </div>
    </div>
  )
}
