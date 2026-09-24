import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Header from '@/components/Common/Header'
import Footer from '@/components/Common/Footer'
import GalleryMotionProvider from '@/components/Gallery/GalleryMotionProvider'
import ScrubHero from '@/components/Gallery/ScrubHero'
import RiseField from '@/components/Gallery/RiseField'
import CloseBand from '@/components/Gallery/CloseBand'
import { naneghat } from '@/lib/gallery'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'galleryPage.meta' })
  const poster = naneghat.posters.wave
  return {
    // The root layout sets no metadataBase; the OG image needs an absolute URL.
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'article',
      images: [{ url: poster.src, width: poster.width, height: poster.height, alt: t('ogAlt') }],
    },
  }
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Header />
      <main>
        <GalleryMotionProvider>
          <ScrubHero />
          <RiseField />
        </GalleryMotionProvider>
        <CloseBand />
      </main>
      <Footer />
    </>
  )
}
