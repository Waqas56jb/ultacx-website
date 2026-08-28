import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import Icon from '../ui/Icon.jsx'
import { about } from '../../data/content.js'

/**
 * "Our Core Values" — the dark chapter break in the page rhythm.
 * Six values on a 3-column grid, each numbered with a large watermark index.
 */
export default function CoreValues() {
  return (
    <Section id="values" tone="dark">
      <SectionHeading eyebrow="What Drives Us" title={about.valuesHeading} align="center" dark />

      <div className="relative mt-14 sm:mt-16 lg:mt-20">
        {/* Depth: soft radial glows sitting behind the grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-full max-w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-azure-500/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 right-0 h-[260px] w-3/4 max-w-[380px] rounded-full bg-moss-500/[0.08] blur-3xl"
        />

        <ul className="relative grid list-none grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {about.values.map((value, i) => (
            <Reveal as="li" key={value.title} delay={i * 70} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass-dark p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.09]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-7 top-7 font-display text-4xl font-bold leading-none tracking-tight text-white/10 transition-colors duration-300 group-hover:text-white/20"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="inline-flex w-fit rounded-xl bg-white/10 p-3 text-azure-200 transition-colors duration-300 group-hover:bg-white/[0.16]">
                  <Icon name={value.icon} className="h-6 w-6" />
                </span>

                <h3 className="mt-6 font-display text-lg text-white">{value.title}</h3>

                <p className="mt-3 text-[15px] leading-relaxed text-navy-100/75">{value.body}</p>

                {/* Accent hairline pinned to the card foot so it aligns across the row */}
                <div className="mt-auto pt-7">
                  <span
                    aria-hidden="true"
                    className="block h-px w-10 bg-accent-sweep opacity-50 transition-all duration-300 group-hover:w-16 group-hover:opacity-100"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  )
}
