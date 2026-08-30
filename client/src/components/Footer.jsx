import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUp, ChevronRight } from 'lucide-react'
import Button from './ui/Button.jsx'
import Reveal from './ui/Reveal.jsx'
import { company, contact, hero, legalLinks, nav } from '../data/content.js'

/**
 * Site footer — the deep navy closing block.
 * Brand lockup + tagline, full site navigation, a route into the contact
 * form, the legal row and a back-to-top affordance.
 *
 * NOTE: the client supplied no email address, phone number or office address,
 * so this footer deliberately carries none — the "Get in touch" column routes
 * to the on-page contact form instead. Add real details here only once they
 * have been verified; never render placeholder or invented contact data.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-100">
      {/* Closing flourish: the brand gradient stretched across the very top edge. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-accent-sweep" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-texture opacity-40" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-40 h-80 w-80 rounded-full bg-azure-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -right-24 h-80 w-80 rounded-full bg-moss-500/10 blur-3xl"
      />

      <div className="container-x relative py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Reveal>
              {/* /logo.png is a full-colour lockup on white, so it needs a white plate on navy. */}
              <span className="inline-block rounded-xl bg-white p-3 shadow-deep">
                <img
                  src="/logo.png"
                  alt="ULTA CX Ltd — Customer Experience Solutions"
                  loading="lazy"
                  className="h-12 w-auto sm:h-14"
                />
              </span>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.22em] text-azure-200">
                {company.tagline}
              </p>
              <p className="mt-3 max-w-sm font-display text-lg leading-relaxed text-navy-100/75 text-balance">
                {company.promise}
              </p>
            </Reveal>

            <Reveal delay={150}>
              <span aria-hidden="true" className="mt-8 block h-px w-16 bg-accent-sweep" />
            </Reveal>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="lg:col-span-4">
            <Reveal>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-azure-200">
                Explore
              </h2>
            </Reveal>

            <ul className="mt-6 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
              {nav.map((item, i) => (
                <Reveal as="li" key={item.href} delay={i * 70}>
                  <Link
                    to={`/${item.href}`}
                    className="group inline-flex items-center gap-2 rounded-sm py-1.5 text-sm text-navy-100/75 transition-colors duration-300 hover:text-white"
                  >
                    <ChevronRight
                      aria-hidden="true"
                      strokeWidth={2.25}
                      className="h-3.5 w-3.5 shrink-0 text-azure-300/60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-azure-200"
                    />
                    {item.label}
                  </Link>
                </Reveal>
              ))}
            </ul>
          </nav>

          {/* Get in touch — routes to the on-page form; no contact details were supplied. */}
          <div className="lg:col-span-3">
            <Reveal>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-azure-200">
                Get In Touch
              </h2>
            </Reveal>

            <Reveal delay={70}>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-navy-100/75">{contact.intro}</p>
            </Reveal>

            <Reveal delay={140}>
              <Button href="/#contact" variant="onDark" size="sm" className="mt-6">
                {hero.primaryCta}
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
            </Reveal>
          </div>
        </div>

        {/* Bottom bar */}
        <Reveal delay={80}>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-center text-sm text-navy-100/60 sm:text-left">{company.copyright}</p>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:justify-end">
              <nav
                aria-label="Legal"
                className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
              >
                {legalLinks.map((link, i) => (
                  <span key={link.label} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden="true" className="hidden h-3.5 w-px bg-white/15 sm:block" />}
                    <Link
                      to={link.href}
                      className="rounded-sm text-sm text-navy-100/60 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </span>
                ))}
              </nav>

              <span aria-hidden="true" className="hidden h-3.5 w-px bg-white/15 sm:block" />

              <button
                type="button"
                aria-label="Back to top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full glass-dark text-navy-100/80 transition-all duration-300 hover:bg-white/[0.12] hover:text-white"
              >
                <ArrowUp
                  aria-hidden="true"
                  strokeWidth={2}
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
