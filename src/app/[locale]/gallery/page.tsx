import Header from '@/components/Common/Header'
import Footer from '@/components/Common/Footer'
import { useTranslations } from 'next-intl'

export default function GalleryPage() {
  const t = useTranslations()

  // Placeholder image grid
  const placeholderImages = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Photo ${i + 1}`,
    caption: 'Beautiful moments from our adventures',
  }))

  return (
    <>
      <Header />
      
      {/* Hero */}
      <section className="bg-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{t('gallery')}</h1>
          <p className="text-green-100">Explore memories from our past and current adventures</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {placeholderImages.map((image) => (
              <div
                key={image.id}
                className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="aspect-square bg-gradient-to-br from-green-300 to-green-700 flex items-center justify-center text-white text-center p-4">
                  <div>
                    <div className="text-4xl mb-2">📸</div>
                    <p className="font-semibold">{image.title}</p>
                    <p className="text-sm text-green-100 mt-2">{image.caption}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
