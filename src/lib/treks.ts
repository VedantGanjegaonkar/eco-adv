/**
 * Trek programmes by region. One region this season — Sahyadri, Maharashtra —
 * with the October lakeside weekend and the three one-day treks under it.
 *
 * Images are static imports (written by scripts/prepare-trek-assets.mjs) so
 * next/image gets width, height and a blur placeholder for free. Prices and
 * WhatsApp keywords match the posters and the departures table in content.ts.
 *
 * The weekend carries its detailed timeline (opened from a button); `itinerary`
 * on each one-day trek is still an empty slot, rendered only once filled.
 */
import type { StaticImageData } from 'next/image'
import cover from '@/assets/treks/sahyadri/cover.jpg'
import dayNaneghat from '@/assets/treks/sahyadri/day-naneghat.jpg'
import dayHarish from '@/assets/treks/sahyadri/day-harishchandragad.jpg'
import dayAadrai from '@/assets/treks/sahyadri/day-aadrai.jpg'
import weekendHook from '@/assets/treks/sahyadri/weekend-1-hook.jpg'
import weekendNight from '@/assets/treks/sahyadri/weekend-2-night.jpg'
import weekendRatangad from '@/assets/treks/sahyadri/weekend-3-ratangad.jpg'
import weekendOffer from '@/assets/treks/sahyadri/weekend-4-offer.jpg'

export type DayTrek = {
  key: string
  title: string
  /** One line under the title — the poster's own strapline. */
  kind: string
  poster: StaticImageData
  posterAlt: string
  price: string
  advance: string
  whatsAppKeyword: string
  itinerary: string[]
}

export type WeekendCard = { src: StaticImageData; alt: string }

export type TimelineItem = { time: string; what: string }

/** One stretch of the trip — a day, or a named part of one. `day` counts from
 *  the trek's Day 1, so Day 0 is the departure night; dates come from the batch. */
export type TimelineBlock = { day: number; label?: string; title: string; items: TimelineItem[] }

/** A departure. `day1` is the ISO date of the trek's Day 1 — the weekday of
 *  every block follows from it, so B1 (Fri–Sat) and the Sat–Sun batches need
 *  no special casing. */
export type Batch = { id: string; day1: string }

export type Timeline = {
  heading: string
  sub: string
  batches: Batch[]
  blocks: TimelineBlock[]
  included: string[]
}

export type WeekendProgramme = {
  title: string
  kind: string
  dur: string
  when: string
  price: string
  advance: string
  whatsAppKeyword: string
  /** The campaign cards, in carousel order. */
  cards: WeekendCard[]
  /** Generic timings (no dates) — every October weekend runs to this shape. */
  timeline: Timeline
}

export type TrekRegion = {
  slug: string
  title: string
  region: string
  summary: string
  cover: StaticImageData
  coverAlt: string
  weekend: WeekendProgramme
  dayTreks: DayTrek[]
}

