import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { site, whatsAppLink } from '@/lib/content'
import { addDays, formatDay } from '@/lib/dates'
import TimelineDialog from './TimelineDialog'
import { weekendBookingMessage, type WeekendProgramme as Programme } from '@/lib/treks'

const portraitSizes = '(min-width:1440px) 314px, (min-width:1024px) 24vw, 64vw'
const landscapeSizes = '(min-width:1440px) 652px, (min-width:1024px) 48vw, 86vw'

/** On desktop every tile takes one row height — a portrait column's 3:4 —
 *  worked out from the grid's own width (container units), so a landscape
 *  tile spanning two columns lines up with the portraits beside it at any
 *  viewport. On phones tiles keep their natural shape and sit top-aligned. */
const tileHeight = 'lg:h-[calc((100cqw_-_72px)/4*4/3)]'

function Photo({ photo }: { photo: Programme['photos'][number] }) {
  const landscape = photo.src.width > photo.src.height
  return (
    <li
      className={`relative flex-none snap-start overflow-hidden rounded-[4px] bg-line lg:w-auto ${tileHeight} ${
        landscape ? 'w-[86vw] lg:col-span-2' : 'w-[64vw]'
      }`}
    >
      <figure className="m-0 h-full">
        <Image
          src={photo.src}
          alt={photo.alt}
          sizes={landscape ? landscapeSizes : portraitSizes}
          placeholder="blur"
          className="h-auto w-full lg:h-full lg:object-cover"
        />
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(12,42,23,0)_0%,rgba(12,42,23,.72)_100%)] px-3 pt-8 pb-2.5 text-[12px] font-semibold tracking-[.04em] text-cream lg:px-4 lg:pb-3 lg:text-[13px]">
          {photo.caption}
        </figcaption>
      </figure>
    </li>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[.14em] text-moss-500 uppercase lg:text-[12px]">{children}</div>
}

/** The programme running now — 2D/1N by train. Header with the batch and the
 *  timeline button; photos from the last batch (swipe on phones, a four-column
 *  wall on desktop); then the plan beside the price, inclusions and booking
 *  terms, with WhatsApp as the single call to action. */
