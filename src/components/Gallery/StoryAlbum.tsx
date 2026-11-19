import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { StoryAlbum as StoryAlbumData, StoryLayout, StoryMedia } from '@/lib/albums'
import { addDays, formatDay } from '@/lib/dates'
import { sahyadri } from '@/lib/treks'
import GalleryMotionProvider from './GalleryMotionProvider'
import LoopClip from './LoopClip'

/** `sizes` from the item's desktop span: 1440 − 2×56 px gutters = 1328 px of grid. */
function sizesFor(layout: StoryLayout, share = 1) {
  if (layout.sizes) return layout.sizes
  const span = Number(layout.col.match(/lg:col-span-(\d+)/)?.[1] ?? 12)
  const desk = (span / 12) * share
  return `(min-width:1440px) ${Math.round(1328 * desk)}px, (min-width:1024px) ${Math.round(100 * desk)}vw, ${
    layout.half ? 50 : 100
  }vw`
}

function Caption({ time, caption }: { time?: string; caption: string }) {
  return (
    <figcaption className="mt-2 flex gap-2.5 text-[13px] leading-[1.4] lg:mt-3 lg:text-[14px]">
      {time && <span className="flex-none font-semibold text-ember-800 tabular-nums">{time}</span>}
      <span className="text-ink-soft">{caption}</span>
    </figcaption>
  )
}

function Media({ item, t }: { item: StoryMedia; t: (key: 'soundOn' | 'soundOff') => string }) {
  const place = `${item.layout.half ? 'col-span-1' : 'col-span-2'} ${item.layout.col}`

  if (item.kind === 'note') {
    return (
      <blockquote className={`m-0 border-l-2 border-ember-600 pl-5 lg:pl-8 ${place}`}>
        <p className="m-0 font-serif text-[28px] leading-[1.12] text-forest-950 lg:text-[48px] lg:leading-[1.08]">
          {item.text}
        </p>
        {item.tag && (
          <p className="mt-3 mb-0 text-[15px] font-semibold tracking-[.02em] text-ember-600 lg:mt-5 lg:text-[18px]">
            {item.tag}
          </p>
        )}
      </blockquote>
    )
  }

  if (item.kind === 'photo') {
    return (
      <figure className={`m-0 ${place}`}>
        <Image
          src={item.src}
          alt={item.alt}
          sizes={sizesFor(item.layout)}
          placeholder="blur"
          className="h-auto w-full rounded-[4px] bg-line"
        />
        <Caption time={item.time} caption={item.caption} />
      </figure>
    )
  }

  if (item.kind === 'clip') {
    return (
      <figure className={`m-0 ${place}`}>
        <LoopClip
          poster={item.poster}
          src={item.src}
          alt={item.alt}
          sizes={sizesFor(item.layout)}
          sound={item.sound}
          soundLabels={{ on: t('soundOn'), off: t('soundOff') }}
        />
        <Caption time={item.time} caption={item.caption} />
      </figure>
    )
  }

  // A numbered strip of one moment — three-up on every screen.
  return (
    <figure className={`m-0 ${place}`}>
      <ol className="grid grid-cols-3 gap-2 lg:gap-6">
        {item.frames.map((frame, i) => (
          <li key={frame.label} className="relative aspect-[3/4] overflow-hidden rounded-[4px] bg-line">
            <Image
              src={frame.src}
              alt={frame.alt}
              fill
              placeholder="blur"
              sizes={sizesFor(item.layout, 1 / item.frames.length).replace(/100vw$/, '33vw')}
              className="object-cover"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(12,42,23,0)_0%,rgba(12,42,23,.78)_100%)] px-2 pt-8 pb-2 text-cream lg:px-4 lg:pt-12 lg:pb-4">
              <span className="block font-serif text-[18px] leading-none lg:text-[34px]">{i + 1}</span>
              <span className="mt-1 block text-[11px] leading-[1.25] font-semibold tracking-[.04em] lg:mt-1.5 lg:text-[14px]">
                {frame.label}
              </span>
            </span>
          </li>
        ))}
      </ol>
      <Caption time={item.time} caption={item.caption} />
    </figure>
  )
}

