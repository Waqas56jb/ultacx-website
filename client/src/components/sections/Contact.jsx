import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import TextReveal from '../ui/TextReveal.jsx'
import TiltCard from '../ui/TiltCard.jsx'
import Icon from '../ui/Icon.jsx'
import useReducedMotion from '../../hooks/useReducedMotion.js'
import { company, contact, home, partner, services } from '../../data/content.js'

/*
 * NOTE ON FACTS: the client supplied no email address, phone number, office
 * address or service-level commitment. None is rendered here and none may be
 * invented. The brand panel therefore carries the client's own copy only, and
 * the form itself is the single route into the business.
 */

const EMPTY_FORM = { fullName: '', email: '', phone: '', message: '', botField: '' }

/*
 * Fields get a refined focus treatment — border, a faint tint and the ring
 * easing in together — but they never move or scale. A field that shifts under
 * the caret is hostile to fill in, so only colour and the ring transition here.
 */
const INPUT_BASE =
  'w-full min-w-0 rounded-xl border bg-white px-4 py-3.5 text-navy-800 ' +
  'placeholder:text-navy-300 outline-none ' +
  'transition-[border-color,background-color,box-shadow] duration-300 ease-out ' +
  'motion-reduce:transition-none ' +
  'focus:ring-2 focus:ring-azure-500/25 disabled:bg-navy-50/60'

function fieldClass(hasError) {
  return [
    INPUT_BASE,
    hasError
      ? 'border-red-300 focus:border-red-400 focus:bg-red-50/40'
      : 'border-navy-100 hover:border-navy-200 focus:border-azure-400 focus:bg-azure-50/40',
  ].join(' ')
}

/**
 * The confirmation tick, easing up once as the success panel appears.
 *
 * Decoration only: it animates transform and opacity, runs a single time, and
 * starts at its final state for reduced-motion users.
 */
function SuccessMark() {
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (reduced) {
      setShown(true)
      return undefined
    }
    const frame = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(frame)
  }, [reduced])

  return (
    <span
      className={[
        'inline-flex h-16 w-16 items-center justify-center rounded-full bg-moss-50',
        'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
        shown ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
      ].join(' ')}
    >
      <CheckCircle2 className="h-8 w-8 text-moss-500" strokeWidth={1.6} aria-hidden="true" />
    </span>
  )
}

/** Client-side validation. Functional interface strings only, never marketing copy. */
function validate(values) {
  const errors = {}
  const name = values.fullName.trim()
  const email = values.email.trim()
  const phone = values.phone.trim()
  const message = values.message.trim()

  if (!name) errors.fullName = 'Please enter your full name.'
  if (!email) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = 'Please enter a valid email address.'
  if (!phone) errors.phone = 'Please enter your phone number.'
  else if (phone.length < 7) errors.phone = 'Please enter a complete phone number.'
  if (!message) errors.message = 'Please tell us about your requirements.'

  return errors
}

async function sendEnquiry(payload) {
  if (!payload) throw new Error('Missing form payload')

  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => null)
  if (!response.ok || !data?.ok) throw new Error(data?.message || 'Submission failed')
  return data
}

/**
 * Contact - a dark brand panel paired with a real, validated enquiry form.
 * Submission flows through 'idle' | 'submitting' | 'success' | 'error'.
 *
 * Depth layer: the brand panel is the only thing that moves. It tilts gently
 * toward the pointer over a drifting aurora, with its promise and service chips
 * lifted off the surface on the Z axis. The form panel is deliberately inert —
 * no tilt, no spotlight, no hover travel — because a form that shifts while you
 * are filling it in is hostile. All of it is pointer-only decoration: the hooks
 * no-op on touch and under prefers-reduced-motion.
 */
