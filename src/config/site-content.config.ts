/**
 * ══════════════════════════════════════════════════════════════════════════════
 *  RVS AGRI — SITE CONTENT CONFIGURATION
 *  Single source of truth for ALL images, text, and media across the website.
 * ══════════════════════════════════════════════════════════════════════════════
 *
 *  HOW TO UPDATE CONTENT (no developer needed):
 *
 *  ── Adding / changing images ─────────────────────────────────────────────────
 *  1. Drop your image file into the matching folder inside /public:
 *       public/paddy/       ← paddy field photos
 *       public/coconut/     ← coconut tree / grove photos
 *       public/areca/       ← paakumaram / areca nut photos
 *       public/mango/       ← mango orchard photos
 *       public/forestry/    ← sandalwood / forest photos
 *       public/fisheries/   ← pond / fish photos
 *
 *  2. Add the filename to the matching `images` array below:
 *       { src: "my-photo.jpeg", alt: "Description of the photo" }
 *     Any extension works — .jpg  .jpeg  .JPG  .PNG  .png  .webp
 *     Just type the EXACT filename as it appears in File Explorer.
 *
 *  3. To remove — delete its line from the array.
 *  4. To reorder — move the object up or down in the array.
 *  5. Save this file. The site updates automatically on the next build / hot-reload.
 *
 *  ── Changing text ────────────────────────────────────────────────────────────
 *  Edit the `title`, `copy`, `bullets`, `eyebrow`, etc. fields directly below.
 *
 *  ── Slideshow speed ──────────────────────────────────────────────────────────
 *  Change `slideshowIntervalMs` (milliseconds). 2000 = 2 seconds.
 * ══════════════════════════════════════════════════════════════════════════════
 */

export interface SlideImage {
  /** Filename inside the section's /public subfolder — e.g. "my-photo.jpeg" */
  src: string
  /** Short description for screen readers and broken-image fallback */
  alt: string
}

export interface ProduceSection {
  /** URL anchor id — used for #hash navigation */
  id: string
  /** Small label shown above the title */
  eyebrow: string
  /** Main heading */
  title: string
  /** Body paragraph */
  copy: string
  /** Bullet point list */
  bullets: string[]
  /**
   * Folder name inside /public — images for this section live here.
   * e.g. "paddy" → /public/paddy/
   */
  folder: string
  /** Images for the slideshow */
  images: SlideImage[]
  /** Slideshow auto-advance in ms (default 2000). Override per-section if needed. */
  slideshowIntervalMs?: number
}

// ══════════════════════════════════════════════════════════════════════════════
//  PADDY
//  Folder: public/paddy/
//  ↓ Drop your paddy photos into public/paddy/ and add them here ↓
// ══════════════════════════════════════════════════════════════════════════════
export const paddySection: ProduceSection = {
  id: 'paddy',
  eyebrow: 'Agriculture',
  title: 'Paddy',
  copy: 'The heart of the farm — flooded paddy fields stretch across the low country. Our paddy is grown with SRI methods and rotated with green-manure pulses for healthy, chemical-light soil.',
  bullets: [
    'Ponni & Seeraga Samba rice, two seasons a year',
    'System of Rice Intensification (SRI) methods',
    'Rotated with green-manure pulses between seasons',
  ],
  folder: 'paddy',
  images: [
    // ── ADD YOUR PADDY IMAGES HERE ──────────────────────────────────────────
    // Example: { src: 'paddy-field-1.jpeg', alt: 'Paddy field at sunrise' },
    { src: 'IMG_8119.jpeg', alt: 'Seeds throughing' },
    { src: 'IMG_8273.jpeg', alt: 'initial stage of paddy' },
    { src: 'IMG_8371.jpeg', alt: 'first stage completed paddy' },
    { src: 'IMG_8431.jpeg', alt: 'first stage completed paddy' },
    { src: 'IMG_8396.jpeg', alt: 'first stage completed paddy and cutting' },
    { src: 'IMG_8426.jpeg', alt: 'first stage completed paddy' },    
    { src: 'IMG_2945.jpeg', alt: 'Wide shot before well growing paddy' },
    { src: 'IMG_3441.jpeg', alt: 'Well grown paddy' },
   

    
  ],
  slideshowIntervalMs: 2000,
}

