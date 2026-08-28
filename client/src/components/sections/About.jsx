import { useEffect, useRef, useState } from 'react'
import { Target, Eye } from 'lucide-react'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import TextReveal from '../ui/TextReveal.jsx'
import TiltCard from '../ui/TiltCard.jsx'
import useReducedMotion from '../../hooks/useReducedMotion.js'
import { about } from '../../data/content.js'

/**
 * A hairline accent rule that draws itself in from the left on scroll.
 *
 * Purely decorative, so it animates transform only (scaleX from a left origin)
 * and snaps straight to full width for reduced-motion users and when there is
 * no IntersectionObserver.
 */
function AccentRule({ className = '', delay = 0 }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ transitionDelay: `${delay}ms` }}
      className={[
        'h-px origin-left bg-accent-sweep transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
        shown ? 'scale-x-100' : 'scale-x-0',
        className,
      ].join(' ')}
    />
  )
}

/**
 * "Who We Are" — an editorial two-column intro (heading left, narrative right)
 * with the third paragraph pulled out as a gold-ruled callout, followed by the
 * Mission / Vision pair.
 *
 * Depth layer: both cards tilt toward the pointer, with their icon chip and
 * heading lifted off the surface on the Z axis so the card reads as a real
 * plane rather than a rotated rectangle. All of it is pointer-only decoration —
 * the hooks no-op on touch and under prefers-reduced-motion.
 */
export default function About() {
  return (
    <Section id="about" tone="light">
      {/* Intro: asymmetric editorial split */}
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            align="left"
            eyebrow={about.eyebrow}
            title={<TextReveal text={about.heading} as="span" stagger={60} delay={120} />}
          />

          <AccentRule delay={200} className="mt-9 hidden w-24 lg:block" />
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
      <AccentRule delay={120} className="mt-16 w-full opacity-40 lg:mt-20" />

      {/* Mission / Vision */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:gap-8">
        <Reveal className="h-full">
          <TiltCard
            as="article"
            max={6}
            scale={1.01}
            glareTone="dark"
            className="group h-full rounded-3xl bg-navy-800 shadow-deep"
            innerClassName="h-full p-9"
          >
            {/* Decorative surface: mesh, hairline, sheen and grain, clipped to the card radius */}
            <div
              aria-hidden="true"
              className="grain pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-0 bg-mesh-navy opacity-90" />
              <div className="absolute inset-x-0 top-0 h-px bg-accent-sweep opacity-70" />
              <div className="edge-sheen absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none" />
            </div>

            <div className="relative transform-3d">
              <span className="depth-2 inline-flex rounded-xl bg-white/10 p-3 text-azure-200">
                <Target className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="depth-1 mt-7 text-display-sm text-white">{about.mission.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-navy-100/75">{about.mission.body}</p>
            </div>
          </TiltCard>
        </Reveal>

        <Reveal delay={70} className="h-full">
          <TiltCard
            as="article"
            max={6}
            scale={1.01}
            glareTone="light"
            className="group h-full rounded-3xl border border-navy-100 bg-white shadow-soft hover:border-navy-200 hover:shadow-lift"
            innerClassName="h-full p-9"
            style={{ transitionProperty: 'transform, box-shadow, border-color' }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-accent-sweep opacity-40" />
              <div className="edge-sheen absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none" />
            </div>

            <div className="relative transform-3d">
              <span className="depth-2 inline-flex rounded-xl bg-moss-50 p-3 text-moss-600">
                <Eye className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="depth-1 mt-7 text-display-sm text-navy-800">{about.vision.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-navy-500">{about.vision.body}</p>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </Section>
  )
}
