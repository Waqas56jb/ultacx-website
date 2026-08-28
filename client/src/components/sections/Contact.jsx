import { useState } from 'react'
import { ArrowRight, CheckCircle2, Loader2, Mail, MapPin, Phone } from 'lucide-react'
import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import { company, contact } from '../../data/content.js'

// TODO: replace with the client's real contact details before launch.
const contactDetails = [
  { key: 'email', Icon: Mail, label: 'Email', value: 'To be provided' },
  { key: 'phone', Icon: Phone, label: 'Phone', value: 'To be provided' },
  { key: 'office', Icon: MapPin, label: 'Office', value: 'To be provided' },
]

/* Structural process wording only — no response-time or turnaround promises. */
const nextSteps = [
  'We review the requirements you share.',
  'We arrange an introductory conversation.',
  'We outline a support model for your review.',
]

const EMPTY_FORM = { fullName: '', email: '', phone: '', message: '', botField: '' }

const INPUT_BASE =
  'w-full rounded-xl border bg-white px-4 py-3.5 text-navy-800 ' +
  'placeholder:text-navy-300 transition focus:ring-2 focus:ring-azure-500/20 outline-none'

function fieldClass(hasError) {
  return [
    INPUT_BASE,
    hasError ? 'border-red-300 focus:border-red-400' : 'border-navy-100 focus:border-azure-400',
  ].join(' ')
}

/** Client-side validation — all four fields are required. */
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

/**
 * TODO — THE SUBMISSION BACKEND IS NOT WIRED UP YET.
 *
 * Replace the simulated delay below with a real submission. Two options:
 *   1. A hosted form endpoint (Web3Forms, Formspree, Basin) — no server required.
 *      Keep the access key in an env var (e.g. VITE_WEB3FORMS_KEY), never in source.
 *   2. A serverless function (Vercel / Netlify / Cloudflare) that forwards the
 *      payload to the client's inbox or CRM — preferred if the key must stay private.
 *
 * Throw on a non-ok response so the caller can switch to the 'error' state.
 *
 * Example:
 *
 *   const response = await fetch('https://api.web3forms.com/submit', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
 *     body: JSON.stringify({
 *       access_key: import.meta.env.VITE_WEB3FORMS_KEY,
 *       subject: 'New enquiry from the ULTA CX website',
 *       name: payload.fullName,
 *       email: payload.email,
 *       phone: payload.phone,
 *       message: payload.message,
 *     }),
 *   })
 *   if (!response.ok) throw new Error('Submission failed')
 *   return response.json()
 */
async function sendEnquiry(payload) {
  if (!payload) throw new Error('Missing form payload')
  await new Promise((resolve) => setTimeout(resolve, 900))
  return { ok: true }
}

/**
 * Contact — the dark detail panel paired with a real, validated enquiry form.
 * Submission flows through 'idle' | 'submitting' | 'success' | 'error'.
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
      placeholder: 'Your full name',
      className: 'sm:col-span-2',
    },
    {
      id: 'contact-email',
      name: 'email',
      label: contact.fields.email,
      type: 'email',
      autoComplete: 'email',
      placeholder: 'you@company.com',
      className: '',
    },
    {
      id: 'contact-phone',
      name: 'phone',
      label: contact.fields.phone,
      type: 'tel',
      autoComplete: 'tel',
      placeholder: 'Your phone number',
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

    // Honeypot: a filled hidden field means an automated submission — drop it silently.
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
        title={contact.heading}
        intro={contact.intro}
      >
        <Reveal delay={240}>
          <p className="mt-4 text-base leading-relaxed text-navy-500">{contact.body}</p>
        </Reveal>
      </SectionHeading>

      <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 xl:gap-14">
        {/* Information panel */}
        <div className="lg:col-span-5">
          <Reveal className="h-full">
            <div className="relative h-full overflow-hidden rounded-3xl bg-navy-800 p-8 shadow-deep lg:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-mesh-navy opacity-90"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-accent-sweep opacity-70"
              />

              <div className="relative">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-azure-200">
                  {company.tagline}
                </p>
                <h3 className="mt-5 text-display-sm text-white">Get in touch</h3>
                <p className="mt-4 font-display text-lg leading-snug tracking-tight text-navy-100/80">
                  {company.promise}
                </p>

                <ul className="mt-9 space-y-5">
                  {contactDetails.map(({ key, Icon, label, value }) => (
                    <li key={key} className="flex items-start gap-4">
                      <span className="glass-dark inline-flex shrink-0 rounded-xl p-3 text-azure-200">
                        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-100/60">
                          {label}
                        </span>
                        <span className="mt-1 block break-words italic text-navy-100/50">
                          {value}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div aria-hidden="true" className="mt-9 h-px w-16 bg-gold-400/70" />

                <h4 className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-white">
                  What happens next
                </h4>
                <ol className="mt-5 space-y-4">
                  {nextSteps.map((step, index) => (
                    <li key={step} className="flex items-start gap-4">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xs font-semibold text-azure-200"
                      >
                        {index + 1}
                      </span>
                      <span className="text-[15px] leading-relaxed text-navy-100/75">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Form panel */}
        <div className="lg:col-span-7">
          <Reveal delay={120} className="h-full">
            <div className="h-full rounded-3xl border border-navy-100 bg-white p-8 shadow-soft lg:p-10">
              <h3 className="text-display-sm text-navy-800">{contact.formTitle}</h3>
              <div aria-hidden="true" className="mt-5 h-px w-full bg-accent-sweep opacity-40" />

              <div aria-live="polite" className="mt-8">
                {status === 'success' ? (
                  <div className="py-6 text-center sm:py-10">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-moss-50">
                      <CheckCircle2
                        className="h-8 w-8 text-moss-500"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </span>
                    <h4 className="mt-6 text-xl font-semibold tracking-tight text-navy-800">
                      Thank you — your request has been received.
                    </h4>
                    <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-navy-500">
                      Your details have been passed to our team, who will be in touch to discuss
                      your customer experience requirements.
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
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form noValidate onSubmit={handleSubmit}>
                    {/* Honeypot — invisible to people, tempting to bots. */}
                    <div className="hidden" aria-hidden="true" tabIndex={-1}>
                      <label htmlFor="company_website">Company website</label>
                      <input
                        id="company_website"
                        name="_gotcha"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={values.botField}
                        onChange={(event) =>
                          setValues((current) => ({ ...current, botField: event.target.value }))
                        }
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      {textFields.map((field) => {
                        const error = errors[field.name]
                        return (
                          <div key={field.id} className={field.className}>
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
                              placeholder={field.placeholder}
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

                      <div className="sm:col-span-2">
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
                          placeholder="Your requirements"
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
                      <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
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
                          <Loader2
                            className="h-5 w-5 animate-spin"
                            strokeWidth={2}
                            aria-hidden="true"
                          />
                        )}
                        {contact.submitLabel}
                        {!submitting && (
                          <ArrowRight
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
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
