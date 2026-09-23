#!/usr/bin/env node
/**
 * Prepare gallery media for the site.
 *
 * Reads an album's raw photos and clips (read-only, never modified) and writes
 * web-ready derivatives into the repo:
 *
 *   src/assets/gallery/<slug>/   stills + video posters — imported statically so
 *                                next/image gets width/height/blur for free
 *   public/gallery/<slug>/       H.264 mp4s + WebP frame sequences for the
 *                                scroll-scrubbed hero
 *   src/lib/gallery-frames.ts    manifest the hero reads frame URLs from
 *
 * All EXIF/XMP/ICC (including GPS) is stripped from every image; audio and
 * metadata are stripped from every clip.
 *
 * One-time tooling — ffmpeg is NOT a project dependency:
 *   npm i --no-save ffmpeg-static@5.3.0      (or set FFMPEG_BIN=/path/to/ffmpeg)
 * If the GitHub binary download stalls, use the mirror:
 *   FFMPEG_BINARIES_URL=https://cdn.npmmirror.com/binaries/ffmpeg-static npm i --no-save ffmpeg-static@5.3.0
 * sharp already ships with next.
 *
 * Usage:
 *   node scripts/prepare-gallery-assets.mjs [--check] [--force]
 *        [--only=stills,posters,frames,videos,manifest] [--keep-temp] [--strict]
 *
 * To add a batch: append/replace the ALBUM block, run, commit the outputs.
 * Frames and mp4s are served with an immutable cache header, so never
 * regenerate into the same filenames after a deploy — bump the folder instead.
 */

import { spawn } from 'node:child_process'
import fs from 'node:fs/promises'
import { constants as fsConstants } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

const MiB = 2 ** 20

const ALBUM = {
  slug: 'naneghat',
  sourceDir: '/mnt/c/Users/ACA/Desktop/naneghat pics',
  stills: {
    longEdge: 2000,
    quality: 82,
    items: [
      { src: 'PXL_20260823_001235353.jpg', out: '01-dadar.jpg' },
      { src: 'PXL_20260823_064411787 (1).jpg', out: '02-group.jpg' },
      { src: 'PXL_20260823_091831260.jpg', out: '03-reverse-fall.jpg' },
      { src: 'PXL_20260823_111354193.MP.jpg', out: '04-pass.jpg' },
      { src: 'PXL_20260823_131517828.jpg', out: '05-sign-a.jpg' },
      { src: 'PXL_20260823_131523640.jpg', out: '06-sign-b.jpg' },
    ],
  },
  clips: [
    {
      src: 'wave-waterfall-video.mp4',
      out: 'wave',
      video: { longEdge: 1280, crfLadder: [24, 26, 28], maxrateK: 2600, maxBytes: 3 * MiB },
      poster: { out: 'wave-poster.jpg', at: 0, quality: 80 },
      // Sizes are long-edge so portrait and landscape clips both work; the
      // phone clips here are portrait, so lg = 1080×1920, sm = 720×1280.
      frames: {
        count: 72,
        lg: { longEdge: 1920, quality: 68, maxBytes: 6 * MiB },
        sm: { longEdge: 1280, quality: 64, maxBytes: 2.5 * MiB },
      },
    },
    {
      src: 'Bhuva-waterfall.mp4',
      out: 'fall',
      video: { longEdge: 1280, crfLadder: [24, 26, 28], maxrateK: 2600, maxBytes: 3 * MiB },
      poster: { out: 'fall-poster.jpg', at: 0, quality: 80 },
    },
  ],
}

const ALL_STEPS = ['stills', 'posters', 'frames', 'videos', 'manifest']

// ---------------------------------------------------------------------------

