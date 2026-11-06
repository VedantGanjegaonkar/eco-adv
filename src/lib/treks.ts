/**
 * Trek programmes by region. One region this season — Sahyadri, Maharashtra —
 * with the Sahyadri Weekend (Sandhan Valley + Harishchandragad, two November
 * batches) and the three one-day treks under it. The October Ratangad weekend
 * it replaced lives on as a photo album: see src/lib/albums.ts.
 *
 * Images are static imports (written by scripts/prepare-trek-assets.mjs) so
 * next/image gets width, height and a blur placeholder for free. Prices and
 * WhatsApp keywords match the posters and the departures table in content.ts.
 * The weekend's facts and wording follow the 6 Nov 2026 carousel and caption
 * (EASS — The Sahyadri Weekend Website KT) — keep them in step with the ads.
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
import wkKokankada from '@/assets/treks/sahyadri/weekend-01-kokankada.jpg'
import wkBonfire from '@/assets/treks/sahyadri/weekend-02-bonfire.jpg'
import wkJeep from '@/assets/treks/sahyadri/weekend-04-jeep.jpg'
import wkLakeRoad from '@/assets/treks/sahyadri/weekend-05-lake-road.jpg'
import wkCanyon from '@/assets/treks/sahyadri/weekend-07-canyon.jpg'
import wkLight from '@/assets/treks/sahyadri/weekend-08-light.jpg'
import wkWalls from '@/assets/treks/sahyadri/weekend-09-walls.jpg'
import wkRaft from '@/assets/treks/sahyadri/weekend-10-raft.jpg'

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
  /** The phone header's meta line, after the duration — “by train from Vadodara”. */
  kindShort?: string
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
  /** The questions WhatsApp would otherwise get — water, shoes, age. */
  goodToKnow?: string[]
  packing?: string[]
  /** Booking terms, one line each. */
  booking: string[]
  /** Which batch the photos are from — “the 24–25 Oct batch”. */
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
    'Three one-day treks and the Sahyadri Weekend — Kokankada, a lakeside camp at Bhandardara and the Sandhan canyon — overnight train both ways from Vadodara.',
  cover,
  coverAlt:
    'Two tents on dry grass at the Bhandardara lakeside camp in early light, three people talking on chairs between them, the lake and the Sahyadri ranges behind',

  weekend: {
    title: 'Sandhan Valley + Harishchandragad',
    kind: 'The Sahyadri Weekend · Kokankada, a Bhandardara lakeside camp, the Sandhan canyon · by train, ex-Vadodara',
    kindShort: 'by train from Vadodara',
    dur: '2 days · 1 night',
    price: '₹4,250',
    priceNote: 'per person, all in, Vadodara to Vadodara',
    advance: '₹1,800 advance',
    whatsAppKeyword: 'SANDHAN',
    // The first four lines match card 8 and the caption word for word.
    included: [
      'Train tickets Vadodara–Dadar (sleeper) both ways + all local transport, incl. Dadar–Kasara local',
      'Open-jeep transfers between Kasara, the trailheads and the lake',
      'Lakeside tent camping at Bhandardara + bonfire',
      'Forest entry charges',
      'Campsite meals (Day 1 dinner, Day 2 breakfast)',
      'Amruteshwar temple visit + boating',
      'EASS trek lead and local guides throughout',
    ],
    notIncluded: [
      'All other meals outside the campsite — we halt for food on the trek and during travel; what you eat is your own choice',
      'Anything not listed above',
    ],
    mealsNote:
      'Only Saturday night’s dinner and Sunday morning’s breakfast at the camp are included. We halt for food on the trek and during travel; what you eat there is your own choice and cost.',
    difficulty:
      'Moderate. Two trek days back to back — a steep climb on Day 1, scrambling and water on Day 2. Minimum age 15.',
    goodToKnow: [
      'You will get wet on Day 2 — the crossings are waist-deep. Carry a change of clothes in a dry bag.',
      'Trek shoes with grip, not sneakers.',
      'Board at Vadodara, at Surat (joins the train en route) or at Dadar (Mumbai participants join and leave there).',
      '8 of you per batch. Solo trekkers welcome — no strangers by Sunday.',
    ],
    packing: [
      'Backpack 30–40 L with a rain cover',
      '2 L water, electrolytes',
      'Trek shoes, plus sandals or floaters for the water sections',
      'Quick-dry clothes for Day 2, a change for the night, a warm layer for the lakeside camp',
      'Dry bag or zip-locks for phone, wallet and ID',
      'Head torch, power bank',
      'Cap, sunscreen, personal medicines',
      'Government ID — for the train and the forest check-posts',
    ],
    booking: [
      '8 seats per batch — small batch, no exceptions',
      '₹1,800 advance via UPI, balance on the train',
      'Both batches close when full',
    ],
    photosFrom: 'the 24–25 Oct batch',
    photos: [
      {
        src: wkKokankada,
        caption: 'Sat · Kokankada, Harishchandragad',
        alt: 'A trekker’s feet hanging over the edge of Kokankada, a sharp ridge and pinnacle falling away into the haze far below',
      },
      {
        src: wkBonfire,
        caption: 'Sat night · Grilled over the coals',
        alt: 'A trekker on a chair by the bonfire at the Bhandardara camp at night, holding up a grilled skewer',
      },
      {
        src: wkJeep,
        caption: 'Sun · Open jeep along the lake',
        alt: 'Trekkers riding in an open jeep above Bhandardara lake, green fields and a flat-topped hill behind them',
      },
      {
        src: wkLakeRoad,
        caption: 'Sun · The road to Sandhan',
        alt: 'View from the bonnet of a yellow jeep along a lakeside road, dry grass on one side and the lake and hills ahead',
      },
      {
        src: wkCanyon,
        caption: 'Sun · Into the valley of shadows',
        alt: 'Three trekkers on the boulders of the Sandhan canyon floor, sheer rock walls on both sides and a shaft of light at the far end',
      },
      {
        src: wkLight,
        caption: 'Sun · Light through the canyon',
        alt: 'A trekker in a cap standing on a rock in a shallow stream inside Sandhan Valley, sunlight pouring through the gap in the walls above',
      },
      {
        src: wkWalls,
        caption: 'Sun · 200 ft of rock either side',
        alt: 'Sandhan Valley from the canyon floor — two towering rock walls, a narrow strip of sky and small figures with arms raised among the boulders',
      },
      {
        src: wkRaft,
        caption: 'Sun · The raft crossing',
        alt: 'A trekker on a small barrel raft pulled along a guide rope through a deep pool between the Sandhan canyon walls, a guide waist-deep in the water',
      },
    ],
    timeline: {
      heading: 'Harishchandragad + Bhandardara camping + Sandhan Valley',
      // Day 1 dates. Two batches, both Sat–Sun, out on the Friday-night sleeper.
      batches: [
        { id: 'B1', day1: '2026-11-14', seats: { total: 8 } },
        { id: 'B2', day1: '2026-11-21', seats: { total: 8 } },
      ],
      // Only the outbound train has clock times; the rest is by part of day
      // until the return train and the day's timings are confirmed.
      blocks: [
        {
          day: 0,
          label: 'Departure night',
          title: 'Out of Gujarat',
          summary: 'Ekta Nagar–Dadar SF Express (12928) leaves Vadodara (BRC) at 10:50 PM; Surat boards at 12:50 AM',
          items: [
            {
              time: '10:50 PM',
              what: 'Ekta Nagar–Dadar SF Express (12928) leaves Vadodara (BRC) — sleeper, overnight to Dadar. Meals in transit are your own.',
            },
            { time: '12:50 AM', what: 'Surat participants board the same train at Surat (ST)' },
          ],
        },
        {
          day: 1,
          title: 'Harishchandragad',
          summary: 'Local to Kasara, open jeeps to the trailhead, the climb and Kokankada',
          items: [
            { time: 'Early AM', what: 'Arrive Dadar — Mumbai participants join here · local train Dadar → Kasara (about 2 hrs)' },
            { time: 'Morning', what: 'Open jeeps from Kasara to the Harishchandragad trailhead · start the climb' },
            {
              time: 'Afternoon',
              what: 'Walk out to Kokankada, the concave cliff — sit with your feet over a ~1,000 m drop. The last stop of the day.',
            },
          ],
        },
        {
          day: 1,
          label: 'Evening',
          title: 'Your night in the Sahyadris',
          summary: 'Lakeside tents at Bhandardara, bonfire & grill',
          items: [
            { time: 'Evening', what: 'Jeeps to Bhandardara · tents pitched on the lakeside, nothing between you and the water' },
            {
              time: 'Night',
              what: 'Campsite dinner — bhakri, pithla, dal-rice — then the bonfire and whatever you grill over the coals',
            },
          ],
        },
        {
          day: 2,
          title: 'Sandhan Valley',
          summary: 'The canyon — rope, raft, waist-deep · Amruteshwar temple and boating',
          items: [
            { time: 'Early AM', what: 'Breakfast at camp · open jeeps along the lake to the Sandhan trailhead' },
            {
              time: 'Morning',
              what: 'Descend into the valley of shadows — a canyon about 200 ft deep and 3 ft wide. Rope sections, boulder scrambles and the water crossings: rope, raft, waist-deep.',
            },
            { time: 'Afternoon', what: 'The ancient Amruteshwar temple at the base of Ratangad · boating on the lake' },
            {
              time: 'Evening',
              what: 'Jeeps to Kasara · local to Dadar (Mumbai participants leave here) · the sleeper home',
            },
          ],
        },
        {
          day: 3,
          label: 'Morning',
          title: 'Home',
          summary: 'Into Vadodara on Monday morning — in office with a story',
          items: [{ time: 'Morning', what: 'Arrive Vadodara. In office Monday with a story.' }],
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
