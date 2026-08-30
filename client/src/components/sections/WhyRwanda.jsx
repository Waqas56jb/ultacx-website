import { useEffect, useRef, useState } from 'react'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import TextReveal from '../ui/TextReveal.jsx'
import TiltCard from '../ui/TiltCard.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import Icon from '../ui/Icon.jsx'
import useParallax from '../../hooks/useParallax.js'
import useReducedMotion from '../../hooks/useReducedMotion.js'
import { whyRwanda } from '../../data/content.js'

/**
 * "Why Rwanda?" — the cinematic dark chapter of the page.
 * Editorial two-column opener (copy + framed skyline image) followed by the
 * ULTA CX Advantage row, arranged as a gentle arc that echoes the faint
 * connection motif drawn behind it.
 *
 * Motion layer: a drifting aurora with film grain behind the panel, scroll
 * parallax playing the copy column against the skyline and its accent frames,
 * and the connection motif drawing itself in as the row arrives. All of it is
 * decoration — under prefers-reduced-motion the section renders in its
 * finished state with nothing moving.
 */

/* Subtle vertical stepping so the five advantages arc across the row on lg. */
const stepOffsets = [
  'lg:translate-y-0',
  'lg:-translate-y-3',
  'lg:-translate-y-6',
  'lg:-translate-y-3',
  'lg:translate-y-0',
]

/* The connection motif, split out so each stroke can be drawn on a stagger. */
const reachArcs = [
  'M100 160 Q 237 58 375 160',
  'M375 160 Q 487 92 600 160',
  'M600 160 Q 712 92 825 160',
  'M825 160 Q 962 58 1100 160',
]

const reachNodes = [
  { cx: 100, r: 5 },
  { cx: 375, r: 5 },
  { cx: 600, r: 7 },
  { cx: 825, r: 5 },
  { cx: 1100, r: 5 },
]

/**
 * Faint international-reach motif behind the advantages row.
 *
 * The arcs draw themselves in with stroke-dashoffset once the row scrolls into
 * view; pathLength="100" normalises every curve so a single offset value works
 * for all of them. The two dotted strokes already spend their dash pattern on
 * the dots, so they fade in rather than draw.
 *
 * Reduced motion resolves `drawn` to true immediately and
 * `motion-reduce:transition-none` strips the transition, so the motif is simply
 * present and fully drawn — never invisible, never animating.
 */
