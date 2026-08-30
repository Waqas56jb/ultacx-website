import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import useHashScroll from '../hooks/useHashScroll.js'
import useScrollToTop from '../hooks/useScrollToTop.js'

export default function SiteLayout({
  children,
  title,
  hasHero = false,
  unpadded = false,
  skipHref = '#home',
}) {
  useDocumentTitle(title)
  useScrollToTop()
  useHashScroll()

  return (
    <>
      <a
        href={skipHref}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy-800 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main className={hasHero || unpadded ? undefined : 'pt-[var(--nav-h)]'}>{children}</main>

      <Footer />
    </>
  )
}
