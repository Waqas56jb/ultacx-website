import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import Icon from '../ui/Icon.jsx'
import { home } from '../../data/content.js'

/**
 * "Why ULTA CX?" — the value-proposition grid.
 * Five reasons on a 3-column grid: the first runs wide as a featured card so the
 * trailing row stays balanced, and the section closes on a centred pull-quote.
 */
const CHIPS = [
  'bg-azure-50 text-azure-600',
  'bg-moss-50 text-moss-600',
  'bg-gold-50 text-gold-600',
  'bg-azure-50 text-azure-600',
  'bg-moss-50 text-moss-600',
]

const CARD_BASE =
  'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 ' +
  'shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift'

export default function WhyUltaCX() {
  return (
    <Section id="why-ultacx" tone="tint">
      <SectionHeading eyebrow="Our Difference" title={home.whyHeading} align="center" />

      <ul className="mt-14 grid list-none grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
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
              <article
                className={[
                  CARD_BASE,
                  featured
                    ? 'bg-gradient-to-br from-azure-50 via-white to-white p-8 sm:p-10'
                    : 'bg-white p-7',
                ].join(' ')}
              >
                {/* Hairline that draws itself across the top edge on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent-sweep transition-transform duration-500 ease-out group-hover:scale-x-100"
                />

                <div
                  className={
                    featured
                      ? 'flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8'
                      : 'flex flex-col'
                  }
                >
                  <span
                    className={[
                      'inline-flex w-fit shrink-0 rounded-xl transition-colors duration-300',
                      chip,
                      featured ? 'p-4' : 'p-3',
                    ].join(' ')}
                  >
                    <Icon
                      name={item.icon}
                      className={featured ? 'h-7 w-7' : 'h-6 w-6'}
                    />
                  </span>

                  <div className={featured ? 'sm:max-w-xl' : ''}>
                    <h3
                      className={[
                        'font-display leading-snug text-navy-800',
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
              </article>
            </Reveal>
          )
        })}
      </ul>

      {/* Emotional close: the client's own line, held between two hairlines */}
      <Reveal delay={140} className="mt-16 sm:mt-20 lg:mt-24">
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
      </Reveal>
    </Section>
  )
}
