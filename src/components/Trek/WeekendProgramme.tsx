import { useTranslations } from 'next-intl'
import { site, whatsAppLink } from '@/lib/content'
import { addDays, formatDay } from '@/lib/dates'
import TimelineDialog from './TimelineDialog'
import BatchPhotos from './BatchPhotos'
import { weekendBookingMessage, type WeekendProgramme as Programme } from '@/lib/treks'

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[.14em] text-moss-500 uppercase lg:text-[12px]">{children}</div>
}

/** A short list under a label — good to know, what to pack. */
function Notes({ label, lines }: { label: string; lines: string[] }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-3 text-[16px] leading-[1.5] text-ink">
        <Lines lines={lines} />
      </div>
    </div>
  )
}

/** Phones fold the reference lists — inclusions, difficulty, notes, booking —
 *  into quiet rows that open on tap, so the page reads plan → details → price. */
function Disclosure({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-[18px] [&::-webkit-details-marker]:hidden">
        <span className="font-serif text-[19px] leading-[1.2] text-forest-950">{title}</span>
        <span
          aria-hidden
          className="text-[24px] leading-none font-light text-moss-500 transition-transform duration-200 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="pb-5 text-[15px] leading-[1.55] text-ink">{children}</div>
    </details>
  )
}

function Inclusions({ p }: { p: Programme }) {
  return (
    <ul className="flex flex-col gap-1.5 text-[15px] leading-[1.45] text-ink">
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
  )
}

function Lines({ lines }: { lines: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {lines.map((line) => (
        <li key={line} className="flex gap-2.5">
          <span aria-hidden className="w-4 flex-none text-moss-500">
            –
          </span>
          {line}
        </li>
      ))}
    </ul>
  )
}

/** The programme running now — 2D/1N by train. Header with the batch and the
 *  timeline button; photos from the last batch (swipe on phones, a four-column
 *  wall on desktop); then the plan — with good-to-know and packing notes under
 *  it — beside the price, inclusions and booking terms, with WhatsApp as the
 *  single call to action. Phones get a calmer read of the same content: one
 *  meta line and a row of facts in the header, the plan as a single column,
 *  the reference lists folded into tap-to-open rows, and the price card last. */
