import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import Router from './Router'
import { ThemeProvider } from './pages/service/contexts/ThemeContext'
import { LanguageProvider } from './pages/service/contexts/LanguageContext'
import { AuthProvider } from './pages/service/contexts/AuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
)
