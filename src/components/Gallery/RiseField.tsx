'use client'

import { useRef } from 'react'
import { useScroll } from 'motion/react'
import { useTranslations } from 'next-intl'
import { fieldItems } from '@/lib/gallery'
import ClipCard from './ClipCard'
import FootnoteCard from './FootnoteCard'
import ParallaxItem from './ParallaxItem'
import SignCard from './SignCard'
import StillCard from './StillCard'
import { useViewportPrefs } from './useViewportPrefs'

/** The day in order, scattered across a 12-column field. Every item drifts
 *  upward at its own speed as the section crosses the viewport. */
export default function RiseField() {
  const t = useTranslations('galleryPage.field')
  const { desktop } = useViewportPrefs()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <section ref={ref} className="relative bg-paper py-[12vh] lg:py-[16vh]">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-14">
        <div className="mb-10 text-[12px] font-bold tracking-[.14em] text-moss-500 uppercase lg:mb-16">
          {t('label')}
        </div>
        <div className="flex flex-col gap-16 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-6 lg:gap-y-[10vh]">
          {fieldItems.map((item) => (
            <ParallaxItem
              key={item.key}
              progress={scrollYProgress}
              delta={desktop ? item.layout.delta : item.layout.deltaMobile}
              className={`${item.layout.col} ${item.layout.offset ?? ''}`}
            >
              {item.kind === 'still' && (
                <StillCard
                  src={item.src}
                  alt={t(`items.${item.key}.alt`)}
                  caption={t(`items.${item.key}.caption`)}
                  sizes={item.layout.sizes}
                />
              )}
              {item.kind === 'clip' && (
                <ClipCard
                  poster={item.poster}
                  src={item.src}
                  alt={t('items.fall.alt')}
                  caption={t('items.fall.caption')}
                  sizes={item.layout.sizes}
                />
              )}
              {item.kind === 'sign' && (
                <SignCard
                  a={item.a}
                  b={item.b}
                  alt={t('items.sign.alt')}
                  caption={t('items.sign.caption')}
                  sizes={item.layout.sizes}
                />
              )}
              {item.kind === 'footnote' && <FootnoteCard />}
            </ParallaxItem>
          ))}
        </div>
      </div>
    </section>
  )
}
