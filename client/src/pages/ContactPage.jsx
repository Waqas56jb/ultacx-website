import SiteLayout from '../components/SiteLayout.jsx'
import Contact from '../components/sections/Contact.jsx'
import { company } from '../data/content.js'

export default function ContactPage() {
  return (
    <SiteLayout title={`Contact | ${company.name}`} skipHref="#contact">
      <Contact />
    </SiteLayout>
  )
}
