import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { PhotoHighlight as Highlight } from '@/lib/treks'

/** One moment from a batch, bigger than the wall below it: its photos side by
 *  side at 3:4 beside a dark panel with what it was and a link to the album.
 *  Phones: the photos two-up, the panel under them. */
export default function PhotoHighlight({ highlight: h, albumCta }: { highlight: Highlight; albumCta: string }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2 lg:mt-6 lg:grid-cols-[1fr_1fr_1.15fr] lg:gap-6">
      {h.photos.map((photo) => (
        <figure key={photo.src.src} className="relative m-0 aspect-[3/4] overflow-hidden rounded-[4px] bg-line">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            placeholder="blur"
            sizes="(min-width:1440px) 410px, (min-width:1024px) 30vw, 50vw"
            className="object-cover"
          />
          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(12,42,23,0)_0%,rgba(12,42,23,.72)_100%)] px-3 pt-8 pb-2.5 text-[12px] font-semibold tracking-[.04em] text-cream lg:px-4 lg:pb-3 lg:text-[13px]">
            {photo.caption}
          </figcaption>
        </figure>
      ))}

      <div className="col-span-2 flex flex-col justify-end rounded-[4px] bg-forest-950 px-5 py-6 lg:col-span-1 lg:px-9 lg:py-10">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-[.18em] text-sand-300 uppercase lg:text-[12px]">
          <span aria-hidden className="block size-1.5 rounded-full bg-ember-600 lg:size-2" />
          {h.eyebrow}
        </div>
        <h4 className="m-0 mt-3 font-serif text-[28px] leading-[1.08] font-normal text-cream lg:mt-4 lg:text-[44px]">
          {h.title}
        </h4>
        <p className="mt-3 mb-0 text-[15px] leading-[1.55] text-moss-200 lg:mt-4 lg:text-[17px]">{h.line}</p>
        {h.albumSlug && (
          <Link
            href={`/gallery/${h.albumSlug}`}
            className="group mt-5 self-start border-t border-forest-850 pt-4 text-[15px] font-semibold lg:mt-8 lg:text-[16px]"
          >
            {/* Colour on the span: the global `a { color }` rule outranks utilities on the anchor. */}
            <span className="text-sand-300 group-hover:text-cream">{albumCta}</span>
          </Link>
        )}
      </div>
    </div>
  )
}
