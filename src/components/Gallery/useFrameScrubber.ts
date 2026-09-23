'use client'

import { useEffect, useRef, useState } from 'react'
import { useMotionValueEvent, type MotionValue } from 'motion/react'
import { DESKTOP_QUERY, prefersStatic } from './useViewportPrefs'

type Options = {
  enabled: boolean
  count: number
  /** Resolves frame i to a URL. Must be referentially stable. */
  url: (i: number) => string
  /** Float in 0..count-1; the canvas redraws on every change. */
  frame: MotionValue<number>
  /** Horizontal anchor for the cover-fit crop, 0..1. */
  focalX?: number
}

/** Every 8th frame plus the last first, so scrubbing works before the rest
 *  arrive; then progressively finer passes fill the gaps. */
function loadOrder(count: number) {
  const order: number[] = []
  const seen = new Set<number>()
  const push = (i: number) => {
    if (i < count && !seen.has(i)) {
      seen.add(i)
      order.push(i)
    }
  }
  for (let i = 0; i < count; i += 8) push(i)
  push(count - 1)
  const coarse = order.length
  for (let i = 4; i < count; i += 8) push(i)
  for (let i = 2; i < count; i += 4) push(i)
  for (let i = 1; i < count; i += 2) push(i)
  return { order, coarse }
}

function decode(img: HTMLImageElement) {
  // Safari can reject decode() on large images; fall back to the load event.
  return img.decode().catch(
    () =>
      new Promise<void>((resolve, reject) => {
        if (img.complete && img.naturalWidth > 0) return resolve()
        img.onload = () => resolve()
        img.onerror = () => reject(new Error(img.src))
      }),
  )
}

function idle() {
  return new Promise<void>((resolve) => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(() => resolve(), { timeout: 500 })
    else setTimeout(resolve, 150)
  })
}

/**
 * Draws a frame sequence onto a canvas, cover-fitted, following a MotionValue.
 * Frames load progressively; until a frame arrives the nearest earlier loaded
 * one is shown, so forward scrubbing never jumps ahead of the water.
 */
export function useFrameScrubber({ enabled, count, url, frame, focalX = 0.5 }: Options) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [ready, setReady] = useState(false)
  const lastFrame = useRef(0)
  const drawRef = useRef<(() => void) | null>(null)

  useMotionValueEvent(frame, 'change', (v) => {
    lastFrame.current = v
    drawRef.current?.()
  })

  useEffect(() => {
    // The hydration render still reports the server snapshot, so re-check the
    // real preferences here before fetching anything.
    if (!enabled || prefersStatic()) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const images: (HTMLImageElement | null)[] = new Array(count).fill(null)
    const loaded = new Uint8Array(count)
    const inflight = new Set<HTMLImageElement>()
    let w = 0
    let h = 0
    let rafId: number | null = null
    let cancelled = false

    const nearestLoaded = (i: number) => {
      if (loaded[i]) return i
      for (let d = 1; d < count; d++) {
        if (i - d >= 0 && loaded[i - d]) return i - d
        if (i + d < count && loaded[i + d]) return i + d
      }
      return -1
    }

    const drawCover = (img: HTMLImageElement, alpha: number) => {
      const s = Math.max(w / img.naturalWidth, h / img.naturalHeight)
      const dw = img.naturalWidth * s
      const dh = img.naturalHeight * s
      ctx.globalAlpha = alpha
      ctx.drawImage(img, (w - dw) * focalX, (h - dh) / 2, dw, dh)
      ctx.globalAlpha = 1
    }

    const draw = () => {
      if (!w || !h) return
      const f = Math.min(Math.max(lastFrame.current, 0), count - 1)
      const i = Math.floor(f)
      const t = f - i
      const a = nearestLoaded(i)
      if (a < 0) return
      drawCover(images[a]!, 1)
      // Crossfade to the next frame only when both exact neighbours are in.
      if (t > 0.01 && a === i && i + 1 < count && loaded[i + 1]) drawCover(images[i + 1]!, t)
    }

    const scheduleDraw = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        draw()
      })
    }
    drawRef.current = draw

    const ro = new ResizeObserver(([entry]) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = entry.contentRect.width
      h = entry.contentRect.height
      // Resizing the backing store resets the context state, so restore it.
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingQuality = 'high'
      scheduleDraw()
    })
    ro.observe(canvas.parentElement ?? canvas)

    const load = async (i: number, low: boolean) => {
      const img = new Image()
      img.decoding = 'async'
      if (low && 'fetchPriority' in img) {
        ;(img as HTMLImageElement & { fetchPriority: string }).fetchPriority = 'low'
      }
      img.src = url(i)
      inflight.add(img)
      try {
        await decode(img)
        if (cancelled) return
        images[i] = img
        loaded[i] = 1
        scheduleDraw()
      } catch {
        // leave the slot empty; nearestLoaded() skips it
      } finally {
        inflight.delete(img)
      }
    }

    const pool = async (items: number[], size: number, low: boolean) => {
      let cursor = 0
      await Promise.all(
        Array.from({ length: Math.min(size, items.length) }, async () => {
          while (!cancelled && cursor < items.length) await load(items[cursor++], low)
        }),
      )
    }

    const { order, coarse } = loadOrder(count)
    const concurrency = window.matchMedia(DESKTOP_QUERY).matches ? 6 : 4
    ;(async () => {
      await pool(order.slice(0, coarse), concurrency, false)
      if (cancelled) return
      setReady(true)
      await idle()
      await pool(order.slice(coarse), concurrency, true)
    })()

    return () => {
      cancelled = true
      ro.disconnect()
      if (rafId !== null) cancelAnimationFrame(rafId)
      for (const img of inflight) img.src = ''
      drawRef.current = null
    }
  }, [enabled, count, url, focalX])

  return { canvasRef, ready }
}
