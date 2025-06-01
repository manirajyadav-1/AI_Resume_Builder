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
import LoginSignup from './pages/LoginSignup'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Root />} >
          <Route path="" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/services" element={<Services />}/>
          <Route path="/login" element={<LoginSignup />}/>
          <Route path="/generate-resume" element={<GenerateResume />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