export default function Contact() {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const submitting = status === 'submitting'

  const textFields = [
    {
      id: 'contact-full-name',
      name: 'fullName',
      label: contact.fields.fullName,
      type: 'text',
      autoComplete: 'name',
      placeholder: '',
      className: 'sm:col-span-2',
    },
    {
      id: 'contact-email',
      name: 'email',
      label: contact.fields.email,
      type: 'email',
      autoComplete: 'email',
      placeholder: 'name@company.com',
      className: '',
    },
    {
      id: 'contact-phone',
      name: 'phone',
      label: contact.fields.phone,
      type: 'tel',
      autoComplete: 'tel',
      placeholder: '',
      className: '',
    },
  ]

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
    if (status === 'error') setStatus('idle')
  }

  function handleReset() {
    setValues(EMPTY_FORM)
    setErrors({})
    setStatus('idle')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    // Honeypot: a filled hidden field means an automated submission - drop it silently.
    if (values.botField) {
      setValues(EMPTY_FORM)
      setStatus('success')
      return
    }

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle')
      return
    }

    setStatus('submitting')
    try {
      await sendEnquiry({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
      })
      setValues(EMPTY_FORM)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contact" tone="light">
      <SectionHeading
        align="center"
        eyebrow={contact.eyebrow}
        title={<TextReveal text={contact.heading} as="span" stagger={70} delay={110} />}
        intro={contact.intro}
      >
        <Reveal delay={240}>
          <p className="mt-4 text-base leading-relaxed text-navy-500">{contact.body}</p>
        </Reveal>
      </SectionHeading>

      <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 xl:gap-14">
        {/* Brand panel */}
        <div className="min-w-0 lg:col-span-5">
          <Reveal className="h-full">
            <TiltCard
              max={5}
              glareTone="dark"
              className="group h-full rounded-3xl bg-navy-800 shadow-deep"
              innerClassName="h-full p-6 sm:p-8 lg:p-10"
            >
              {/* Atmosphere: mesh, drifting aurora, hairline and grain, clipped to the radius */}
              <div
                aria-hidden="true"
                className="grain pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
              >
                <div className="absolute inset-0 bg-mesh-navy opacity-90" />
                <div className="aurora absolute inset-0 opacity-40" />
                <div className="absolute inset-x-0 top-0 h-px bg-accent-sweep opacity-70" />
                <div className="edge-sheen absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none" />
              </div>

              <div className="relative transform-3d">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-azure-200">
                  {company.tagline}
                </p>

                <h3 className="depth-2 mt-5 text-balance text-display-sm text-white">
                  {company.promise}
                </h3>

                <p className="mt-4 font-display text-lg leading-snug tracking-tight text-navy-100/75">
                  {home.closingLine}
                </p>

                <div aria-hidden="true" className="mt-8 h-px w-16 bg-gold-400/70" />

                <h4 className="mt-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-navy-100/60">
                  {services.eyebrow}
                </h4>

                <ul className="mt-6 space-y-4 transform-3d">
                  {services.items.map((item) => (
                    <li key={item.id} className="flex items-start gap-4 transform-3d">
                      <span className="depth-1 inline-flex shrink-0 rounded-xl bg-white/10 p-3 text-azure-200">
                        <Icon name={item.icon} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 self-center text-[15px] font-medium leading-snug text-navy-100/75">
                        {item.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        {/* Form panel */}
        <div className="min-w-0 lg:col-span-7">
          <Reveal delay={120} className="h-full">
            <div className="h-full rounded-3xl border border-navy-100 bg-white p-6 shadow-soft sm:p-8 lg:p-10">
              <h3 className="text-display-sm text-navy-800">{contact.formTitle}</h3>
              <div aria-hidden="true" className="mt-5 h-px w-full bg-accent-sweep opacity-40" />

              <div className="mt-8">
                {status === 'success' ? (
                  <div role="status" className="py-6 text-center sm:py-10">
                    <SuccessMark />
                    <h4 className="mt-6 text-xl font-semibold tracking-tight text-navy-800">
                      Request received
                    </h4>
                    <p className="mx-auto mt-3 max-w-md text-balance font-display text-lg leading-snug text-navy-500">
                      {partner.closing}
                    </p>
                    <div className="mt-8 flex justify-center">
                      <Button
                        as="button"
                        type="button"
                        variant="outline"
                        size="md"
                        onClick={handleReset}
                      >
                        Send another message
                        <ArrowRight
                          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form noValidate onSubmit={handleSubmit}>
                    {/* Honeypot - display:none, so it is never focusable or announced. */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="contact-company-website">Company website</label>
                      <input
                        id="contact-company-website"
                        name="botField"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={values.botField}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      {textFields.map((field) => {
                        const error = errors[field.name]
                        return (
                          <div key={field.id} className={['min-w-0', field.className].join(' ')}>
                            <label
                              htmlFor={field.id}
                              className="block text-sm font-semibold tracking-tight text-navy-700"
                            >
                              {field.label}
                              <span aria-hidden="true" className="ml-1 text-gold-600">
                                *
                              </span>
                            </label>
                            <input
                              id={field.id}
                              name={field.name}
                              type={field.type}
                              autoComplete={field.autoComplete}
                              placeholder={field.placeholder || undefined}
                              value={values[field.name]}
                              onChange={handleChange}
                              disabled={submitting}
                              required
                              aria-required="true"
                              aria-invalid={error ? 'true' : 'false'}
                              aria-describedby={error ? field.id + '-error' : undefined}
                              className={['mt-2', fieldClass(Boolean(error))].join(' ')}
                            />
                            {error && (
                              <p id={field.id + '-error'} className="mt-2 text-sm text-red-600">
                                {error}
                              </p>
                            )}
                          </div>
                        )
                      })}

                      <div className="min-w-0 sm:col-span-2">
                        <label
                          htmlFor="contact-message"
                          className="block text-sm font-semibold tracking-tight text-navy-700"
                        >
                          {contact.fields.message}
                          <span aria-hidden="true" className="ml-1 text-gold-600">
                            *
                          </span>
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={5}
                          value={values.message}
                          onChange={handleChange}
                          disabled={submitting}
                          required
                          aria-required="true"
                          aria-invalid={errors.message ? 'true' : 'false'}
                          aria-describedby={errors.message ? 'contact-message-error' : undefined}
                          className={['mt-2 resize-y', fieldClass(Boolean(errors.message))].join(
                            ' ',
                          )}
                        />
                        {errors.message && (
                          <p id="contact-message-error" className="mt-2 text-sm text-red-600">
                            {errors.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {status === 'error' && (
                      <p
                        role="alert"
                        className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                      >
                        Your request could not be sent just now. Please try again.
                      </p>
                    )}

                    <div className="mt-8">
                      <Button
                        as="button"
                        type="submit"
                        variant="accent"
                        size="lg"
                        className="w-full"
                        disabled={submitting}
                        aria-busy={submitting ? 'true' : 'false'}
                      >
                        {submitting && (
                          <span
                            aria-hidden="true"
                            className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-white/90"
                          />
                        )}
                        {contact.submitLabel}
                        {!submitting && (
                          <ArrowRight
                            className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
