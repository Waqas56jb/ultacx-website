import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import { home, hero } from '../../data/content.js'

/* Stock photograph only — no claim is made that this depicts ULTA CX premises. */
const OVERVIEW_IMAGE =
  'https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?auto=format&fit=crop&w=1400&q=80'

/**
 * Introduction block: the positioning statement plus a composed image treatment.
 *
 * Every sentence is read from `home` / `hero` in src/data/content.js. The only
 * hardcoded string is the one-word structural eyebrow that labels the section.
 */
export default function Overview() {
  return (
    <Section id="overview" tone="light">
      <div className="grid items-center gap-12 lg:grid-cols-2 xl:gap-16">
        {/* Text column */}
        <div className="order-1 min-w-0">
          <SectionHeading align="left" eyebrow="Overview" title={home.heading} />

          <div className="mt-7 max-w-2xl space-y-5">
            {home.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 70}>
                <p
                  className={[
                    'leading-relaxed text-navy-500',
                    i === 0 ? 'text-lg' : 'text-base',
                  ].join(' ')}
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={240}>
            <div className="mt-8 max-w-2xl">
              <span aria-hidden="true" className="block h-px w-16 bg-gold-500/80" />
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
              <Button variant="primary" href="#services">
                {hero.secondaryCta}
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Button>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 text-[15px] font-semibold text-navy-700 underline decoration-navy-200 decoration-1 underline-offset-[6px] transition-colors duration-300 hover:text-azure-600 hover:decoration-azure-300"
              >
                {hero.primaryCta}
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Image column — sits below the text on mobile */}
        <div className="order-2 min-w-0">
          <Reveal delay={140}>
            <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
              {/* Offset outline accent behind the photograph */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-5 -right-5 hidden h-full w-full rounded-3xl border border-azure-200 sm:block"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-6 -top-6 hidden h-24 w-24 rounded-3xl bg-azure-50 lg:block"
              />

              <div className="relative overflow-hidden rounded-3xl shadow-deep">
                <SmartImage
                  src={OVERVIEW_IMAGE}
                  decoding="async"
                  alt="Two customer service representatives wearing headsets at their workstations in a bright open-plan office"
                  className="aspect-[4/3] w-full object-cover sm:aspect-[16/10] lg:aspect-[4/5]"
                />
                {/* Soft navy scrim keeps the photograph tonally inside the brand palette */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/45 via-navy-900/5 to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-navy-900/10"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
