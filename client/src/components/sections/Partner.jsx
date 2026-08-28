import { ArrowRight } from 'lucide-react'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import { partner } from '../../data/content.js'

/**
 * Partner With ULTA CX — the closing conversion band.
 *
 * A single inset gradient panel on a tinted section, so the page's last
 * statement reads as a distinct plate rather than another content row.
 * Depth comes from the brand sweep + navy scrim + mesh + grid texture only:
 * no photography and no claims beyond the client's own copy.
 */
export default function Partner() {
  return (
    <Section id="partner" tone="tint">
      <div className="relative isolate overflow-hidden rounded-3xl bg-brand-sweep px-5 py-16 shadow-deep sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        {/* Scrim first: deepens the bright end of the sweep so white and
            navy-100 copy holds contrast across the full panel width. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-navy-950/45" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-mesh-navy" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grid-texture opacity-30"
        />

        <div className="relative">
          <SectionHeading align="center" eyebrow={partner.eyebrow} title={partner.heading} dark>
            <div className="mt-7 space-y-4">
              {partner.paragraphs.map((text, i) => (
                <Reveal key={text} delay={170 + i * 70}>
                  <p className="break-words text-lg leading-relaxed text-navy-100/75">{text}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={330}>
              <div
                aria-hidden="true"
                className="mx-auto mt-12 h-px w-24 bg-gradient-to-r from-transparent via-gold-400/70 to-transparent"
              />
              <p className="mt-8 text-balance font-display text-2xl leading-snug text-gradient-brand sm:text-3xl">
                {partner.closing}
              </p>
            </Reveal>

            <Reveal delay={410}>
              <div className="mt-10 flex flex-col flex-wrap items-stretch justify-center gap-3.5 sm:flex-row sm:items-center sm:gap-4">
                {partner.ctas.map((label, i) => (
                  <Button
                    key={label}
                    href="#contact"
                    size="lg"
                    variant={i === 0 ? 'onDark' : 'ghostDark'}
                  >
                    {label}
                    {i === 0 && (
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
                      />
                    )}
                  </Button>
                ))}
              </div>
            </Reveal>
          </SectionHeading>
        </div>
      </div>
    </Section>
  )
}
