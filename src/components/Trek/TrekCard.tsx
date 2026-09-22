'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'

interface TrekCardProps {
  id: string
  title: string
  slug: string
  image?: {
    url: string
    alt: string
  }
  description: string
  duration: number
  difficulty: string
  price: number
  location: string
}

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800',
  Moderate: 'bg-yellow-100 text-yellow-800',
  Difficult: 'bg-orange-100 text-orange-800',
  Expert: 'bg-red-100 text-red-800',
}

export default function TrekCard({ 
  slug, 
  title, 
  description, 
  duration, 
  difficulty, 
  price, 
  location,
  image 
}: TrekCardProps) {
  const locale = useLocale()

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 w-full bg-gray-200">
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt || title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>

        {/* Details */}
        <div className="space-y-2 mb-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>📍 {location}</span>
            <span>⏱️ {duration} days</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[difficulty as keyof typeof difficultyColors] || difficultyColors.Moderate}`}>
              {difficulty}
            </span>
            <span className="font-bold text-green-700">₹{price.toLocaleString()}</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/${locale}/treks/${slug}`}
          className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-lg text-center transition-colors"
        >
          Learn More →
        </Link>
      </div>
    </div>
  )
}
