'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { whatsAppLink } from '@/lib/content'
import { addDays, formatDay, formatRange, monthShort } from '@/lib/dates'
import type { Batch, WeekendProgramme } from '@/lib/treks'

const chip =
  'flex-none cursor-pointer rounded-full border px-2.5 py-1.5 text-[13px] font-semibold whitespace-nowrap transition-colors lg:px-3 lg:text-[14px]'
const chipIdle = `${chip} border-moss-150 bg-cream text-forest-800 hover:border-forest-800`
const chipOn = `${chip} border-forest-800 bg-forest-800 text-cream`

/** “B1 · 2–3 Oct” — or, on phones when every batch shares a month, “B1 · 2–3”
 *  with the month carried once by the row label, so four chips fit one row. */
function ChipText({ batch: b, short }: { batch: Batch; short: boolean }) {
  const from = addDays(b.day1, 0)
  const to = addDays(b.day1, 1)
  const full = `${b.id} · ${formatRange(from, to)}`
  if (!short) return <>{full}</>
  return (
    <>
      <span className="lg:hidden">
        {b.id} · {from.getUTCDate()}–{to.getUTCDate()}
      </span>
      <span className="hidden lg:inline">{full}</span>
    </>
  )
}

/** Batch chips, the “Detailed timeline” button and the native <dialog> it
 *  opens. Picking a batch re-dates every day block; the dialog handles Escape
 *  and focus itself and clicking the backdrop closes it too. The button is
 *  solid on phones (it leads there) and outlined on desktop. */
