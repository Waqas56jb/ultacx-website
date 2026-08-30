import { ArrowRight } from 'lucide-react'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import Icon from '../ui/Icon.jsx'
import Spotlight from '../ui/Spotlight.jsx'
import TiltCard from '../ui/TiltCard.jsx'
import TextReveal from '../ui/TextReveal.jsx'
import Marquee from '../ui/Marquee.jsx'
import { hero, industries } from '../../data/content.js'

/**
 * Industries We Support — eight equal-height cards on a soft navy wash.
 *
 * Depth layer: one Spotlight listener lights the grid under the pointer, each
 * card tilts toward it, and the chip / title sit on raised Z planes so the card
 * reads as a real surface rather than a rotated rectangle. Colour shifts still
 * carry the hover accent. A decorative marquee of the same industry names gives
 * the section one piece of continuous motion.
 *
 * Note: the card and its inner layer keep `transform-style: preserve-3d`, so
 * neither may take `overflow-hidden` — that would flatten the Z stack. The top
 * hairline is inset by the corner radius instead of being clipped by it.
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

// Tilt writes `transform` straight to the node, so the card cannot rely on
// `transition-all` (which the primitive's own transition-transform would beat
// in the cascade). Naming the properties inline keeps the shadow and border
// eased on hover while the tilt stays smooth.
//
// For the same reason the card carries no `hover:-translate-y-*`: a second
// transform on this node is overwritten by the tilt write on the first pointer
// move (and snaps back on the next), so the lift would silently die or jitter.
// The 7deg tilt already supplies the lift; the shadow, border, glare and edge
// sheen carry the rest of the hover state, on every pointer and with no motion.
const CARD_TRANSITION = { transitionProperty: 'transform, box-shadow, border-color' }

const renderPill = (item, key) => (
  <span
    key={key}
    className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border border-navy-100 bg-white/85 px-4 py-2 text-[13px] font-medium text-navy-600 shadow-soft"
  >
    <Icon name={item.icon} className="h-4 w-4 shrink-0 text-azure-600" />
    {item.title}
  </span>
)

export default function Industries() {
  return (
    <Section id="industries" tone="tint">
      <SectionHeading
        eyebrow={industries.eyebrow}
        title={<TextReveal text={industries.heading} delay={90} stagger={60} />}
        intro={industries.intro}
        align="center"
      />

      <Spotlight tone="light" radius={420} className="mt-14 lg:mt-16">
        <ul className="grid list-none grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {industries.items.map((item, i) => {
            const accent = ACCENTS[i % ACCENTS.length]

            return (
              <Reveal as="li" key={item.title} delay={i * 70} className="h-full">
                <TiltCard
                  as="article"
                  max={7}
                  glareTone="light"
                  style={CARD_TRANSITION}
                  className="group h-full rounded-2xl border border-navy-100 bg-white shadow-soft hover:border-navy-200 hover:shadow-lift"
                  innerClassName="flex h-full flex-col p-7"
                >
                  <span
                    aria-hidden="true"
                    className={[
                      'edge-sheen pointer-events-none absolute left-4 right-4 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                      accent.rule,
                    ].join(' ')}
                  />

                  <span
                    aria-hidden="true"
                    className={[
                      'depth-2 inline-flex w-fit rounded-xl p-3 transition-colors duration-300',
                      accent.chip,
                    ].join(' ')}
                  >
                    <Icon name={item.icon} className="h-6 w-6" />
                  </span>

                  <h3 className="depth-1 mt-6 font-display text-base leading-snug text-navy-800">
                    {item.title}
                  </h3>

                  <p className="mt-3 break-words text-sm leading-relaxed text-navy-500">
                    {item.body}
                  </p>
                </TiltCard>
              </Reveal>
            )
          })}
        </ul>
      </Spotlight>

      <Reveal delay={120} className="mt-12 lg:mt-14">
        <Marquee
          items={industries.items}
          renderItem={renderPill}
          speed={42}
          gapClass="gap-3 sm:gap-4"
          className="py-3"
        />
      </Reveal>

      <Reveal delay={140} className="mt-14 lg:mt-16">
        <div className="mx-auto max-w-2xl">
          <div aria-hidden="true" className="rule-accent" />
          <div className="mt-8 flex justify-center">
            <Button href="#contact" variant="outline" size="sm">
              {hero.primaryCta}
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
