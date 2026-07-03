import { PageHero } from '@/components/site/PageHero'
import { Droplets, Fish, Waves, Sprout } from 'lucide-react'

const species = [
  { name: 'Rohu', latin: 'Labeo rohita', season: 'Year-round' },
  { name: 'Catla', latin: 'Catla catla', season: 'Year-round' },
  { name: 'Mrigal', latin: 'Cirrhinus mrigala', season: 'Year-round' },
  { name: 'Common Carp', latin: 'Cyprinus carpio', season: 'Oct – Feb' },
  { name: 'Freshwater Prawn', latin: 'Macrobrachium', season: 'Aug – Dec' },
]

const practices = [
  { icon: Droplets, title: 'Rain-fed ponds', desc: 'Three interconnected ponds filled by monsoon runoff and a shared canal from the Kavery.' },
  { icon: Waves, title: 'Continuous aeration', desc: 'Solar-powered paddlewheel aerators keep oxygen steady through summer.' },
  { icon: Sprout, title: 'Natural feed', desc: 'Composted farm waste supplements pelleted feed — no antibiotics in the water.' },
  { icon: Fish, title: 'Rotational harvest', desc: 'Ponds are harvested in staggered cycles so fish are always fresh and stock is never over-drawn.' },
]

export default function Fisheries() {
  return (
    <>
      <PageHero
        eyebrow="On the water"
        title="Our Fisheries"
        subtitle="Three freshwater ponds — quiet, well-fed and rotated so the water stays clean and the fish stay healthy."
        image="https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=1600&q=80"
      />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-farm-leaf-dark text-xs uppercase tracking-[0.3em] font-semibold">
              Water management
            </span>
            <h2 className="font-bagel text-4xl sm:text-5xl mt-3">
              Ponds fed by monsoon, cared for year-round.
            </h2>
            <p className="text-muted-foreground text-lg mt-5 leading-relaxed">
              Our three ponds cover just under seven acres. Water depth is monitored weekly,
              pH balanced with agricultural lime and floors dried and turned each summer
              between cycles.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=1200&q=80"
            alt="Farm pond"
            className="rounded-3xl aspect-[4/3] object-cover"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {practices.map((p) => {
            const Icon = p.icon
            return (
              <div key={p.title} className="bg-farm-cream/50 border border-border rounded-2xl p-6">
                <div className="w-11 h-11 rounded-full bg-farm-leaf/15 text-farm-leaf-dark flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-farm-earth text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-farm-cream/80 text-xs uppercase tracking-[0.3em] font-semibold">
            Species
          </span>
          <h2 className="font-bagel text-4xl sm:text-5xl mt-3">Available this season</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {species.map((s) => (
              <div key={s.name} className="border border-white/15 rounded-2xl p-6 bg-white/5">
                <h3 className="font-bagel text-2xl">{s.name}</h3>
                <p className="text-white/60 italic text-sm">{s.latin}</p>
                <p className="text-white/80 text-sm mt-3">
                  <span className="text-white/50">Season: </span>
                  {s.season}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
