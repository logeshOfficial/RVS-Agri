import { PageHero } from '@/components/site/PageHero'
import { motion } from 'framer-motion'

interface Section {
  id: string
  eyebrow: string
  title: string
  copy: string
  bullets: string[]
  image: string
}

const sections: Section[] = [
  {
    id: 'agriculture',
    eyebrow: 'Agriculture',
    title: 'Paddy & Coconut',
    copy: 'The heart of the farm — flooded paddy fields in the low country and coconut palms lining the boundaries. Our paddy is grown with SRI methods and rotated with green-manure pulses.',
    bullets: [
      'Ponni & Seeraga Samba rice, two seasons a year',
      '900+ tall variety coconut palms, hand-picked',
      'Copra, coconut oil and tender coconut for wholesale',
    ],
    image: 'https://images.unsplash.com/photo-1595339589414-e42fadffde48?w=1400&q=80',
  },
  {
    id: 'areca',
    eyebrow: 'Areca Nut',
    title: 'Paakumaram',
    copy: 'Our areca plantation sits under partial shade on the western slope. Nuts are hand-harvested, sun-dried on raised platforms and graded before dispatch.',
    bullets: [
      'Sun-dried whole nut, graded A/B/C',
      'Traditional boiled (kalipak) variant on request',
      'Consistent monthly supply to trader networks',
    ],
    image: `${import.meta.env.BASE_URL}pakku.jpg`,
  },
  {
    id: 'horticulture',
    eyebrow: 'Horticulture',
    title: 'Mango & Jackfruit',
    copy: 'Small orchards planted by our grandfather still bear the sweetest fruit on the farm. We stagger varieties so the harvest runs from March through August.',
    bullets: [
      'Alphonso, Banganapalli and native Sindhura mango',
      'Whole jackfruit and cleaned bulbs, in-season',
      'Direct-to-restaurant crates available',
    ],
    image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=1400&q=80',
  },
  {
    id: 'forestry',
    eyebrow: 'Forestry',
    title: 'Red Sandalwood (Semmaram)',
    copy: 'A quiet, long-horizon crop. Our red sandalwood belt is legally registered and harvested on a 25-year cycle with full traceability.',
    bullets: [
      'Government-permitted plantation, fully documented',
      'Heartwood billets to certified buyers only',
      'Reforestation partnerships welcome',
    ],
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1400&q=80',
  },
]

export default function Produce() {
  return (
    <>
      <PageHero
        eyebrow="What we grow"
        title="Our Produce"
        subtitle="Four working parts of one farm — each crop kept in balance with the land."
        image="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=80"
      />

      {/* Anchor nav */}
      <div className="sticky top-[72px] z-30 bg-background/85 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm font-medium px-4 py-2 rounded-full text-foreground/70 hover:text-farm-leaf-dark hover:bg-farm-leaf/10 gentle-animation whitespace-nowrap"
            >
              {s.title}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 space-y-28">
        {sections.map((s, i) => (
          <motion.section
            key={s.id}
            id={s.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className={`grid md:grid-cols-2 gap-12 items-center scroll-mt-32 ${
              i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
            }`}
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/5]">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-farm-leaf-dark text-xs uppercase tracking-[0.3em] font-semibold">
                {s.eyebrow}
              </span>
              <h2 className="font-bagel text-4xl sm:text-5xl mt-3">{s.title}</h2>
              <p className="text-muted-foreground text-lg mt-5 leading-relaxed">{s.copy}</p>
              <ul className="mt-6 space-y-3">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-foreground/85">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-farm-leaf shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        ))}
      </div>
    </>
  )
}