/** One batch, told in order: a hero with the batch's dates, a contents strip,
 *  then a chapter per part of the trip — day and time of day, a title, a line,
 *  and the photos and clips laid out on a 12-column grid (stacked on phones).
 *  The programme still runs, so it closes on the next batch, not on a plan. */
export default function StoryAlbum({ album }: { album: StoryAlbumData }) {
  const t = useTranslations('storyAlbum')
  const weekend = sahyadri.weekend
  const next = weekend.timeline.batches.find((b) => b.day1 > album.day1)

  return (
    <GalleryMotionProvider>
      {/* Hero — the photo full-bleed on phones, a tall pane on the right on desktop. */}
      <section className="bg-forest-950">
        <div className="mx-auto max-w-[1440px] lg:grid lg:grid-cols-[1fr_minmax(0,560px)] lg:items-center lg:gap-14 lg:px-14 lg:py-14">
          <div className="relative aspect-[4/5] max-h-[78svh] w-full lg:order-last lg:aspect-[3/4] lg:max-h-none">
            <Image
              src={album.cover}
              alt={album.coverAlt}
              fill
              priority
              placeholder="blur"
              sizes="(min-width:1440px) 560px, (min-width:1024px) 40vw, 100vw"
              className="object-cover object-[50%_40%] lg:rounded-[4px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,42,23,.5)_0%,rgba(12,42,23,0)_22%,rgba(12,42,23,0)_70%,rgba(12,42,23,1)_100%)] lg:hidden"
            />
            <Link
              href="/gallery"
              className="group absolute top-4 left-5 text-[12px] font-semibold tracking-[.12em] uppercase [text-shadow:0_1px_8px_rgba(12,42,23,.6)] lg:hidden"
            >
              {/* Colour on the span: the global `a { color }` rule outranks utilities on the anchor itself. */}
              <span className="text-cream group-hover:text-sand-300">← {t('back')}</span>
            </Link>
          </div>

          <div className="relative -mt-16 px-5 pb-10 lg:mt-0 lg:px-0 lg:pb-0">
            <Link
              href="/gallery"
              className="group hidden text-[13px] font-semibold tracking-[.12em] uppercase lg:inline-block"
            >
              <span className="text-moss-300 group-hover:text-sand-300">← {t('back')}</span>
            </Link>
            <div className="text-[12px] tracking-[.14em] text-sand-300 uppercase lg:mt-10 lg:text-[13px] lg:tracking-[.16em]">
              {album.batchLine}
            </div>
            <h1 className="m-0 mt-2 font-serif text-[36px] leading-[1.04] font-normal text-cream lg:mt-4 lg:text-[72px] lg:leading-[1.0]">
              {album.title}
            </h1>
            <p className="mt-3 mb-0 max-w-[560px] text-[16px] leading-[1.55] text-moss-200 lg:mt-6 lg:text-[19px]">
              {album.summary}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2 lg:mt-8">
              {album.facts.map((fact) => (
                <li
                  key={fact}
                  className="rounded-full border border-forest-850 px-3 py-1 text-[13px] text-moss-300 lg:text-[14px]"
                >
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contents — the chapters as anchors, a swipe row on phones. */}
      <nav aria-label={t('contents')} className="border-b border-line bg-cream">
        <ol className="mx-auto flex max-w-[1440px] snap-x scroll-px-5 gap-6 overflow-x-auto px-5 py-4 lg:grid lg:auto-cols-fr lg:grid-flow-col lg:gap-6 lg:overflow-visible lg:px-14 lg:py-6">
          {album.chapters.map((chapter, i) => (
            <li key={chapter.title} className="flex-none snap-start lg:flex-auto">
              <a href={`#chapter-${i + 1}`} className="group block">
                <span className="block text-[11px] tracking-[.14em] text-moss-500 uppercase">
                  {String(i + 1).padStart(2, '0')} · {chapter.when.split(' · ')[0]}
                </span>
                <span className="mt-0.5 block font-serif text-[16px] leading-[1.25] text-forest-950 group-hover:text-ember-800 lg:text-[18px]">
                  {chapter.title}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {album.chapters.map((chapter, i) => (
        <section
          key={chapter.title}
          id={`chapter-${i + 1}`}
          className="scroll-mt-4 border-b border-line bg-cream even:bg-paper"
        >
          <div className="mx-auto max-w-[1440px] px-5 py-10 lg:px-14 lg:py-20">
            <header className="grid grid-cols-[auto_1fr] gap-x-4 lg:grid-cols-12 lg:gap-x-6">
              <span className="font-serif text-[40px] leading-[.9] text-sand-500 lg:col-span-1 lg:text-[64px]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="lg:col-span-8">
                <div className="text-[12px] tracking-[.14em] text-moss-500 uppercase lg:text-[13px]">{chapter.when}</div>
                <h2 className="m-0 mt-1 font-serif text-[26px] leading-[1.12] font-normal text-forest-950 lg:mt-2 lg:text-[42px]">
                  {chapter.title}
                </h2>
                <p className="mt-2 mb-0 max-w-[640px] text-[15px] leading-[1.55] text-ink-soft lg:mt-3 lg:text-[17px]">
                  {chapter.line}
                </p>
              </div>
            </header>

            {chapter.sides ? (
              // Labelled sides of the same chapter, each with its own small grid.
              <div className="mt-6 grid gap-y-10 lg:mt-12 lg:grid-cols-12 lg:gap-x-6">
                {chapter.sides.map((side, n) => (
                  <div key={side.title} className={side.col}>
                    <div className="flex items-baseline gap-3 border-t border-line-strong pt-4 lg:pt-5">
                      <span className="font-serif text-[22px] leading-none text-ember-600 lg:text-[28px]">{n + 1}</span>
                      <div>
                        <div className="text-[11px] tracking-[.14em] text-moss-500 uppercase lg:text-[12px]">
                          {side.eyebrow}
                        </div>
                        <h3 className="m-0 mt-0.5 font-serif text-[22px] leading-[1.15] font-normal text-forest-950 lg:text-[28px]">
                          {side.title}
                        </h3>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 lg:mt-6 lg:gap-x-6">
                      {side.media.map((item) => (
                        <Media key={'caption' in item ? item.caption : item.text} item={item} t={t} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 lg:mt-12 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-10">
                {chapter.media.map((item) => (
                  <Media key={'caption' in item ? item.caption : item.text} item={item} t={t} />
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Close — the same weekend runs again. */}
      <section className="bg-forest-950">
        <div className="mx-auto max-w-[1440px] px-5 py-14 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:px-14 lg:py-24">
          <div>
            <div className="text-[13px] tracking-[.16em] text-sand-300 uppercase">
              {next
                ? t('nextEyebrow', {
                    from: formatDay(addDays(next.day1, 0)),
                    to: formatDay(addDays(next.day1, 1)),
                  })
                : t('againEyebrow')}
            </div>
            <h2 className="m-0 mt-3 font-serif text-[32px] leading-[1.08] font-normal text-cream lg:text-[56px]">
              {weekend.title}
            </h2>
            <p className="mt-2 mb-0 max-w-[640px] text-[16px] leading-[1.5] text-moss-300 lg:text-[18px]">
              {weekend.dur} · {weekend.price} {weekend.priceNote}
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-4 lg:mt-0 lg:flex-none lg:items-end">
            <Link
              href={`/treks/${sahyadri.slug}`}
              className="block rounded-[3px] bg-ember-600 px-5 py-[15px] text-center text-[17px] font-semibold whitespace-nowrap hover:bg-ember-800 lg:inline-block lg:px-[38px] lg:py-[17px]"
            >
              {/* Colour on the span: the global `a { color }` rule outranks utilities on the anchor. */}
              <span className="text-cream">{t('nextCta')}</span>
            </Link>
            <Link href="/gallery" className="group text-center text-[15px] font-semibold">
              <span className="text-moss-300 group-hover:text-sand-300">← {t('allAlbums')}</span>
            </Link>
          </div>
        </div>
      </section>
    </GalleryMotionProvider>
  )
}
