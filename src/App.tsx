import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/site/Navbar'
import { SiteFooter } from './components/site/SiteFooter'
import Home from './pages/Home'
import Produce from './pages/Produce'
import Fisheries from './pages/Fisheries'
import AboutPage from './pages/AboutPage'
import Gallery from './pages/Gallery'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produce" element={<Produce />} />
            <Route path="/fisheries" element={<Fisheries />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
    </BrowserRouter>
  )
}
