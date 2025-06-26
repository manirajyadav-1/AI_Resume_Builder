import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Root from './pages/Root'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import GenerateResume from './pages/GenerateResume'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './routes/ProtectedRoute'



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="generate-resume" element={<GenerateResume />} />
            <Route path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
