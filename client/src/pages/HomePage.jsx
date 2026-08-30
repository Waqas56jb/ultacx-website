import SiteLayout from '../components/SiteLayout.jsx'
import Hero from '../components/sections/Hero.jsx'
import Overview from '../components/sections/Overview.jsx'
import WhyUltaCX from '../components/sections/WhyUltaCX.jsx'
import Industries from '../components/sections/Industries.jsx'
import Partner from '../components/sections/Partner.jsx'
import { DEFAULT_TITLE } from '../hooks/useDocumentTitle.js'

export default function HomePage() {
  return (
    <SiteLayout title={DEFAULT_TITLE} hasHero skipHref="#home">
      <Hero />
      <Overview />
      <WhyUltaCX />
      <Industries />
      <Partner />
    </SiteLayout>
  )
}
