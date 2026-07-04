import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="bg-farm-earth text-white/90 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <img
              src={`${import.meta.env.BASE_URL}rvs-agri-logo-transparent.png`}
              alt="RVS AGRI Logo"
              className="h-12 w-auto object-contain bg-white p-1 rounded-lg"
            />
          </div>
          <p className="text-white/70 leading-relaxed max-w-md">
            A family farm rooted in generations of care for the land — growing paddy,
            coconut, areca nut, mango, jackfruit and heritage timber the way our
            grandparents taught us.
          </p>
          <div className="flex gap-3 mt-6">
            <a href="https://www.instagram.com/rvs_agri/" className="p-2 rounded-full bg-white/10 hover:bg-white/20 gentle-animation">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/growingthefuturesince1914" className="p-2 rounded-full bg-white/10 hover:bg-white/20 gentle-animation">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-widest">
            Explore
          </h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/produce" className="hover:text-white gentle-animation">Our Produce</Link></li>
            <li><Link to="/fisheries" className="hover:text-white gentle-animation">Fisheries</Link></li>
            <li><Link to="/about" className="hover:text-white gentle-animation">Our Story</Link></li>
            <li><Link to="/gallery" className="hover:text-white gentle-animation">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-white gentle-animation">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-widest">
            Reach Us
          </h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> Vepankullam, Pattukkottai, Tamil Nadu 614906, India</li>
            <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0" /> +91 99440 27277</li>
            <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 shrink-0" /> hello@rvsagri.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center text-xs text-white/50 gap-2">
          <span>© {new Date().getFullYear()} RVS AGRI. Grown with care.</span>
          <span>Bulk & wholesale enquiries welcome.</span>
        </div>
      </div>
    </footer>
  )
}
