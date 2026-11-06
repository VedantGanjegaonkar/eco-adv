#!/usr/bin/env node
/**
 * Prepare trek-programme images (covers, posters, batch photos).
 *
 * Reads the raw exports (read-only, never modified) and writes web-ready JPEGs
 * into the repo:
 *
 *   src/assets/<dir>/   imported statically by src/lib/treks.ts and
 *                       src/lib/albums.ts so next/image gets width/height/blur
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
    dir: 'treks/sahyadri',
    items: [
      // Region cover — the Bhandardara lakeside camp at sunrise, 25 Oct 2026
      // batch (replaced the Ratangad ledge cover, 6 Nov 2026 — that one now
      // heads the Ratangad gallery album).
      {
        src: `${WIN}/Downloads/04-tents-lakeside.jpg`,
        out: 'cover.jpg',
        longEdge: 2000,
        quality: 80,
      },

      // One-day trek posters — 9:16 story exports, dates removed (24 Sep 2026),
      // from the "Color and type pairings (2)" set. They replaced the 4:5 posters.
      ...['naneghat', 'harishchandragad', 'aadrai'].map((name) => ({
        src: `${WIN}/Downloads/Color and type pairings (2)/exports/stories/${name}-9x16.png`,
        out: `day-${name}.jpg`,
        longEdge: 1920,
        quality: 86,
        poster: true,
      })),

      // The Sahyadri Weekend (Sandhan Valley + Harishchandragad) — real photos
      // from the 24–25 Oct 2026 batch, in itinerary order (EXIF times), the
      // same originals as the 6 Nov carousel. The lakeside-camp photo is the
      // region cover, so it is not repeated here. No names on people: file names
      // and alt text describe the place only.
      ...[
        ['07-kokankada-feet-over-edge.jpg', 'weekend-01-kokankada.jpg', 1400],
        ['05-fire-skewer.jpg', 'weekend-02-bonfire.jpg', 1400],
        ['06a-jeep-group-selfie.jpg', 'weekend-04-jeep.jpg', 1400],
        ['06b-jeep-bonnet-feet.jpg', 'weekend-05-lake-road.jpg', 1400],
        ['01-cover-canyon-3-trekkers.jpg', 'weekend-07-canyon.jpg', 1400],
        ['03b-portrait-light-beam.jpg', 'weekend-08-light.jpg', 1400],
        ['00-spare-canyon-wide.jpg', 'weekend-09-walls.jpg', 1400],
        ['02-raft-water-crossing.jpg', 'weekend-10-raft.jpg', 1400],
      ].map(([file, out, longEdge]) => ({
        src: `${WIN}/Downloads/${file}`,
        out,
        longEdge,
        quality: 80,
      })),
    ],
  },
  {
    // The Ratangad + Harishchandragad weekend, archived to the photo gallery
    // (6 Nov 2026) when the Sandhan Valley weekend replaced it on the trek page.
    dir: 'gallery/ratangad',
    items: [
      // Album cover — the 3–4 Oct batch on the rock ledge at the top of Ratangad
      // (the Sahyadri region cover from 20 Oct to 6 Nov 2026).
      { src: `${WIN}/Pictures/2-3 oct/IMG20261004135510.jpg`, out: 'cover.jpg', longEdge: 2000, quality: 80 },

      // The 3–4 Oct 2026 batch — real photos, in itinerary order. They replaced
      // the four campaign cards (19 Oct 2026), which carried the old tempo-traveller plan.
      ...[
        ['20261003_150221.jpg (1).jpeg', 'batch-1-temple.jpg', 1400],
        ['20261003_151409.jpg (1).jpeg', 'batch-2-cave.jpg', 1400],
        ['20261003_153327.jpg', 'batch-3-ridge.jpg', 1600],
        ['20261003_160447.jpg', 'batch-4-konkankada.jpg', 1400],
        ['night-camp-jam.png', 'batch-5-campfire.jpg', 1600],
        ['IMG20261004133618.jpg', 'batch-6-bloom.jpg', 1400],
        ['IMG20261004134101.jpg', 'batch-7-wall.jpg', 1400],
        ['IMG20261004135510.jpg', 'batch-8-top.jpg', 1600],
        ['IMG20261004184512.jpg', 'batch-9-boating.jpg', 1400],
      ].map(([file, out, longEdge]) => ({
        src: `${WIN}/Pictures/2-3 oct/${file}`,
        out,
        longEdge,
        quality: 80,
      })),
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
  const outDir = path.join(root, 'src/assets', set.dir)
  await fs.mkdir(outDir, { recursive: true })

  for (const item of set.items) {
    const outPath = path.join(outDir, item.out)
    if (!cli.force && (await exists(outPath))) {
      console.log(`  = ${set.dir}/${item.out} (exists, skip)`)
      continue
    }
    if (cli.check) {
      console.log(`  ? ${set.dir}/${item.out} would be written from ${item.src}`)
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
    console.log(`  + ${set.dir}/${item.out} ${info.width}×${info.height} ${(info.size / 1024).toFixed(0)} KB`)
  }
}

for (const set of SETS) {
  console.log(set.dir)
  await prepare(set)
}
