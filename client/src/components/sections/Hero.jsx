import { Fragment, useCallback, useEffect, useRef } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import Reveal from '../ui/Reveal.jsx'
import TextReveal from '../ui/TextReveal.jsx'
import useParallax from '../../hooks/useParallax.js'
import useReducedMotion from '../../hooks/useReducedMotion.js'
import { hero, home } from '../../data/content.js'

/**
 * Opening hero. Bespoke full-bleed composition (no <Section> wrapper) so the
 * navy backdrop, photographic depth layer and drifting brand aurora can be
 * stacked behind a single centred column of copy.
 *
 * Depth is built from four independently parallaxed layers (photograph,
 * aurora, and the two glow orbs) travelling at different rates, plus a
 * pointer-driven offset published as --px / --py on the section. Every layer
 * is decorative, aria-hidden and pointer-events-none; all of it is inert under
 * prefers-reduced-motion and on coarse pointers.
 *
 * Every visible string is read from src/data/content.js — the headline is
 * split programmatically so the closing words can carry the brand gradient
 * without the copy ever being retyped.
 */

const titleWords = hero.title.trim().split(/\s+/)
const headlineLead = titleWords.slice(0, -2)
const headlineFocus = titleWords.slice(-2)

/* Headline cadence: slow enough to read as deliberate, short enough that the
   whole line has landed before the eye reaches the subtitle. */
const HEADLINE_DELAY = 90
const WORD_STAGGER = 80

/* Trust signals are read straight from `home.why` (titles only, never retyped):
   Scalable Solutions, International Service Delivery, Quality Focused.
   The full five-card treatment lives in the WhyUltaCX section. */
const trustSignals = [1, 3, 4].map((index) => home.why[index]).filter(Boolean)

/* Pointer offset for a decorative layer. The custom properties default to 0,
   so with no pointer (touch, reduced motion, before the first move) every
   layer sits exactly where the static composition puts it. */
const drift = (x, y) => ({
  transform: `translate3d(calc(var(--px, 0) * ${x}px), calc(var(--py, 0) * ${y}px), 0)`,
})

/* Same, for a layer that also has to keep its own -50% centring. */
const driftCentred = (x, y) => ({
  transform: `translate3d(calc(-50% + (var(--px, 0) * ${x}px)), calc(var(--py, 0) * ${y}px), 0)`,
})

