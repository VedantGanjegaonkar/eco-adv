import { useTranslations } from 'next-intl'
import { galleryIndex } from '@/lib/albums'
import AlbumCard from './AlbumCard'

/** The other albums, after the Naneghat story and before the next departure —
 *  one card per trek that has run, newest first. */
export default function AlbumsBand() {
  const t = useTranslations('galleryPage.albums')
  const others = galleryIndex.filter((entry) => entry.slug !== 'naneghat')
  if (others.length === 0) return null

  return (
    <section className="border-t border-line bg-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-14 lg:px-14 lg:py-24">
        <div className="text-[12px] tracking-[.14em] text-moss-500 uppercase lg:text-[13px] lg:tracking-[.16em]">
          {t('eyebrow')}
        </div>
        <h2 className="m-0 mt-2 font-serif text-[30px] leading-[1.1] font-normal text-forest-950 lg:mt-3 lg:text-[44px]">
          {t('heading')}
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-6">
          {others.map((entry) => (
            <li key={entry.slug}>
              <AlbumCard entry={entry} openLabel={t('open')} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
