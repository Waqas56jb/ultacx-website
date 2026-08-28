import { ArrowRight, ChevronDown } from 'lucide-react'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import Reveal from '../ui/Reveal.jsx'
import { hero, home } from '../../data/content.js'

/**
 * Opening hero. Bespoke full-bleed composition (no <Section> wrapper) so the
 * navy backdrop, photographic depth layer and gradient mesh can be stacked
 * behind a single centred column of copy.
 *
 * Every visible string is read from src/data/content.js — the headline is
 * split programmatically so the closing words can carry the brand gradient
 * without the copy ever being retyped.
 */

const titleWords = hero.title.trim().split(/\s+/)
const headlineLead = titleWords.slice(0, -2).join(' ')
const headlineFocus = titleWords.slice(-2).join(' ')

/* Trust signals are read straight from `home.why` (titles only, never retyped):
   Scalable Solutions, International Service Delivery, Quality Focused.
   The full five-card treatment lives in the WhyUltaCX section. */
const trustSignals = [1, 3, 4].map((index) => home.why[index]).filter(Boolean)

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-navy-900 pb-28 pt-[calc(var(--nav-h)_+_3rem)] sm:pb-32 sm:pt-[calc(var(--nav-h)_+_4rem)]"
    >
      {/* Photographic depth layer, held far back beneath the navy gradients */}
      <img
        src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2000&q=80"
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-[0.18]"
      />

      {/* Navy scrim over the photograph so headline contrast stays high */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/80 via-navy-900/55 to-navy-900"
      />

      {/* Brand mesh gradient */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-mesh-navy" />

      {/* Fine grid texture, faded at the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 grid-texture mask-fade-x opacity-30"
      />

      {/* Large soft azure glow behind the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-18%] -z-10 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-azure-500/25 blur-[130px] sm:h-[52rem] sm:w-[52rem]"
      />

      {/* Cooler moss glow, low right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-[-15%] -z-10 h-[26rem] w-[26rem] rounded-full bg-moss-500/20 blur-[120px] sm:h-[36rem] sm:w-[36rem]"
      />

      {/* Base fade so the hero settles into the section that follows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-900 to-transparent"
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full glass-dark px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-100/85 sm:text-xs">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
              {hero.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-7 text-display-xl text-balance text-white">
              {headlineLead}{' '}
              <span className="text-gradient-brand">{headlineFocus}</span>
            </h1>
          </Reveal>

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
              <Reveal
                key={item.title}
                as="li"
                delay={400 + i * 70}
                className="inline-flex max-w-full items-center gap-2.5 rounded-full glass-dark px-3.5 py-2 sm:px-4"
              >
                <span className="inline-flex shrink-0 rounded-lg bg-white/10 p-1.5 text-azure-200">
                  <Icon name={item.icon} className="h-4 w-4" />
                </span>
                <span className="text-[13px] font-medium leading-snug text-navy-100/85 sm:text-sm">
                  {item.title}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to the next section"
        className="group absolute inset-x-0 bottom-7 mx-auto hidden w-max rounded-full border border-white/15 bg-white/5 p-2.5 text-navy-100/60 backdrop-blur-sm transition-colors duration-300 hover:border-white/35 hover:text-white sm:block"
      >
        <ChevronDown aria-hidden="true" className="h-5 w-5 animate-float" strokeWidth={1.75} />
      </a>
    </section>
  )
}
