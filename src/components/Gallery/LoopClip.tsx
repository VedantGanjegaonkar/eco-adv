'use client'

import Image, { type StaticImageData } from 'next/image'
import { useEffect, useRef } from 'react'
import { useInView } from 'motion/react'
import { useViewportPrefs } from './useViewportPrefs'

type Props = { poster: StaticImageData; src: string; alt: string; sizes: string }

/** A short muted loop at the poster's aspect ratio. Plays only while at least
 *  half in view; under reduced motion or Save-Data it stays on the poster
 *  with controls. No caption — the caller sets its own. */
export default function LoopClip({ poster, src, alt, sizes }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { amount: 0.5 })
  const { static: isStatic } = useViewportPrefs()

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
    </div>
  )
}