// ══════════════════════════════════════════════════════════════════════════════
//  COCONUT
//  Folder: public/coconut/
//  ↓ Drop your coconut photos into public/coconut/ and add them here ↓
// ══════════════════════════════════════════════════════════════════════════════
export const coconutSection: ProduceSection = {
  id: 'coconut',
  eyebrow: 'Agriculture',
  title: 'Coconut',
  copy: 'Nine hundred tall-variety coconut palms line the farm boundaries and slopes. Hand-picked at peak maturity, our coconuts supply copra, fresh oil, and tender coconut to wholesale networks.',
  bullets: [
    '900+ tall variety coconut palms, hand-picked',
    'Copra, coconut oil and tender coconut for wholesale',
    'Trees intercropped with banana for maximum land use',
  ],
  folder: 'coconut',
  images: [
    // ── ADD YOUR COCONUT IMAGES HERE ────────────────────────────────────────
    // Drop files into public/coconut/ then add a line: { src: 'filename.jpeg', alt: 'description' },
    { src: 'IMG_7688.jpeg', alt: 'Coconut grove at the farm-IMG_7688' },
    { src: 'IMG_7985.jpeg', alt: 'Coconut palms at RVS Agri farm-IMG_7985' },
    { src: 'IMG_7989.jpeg', alt: 'Coconut trees along the farm boundary-IMG_7989' },
    { src: 'IMG_7994.jpeg', alt: 'Coconut harvest at the farm-IMG_7994' },
    { src: 'IMG_7995.jpeg', alt: 'Coconuts being sorted after harvest-IMG_7995' },
    { src: 'IMG_7997.jpeg', alt: 'Fresh coconuts ready for dispatch-IMG_7997' },
    { src: 'IMG_2292.jpeg', alt: 'Fresh coconuts ready for dispatch-IMG_2292' },
    { src: 'IMG_2293.jpeg', alt: 'Fresh coconuts ready for dispatch-IMG_2293' },
    { src: 'IMG_2295.jpeg', alt: 'Fresh coconuts ready for dispatch-IMG_2295' },
    { src: 'IMG_2296.jpeg', alt: 'Fresh coconuts ready for dispatch-IMG_2296' },
    { src: 'IMG_8275.jpeg', alt: 'Fresh coconuts ready for dispatch-IMG_8275' },
    { src: 'IMG_8421.jpeg', alt: 'Fresh coconuts ready for dispatch-IMG_8421' },
    { src: 'IMG_8422.jpeg', alt: 'Fresh coconuts ready for dispatch-IMG_8422' },

  ],
  slideshowIntervalMs: 2000,
}

// ══════════════════════════════════════════════════════════════════════════════
//  ARECA / PAAKUMARAM
//  Folder: public/areca/
//  ↓ Drop your areca photos into public/areca/ and add them here ↓
// ══════════════════════════════════════════════════════════════════════════════
export const arecaSection: ProduceSection = {
  id: 'areca',
  eyebrow: 'Areca Nut',
  title: 'Paakumaram',
  copy: 'Our areca plantation sits under partial shade on the western slope. Nuts are hand-harvested, sun-dried on raised platforms and graded before dispatch.',
  bullets: [
    'Sun-dried whole nut, graded A/B/C',
    'Traditional boiled (kalipak) variant on request',
    'Consistent monthly supply to trader networks',
  ],
  folder: 'areca',
  images: [
    { src: 'pakku-1.jpeg', alt: 'Paakumaram — ripe golden-orange betel nuts on the trunk' },
    { src: 'pakku-2.jpeg', alt: 'Paakumaram — dense clusters of orange and green nuts' },
    { src: 'pakku-3.jpeg', alt: 'Paakumaram — green areca nuts at an earlier ripening stage' },
    { src: 'pakku-4.jpeg', alt: 'Paakumaram — full tree view showing height and plantation row' },
    { src: 'pakku.jpg',    alt: 'Paakumaram — close view of harvested areca nuts' },
  ],
  slideshowIntervalMs: 2000,
}

// ══════════════════════════════════════════════════════════════════════════════
//  MANGO & JACKFRUIT
//  Folder: public/mango/
//  ↓ Drop your mango/jackfruit photos into public/mango/ and add them here ↓
// ══════════════════════════════════════════════════════════════════════════════
export const mangoSection: ProduceSection = {
  id: 'horticulture',
  eyebrow: 'Horticulture',
  title: 'Mango & Jackfruit',
  copy: 'Small orchards planted by our grandfather still bear the sweetest fruit on the farm. We stagger varieties so the harvest runs from March through August.',
  bullets: [
    'Alphonso, Banganapalli and native Sindhura mango',
    'Whole jackfruit and cleaned bulbs, in-season',
    'Direct-to-restaurant crates available',
  ],
  folder: 'mango',
  images: [
    // ── ADD YOUR MANGO / JACKFRUIT IMAGES HERE ──────────────────────────────
  ],
  slideshowIntervalMs: 2000,
}

