import { useCallback, useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import Button from './ui/Button.jsx'
import Reveal from './ui/Reveal.jsx'
import { company, hero, nav } from '../data/content.js'

/**
 * Fixed top navigation.
 * Transparent while it sits over the dark hero, then settles into a white,
 * blurred bar with a hairline border once the page is scrolled. A 2px
 * gradient hairline along the bottom edge tracks reading progress.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)

  // The bar is also solid while the mobile panel is open, so the logo,
  // toggle and links stay legible against the white panel beneath it.
  const solid = scrolled || open

  const closeMenu = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0
      setScrolled(y > 24)

      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(100, Math.max(0, (y / max) * 100)) : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // While the mobile panel is open: lock body scroll, close on Escape, and
  // close automatically if the viewport grows into the desktop layout.
  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onBreakpoint = (event) => {
      if (event.matches) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onBreakpoint)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [open])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ease-out',
        solid
          ? 'border-navy-100 bg-white/95 shadow-soft backdrop-blur-md supports-[backdrop-filter]:bg-white/85'
          : 'border-transparent bg-transparent',
      ].join(' ')}
    >
      <nav aria-label="Primary" className="container-x">
        <div className="flex h-[68px] items-center justify-between gap-4 sm:h-[76px]">
          {/* Logo art has a white ground, so it wears a white chip whenever the
              bar itself is transparent over the navy hero. */}
          <a
            href="#home"
            onClick={closeMenu}
            aria-label="ULTA CX Ltd, back to top"
            className={[
              'flex shrink-0 items-center rounded-lg transition-all duration-300 ease-out',
              solid
                ? 'bg-transparent px-0 py-0'
                : 'bg-white px-3 py-1.5 shadow-[0_8px_24px_-10px_rgba(4,16,36,0.7)]',
            ].join(' ')}
          >
            <img
              src="/logo.png"
              alt="ULTA CX Ltd — Customer Experience Solutions"
              className="h-10 w-auto sm:h-11"
            />
          </a>

          {/* Desktop links: full set from lg up, tighter until xl */}
          <ul className="hidden items-center lg:flex xl:gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={[
                    'group relative block whitespace-nowrap rounded-md px-2 py-2 text-[13px] font-medium',
                    'transition-colors duration-300 ease-out xl:px-3 xl:text-sm',
                    solid ? 'text-navy-600 hover:text-navy-900' : 'text-white/90 hover:text-white',
                  ].join(' ')}
                >
                  <span className="relative">
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-accent-sweep transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Button
              href="#contact"
              size="sm"
              variant={solid ? 'accent' : 'ghostDark'}
              className="hidden whitespace-nowrap sm:inline-flex"
            >
              {hero.primaryCta}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav-panel"
              aria-label={open ? 'Close main menu' : 'Open main menu'}
              className={[
                'inline-flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 ease-out lg:hidden',
                solid
                  ? 'border-navy-100 bg-white text-navy-700 hover:border-navy-200 hover:bg-navy-50'
                  : 'border-white/25 bg-white/10 text-white backdrop-blur-sm hover:border-white/45 hover:bg-white/20',
              ].join(' ')}
            >
              {open ? (
                <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Reading-progress hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 overflow-hidden"
      >
        <div
          className="h-full bg-accent-sweep opacity-90 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav-panel"
        className={[
          'fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-y-auto overscroll-contain',
          'border-t border-navy-100 bg-white sm:top-[76px] lg:hidden',
          open ? 'block' : 'hidden',
        ].join(' ')}
      >
        <div className="container-x flex min-h-full flex-col justify-between gap-10 py-8">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Reveal delay={i * 70}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="group flex items-center justify-between gap-4 border-b border-navy-100 py-4 font-display text-xl font-semibold tracking-tight text-navy-800 transition-colors duration-300 ease-out hover:text-azure-600"
                  >
                    <span>{item.label}</span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-navy-200 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-azure-500"
                      aria-hidden="true"
                    />
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={nav.length * 70}>
            <div>
              <Button
                href="#contact"
                size="md"
                variant="accent"
                onClick={closeMenu}
                className="w-full"
              >
                {hero.primaryCta}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>

              <div className="mt-7 flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 shrink-0 bg-accent-sweep" />
                <p className="text-[11px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-navy-500">
                  {company.promise}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </header>
  )
}
