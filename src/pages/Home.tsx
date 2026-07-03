import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf, Fish, TreePine, Sprout } from 'lucide-react'

const categories = ['All', 'Agriculture', 'Areca Nut', 'Horticulture', 'Forestry', 'Fisheries'] as const
type Category = typeof categories[number]

interface Project {
  title: string
  category: Exclude<Category, 'All'>
  image: string
  blurb: string
}

const projects: Project[] = [
  {
    title: 'Ponni Paddy Fields',
    category: 'Agriculture',
    image: 'https://images.unsplash.com/photo-1595339589414-e42fadffde48?w=1200&q=80',
    blurb: 'Two seasonal harvests of aromatic Ponni rice across 40 acres.',
  },
  {
    title: 'Coconut Groves',
    category: 'Agriculture',
    image: 'https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?w=1200&q=80',
    blurb: 'Tall variety coconuts hand-picked from century-old trees.',
  },
  {
    title: 'Paakumaram Areca',
    category: 'Areca Nut',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1200&q=80',
    blurb: 'Premium sun-dried areca nut sorted by grade for wholesalers.',
  },
  {
    title: 'Alphonso Mangoes',
    category: 'Horticulture',
    image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=1200&q=80',
    blurb: 'Small-batch heritage mango cultivars from our 200-tree grove.',
  },
  {
    title: 'Jackfruit Orchard',
    category: 'Horticulture',
    image: 'https://images.unsplash.com/photo-1621334269025-ae4d8f7ba0d5?w=1200&q=80',
    blurb: 'Whole and processed jackfruit sold fresh through monsoon.',
  },
  {
    title: 'Semmaram Timber',
    category: 'Forestry',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=80',
    blurb: 'Sustainably managed red sandalwood plantation, 25-year cycle.',
  },
  {
    title: 'Rohu & Catla Ponds',
    category: 'Fisheries',
    image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=1200&q=80',
    blurb: 'Three freshwater ponds stocked with local carp species.',
  },
  {
    title: 'Banana Intercrop',
    category: 'Horticulture',
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=1200&q=80',
    blurb: 'Nendran banana grown between coconut rows year-round.',
  },
]

const quickLinks = [
  { icon: Sprout, title: 'Agriculture', desc: 'Paddy & Coconut', to: '/produce' },
  { icon: Leaf, title: 'Horticulture', desc: 'Mango & Jackfruit', to: '/produce' },
  { icon: TreePine, title: 'Forestry', desc: 'Semmaram timber', to: '/produce' },
  { icon: Fish, title: 'Fisheries', desc: 'Freshwater ponds', to: '/fisheries' },
]

export default function Home() {
  const [filter, setFilter] = useState<Category>('All')
  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <>
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/paddy-field-hero.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-farm-cream/90 text-xs uppercase tracking-[0.35em] mb-5"
          >
            Four generations · One valley
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="font-bagel text-white text-5xl sm:text-7xl lg:text-8xl leading-[0.95] max-w-4xl"
          >
            Grown slowly.<br />
            Rooted deeply.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-white/85 text-lg sm:text-xl max-w-xl mt-6"
          >
            Semmaram Farm cultivates paddy, coconut, areca nut, orchard fruit and heritage
            timber across the Kavery valley — the way our family has for a hundred years.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/produce"
              className="bg-farm-leaf hover:bg-farm-leaf-dark text-white font-semibold px-6 py-3 rounded-full gentle-animation hover:scale-[1.03] inline-flex items-center gap-2"
            >
              Explore our produce <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 backdrop-blur hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full gentle-animation border border-white/30"
            >
              Bulk enquiries
            </Link>
          </motion.div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((q, i) => {
            const Icon = q.icon
            return (
              <motion.div
                key={q.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={q.to}
                  className="block bg-background border border-border rounded-2xl p-5 hover:border-farm-leaf hover:shadow-lg gentle-animation group"
                >
                  <div className="w-11 h-11 rounded-full bg-farm-leaf/10 text-farm-leaf-dark flex items-center justify-center mb-3 group-hover:bg-farm-leaf group-hover:text-white gentle-animation">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-semibold text-foreground">{q.title}</div>
                  <div className="text-sm text-muted-foreground">{q.desc}</div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* SUMMARY */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-farm-leaf-dark text-xs uppercase tracking-[0.3em] font-semibold">
            About the farm
          </span>
          <h2 className="font-bagel text-4xl sm:text-5xl mt-4 leading-tight">
            A hundred acres between the river and the hills.
          </h2>
          <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
            Semmaram sits in a slow bend of the Kavery — deep alluvial soil in the low
            fields, red laterite up the slopes. We rotate paddy with pulses, keep our
            coconut groves under cover crop, and let the forest belt run wild along the
            western edge.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 mt-8 text-farm-leaf-dark font-semibold hover:gap-3 gentle-animation"
          >
            Read our story <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80"
            alt="Farmer walking through paddy"
            className="rounded-2xl aspect-[4/5] object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
            alt="Fresh harvest"
            className="rounded-2xl aspect-[4/5] object-cover mt-8"
          />
        </div>
      </section>

      {/* PROJECT SHOWCASE */}
      <section className="bg-farm-cream/40 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <span className="text-farm-leaf-dark text-xs uppercase tracking-[0.3em] font-semibold">
                What we grow
              </span>
              <h2 className="font-bagel text-4xl sm:text-5xl mt-3">Our portfolio</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-4 py-2 rounded-full text-sm font-medium gentle-animation border ${
                    filter === c
                      ? 'bg-farm-leaf text-white border-farm-leaf'
                      : 'bg-background text-foreground/70 border-border hover:border-farm-leaf hover:text-farm-leaf-dark'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-background rounded-2xl overflow-hidden border border-border hover:shadow-xl gentle-animation"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 gentle-animation"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-farm-leaf-dark font-semibold">
                    {p.category}
                  </span>
                  <h3 className="font-bagel text-2xl mt-1">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{p.blurb}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h2 className="font-bagel text-4xl sm:text-5xl">
          Buying in bulk, or curious about the farm?
        </h2>
        <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
          We ship to distributors, restaurants and co-ops across South India. Send us a
          note and we'll get back within a day.
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-flex items-center gap-2 bg-farm-leaf hover:bg-farm-leaf-dark text-white font-semibold px-7 py-3.5 rounded-full gentle-animation hover:scale-[1.03]"
        >
          Get in touch <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </>
  )
}
