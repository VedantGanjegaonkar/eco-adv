import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { img } from '@/lib/content'

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative h-[520px] lg:h-[720px]">
      <Image
        src={img.hero}
        alt=""
        fill
        priority
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

      {/* Mobile-only registration strip pinned to the top */}
      <div className="pointer-events-none absolute inset-x-0 top-4 px-5 lg:hidden">
        <span className="text-[12px] tracking-[.12em] text-pill uppercase">
          {t('eyebrowMobile')}
        </span>
      </div>

      <div className="absolute inset-0">
        <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-[26px] lg:px-14 lg:pb-[88px]">
          <div className="lg:w-[620px]">
            <div className="hidden text-[13px] tracking-[.16em] text-sand-300 uppercase lg:block">
              {t('eyebrowDesktop')}
            </div>
            <h1 className="m-0 font-serif text-[40px] leading-[1.08] font-normal text-pretty text-cream lg:mt-[18px] lg:text-[76px] lg:leading-[1.04]">
              {t('head')}
            </h1>
            <p className="mt-3 mb-5 max-w-[300px] text-[17px] leading-[1.55] text-moss-200 lg:hidden">
              {t('sub')}
            </p>
            <p className="hidden max-w-[480px] text-[20px] leading-[1.6] text-moss-200 lg:mt-5 lg:mb-8 lg:block">
              {t('subLong')}
            </p>
            <a
              href="#departures"
              className="block rounded-[3px] bg-ember-600 px-5 py-[15px] text-center text-[17px] font-semibold text-cream hover:bg-ember-800 hover:text-cream lg:inline-block lg:w-auto lg:px-[38px] lg:py-[17px] lg:text-[18px]"
            >
              {t('cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
