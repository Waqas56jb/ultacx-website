import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Mail, MapPin, Globe } from 'lucide-react'
import SiteLayout from '../components/SiteLayout.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { company } from '../data/content.js'
import { legalNav, legalPages, SITE_EMAIL, SITE_URL } from '../data/legal.js'

function tocFrom(blocks) {
  return blocks.filter((block) => block.type === 'h2' && block.id)
}

function ContactCard() {
  return (
    <aside className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-navy-50/50">
      <div className="border-b border-navy-100 bg-navy-800 px-6 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-azure-200">
          {company.shortName}
        </p>
        <p className="mt-1 font-display text-lg font-semibold text-white">Kigali, Rwanda</p>
      </div>
      <ul className="divide-y divide-navy-100 px-6 py-2">
        <li className="flex items-start gap-3 py-3 text-sm text-navy-700">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-azure-600" aria-hidden="true" />
          <span>ULTA CX Ltd, Kigali, Rwanda</span>
        </li>
        <li className="flex items-start gap-3 py-3 text-sm">
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-azure-600" aria-hidden="true" />
          <a href={`mailto:${SITE_EMAIL}`} className="font-medium text-azure-700 hover:text-azure-800">
            {SITE_EMAIL}
          </a>
        </li>
        <li className="flex items-start gap-3 py-3 text-sm">
          <Globe className="mt-0.5 h-4 w-4 shrink-0 text-azure-600" aria-hidden="true" />
          <a href={SITE_URL} className="font-medium text-azure-700 hover:text-azure-800">
            {SITE_URL.replace(/^https:\/\//, '')}
          </a>
        </li>
      </ul>
    </aside>
  )
}

function renderBlock(block, index) {
  if (block.type === 'h2') {
    return (
      <h2
        key={block.id || index}
        id={block.id}
        className="scroll-mt-28 mt-14 border-t border-navy-100 pt-10 text-display-sm text-navy-800 first:mt-0 first:border-t-0 first:pt-0"
      >
        {block.text}
      </h2>
    )
  }

  if (block.type === 'h3') {
    return (
      <h3 key={index} className="mt-8 text-lg font-semibold tracking-tight text-navy-800">
        {block.text}
      </h3>
    )
  }

  if (block.type === 'p') {
    return (
      <p key={index} className="mt-4 text-[17px] leading-8 text-navy-600">
        {block.text}
      </p>
    )
  }

  if (block.type === 'ul' || block.type === 'ol') {
    const Tag = block.type
    return (
      <Tag
        key={index}
        className={
          block.type === 'ol'
            ? 'mt-4 list-decimal space-y-2.5 pl-6 text-[17px] leading-8 text-navy-600 marker:font-semibold marker:text-azure-600'
            : 'mt-4 list-none space-y-2.5 pl-0 text-[17px] leading-8 text-navy-600'
        }
      >
        {block.items.map((item) => (
          <li key={item} className={block.type === 'ul' ? 'flex gap-3' : undefined}>
            {block.type === 'ul' && (
              <span aria-hidden="true" className="mt-[13px] h-1.5 w-1.5 shrink-0 rounded-full bg-azure-500" />
            )}
            <span>{item}</span>
          </li>
        ))}
      </Tag>
    )
  }

  if (block.type === 'quote') {
    return (
      <blockquote
        key={index}
        className="mt-8 rounded-2xl bg-navy-800 px-6 py-6 font-display text-xl leading-snug tracking-tight text-white sm:px-8"
      >
        <span aria-hidden="true" className="mb-4 block h-1 w-12 rounded-full bg-accent-sweep" />
        {block.text}
      </blockquote>
    )
  }

  if (block.type === 'contact') {
    return <ContactCard key={index} />
  }

  return null
}

export default function LegalPage() {
  const slug = useLocation().pathname.replace(/^\/+|\/+$/g, '')
  const page = legalPages[slug]

  if (!page) {
    return (
      <SiteLayout title={`Page not found | ${company.name}`}>
        <div className="container-x py-32">
          <h1 className="text-display-sm text-navy-800">Page not found</h1>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 text-azure-700">
            Return home
          </Link>
        </div>
      </SiteLayout>
    )
  }

  const toc = tocFrom(page.blocks)
  const others = legalNav.filter((item) => item.href !== `/${page.slug}`)

  return (
    <SiteLayout title={`${page.title} | ${company.name}`} unpadded skipHref="#legal-content">
      <div id="legal-content">
        <header className="relative overflow-hidden bg-navy-800 pt-[calc(var(--nav-h)+2.5rem)] pb-16 text-white sm:pb-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-mesh-navy opacity-80" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-accent-sweep" />

          <div className="container-x relative">
            <Reveal>
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-navy-100/70">
                <Link to="/" className="transition-colors hover:text-white">
                  Home
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-white">{page.title}</span>
              </nav>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-azure-200">
                {page.eyebrow}
              </p>
              <h1 className="mt-4 max-w-3xl text-balance text-display-md text-white">{page.title}</h1>
              {page.intro && (
                <p className="mt-4 max-w-2xl font-display text-xl leading-snug text-navy-100/80">
                  {page.intro}
                </p>
              )}
            </Reveal>

            {(page.effectiveDate || page.lastUpdated) && (
              <Reveal delay={140}>
                <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-navy-100/70">
                  {page.effectiveDate && (
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-azure-200">
                        Effective Date
                      </dt>
                      <dd className="mt-1">{page.effectiveDate}</dd>
                    </div>
                  )}
                  {page.lastUpdated && (
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-azure-200">
                        Last Updated
                      </dt>
                      <dd className="mt-1">{page.lastUpdated}</dd>
                    </div>
                  )}
                </dl>
              </Reveal>
            )}
          </div>
        </header>

        <div className="bg-white py-16 lg:py-20">
          <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
            {toc.length > 0 && (
              <aside className="lg:col-span-4 xl:col-span-3">
                <div className="lg:sticky lg:top-28">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-400">
                    On this page
                  </p>
                  <nav aria-label="Page sections" className="mt-4 max-h-[70vh] overflow-y-auto pr-2">
                    <ol className="space-y-1 border-l border-navy-100">
                      {toc.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="block border-l-2 border-transparent py-1.5 pl-4 text-sm leading-snug text-navy-500 transition-colors hover:border-azure-500 hover:text-navy-800"
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>
              </aside>
            )}

            <article className={toc.length > 0 ? 'min-w-0 lg:col-span-8 xl:col-span-9' : 'min-w-0 lg:col-span-10'}>
              {page.blocks.map(renderBlock)}
            </article>
          </div>
        </div>

        <section className="border-t border-navy-100 bg-navy-50/50 py-14">
          <div className="container-x">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-400">
              Related legal pages
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {others.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group flex items-center justify-between rounded-2xl border border-navy-100 bg-white px-5 py-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <span className="font-display text-lg font-semibold text-navy-800">{item.label}</span>
                  <ArrowRight
                    className="h-4 w-4 text-navy-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-azure-500"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>

            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-azure-700 transition-colors hover:text-azure-800"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to ULTA CX
            </Link>
          </div>
        </section>
      </div>
    </SiteLayout>
  )
}
