import { getRequestConfig } from 'next-intl/server'
import { routing, type Locale } from './routing'

type Messages = Record<string, unknown>

/**
 * Deep-merges locale messages over the English catalog so that partially
 * translated locales (the design translates the hero only — the rest of the
 * page intentionally stays English, matching the prototype's behaviour)
 * fall back to English instead of rendering missing-message errors.
 */
function deepMerge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base }
  for (const key of Object.keys(override)) {
    const b = base[key]
    const o = override[key]
    if (
      b && o &&
      typeof b === 'object' && typeof o === 'object' &&
      !Array.isArray(b) && !Array.isArray(o)
    ) {
      out[key] = deepMerge(b as Messages, o as Messages)
    } else {
      out[key] = o
    }
  }
  return out
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale: Locale = routing.locales.includes(requested as Locale)
    ? (requested as Locale)
    : routing.defaultLocale

  const en = (await import('../../messages/en.json')).default as Messages
  const messages =
    locale === 'en'
      ? en
      : deepMerge(en, (await import(`../../messages/${locale}.json`)).default as Messages)

  return { locale, messages }
})
