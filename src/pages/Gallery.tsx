import { useState } from 'react'
import { PageHero } from '@/components/site/PageHero'
import { motion } from 'framer-motion'

const filters = ['All', 'Farm Life', 'Harvest', 'Trees & Growth', 'Water'] as const
type Filter = typeof filters[number]

interface Photo { src: string; category: Exclude<Filter, 'All'>; caption: string; span?: string }

const photos: Photo[] = [
  { src: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1000&q=80', category: 'Farm Life', caption: 'Morning walk through the fields', span: 'md:col-span-2 md:row-span-2' },
  { src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80', category: 'Harvest', caption: 'Fresh from the coconut grove' },
  { src: 'https://images.unsplash.com/photo-1595339589414-e42fadffde48?w=800&q=80', category: 'Trees & Growth', caption: 'Paddy at flag-leaf stage' },
  { src: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=800&q=80', category: 'Harvest', caption: 'Alphonso, sorted for market', span: 'md:row-span-2' },
  { src: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=800&q=80', category: 'Water', caption: 'The eastern pond after rain' },
  { src: 'https://images.unsplash.com/photo-1621334269025-ae4d8f7ba0d5?w=800&q=80', category: 'Trees & Growth', caption: 'Young jackfruit forming' },
  { src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80', category: 'Trees & Growth', caption: 'The RVS AGRI grove' },
  { src: `${import.meta.env.BASE_URL}pakku.jpg`, category: 'Harvest', caption: 'Areca drying on the platform', span: 'md:col-span-2' },
  { src: 'https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?w=800&q=80', category: 'Trees & Growth', caption: 'Century-old coconut palms' },
  { src: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=800&q=80', category: 'Water', caption: 'Rohu harvest morning' },
  { src: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&q=80', category: 'Trees & Growth', caption: 'Nendran banana between rows' },
]

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>('All')
  const visible = filter === 'All' ? photos : photos.filter((p) => p.category === filter)

  return (
    <>
      <PageHero
        eyebrow="A visual walk-through"
        title="Gallery"
        subtitle="Farm life, fresh harvests and the slow growth of trees planted long before us."
        image="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=80"
        height="h-[50vh] min-h-[360px]"
      />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium gentle-animation border ${
                filter === f
                  ? 'bg-farm-leaf text-white border-farm-leaf'
                  : 'bg-background text-foreground/70 border-border hover:border-farm-leaf hover:text-farm-leaf-dark'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3">
          {visible.map((p, i) => (
            <motion.figure
              key={p.src + filter}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className={`relative overflow-hidden rounded-2xl group ${p.span ?? ''}`}
            >
              <img
                src={p.src}
                alt={p.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 gentle-animation"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white text-sm opacity-0 group-hover:opacity-100 gentle-animation">
                {p.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>
    </>
  )
}
