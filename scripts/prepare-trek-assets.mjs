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
 *   public/<dir>/       short muted H.264 loops (CLIPS), with a poster
 *                       frame written next to the stills
 *
 * All EXIF/XMP/ICC is stripped; clips lose audio and metadata. Posters are
 * text-heavy, so they are encoded without chroma subsampling to keep the type
 * crisp. sharp ships with next.
 *
 * One-time tooling, never in package.json — only needed for the inputs that
 * use them (iPhone .heic stills, clips):
 *   npm i --no-save heic-convert@2.1.0 ffmpeg-static@5.3.0
 * (sharp's libvips has no HEVC decoder, and the ffmpeg 7.0 build decodes only
 * one tile of an iPhone HEIC grid, so .heic goes through heic-convert.)
 *
 * Usage:
 *   node scripts/prepare-trek-assets.mjs [--check] [--force]
 *
 * To add a programme or album: append a block to SETS (and CLIPS), run,
 * commit the outputs. Clips are served from public/ — never re-encode into a
 * filename that has shipped; bump the name instead.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { spawn } from 'node:child_process'
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
        ['00-spare-canyon-wide.jpg', 'weekend-09-walls.jpg', 1400],
        ['02-raft-water-crossing.jpg', 'weekend-10-raft.jpg', 1400],
      ].map(([file, out, longEdge]) => ({
        src: `${WIN}/Downloads/${file}`,
        out,
        longEdge,
        quality: 80,
      })),

      // From the 14–15 Nov 2026 batch (added 19 Nov): Kokankada at sunset, and
      // two of the rappel — new that batch, shown as their own block above the
      // wall. They replaced 'Light through the canyon' (weekend-08-light.jpg).
      // The rest of the batch is the gallery album.
      ...[
        ['kokankada-sunset.jpg', 'weekend-03-kokankada-sunset.jpg', 1400],
        ['IMG_4783 (1).jpg', 'weekend-11a-rappel-rope.jpg', 1600],
        ['rapilling-iconic.jpg', 'weekend-11-rappel.jpg', 1600],
      ].map(([file, out, longEdge]) => ({
        src: `${WIN}/Desktop/sandhan-14-NOV/${file}`,
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
  {
    // Sandhan Valley + Harishchandragad, batch B1, 14–15 Nov 2026 — the first
    // batch of the Sandhan weekend, as a gallery album (19 Nov 2026). In EXIF
    // order. No names on people: file names say what is in the frame.
    dir: 'gallery/sandhan-14-nov',
    items: [
      ...[
        // Sat: the temple and Kedareshwar cave (added 19 Nov, replacing the
        // Kokankada-edge photo), then Kokankada at sunset.
        ['temple.jpeg', '00a-temple.jpg', 1600],
        ['kedareshwar-cave.jpeg', '00b-kedareshwar-cave.jpg', 1600],
        ['kokankada-sunset.jpg', '01-kokankada-sunset.jpg', 2000],
        ['PXL_20261115_014955044.MP.jpg', '03-camp-sunrise.jpg', 1600],
        ['chick-pic.jpg', '05-chick.jpg', 1400],
        ['rapilling-iconic.jpg', '06-rappel-down.jpg', 2000],
        ['IMG_4773_(1).jpg', '07-rappel-lip.jpg', 1400],
        ['IMG_4775.jpg', '08-rappel-rope.jpg', 1400],
        ['IMG_4783 (1).jpg', '09-rappel-near.jpg', 1400],
        ['IMG_4834.HEIC', '10-canyon-group.jpg', 1600],
        ['IMG_4844.HEIC', '12-moth.jpg', 1400],
        ['IMG20261115131359.jpg', '13-forest-gate.jpg', 1600],
        ['2-days-family.HEIC', '14-host-family.jpg', 2000],
        ['carva.heic', '15-jeep-dusk.jpg', 1800],
      ].map(([file, out, longEdge]) => ({
        src: `${WIN}/Desktop/sandhan-14-NOV/${file}`,
        out,
        longEdge,
        quality: 80,
      })),
    ],
  },
]

/** Short muted loops: trimmed, cropped, re-encoded small, no audio. `crop` is
 *  in the source's displayed (rotation-applied) pixels; the poster, written
 *  under src/assets/, is the clip's first frame. */
const CLIPS = [
  {
    // Breakfast, Sun 15 Nov — poha on a wood-fired chulha. 14 s → the 5 s
    // with the wok on the fire and the haldi going in.
    src: `${WIN}/Desktop/sandhan-14-NOV/recipe-cooking.mp4`,
    out: 'gallery/sandhan-14-nov/chulha.mp4',
    poster: 'gallery/sandhan-14-nov/04-chulha-poster.jpg',
    ss: 5.0,
    t: 5.0,
    crop: '1080:1440:0:120',
    size: '720:960',
    fps: 24,
  },
  {
    // A snake crossing a boulder in Sandhan, 15 Nov. 5.8 s of 4K/60 → 4 s,
    // cropped square around the snake.
    src: `${WIN}/Desktop/sandhan-14-NOV/snake-moving-video.mp4`,
    out: 'gallery/sandhan-14-nov/snake.mp4',
    poster: 'gallery/sandhan-14-nov/11-snake-poster.jpg',
    ss: 1.0,
    t: 4.0,
    crop: '1800:1800:180:700',
    size: '720:720',
    fps: 30,
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

/** A path sharp can read directly, or — for .heic — a decoded JPEG buffer.
 *  libheif applies the HEIC's rotation on decode, so the result is upright. */
async function readInput(src) {
  if (!/\.heic$/i.test(src)) return src
  let convert
  try {
    convert = (await import('heic-convert')).default
  } catch {
    console.error('heic-convert is not installed. Run:\n  npm i --no-save heic-convert@2.1.0')
    process.exit(1)
  }
  return Buffer.from(await convert({ buffer: await fs.readFile(src), format: 'JPEG', quality: 0.95 }))
}

async function ffmpegBin() {
  if (process.env.FFMPEG_BIN) return process.env.FFMPEG_BIN
  try {
    return (await import('ffmpeg-static')).default
  } catch {
    console.error('ffmpeg-static is not installed. Run:\n  npm i --no-save ffmpeg-static@5.3.0')
    process.exit(1)
  }
}

function run(bin, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(bin, args, { stdio: ['ignore', 'ignore', 'pipe'] })
    let stderr = ''
    child.stderr.on('data', (d) => (stderr += d))
    child.on('error', reject)
    child.on('close', (code) =>
      code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}\n${stderr.slice(-2000)}`)),
    )
  })
}

async function prepareClip(clip) {
  const outPath = path.join(root, 'public', clip.out)
  const posterPath = path.join(root, 'src/assets', clip.poster)
  if (!cli.force && (await exists(outPath)) && (await exists(posterPath))) {
    console.log(`  = ${clip.out} (exists, skip)`)
    return
  }
  if (cli.check) {
    console.log(`  ? ${clip.out} would be written from ${clip.src}`)
    return
  }
  const ffmpeg = await ffmpegBin()
  await fs.mkdir(path.dirname(outPath), { recursive: true })
  await fs.mkdir(path.dirname(posterPath), { recursive: true })
  const vf = `crop=${clip.crop},scale=${clip.size}:flags=lanczos,fps=${clip.fps},format=yuv420p`
  // prettier-ignore
  await run(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-ss', String(clip.ss), '-t', String(clip.t), '-i', clip.src,
    '-an', '-map_metadata', '-1', '-vf', vf,
    '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-crf', '27',
    '-maxrate', '1800k', '-bufsize', '3600k', '-movflags', '+faststart',
    outPath,
  ])
  // The poster comes from the encoded clip, so it matches the first frame exactly.
  const frame = path.join(path.dirname(posterPath), `.${path.basename(posterPath)}.png`)
  await run(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', outPath, '-frames:v', '1', '-update', '1', frame])
  await sharp(frame).jpeg({ quality: 80, mozjpeg: true }).toFile(posterPath)
  await fs.rm(frame)
  const { size } = await fs.stat(outPath)
  console.log(`  + ${clip.out} ${(size / 1024).toFixed(0)} KB · ${clip.poster}`)
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
    const pipeline = sharp(await readInput(item.src), { failOn: 'error' })
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

console.log('clips')
for (const clip of CLIPS) await prepareClip(clip)
