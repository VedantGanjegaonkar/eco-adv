import { useTranslations } from 'next-intl'
import { safety, site } from '@/lib/content'

export default function Safety() {
  const t = useTranslations('safety')

  return (
    <section id="safety" className="scroll-mt-4 border-b border-line bg-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-8 lg:grid lg:grid-cols-[1fr_2fr] lg:gap-16 lg:px-14 lg:py-[76px]">
        <div>
          <h2 className="m-0 font-serif text-[28px] font-normal text-forest-950 lg:text-[44px] lg:leading-[1.15]">
            {t('heading')}
          </h2>
          <p className="mt-2 mb-0 text-[16px] leading-[1.55] text-ink-soft lg:mt-4 lg:text-[18px] lg:leading-[1.6]">
            <span className="lg:hidden">{t('subMobile')}</span>
            <span className="hidden lg:inline">{t('subDesktop')}</span>
          </p>
          <p className="mt-7 mb-0 hidden text-[18px] leading-[1.6] font-semibold text-forest-950 lg:block">
            {t('phoneLineMobile')}
            <br />
            <a href={`tel:${site.phone}`} className="text-forest-800">
              {t('phoneLineDesktop')}
            </a>
          </p>
        </div>
        <div className="mt-5 lg:mt-0 lg:grid lg:grid-cols-2 lg:gap-x-12">
          {safety.map((item) => (
            <div
              key={item.n}
              className="flex gap-3.5 border-t border-line py-3.5 lg:py-[22px]"
            >
              <span className="w-[26px] flex-none font-serif text-[17px] text-sand-500 lg:w-7 lg:text-[19px]">
                {item.n}
              </span>
              <span>
                <span className="block text-[17px] font-semibold text-forest-950 lg:text-[19px]">
                  {item.t}
                </span>
                <span className="mt-0.5 block text-[16px] leading-[1.5] text-ink-soft lg:text-[17px]">
                  {item.d}
                </span>
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 mb-0 text-[15px] leading-[1.5] text-ink-soft lg:hidden">
          {t('phoneLineMobile')}{' '}
          <a href={`tel:${site.phone}`} className="font-semibold text-forest-800">
            {site.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  )
}
