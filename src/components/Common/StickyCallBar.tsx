import { useTranslations } from 'next-intl'
import { site } from '@/lib/content'

/** Mobile-only sticky call/WhatsApp bar, per the design spec. */
export default function StickyCallBar() {
  const t = useTranslations('common')

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line-strong bg-cream lg:hidden">
      <a
        href={`tel:${site.phone}`}
        className="flex h-[60px] items-center justify-center gap-2 border-r border-line text-[17px] font-semibold text-forest-950 hover:text-forest-950"
      >
        {t('callUs')}
      </a>
      <a
        href={site.whatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-[60px] items-center justify-center gap-2 bg-forest-700 text-[17px] font-semibold text-cream hover:text-cream"
      >
        {t('whatsApp')}
      </a>
    </div>
  )
}
