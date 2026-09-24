import { useTranslations } from 'next-intl'
import { departures } from '@/lib/content'
import { sahyadri } from '@/lib/treks'
import { Link } from '@/i18n/navigation'

/** Hands the story off to the next departure — the only ember on the page —
 *  and sends the reader to the Sahyadri programme page for the details. */
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
          <Link
            href={`/treks/${sahyadri.slug}`}
            className="mt-3 block rounded-[3px] bg-ember-600 px-5 py-[15px] text-center text-[17px] font-semibold whitespace-nowrap hover:bg-ember-800 lg:mt-0 lg:inline-block lg:px-[38px] lg:py-[17px]"
          >
            {/* Colour on the span: the global `a { color }` rule outranks utilities on the anchor. */}
            <span className="text-cream">{t('cta')}</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
