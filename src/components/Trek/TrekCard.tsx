import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { TrekRegion } from '@/lib/treks'

/** “Every weekend of October” → “every weekend of October” for mid-sentence use. */
function lowerFirst(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1)
}

const coverSizes = '(min-width:1440px) 427px, (min-width:1024px) 30vw, (min-width:768px) 48vw, 100vw'

/** One region on the treks index — a compact card that sits three-up on
 *  desktop, so more regions (Himalaya, Rajasthan…) can slot in beside it. */
export default function TrekCard({ trek }: { trek: TrekRegion }) {
  const t = useTranslations('treksPage')

  return (
    <Link
      href={`/treks/${trek.slug}`}
      className="group flex flex-col overflow-hidden rounded-[4px] border border-line bg-cream transition-shadow hover:shadow-[0_8px_30px_rgba(12,42,23,.10)]"
    >
      <span className="relative block aspect-[4/3] w-full overflow-hidden bg-line">
        <Image
          src={trek.cover}
          alt={trek.coverAlt}
          fill
          placeholder="blur"
          sizes={coverSizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </span>

      {/* Colours sit on spans: the global `a { color }` rule outranks utilities on the anchor. */}
      <span className="flex flex-1 flex-col p-4 lg:p-5">
        <span className="block text-[11px] tracking-[.14em] text-moss-500 uppercase">
          {trek.region}
        </span>
        <span className="mt-1 block font-serif text-[26px] leading-[1.15] text-forest-950 lg:text-[28px]">
          {trek.title}
        </span>
        <span className="mt-1.5 block text-[15px] leading-[1.5] text-ink-soft">{trek.summary}</span>

        <span className="mt-3 flex flex-col gap-y-1 text-[14px] text-ink">
          <span className="block">
            {trek.weekend.dur} · {lowerFirst(trek.weekend.when)}
          </span>
          <span className="block">{t('dayTreksFact', { count: trek.dayTreks.length })}</span>
        </span>

        <span className="mt-auto block border-t border-line pt-3 text-[15px] font-semibold text-ember-600 group-hover:text-ember-800 lg:pt-4">
          {t('learnMore')}
        </span>
      </span>
    </Link>
  )
}
