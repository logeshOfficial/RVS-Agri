import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/site/Navbar'
import { SiteFooter } from './components/site/SiteFooter'
import { ScrollToTop } from './components/site/ScrollToTop'
import Home from './pages/Home'
import Produce from './pages/Produce'
import Fisheries from './pages/Fisheries'
import AboutPage from './pages/AboutPage'
import Gallery from './pages/Gallery'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'

/** WhatsApp phone number — update this if the number changes */
const WHATSAPP_NUMBER = '919944027277'
const WHATSAPP_MESSAGE = encodeURIComponent('Hi RVS AGRI, I would like to enquire about your produce.')

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
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

      {/* ── Global WhatsApp floating button — bottom-left ── */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 left-6 z-[200] flex items-center justify-center
                   w-14 h-14 rounded-full shadow-lg
                   bg-[#25D366] hover:bg-[#20c05c]
                   transition-all duration-300 hover:scale-110 active:scale-95"
      >
        {/* WhatsApp SVG icon */}
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.004 2C8.28 2 2 8.28 2 16.004c0 2.478.65 4.8 1.785 6.817L2 30l7.388-1.763A13.94 13.94 0 0016.004 30C23.72 30 30 23.72 30 16.004 30 8.28 23.72 2 16.004 2zm0 25.456a11.41 11.41 0 01-5.82-1.594l-.418-.248-4.382 1.046 1.077-4.27-.272-.44A11.407 11.407 0 014.544 16c0-6.32 5.142-11.456 11.46-11.456S27.456 9.68 27.456 16c0 6.32-5.136 11.456-11.452 11.456zm6.28-8.576c-.344-.172-2.038-1.005-2.354-1.12-.316-.114-.546-.172-.776.172-.23.345-.888 1.12-1.09 1.35-.2.23-.4.258-.744.086-.344-.172-1.452-.535-2.766-1.707-1.022-.912-1.712-2.038-1.912-2.382-.2-.344-.022-.53.15-.7.155-.155.344-.4.516-.6.172-.2.23-.344.344-.574.115-.23.058-.43-.028-.602-.086-.172-.776-1.87-1.063-2.562-.28-.673-.562-.58-.776-.59l-.66-.012c-.23 0-.602.086-.916.43-.315.344-1.204 1.177-1.204 2.87s1.233 3.33 1.405 3.56c.172.23 2.426 3.703 5.878 5.192.82.354 1.46.566 1.96.724.823.262 1.572.225 2.163.137.66-.099 2.038-.832 2.325-1.636.286-.803.286-1.49.2-1.636-.086-.144-.315-.23-.66-.4z" />
        </svg>

        {/* Pulse ring animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />
      </a>
    </BrowserRouter>
  )
}
