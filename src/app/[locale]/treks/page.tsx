import Header from '@/components/Common/Header'
import Footer from '@/components/Common/Footer'
import TrekCard from '@/components/Trek/TrekCard'
import { useTranslations } from 'next-intl'

export default function TreksPage() {
  const t = useTranslations()

  // Placeholder data - will be replaced with Sanity CMS data
  const sampleTreks = [
    {
      id: '1',
      title: 'Himalayan Heights Trek',
      slug: 'himalayan-heights',
      description: 'Experience the breathtaking beauty of the Himalayas with stunning mountain views and diverse wildlife.',
      duration: 7,
      difficulty: 'Moderate',
      price: 25000,
      location: 'Himachal Pradesh',
    },
    {
      id: '2',
      title: 'Western Ghats Adventure',
      slug: 'western-ghats',
      description: 'Explore lush forests, waterfalls, and scenic landscapes of the Western Ghats.',
      duration: 5,
      difficulty: 'Easy',
      price: 15000,
      location: 'Karnataka',
    },
    {
      id: '3',
      title: 'Desert Safari Experience',
      slug: 'desert-safari',
      description: 'Discover the golden sands and rich culture of the Thar Desert.',
      duration: 4,
      difficulty: 'Easy',
      price: 12000,
      location: 'Rajasthan',
    },
  ]

  return (
    <>
      <Header />
      
      {/* Hero */}
      <section className="bg-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{t('treks')}</h1>
          <p className="text-green-100">Discover our amazing trekking programs across India</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
              All Programs
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-green-700">
              {t('currentPrograms')}
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-green-700">
              {t('upcomingPrograms')}
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:border-green-700">
              {t('pastPrograms')}
            </button>
          </div>
        </div>
      </section>

      {/* Trek Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleTreks.map((trek) => (
              <TrekCard key={trek.id} {...trek} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
