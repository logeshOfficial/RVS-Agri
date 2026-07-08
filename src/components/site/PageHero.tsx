import { motion } from 'framer-motion'

interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  image: string
  height?: string
}

export function PageHero({ eyebrow, title, subtitle, image, height = 'h-[60vh] min-h-[420px]' }: Props) {
  return (
    <section className={`relative w-full ${height} overflow-hidden`}>
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      {/* pt-32 accounts for the fixed navbar (larger logo h-20/h-24) so text never sits under it */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-16 pt-32">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-farm-cream/90 text-xs uppercase tracking-[0.3em] mb-4"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-bagel text-white text-4xl sm:text-6xl lg:text-7xl max-w-3xl leading-[1.05]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-white/85 text-lg max-w-2xl mt-5"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
