#!/usr/bin/env node
/**
 * Prepare trek-programme images (covers, posters, campaign cards).
 *
 * Reads the raw exports (read-only, never modified) and writes web-ready JPEGs
 * into the repo:
 *
 *   src/assets/treks/<slug>/   imported statically by src/lib/treks.ts so
 *                              next/image gets width/height/blur for free
 *
 * All EXIF/XMP/ICC is stripped. Posters are text-heavy, so they are encoded
 * without chroma subsampling to keep the type crisp. sharp ships with next.
 *
 * Usage:
 *   node scripts/prepare-trek-assets.mjs [--check] [--force]
 *
 * To add a programme: append a block to SETS, run, commit the outputs.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import sharp from 'sharp'

const WIN = '/mnt/c/Users/ACA'
const CREAM = '#FFFDF8'

const SETS = [
  {
    slug: 'sahyadri',
    items: [
      // Region cover — the Harishchandragad ridge at dusk.
      { src: `${WIN}/Downloads/harish_raw.jpeg`, out: 'cover.jpg', longEdge: 1800, quality: 82 },

      // One-day trek posters — 9:16 story exports, dates removed (24 Sep 2026),
      // from the "Color and type pairings (2)" set. They replaced the 4:5 posters.
      ...['naneghat', 'harishchandragad', 'aadrai'].map((name) => ({
        src: `${WIN}/Downloads/Color and type pairings (2)/exports/stories/${name}-9x16.png`,
        out: `day-${name}.jpg`,
        longEdge: 1920,
        quality: 86,
        poster: true,
      })),

      // 2D/1N Ratangad + Harishchandragad campaign cards, in the order the carousel
      // numbers them. The social-proof card is left out. 24 Sep 2026 re-exports
      // (dates removed) from Downloads replace the Desktop/2-3 oct meta-4250 set.
      {
        src: `${WIN}/Downloads/Hook · Card 1 · 1 1@1x (1).png`,
        out: 'weekend-1-hook.jpg', longEdge: 1440, quality: 84, poster: true,
      },
      {
        src: `${WIN}/Downloads/card-3-night (2).png`,
        out: 'weekend-2-night.jpg', longEdge: 1080, quality: 86, poster: true,
      },
      {
        src: `${WIN}/Downloads/card-4-day2 (1).png`,
        out: 'weekend-3-ratangad.jpg', longEdge: 1080, quality: 86, poster: true,
      },
      {
        src: `${WIN}/Downloads/Offer · Card 5 · 1 1@1x.png`,
        out: 'weekend-4-offer.jpg', longEdge: 1440, quality: 84, poster: true,
      },
    ],
  },
]

// ---------------------------------------------------------------------------

const { values: cli } = parseArgs({
  options: {
    check: { type: 'boolean', default: false },
    force: { type: 'boolean', default: false },
  },
})

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

async function exists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

async function prepare(set) {
  const outDir = path.join(root, 'src/assets/treks', set.slug)
  await fs.mkdir(outDir, { recursive: true })

  for (const item of set.items) {
    const outPath = path.join(outDir, item.out)
    if (!cli.force && (await exists(outPath))) {
      console.log(`  = ${set.slug}/${item.out} (exists, skip)`)
      continue
    }
    if (cli.check) {
      console.log(`  ? ${set.slug}/${item.out} would be written from ${item.src}`)
      continue
    }
    const pipeline = sharp(item.src, { failOn: 'error' })
      .rotate() // honour EXIF orientation before stripping it
      .flatten({ background: CREAM })
      .resize({ width: item.longEdge, height: item.longEdge, fit: 'inside', withoutEnlargement: true })
      .jpeg({
        quality: item.quality,
        mozjpeg: true,
        chromaSubsampling: item.poster ? '4:4:4' : '4:2:0',
      })
    const info = await pipeline.toFile(outPath)
    console.log(`  + ${set.slug}/${item.out} ${info.width}×${info.height} ${(info.size / 1024).toFixed(0)} KB`)
  }
}

for (const set of SETS) {
  console.log(`treks/${set.slug}`)
  await prepare(set)
}
