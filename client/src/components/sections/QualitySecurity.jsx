import { ShieldCheck, FileCheck } from 'lucide-react'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import TextReveal from '../ui/TextReveal.jsx'
import TiltCard from '../ui/TiltCard.jsx'
import Spotlight from '../ui/Spotlight.jsx'
import Icon from '../ui/Icon.jsx'
import useParallax from '../../hooks/useParallax.js'
import { qualitySecurity } from '../../data/content.js'

/**
 * Quality & Security — a statement of intent on the left, the operating
 * controls as a calm two-column register on the right, and the regulatory
 * qualifier closing the section in its own bordered panel.
 *
 * Depth model:
 *   section        aurora + grain atmosphere behind the whole chapter
 *   z < 0          two parallax glows drifting at different speeds
 *   z = 0          each control row's frosted panel + edge sheen
 *   depth-1 (18px) the row's icon chip — the one element that lifts
 *
 * Two constraints shape the markup here:
 *   1. No transform may land on the statement column or any ancestor of it —
 *      a transformed ancestor would break `position: sticky` if the column is
 *      ever pinned. Both parallax layers are therefore decorative, absolutely
 *      positioned leaves that no content descends from.
 *   2. `glass-dark` carries a backdrop-filter, which flattens the 3D context of
 *      everything above it, so the frosted surface is a leaf overlay rather
 *      than the wrapper the content sits inside.
 *
 * With motion off the section is unchanged in layout and legibility: the
 * aurora stops drifting, parallax and tilt no-op, reveals resolve immediately.
 */
export default function QualitySecurity() {
  const items = qualitySecurity.items
  const lastIndex = items.length - 1

  // Decorative only — never an ancestor of the statement column.
  const deepGlow = useParallax({ speed: -46 })
  const gridGlow = useParallax({ speed: 34 })

  return (
    <Section id="quality-security" tone="dark" className="grain">
      {/* Atmosphere: slow brand aurora drifting behind the whole chapter */}
      <div
        aria-hidden="true"
        className="aurora pointer-events-none absolute -inset-y-24 left-1/2 z-0 w-screen -translate-x-1/2 opacity-40"
      />

      {/* Far layer: drifts against the scroll, so it reads as further away */}
      <div
        ref={deepGlow}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-10 z-0 h-[320px] w-[320px] rounded-full bg-azure-500/10 blur-3xl sm:h-[420px] sm:w-[420px]"
      />

      <div className="relative z-10 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        {/* Statement — deliberately transform-free (see note above) */}
        <div className="min-w-0 lg:col-span-5">
          <Reveal>
            <span className="inline-flex rounded-xl glass-dark p-3 text-azure-200">
              <ShieldCheck aria-hidden="true" className="h-6 w-6" strokeWidth={1.6} />
            </span>
          </Reveal>

          <SectionHeading
            align="left"
            eyebrow={qualitySecurity.eyebrow}
            title={<TextReveal text={qualitySecurity.heading} as="span" stagger={55} delay={120} />}
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
        <div className="relative min-w-0 lg:col-span-7">
          {/* Near layer: sits behind the register, drifts with the scroll */}
          <div
            ref={gridGlow}
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[260px] w-[260px] rounded-full bg-moss-500/[0.09] blur-3xl sm:h-[340px] sm:w-[340px]"
          />

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

          <Spotlight tone="dark" radius={420} className="mt-7">
            <ul
              aria-labelledby="quality-security-approach"
              className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
            >
              {items.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.label}
                  delay={i * 70}
                  className={i === lastIndex ? 'h-full sm:col-span-2' : 'h-full'}
                >
                  <TiltCard
                    max={5}
                    glareTone="dark"
                    className="group h-full rounded-xl"
                    innerClassName="h-full"
                  >
                    {/* Frosted surface as a leaf layer — its backdrop-filter would
                        otherwise flatten the depth of the chip above it. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-xl glass-dark transition-colors duration-300 group-hover:border-white/25 group-hover:bg-white/[0.09]"
                    />

                    {/* Hairline that sweeps along the top edge on hover */}
                    <span
                      aria-hidden="true"
                      className="edge-sheen pointer-events-none absolute inset-x-5 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-90 motion-reduce:transition-none"
                    />

                    <div className="relative z-10 flex h-full transform-3d items-center gap-4 px-5 py-4">
                      <span className="depth-1 inline-flex shrink-0 rounded-lg bg-white/10 p-2 text-azure-200 transition-colors duration-300 group-hover:bg-azure-500/25">
                        <Icon name={item.icon} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 text-sm font-medium leading-snug text-white">
                        {item.label}
                      </span>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </ul>
          </Spotlight>
        </div>
      </div>

      {/* Regulatory qualifier — a legal statement, left plain on purpose */}
      <Reveal delay={120} className="relative z-10 mt-14 lg:mt-20">
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
