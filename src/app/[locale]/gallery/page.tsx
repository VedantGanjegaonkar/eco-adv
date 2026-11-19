import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Header from '@/components/Common/Header'
import Footer from '@/components/Common/Footer'
import GalleryIndex from '@/components/Gallery/GalleryIndex'
import { galleryIndex } from '@/lib/albums'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'galleryIndex.meta' })
  const cover = galleryIndex[0].cover
  return {
    // The root layout sets no metadataBase; the OG image needs an absolute URL.
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [{ url: cover.src, width: cover.width, height: cover.height, alt: galleryIndex[0].coverAlt }],
    },
  }
}

/** The photo gallery: one card per trek that has run, newest first. */
export default async function GalleryPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Header />
      <main>
        <GalleryIndex />
      </main>
      <Footer />
    </>
  )
}
