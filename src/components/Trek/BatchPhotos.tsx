import Image from 'next/image'
import type { BatchPhoto } from '@/lib/treks'

const portraitSizes = '(min-width:1440px) 314px, (min-width:1024px) 24vw, 64vw'
const landscapeSizes = '(min-width:1440px) 652px, (min-width:1024px) 48vw, 86vw'

/** On desktop every tile takes one row height — a portrait column's 3:4 —
 *  worked out from the grid's own width (container units), so a landscape
 *  tile spanning two columns lines up with the portraits beside it at any
 *  viewport. On phones portraits are held to 3:4 (a 9:16 phone shot would
 *  stretch the whole swipe row) and landscapes keep their shape, top-aligned. */
const tileHeight = 'lg:h-[calc((100cqw_-_72px)/4*4/3)]'

function Photo({ photo }: { photo: BatchPhoto }) {
  const landscape = photo.src.width > photo.src.height
  return (
    <li
      className={`relative flex-none snap-start overflow-hidden rounded-[4px] bg-line lg:w-auto ${tileHeight} ${
        landscape ? 'w-[86vw] lg:col-span-2' : 'w-[64vw] aspect-[3/4] lg:aspect-auto'
      }`}
    >
      <figure className="m-0 h-full">
        <Image
          src={photo.src}
          alt={photo.alt}
          sizes={landscape ? landscapeSizes : portraitSizes}
          placeholder="blur"
          className={landscape ? 'h-auto w-full lg:h-full lg:object-cover' : 'h-full w-full object-cover'}
        />
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(12,42,23,0)_0%,rgba(12,42,23,.72)_100%)] px-3 pt-8 pb-2.5 text-[12px] font-semibold tracking-[.04em] text-cream lg:px-4 lg:pb-3 lg:text-[13px]">
          {photo.caption}
        </figcaption>
      </figure>
    </li>
  )
}

/** Photos from a batch that ran — a swipe row on phones, a four-column wall
 *  on desktop. Used by the weekend programme and the gallery albums. */
export default function BatchPhotos({ photos, label }: { photos: BatchPhoto[]; label: string }) {
  return (
    <ul
      aria-label={label}
      className="@container -mx-5 mt-3 flex snap-x snap-mandatory scroll-px-5 items-start gap-3 overflow-x-auto px-5 pb-2 [-webkit-overflow-scrolling:touch] lg:mx-0 lg:mt-6 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
    >
      {photos.map((photo) => (
        <Photo key={photo.src.src} photo={photo} />
      ))}
    </ul>
  )
}