export const sahyadri: TrekRegion = {
  slug: 'sahyadri',
  title: 'Sahyadri',
  region: 'Maharashtra',
  summary:
    'Three one-day treks and a two-day lakeside weekend in the Western Ghats, overnight train both ways from Vadodara.',
  cover,
  coverAlt:
    'The Harishchandragad ridge at dusk — yellow wildflowers in the foreground, cliffs falling away into the valley',

  weekend: {
    title: 'Ratangad + Harishchandragad',
    kind: '2 forts, 1 lake · Bhandardara lakeside camping',
    dur: '2 days · 1 night',
    when: 'Every weekend of October',
    price: '₹4,250',
    advance: '₹1,800 advance',
    whatsAppKeyword: 'RATANGAD',
    cards: [
      {
        src: weekendHook,
        alt: 'The Sahyadri Weekend — 2 forts, 1 lake. Harishchandragad + Ratangad, 2D/1N, ₹4,250, Vadodara and Surat departure',
      },
      {
        src: weekendNight,
        alt: 'Your night in the Sahyadris — the Bhandardara lakeside camp timetable: reach camp at 4pm, sunset by the water, campfire and BBQ, sunrise boating, depart for Ratangad at 8am',
      },
      {
        src: weekendRatangad,
        alt: 'Day 2, Ratangad — a trekker beside the fort pond under a bare tree, yellow flowers in bloom',
      },
      {
        src: weekendOffer,
        alt: '₹4,250 all in, per person: return transport from Vadodara and Surat, lakeside tent camping at Bhandardara with boating, forest entry, all meals',
      },
    ],
    timeline: {
      heading: 'Harishchandragad + Bhandardara camping + Ratangad',
      sub: '2 forts. 1 lakeside night. The Sahyadris in full bloom.',
      // Day 1 dates. B1 rides the 2 Oct holiday (Fri–Sat); the rest are Sat–Sun.
      batches: [
        { id: 'B1', day1: '2026-10-02' },
        { id: 'B2', day1: '2026-10-10' },
        { id: 'B3', day1: '2026-10-17' },
        { id: 'B4', day1: '2026-10-24' },
      ],
      blocks: [
        {
          day: 0,
          label: 'Departure night',
          title: 'Out of Gujarat',
          items: [
            { time: '9:30 PM', what: 'Departure from Vadodara (tempo traveller)' },
            { time: '11:30 PM', what: 'Departure from Surat' },
          ],
        },
        {
          day: 1,
          title: 'Harishchandragad',
          items: [
            { time: '7:30 AM', what: 'Freshen-up halt near Nashik' },
            { time: '9:30 AM', what: 'Reach base village · breakfast & change' },
            { time: '10:00 AM', what: 'Start trek (easy, approx. 1.5 hrs)' },
            { time: '11:30 AM', what: 'Reach the top' },
            {
              time: '12:00 PM',
              what: 'Explore Konkankada cliff and Kedareshwar Cave (the Shivling standing on a single pillar)',
            },
            { time: '2:30 PM', what: 'Start descent' },
            { time: '3:30 PM', what: 'Lunch at base' },
            { time: '4:30 PM', what: 'Depart for Bhandardara lakeside camp' },
          ],
        },
        {
          day: 1,
          label: 'Evening',
          title: 'Your night in the Sahyadris',
          items: [
            { time: '6:00 PM', what: 'Reach camp · tea & snacks with sunset by the water' },
            { time: '8:00 PM', what: 'Campfire, BBQ & music' },
            { time: '9:30 PM', what: 'Dinner under the open sky' },
          ],
        },
        {
          day: 2,
          title: 'Ratangad',
          items: [
            { time: '6:30 AM', what: 'Sunrise boating at Bhandardara dam lake' },
            { time: '7:30 AM', what: 'Breakfast' },
            { time: '8:30 AM', what: 'Depart for Ratangad' },
            { time: '9:30 AM', what: 'Start trek (7 km, approx. 3 hrs)' },
            { time: '12:30 PM', what: 'Reach the fort top' },
            { time: '1:00 PM', what: 'Soak in the Jewel of the Sahyadris, carpeted in blooming wildflowers' },
            { time: '3:30 PM', what: 'Start descent' },
            { time: '5:00 PM', what: 'Reach base · late lunch / early dinner' },
            { time: '6:00 PM', what: 'Necklace Waterfall on the way back (complimentary)' },
            { time: '7:00 PM', what: 'Start return journey to Gujarat' },
          ],
        },
        {
          day: 3,
          label: 'Morning',
          title: 'Home',
          items: [
            { time: '4:30 AM', what: 'Reach Surat' },
            { time: '6:30 AM', what: 'Reach Vadodara, with a phone full of photos and a mind full of memories' },
          ],
        },
      ],
      included: ['Tent stay', 'Campfire', 'BBQ', 'Dinner', 'Breakfast', 'Boating', 'Travel'],
    },
  },

  dayTreks: [
    {
      key: 'naneghat',
      title: 'Naneghat Reverse Waterfall',
      kind: 'Sahyadri · the monsoon wind blows the fall back up the cliff',
      poster: dayNaneghat,
      posterAlt:
        'Naneghat Reverse Waterfall story poster — spray blown back up the misty cliff; ₹2,850 per person all inclusive, ex Vadodara',
      price: '₹2,850',
      advance: '₹1,100 advance',
      whatsAppKeyword: 'NANEGHAT',
      itinerary: [],
    },
    {
      key: 'harishchandragad',
      title: 'Harishchandragad · Konkankada',
      kind: 'Clouds at Konkankada above, the Kedareshwar cave below',
      poster: dayHarish,
      posterAlt:
        'Harishchandragad story poster — the Kedareshwar cave shivling standing in water, with an inset of the Konkankada cliff; ₹2,850 per person all inclusive, ex Vadodara',
      price: '₹2,850',
      advance: '₹1,100 advance',
      whatsAppKeyword: 'HARISH',
      itinerary: [],
    },
    {
      key: 'aadrai',
      title: 'Aadrai Jungle Trek',
      kind: 'Malshej · rainforest and the top of Kalu falls',
      poster: dayAadrai,
      posterAlt:
        'Aadrai Jungle Trek story poster — trekkers in rain jackets under a dripping forest canopy; ₹2,850 per person all inclusive, ex Vadodara',
      price: '₹2,850',
      advance: '₹1,100 advance',
      whatsAppKeyword: 'AADRAI',
      itinerary: [],
    },
  ],
}

export const trekRegions: TrekRegion[] = [sahyadri]

export function findTrekRegion(slug: string): TrekRegion | undefined {
  return trekRegions.find((region) => region.slug === slug)
}
