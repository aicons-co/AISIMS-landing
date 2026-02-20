// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/landing/Index'
import ServiceEntry from './pages/service/ServiceEntry'

export default function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<ServiceEntry />} />
      </Routes>
    </BrowserRouter>
  )
}
