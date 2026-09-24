import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import Header from '@/components/Common/Header'
import Footer from '@/components/Common/Footer'
import TrekHero from '@/components/Trek/TrekHero'
import WeekendProgramme from '@/components/Trek/WeekendProgramme'
import DayTreks from '@/components/Trek/DayTreks'
import { site } from '@/lib/content'
import { findTrekRegion, trekRegions } from '@/lib/treks'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return trekRegions.map((region) => ({ slug: region.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const trek = findTrekRegion(slug)
  if (!trek) return {}
  const title = `${trek.title}, ${trek.region} — Treks · ${site.name}`
  return {
    // The root layout sets no metadataBase; the OG image needs an absolute URL.
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
    title,
    description: trek.summary,
    openGraph: {
      title,
      description: trek.summary,
      type: 'website',
      images: [
        { url: trek.cover.src, width: trek.cover.width, height: trek.cover.height, alt: trek.coverAlt },
      ],
    },
  }
}

export default async function TrekRegionPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const trek = findTrekRegion(slug)
  if (!trek) notFound()

  return (
    <>
      <Header />
      <main>
        <TrekHero trek={trek} />
        <WeekendProgramme programme={trek.weekend} />
        <DayTreks treks={trek.dayTreks} />
      </main>
      <Footer />
    </>
  )
}
