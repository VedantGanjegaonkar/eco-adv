import { useTranslations } from 'next-intl'
import {
  departures,
  departureFilters,
  gradeColor,
  whatsAppLink,
} from '@/lib/content'
import { Link } from '@/i18n/navigation'

function Dot() {
  return <span aria-hidden className="block size-[3px] rounded-full bg-sand-300" />
}

export default function Departures() {
  const t = useTranslations('departures')

  return (
    <section id="departures" className="scroll-mt-4 border-y border-line bg-cream">
      {/* ——— Mobile ——— */}
      <div className="lg:hidden">
        <div className="flex items-baseline justify-between px-5 pt-[30px] pb-2">
          <h2 className="m-0 font-serif text-[28px] font-normal text-forest-950">
            {t('heading')}
          </h2>
          <span className="text-[14px] text-moss-500">{t('month')}</span>
        </div>
        <p className="m-0 px-5 pt-1.5 pb-3 text-[15px] leading-[1.5] text-moss-600">
          {t('explainerMobile')}
        </p>
        <div className="flex gap-2 overflow-x-auto px-5 pb-2 [-webkit-overflow-scrolling:touch]">
          {departureFilters.map((f) => (
            <span
              key={f}
              className="flex-none rounded-full border border-moss-150 px-[13px] py-[7px] text-[14px] font-semibold whitespace-nowrap text-forest-800"
            >
              {f}
            </span>
          ))}
        </div>
        <div className="px-5 pt-3.5 pb-[30px]">
          {departures.map((d) => (
            <a
              key={d.dest}
              href={whatsAppLink(d.whatsAppKeyword)}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-t border-line py-4"
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="block font-serif text-[21px] leading-[1.2] text-forest-950">
                  {d.dest}
                </span>
                <span className="block text-[17px] font-bold whitespace-nowrap text-forest-950">
                  {d.price}
                </span>
              </span>
              <span className="mt-[5px] block text-[15px] text-ink-soft">{d.kind}</span>
              <span className="mt-[9px] flex items-center gap-2.5 text-[15px] text-ink">
                <span className="block font-semibold">{d.date}</span>
                <Dot />
                <span className="block">{d.dur}</span>
                <Dot />
                <span className={`block ${gradeColor[d.grade]}`}>{d.grade}</span>
              </span>
              <span className="mt-2.5 flex items-center justify-between">
                <span className="block text-[14px] text-ember-800">{d.spots}</span>
                <span className="block text-[15px] font-semibold text-ember-600">
                  {t('whatsAppCta')}
                </span>
              </span>
            </a>
          ))}
          <Link
            href="/treks"
            className="mt-[18px] block rounded-[3px] border border-forest-800 py-3.5 text-center text-[16px] font-semibold text-forest-800"
          >
            {t('calendarCta')}
          </Link>
        </div>
      </div>

      {/* ——— Desktop ——— */}
      <div className="mx-auto hidden max-w-[1440px] px-14 pt-[66px] pb-[72px] lg:block">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="m-0 font-serif text-[44px] font-normal text-forest-950">
              {t('heading')}
            </h2>
            <p className="mt-2 mb-0 max-w-[760px] text-[17px] text-ink-soft">
              {t('explainerDesktop')}
            </p>
          </div>
          <div className="flex gap-2.5">
            {departureFilters.map((f) => (
              <span
                key={f}
                className="rounded-full border border-moss-150 px-[18px] py-[9px] text-[16px] font-semibold whitespace-nowrap text-forest-800"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-[34px] grid grid-cols-[150px_1fr_170px_130px_140px_180px] gap-x-6 border-b border-line-strong pb-3 text-[13px] tracking-[.14em] text-moss-500 uppercase">
          <div>{t('colDates')}</div>
          <div>{t('colDestination')}</div>
          <div>{t('colDuration')}</div>
          <div>{t('colGrade')}</div>
          <div>{t('colPrice')}</div>
          <div />
        </div>
        {departures.map((d) => (
          <a
            key={d.dest}
            href={whatsAppLink(d.whatsAppKeyword)}
            target="_blank"
            rel="noopener noreferrer"
            className="grid grid-cols-[150px_1fr_170px_130px_140px_180px] items-center gap-x-6 border-b border-line py-[22px] hover:bg-cream-hover"
          >
            <span className="block text-[18px] font-semibold text-forest-950">{d.date}</span>
            <span className="block">
              <span className="block font-serif text-[24px] text-forest-950">{d.dest}</span>
              <span className="mt-0.5 block text-[16px] text-ink-soft">{d.kind}</span>
            </span>
            <span className="block text-[17px] text-ink">{d.dur}</span>
            <span className={`block text-[17px] ${gradeColor[d.grade]}`}>{d.grade}</span>
            <span className="block text-[20px] font-bold text-forest-950">{d.price}</span>
            <span className="flex items-center justify-end gap-4">
              <span className="block text-[15px] text-ember-800">{d.spots}</span>
              <span className="block text-[16px] font-semibold text-ember-600">
                {t('whatsAppCta')}
              </span>
            </span>
          </a>
        ))}
        <Link
          href="/treks"
          className="mt-7 inline-block rounded-[3px] border border-forest-800 px-8 py-[15px] text-[17px] font-semibold text-forest-800"
        >
          {t('calendarCta')}
        </Link>
      </div>
    </section>
  )
}
