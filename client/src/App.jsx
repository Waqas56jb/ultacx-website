import { Navigate, Route, Routes } from 'react-router-dom'
import HashRedirect from './components/HashRedirect.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import LegalPage from './pages/LegalPage.jsx'

export default function App() {
  return (
    <>
      <HashRedirect />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<LegalPage />} />
        <Route path="/terms-of-use" element={<LegalPage />} />
        <Route path="/data-protection" element={<LegalPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
