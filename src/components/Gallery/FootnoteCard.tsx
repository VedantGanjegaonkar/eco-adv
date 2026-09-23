import { useTranslations } from 'next-intl'

/** The day in numbers, from the photos' timestamps. */
export default function FootnoteCard() {
  const t = useTranslations('galleryPage.field.footnote')
  return (
    <div className="rounded-[4px] border border-line bg-cream p-6 lg:p-8">
      <div className="text-[12px] tracking-[.14em] text-moss-500 uppercase">{t('eyebrow')}</div>
      <p className="m-0 mt-3 font-serif text-[22px] leading-[1.3] text-forest-950 lg:text-[28px]">
        {t('line')}
      </p>
    </div>
  )
}
