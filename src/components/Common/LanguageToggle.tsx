'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'

/**
 * EN ⇄ ગુજરાતી pill. Mukta Vaani covers Latin and Gujarati with the same
 * metrics, so the swap changes language without reflowing the page.
 */
export default function LanguageToggle({ className = '' }: { className?: string }) {
  const t = useTranslations('common')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const nextLocale = locale === 'gu' ? 'en' : 'gu'

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      className={`cursor-pointer rounded-full border-0 bg-pill font-sans font-semibold text-forest-950 ${className}`}
      aria-label={t('langLabel')}
    >
      {t('langLabel')}
    </button>
  )
}
