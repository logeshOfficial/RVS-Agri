import { PageHero } from '@/components/site/PageHero'
import { motion } from 'framer-motion'

const timeline = [
  { year: '1924', title: 'The first paddy field', text: 'Our great-grandfather leases 12 acres of low-lying land by the river bend.' },
  { year: '1958', title: 'Coconut & areca planted', text: 'The second generation expands to the slope, planting coconut and areca that still bear fruit today.' },
  { year: '1987', title: 'Orchards take root', text: 'Alphonso, Banganapalli and jackfruit orchards go in — a slow bet on fruit that pays back in decades.' },
  { year: '2004', title: 'Fisheries added', text: 'Three seasonal ponds are dug on the eastern low ground, stocked with local carp.' },
  { year: '2019', title: 'RVS AGRI grove', text: 'A registered red-sandalwood belt is planted along the western boundary — a 25-year gift to the next family.' },
  { year: 'Today', title: 'Four generations', text: 'The fourth generation runs the farm with the same rhythm and a few new tools.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Four generations, one valley."
        subtitle="RVS AGRI is a family farm — worked, argued over and loved by the same family for a hundred years."
        image="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=80"
      />

      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="font-bagel text-4xl sm:text-5xl">Rooted in the land</h2>
        <p className="text-muted-foreground text-lg mt-6 leading-relaxed">
          The valley taught us early that a farm is not something you own — it is something
          you belong to. We plant the same paddy varieties our great-grandmother did, and
          the coconut palms my father climbed as a boy are the ones we harvest from today.
        </p>
        <p className="text-muted-foreground text-lg mt-5 leading-relaxed">
          Every decision on the farm is measured against the next generation. We rotate
          crops, protect the forest belt, keep the ponds clean and refuse chemistry that
          leaves a mark. Slow, and stubborn, and worth it.
        </p>
      </section>

      <section className="bg-farm-cream/50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-farm-leaf-dark text-xs uppercase tracking-[0.3em] font-semibold">
            Our heritage
          </span>
          <h2 className="font-bagel text-4xl sm:text-5xl mt-3">A hundred years, briefly.</h2>

          <div className="mt-12 relative">
            <div className="absolute left-4 sm:left-6 top-2 bottom-2 w-px bg-farm-leaf/30" />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative pl-14 sm:pl-20"
                >
                  <span className="absolute left-0 top-1 w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-farm-leaf text-white text-[10px] sm:text-xs font-bold flex items-center justify-center">
                    {t.year}
                  </span>
                  <h3 className="font-bagel text-2xl">{t.title}</h3>
                  <p className="text-muted-foreground mt-2">{t.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-6">
        {[
          { title: 'Our mission', body: 'Grow food and timber with methods that leave the soil richer than we found it.' },
          { title: 'Our promise', body: 'Every crate, every crop and every fish comes from our own land — never re-badged.' },
          { title: 'Our welcome', body: 'Buyers, students and neighbours are always welcome on the farm. Bring good shoes.' },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl border border-border p-8 bg-background">
            <h3 className="font-bagel text-2xl">{c.title}</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">{c.body}</p>
          </div>
        ))}
      </section>
    </>
  )
}
