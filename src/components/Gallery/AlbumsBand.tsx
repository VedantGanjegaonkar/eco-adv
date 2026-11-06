import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { albums } from '@/lib/albums'

const coverSizes = '(min-width:1440px) 427px, (min-width:1024px) 30vw, (min-width:768px) 48vw, 100vw'

/** The other albums, after the Naneghat story and before the next departure —
 *  one card per programme that has run, three-up on desktop. */
export default function AlbumsBand() {
  const t = useTranslations('galleryPage.albums')
  if (albums.length === 0) return null

  return (
    <section className="border-t border-line bg-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-14 lg:px-14 lg:py-24">
        <div className="text-[12px] tracking-[.14em] text-moss-500 uppercase lg:text-[13px] lg:tracking-[.16em]">
          {t('eyebrow')}
        </div>
        <h2 className="m-0 mt-2 font-serif text-[30px] leading-[1.1] font-normal text-forest-950 lg:mt-3 lg:text-[44px]">
          {t('heading')}
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {albums.map((album) => (
            <Link
              key={album.slug}
              href={`/gallery/${album.slug}`}
              className="group flex flex-col overflow-hidden rounded-[4px] border border-line bg-cream transition-shadow hover:shadow-[0_8px_30px_rgba(12,42,23,.10)]"
            >
              <span className="relative block aspect-[4/3] w-full overflow-hidden bg-line">
                <Image
                  src={album.cover}
                  alt={album.coverAlt}
                  fill
                  placeholder="blur"
                  sizes={coverSizes}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </span>
              {/* Colours sit on spans: the global `a { color }` rule outranks utilities on the anchor. */}
              <span className="flex flex-1 flex-col p-4 lg:p-5">
                <span className="block text-[11px] tracking-[.14em] text-moss-500 uppercase">
                  {album.where} · {album.when}
                </span>
                <span className="mt-1 block font-serif text-[24px] leading-[1.15] text-forest-950 lg:text-[26px]">
                  {album.title}
                </span>
                <span className="mt-1.5 mb-4 block text-[15px] leading-[1.5] text-ink-soft">{album.summary}</span>
                <span className="mt-auto block border-t border-line pt-3 text-[15px] font-semibold text-ember-600 group-hover:text-ember-800 lg:pt-4">
                  {t('open')}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
