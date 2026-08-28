import { Target, Eye } from 'lucide-react'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import { about } from '../../data/content.js'

/**
 * "Who We Are" — an editorial two-column intro (heading left, narrative right)
 * with the third paragraph pulled out as a gold-ruled callout, followed by the
 * Mission / Vision pair.
 */
export default function About() {
  return (
    <Section id="about" tone="light">
      {/* Intro: asymmetric editorial split */}
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading align="left" eyebrow={about.eyebrow} title={about.heading} />

          <Reveal delay={200}>
            <div aria-hidden="true" className="mt-9 hidden h-px w-24 bg-accent-sweep lg:block" />
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pt-3">
          <div className="space-y-7">
            {about.paragraphs.map((paragraph, index) =>
              index === 2 ? (
                <Reveal key={index} delay={index * 70}>
                  <p className="border-l-2 border-gold-400 pl-6 font-display text-xl leading-snug tracking-tight text-navy-800 sm:text-2xl">
                    {paragraph}
                  </p>
                </Reveal>
              ) : (
                <Reveal key={index} delay={index * 70}>
                  <p className="text-lg leading-relaxed text-navy-500">{paragraph}</p>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Full-width accent rule for rhythm between the narrative and the cards */}
      <Reveal delay={120}>
        <div aria-hidden="true" className="mt-16 h-px w-full bg-accent-sweep opacity-40 lg:mt-20" />
      </Reveal>

      {/* Mission / Vision */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:gap-8">
        <Reveal className="h-full">
          <article className="relative h-full overflow-hidden rounded-3xl bg-navy-800 p-9 shadow-deep transition-all duration-300 hover:-translate-y-1">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-mesh-navy opacity-90" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent-sweep opacity-70" />

            <div className="relative">
              <span className="inline-flex rounded-xl bg-white/10 p-3 text-azure-200">
                <Target className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="mt-7 text-display-sm text-white">{about.mission.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-navy-100/75">{about.mission.body}</p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={70} className="h-full">
          <article className="relative h-full overflow-hidden rounded-3xl border border-navy-100 bg-white p-9 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent-sweep opacity-40" />

            <span className="inline-flex rounded-xl bg-moss-50 p-3 text-moss-600">
              <Eye className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h3 className="mt-7 text-display-sm text-navy-800">{about.vision.title}</h3>
            <p className="mt-4 text-base leading-relaxed text-navy-500">{about.vision.body}</p>
          </article>
        </Reveal>
      </div>
    </Section>
  )
}
