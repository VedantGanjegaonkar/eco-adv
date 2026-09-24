import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { whatsAppLink } from '@/lib/content'
import type { DayTrek } from '@/lib/treks'

const posterSizes = '(min-width:1440px) 427px, (min-width:1024px) 30vw, 72vw'

/** The monsoon one-day treks — a dark, rain-season band. 9:16 story posters
 *  swipe on phones and stand three-up on desktop, each with title and price. */
export default function DayTreks({ treks }: { treks: DayTrek[] }) {
  const t = useTranslations('treksPage.day')

  return (
    <section id="day-treks" className="scroll-mt-4 bg-forest-950">
      <div className="mx-auto max-w-[1440px] px-5 pt-[34px] pb-12 lg:px-14 lg:pt-[72px] lg:pb-24">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-10">
          <div>
            <div className="text-[12px] font-bold tracking-[.14em] text-moss-400 uppercase lg:text-[13px] lg:tracking-[.16em]">
              {t('eyebrow')}
            </div>
            <h2 className="m-0 mt-2 font-serif text-[30px] leading-[1.1] font-normal text-cream lg:mt-3 lg:text-[44px]">
              {t('heading')}
            </h2>
          </div>
          <p className="mt-2 mb-0 max-w-[520px] text-[15px] leading-[1.5] text-moss-300 lg:mt-0 lg:text-right lg:text-[17px]">
            {t('explainer')}
          </p>
        </div>

        {/* Phones: swipe strip. Desktop: three story posters side by side. */}
        <ol className="-mx-5 mt-6 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-5 pb-2 [-webkit-overflow-scrolling:touch] lg:mx-0 lg:mt-10 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
          {treks.map((trek, i) => (
            <li key={trek.key} className="flex w-[72vw] flex-none snap-start flex-col lg:w-auto">
              <div className="relative overflow-hidden rounded-[4px] bg-forest-900">
                <Image
                  src={trek.poster}
                  alt={trek.posterAlt}
                  sizes={posterSizes}
                  placeholder="blur"
                  className="h-auto w-full"
                />
              </div>
              <div className="flex flex-1 flex-col pt-4">
                <span className="text-[12px] tracking-[.14em] text-sand-500 uppercase">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="m-0 mt-1 font-serif text-[24px] leading-[1.2] font-normal text-cream lg:text-[26px]">
                  {trek.title}
                </h3>
                <p className="mt-1 mb-0 text-[15px] leading-[1.45] text-moss-300">{trek.kind}</p>
                {trek.itinerary.length > 0 && (
                  <div className="mt-3">
                    {trek.itinerary.map((line) => (
                      <p key={line} className="mt-2 mb-0 text-[15px] leading-[1.55] text-moss-200">
                        {line}
                      </p>
                    ))}
                  </div>
                )}
                {/* Price is on the poster itself, so the row carries only the WhatsApp link. */}
                <div className="mt-auto border-t border-forest-900 pt-4">
                  <a
                    href={whatsAppLink(trek.whatsAppKeyword)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-[15px] font-semibold whitespace-nowrap"
                  >
                    {/* Colour on the span: the global `a { color }` rule outranks utilities on the anchor. */}
                    <span className="text-sand-300 group-hover:text-cream">
                      {t('whatsAppCta', { keyword: trek.whatsAppKeyword })}
                    </span>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