// ══════════════════════════════════════════════════════════════════════════════
//  RED SANDALWOOD (FORESTRY)
//  Folder: public/forestry/
//  ↓ Drop your forestry photos into public/forestry/ and add them here ↓
// ══════════════════════════════════════════════════════════════════════════════
export const forestrySection: ProduceSection = {
  id: 'forestry',
  eyebrow: 'Forestry',
  title: 'Red Sandalwood (Semmaram)',
  copy: 'A quiet, long-horizon crop. Our red sandalwood belt is legally registered and harvested on a 25-year cycle with full traceability.',
  bullets: [
    'Government-permitted plantation, fully documented',
    'Heartwood billets to certified buyers only',
    'Reforestation partnerships welcome',
  ],
  folder: 'forestry',
  images: [
    // ── ADD YOUR FORESTRY IMAGES HERE ───────────────────────────────────────
  ],
  slideshowIntervalMs: 2000,
}

// ── Ordered list of all produce sections (controls page order) ────────────────
export const produceSections: ProduceSection[] = [
  paddySection,
  coconutSection,
  arecaSection,
  mangoSection,
  forestrySection,
]

/** Global slideshow interval — can be overridden per section */
export const SLIDESHOW_INTERVAL_MS = 2000

// ══════════════════════════════════════════════════════════════════════════════
//  HOME PAGE — PORTFOLIO CARDS
//  Each card shows one image in the "Our Portfolio" grid on the home page.
//
//  HOW TO UPDATE:
//  1. Drop your image into the matching folder:
//       public/home/paddy/      public/home/coconut/    public/home/areca/
//       public/home/mango/      public/home/jackfruit/  public/home/forestry/
//       public/home/fisheries/  public/home/banana/
//
//  2. Set the `image` filename below to match exactly.
//  3. Save. Done.
// ══════════════════════════════════════════════════════════════════════════════

export type PortfolioCategory =
  | 'Agriculture'
  | 'Areca Nut'
  | 'Horticulture'
  | 'Forestry'
  | 'Fisheries'

export interface PortfolioCard {
  /** Display title on the card */
  title: string
  /** Filter category */
  category: PortfolioCategory
  /**
   * Image filename inside public/home/<folder>/
   * e.g. "my-photo.jpeg"  (any extension works: .jpg .jpeg .JPG .PNG .webp)
   * Set to "" to hide the card until you have a photo.
   */
  image: string
  /** Subfolder inside public/home/ where the image lives */
  folder: string
  /** One-line description shown on the card */
  blurb: string
  /**
   * Where the "See more" button navigates to.
   * e.g. "/produce#paddy"  or  "/fisheries"
   */
  link: string
}

export const homePortfolio: PortfolioCard[] = [
  {
    title: 'Ponni Paddy Fields',
    category: 'Agriculture',
    folder: 'paddy',
    link: '/produce#paddy',
    image: 'IMG_8788.jpeg',
    blurb: 'Two seasonal harvests of aromatic Ponni rice across 40 acres.',
  },
  {
    title: 'Coconut Groves',
    category: 'Agriculture',
    folder: 'coconut',
    link: '/produce#coconut',
    image: 'IMG_7997.jpeg',
    blurb: 'Tall variety coconuts hand-picked from century-old trees.',
  },
  {
    title: 'Paakumaram Areca',
    category: 'Areca Nut',
    folder: 'areca',
    link: '/produce#areca',
    image: 'pakku.jpg',
    blurb: 'Premium sun-dried areca nut sorted by grade for wholesalers.',
  },
  {
    title: 'Alphonso Mangoes',
    category: 'Horticulture',
    folder: 'mango',
    link: '/produce#horticulture',
    image: '',
    blurb: 'Small-batch heritage mango cultivars from our 200-tree grove.',
  },
  {
    title: 'Jackfruit Orchard',
    category: 'Horticulture',
    folder: 'jackfruit',
    link: '/produce#horticulture',
    image: '',
    blurb: 'Whole and processed jackfruit sold fresh through monsoon.',
  },
  {
    title: 'RVS AGRI Timber',
    category: 'Forestry',
    folder: 'forestry',
    link: '/produce#forestry',
    image: '',
    blurb: 'Sustainably managed red sandalwood plantation, 25-year cycle.',
  },
  {
    title: 'Rohu & Catla Ponds',
    category: 'Fisheries',
    folder: 'fisheries',
    link: '/fisheries',
    image: '',
    blurb: 'Three freshwater ponds stocked with local carp species.',
  },
  {
    title: 'Banana Intercrop',
    category: 'Horticulture',
    folder: 'banana',
    link: '/produce#horticulture',
    image: '',
    blurb: 'Nendran banana grown between coconut rows year-round.',
  },
]
