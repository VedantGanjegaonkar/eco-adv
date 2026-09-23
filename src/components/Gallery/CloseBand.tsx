import { useTranslations } from 'next-intl'
import { departures, whatsAppLink } from '@/lib/content'

/** Hands the story off to the next departure — the only ember on the page. */
export default function CloseBand() {
  const t = useTranslations('galleryPage.close')
  const d = departures[0]

  return (
    <section className="bg-forest-950">
      <div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-14 lg:py-[120px]">
        <div className="text-[13px] tracking-[.16em] text-sand-300 uppercase">{t('eyebrow')}</div>
        <h2 className="m-0 mt-4 max-w-[900px] font-serif text-[40px] leading-[1.04] font-normal text-cream lg:text-[76px]">
          {t('heading')}
        </h2>
        <div className="mt-12 grid gap-y-3 border-t border-forest-900 pt-6 lg:grid-cols-[150px_1fr_140px_auto] lg:items-center lg:gap-x-6">
          <span className="text-[18px] font-semibold text-moss-200">{d.date}</span>
          <span>
            <span className="block font-serif text-[28px] text-cream">{d.dest}</span>
            <span className="mt-0.5 block text-[16px] text-moss-300">{d.kind}</span>
          </span>
          <span className="text-[20px] font-bold text-cream">{d.price}</span>
          <a
            href={whatsAppLink(d.whatsAppKeyword)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block rounded-[3px] bg-ember-600 px-5 py-[15px] text-center text-[17px] font-semibold text-cream hover:bg-ember-800 hover:text-cream lg:mt-0 lg:inline-block lg:px-[38px] lg:py-[17px]"
          >
            {t('cta', { keyword: d.whatsAppKeyword })}
          </a>
        </div>
      </div>
    </section>
  )
}
