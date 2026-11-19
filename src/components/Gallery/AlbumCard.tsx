import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { GalleryEntry } from '@/lib/albums'

const coverSizes = '(min-width:1440px) 427px, (min-width:1024px) 30vw, (min-width:768px) 48vw, 100vw'

/** One trek in the gallery: the cover, when it ran, and its name. The whole
 *  card is the link. Used by the gallery index and the “more albums” band. */
export default function AlbumCard({
  entry,
  index,
  openLabel,
  priority = false,
}: {
  entry: GalleryEntry
  /** 1-based position, shown as “01”. Omit to hide the number. */
  index?: number
  openLabel: string
  priority?: boolean
}) {
  return (
    <Link
      href={`/gallery/${entry.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-[4px] bg-forest-950 md:aspect-[4/5]"
    >
      <Image
        src={entry.cover}
        alt={entry.coverAlt}
        fill
        priority={priority}
        placeholder="blur"
        sizes={coverSizes}
        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${entry.coverPosition ?? ''}`}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,42,23,0)_12%,rgba(12,42,23,.92)_100%)] md:bg-[linear-gradient(180deg,rgba(12,42,23,0)_38%,rgba(12,42,23,.88)_100%)]"
      />
      {/* Colours sit on spans: the global `a { color }` rule outranks utilities on the anchor. */}
      {index !== undefined && (
        <span className="absolute top-4 left-4 font-serif text-[15px] text-cream [text-shadow:0_1px_8px_rgba(12,42,23,.6)] lg:top-5 lg:left-5">
          {String(index).padStart(2, '0')}
        </span>
      )}
      <span className="absolute inset-x-0 bottom-0 flex flex-col p-4 lg:p-6">
        <span className="text-[12px] font-semibold tracking-[.14em] text-sand-300 uppercase lg:text-[13px]">
          {entry.date}
        </span>
        <span className="mt-1 font-serif text-[26px] leading-[1.1] text-cream lg:text-[30px]">{entry.title}</span>
        <span className="mt-3 flex items-center justify-between border-t border-cream/25 pt-3 text-[14px] lg:text-[15px]">
          <span className="text-moss-200">{entry.where}</span>
          <span className="font-semibold text-cream transition-transform group-hover:translate-x-0.5">{openLabel}</span>
        </span>
      </span>
    </Link>
  )
}
