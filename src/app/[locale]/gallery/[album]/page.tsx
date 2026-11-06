import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Header from '@/components/Common/Header'
import Footer from '@/components/Common/Footer'
import Album from '@/components/Gallery/Album'
import { albums, findAlbum } from '@/lib/albums'

type Props = {
  params: Promise<{ locale: string; album: string }>
}

export function generateStaticParams() {
  return albums.map((album) => ({ album: album.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, album: slug } = await params
  const album = findAlbum(slug)
  if (!album) return {}
  const t = await getTranslations({ locale, namespace: 'albumPage' })
  const title = t('metaTitle', { title: album.title })
  return {
    // The root layout sets no metadataBase; the OG image needs an absolute URL.
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
    title,
    description: album.summary,
    openGraph: {
      title,
      description: album.summary,
      type: 'article',
      images: [
        { url: album.cover.src, width: album.cover.width, height: album.cover.height, alt: album.coverAlt },
      ],
    },
  }
}

export default async function AlbumPage({ params }: Props) {
  const { locale, album: slug } = await params
  setRequestLocale(locale)

  const album = findAlbum(slug)
  if (!album) notFound()

  return (
    <>
      <Header />
      <main>
        <Album album={album} />
      </main>
      <Footer />
    </>
  )
}