export default function WeekendProgramme({ programme: p }: { programme: Programme }) {
  const t = useTranslations('treksPage.weekend')
  // The plan is dated for the first batch; the dialog re-dates it per batch.
  const batch = p.timeline.batches[0]
  const bookingHref = whatsAppLink(weekendBookingMessage(p, batch))

  return (
    <section id="weekend" className="scroll-mt-4 border-b border-line bg-cream">
      <div className="mx-auto max-w-[1440px] px-5 pt-5 pb-8 lg:px-14 lg:pt-[72px] lg:pb-20">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-10">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-[.14em] text-ember-600 uppercase lg:gap-2 lg:text-[13px] lg:tracking-[.16em]">
              <span aria-hidden className="block size-1.5 rounded-full bg-ember-600 lg:size-2" />
              <span className="lg:hidden">{t('eyebrowMobile')}</span>
              <span className="hidden lg:inline">{t('eyebrow')}</span>
            </div>
            <h2 className="m-0 mt-1.5 font-serif text-[26px] leading-[1.1] font-normal text-forest-950 lg:mt-3 lg:text-[44px]">
              {p.title}
            </h2>
            {/* Phones: one meta line. Desktop: two. */}
            <p className="mt-1.5 mb-0 text-[14px] text-ink-soft lg:hidden">
              <span className="font-semibold text-ink">{p.dur}</span> · {p.kind}
            </p>
            <p className="mt-2 mb-0 hidden text-[17px] text-ink-soft lg:block">{p.kind}</p>
            <p className="mt-2 mb-0 hidden text-[17px] font-semibold text-ink lg:block">{p.dur}</p>
          </div>

          <div className="mt-3 lg:mt-0 lg:flex-none">
            <TimelineDialog programme={p} />
          </div>
        </div>

        {/* Photos from the last batch */}
        <div className="mt-7 lg:mt-12">
          <div className="lg:flex lg:items-baseline lg:justify-between lg:gap-10">
            <h3 className="m-0 font-serif text-[22px] leading-[1.15] font-normal text-forest-950 lg:text-[28px]">
              {t('photosHeading', { from: p.photosFrom })}
            </h3>
            <p className="mt-1 mb-0 text-[14px] text-ink-soft lg:mt-0 lg:text-[16px]">{t('photosSub')}</p>
          </div>
          <ul
            aria-label={t('photosLabel')}
            className="@container -mx-5 mt-3 flex snap-x snap-mandatory items-start gap-3 overflow-x-auto px-5 pb-2 [-webkit-overflow-scrolling:touch] lg:mx-0 lg:mt-6 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {p.photos.map((photo) => (
              <Photo key={photo.src.src} photo={photo} />
            ))}
          </ul>
        </div>

        {/* The plan beside the facts */}
        <div className="mt-8 grid gap-8 lg:mt-16 lg:grid-cols-[1fr_440px] lg:gap-14">
          <div>
            <Label>{t('planLabel')}</Label>
            <ol className="mt-3 border-b border-line">
              {p.timeline.blocks.map((block) => (
                <li
                  key={`${block.day}-${block.title}`}
                  className="grid grid-cols-[96px_1fr] gap-x-4 border-t border-line py-3.5 lg:grid-cols-[150px_1fr] lg:gap-x-6 lg:py-[18px]"
                >
                  <span className="text-[14px] leading-[1.4] font-semibold text-ink lg:text-[16px]">
                    {formatDay(addDays(batch.day1, block.day - 1))}
                    {block.label && <span className="block font-normal text-moss-500">{block.label}</span>}
                  </span>
                  <span>
                    <span className="block font-serif text-[19px] leading-[1.2] text-forest-950 lg:text-[23px]">
                      {block.title}
                    </span>
                    <span className="mt-1 block text-[14px] leading-[1.5] text-ink-soft lg:text-[16px]">
                      {block.summary}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="rounded-[4px] border border-line bg-cream-hover p-5 lg:p-7">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-[38px] leading-none text-forest-950 lg:text-[46px]">{p.price}</span>
              <span className="text-[14px] text-ink-soft lg:text-[15px]">{p.priceNote}</span>
            </div>
            <ul className="mt-4 flex flex-col gap-1.5 text-[15px] leading-[1.45] text-ink">
              {p.included.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden className="w-4 flex-none font-bold text-forest-800">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
              {p.notIncluded.map((item) => (
                <li key={item} className="flex gap-2.5 text-ink-soft">
                  <span aria-hidden className="w-4 flex-none font-bold text-ember-800">
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 mb-0 text-[13px] leading-[1.5] text-ink-soft lg:text-[14px]">{p.mealsNote}</p>

            <div className="mt-5 border-t border-line pt-4">
              <Label>{t('difficultyLabel')}</Label>
              <p className="mt-1 mb-0 text-[15px] leading-[1.5] text-ink">{p.difficulty}</p>
            </div>
            <div className="mt-4">
              <Label>{t('bookingLabel')}</Label>
              <ul className="mt-1 flex flex-col gap-1 text-[15px] leading-[1.5] text-ink">
                {p.booking.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>

            <a
              href={bookingHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block rounded-[3px] bg-ember-600 px-5 py-[14px] text-center text-[16px] font-semibold whitespace-nowrap hover:bg-ember-800 lg:py-[15px] lg:text-[17px]"
            >
              {/* Colour on the span: the global `a { color }` rule outranks utilities on the anchor. */}
              <span className="text-cream">{t('whatsAppCta', { keyword: p.whatsAppKeyword })}</span>
            </a>
            <p className="mt-3 mb-0 text-[13px] leading-[1.5] text-ink-soft lg:text-[14px]">
              {t('whatsAppHelp', { phone: site.phoneDisplay })}
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
