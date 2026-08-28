import { ShieldCheck, FileCheck } from 'lucide-react'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import Icon from '../ui/Icon.jsx'
import { qualitySecurity } from '../../data/content.js'

/**
 * Quality & Security — a statement of intent on the left, the operating
 * controls as a calm two-column register on the right, and the regulatory
 * qualifier closing the section in its own bordered panel.
 */
export default function QualitySecurity() {
  const items = qualitySecurity.items
  const lastIndex = items.length - 1

  return (
    <Section id="quality-security" tone="dark">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        {/* Statement */}
        <div className="min-w-0 lg:col-span-5">
          <Reveal>
            <span className="inline-flex rounded-xl glass-dark p-3 text-azure-200">
              <ShieldCheck aria-hidden="true" className="h-6 w-6" strokeWidth={1.6} />
            </span>
          </Reveal>

          <SectionHeading
            align="left"
            eyebrow={qualitySecurity.eyebrow}
            title={qualitySecurity.heading}
            dark
            className="mt-7"
          />

          <Reveal delay={220}>
            <p className="mt-8 text-balance font-display text-xl leading-snug text-white sm:text-[1.375rem]">
              {qualitySecurity.intro}
            </p>
          </Reveal>

          <Reveal delay={290}>
            <div aria-hidden="true" className="mt-6 h-px w-14 bg-gold-500/70" />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-100/75">
              {qualitySecurity.body}
            </p>
          </Reveal>
        </div>

        {/* Controls */}
        <div className="min-w-0 lg:col-span-7">
          <Reveal>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-7 shrink-0 bg-accent-sweep" />
              <h3
                id="quality-security-approach"
                className="min-w-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-azure-200"
              >
                {qualitySecurity.listLabel}
              </h3>
            </div>
          </Reveal>

          <ul
            aria-labelledby="quality-security-approach"
            className="mt-7 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
          >
            {items.map((item, i) => (
              <Reveal
                as="li"
                key={item.label}
                delay={i * 70}
                className={i === lastIndex ? 'h-full sm:col-span-2' : 'h-full'}
              >
                <div className="group flex h-full items-center gap-4 rounded-xl glass-dark px-5 py-4 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.09]">
                  <span className="inline-flex shrink-0 rounded-lg bg-white/10 p-2 text-azure-200 transition-colors duration-300 group-hover:bg-azure-500/25">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 text-sm font-medium leading-snug text-white">
                    {item.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      {/* Regulatory qualifier */}
      <Reveal delay={120} className="mt-14 lg:mt-20">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="inline-flex w-fit shrink-0 rounded-lg bg-white/10 p-2 text-gold-300">
              <FileCheck aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <p className="min-w-0 max-w-3xl text-sm leading-relaxed text-navy-100/70">
              {qualitySecurity.footnote}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