export default function Hero() {
  const rootRef = useRef(null)
  const frame = useRef(0)
  const finePointer = useRef(false)
  const reduced = useReducedMotion()

  /* Four different rates across four layers — the spread is what reads as depth. */
  const photoRef = useParallax({ speed: 30 })
  const auroraRef = useParallax({ speed: -20 })
  const azureOrbRef = useParallax({ speed: 60 })
  const mossOrbRef = useParallax({ speed: -45 })

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine)')
    finePointer.current = query.matches

    const onChange = (event) => {
      finePointer.current = event.matches
    }

    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  /* Park the layers if the motion preference flips while the page is open. */
  useEffect(() => {
    const node = rootRef.current
    if (node && reduced) {
      node.style.setProperty('--px', '0')
      node.style.setProperty('--py', '0')
    }
    return () => cancelAnimationFrame(frame.current)
  }, [reduced])

  /* Pointer parallax: one rAF-throttled listener writing two custom properties.
     No React state is touched, so moving the mouse never triggers a render. */
  const onPointerMove = useCallback(
    (event) => {
      if (reduced || !finePointer.current) return
      const { clientX, clientY } = event

      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        const node = rootRef.current
        if (!node) return

        const rect = node.getBoundingClientRect()
        if (!rect.width || !rect.height) return

        const px = ((clientX - rect.left) / rect.width) * 2 - 1
        const py = ((clientY - rect.top) / rect.height) * 2 - 1

        node.style.setProperty('--px', Math.max(-1, Math.min(1, px)).toFixed(3))
        node.style.setProperty('--py', Math.max(-1, Math.min(1, py)).toFixed(3))
      })
    },
    [reduced],
  )

  const onPointerLeave = useCallback(() => {
    cancelAnimationFrame(frame.current)
    const node = rootRef.current
    if (!node) return
    node.style.setProperty('--px', '0')
    node.style.setProperty('--py', '0')
  }, [])

  const chipMotion = reduced
    ? ''
    : 'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1'

  return (
    <section
      id="home"
      ref={rootRef}
      onMouseMove={onPointerMove}
      onMouseLeave={onPointerLeave}
      className="grain relative isolate flex min-h-[92vh] items-center overflow-hidden bg-navy-900 pb-28 pt-[calc(var(--nav-h)_+_3rem)] sm:pb-32 sm:pt-[calc(var(--nav-h)_+_4rem)]"
    >
      {/* Photographic depth layer, held far back beneath the navy gradients.
          The outer div carries the scroll parallax (inset vertically so its
          travel never uncovers an edge); the inner one carries the pointer
          drift, so two transforms never fight over one element. */}
      <div
        ref={photoRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -inset-y-20 -z-10"
      >
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out motion-reduce:transition-none"
          style={drift(-10, -6)}
        >
          <img
            src="https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=2000&q=80"
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-center opacity-[0.18]"
          />
        </div>
      </div>

      {/* Navy scrim over the photograph so headline contrast stays high */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/80 via-navy-900/55 to-navy-900"
      />

      {/* Brand mesh gradient, now a slowly drifting aurora */}
      <div
        ref={auroraRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -inset-y-24 -z-10"
      >
        <div
          className="aurora absolute inset-0 transition-transform duration-700 ease-out motion-reduce:transition-none"
          style={drift(14, 8)}
        />
      </div>

      {/* Fine grid texture, faded at the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 grid-texture mask-fade-x opacity-30"
      />

      {/* Large soft azure glow behind the headline */}
      <div
        ref={azureOrbRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute left-1/2 top-[-18%] h-[38rem] w-[38rem] rounded-full bg-azure-500/25 blur-[130px] transition-transform duration-700 ease-out will-change-transform motion-reduce:transition-none sm:h-[52rem] sm:w-[52rem]"
          style={driftCentred(18, 12)}
        />
      </div>

      {/* Cooler moss glow, low right */}
      <div
        ref={mossOrbRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute -bottom-40 right-[-15%] h-[26rem] w-[26rem] rounded-full bg-moss-500/20 blur-[120px] transition-transform duration-700 ease-out will-change-transform motion-reduce:transition-none sm:h-[36rem] sm:w-[36rem]"
          style={drift(-22, -14)}
        />
      </div>

      {/* Base fade so the hero settles into the section that follows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-900 to-transparent"
      />

      <div className="container-x relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full glass-dark px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-100/85 sm:text-xs">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
              {hero.eyebrow}
            </p>
          </Reveal>

          {/* One word per TextReveal so the gaps between words stay in the h1's
              own text flow, and so the gradient span wraps exactly the closing
              words while the stagger keeps running across the whole line. */}
          <h1 className="mt-7 text-display-xl leading-[1.12] text-balance text-white">
            {headlineLead.map((word, i) => (
              <Fragment key={`lead-${word}-${i}`}>
                <TextReveal text={word} delay={HEADLINE_DELAY + i * WORD_STAGGER} />{' '}
              </Fragment>
            ))}
            {headlineFocus.map((word, i) => (
              <Fragment key={`focus-${word}-${i}`}>
                <TextReveal
                  text={word}
                  wordClassName="text-gradient-brand"
                  delay={HEADLINE_DELAY + (headlineLead.length + i) * WORD_STAGGER}
                />
                {i < headlineFocus.length - 1 ? ' ' : ''}
              </Fragment>
            ))}
          </h1>

          <Reveal delay={170}>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-navy-100/75 sm:text-xl">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3.5 sm:flex-row sm:items-center sm:gap-4">
              <Button href="#contact" variant="accent" size="lg">
                {hero.primaryCta}
                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
                />
              </Button>
              <Button href="#services" variant="ghostDark" size="lg">
                {hero.secondaryCta}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={330}>
            <div
              aria-hidden="true"
              className="mx-auto mt-14 h-px w-24 bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
            />
          </Reveal>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {trustSignals.map((item, i) => (
              <Reveal key={item.title} as="li" delay={400 + i * 70} className="max-w-full">
                <div
                  className={[
                    'group relative inline-flex max-w-full items-center gap-2.5 overflow-hidden rounded-full glass-dark px-3.5 py-2 sm:px-4',
                    chipMotion,
                  ].join(' ')}
                >
                  <span
                    aria-hidden="true"
                    className="edge-sheen pointer-events-none absolute inset-x-6 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="inline-flex shrink-0 rounded-lg bg-white/10 p-1.5 text-azure-200">
                    <Icon name={item.icon} className="h-4 w-4" />
                  </span>
                  <span className="text-[13px] font-medium leading-snug text-navy-100/85 sm:text-sm">
                    {item.title}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <a
        href="#overview"
        aria-label="Scroll to the next section"
        className="group absolute inset-x-0 bottom-7 z-10 mx-auto hidden w-max rounded-full border border-white/15 bg-white/5 p-2.5 text-navy-100/60 backdrop-blur-sm transition-colors duration-300 hover:border-white/35 hover:text-white sm:block"
      >
        <ChevronDown aria-hidden="true" className="h-5 w-5 animate-float" strokeWidth={1.75} />
      </a>
    </section>
  )
}
