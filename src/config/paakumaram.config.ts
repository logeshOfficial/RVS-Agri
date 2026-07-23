/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PAAKUMARAM ARECA SLIDESHOW — IMAGE CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  HOW TO UPDATE IMAGES (no AI needed):
 *
 *  1. Drop your new image file into the /public folder
 *     e.g. public/pakku-new.jpg  or  public/pakku-new.jpeg
 *
 *  2. Add a new entry to the `paakumaramImages` array below:
 *     { src: "pakku-new.jpeg", alt: "Your description here" }
 *     (use the exact filename including extension — .jpg or .jpeg)
 *
 *  3. To REMOVE an image — delete its entry from the array.
 *  4. To REORDER — drag-and-drop the objects in the array.
 *  5. Save the file. Done. The slideshow updates automatically.
 *
 *  NOTE: `src` paths are relative to the /public folder root.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface PaakumaramImage {
  /** Filename in /public — e.g. "pakku-new.jpg" (no leading slash needed) */
  src: string
  /** Accessible alt text describing the image */
  alt: string
}

export const paakumaramImages: PaakumaramImage[] = [
  {
    src: 'areca/pakku-1.jpeg',
    alt: 'Paakumaram areca tree — ripe golden-orange betel nuts on the trunk',
  },
  {
    src: 'areca/pakku-2.jpeg',
    alt: 'Paakumaram areca tree — dense clusters of orange and green nuts',
  },
  {
    src: 'areca/pakku-3.jpeg',
    alt: 'Paakumaram areca tree — green areca nuts at an earlier ripening stage',
  },
  {
    src: 'areca/pakku-4.jpeg',
    alt: 'Paakumaram areca tree — full tree view showing height and plantation row',
  },
  {
    src: 'areca/pakku.jpg',
    alt: 'Paakumaram areca nut — close view of harvested betel nuts',
  },
]

/** Auto-advance interval in milliseconds (2000 = 2 seconds) */
export const SLIDESHOW_INTERVAL_MS = 2000
