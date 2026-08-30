import { useEffect, useRef, useState } from 'react'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import TextReveal from '../ui/TextReveal.jsx'
import TiltCard from '../ui/TiltCard.jsx'
import Icon from '../ui/Icon.jsx'
import useReducedMotion from '../../hooks/useReducedMotion.js'
import { howItWorks } from '../../data/content.js'

/**
 * How It Works — the engagement process rendered as a connected
 * timeline (horizontal on lg, vertical on mobile), followed by the
 * measurement panel listing KPI names only.
 *
 * Motion layer: a single IntersectionObserver on the timeline container drives
 * the whole sequence. The connector draws itself (scaleX from the left on lg,
 * scaleY from the top on mobile) over ~1.2s, and each step marker pops from
 * 0.8 to 1 on a stagger timed to the line arriving at it, so the process reads
 * left-to-right. Under prefers-reduced-motion the finished state is rendered
 * immediately and every transition is switched off.
 */
export default function HowItWorks() {
  const steps = howItWorks.steps
  const lastIndex = steps.length - 1

  const timelineRef = useRef(null)
  const reduced = useReducedMotion()
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const node = timelineRef.current
    if (!node) return undefined

    // Reduced motion (or no observer support) — render the line already drawn.
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setDrawn(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <Section id="how-it-works" tone="light">
      <SectionHeading
        eyebrow={howItWorks.eyebrow}
        title={
          <TextReveal
            text={howItWorks.heading}
            stagger={55}
            // Stops the per-word masks clipping descenders at display sizes; the
            // negative margin cancels the padding so the line box is unchanged.
            className="[&>span]:-mb-[0.12em] [&>span]:pb-[0.12em]"
          />
        }
        align="center"
      />

      {/* ---------- Process timeline ---------- */}
      <div ref={timelineRef} className="relative mt-14 sm:mt-16 lg:mt-20">
        {/* Continuous horizontal connector, first marker centre → last marker centre.
            Draws from the left as the timeline enters the viewport. */}
        <span
          aria-hidden="true"
          className={[
            'pointer-events-none absolute left-[10%] right-[10%] top-7 hidden h-px origin-left',
            'bg-gradient-to-r from-navy-100 via-azure-200 to-navy-100',
            'transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:block',
            drawn ? 'scale-x-100' : 'scale-x-0',
          ].join(' ')}
        />

        <ol
          aria-label="Engagement process steps"
          className="relative grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-8"
        >
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.number}
              delay={i * 70}
              className="group relative min-w-0"
            >
              {/* Vertical connector segment (mobile / tablet only), drawn from the top */}
              {i !== lastIndex && (
                <span
                  aria-hidden="true"
                  style={{ transitionDelay: `${i * 170}ms` }}
                  className={[
                    'pointer-events-none absolute -bottom-10 left-7 top-16 w-px origin-top',
                    'bg-gradient-to-b from-azure-200 to-navy-100',
                    'transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:hidden',
                    drawn ? 'scale-y-100' : 'scale-y-0',
                  ].join(' ')}
                />
              )}

              <TiltCard
                max={5}
                glare={false}
                className="min-w-0"
                innerClassName="flex items-start gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              >
                {/* Marker — lifted furthest off the surface so it floats under tilt */}
                <span className="depth-2 relative z-10 shrink-0">
                  <span
                    style={{ transitionDelay: `${90 + i * 170}ms` }}
                    className={[
                      'block transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                      drawn ? 'scale-100' : 'scale-[0.8]',
                    ].join(' ')}
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-navy-100 bg-white text-navy-700 shadow-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-azure-400 group-hover:text-azure-600 group-hover:shadow-glow motion-reduce:transition-none">
                      <Icon name={step.icon} className="h-6 w-6" />
                    </span>
                  </span>
                </span>

                <div className="min-w-0 flex-1 transform-3d pt-0.5 lg:mt-6 lg:flex-none lg:pt-0">
                  <span className="depth-1 block font-display text-xs font-semibold tracking-[0.24em] text-azure-600">
                    {step.number}
                  </span>

                  <h3 className="depth-1 mt-2 font-display text-lg text-navy-800">{step.title}</h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-navy-500">{step.body}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* ---------- Measurement panel (KPI names only) ---------- */}
      <div className="group relative mt-16 overflow-hidden rounded-3xl border border-navy-100/70 bg-navy-50/70 px-5 py-10 sm:px-10 sm:py-12 lg:mt-24">
        {/* Hairline that sweeps the panel top edge on hover */}
        <span
          aria-hidden="true"
          className="edge-sheen pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
        />

        <Reveal>
          <span
            aria-hidden="true"
            className="mx-auto block h-px w-12 bg-gradient-to-r from-transparent via-gold-400 to-transparent"
          />
          <p
            id="how-it-works-metrics-label"
            className="mt-5 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-400"
          >
            {howItWorks.metricsLabel}
          </p>
        </Reveal>

        <ul
          aria-labelledby="how-it-works-metrics-label"
          className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3"
        >
          {howItWorks.metrics.map((metric, i) => (
            <Reveal as="li" key={metric} delay={i * 70}>
              <span className="group/pill inline-flex items-center gap-2.5 rounded-full border border-navy-100 bg-white px-5 py-2.5 text-sm font-medium text-navy-700 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift motion-reduce:transition-none">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-moss-500 transition-transform duration-300 group-hover/pill:scale-125 motion-reduce:transition-none"
                />
                {metric}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  )
}
