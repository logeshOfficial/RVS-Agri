import { PageHero } from '@/components/site/PageHero'
import { ProduceSlideshow } from '@/components/ProduceSlideshow'
import { produceSections } from '@/config/site-content.config'
import { motion } from 'framer-motion'

export default function Produce() {
  return (
    <>
      <PageHero
        eyebrow="What we grow"
        title="Our Produce"
        subtitle="Five working parts of one farm — each crop kept in balance with the land."
        image="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=80"
      />

      {/* ── Sticky anchor nav ── */}
      <div className="sticky top-[72px] z-30 bg-background/85 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2 overflow-x-auto">
          {produceSections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm font-medium px-4 py-2 rounded-full text-foreground/70
                         hover:text-farm-leaf-dark hover:bg-farm-leaf/10 gentle-animation whitespace-nowrap"
            >
              {s.title}
            </a>
          ))}
        </div>
      </div>

      {/* ── Sections ── */}
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-28">
        {produceSections.map((s, i) => (
          <motion.section
            key={s.id}
            id={s.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className={`grid md:grid-cols-2 gap-12 items-start scroll-mt-32 ${
              i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
            }`}
          >
            {/* Slideshow — driven by images array in site-content.config.ts */}
            <ProduceSlideshow section={s} />

            {/* Text content */}
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