function parseCli() {
  const { values } = parseArgs({
    options: {
      check: { type: 'boolean', default: false },
      force: { type: 'boolean', default: false },
      only: { type: 'string' },
      'keep-temp': { type: 'boolean', default: false },
      strict: { type: 'boolean', default: false },
    },
  })
  const only = new Set(values.only ? values.only.split(',') : ALL_STEPS)
  for (const step of only) {
    if (!ALL_STEPS.includes(step)) throw new Error(`unknown --only step "${step}"`)
  }
  return { check: values.check, force: values.force, only, keepTemp: values['keep-temp'], strict: values.strict }
}

function outDirs(root, slug) {
  return {
    stillsDir: path.join(root, 'src/assets/gallery', slug),
    publicDir: path.join(root, 'public/gallery', slug),
    framesDir: path.join(root, 'public/gallery', slug, 'frames'),
    manifest: path.join(root, 'src/lib/gallery-frames.ts'),
  }
}

async function resolveTools() {
  let ffmpeg = process.env.FFMPEG_BIN
  if (!ffmpeg) {
    try {
      ffmpeg = (await import('ffmpeg-static')).default
    } catch (err) {
      if (err.code === 'ERR_MODULE_NOT_FOUND') {
        console.error(
          'ffmpeg-static is not installed. Run:\n  npm i --no-save ffmpeg-static@5.3.0\nor set FFMPEG_BIN=/path/to/ffmpeg',
        )
        process.exit(1)
      }
      throw err
    }
  }
  const sharp = (await import('sharp')).default
  return { ffmpeg, sharp }
}

/** Spawn with an argument array (source paths contain spaces) and buffer output. */
function run(bin, args, { expectExit = 0 } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(bin, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let stdout = ''
    let stderr = ''
    child.stdout.on('data', (d) => (stdout += d))
    child.stderr.on('data', (d) => (stderr += d))
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === expectExit) resolve({ code, stdout, stderr })
      else reject(new Error(`${path.basename(bin)} ${args.join(' ')}\nexited ${code}\n${stderr.slice(-2000)}`))
    })
  })
}

