'use client'

import Image, { type StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { useViewportPrefs } from './useViewportPrefs'

type Props = {
  poster: StaticImageData
  src: string
  alt: string
  sizes: string
  /** The clip has a soundtrack worth hearing: show a sound toggle. */
  sound?: boolean
  soundLabels?: { on: string; off: string }
}

/** A short loop at the poster's aspect ratio. Plays muted, only while at
 *  least half in view; under reduced motion or Save-Data it stays on the
 *  poster with controls. With `sound`, a button turns the soundtrack on (and
 *  starts the clip, since the tap is a user gesture). No caption — the caller
 *  sets its own. */
export default function LoopClip({ poster, src, alt, sizes, sound = false, soundLabels }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { amount: 0.5 })
  const { static: isStatic } = useViewportPrefs()
  const [muted, setMuted] = useState(true)

  const toggleSound = () => {
    const video = ref.current
    if (!video) return
    video.muted = !muted
    setMuted(!muted)
    if (muted) video.play().catch(() => {})
  }

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (inView && !isStatic) video.play().catch(() => {})
    else video.pause()
  }, [inView, isStatic])

  return (
    <div
      className="relative overflow-hidden rounded-[4px] bg-line"
      style={{ aspectRatio: `${poster.width} / ${poster.height}` }}
    >
      {/* The optimised poster sits under a transparent video, so no
          unoptimised poster attribute is ever fetched. */}
      <Image src={poster} alt="" fill sizes={sizes} placeholder="blur" className="object-cover" />
      <video
        ref={ref}
        muted
        playsInline
        loop
        preload="none"
        controls={isStatic}
        aria-label={alt}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      {sound && !isStatic && soundLabels && (
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          className="absolute right-3 bottom-3 flex cursor-pointer items-center gap-2 rounded-full bg-forest-950/80 px-3.5 py-2 text-[13px] font-semibold text-cream backdrop-blur-sm hover:bg-forest-950"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-2">
            <path d="M4 9h4l5-4v14l-5-4H4z" strokeLinejoin="round" />
            {muted ? (
              <path d="M17 9l5 6M22 9l-5 6" strokeLinecap="round" />
            ) : (
              <path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" strokeLinecap="round" />
            )}
          </svg>
          {muted ? soundLabels.on : soundLabels.off}
        </button>
      )}
    </div>
  )
}
