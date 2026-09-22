import type { Metadata, Viewport } from 'next'
import { Newsreader, Mukta_Vaani } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import '@/app/globals.css'

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  weight: ['400', '500'],
})

const muktaVaani = Mukta_Vaani({
  variable: '--font-mukta',
  subsets: ['latin', 'gujarati'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Eco Adventure & Sports Society — Camps & Treks, Vadodara',
  description:
    'Youth camps, family camps and treks across Gujarat and the Himalayas since 2016 — run at cost by a registered non-profit trust (NGO E/8306), with the surplus going back into plantation and village work.',
  keywords:
    'trekking, camping, youth camps, adventure, Vadodara, Gujarat, Sahyadri, Himalayas, non-profit',
  openGraph: {
    title: 'Eco Adventure & Sports Society',
    description:
      'Camps and treks in Gujarat and the Himalayas since 2016, run at cost by a registered non-profit trust.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0C2A17',
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${newsreader.variable} ${muktaVaani.variable}`}
    >
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
