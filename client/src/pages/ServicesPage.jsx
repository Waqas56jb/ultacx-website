import SiteLayout from '../components/SiteLayout.jsx'
import Services from '../components/sections/Services.jsx'
import HowItWorks from '../components/sections/HowItWorks.jsx'
import DeliveryModels from '../components/sections/DeliveryModels.jsx'
import { company } from '../data/content.js'

export default function ServicesPage() {
  return (
    <SiteLayout title={`Services | ${company.name}`} skipHref="#services">
      <Services />
      <HowItWorks />
      <DeliveryModels />
    </SiteLayout>
  )
}