/** `ffmpeg -i` exits 1 ("no output specified") but dumps the streams on stderr. */
async function probe(ffmpeg, file) {
  const { stderr } = await run(ffmpeg, ['-hide_banner', '-i', file], { expectExit: 1 })
  const dur = stderr.match(/Duration: (\d\d):(\d\d):(\d\d\.\d+)/)
  const vid = stderr.match(/Stream #\d+:\d+.*?: Video: (\w+)[^\n]*?(\d{3,5})x(\d{3,5})/)
  const fps = stderr.match(/(\d+(?:\.\d+)?) fps/)
  // Phone clips carry a display-matrix rotation; ffmpeg applies it on decode,
  // so a ±90° flag means the coded WxH is really HxW.
  const rot = stderr.match(/rotation of (-?\d+(?:\.\d+)?) degrees/)
  const quarterTurn = rot ? Math.abs(+rot[1]) % 180 === 90 : false
  const codedW = vid ? +vid[2] : 0
  const codedH = vid ? +vid[3] : 0
  return {
    duration: dur ? +dur[1] * 3600 + +dur[2] * 60 + +dur[3] : NaN,
    codec: vid?.[1],
    width: quarterTurn ? codedH : codedW,
    height: quarterTurn ? codedW : codedH,
    rotated: quarterTurn,
    fps: fps ? +fps[1] : NaN,
    hasAudio: /: Audio: /.test(stderr),
    raw: stderr,
  }
}

const exists = (p) => fs.access(p).then(() => true, () => false)
const kb = (n) => `${(n / 1024).toFixed(0)} KB`
const mb = (n) => `${(n / MiB).toFixed(2)} MB`
const pad3 = (i) => String(i).padStart(3, '0')

/** Long edge → sharp resize options that keep the source orientation. */
const fitLongEdge = (longEdge) => ({ width: longEdge, height: longEdge, fit: 'inside', kernel: 'lanczos3' })

async function measureFrame(sharp, dir) {
  const m = await sharp(path.join(dir, 'f-000.webp')).metadata()
  return { width: m.width, height: m.height }
}

async function countFiles(dir, ext) {
  try {
    return (await fs.readdir(dir)).filter((f) => f.endsWith(ext)).length
  } catch {
    return 0
  }
}

// ---------------------------------------------------------------------------

async function preflight({ ffmpeg, sharp }, cfg, dirs, root) {
  console.log(`node ${process.version} · sharp ${sharp.versions.sharp} (libvips ${sharp.versions.vips})`)
  const ver = await run(ffmpeg, ['-version'])
  console.log(`ffmpeg: ${ffmpeg}\n  ${ver.stdout.split('\n')[0]}`)

  const dec = await run(ffmpeg, ['-hide_banner', '-decoders'])
  if (!/^ V.{5} hevc /m.test(dec.stdout)) throw new Error('this ffmpeg build cannot decode HEVC')
  const enc = await run(ffmpeg, ['-hide_banner', '-encoders'])
  if (!/libx264/.test(enc.stdout)) throw new Error('this ffmpeg build lacks libx264')

  const sources = [
    ...cfg.stills.items.map((i) => i.src),
    ...cfg.clips.map((c) => c.src),
  ]
  for (const s of sources) {
    await fs.access(path.join(cfg.sourceDir, s), fsConstants.R_OK)
  }
  console.log(`sources: ${sources.length} files readable in ${cfg.sourceDir}`)

  for (const clip of cfg.clips) {
    const p = await probe(ffmpeg, path.join(cfg.sourceDir, clip.src))
    console.log(
      `  ${clip.src}: ${p.codec} ${p.width}x${p.height}${p.rotated ? ' (rotated)' : ''} ` +
        `${p.fps} fps ${p.duration.toFixed(2)} s${p.hasAudio ? ' +audio' : ''}`,
    )
  }

  const src = path.resolve(cfg.sourceDir)
  for (const dir of [dirs.stillsDir, dirs.publicDir, path.dirname(dirs.manifest)]) {
    const abs = path.resolve(dir)
    if (!abs.startsWith(root + path.sep)) throw new Error(`output ${abs} is outside the repo`)
    if (abs.startsWith(src + path.sep)) throw new Error(`output ${abs} is inside the source dir`)
  }
}

async function processStills(sharp, cfg, dirs, opts) {
  await fs.mkdir(dirs.stillsDir, { recursive: true })
  console.log('\nstills')
  for (const item of cfg.stills.items) {
    const src = path.join(cfg.sourceDir, item.src)
    const out = path.join(dirs.stillsDir, item.out)
    if (!opts.force && (await exists(out))) {
      console.log(`  ${item.out}  (exists, skipped)`)
      continue
    }
    // No withMetadata()/keepMetadata(): sharp strips EXIF/XMP/ICC by default,
    // which is what drops the GPS tags and the Motion Photo trailer.
    const info = await sharp(src)
      .rotate()
      .resize({
        width: cfg.stills.longEdge,
        height: cfg.stills.longEdge,
        fit: 'inside',
        withoutEnlargement: true,
        kernel: 'lanczos3',
      })
      .jpeg({ quality: cfg.stills.quality, progressive: true, mozjpeg: true })
      .toFile(out)
    console.log(`  ${item.out}  ${info.width}x${info.height}  ${kb(info.size)}`)
  }
}

async function extractPoster({ ffmpeg, sharp }, cfg, clip, dirs, tmp, opts) {
  const out = path.join(dirs.stillsDir, clip.poster.out)
  if (!opts.force && (await exists(out))) {
    console.log(`  ${clip.poster.out}  (exists, skipped)`)
    return
  }
  const src = path.join(cfg.sourceDir, clip.src)
  const png = path.join(tmp, `${clip.out}-poster.png`)
  await run(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-nostdin', '-y',
    '-ss', String(clip.poster.at), '-i', src,
    '-map', '0:v:0', '-an', '-sn', '-dn',
    '-frames:v', '1', '-f', 'image2', '-pix_fmt', 'rgb24', png,
  ])
  const info = await sharp(png)
    .jpeg({ quality: clip.poster.quality, progressive: true, mozjpeg: true })
    .toFile(out)
  console.log(`  ${clip.poster.out}  ${info.width}x${info.height}  ${kb(info.size)}`)
}

