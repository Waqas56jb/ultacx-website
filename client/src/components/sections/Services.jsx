import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import TextReveal from '../ui/TextReveal.jsx'
import TiltCard from '../ui/TiltCard.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import Icon from '../ui/Icon.jsx'
import useReducedMotion from '../../hooks/useReducedMotion.js'
import { services, contact, hero } from '../../data/content.js'

/**
 * Our Services — the centrepiece of the page.
 * Five services presented as an accessible tab set: a pill strip
 * (horizontally scrollable on small screens) driving a two-column panel.
 *
 * Depth layer: the panel is a perspective stage. On every tab change the two
 * columns are remounted and settle from a small rotateY / negative translateZ
 * back to flat on staggered delays, so the swap reads as two planes turning
 * into place rather than one rectangle being replaced. The photograph tilts
 * toward the pointer with the glass service badge lifted onto a higher Z plane.
 *
 * The settle is driven by one state flip per tab change (never per frame), and
 * only `transform` / `opacity` are animated. Under reduced motion the columns
 * render settled and nothing moves.
 *
 * Note: TiltCard and its inner layer keep `transform-style: preserve-3d`, so
 * neither may take `overflow-hidden` — that would flatten the Z stack and drop
 * the badge back onto the surface. The photo is clipped by its own flat wrapper
 * inside the card instead.
 */

const CHIP_TONES = [
  'bg-azure-50 text-azure-600',
  'bg-moss-50 text-moss-600',
  'bg-gold-50 text-gold-600',
  'bg-azure-50 text-azure-600',
  'bg-moss-50 text-moss-600',
]

const PANEL_ID = 'services-panel'
const tabId = (id) => `services-tab-${id}`
const pad = (n) => String(n).padStart(2, '0')

// Both panel columns share one easing and duration; only the delay and the
// angle they turn from differ, which is what makes the swap feel layered.
const COLUMN_MOTION =
  'transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'

