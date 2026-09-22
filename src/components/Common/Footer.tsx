import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { site } from '@/lib/content'

function FooterContact({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <>
      <div className="font-semibold text-cream">{t('common.officeHours')}</div>
      <div className="mt-2 lg:mt-0">
        {site.addressLines[0]}
        <br />
        {site.addressLines[1]}
        <br className="lg:hidden" />
        <span className="lg:hidden">{site.addressRegion}</span>
      </div>
      <div className="mt-3 lg:mt-1.5">
        <a href={`tel:${site.phone}`} className="text-sand-300 hover:text-sand-300 hover:underline">
          {site.phoneDisplay}
        </a>{' '}
        ·{' '}
        <a
          href={site.whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sand-300 hover:text-sand-300 hover:underline"
        >
          {t('common.whatsApp')}
        </a>
      </div>
      <div>
        <a
          href={`mailto:${site.email}`}
          className="text-sand-300 hover:text-sand-300 hover:underline"
        >
          {site.email}
        </a>
      </div>
    </>
  )
}

export default function Footer() {
  const t = useTranslations()
  const link = 'text-moss-300 hover:text-cream'
  const colLabel =
    'mb-2.5 text-[13px] tracking-[.14em] text-moss-450 uppercase'

  const socials = (
    <>
      <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className={link}>
        {site.instagramHandle}
      </a>
      <a href="#" className={link}>
        Facebook
      </a>
      <a href="#" className={link}>
        YouTube
      </a>
    </>
  )

  return (
    <footer className="bg-forest-950 text-moss-300">
      {/* ——— Mobile ——— */}
      <div className="px-5 pt-8 pb-[108px] text-[16px] leading-[1.7] lg:hidden">
        <div className="font-serif text-[22px] text-cream">{t('common.orgName')}</div>
        <div className="mt-1 text-[14px] tracking-[.1em] text-moss-450 uppercase">
          {t('common.registeredTrust')}
        </div>
        <div className="mt-5 border-t border-forest-900 pt-5">
          <FooterContact t={t} />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-forest-900 pt-5">
          <Link href="/treks" className={link}>{t('nav.treks')}</Link>
          <Link href="/#programmes" className={link}>{t('nav.youthCamps')}</Link>
          <Link href="/#programmes" className={link}>{t('nav.familyCamps')}</Link>
          <Link href="/#programmes" className={link}>{t('nav.outbound')}</Link>
          <Link href="/#why" className={link}>{t('footer.aboutTrust')}</Link>
          <a href="#" className={link}>{t('footer.trustReportShort')}</a>
          <Link href="/#safety" className={link}>{t('footer.safetyPolicy')}</Link>
          <a href="#" className={link}>{t('footer.refundsShort')}</a>
          <a href="#" className={link}>{t('footer.privacy')}</a>
          <Link href="/contact" className={link}>{t('footer.contact')}</Link>
        </div>
        <div className="mt-5 flex gap-4 border-t border-forest-900 pt-5 text-[15px]">
          {socials}
        </div>
      </div>

      {/* ——— Desktop ——— */}
      <div className="mx-auto hidden max-w-[1440px] px-14 pt-[72px] pb-11 text-[17px] leading-[1.8] lg:block">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">
          <div>
            <div className="font-serif text-[26px] text-cream">{t('common.orgName')}</div>
            <div className="mt-1.5 text-[13px] tracking-[.14em] text-moss-450 uppercase">
              {t('common.registeredTrust')}
            </div>
            <div className="mt-[22px]">
              {site.addressLines[0]}
              <br />
              {site.addressLines[1]}, {site.addressRegion.replace(', India', '')}
            </div>
            <div className="mt-3.5">
              <FooterContact t={t} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className={colLabel}>{t('footer.colProgrammes')}</div>
            <Link href="/treks" className={link}>{t('nav.treks')}</Link>
            <Link href="/#programmes" className={link}>{t('nav.youthCamps')}</Link>
            <Link href="/#programmes" className={link}>{t('nav.familyCamps')}</Link>
            <Link href="/#programmes" className={link}>{t('footer.schoolOutbound')}</Link>
            <Link href="/#programmes" className={link}>{t('footer.corporateOutbound')}</Link>
          </div>
          <div className="flex flex-col">
            <div className={colLabel}>{t('footer.colTrust')}</div>
            <Link href="/#why" className={link}>{t('footer.aboutUs')}</Link>
            <a href="#" className={link}>{t('footer.trustReport')}</a>
            <Link href="/#why" className={link}>{t('footer.plantation')}</Link>
            <Link href="/contact" className={link}>{t('footer.volunteer')}</Link>
          </div>
          <div className="flex flex-col">
            <div className={colLabel}>{t('footer.colPolicies')}</div>
            <Link href="/#safety" className={link}>{t('footer.safetyPolicy')}</Link>
            <a href="#" className={link}>{t('footer.refunds')}</a>
            <a href="#" className={link}>{t('footer.privacy')}</a>
            <Link href="/contact" className={link}>{t('footer.contact')}</Link>
          </div>
        </div>
        <div className="mt-12 flex justify-between border-t border-forest-900 pt-[22px] text-[15px]">
          <span>{t('footer.copyright')}</span>
          <span className="flex gap-5">{socials}</span>
        </div>
      </div>
    </footer>
  )
}