/** Returns { over } — whether a set went over its byte budget. */
async function buildFrames({ ffmpeg, sharp }, cfg, clip, dirs, tmp, opts) {
  const { count, lg, sm } = clip.frames
  const lgDir = path.join(dirs.framesDir, 'lg')
  const smDir = path.join(dirs.framesDir, 'sm')
  if (
    !opts.force &&
    (await countFiles(lgDir, '.webp')) === count &&
    (await countFiles(smDir, '.webp')) === count
  ) {
    console.log(`  ${clip.out} frames  (${count} lg + ${count} sm exist, skipped)`)
    return { over: false }
  }

  const src = path.join(cfg.sourceDir, clip.src)
  const { duration } = await probe(ffmpeg, src)
  const pngDir = path.join(tmp, `${clip.out}-frames`)

  const extract = async (dur) => {
    await fs.rm(pngDir, { recursive: true, force: true })
    await fs.mkdir(pngDir, { recursive: true })
    await run(ffmpeg, [
      '-hide_banner', '-loglevel', 'error', '-nostdin', '-y',
      '-i', src,
      '-map', '0:v:0', '-an', '-sn', '-dn',
      '-vf', `fps=${count}/${dur.toFixed(3)}`,
      '-frames:v', String(count),
      '-start_number', '0',
      '-f', 'image2', '-pix_fmt', 'rgb24',
      path.join(pngDir, 'f-%03d.png'),
    ])
    return (await fs.readdir(pngDir)).filter((f) => f.endsWith('.png')).sort()
  }

  let pngs = await extract(duration)
  // A VFR source can leave the last fps slot empty; nudge the spacing once.
  if (pngs.length === count - 1) pngs = await extract(duration - 0.05)
  if (pngs.length !== count) throw new Error(`${clip.src}: expected ${count} frames, got ${pngs.length}`)

  for (const dir of [lgDir, smDir]) {
    await fs.rm(dir, { recursive: true, force: true })
    await fs.mkdir(dir, { recursive: true })
  }

  const sizes = { lg: [], sm: [] }
  const dims = { lg: null, sm: null }
  for (let i = 0; i < count; i++) {
    const img = sharp(path.join(pngDir, pngs[i]))
    const name = `f-${pad3(i)}.webp`
    const [a, b] = await Promise.all([
      img.clone().resize(fitLongEdge(lg.longEdge))
        .webp({ quality: lg.quality, effort: 6, smartSubsample: true })
        .toFile(path.join(lgDir, name)),
      img.clone().resize(fitLongEdge(sm.longEdge))
        .webp({ quality: sm.quality, effort: 6, smartSubsample: true })
        .toFile(path.join(smDir, name)),
    ])
    sizes.lg.push(a.size)
    sizes.sm.push(b.size)
    dims.lg ??= { width: a.width, height: a.height }
    dims.sm ??= { width: b.width, height: b.height }
  }

  let over = false
  for (const [set, spec] of [['lg', lg], ['sm', sm]]) {
    const list = sizes[set]
    const total = list.reduce((s, n) => s + n, 0)
    const flag = total > spec.maxBytes ? '  OVER BUDGET' : ''
    over ||= total > spec.maxBytes
    console.log(
      `  ${clip.out} frames/${set}  ${count} × ${dims[set].width}x${dims[set].height} q${spec.quality}  ` +
        `min ${kb(Math.min(...list))} avg ${kb(total / count)} max ${kb(Math.max(...list))}  ` +
        `total ${mb(total)} / ${mb(spec.maxBytes)}${flag}`,
    )
  }
  return { over }
}

