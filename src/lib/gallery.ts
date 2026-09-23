/**
 * Naneghat, Sun 23 Aug 2026 — the album the gallery page tells.
 *
 * Stills and posters are static imports so next/image gets width, height and
 * a blur placeholder for free. Frames and clips live under public/ and are
 * produced by scripts/prepare-gallery-assets.mjs.
 */
import type { StaticImageData } from 'next/image'
import dadar from '@/assets/gallery/naneghat/01-dadar.jpg'
import group from '@/assets/gallery/naneghat/02-group.jpg'
import reverseFall from '@/assets/gallery/naneghat/03-reverse-fall.jpg'
import pass from '@/assets/gallery/naneghat/04-pass.jpg'
import signA from '@/assets/gallery/naneghat/05-sign-a.jpg'
import signB from '@/assets/gallery/naneghat/06-sign-b.jpg'
import wavePoster from '@/assets/gallery/naneghat/wave-poster.jpg'
import fallPoster from '@/assets/gallery/naneghat/fall-poster.jpg'

export const naneghat = {
  posters: { wave: wavePoster, fall: fallPoster },
  videos: {
    wave: '/gallery/naneghat/wave.mp4',
    fall: '/gallery/naneghat/fall.mp4',
  },
} as const

/** Desktop grid placement and parallax amplitude for one item in the field.
 *  Tailwind classes are literal strings so the v4 scanner picks them up. */
export type FieldLayout = {
  col: string
  offset?: string
  /** px of upward drift across the section, desktop / mobile */
  delta: number
  deltaMobile: number
  sizes: string
}

export type FieldItem =
  | {
      kind: 'still'
      key: 'dadar' | 'group' | 'reverseFall' | 'pass'
      src: StaticImageData
      layout: FieldLayout
    }
  | { kind: 'clip'; key: 'fall'; poster: StaticImageData; src: string; layout: FieldLayout }
  | { kind: 'sign'; key: 'sign'; a: StaticImageData; b: StaticImageData; layout: FieldLayout }
  | { kind: 'footnote'; key: 'footnote'; layout: FieldLayout }

const portraitSizes = '(min-width:1440px) 440px, (min-width:1024px) 31vw, 100vw'
const wideSizes = '(min-width:1440px) 770px, (min-width:1024px) 55vw, 100vw'

/** Chronological top→bottom. Overlapping column ranges push items onto new
 *  rows; the offsets and differing deltas scatter them like spray. */
export const fieldItems: FieldItem[] = [
  {
    kind: 'still',
    key: 'dadar',
    src: dadar,
    layout: { col: 'lg:col-start-2 lg:col-span-4', delta: 40, deltaMobile: 16, sizes: portraitSizes },
  },
  {
    kind: 'still',
    key: 'group',
    src: group,
    layout: {
      col: 'lg:col-start-6 lg:col-span-7',
      offset: 'lg:mt-[22vh]',
      delta: 140,
      deltaMobile: 40,
      sizes: wideSizes,
    },
  },
  {
    kind: 'clip',
    key: 'fall',
    poster: fallPoster,
    src: naneghat.videos.fall,
    layout: {
      col: 'lg:col-start-1 lg:col-span-4',
      offset: 'lg:-mt-[6vh]',
      delta: 90,
      deltaMobile: 24,
      sizes: portraitSizes,
    },
  },
  {
    kind: 'still',
    key: 'reverseFall',
    src: reverseFall,
    layout: {
      col: 'lg:col-start-7 lg:col-span-4',
      offset: 'lg:mt-[24vh]',
      delta: 40,
      deltaMobile: 16,
      sizes: portraitSizes,
    },
  },
  {
    kind: 'still',
    key: 'pass',
    src: pass,
    layout: {
      col: 'lg:col-start-3 lg:col-span-4',
      offset: 'lg:-mt-[10vh]',
      delta: 140,
      deltaMobile: 40,
      sizes: portraitSizes,
    },
  },
  {
    kind: 'footnote',
    key: 'footnote',
    layout: {
      col: 'lg:col-start-8 lg:col-span-4',
      offset: 'lg:mt-[16vh]',
      delta: 90,
      deltaMobile: 24,
      sizes: '',
    },
  },
  {
    kind: 'sign',
    key: 'sign',
    a: signA,
    b: signB,
    layout: { col: 'lg:col-start-5 lg:col-span-4', delta: 40, deltaMobile: 16, sizes: portraitSizes },
  },
]
