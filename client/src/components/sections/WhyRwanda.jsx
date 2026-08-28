import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import Icon from '../ui/Icon.jsx'
import { whyRwanda } from '../../data/content.js'

/**
 * "Why Rwanda?" — the cinematic dark chapter of the page.
 * Editorial two-column opener (copy + framed skyline image) followed by the
 * ULTA CX Advantage row, arranged as a gentle arc that echoes the faint
 * connection motif drawn behind it.
 */

/* Subtle vertical stepping so the five advantages arc across the row on lg. */
const stepOffsets = [
  'lg:translate-y-0',
  'lg:-translate-y-3',
  'lg:-translate-y-6',
  'lg:-translate-y-3',
  'lg:translate-y-0',
]

export default function WhyRwanda() {
  return (
    <Section id="why-rwanda" tone="dark">
      <div className="grid items-center gap-12 lg:grid-cols-2 xl:gap-16">
        {/* Copy column */}
        <div>
          <SectionHeading
            align="left"
            eyebrow={whyRwanda.eyebrow}
            title={whyRwanda.heading}
            dark
          />

          <div className="mt-7 max-w-2xl space-y-5">
            {whyRwanda.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph} delay={190 + i * 90}>
                <p className="text-lg leading-relaxed text-navy-100/75">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={390}>
            <span aria-hidden="true" className="mt-9 block h-px w-24 bg-accent-sweep" />
          </Reveal>
        </div>

        {/* Image column */}
        <Reveal delay={160}>
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 rotate-1 rounded-3xl border border-white/15 sm:-inset-5 sm:rotate-2"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 -rotate-1 rounded-3xl border border-white/[0.07] sm:-inset-3"
            />

            <figure className="relative overflow-hidden rounded-3xl shadow-deep">
              <SmartImage
                src={whyRwanda.image}
                alt={whyRwanda.imageAlt}
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/15 to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/15"
              />
            </figure>
          </div>
        </Reveal>
      </div>

      {/* The ULTA CX Advantage */}
      <div className="relative mt-20 lg:mt-28">
        {/* Faint international-reach motif behind the advantages row */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-16 hidden opacity-[0.12] lg:block"
        >
          <svg viewBox="0 0 1200 220" className="w-full" role="presentation" focusable="false">
            <defs>
              <linearGradient id="ultacx-reach-arc" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0F8BD4" />
                <stop offset="55%" stopColor="#3FA935" />
                <stop offset="100%" stopColor="#E9A81C" />
              </linearGradient>
            </defs>
            <g
              fill="none"
              stroke="url(#ultacx-reach-arc)"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M0 160 H1200" strokeDasharray="2 10" strokeWidth="1" />
              <path d="M100 160 Q 237 58 375 160" />
              <path d="M375 160 Q 487 92 600 160" />
              <path d="M600 160 Q 712 92 825 160" />
              <path d="M825 160 Q 962 58 1100 160" />
              <path d="M600 160 Q 600 40 600 20" strokeDasharray="3 9" strokeWidth="1" />
            </g>
            <g fill="url(#ultacx-reach-arc)">
              <circle cx="100" cy="160" r="5" />
              <circle cx="375" cy="160" r="5" />
              <circle cx="600" cy="160" r="7" />
              <circle cx="825" cy="160" r="5" />
              <circle cx="1100" cy="160" r="5" />
            </g>
          </svg>
        </div>

        <Reveal>
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            <h3 className="text-display-sm text-white">{whyRwanda.advantageHeading}</h3>
            <span aria-hidden="true" className="rule-accent hidden flex-1 opacity-25 sm:block" />
            <span aria-hidden="true" className="h-px w-16 shrink-0 bg-gold-400/70 sm:w-12" />
          </div>
        </Reveal>

        <div className="relative mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5 xl:gap-8">
          {whyRwanda.advantages.map((item, i) => (
            <Reveal key={item.title} delay={i * 70} className="h-full">
              <article
                className={[
                  'flex h-full min-w-0 flex-col rounded-2xl glass-dark p-6 transition-all duration-300 hover:bg-white/[0.09] xl:p-7',
                  stepOffsets[i % stepOffsets.length],
                ].join(' ')}
              >
                <span className="inline-flex w-fit rounded-xl bg-white/10 p-3 text-azure-200">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <h4 className="mt-5 break-words font-display text-base font-semibold leading-snug text-white">
                  {item.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-navy-100/70">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
