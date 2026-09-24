import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { whatsAppLink } from '@/lib/content'
import TimelineDialog from './TimelineDialog'
import type { WeekendProgramme as Programme } from '@/lib/treks'

const cardSizes = '(min-width:1440px) 652px, (min-width:1024px) 46vw, 84vw'

function Dot() {
  return <span aria-hidden className="block size-[3px] rounded-full bg-sand-300" />
}

function Card({ card }: { card: Programme['cards'][number] }) {
  return (
    <div className="relative overflow-hidden rounded-[4px] bg-line">
      <Image src={card.src} alt={card.alt} sizes={cardSizes} placeholder="blur" className="h-auto w-full" />
    </div>
  )
}

function WhatsAppButton({ programme: p, className }: { programme: Programme; className: string }) {
  const t = useTranslations('treksPage.weekend')
  return (
    <a
      href={whatsAppLink(p.whatsAppKeyword)}
      target="_blank"
      rel="noopener noreferrer"
      className={`rounded-[3px] bg-ember-600 px-5 py-[13px] text-center text-[16px] font-semibold whitespace-nowrap hover:bg-ember-800 lg:px-[30px] lg:py-[15px] lg:text-[17px] ${className}`}
    >
      {/* Colour on the span: the global `a { color }` rule outranks utilities on the anchor. */}
      <span className="text-cream">{t('whatsAppCta', { keyword: p.whatsAppKeyword })}</span>
    </a>
  )
}

/** The programme running now — 2D/1N with the campaign cards. Cards swipe on
 *  mobile (they were drawn as a carousel) and sit in two columns on desktop.
 *  The timeline button leads; WhatsApp follows the last card. */
export default function WeekendProgramme({ programme: p }: { programme: Programme }) {
  const t = useTranslations('treksPage.weekend')
  const half = Math.ceil(p.cards.length / 2)
  const columns = [p.cards.slice(0, half), p.cards.slice(half)]

  return (
    <section id="weekend" className="scroll-mt-4 border-b border-line bg-cream">
      <div className="mx-auto max-w-[1440px] px-5 pt-[34px] pb-10 lg:px-14 lg:pt-[72px] lg:pb-20">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-10">
          <div>
            <div className="flex items-center gap-2 text-[12px] font-bold tracking-[.14em] text-ember-600 uppercase lg:text-[13px] lg:tracking-[.16em]">
              <span aria-hidden className="block size-2 rounded-full bg-ember-600" />
              {t('eyebrow')}
            </div>
            <h2 className="m-0 mt-2 font-serif text-[30px] leading-[1.1] font-normal text-forest-950 lg:mt-3 lg:text-[44px]">
              {p.title}
            </h2>
            <p className="mt-1.5 mb-0 text-[15px] text-ink-soft lg:mt-2 lg:text-[17px]">{p.kind}</p>
            <p className="mt-2 mb-0 flex items-center gap-2.5 text-[15px] text-ink lg:text-[17px]">
              <span className="block font-semibold">{p.dur}</span>
              <Dot />
              <span className="block">{p.when}</span>
            </p>
          </div>

          {/* Price is on the cards themselves, so the header carries only the timeline. */}
          <div className="mt-5 lg:mt-0 lg:flex-none">
            <TimelineDialog programme={p} />
          </div>
        </div>

        {/* Mobile: swipe strip in carousel order. Mixed ratios (1:1 and 4:5) sit top-aligned. */}
        <ul
          aria-label={t('cardsLabel')}
          className="-mx-5 mt-5 flex snap-x snap-mandatory items-start gap-3 overflow-x-auto px-5 pb-2 [-webkit-overflow-scrolling:touch] lg:hidden"
        >
          {p.cards.map((card) => (
            <li key={card.src.src} className="w-[84vw] flex-none snap-start">
              <Card card={card} />
            </li>
          ))}
        </ul>
        {/* Desktop: two columns read top-to-bottom, so carousel order is kept and each
            column holds one square and one 4:5 card, which makes the columns equal. */}
        <div aria-label={t('cardsLabel')} className="mt-10 hidden grid-cols-2 gap-6 lg:grid">
          {columns.map((column, i) => (
            <ul key={i} className="flex flex-col gap-6">
              {column.map((card) => (
                <li key={card.src.src}>
                  <Card card={card} />
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* WhatsApp follows the last card on both layouts. */}
        <div className="mt-4 lg:mt-6 lg:flex lg:justify-end">
          <WhatsAppButton programme={p} className="block lg:inline-block" />
        </div>
      </div>
    </section>
  )
}
