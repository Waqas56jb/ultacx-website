import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import TextReveal from '../ui/TextReveal.jsx'
import TiltCard from '../ui/TiltCard.jsx'
import SmartImage from '../ui/SmartImage.jsx'
import useParallax from '../../hooks/useParallax.js'
import { home, hero } from '../../data/content.js'

/* Stock photograph only — no claim is made that this depicts ULTA CX premises. */
const OVERVIEW_IMAGE =
  'https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?auto=format&fit=crop&w=1400&q=80'

/**
 * Introduction block: the positioning statement plus a composed image treatment.
 *
 * Every sentence is read from `home` / `hero` in src/data/content.js. The only
 * hardcoded string is the one-word structural eyebrow that labels the section.
 *
 * Depth layer: the image column drifts against the text column on scroll, the
 * offset outline behind the photograph drifts again at its own rate, and the
 * photograph itself tilts toward the pointer. All three are pure transform /
 * opacity work and all three switch themselves off for reduced-motion users
 * (useParallax and useTilt no-op; useTilt also no-ops on coarse pointers).
 */
export default function Overview() {
  // Negative speed moves the column against the scroll — reads as "further away".
  const imageColumn = useParallax({ speed: -30 })
  // Positive speed on the outline so it separates from the photo it sits behind.
  const accentFrame = useParallax({ speed: 40 })

  return (
    <Section id="overview" tone="light">
      <div className="grid items-center gap-12 lg:grid-cols-2 xl:gap-16">
        {/* Text column */}
        <div className="order-1 min-w-0">
          <SectionHeading align="left" eyebrow="Overview">
            {/* Same h2 typography SectionHeading renders, revealed word by word */}
            <TextReveal
              as="h2"
              text={home.heading}
              stagger={55}
              delay={90}
              className="mt-5 text-display-md text-balance text-navy-800"
            />
          </SectionHeading>

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
          {/* Vertical-only parallax: no horizontal travel, so nothing can widen the row */}
          <div ref={imageColumn} className="will-change-transform motion-reduce:will-change-auto">
            <Reveal delay={140}>
              <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
                {/* Offset outline accent behind the photograph — drifts at its own rate */}
                <span
                  ref={accentFrame}
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-5 -right-5 hidden h-full w-full rounded-3xl border border-azure-200 will-change-transform motion-reduce:will-change-auto sm:block"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-6 -top-6 hidden h-24 w-24 rounded-3xl bg-azure-50 lg:block"
                />

                <TiltCard
                  max={7}
                  glareTone="light"
                  className="overflow-hidden rounded-3xl shadow-deep"
                >
                  <SmartImage
                    src={OVERVIEW_IMAGE}
                    decoding="async"
                    alt="Two customer service representatives wearing headsets at their workstations in a bright open-plan office"
                    className="aspect-[4/3] w-full object-cover backface-hidden sm:aspect-[16/10] lg:aspect-[4/5]"
                  />
                  {/* Soft navy scrim keeps the photograph tonally inside the brand palette */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/45 via-navy-900/5 to-transparent"
                  />
                  {/*
                    Specular highlight that follows the pointer. It rides the --mx/--my/--glare
                    custom properties useTilt publishes on the card, so there is still only one
                    pointer listener here; TiltCard's own glare sits beneath the opaque photo.
                    Untouched on touch and reduced motion, where the hook never sets --glare.
                  */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(340px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.20),transparent_60%)] opacity-[var(--glare,0)] transition-opacity duration-300"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-navy-900/10"
                  />
                </TiltCard>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  )
}