async function transcodeVideo({ ffmpeg }, cfg, clip, dirs, opts) {
  await fs.mkdir(dirs.publicDir, { recursive: true })
  const out = path.join(dirs.publicDir, `${clip.out}.mp4`)
  if (!opts.force && (await exists(out))) {
    console.log(`  ${clip.out}.mp4  (exists, skipped)`)
    return
  }
  const src = path.join(cfg.sourceDir, clip.src)
  const v = clip.video
  for (const crf of v.crfLadder) {
    const { stderr } = await run(ffmpeg, [
      '-hide_banner', '-loglevel', 'error', '-nostdin', '-y', '-stats',
      '-i', src,
      '-map', '0:v:0', '-an', '-sn', '-dn',
      '-map_metadata', '-1', '-map_chapters', '-1',
      // long edge → v.longEdge, other edge even, whichever way the clip is turned
      '-vf', `scale=w='if(gt(a,1),${v.longEdge},-2)':h='if(gt(a,1),-2,${v.longEdge})':flags=lanczos`,
      '-c:v', 'libx264', '-profile:v', 'high', '-level:v', '4.0',
      '-preset', 'slow', '-crf', String(crf),
      '-maxrate', `${v.maxrateK}k`, '-bufsize', `${v.maxrateK * 2}k`,
      '-pix_fmt', 'yuv420p',
      '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
      '-movflags', '+faststart',
      out,
    ])
    const size = (await fs.stat(out)).size
    const stats = [...stderr.matchAll(/dup=(\d+)\s+drop=(\d+)/g)].at(-1)
    console.log(
      `  ${clip.out}.mp4  crf ${crf}  ${mb(size)}` + (stats ? `  dup=${stats[1]} drop=${stats[2]}` : ''),
    )
    if (size <= v.maxBytes) break
  }

  const p = await probe(ffmpeg, out)
  const problems = []
  if (p.codec !== 'h264') problems.push(`codec ${p.codec}`)
  if (Math.max(p.width, p.height) !== v.longEdge) problems.push(`${p.width}x${p.height}`)
  if (p.hasAudio) problems.push('audio track present')
  if (/location|com\.android/i.test(p.raw)) problems.push('metadata survived')
  if (problems.length) throw new Error(`${clip.out}.mp4 failed checks: ${problems.join(', ')}`)
}

async function writeManifest(sharp, cfg, dirs) {
  const clip = cfg.clips.find((c) => c.frames)
  if (!clip) return
  const { count } = clip.frames
  const lg = await measureFrame(sharp, path.join(dirs.framesDir, 'lg'))
  const sm = await measureFrame(sharp, path.join(dirs.framesDir, 'sm'))
  const name = `${cfg.slug}Frames`
  const content = `// AUTO-GENERATED by scripts/prepare-gallery-assets.mjs — do not edit by hand.
const pad = (i: number) => String(i).padStart(3, '0')

export const ${name} = {
  count: ${count},
  lg: (i: number) => \`/gallery/${cfg.slug}/frames/lg/f-\${pad(i)}.webp\`,
  sm: (i: number) => \`/gallery/${cfg.slug}/frames/sm/f-\${pad(i)}.webp\`,
  lgSize: { width: ${lg.width}, height: ${lg.height} },
  smSize: { width: ${sm.width}, height: ${sm.height} },
} as const

export type GalleryFrames = typeof ${name}
`
  const current = await fs.readFile(dirs.manifest, 'utf8').catch(() => null)
  if (current === content) {
    console.log(`  ${path.relative(process.cwd(), dirs.manifest)}  (unchanged)`)
    return
  }
  await fs.writeFile(dirs.manifest, content)
  console.log(`  ${path.relative(process.cwd(), dirs.manifest)}  written`)
}

