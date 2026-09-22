import { setRequestLocale } from 'next-intl/server'
import Header from '@/components/Common/Header'
import Footer from '@/components/Common/Footer'
import StickyCallBar from '@/components/Common/StickyCallBar'
import Hero from '@/components/Home/Hero'
import TrustStrip from '@/components/Home/TrustStrip'
import Programmes from '@/components/Home/Programmes'
import Departures from '@/components/Home/Departures'
import WhyWeExist from '@/components/Home/WhyWeExist'
import Safety from '@/components/Home/Safety'
import Testimonials from '@/components/Home/Testimonials'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Programmes />
        <Departures />
        <WhyWeExist />
        <Safety />
        <Testimonials />
      </main>
      <Footer />
      <StickyCallBar />
    </>
  )
}
