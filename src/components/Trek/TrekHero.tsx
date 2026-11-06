import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { TrekRegion } from '@/lib/treks'

/** Region cover with the title set into the scrim — the home hero's idiom.
 *  On phones the photo gets most of the first screen with only the region
 *  and its name set low on it; the summary is desktop-only, where it sits in
 *  the dark left-hand scrim. The object position keeps the camp, low in the
 *  frame, in the wide desktop crop. */
export default function TrekHero({ trek }: { trek: TrekRegion }) {
  const t = useTranslations('treksPage')

  return (
    <section className="relative h-[min(64svh,540px)] min-h-[400px] lg:h-[640px] lg:min-h-0">
      <Image
        src={trek.cover}
        alt={trek.coverAlt}
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover object-[50%_70%]"
      />

      {/* Scrims — vertical on mobile, left-to-right on desktop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,42,23,.5)_0%,rgba(12,42,23,0)_26%,rgba(12,42,23,0)_52%,rgba(12,42,23,.82)_100%)] lg:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(12,42,23,.82)_0%,rgba(12,42,23,.35)_48%,rgba(12,42,23,0)_72%)] lg:block"
      />

      <div className="absolute inset-0">
        <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-between px-5 pt-5 pb-8 lg:px-14 lg:pt-7 lg:pb-[72px]">
          <Link
            href="/treks"
            className="group self-start text-[12px] font-semibold tracking-[.12em] uppercase [text-shadow:0_1px_8px_rgba(12,42,23,.6)] lg:text-[13px]"
          >
            {/* Colour on the span: the global `a { color }` rule outranks utilities on the anchor itself. */}
            <span className="text-cream group-hover:text-sand-300">← {t('allTreks')}</span>
          </Link>
          <div className="lg:w-[620px]">
            <div className="text-[11px] tracking-[.22em] text-sand-300 uppercase lg:text-[13px] lg:tracking-[.16em]">
              {trek.region}
            </div>
            <h1 className="m-0 mt-2 font-serif text-[48px] leading-[1] font-normal tracking-[-.01em] text-cream lg:mt-[18px] lg:text-[76px] lg:leading-[1.04] lg:tracking-normal">
              {trek.title}
            </h1>
            <p className="mt-5 mb-0 hidden max-w-[480px] text-[20px] leading-[1.6] text-moss-200 lg:block">
              {trek.summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