async function verifyOutputs({ ffmpeg, sharp }, cfg, dirs) {
  const problems = []

  const images = [
    ...cfg.stills.items.map((i) => i.out),
    ...cfg.clips.filter((c) => c.poster).map((c) => c.poster.out),
  ]
  for (const f of images) {
    const p = path.join(dirs.stillsDir, f)
    if (!(await exists(p))) {
      problems.push(`${f} missing`)
      continue
    }
    const m = await sharp(p).metadata()
    if (m.exif || m.xmp || m.icc || m.orientation) problems.push(`${f} still carries metadata`)
    if (m.format !== 'jpeg') problems.push(`${f} is ${m.format}`)
  }

  for (const clip of cfg.clips) {
    if (clip.frames) {
      const { count, lg, sm } = clip.frames
      for (const [set, spec] of [['lg', lg], ['sm', sm]]) {
        const dir = path.join(dirs.framesDir, set)
        const n = await countFiles(dir, '.webp')
        if (n !== count) {
          problems.push(`frames/${set}: ${n} files, expected ${count}`)
          continue
        }
        let total = 0
        for (let i = 0; i < count; i++) {
          const p = path.join(dir, `f-${pad3(i)}.webp`)
          const m = await sharp(p).metadata()
          if (Math.max(m.width, m.height) !== spec.longEdge) {
            problems.push(`frames/${set}/f-${pad3(i)}.webp is ${m.width}x${m.height}`)
          }
          total += m.size ?? (await fs.stat(p)).size
        }
        if (total > spec.maxBytes) console.log(`  warn: frames/${set} ${mb(total)} exceeds ${mb(spec.maxBytes)}`)
      }
    }
    if (clip.video) {
      const p = path.join(dirs.publicDir, `${clip.out}.mp4`)
      if (!(await exists(p))) {
        problems.push(`${clip.out}.mp4 missing`)
        continue
      }
      const info = await probe(ffmpeg, p)
      if (info.codec !== 'h264' || info.hasAudio) problems.push(`${clip.out}.mp4: ${info.codec}${info.hasAudio ? ' +audio' : ''}`)
      const head = Buffer.alloc(64)
      const fh = await fs.open(p)
      await fh.read(head, 0, 64, 0)
      await fh.close()
      if (!head.includes('moov')) problems.push(`${clip.out}.mp4 is not faststart`)
    }
  }

  if (problems.length) {
    console.log(`\nFAIL\n  ${problems.join('\n  ')}`)
    return false
  }
  console.log('\nPASS — all outputs present, sized and metadata-free')
  return true
}

// ---------------------------------------------------------------------------

async function main() {
  const opts = parseCli()
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const dirs = outDirs(root, ALBUM.slug)
  const tools = await resolveTools()

  await preflight(tools, ALBUM, dirs, root)
  if (opts.check) return

  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), `gallery-${ALBUM.slug}-`))
  let overBudget = false
  try {
    if (opts.only.has('stills')) await processStills(tools.sharp, ALBUM, dirs, opts)

    if (opts.only.has('posters')) {
      console.log('\nposters')
      await fs.mkdir(dirs.stillsDir, { recursive: true })
      for (const clip of ALBUM.clips.filter((c) => c.poster)) {
        await extractPoster(tools, ALBUM, clip, dirs, tmp, opts)
      }
    }

    if (opts.only.has('frames')) {
      console.log('\nframes')
      for (const clip of ALBUM.clips.filter((c) => c.frames)) {
        const { over } = await buildFrames(tools, ALBUM, clip, dirs, tmp, opts)
        overBudget ||= over
      }
    }

    if (opts.only.has('videos')) {
      console.log('\nvideos')
      for (const clip of ALBUM.clips.filter((c) => c.video)) {
        await transcodeVideo(tools, ALBUM, clip, dirs, opts)
      }
    }

    if (opts.only.has('manifest')) {
      console.log('\nmanifest')
      await writeManifest(tools.sharp, ALBUM, dirs)
    }

    const ok = await verifyOutputs(tools, ALBUM, dirs)
    if (!ok) process.exitCode = 1
    else if (overBudget && opts.strict) process.exitCode = 2
  } finally {
    if (opts.keepTemp) console.log(`temp kept at ${tmp}`)
    else await fs.rm(tmp, { recursive: true, force: true })
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