function ReachMotif() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const drawn = reduced || inView

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-16 hidden opacity-[0.12] lg:block"
    >
      <svg viewBox="0 0 1200 220" className="w-full" role="presentation" focusable="false">
        <defs>
          <linearGradient id="ultacx-reach-arc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0F8BD4" />
            <stop offset="55%" stopColor="#3FA935" />
            <stop offset="100%" stopColor="#E9A81C" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#ultacx-reach-arc)" strokeWidth="1.5" strokeLinecap="round">
          <path
            d="M0 160 H1200"
            strokeDasharray="2 10"
            strokeWidth="1"
            className="transition-opacity duration-700 ease-out motion-reduce:transition-none"
            style={{ opacity: drawn ? 1 : 0, transitionDelay: '60ms' }}
          />
          {reachArcs.map((d, i) => (
            <path
              key={d}
              d={d}
              pathLength="100"
              strokeDasharray="100"
              className="transition-[stroke-dashoffset] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{ strokeDashoffset: drawn ? 0 : 100, transitionDelay: `${200 + i * 170}ms` }}
            />
          ))}
          <path
            d="M600 160 Q 600 40 600 20"
            strokeDasharray="3 9"
            strokeWidth="1"
            className="transition-opacity duration-700 ease-out motion-reduce:transition-none"
            style={{ opacity: drawn ? 1 : 0, transitionDelay: '900ms' }}
          />
        </g>
        <g fill="url(#ultacx-reach-arc)">
          {reachNodes.map((node, i) => (
            <circle
              key={node.cx}
              cx={node.cx}
              cy="160"
              r={node.r}
              className="transition-all duration-700 ease-out motion-reduce:transition-none"
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center',
                opacity: drawn ? 1 : 0,
                transform: drawn ? 'scale(1)' : 'scale(0.5)',
                transitionDelay: `${160 + i * 170}ms`,
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

export default function WhyRwanda() {
  // The copy column drifts against the image column as the section passes.
  const copyRef = useParallax({ speed: -35 })
  // The accent frames travel at different rates, so they separate from the
  // photograph and from each other instead of reading as a printed border.
  const outerFrameRef = useParallax({ speed: -24 })
  const innerFrameRef = useParallax({ speed: 12 })

  return (
    <Section id="why-rwanda" tone="dark">
      {/* Atmosphere: drifting brand aurora, plus grain to kill gradient banding */}
      <div
        aria-hidden="true"
        className="aurora pointer-events-none absolute -inset-y-32 left-[calc(50%-50vw)] w-screen opacity-50"
      />
      <div
        aria-hidden="true"
        className="grain pointer-events-none absolute -inset-y-32 left-[calc(50%-50vw)] w-screen"
      />

      <div className="relative grid items-center gap-12 lg:grid-cols-2 xl:gap-16">
        {/* Copy column */}
        <div ref={copyRef}>
          <SectionHeading
            align="left"
            eyebrow={whyRwanda.eyebrow}
            title={
              <TextReveal
                text={whyRwanda.heading}
                stagger={55}
                delay={120}
                className="[&>span]:-mb-[0.18em] [&>span]:pb-[0.18em]"
              />
            }
            dark
          />

          <div className="mt-7 max-w-2xl space-y-5">
            {whyRwanda.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph} delay={190 + i * 90}>
                <p className="text-lg leading-relaxed text-navy-100/75">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={390}>
            <span aria-hidden="true" className="mt-9 block h-px w-24 bg-accent-sweep" />
          </Reveal>
        </div>

        {/* Image column */}
        <Reveal delay={160}>
          <div className="relative">
            {/* Rotation lives on an inner box so the parallax hook owns the
                outer element's transform outright and cannot clear it. */}
            <div
              ref={outerFrameRef}
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 will-change-transform sm:-inset-5"
            >
              <div className="h-full w-full rotate-1 rounded-3xl border border-white/15 sm:rotate-2" />
            </div>
            <div
              ref={innerFrameRef}
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 will-change-transform sm:-inset-3"
            >
              <div className="h-full w-full -rotate-1 rounded-3xl border border-white/[0.07]" />
            </div>

            <TiltCard
              as="figure"
              max={6}
              glareTone="dark"
              className="overflow-hidden rounded-3xl shadow-deep"
            >
              <SmartImage
                src={whyRwanda.image}
                alt={whyRwanda.imageAlt}
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/15 to-transparent"
              />
              {/* Sheen riding the pointer position the tilt hook publishes —
                  the card's own glare sits behind an opaque photograph. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(340px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.12),transparent_62%)] opacity-[var(--glare,0)] transition-opacity duration-300"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/15"
              />
            </TiltCard>
          </div>
        </Reveal>
      </div>

      {/* The ULTA CX Advantage */}
      <div className="relative mt-20 lg:mt-28">
        <ReachMotif />

        <Reveal>
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            <h3 className="text-display-sm text-white">{whyRwanda.advantageHeading}</h3>
            <span aria-hidden="true" className="rule-accent hidden flex-1 opacity-25 sm:block" />
            <span aria-hidden="true" className="h-px w-16 shrink-0 bg-gold-400/70 sm:w-12" />
          </div>
        </Reveal>

        <div className="relative mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5 xl:gap-8">
          {whyRwanda.advantages.map((item, i) => (
            <Reveal key={item.title} delay={i * 70} className="h-full">
              {/* The stepping offset lives on a wrapper: the tilt hook writes
                  transform straight to the card's style and would clear it. */}
              <div className={['h-full', stepOffsets[i % stepOffsets.length]].join(' ')}>
                <TiltCard
                  as="article"
                  max={7}
                  glareTone="dark"
                  className="group h-full min-w-0 rounded-2xl glass-dark"
                  innerClassName="flex h-full flex-col rounded-2xl p-6 transition-colors duration-300 group-hover:bg-white/[0.035] xl:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="edge-sheen pointer-events-none absolute inset-x-5 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span className="inline-flex w-fit rounded-xl bg-white/10 p-3 text-azure-200">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h4 className="mt-5 break-words font-display text-base font-semibold leading-snug text-white">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-navy-100/70">{item.body}</p>
                </TiltCard>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
