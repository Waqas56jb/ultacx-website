import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import Icon from '../ui/Icon.jsx'
import { howItWorks } from '../../data/content.js'

/**
 * How It Works — the engagement process rendered as a connected
 * timeline (horizontal on lg, vertical on mobile), followed by the
 * measurement panel listing KPI names only.
 */
export default function HowItWorks() {
  const steps = howItWorks.steps
  const lastIndex = steps.length - 1

  return (
    <Section id="how-it-works" tone="light">
      <SectionHeading eyebrow={howItWorks.eyebrow} title={howItWorks.heading} align="center" />

      {/* ---------- Process timeline ---------- */}
      <div className="relative mt-14 sm:mt-16 lg:mt-20">
        {/* Continuous horizontal connector, first marker centre → last marker centre */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-navy-100 via-azure-200 to-navy-100 lg:block"
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
              {/* Vertical connector segment (mobile / tablet only) */}
              {i !== lastIndex && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-10 left-7 top-16 w-px bg-gradient-to-b from-azure-200 to-navy-100 lg:hidden"
                />
              )}

              <div className="flex items-start gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                {/* Marker */}
                <span className="relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-navy-100 bg-white text-navy-700 shadow-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-azure-400 group-hover:text-azure-600 group-hover:shadow-glow">
                  <Icon name={step.icon} className="h-6 w-6" />
                </span>

                <div className="min-w-0 flex-1 pt-0.5 lg:mt-6 lg:flex-none lg:pt-0">
                  <span className="block font-display text-xs font-semibold tracking-[0.24em] text-azure-600">
                    {step.number}
                  </span>

                  <h3 className="mt-2 font-display text-lg text-navy-800">{step.title}</h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-navy-500">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* ---------- Measurement panel (KPI names only) ---------- */}
      <div className="mt-16 rounded-3xl border border-navy-100/70 bg-navy-50/70 px-5 py-10 sm:px-10 sm:py-12 lg:mt-24">
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
              <span className="inline-flex items-center gap-2.5 rounded-full border border-navy-100 bg-white px-5 py-2.5 text-sm font-medium text-navy-700 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-lift">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-moss-500" />
                {metric}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  )
}
