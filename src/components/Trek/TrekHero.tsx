import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { TrekRegion } from '@/lib/treks'

/** Region cover with the title set into the scrim — the home hero's idiom. */
export default function TrekHero({ trek }: { trek: TrekRegion }) {
  const t = useTranslations('treksPage')

  return (
    <section className="relative h-[460px] lg:h-[640px]">
      <Image
        src={trek.cover}
        alt={trek.coverAlt}
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />

      {/* Scrims — vertical on mobile, left-to-right on desktop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,42,23,.55)_0%,rgba(12,42,23,0)_34%,rgba(12,42,23,.86)_78%)] lg:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(12,42,23,.82)_0%,rgba(12,42,23,.35)_48%,rgba(12,42,23,0)_72%)] lg:block"
      />

      <div className="absolute inset-0">
        <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-between px-5 pt-4 pb-[26px] lg:px-14 lg:pt-7 lg:pb-[72px]">
          <Link
            href="/treks"
            className="group self-start text-[12px] font-semibold tracking-[.12em] uppercase [text-shadow:0_1px_8px_rgba(12,42,23,.6)] lg:text-[13px]"
          >
            {/* Colour on the span: the global `a { color }` rule outranks utilities on the anchor itself. */}
            <span className="text-cream group-hover:text-sand-300">← {t('allTreks')}</span>
          </Link>
          <div className="lg:w-[620px]">
            <div className="text-[12px] tracking-[.14em] text-sand-300 uppercase lg:text-[13px] lg:tracking-[.16em]">
              {trek.region}
            </div>
            <h1 className="m-0 mt-2 font-serif text-[44px] leading-[1.06] font-normal text-cream lg:mt-[18px] lg:text-[76px] lg:leading-[1.04]">
              {trek.title}
            </h1>
            <p className="mt-3 mb-0 max-w-[480px] text-[17px] leading-[1.55] text-moss-200 lg:mt-5 lg:text-[20px] lg:leading-[1.6]">
              {trek.summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
