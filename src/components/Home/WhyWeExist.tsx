import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { img } from '@/lib/content'

export default function WhyWeExist() {
  const t = useTranslations('why')

  return (
    <section id="why" className="scroll-mt-4 bg-forest-950 text-moss-200">
      <div className="mx-auto max-w-[1440px] items-stretch lg:grid lg:grid-cols-2">
        <div className="relative h-[280px] lg:h-[760px]">
          <Image
            src={img.why}
            alt=""
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col px-5 pt-[30px] pb-[34px] lg:justify-center lg:p-20">
          <div className="text-[12px] font-bold tracking-[.14em] text-moss-400 uppercase lg:text-[13px]">
            {t('label')}
          </div>
          <h2 className="mt-2.5 mb-0 font-serif text-[32px] leading-[1.15] font-normal text-cream lg:mt-4 lg:text-[52px] lg:leading-[1.1]">
            {t('heading')}
          </h2>
          <p className="mt-4 mb-0 text-[17px] leading-[1.65] lg:mt-6 lg:text-[19px] lg:leading-[1.7]">
            {t('p1')}
          </p>
          <p className="mt-4 mb-0 text-[17px] leading-[1.65] lg:mt-5 lg:text-[19px] lg:leading-[1.7]">
            {t('p2')}
          </p>
          <div className="mt-6 lg:mt-8">
            <a
              href="#"
              className="border-b border-[#6B7F66] pb-[3px] text-[16px] font-semibold text-sand-300 hover:text-sand-300 lg:pb-1 lg:text-[17px]"
            >
              {t('reportCta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
