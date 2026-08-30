import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import Icon from '../ui/Icon.jsx'
import Spotlight from '../ui/Spotlight.jsx'
import TiltCard from '../ui/TiltCard.jsx'
import TextReveal from '../ui/TextReveal.jsx'
import useParallax from '../../hooks/useParallax.js'
import { home } from '../../data/content.js'

/**
 * "Why ULTA CX?" — the value-proposition grid.
 * Five reasons on a 3-column grid: the first runs wide as a featured card so the
 * trailing row stays balanced, and the section closes on a centred pull-quote.
 *
 * Depth layer: one spotlight tracks the pointer across the whole grid, each card
 * tilts toward the cursor, and inside a card the icon chip and the heading are
 * pushed along Z so they float above the body copy. Everything here is a pointer
 * affordance — the primitives no-op on touch and under prefers-reduced-motion,
 * where the section renders exactly as it did before.
 */
const CHIPS = [
  'bg-azure-50 text-azure-600',
  'bg-moss-50 text-moss-600',
  'bg-gold-50 text-gold-600',
  'bg-azure-50 text-azure-600',
  'bg-moss-50 text-moss-600',
]

/**
 * No `overflow-hidden` here on purpose: overflow is a grouping property, so it
 * would collapse the card's `preserve-3d` back to flat and the depth-* children
 * would stop reading as depth. The top hairline gets its own clipper instead.
 */
const CARD_BASE =
  'group relative flex h-full flex-col rounded-2xl border border-navy-100 ' +
  'shadow-soft duration-300 hover:border-navy-200 hover:shadow-lift'

/**
 * TiltCard declares `transition-transform`, which sorts after `transition-all`
 * in Tailwind's output and would make the border and shadow snap on hover.
 * Declaring the property inline wins outright and keeps all three on one ease.
 */
const CARD_TRANSITION = { transitionProperty: 'transform, border-color, box-shadow' }

export default function WhyUltaCX() {
  // Slow drift on the closing line — positive speed reads as "further away".
  const closingRef = useParallax({ speed: 38 })

  return (
    <Section id="why-ultacx" tone="tint">
      <SectionHeading eyebrow="Our Difference" align="center">
        <TextReveal
          as="h2"
          text={home.whyHeading}
          delay={90}
          stagger={70}
          // Each word sits in an `overflow-hidden` mask; at display-md the line box
          // (1.12) is shorter than the glyph box, so the tail of the "y" in "Why"
          // gets shaved. The padding gives the mask room, the negative margin
          // cancels it so the line box is unchanged.
          className="mt-5 text-display-md text-balance text-navy-800 [&>span]:-mb-[0.12em] [&>span]:pb-[0.12em]"
        />
      </SectionHeading>

      <Spotlight tone="light" radius={460} className="mt-14 lg:mt-16">
        <ul className="grid list-none grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {home.why.map((item, i) => {
            const featured = i === 0
            const chip = CHIPS[i % CHIPS.length]

            return (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 70}
                className={featured ? 'h-full sm:col-span-2' : 'h-full'}
              >
                {/* The featured card is wide, so it tilts less — big surfaces
                    swinging hard is the thing that reads as cheap. */}
                <TiltCard
                  as="article"
                  max={featured ? 4 : 6}
                  scale={featured ? 1 : 1.01}
                  glareTone="light"
                  style={CARD_TRANSITION}
                  className={[
                    CARD_BASE,
                    featured
                      ? 'bg-gradient-to-br from-azure-50 via-white to-white'
                      : 'bg-white',
                  ].join(' ')}
                  innerClassName={featured ? 'p-8 sm:p-10' : 'p-7'}
                >
                  {/* Hairline that draws itself across the top edge on hover,
                      with a highlight sweeping along it (.edge-sheen, fired by
                      the card's `group`). Its own wrapper does the corner
                      clipping so the card can stay a live 3D context. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-2xl"
                  >
                    <span className="edge-sheen absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none" />
                  </span>

                  <div
                    className={
                      featured
                        ? 'flex transform-3d flex-col gap-6 sm:flex-row sm:items-start sm:gap-8'
                        : 'flex transform-3d flex-col'
                    }
                  >
                    <span
                      className={[
                        'depth-2 inline-flex w-fit shrink-0 rounded-xl transition-colors duration-300',
                        chip,
                        featured ? 'p-4' : 'p-3',
                      ].join(' ')}
                    >
                      <Icon
                        name={item.icon}
                        className={featured ? 'h-7 w-7' : 'h-6 w-6'}
                      />
                    </span>

                    <div className={['transform-3d', featured ? 'sm:max-w-xl' : ''].join(' ')}>
                      <h3
                        className={[
                          'depth-1 font-display leading-snug text-navy-800',
                          featured ? 'text-xl sm:text-2xl' : 'mt-6 text-lg',
                        ].join(' ')}
                      >
                        {item.title}
                      </h3>

                      <p
                        className={[
                          'mt-3 leading-relaxed text-navy-500',
                          featured ? 'text-base sm:text-lg' : 'text-[15px]',
                        ].join(' ')}
                      >
                        {item.body}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </ul>
      </Spotlight>

      {/* Emotional close: the client's own line, held between two hairlines */}
      <Reveal delay={140} className="mt-16 sm:mt-20 lg:mt-24">
        <div
          ref={closingRef}
          className="will-change-transform motion-reduce:will-change-auto"
        >
          <div className="mx-auto flex max-w-5xl items-center gap-8 lg:gap-12">
            <span aria-hidden="true" className="rule-accent hidden flex-1 md:block" />
            <p className="mx-auto max-w-2xl text-balance text-center font-display text-display-sm text-navy-800">
              {home.closingLine}
            </p>
            <span aria-hidden="true" className="rule-accent hidden flex-1 md:block" />
          </div>
          <span
            aria-hidden="true"
            className="mx-auto mt-7 block h-px w-14 bg-gold-400/80 sm:mt-8"
          />
        </div>
      </Reveal>
    </Section>
  )
}
