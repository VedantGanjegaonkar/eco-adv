import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { img } from '@/lib/content'

const youth = {
  eyebrow: 'Most booked · ages 10–17',
  title: 'Youth Camps',
  descMobile: '5 days, 1:8 ratio, phone-free. Manali, Dhobi village, Pavagadh.',
  descDesktop:
    'Five days, phone-free, 1:8 instructor ratio. Manali and Dhobi village in summer; Pavagadh and Bakor through the winter.',
}

const rows = [
  {
    image: img.trek,
    title: 'Treks',
    titleDesktop: 'Treks',
    descMobile: 'Weekend Gujarat · graded Himalayan crossings',
    descDesktop: 'Weekend Gujarat routes and graded Himalayan crossings.',
  },
  {
    image: img.family,
    title: 'Family Camps',
    titleDesktop: 'Family Camps',
    descMobile: '2 nights, all ages, tents and cooking together',
    descDesktop: 'Two nights, all ages. Tents, cooking, and a night walk.',
  },
  {
    image: img.corporate,
    title: 'School & Corporate Outbound',
    titleDesktop: 'School & Corporate',
    descMobile: 'Designed with your coordinator, 30–300 people',
    descDesktop: 'Outbound programmes built with your coordinator, 30–300 people.',
  },
]

function YouthCard({ desktop }: { desktop?: boolean }) {
  return (
    <a
      href="#departures"
      className={`relative block overflow-hidden rounded-[4px] ${
        desktop ? 'h-[560px]' : 'h-[300px]'
      }`}
    >
      <Image
        src={img.youth}
        alt=""
        fill
        sizes={desktop ? '(min-width:1024px) 60vw, 100vw' : '100vw'}
        className="object-cover"
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${
          desktop
            ? 'bg-[linear-gradient(180deg,rgba(12,42,23,0)_45%,rgba(12,42,23,.9)_100%)]'
            : 'bg-[linear-gradient(180deg,rgba(12,42,23,0)_40%,rgba(12,42,23,.88)_100%)]'
        }`}
      />
      <span
        className={`pointer-events-none absolute block ${
          desktop ? 'right-9 bottom-[34px] left-9' : 'right-[18px] bottom-[18px] left-[18px]'
        }`}
      >
        <span
          className={`block text-sand-300 uppercase ${
            desktop ? 'text-[12px] tracking-[.16em]' : 'text-[11px] tracking-[.14em]'
          }`}
        >
          {youth.eyebrow}
        </span>
        <span
          className={`block font-serif text-cream ${
            desktop ? 'mt-2 text-[52px] leading-[1.05]' : 'mt-1 text-[30px]'
          }`}
        >
          {youth.title}
        </span>
        <span
          className={`block text-moss-200 ${
            desktop
              ? 'mt-2.5 max-w-[520px] text-[18px] leading-[1.6]'
              : 'mt-1.5 text-[16px] leading-[1.5]'
          }`}
        >
          {desktop ? youth.descDesktop : youth.descMobile}
        </span>
      </span>
    </a>
  )
}

export default function Programmes() {
  const t = useTranslations('programmes')

  return (
    <section id="programmes" className="scroll-mt-4">
      {/* ——— Mobile ——— */}
      <div className="lg:hidden">
        <div className="px-5 pt-[34px] pb-2">
          <div className="text-[12px] font-bold tracking-[.14em] text-moss-500 uppercase">
            {t('label')}
          </div>
        </div>
        <div className="flex flex-col gap-4 px-5 pb-[34px]">
          <YouthCard />
          <div className="flex flex-col">
            {rows.map((row, i) => (
              <a
                key={row.title}
                href="#departures"
                className={`flex items-center gap-3.5 border-t border-line py-4 ${
                  i === rows.length - 1 ? 'border-b' : ''
                }`}
              >
                <span className="relative block size-[74px] flex-none overflow-hidden rounded-[3px]">
                  <Image src={row.image} alt="" fill sizes="74px" className="object-cover" />
                </span>
                <span className="block">
                  <span className="block font-serif text-[22px] text-forest-950">{row.title}</span>
                  <span className="block text-[15px] leading-[1.45] text-ink-soft">
                    {row.descMobile}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ——— Desktop ——— */}
      <div className="mx-auto hidden max-w-[1440px] px-14 pt-[72px] pb-20 lg:block">
        <div className="flex items-baseline justify-between">
          <h2 className="m-0 font-serif text-[44px] font-normal text-forest-950">{t('heading')}</h2>
          <span className="max-w-[420px] text-right text-[17px] text-ink-soft">{t('note')}</span>
        </div>
        <div className="mt-9 grid grid-cols-[2fr_1fr] items-stretch gap-8">
          <YouthCard desktop />
          <div className="flex flex-col">
            {rows.map((row) => (
              <a
                key={row.title}
                href="#departures"
                className="flex items-center gap-5 border-b border-line py-[26px]"
              >
                <span className="relative block size-[110px] flex-none overflow-hidden rounded-[3px]">
                  <Image src={row.image} alt="" fill sizes="110px" className="object-cover" />
                </span>
                <span className="block">
                  <span className="block font-serif text-[28px] text-forest-950">
                    {row.titleDesktop}
                  </span>
                  <span className="mt-1 block text-[16px] leading-[1.5] text-ink-soft">
                    {row.descDesktop}
                  </span>
                </span>
              </a>
            ))}
            <div className="mt-auto pt-[26px] text-[16px] leading-[1.6] text-ink-soft">
              {t('helpNote')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
