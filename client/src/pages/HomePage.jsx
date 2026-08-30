import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import useHashScroll from '../hooks/useHashScroll.js'

import Hero from '../components/sections/Hero.jsx'
import Overview from '../components/sections/Overview.jsx'
import WhyUltaCX from '../components/sections/WhyUltaCX.jsx'
import About from '../components/sections/About.jsx'
import CoreValues from '../components/sections/CoreValues.jsx'
import Services from '../components/sections/Services.jsx'
import Industries from '../components/sections/Industries.jsx'
import WhyRwanda from '../components/sections/WhyRwanda.jsx'
import HowItWorks from '../components/sections/HowItWorks.jsx'
import DeliveryModels from '../components/sections/DeliveryModels.jsx'
import QualitySecurity from '../components/sections/QualitySecurity.jsx'
import Partner from '../components/sections/Partner.jsx'
import Contact from '../components/sections/Contact.jsx'

export default function HomePage() {
  useHashScroll()

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy-800 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <Overview />
        <WhyUltaCX />
        <About />
        <CoreValues />
        <Services />
        <Industries />
        <WhyRwanda />
        <HowItWorks />
        <DeliveryModels />
        <QualitySecurity />
        <Partner />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