export default function WeekendProgramme({ programme: p }: { programme: Programme }) {
  const t = useTranslations('treksPage.weekend')
  // The plan is dated for the first batch; the dialog re-dates it per batch.
  const batch = p.timeline.batches[0]
  const bookingHref = whatsAppLink(weekendBookingMessage(p, batch))
  const goodToKnow = p.goodToKnow ?? []
  const packing = p.packing ?? []

  return (
    <section id="weekend" className="scroll-mt-4 border-b border-line bg-cream">
      <div className="mx-auto max-w-[1440px] px-5 pt-9 pb-12 lg:px-14 lg:pt-[72px] lg:pb-20">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-10">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-[.2em] text-ember-600 uppercase lg:text-[13px] lg:tracking-[.16em]">
              <span aria-hidden className="block size-1.5 rounded-full bg-ember-600 lg:size-2" />
              <span className="lg:hidden">{t('eyebrowMobile')}</span>
              <span className="hidden lg:inline">{t('eyebrow')}</span>
            </div>
            <h2 className="m-0 mt-3 font-serif text-[30px] leading-[1.08] font-normal tracking-[-.01em] text-forest-950 lg:mt-3 lg:text-[44px] lg:tracking-normal">
              {p.title}
            </h2>
            {/* Phones: one short meta line. Desktop: two. */}
            <p className="mt-2.5 mb-0 text-[14px] text-ink-soft lg:hidden">
              {p.dur} · {p.kindShort ?? p.kind}
            </p>
            <p className="mt-2 mb-0 hidden text-[17px] text-ink-soft lg:block">{p.kind}</p>
            <p className="mt-2 mb-0 hidden text-[17px] font-semibold text-ink lg:block">{p.dur}</p>
          </div>

          <div className="mt-7 lg:mt-0 lg:flex-none">
            <TimelineDialog programme={p} />
          </div>
        </div>

        {/* Photos from the last batch */}
        <div className="mt-12 lg:mt-12">
          <div className="lg:flex lg:items-baseline lg:justify-between lg:gap-10">
            <h3 className="m-0 font-serif text-[20px] leading-[1.15] font-normal text-forest-950 lg:text-[28px]">
              {t('photosHeading', { from: p.photosFrom })}
            </h3>
            <p className="mt-1 mb-0 hidden text-[16px] text-ink-soft lg:mt-0 lg:block">{t('photosSub')}</p>
          </div>
          <BatchPhotos photos={p.photos} label={t('photosLabel')} />
        </div>

        {/* The plan beside the facts */}
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[1fr_440px] lg:gap-14">
          <div>
            <Label>{t('planLabel')}</Label>
            <ol className="mt-4 border-b border-line lg:mt-3">
              {p.timeline.blocks.map((block) => (
                <li
                  key={`${block.day}-${block.title}`}
                  className="grid gap-y-1.5 border-t border-line py-5 lg:grid-cols-[150px_1fr] lg:gap-x-6 lg:gap-y-0 lg:py-[18px]"
                >
                  {/* Phones: a small label over the title. Desktop: a date column. */}
                  <span className="text-[10px] leading-[1.4] font-semibold tracking-[.16em] text-moss-500 uppercase lg:text-[16px] lg:tracking-normal lg:text-ink lg:normal-case">
                    {formatDay(addDays(batch.day1, block.day - 1))}
                    {block.label && (
                      <span className="font-normal lg:block lg:text-moss-500">
                        <span className="lg:hidden"> · </span>
                        {block.label}
                      </span>
                    )}
                  </span>
                  <span>
                    <span className="block font-serif text-[21px] leading-[1.2] text-forest-950 lg:text-[23px]">
                      {block.title}
                    </span>
                    <span className="mt-1 block text-[14px] leading-[1.5] text-ink-soft lg:text-[16px]">
                      {block.summary}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            {(goodToKnow.length > 0 || packing.length > 0) && (
              <div className="mt-12 hidden gap-10 lg:grid lg:grid-cols-2">
                {goodToKnow.length > 0 && <Notes label={t('goodToKnowLabel')} lines={goodToKnow} />}
                {packing.length > 0 && <Notes label={t('packingLabel')} lines={packing} />}
              </div>
            )}
          </div>

          {/* Phones: the reference lists, folded, between the plan and the price */}
          <div className="border-t border-line lg:hidden">
            <Disclosure title={t('includedLabel')}>
              <Inclusions p={p} />
              <p className="mt-3 mb-0 text-[13px] leading-[1.5] text-ink-soft">{p.mealsNote}</p>
            </Disclosure>
            <Disclosure title={t('difficultyLabel')}>
              <p className="m-0">{p.difficulty}</p>
            </Disclosure>
            {goodToKnow.length > 0 && (
              <Disclosure title={t('goodToKnowLabel')}>
                <Lines lines={goodToKnow} />
              </Disclosure>
            )}
            {packing.length > 0 && (
              <Disclosure title={t('packingLabel')}>
                <Lines lines={packing} />
              </Disclosure>
            )}
            <Disclosure title={t('bookingLabel')}>
              <Lines lines={p.booking} />
            </Disclosure>
          </div>

          <aside className="rounded-[4px] border border-line bg-cream-hover px-5 pt-6 pb-5 lg:p-7">
            <div className="lg:flex lg:items-baseline lg:gap-3">
              <span className="block font-serif text-[40px] leading-none text-forest-950 lg:text-[46px]">{p.price}</span>
              <span className="mt-2 block text-[14px] text-ink-soft lg:mt-0 lg:text-[15px]">{p.priceNote}</span>
            </div>
            <p className="mt-1 mb-0 text-[14px] text-ink-soft lg:hidden">{p.advance}</p>

            <div className="hidden lg:block">
              <div className="mt-4">
                <Inclusions p={p} />
              </div>
              <p className="mt-3 mb-0 text-[14px] leading-[1.5] text-ink-soft">{p.mealsNote}</p>

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
            </div>

            <a
              href={bookingHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block rounded-[3px] bg-ember-600 px-5 py-[14px] text-center text-[16px] font-semibold whitespace-nowrap hover:bg-ember-800 lg:mt-5 lg:py-[15px] lg:text-[17px]"
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
