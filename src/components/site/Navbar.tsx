import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/produce', label: 'Our Produce' },
  { to: '/fisheries', label: 'Fisheries' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const solid = scrolled || !isHome
  const linkBase = 'text-sm font-medium tracking-wide gentle-animation'
  const linkColor = solid
    ? 'text-foreground/70 hover:text-primary'
    : 'text-white/85 hover:text-white'

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          solid
            ? 'bg-background/85 backdrop-blur-xl border-b border-border/60'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-2 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={`${import.meta.env.BASE_URL}rvs-agri-logo-transparent.png`}
              alt="RVS AGRI Logo"
              className="h-16 sm:h-20 w-auto object-contain gentle-animation group-hover:scale-105"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `${linkBase} ${linkColor} ${
                    isActive
                      ? solid
                        ? '!text-farm-leaf'
                        : '!text-white font-semibold'
                      : ''
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden sm:inline-flex bg-farm-leaf hover:bg-farm-leaf-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full gentle-animation hover:scale-[1.03] shadow-sm"
            >
              Enquire
            </Link>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen(!open)}
              className={`lg:hidden p-2 rounded-full gentle-animation ${
                solid
                  ? 'text-foreground hover:bg-muted'
                  : 'text-white bg-white/10 backdrop-blur hover:bg-white/20'
              }`}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="lg:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-background z-[120] border-l border-border shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <span className="font-bagel text-lg text-primary">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full hover:bg-muted"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col p-4 gap-1">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg text-base font-medium gentle-animation ${
                        isActive
                          ? 'bg-farm-leaf/10 text-farm-leaf-dark'
                          : 'text-foreground/80 hover:bg-muted'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
                <Link
                  to="/contact"
                  className="mt-4 bg-farm-leaf hover:bg-farm-leaf-dark text-white text-center font-semibold py-3 rounded-full gentle-animation"
                >
                  Enquire Now
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
