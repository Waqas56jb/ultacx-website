import { useCallback, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import TextReveal from '../ui/TextReveal.jsx'
import useParallax from '../../hooks/useParallax.js'
import useReducedMotion from '../../hooks/useReducedMotion.js'
import useTilt from '../../hooks/useTilt.js'
import { partner } from '../../data/content.js'

/* Magnetic travel caps, in px. Deliberately small: the CTA should lean toward
   the cursor, not chase it. Y is tighter because vertical drift competes with
   the button's own hover lift. */
const MAGNET_X = 7
const MAGNET_Y = 4

/* Button's base class lifts it by -translate-y-0.5 (-2px) on hover. An inline
   transform beats that class, so the lift is folded into the magnetic offset
   rather than lost. */
const HOVER_LIFT = -2

const clamp = (value) => Math.max(-1, Math.min(1, value))

/**
 * A <Button> that leans a few pixels toward the pointer while it is hovered.
 *
 * The offset is written straight to the anchor's style inside a rAF frame, so
 * moving the mouse never triggers a React render. Listeners are passed as
 * props (Button spreads them onto the real anchor) and the node is read from
 * event.currentTarget, so the element stays a plain focusable <a> with every
 * variant, size and the global 44px coarse-pointer tap target intact.
 *
 * Inert for reduced-motion users and on coarse pointers, where a hover offset
 * would only ever latch on after a tap.
 */
function MagneticButton({ children, ...props }) {
  const frame = useRef(0)
  const node = useRef(null)
  const finePointer = useRef(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    finePointer.current = query.matches

    const onChange = (event) => {
      finePointer.current = event.matches
    }

    query.addEventListener('change', onChange)
    return () => {
      query.removeEventListener('change', onChange)
      cancelAnimationFrame(frame.current)
    }
  }, [])

  /* Park the button if the motion preference flips while it is offset. */
  useEffect(() => {
    if (!reduced) return
    cancelAnimationFrame(frame.current)
    if (node.current) node.current.style.transform = ''
  }, [reduced])

  const onMove = useCallback(
    (event) => {
      /* React clears currentTarget once dispatch ends — read it now, not in the frame. */
      const el = event.currentTarget
      node.current = el
      if (reduced || !finePointer.current) return

      const { clientX, clientY } = event

      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        if (!rect.width || !rect.height) return

        const nx = clamp(((clientX - rect.left) / rect.width - 0.5) * 2)
        const ny = clamp(((clientY - rect.top) / rect.height - 0.5) * 2)

        el.style.transform =
          `translate3d(${(nx * MAGNET_X).toFixed(2)}px, ` +
          `${(ny * MAGNET_Y + HOVER_LIFT).toFixed(2)}px, 0)`
      })
    },
    [reduced],
  )

  const onLeave = useCallback((event) => {
    cancelAnimationFrame(frame.current)
    /* Back to '' so the button's own hover/active classes take over again. */
    event.currentTarget.style.transform = ''
  }, [])

  return (
    <Button {...props} onMouseEnter={onMove} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </Button>
  )
}

/**
 * Partner With ULTA CX — the closing conversion band.
 *
 * A single inset gradient panel on a tinted section, so the page's last
 * statement reads as a distinct plate rather than another content row.
 * Depth comes from the brand sweep + navy scrim + mesh + grid texture only:
 * no photography and no claims beyond the client's own copy.
 *
 * Motion layer — this is the page's arrival, so everything here is slow and
 * weighted:
 *
 *  - The panel splits into a clipped decorative plate and a content block that
 *    sits one depth step proud of it on the Z axis. A very gentle whole-panel
 *    tilt (3deg; it is a large surface) then moves the copy against the plate,
 *    which is what reads as real depth rather than a rotated rectangle. The
 *    plate keeps `isolate` and `overflow-hidden` — both would force the 3D
 *    context flat if they stayed on the tilting element.
 *  - A drifting aurora sits over the brand sweep, two corner glows parallax at
 *    opposing rates so the plate never looks static, and grain over the whole
 *    thing kills banding on the large gradient.
 *  - The navy scrim was deepened from /45 to /60 to pay for the extra light:
 *    the aurora and both glows sit *under* it, so the scrim still sets the
 *    floor for contrast (worst realistic sample behind the body copy measures
 *    ~5.3:1 for navy-100/75, up from ~3.5:1 before).
 *  - The heading and the closing gradient line are word-revealed, the closing
 *    line delayed so it lands last, immediately before the CTAs.
 *
 * Every layer above is decorative, aria-hidden and pointer-events-none, and all
 * of it is inert under prefers-reduced-motion and on coarse pointers. Every
 * visible string still comes from src/data/content.js.
 */
