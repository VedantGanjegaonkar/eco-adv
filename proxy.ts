import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './src/i18n/routing'

const handleI18nRouting = createIntlMiddleware(routing)

export function proxy(request: Parameters<typeof handleI18nRouting>[0]) {
  return handleI18nRouting(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|studio|.*\\..*).*)'],
}
