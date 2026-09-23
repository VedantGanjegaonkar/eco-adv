'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { easeOut, motion, transform, useScroll, useSpring, useTransform } from 'motion/react'
import { useTranslations } from 'next-intl'
import { naneghat } from '@/lib/gallery'
import { naneghatFrames } from '@/lib/gallery-frames'
import { useFrameScrubber } from './useFrameScrubber'
import { DESKTOP_QUERY, useViewportPrefs } from './useViewportPrefs'

// The lg/sm set is chosen once, when the loader first runs — not from React
// state — so the hydration render and the effect can never disagree.
const stickerFade = transform([0, 0.08], [1, 0])

function frameUrl(i: number) {
  return (window.matchMedia(DESKTOP_QUERY).matches ? naneghatFrames.lg : naneghatFrames.sm)(i)
}

/**
 * 400vh pinned hero. Scrolling scrubs the reverse-waterfall clip frame by
 * frame — scroll down, the water goes up. The clip is portrait: on phones it
 * fills the screen; on desktop (and phones held sideways) it stands as a tall
 * pane beside the headline — the `wide:` variant in globals.css.
 * Under reduced motion or Save-Data it collapses to a single viewport with
 * the poster and a play button.
 */
export default function ScrubHero() {
  const t = useTranslations('galleryPage.hero')
  const { static: isStatic } = useViewportPrefs()
  const [showVideo, setShowVideo] = useState(false)
  const wrapperRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4, restDelta: 0.0005 })
  const frame = useTransform(smooth, (v) => v * (naneghatFrames.count - 1))
  const upY = useTransform(smooth, [0, 0.35], ['100vh', '0vh'], { ease: easeOut })
  const upOpacity = useTransform(smooth, [0, 0.04, 0.35], [0, 1, 1])
  // Function form on purpose: the array form lets motion hand scroll-linked
  // values to a native ViewTimeline, which misfires inside a sticky element.
  const stickerOpacity = useTransform(() => stickerFade(scrollYProgress.get()))

  const { canvasRef, ready } = useFrameScrubber({
    enabled: !isStatic,
    count: naneghatFrames.count,
    url: frameUrl,
    frame,
  })

  return (
    <section
      ref={wrapperRef}
      className={isStatic ? 'relative bg-forest-950' : 'relative h-[400vh] bg-forest-950'}
    >
      <div className={`${isStatic ? 'relative' : 'sticky top-0'} h-dvh overflow-hidden`}>
        <div className="relative mx-auto h-full max-w-[1440px] wide:px-14">
          {/* Media pane — full-bleed on phones, a 9:16 pane on the right on desktop. */}
          <div className="absolute inset-0 wide:inset-auto wide:top-[6vh] wide:right-14 wide:aspect-[9/16] wide:h-[min(88vh,62vw)]">
            <div className="absolute inset-0 wide:overflow-hidden wide:rounded-[4px] wide:bg-forest-900">
            {/* Poster: the LCP, never removed — the canvas fades in over it. */}
            <Image
              src={naneghat.posters.wave}
              alt={t('posterAlt')}
              fill
              sizes="(min-width:1024px) 50vh, (orientation:landscape) and (max-height:520px) 50vh, 100vw"
              loading="eager"
              fetchPriority="high"
              placeholder="blur"
              className="object-cover"
            />

            {!isStatic && (
              <canvas
                ref={canvasRef}
                aria-hidden
                className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
                  ready ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}

            {isStatic && showVideo && (
              <video
                controls
                autoPlay
                muted
                playsInline
                src={naneghat.videos.wave}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,42,23,0)_45%,rgba(12,42,23,.9)_100%)] wide:opacity-60"
            />
            </div>

            {/* Sticker: tells people the clip is theirs to scrub. Sits over the
                sky on phones, hangs off the pane's corner on desktop; gone by 8%. */}
            {!isStatic && (
              <motion.div
                aria-hidden
                initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: -6 }}
                transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ opacity: stickerOpacity }}
                className="pointer-events-none absolute top-[12vh] left-5 flex items-center gap-2 rounded-full bg-sand-300 whitespace-nowrap py-2.5 pr-5 pl-4 text-[14px] font-semibold text-forest-950 shadow-[0_8px_24px_rgba(12,42,23,.45)] wide:-top-4 wide:-left-10 wide:text-[15px]"
              >
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-[18px] leading-none"
                >
                  ↓
                </motion.span>
                <span>{t('scrollSticker')}</span>
              </motion.div>
            )}
          </div>
          <p className="sr-only">{t('clipDescription')}</p>

          {/* Type — over the pane's foot on phones, beside it on desktop. */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end px-5 pb-[150px] wide:static wide:h-full wide:max-w-[56%] wide:justify-center wide:px-0 wide:pb-0">
            <div className="text-[13px] tracking-[.16em] text-sand-300 uppercase">
              <span className="wide:hidden">{t('eyebrowMobile')}</span>
              <span className="hidden wide:inline">{t('eyebrow')}</span>
            </div>
            <h1 className="m-0 mt-3 font-serif text-[clamp(56px,13vw,96px)] leading-[.95] font-normal text-cream wide:mt-4 wide:text-[clamp(72px,8.5vw,140px)]">
              <span className="block">{t('headA')}</span>
              <motion.span
                className="block will-change-transform"
                style={{ y: isStatic ? 0 : upY, opacity: isStatic ? 1 : upOpacity }}
              >
                {t('headB')}
              </motion.span>
            </h1>
            <p className="mt-4 max-w-[480px] text-[17px] leading-[1.55] text-moss-200 wide:mt-6 wide:text-[20px] wide:leading-[1.6]">
              {t('sub')}
            </p>
            {isStatic && !showVideo && (
              <button
                type="button"
                onClick={() => setShowVideo(true)}
                className="pointer-events-auto mt-6 inline-block w-fit cursor-pointer rounded-[3px] border border-moss-400 bg-transparent px-5 py-3 text-[16px] font-semibold text-cream hover:bg-forest-900"
              >
                {t('playClip')}
              </button>
            )}
          </div>

        </div>

        {!isStatic && (
          /* Progress, inverted: fills bottom → top as the water rises. */
          <div
            aria-hidden
            className="absolute top-1/2 right-8 hidden h-[40vh] w-px -translate-y-1/2 bg-line/25 wide:block"
          >
            <motion.span className="absolute inset-0 origin-bottom bg-cream" style={{ scaleY: smooth }} />
          </div>
        )}
      </div>
    </section>
  )
}
