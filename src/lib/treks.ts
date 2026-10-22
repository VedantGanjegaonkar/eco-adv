/**
 * Trek programmes by region. One region this season — Sahyadri, Maharashtra —
 * with the October lakeside weekend and the three one-day treks under it.
 *
 * Images are static imports (written by scripts/prepare-trek-assets.mjs) so
 * next/image gets width, height and a blur placeholder for free. Prices and
 * WhatsApp keywords match the posters and the departures table in content.ts.
 *
 * The weekend carries its plan, price facts and detailed timeline (opened from
 * a button) plus photos from the last batch; `itinerary` on each one-day trek
 * is still an empty slot, rendered only once filled.
 */
import type { StaticImageData } from 'next/image'
import { addDays, formatRange } from '@/lib/dates'
import cover from '@/assets/treks/sahyadri/cover.jpg'
import dayNaneghat from '@/assets/treks/sahyadri/day-naneghat.jpg'
import dayHarish from '@/assets/treks/sahyadri/day-harishchandragad.jpg'
import dayAadrai from '@/assets/treks/sahyadri/day-aadrai.jpg'
import batchTemple from '@/assets/treks/sahyadri/batch-1-temple.jpg'
import batchCave from '@/assets/treks/sahyadri/batch-2-cave.jpg'
import batchRidge from '@/assets/treks/sahyadri/batch-3-ridge.jpg'
import batchKonkankada from '@/assets/treks/sahyadri/batch-4-konkankada.jpg'
import batchCampfire from '@/assets/treks/sahyadri/batch-5-campfire.jpg'
import batchBloom from '@/assets/treks/sahyadri/batch-6-bloom.jpg'
import batchWall from '@/assets/treks/sahyadri/batch-7-wall.jpg'
import batchTop from '@/assets/treks/sahyadri/batch-8-top.jpg'
import batchBoating from '@/assets/treks/sahyadri/batch-9-boating.jpg'

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

/** A photo from a batch that ran. Orientation comes from the image itself;
 *  captions name the place and the day, never the people. */
export type BatchPhoto = { src: StaticImageData; alt: string; caption: string }

export type TimelineItem = { time: string; what: string }

/** One stretch of the trip — a day, or a named part of one. `day` counts from
 *  the trek's Day 1, so Day 0 is the departure night; dates come from the batch.
 *  `summary` is the one-line version shown in the plan on the page. */
export type TimelineBlock = {
  day: number
  label?: string
  title: string
  summary: string
  items: TimelineItem[]
}

/** A departure. `day1` is the ISO date of the trek's Day 1 — the weekday of
 *  every block follows from it, so a batch on any weekday needs no special
 *  casing. `seats` is the batch size; add `booked` once seats start going and
 *  the page shows how many are left instead. */
export type Batch = { id: string; day1: string; seats?: { total: number; booked?: number } }

export type Timeline = {
  heading: string
  batches: Batch[]
  blocks: TimelineBlock[]
}

