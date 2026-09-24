import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Header from '@/components/Common/Header'
import Footer from '@/components/Common/Footer'
import TrekCard from '@/components/Trek/TrekCard'
import { trekRegions } from '@/lib/treks'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'treksPage.meta' })
  return { title: t('title'), description: t('description') }
}

export default async function TreksPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('treksPage')

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-line bg-cream">
          <div className="mx-auto max-w-[1440px] px-5 pt-5 pb-4 lg:flex lg:items-baseline lg:justify-between lg:gap-10 lg:px-14 lg:pt-7 lg:pb-6">
            <h1 className="m-0 font-serif text-[28px] leading-[1.1] font-normal text-forest-950 lg:text-[36px]">
              {t('heading')}
            </h1>
            <p className="mt-1 mb-0 max-w-[560px] text-[15px] leading-[1.45] text-ink-soft lg:mt-0 lg:text-right lg:text-[16px]">
              {t('sub')}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-5 lg:px-14 lg:pt-8 lg:pb-24">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trekRegions.map((trek) => (
              <TrekCard key={trek.slug} trek={trek} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
