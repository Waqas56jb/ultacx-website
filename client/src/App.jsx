import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LegalPage from './pages/LegalPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/privacy-policy" element={<LegalPage />} />
      <Route path="/terms-of-use" element={<LegalPage />} />
      <Route path="/data-protection" element={<LegalPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}
