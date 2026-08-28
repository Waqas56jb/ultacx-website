import { ArrowRight } from 'lucide-react'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import Icon from '../ui/Icon.jsx'
import { deliveryModels, partner } from '../../data/content.js'

/**
 * Our Delivery Models — four engagement options as equal-height cards.
 * The accent colour rotates across the row so the grid reads as a set;
 * motion stays limited to lift + opacity.
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
        title={deliveryModels.heading}
        align="center"
      />

      <ul className="mt-14 grid list-none grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
        {deliveryModels.items.map((item, i) => {
          const accent = ACCENTS[i % ACCENTS.length]

          return (
            <Reveal as="li" key={item.title} delay={i * 70} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift">
                <span
                  aria-hidden="true"
                  className={[
                    'pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                    accent.rule,
                  ].join(' ')}
                />

                <span
                  aria-hidden="true"
                  className={[
                    'inline-flex w-fit rounded-xl p-3 transition-colors duration-300',
                    accent.chip,
                  ].join(' ')}
                >
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>

                <h3 className="mt-6 font-display text-lg leading-snug text-navy-800">
                  {item.title}
                </h3>

                <p className="mt-3 break-words text-sm leading-relaxed text-navy-500">{item.body}</p>
              </article>
            </Reveal>
          )
        })}
      </ul>

      <Reveal delay={140} className="mt-14 lg:mt-16">
        <div className="mx-auto max-w-2xl">
          <div aria-hidden="true" className="rule-accent" />
          <div className="mt-8 flex justify-center">
            <Button href="#contact" variant="outline" size="sm">
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
