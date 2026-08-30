import SiteLayout from '../components/SiteLayout.jsx'
import About from '../components/sections/About.jsx'
import CoreValues from '../components/sections/CoreValues.jsx'
import WhyRwanda from '../components/sections/WhyRwanda.jsx'
import QualitySecurity from '../components/sections/QualitySecurity.jsx'
import { company } from '../data/content.js'

export default function AboutPage() {
  return (
    <SiteLayout title={`About Us | ${company.name}`} skipHref="#about">
      <About />
      <CoreValues />
      <WhyRwanda />
      <QualitySecurity />
    </SiteLayout>
  )
}
