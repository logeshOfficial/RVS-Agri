import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="bg-farm-earth text-white/90 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand — spans 2 cols on large screens */}
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="mb-5">
            <img
              src={`${import.meta.env.BASE_URL}rvs-agri-logo-transparent.png`}
              alt="RVS AGRI Logo"
              className="h-20 w-auto object-contain bg-white p-1.5 rounded-xl"
            />
          </div>
          <p className="text-white/70 leading-relaxed text-sm max-w-sm">
            A family farm rooted in generations of care for the land — growing paddy,
            coconut, areca nut, mango, jackfruit and heritage timber the way our
            grandparents taught us.
          </p>
          <div className="flex gap-3 mt-6">
            <a
              href="https://www.instagram.com/rvs_agri/"
              target="_blank" rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 gentle-animation"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/growingthefuturesince1914"
              target="_blank" rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 gentle-animation"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-widest">
            Explore
          </h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/produce"   className="hover:text-white gentle-animation">Our Produce</Link></li>
            <li><Link to="/fisheries" className="hover:text-white gentle-animation">Fisheries</Link></li>
            <li><Link to="/about"     className="hover:text-white gentle-animation">Our Story</Link></li>
            <li><Link to="/gallery"   className="hover:text-white gentle-animation">Gallery</Link></li>
            <li><Link to="/contact"   className="hover:text-white gentle-animation">Contact</Link></li>
          </ul>
        </div>

        {/* Reach Us */}
        <div>
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-widest">
            Reach Us
          </h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-2 items-start">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Vepankullam, Pattukkottai,<br />Tamil Nadu 614906, India</span>
            </li>
            <li className="flex gap-2 items-center">
              <Phone className="w-4 h-4 shrink-0" />
              <a href="tel:+919944027277" className="hover:text-white gentle-animation">+91 99440 27277</a>
            </li>
            <li className="flex gap-2 items-center">
              <Mail className="w-4 h-4 shrink-0" />
              <a href="mailto:info@rvsagri.com" className="hover:text-white gentle-animation">info@rvsagri.com</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center text-xs text-white/50 gap-2">
          <span>© {new Date().getFullYear()} RVS AGRI. Grown with care.</span>
          <span>Bulk & wholesale enquiries welcome.</span>
        </div>
      </div>
    </footer>
  )
}
