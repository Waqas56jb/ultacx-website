import { ArrowRight } from 'lucide-react'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import TextReveal from '../ui/TextReveal.jsx'
import TiltCard from '../ui/TiltCard.jsx'
import Spotlight from '../ui/Spotlight.jsx'
import Icon from '../ui/Icon.jsx'
import { deliveryModels, partner } from '../../data/content.js'

/**
 * Our Delivery Models — four engagement options as equal-height cards.
 * The accent colour rotates across the row so the grid reads as a set.
 *
 * Only four cards, so they carry the strongest depth on the page: each one
 * tilts toward the pointer (max 9deg) and its contents sit on three distinct
 * Z planes — icon chip highest, heading mid, body copy nearest the surface.
 *
 * The tilt hook writes `transform` straight onto the TiltCard node, so the
 * hover lift lives on the inner surface element instead: two transforms on one
 * node collide and the JS write would silently kill the lift.
 */
const ACCENTS = [
  {
    chip: 'bg-azure-50 text-azure-600 group-hover:bg-azure-600 group-hover:text-white',
    rule: 'bg-azure-500',
  },
  {
    chip: 'bg-moss-50 text-moss-600 group-hover:bg-moss-600 group-hover:text-white',
    rule: 'bg-moss-500',
  },
  {
    chip: 'bg-gold-50 text-gold-600 group-hover:bg-gold-600 group-hover:text-white',
    rule: 'bg-gold-500',
  },
]

export default function DeliveryModels() {
  return (
    <Section id="delivery-models" tone="tint">
      <SectionHeading
        eyebrow={deliveryModels.eyebrow}
        title={<TextReveal text={deliveryModels.heading} stagger={55} delay={60} />}
        align="center"
      />

      <Spotlight tone="light" className="mt-14 lg:mt-16">
        <ul className="grid list-none grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {deliveryModels.items.map((item, i) => {
            const accent = ACCENTS[i % ACCENTS.length]

            return (
              <Reveal as="li" key={item.title} delay={i * 70} className="h-full">
                <TiltCard
                  as="article"
                  max={9}
                  glare={false}
                  className="group h-full rounded-2xl"
                  innerClassName="h-full"
                >
                  {/* The card surface. Carries the hover lift so it never fights
                      the tilt transform on the TiltCard node above it, and keeps
                      overflow visible so the depth layers can sit off the plane. */}
                  <div className="relative flex h-full transform-3d flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:border-navy-200 group-hover:shadow-lift">
                    <span
                      aria-hidden="true"
                      className={[
                        'edge-sheen pointer-events-none absolute inset-x-4 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                        accent.rule,
                      ].join(' ')}
                    />

                    <span
                      aria-hidden="true"
                      className={[
                        'depth-3 inline-flex w-fit rounded-xl p-3 transition-colors duration-300',
                        accent.chip,
                      ].join(' ')}
                    >
                      <Icon name={item.icon} className="h-6 w-6" />
                    </span>

                    <h3 className="depth-2 mt-6 font-display text-lg leading-snug text-navy-800">
                      {item.title}
                    </h3>

                    <p className="depth-1 mt-3 break-words text-sm leading-relaxed text-navy-500">
                      {item.body}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </ul>
      </Spotlight>

      <Reveal delay={140} className="mt-14 lg:mt-16">
        <div className="mx-auto max-w-2xl">
          <div aria-hidden="true" className="rule-accent" />
          <div className="mt-8 flex justify-center">
            <Button href="/contact" variant="outline" size="sm">
              {partner.ctas[0]}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
