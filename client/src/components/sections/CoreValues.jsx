import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import TextReveal from '../ui/TextReveal.jsx'
import TiltCard from '../ui/TiltCard.jsx'
import Spotlight from '../ui/Spotlight.jsx'
import Icon from '../ui/Icon.jsx'
import { about } from '../../data/content.js'

/**
 * "Our Core Values" — the dark chapter break in the page rhythm.
 * Six values on a 3-column grid, each numbered with a large watermark index.
 *
 * Depth model per card (see index.css / TiltCard):
 *   translateZ(-20px)  watermark index  — recedes behind the surface
 *   z = 0              frosted panel + edge sheen
 *   depth-1 (18px)     title
 *   depth-2 (36px)     icon chip
 * The frosted panel is a leaf layer rather than a wrapper, because
 * backdrop-filter on an ancestor would flatten the 3D context above it.
 *
 * The hover lift sits on the inner layer, never on the TiltCard node itself:
 * the tilt hook writes `transform` straight to that node, so a second
 * transform class there is overwritten on the first pointer move (and snaps
 * back on the next), which kills the lift silently.
 */
export default function CoreValues() {
  return (
    <Section id="values" tone="dark" className="grain">
      {/* Atmosphere: slow brand aurora drifting behind the whole chapter */}
      <div
        aria-hidden="true"
        className="aurora pointer-events-none absolute -inset-y-24 left-1/2 z-0 w-screen -translate-x-1/2 opacity-50"
      />

      <SectionHeading
        eyebrow="What Drives Us"
        title={<TextReveal text={about.valuesHeading} as="span" stagger={55} delay={120} />}
        align="center"
        dark
        className="relative z-10"
      />

      <div className="relative z-10 mt-14 sm:mt-16 lg:mt-20">
        {/* Depth: soft radial glows sitting behind the grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-full max-w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-azure-500/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 right-0 h-[260px] w-3/4 max-w-[380px] rounded-full bg-moss-500/[0.08] blur-3xl"
        />

        <Spotlight tone="dark" radius={420}>
          <ul className="relative grid list-none grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {about.values.map((value, i) => (
              <Reveal as="li" key={value.title} delay={i * 70} className="h-full">
                <TiltCard
                  as="article"
                  max={8}
                  scale={1.01}
                  glareTone="dark"
                  className="group h-full rounded-2xl"
                  innerClassName="h-full transition-transform duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none"
                >
                  {/* Frosted surface — the card's z = 0 plane */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-2xl glass-dark transition-colors duration-300 group-hover:border-white/25 group-hover:bg-white/[0.09]"
                  />

                  {/* Hairline that sweeps across the top edge on hover */}
                  <span
                    aria-hidden="true"
                    className="edge-sheen pointer-events-none absolute inset-x-7 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-90 motion-reduce:transition-none"
                  />

                  {/* Watermark index pushed back so it parallaxes against the face */}
                  <span
                    aria-hidden="true"
                    style={{ transform: 'translateZ(-20px)' }}
                    className="pointer-events-none absolute right-7 top-7 font-display text-4xl font-bold leading-none tracking-tight text-white/10 transition-colors duration-300 group-hover:text-white/20"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative z-10 flex h-full transform-3d flex-col p-7">
                    <span className="depth-2 inline-flex w-fit rounded-xl bg-white/10 p-3 text-azure-200 transition-colors duration-300 group-hover:bg-white/[0.16]">
                      <Icon name={value.icon} className="h-6 w-6" />
                    </span>

                    <h3 className="depth-1 mt-6 font-display text-lg text-white">{value.title}</h3>

                    <p className="mt-3 text-[15px] leading-relaxed text-navy-100/75">{value.body}</p>

                    {/* Accent hairline pinned to the card foot so it aligns across the row */}
                    <div className="mt-auto pt-7">
                      <span
                        aria-hidden="true"
                        className="block h-px w-10 bg-accent-sweep opacity-50 transition-all duration-300 group-hover:w-16 group-hover:opacity-100"
                      />
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </ul>
        </Spotlight>
      </div>
    </Section>
  )
}