export type WeekendProgramme = {
  title: string
  kind: string
  dur: string
  price: string
  /** Qualifies the price — “per person, all-in”. */
  priceNote: string
  advance: string
  whatsAppKeyword: string
  included: string[]
  notIncluded: string[]
  /** The one line people ask about — which meals are in, which are not. */
  mealsNote: string
  difficulty: string
  /** Booking terms, one line each. */
  booking: string[]
  /** Which batch the photos are from — “the 3–4 Oct batch”. */
  photosFrom: string
  /** Photos from that batch, in itinerary order. */
  photos: BatchPhoto[]
  /** Day-by-day timings — every batch runs to this shape; dates come from the batch. */
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

/** Prefilled WhatsApp text for the weekend: the keyword, the batch dates and
 *  the two things a booking needs (name, seats), as the post asks for. */
export function weekendBookingMessage(p: WeekendProgramme, batch: Batch): string {
  const dates = formatRange(addDays(batch.day1, 0), addDays(batch.day1, 1))
  return `${p.whatsAppKeyword} · ${dates}\nName: \nSeats: `
}

export const sahyadri: TrekRegion = {
  slug: 'sahyadri',
  title: 'Sahyadri',
  region: 'Maharashtra',
  summary:
    'Three one-day treks and a two-day lakeside weekend in the Western Ghats, overnight train both ways from Vadodara.',
  cover,
  coverAlt:
    'The whole batch sitting in a row on a rock ledge at the top of Ratangad, the fort cliffs and the valley behind them',

  weekend: {
    title: 'Ratangad + Harishchandragad',
    kind: '2 forts, 1 lake · lakeside camping · by train, ex-Vadodara',
    dur: '2 days · 1 night',
    price: '₹4,250',
    priceNote: 'per person, all-in',
    advance: '₹1,800 advance',
    whatsAppKeyword: 'RATANGAD',
    included: [
      'Train Vadodara ⇄ Dadar',
      'All local transfers',
      'Tents & sleeping bags',
      'Boating on the lake',
      'Forest entry',
      'Campsite meals: Sat dinner and Sun breakfast',
    ],
    notIncluded: [
      'All other meals — on the train, on the road and at the base village — your own',
      'Personal expenses, anything not listed',
    ],
    mealsNote:
      'Only Saturday night’s dinner and Sunday morning’s breakfast at the campsite are included. Every other meal — on the train, on the road, at the base village — is your own.',
    difficulty:
      'Moderate. 3–4 hrs walking a day, a few steep and ladder sections. Beginners with basic fitness welcome. Age 18+.',
    booking: [
      '8 seats only — small batch, no exceptions',
      '₹1,800 advance via UPI, balance on the train',
      'Refundable till 20 Oct',
      'Solo trekkers welcome — most of the last batch came alone',
    ],
    photosFrom: 'the 3–4 Oct batch',
    photos: [
      {
        src: batchTemple,
        caption: 'Sat · Harishchandreshwar temple',
        alt: 'The carved stone shikhara of Harishchandreshwar temple on Harishchandragad against a blue sky, a trekker seated on its steps',
      },
      {
        src: batchCave,
        caption: 'Sat · Kedareshwar cave',
        alt: 'Kedareshwar cave on Harishchandragad — the Shivling on its single surviving pillar, trekkers wading through the knee-deep water around it',
      },
      {
        src: batchRidge,
        caption: 'Sat · Towards Konkan Kada',
        alt: 'Trekkers on a red-earth trail across the Harishchandragad plateau, yellow wildflowers on both sides and the Sahyadri ranges behind',
      },
      {
        src: batchKonkankada,
        caption: 'Sat · Konkan Kada',
        alt: 'A trekker at the edge of Konkan Kada pointing out across the valley, the concave cliff falling away behind, flowers in the foreground',
      },
      {
        src: batchCampfire,
        caption: 'Sat night · Campfire at the lake',
        alt: 'The batch around a campfire at night between the tents of the Bhandardara lakeside camp, arms up, mid-song',
      },
      {
        src: batchBloom,
        caption: 'Sun · Ratangad in bloom',
        alt: 'A trekker lying back in a slope of yellow wildflowers on Ratangad, a lone bare tree on the ridge above',
      },
      {
        src: batchWall,
        caption: 'Sun · The Sahyadri wall from Ratangad',
        alt: 'A trekker leaning on a railing on Ratangad, looking out at the layered cliffs of the Sahyadri wall',
      },
      {
        src: batchTop,
        caption: 'Sun · The batch at the top',
        alt: 'The whole batch sitting in a row on a rock ledge at the top of Ratangad, the fort cliffs and the valley behind them',
      },
      {
        src: batchBoating,
        caption: 'Sun · Sunset boating, Bhandardara',
        alt: 'The batch in a canopied boat on Bhandardara lake at sunset, the sky orange over the hills',
      },
    ],
    timeline: {
      heading: 'Harishchandragad + Bhandardara camping + Ratangad',
      // Day 1 date. One batch left this season — Sat–Sun, out on the Friday-night train.
      batches: [{ id: 'B1', day1: '2026-10-24', seats: { total: 8 } }],
      // Only the train has a clock time; the rest is by part of day until the
      // batch's own timings are confirmed.
      blocks: [
        {
          day: 0,
          label: 'Departure night',
          title: 'Out of Gujarat',
          summary: 'Ekta Nagar–Dadar Express leaves Vadodara (BRC) at 10:50 PM',
          items: [
            {
              time: '10:50 PM',
              what: 'Ekta Nagar–Dadar Express leaves Vadodara (BRC). Meals in transit are your own.',
            },
          ],
        },
        {
          day: 1,
          title: 'Harishchandragad',
          summary: 'Harishchandreshwar temple, Kedareshwar cave, Konkan Kada',
          items: [
            { time: 'Early AM', what: 'Reach Dadar · road transfer to the base village' },
            { time: 'Morning', what: 'Breakfast at base (your own), change, start the climb (approx. 1.5 hrs up)' },
            {
              time: 'Midday',
              what: 'Harishchandreshwar temple and Kedareshwar cave (the Shivling standing on a single pillar)',
            },
            {
              time: 'Afternoon',
              what: 'Konkan Kada, the cliff edge · descend · lunch at base (your own) · drive to the Bhandardara lakeside camp',
            },
          ],
        },
        {
          day: 1,
          label: 'Evening',
          title: 'Your night in the Sahyadris',
          summary: 'Lakeside tents at Bhandardara, campfire & BBQ',
          items: [
            { time: 'Evening', what: 'Reach camp · tea & snacks with sunset by the water' },
            { time: 'Night', what: 'Campfire, BBQ & music · dinner under the open sky · tents and sleeping bags' },
          ],
        },
        {
          day: 2,
          title: 'Ratangad',
          summary: 'The fort in bloom (flowering season, last few weeks) · sunset boating on the lake',
          items: [
            {
              time: 'Morning',
              what: 'Breakfast at camp · drive to the Ratangad base · start the climb (7 km, approx. 3 hrs, a few steep and ladder sections)',
            },
            {
              time: 'Afternoon',
              what: 'The fort in bloom, the last weeks of the flowering season · descend · late lunch / early dinner at base (your own)',
            },
            { time: 'Sunset', what: 'Boating on Bhandardara lake' },
            { time: 'Night', what: 'Transfer to the station · return train to Vadodara' },
          ],
        },
        {
          day: 3,
          label: 'Morning',
          title: 'Home',
          summary: 'Off the return train in Vadodara on Monday morning',
          items: [
            { time: 'Morning', what: 'Reach Vadodara, with a phone full of photos and a mind full of memories' },
          ],
        },
      ],
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
