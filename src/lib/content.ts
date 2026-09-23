/**
 * Homepage content, lifted from the Claude Design handoff
 * (eco-adventure-homepage-design/project/EAS Homepage.dc.html).
 *
 * Departures/safety/quotes are plain data here — the natural next step is to
 * source departures from Sanity (`trek` schema), keeping these shapes.
 */

export const site = {
  name: 'Eco Adventure & Sports Society',
  phone: '+919375776651',
  phoneDisplay: '93757 76651',
  whatsAppUrl: 'https://wa.me/919375776651',
  email: 'info@ecoadventure.org',
  instagramHandle: '@eco_adventure_sports',
  instagramUrl: 'https://www.instagram.com/eco_adventure_sports/',
  addressLines: ['322 samanvay silver mujmahuda akota,', 'Vadodara 390022'],
  addressRegion: 'Gujarat, India',
  ngoReg: 'NGO E/8306',
} as const

/** Asset paths mirror the handoff bundle's uploads/ folder — drop the real
 *  photos from the bundle into public/uploads/ over the placeholders. */
export const img = {
  logo: '/uploads/eco_adventure_logo_white_bg.png',
  hero: '/uploads/waterfall-hero-webp.webp',
  youth: '/uploads/treeplanation.webp',
  trek: '/uploads/waterfall-hero-webp.webp',
  family: '/uploads/campsite.webp',
  corporate: '/uploads/treeplanation.webp',
  why: '/uploads/campsite.webp',
} as const

export type Grade = 'Easy' | 'Moderate' | 'Challenging'

export const gradeColor: Record<Grade, string> = {
  Easy: 'text-grade-easy',
  Moderate: 'text-grade-moderate',
  Challenging: 'text-ember-800',
}

export type Departure = {
  date: string
  dest: string
  kind: string
  dur: string
  grade: Grade
  price: string
  spots: string
  /** Keyword parents send on WhatsApp, per the trek posters. */
  whatsAppKeyword: string
}

export const departures: Departure[] = [
  {
    date: 'Thu 1 OCT 2026',
    dest: 'Harishchandragad & Ratangad',
    kind: 'Flowering special · with bhandhardhara lake side camping',
    dur: '2 days · 1 night',
    grade: 'Moderate',
    price: '₹4,250',
    spots: '₹1,800 advance',
    whatsAppKeyword: 'RATANGAD',
  },
  {
    date: 'Sat 22 Aug',
    dest: 'Harishchandragad',
    kind: 'Sahyadri · Kedareshwar cave and Konkankada cliff',
    dur: '1 day',
    grade: 'Easy',
    price: '₹2,850',
    spots: '₹1,100 advance',
    whatsAppKeyword: 'HARISH',
  },
  {
    date: 'Sat 29 Aug',
    dest: 'Aadrai Jungle Trek',
    kind: 'Malshej, Sahyadri · rainforest and the top of Kalu falls',
    dur: '1 day',
    grade: 'Easy',
    price: '₹2,850',
    spots: '₹1,100 advance',
    whatsAppKeyword: 'AADRAI',
  },
]

export const departureFilters = ['All', 'Treks', 'Youth', 'Family', 'Outbound'] as const

export type SafetyItem = { n: string; t: string; d: string }

export const safety: SafetyItem[] = [
  {
    n: '01',
    t: 'Certified guides',
    d: 'Every camp is led by an NIM/ABVIMAS-certified instructor with wilderness first-responder training.',
  },
  {
    n: '02',
    t: '1:8 adult-to-child ratio',
    d: 'Never higher. Two female staff on every camp with girls attending.',
  },
  {
    n: '03',
    t: 'First aid on site',
    d: 'Full kit, oxygen at altitude, and a named nearest hospital with travel time for each location.',
  },
  {
    n: '04',
    t: 'Insurance included',
    d: 'Accident and evacuation cover for every participant, included in the fee — no add-on.',
  },
  {
    n: '05',
    t: 'Daily message home',
    d: 'One photo and a status message to the parent group each evening.',
  },
  {
    n: '06',
    t: 'Written safety policy',
    d: 'Weather call-off, headcount and buddy rules are published, not improvised.',
  },
]

export type Quote = { text: string; who: string; prog: string }

export const quotes: Quote[] = [
  {
    text: 'I was worried about sending a twelve-year-old to the Himalayas. They sent a message every evening, and she came home able to pitch a tent alone.',
    who: 'Nayana Patel, Vadodara',
    prog: 'Youth Camp, Dhobi Village',
  },
  {
    text: 'No upselling, no hidden costs. The price on the website was the price we paid, and the accounts were shown to us when we asked.',
    who: 'Jignesh Shah',
    prog: 'Family Camp, Pavagadh',
  },
  {
    text: 'We have sent three batches of Std IX students. The ratio and the paperwork are the reason we keep going back.',
    who: 'Meera Joshi, coordinator',
    prog: 'School Outbound, Bakor',
  },
]

/** wa.me link with a prefilled keyword, mirroring the “WhatsApp ‘HARISH’”
 *  call-to-action on the society's trek posters. */
export function whatsAppLink(keyword?: string) {
  return keyword ? `${site.whatsAppUrl}?text=${encodeURIComponent(keyword)}` : site.whatsAppUrl
}
