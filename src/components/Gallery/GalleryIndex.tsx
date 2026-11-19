import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { galleryIndex } from '@/lib/albums'
import { sahyadri } from '@/lib/treks'
import AlbumCard from './AlbumCard'

/** /gallery — one card per trek that has run, newest first: the trek's name
 *  and the date it ran, each opening that trek's album. */
export default function GalleryIndex() {
  const t = useTranslations('galleryIndex')

  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-[1440px] px-5 pt-10 pb-14 lg:px-14 lg:pt-[72px] lg:pb-24">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-10">
          <div>
            <div className="text-[12px] tracking-[.14em] text-moss-500 uppercase lg:text-[13px] lg:tracking-[.16em]">
              {t('eyebrow')}
            </div>
            <h1 className="m-0 mt-2 font-serif text-[36px] leading-[1.06] font-normal text-forest-950 lg:mt-3 lg:text-[64px]">
              {t('heading')}
            </h1>
          </div>
          <p className="mt-3 mb-0 max-w-[460px] text-[15px] leading-[1.5] text-ink-soft lg:mt-0 lg:text-[17px]">
            {t('sub')}
          </p>
        </div>

        <ul className="mt-7 grid gap-4 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {galleryIndex.map((entry, i) => (
            <li key={entry.slug}>
              <AlbumCard entry={entry} index={i + 1} openLabel={t('open')} priority={i === 0} />
            </li>
          ))}
        </ul>

        <p className="mt-10 mb-0 border-t border-line pt-5 text-[15px] text-ink-soft lg:mt-14 lg:text-[16px]">
          {t('nextLine')}{' '}
          <Link href={`/treks/${sahyadri.slug}`} className="group font-semibold">
            {/* Colour on the span: the global `a { color }` rule outranks utilities on the anchor. */}
            <span className="text-ember-600 group-hover:text-ember-800">{t('nextCta')}</span>
          </Link>
        </p>
      </div>
    </section>
  )
}