export default function TimelineDialog({ programme: p }: { programme: WeekendProgramme }) {
  const t = useTranslations('treksPage.timeline')
  const ref = useRef<HTMLDialogElement>(null)
  const headingId = useId()
  const { timeline } = p
  const [batchIndex, setBatchIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const batch = timeline.batches[batchIndex]

  // Lock page scroll while the dialog is up (native <dialog> does not).
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const open = (index = batchIndex) => {
    setBatchIndex(index)
    setIsOpen(true)
    ref.current?.showModal()
  }
  const close = () => ref.current?.close()

  const days = timeline.blocks.map((b) => b.day)
  const departs = formatDay(addDays(batch.day1, Math.min(...days) - 1))
  const back = formatDay(addDays(batch.day1, Math.max(...days) - 1))

  const firstMonth = monthShort(addDays(timeline.batches[0].day1, 0))
  const sameMonth = timeline.batches.every(
    (b) => monthShort(addDays(b.day1, 0)) === firstMonth && monthShort(addDays(b.day1, 1)) === firstMonth,
  )
  const monthTag = sameMonth ? <span className="lg:hidden"> · {firstMonth}</span> : null

  return (
    <div className="lg:text-right">
      <div className="text-[11px] tracking-[.14em] text-moss-500 uppercase lg:text-[12px]">
        {t('batchesLabel')}
        {monthTag}
      </div>
      <div className="-mx-5 mt-2 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-wrap lg:justify-end lg:overflow-visible lg:px-0">
        {timeline.batches.map((b, i) => (
          <button key={b.id} type="button" onClick={() => open(i)} className={chipIdle}>
            <ChipText batch={b} short={sameMonth} />
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => open()}
        className="mt-3 block w-full cursor-pointer rounded-[3px] border border-forest-800 bg-forest-800 px-5 py-[12px] text-center text-[16px] font-semibold text-cream hover:bg-forest-950 lg:inline-block lg:w-auto lg:bg-transparent lg:px-[30px] lg:py-[14px] lg:text-[17px] lg:text-forest-800 lg:hover:bg-forest-800 lg:hover:text-cream"
      >
        {t('open')}
      </button>

      <dialog
        ref={ref}
        aria-labelledby={headingId}
        onClose={() => setIsOpen(false)}
        onClick={(e) => {
          if (e.target === ref.current) close()
        }}
        className="m-auto max-h-[calc(100dvh-24px)] w-[calc(100vw-24px)] max-w-[720px] rounded-[6px] bg-cream p-0 text-left text-ink shadow-[0_24px_80px_rgba(12,42,23,.35)] backdrop:bg-forest-950/70 open:flex open:flex-col"
      >
        <div className="max-h-[calc(100dvh-24px)] overflow-y-auto overscroll-contain px-5 pt-6 pb-8 lg:px-10 lg:pt-8 lg:pb-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[12px] font-bold tracking-[.14em] text-ember-600 uppercase lg:text-[13px] lg:tracking-[.16em]">
                {t('eyebrow')}
              </div>
              <h2
                id={headingId}
                className="m-0 mt-2 font-serif text-[26px] leading-[1.15] font-normal text-forest-950 lg:text-[34px]"
              >
                {timeline.heading}
              </h2>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={t('close')}
              className="-mt-1 -mr-2 flex size-10 flex-none cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-[26px] leading-none text-moss-600 hover:bg-cream-hover hover:text-forest-950"
            >
              ×
            </button>
          </div>

          {/* Batch picker — re-dates the blocks below */}
          <div className="mt-6 border-t border-line pt-5">
            <div className="text-[12px] tracking-[.14em] text-moss-500 uppercase">
              {t('chooseBatch')}
              {monthTag}
            </div>
            <div role="group" aria-label={t('chooseBatch')} className="mt-2.5 flex gap-2 overflow-x-auto lg:flex-wrap">
              {timeline.batches.map((b, i) => (
                <button
                  key={b.id}
                  type="button"
                  aria-pressed={i === batchIndex}
                  onClick={() => setBatchIndex(i)}
                  className={i === batchIndex ? chipOn : chipIdle}
                >
                  <ChipText batch={b} short={sameMonth} />
                </button>
              ))}
            </div>
            <p className="mt-3 mb-0 text-[14px] text-ink-soft lg:text-[15px]">
              {t('departsLine', { from: departs, to: back })}
            </p>
          </div>

          <ol className="mt-6 flex flex-col gap-7 lg:mt-7 lg:gap-8">
            {timeline.blocks.map((block) => (
              <li key={`${block.day}-${block.title}`} className="border-t border-line pt-5">
                <div className="text-[12px] tracking-[.14em] text-moss-500 uppercase">
                  {t('day', { n: block.day })} · {formatDay(addDays(batch.day1, block.day - 1))}
                  {block.label ? ` · ${block.label}` : ''}
                </div>
                <h3 className="m-0 mt-1 font-serif text-[22px] leading-[1.2] font-normal text-forest-950 lg:text-[24px]">
                  {block.title}
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {block.items.map((item) => (
                    <li
                      key={item.time + item.what}
                      className="grid grid-cols-[76px_1fr] gap-x-3 text-[15px] leading-[1.5] lg:grid-cols-[84px_1fr] lg:text-[16px]"
                    >
                      <span className="font-semibold whitespace-nowrap text-ember-800">{item.time}</span>
                      <span className="text-ink">{item.what}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="mt-7 border-t border-line pt-5 lg:mt-8">
            <div className="text-[12px] tracking-[.14em] text-moss-500 uppercase">{t('included')}</div>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {timeline.included.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-moss-150 px-3 py-1 text-[14px] font-semibold text-forest-800"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 mb-0 text-[14px] leading-[1.5] text-ink-soft">{t('note')}</p>
          </div>

          <div className="mt-7 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <span className="block">
              <span className="block text-[24px] leading-none font-bold text-forest-950">{p.price}</span>
              <span className="mt-1 block text-[14px] text-ember-800">{p.advance}</span>
            </span>
            <a
              href={whatsAppLink(p.whatsAppKeyword)}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-[3px] bg-ember-600 px-5 py-[13px] text-center text-[16px] font-semibold whitespace-nowrap hover:bg-ember-800 lg:inline-block lg:px-[30px] lg:py-[14px] lg:text-[17px]"
            >
              {/* Colour on the span: the global `a { color }` rule outranks utilities on the anchor. */}
              <span className="text-cream">{t('whatsAppCta', { keyword: p.whatsAppKeyword })}</span>
            </a>
          </div>
        </div>
      </dialog>
    </div>
  )
}