export default function Services() {
  const items = services.items
  const [activeIndex, setActiveIndex] = useState(0)
  const [entered, setEntered] = useState(false)
  const tabRefs = useRef([])
  const reduced = useReducedMotion()

  const active = items[activeIndex]

  // One state flip per tab change: the remounted columns paint at their entry
  // transform, then settle to flat on the next frame.
  useEffect(() => {
    if (reduced) {
      setEntered(true)
      return undefined
    }

    setEntered(false)
    let inner = 0
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setEntered(true))
    })

    return () => {
      cancelAnimationFrame(outer)
      cancelAnimationFrame(inner)
    }
  }, [activeIndex, reduced])

  const settled = entered || reduced

  const columnStyle = (delay, angle, depth) => ({
    transitionDelay: `${delay}ms`,
    transform: settled ? 'none' : `rotateY(${angle}deg) translateZ(${depth}px) translateY(18px)`,
    opacity: settled ? 1 : 0,
  })

  const moveTo = (index) => {
    const next = (index + items.length) % items.length
    setActiveIndex(next)
    const node = tabRefs.current[next]
    if (node) {
      node.focus({ preventScroll: true })
      node.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveTo(activeIndex + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveTo(activeIndex - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      moveTo(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      moveTo(items.length - 1)
    }
  }

  return (
    <Section id="services" tone="light">
      <SectionHeading
        eyebrow={services.eyebrow}
        title={<TextReveal text={services.heading} delay={90} stagger={55} />}
        align="center"
      />

      {/* Tab strip: scrollable on mobile, a centred pill row from lg up */}
      <Reveal delay={220}>
        <div
          role="tablist"
          aria-label={services.eyebrow}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          className="-mx-5 mt-12 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => {
            const isActive = i === activeIndex
            return (
              <button
                key={item.id}
                type="button"
                id={tabId(item.id)}
                ref={(node) => {
                  tabRefs.current[i] = node
                }}
                role="tab"
                aria-selected={isActive}
                aria-controls={PANEL_ID}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIndex(i)}
                className={[
                  'relative inline-flex shrink-0 snap-start items-center gap-2.5 whitespace-nowrap rounded-full border',
                  'px-5 py-3 text-sm font-semibold tracking-tight transition-all duration-300 ease-out',
                  isActive
                    ? '-translate-y-0.5 border-navy-800 bg-navy-800 text-white shadow-lift'
                    : 'border-navy-100 bg-white text-navy-600 hover:-translate-y-0.5 hover:border-navy-300 hover:text-navy-800 hover:shadow-soft',
                ].join(' ')}
              >
                <Icon
                  name={item.icon}
                  className={[
                    'h-4 w-4 transition-colors duration-300',
                    isActive ? 'text-azure-200' : 'text-azure-600',
                  ].join(' ')}
                />
                {item.title}
                {/* Selection indicator: a hairline that opens from the centre of the pill */}
                <span
                  aria-hidden="true"
                  className={[
                    'pointer-events-none absolute inset-x-5 bottom-[7px] h-px origin-center rounded-full bg-accent-sweep',
                    'transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                    isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0',
                  ].join(' ')}
                />
              </button>
            )
          })}
        </div>
      </Reveal>

      {/* Active service panel */}
      <Reveal delay={300}>
        <div
          id={PANEL_ID}
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={tabId(active.id)}
          className="perspective-1600 mt-8 rounded-3xl border border-navy-100 bg-navy-50/40 p-6 shadow-soft sm:mt-10 sm:p-9 lg:p-12"
        >
          <div
            key={activeIndex}
            className="grid transform-3d items-center gap-10 lg:grid-cols-2 xl:gap-14"
          >
            {/* Copy column */}
            <div className={COLUMN_MOTION} style={columnStyle(0, 5, -40)}>
              <div className="flex items-center gap-4">
                <span
                  className={[
                    'inline-flex rounded-xl p-3',
                    CHIP_TONES[activeIndex % CHIP_TONES.length],
                  ].join(' ')}
                >
                  <Icon name={active.icon} className="h-6 w-6" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-400">
                  {pad(activeIndex + 1)} / {pad(items.length)}
                </span>
              </div>

              <h3 className="mt-6 text-balance text-display-sm text-navy-800">{active.title}</h3>
              <span aria-hidden="true" className="mt-5 block h-px w-14 bg-gold-400" />

              <p className="mt-5 text-lg leading-relaxed text-navy-500">{active.intro}</p>
              {active.introSecondary && (
                <p className="mt-4 text-base leading-relaxed text-navy-500">
                  {active.introSecondary}
                </p>
              )}

              <p className="mt-9 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-400">
                {active.listLabel}
              </p>

              <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {active.items.map((entry, i) => (
                  <Reveal
                    key={entry}
                    as="li"
                    delay={i * 30}
                    className="flex items-start gap-3 text-[15px] leading-snug text-navy-600"
                  >
                    <span className="mt-0.5 inline-flex shrink-0 rounded-full bg-moss-50 p-1 text-moss-500">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {entry}
                  </Reveal>
                ))}
              </ul>
            </div>

            {/* Image column */}
            <div className={`relative ${COLUMN_MOTION}`} style={columnStyle(130, -6, -60)}>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-4 -top-4 hidden h-24 w-24 rounded-tl-3xl border-l border-t border-gold-300/70 lg:block"
              />
              {/* `glare` stays on: it is what publishes --mx / --my / --glare for the
                  sheen below. The primitive's own glare layer is behind the photo. */}
              <TiltCard max={7} glareTone="dark" className="group rounded-3xl shadow-deep">
                {/* Flat wrapper carries the clip so the card itself keeps preserve-3d */}
                <div className="relative overflow-hidden rounded-3xl">
                  <SmartImage
                    src={active.image}
                    alt={active.alt}
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/15 to-transparent"
                  />
                  {/* Light that follows the pointer, driven by the tilt hook's own vars */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(360px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.16),transparent_62%)] opacity-[var(--glare,0)] transition-opacity duration-300"
                  />
                  <span
                    aria-hidden="true"
                    className="edge-sheen pointer-events-none absolute inset-x-8 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>

                <div className="glass-dark depth-2 absolute bottom-5 left-5 right-5 inline-flex items-center gap-2.5 rounded-2xl px-4 py-3 text-white">
                  <Icon name={active.icon} className="h-4 w-4 shrink-0 text-azure-200" />
                  <span className="truncate text-xs font-semibold tracking-tight">
                    {active.title}
                  </span>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Closing CTA row */}
      <Reveal delay={120}>
        <div className="mt-10 flex flex-col items-center gap-6 rounded-2xl border border-navy-100 bg-white px-6 py-6 text-center shadow-soft sm:mt-12 sm:flex-row sm:justify-between sm:gap-8 sm:px-8 sm:text-left">
          <div className="flex items-center gap-5">
            <span aria-hidden="true" className="hidden h-10 w-px shrink-0 bg-gold-400 sm:block" />
            <p className="text-base leading-relaxed text-navy-500 sm:text-lg">{contact.intro}</p>
          </div>
          <Button variant="primary" href="/contact" className="w-full shrink-0 sm:w-auto">
            {hero.primaryCta}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}
