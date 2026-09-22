import { useTranslations } from 'next-intl'

function Stat({
  value,
  suffix,
  label,
}: {
  value: React.ReactNode
  suffix?: string
  label: string
}) {
  return (
    <div>
      <div>
        <span className="font-serif text-[26px] text-forest-950 lg:text-[32px]">{value}</span>
        {suffix && <span className="text-[16px] text-moss-500 lg:text-[17px]">{suffix}</span>}
      </div>
      <div className="text-[14px] text-ink-soft lg:text-[15px]">{label}</div>
    </div>
  )
}

export default function TrustStrip() {
  const t = useTranslations('trust')

  return (
    <section className="border-b border-line bg-cream">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 items-center gap-x-3.5 gap-y-[18px] p-5 lg:grid-cols-5 lg:gap-8 lg:px-14 lg:py-[26px]">
        <Stat value="4.8" suffix="/5" label={t('google')} />
        <Stat value="4.7" suffix="/5" label={t('justdial')} />
        <div>
          <div className="font-serif text-[26px] text-forest-950 lg:text-[32px]">
            <span className="lg:hidden">{t('yearsValue')}</span>
            <span className="hidden lg:inline">{t('yearsValueLong')}</span>
          </div>
          <div className="text-[14px] text-ink-soft lg:text-[15px]">{t('years')}</div>
        </div>
        <Stat value={t('trekkersValue')} label={t('trekkers')} />
        {/* Trees: full-width footnote on mobile, fifth stat on desktop */}
        <div className="col-span-2 border-t border-line pt-3.5 text-[15px] text-ink-soft lg:hidden">
          {t('treesMobile')}
        </div>
        <div className="hidden lg:block">
          <Stat value={t('treesValue')} label={t('trees')} />
        </div>
      </div>
    </section>
  )
}