export default function Partner() {
  /* Large surface, so the tilt runs at a quarter of the usual card angle. */
  const panelRef = useTilt({ max: 3, glare: true })
  const azureGlowRef = useParallax({ speed: 54 })
  const mossGlowRef = useParallax({ speed: -46 })

  return (
    <Section id="partner" tone="tint">
      <div
        ref={panelRef}
        className="relative transform-3d rounded-3xl shadow-deep transition-transform duration-300 ease-out motion-reduce:transition-none"
      >
        {/* Decorative plate: everything that has to be clipped to the rounded
            corners lives in here, as one flat layer behind the copy. */}
        <div
          aria-hidden="true"
          className="grain pointer-events-none absolute inset-0 isolate overflow-hidden rounded-3xl bg-brand-sweep"
        >
          {/* Drifting brand light over the sweep, held back so the scrim below
              still governs contrast. */}
          <div className="aurora absolute inset-0 opacity-70" />

          {/* Corner glows travelling against each other as the panel crosses
              the viewport. Both are clipped by the plate, so no amount of
              travel can escape the panel or widen the page. */}
          <div
            ref={azureGlowRef}
            className="absolute inset-0 will-change-transform motion-reduce:will-change-auto"
          >
            <div className="absolute -left-24 -top-28 h-64 w-64 rounded-full bg-azure-400/35 blur-[110px] sm:h-[26rem] sm:w-[26rem]" />
          </div>
          <div
            ref={mossGlowRef}
            className="absolute inset-0 will-change-transform motion-reduce:will-change-auto"
          >
            <div className="absolute -bottom-28 -right-24 h-64 w-64 rounded-full bg-moss-500/30 blur-[110px] sm:h-[24rem] sm:w-[24rem]" />
          </div>

          {/* Scrim over the aurora and the glows: deepens the bright end of the
              sweep so white and navy-100 copy holds contrast panel-wide. */}
          <div className="absolute inset-0 bg-navy-950/60" />
          <div className="absolute inset-0 bg-mesh-navy" />
          <div className="absolute inset-0 grid-texture opacity-30" />

          {/* Light catching the surface as it tilts, driven by the --mx / --my
              the tilt hook publishes. Sits at zero opacity until a fine pointer
              actually enters the panel. */}
          <span className="absolute inset-0 bg-[radial-gradient(520px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.07),transparent_60%)] opacity-[var(--glare,0)] transition-opacity duration-500 motion-reduce:transition-none" />
        </div>

        {/* Copy sits one depth step above the plate so the tilt moves the two
            against each other. Padding moved here from the old single panel. */}
        <div className="relative depth-1 px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <SectionHeading
            align="center"
            eyebrow={partner.eyebrow}
            title={<TextReveal text={partner.heading} as="span" stagger={60} delay={120} />}
            dark
          >
            <div className="mt-7 space-y-4">
              {partner.paragraphs.map((text, i) => (
                <Reveal key={text} delay={170 + i * 70}>
                  <p className="break-words text-lg leading-relaxed text-navy-100/75">{text}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={330}>
              <div
                aria-hidden="true"
                className="mx-auto mt-12 h-px w-24 bg-gradient-to-r from-transparent via-gold-400/70 to-transparent"
              />
            </Reveal>

            {/* The last line of the page: word-revealed on its own delay so it
                resolves just before the buttons arrive. */}
            <TextReveal
              as="p"
              text={partner.closing}
              delay={340}
              stagger={50}
              className="mt-8 text-balance font-display text-2xl leading-snug text-gradient-brand sm:text-3xl"
            />

            <Reveal delay={480}>
              <div className="mt-10 flex flex-col flex-wrap items-stretch justify-center gap-3.5 sm:flex-row sm:items-center sm:gap-4">
                {partner.ctas.map((label, i) => (
                  <MagneticButton
                    key={label}
                    href="#contact"
                    size="lg"
                    variant={i === 0 ? 'onDark' : 'ghostDark'}
                  >
                    {label}
                    {i === 0 && (
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
                      />
                    )}
                  </MagneticButton>
                ))}
              </div>
            </Reveal>
          </SectionHeading>
        </div>
      </div>
    </Section>
  )
}
