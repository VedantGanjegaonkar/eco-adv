/**
 * The photo gallery: one card per trek that has run (`galleryIndex`, newest
 * first), each opening its own page under /gallery/<slug>.
 *
 * Two kinds of album page:
 *  - `programme` — a programme that has been replaced, kept as a record: its
 *    batch photos, plan and facts (Ratangad + Harishchandragad).
 *  - `story` — one batch told in order, day by day, with clips; the
 *    programme itself still runs, so the page ends at the next batch
 *    (Sandhan Valley, 14–15 Nov).
 * Naneghat has its own scroll-scrubbed page at /gallery/naneghat.
 *
 * Ratangad + Harishchandragad was the Sahyadri weekend through October 2026.
 * When the Sandhan Valley weekend replaced it on /treks/sahyadri (6 Nov 2026)
 * its photos, plan and facts moved here unchanged, so the page reads as a
 * record of what ran rather than an offer. Images are written by
 * scripts/prepare-trek-assets.mjs into src/assets/gallery/<slug>/.
 */
import type { StaticImageData } from 'next/image'
import type { WeekendProgramme } from '@/lib/treks'
import { naneghat } from '@/lib/gallery'
import cover from '@/assets/gallery/ratangad/cover.jpg'
import batchTemple from '@/assets/gallery/ratangad/batch-1-temple.jpg'
import batchCave from '@/assets/gallery/ratangad/batch-2-cave.jpg'
import batchRidge from '@/assets/gallery/ratangad/batch-3-ridge.jpg'
import batchKonkankada from '@/assets/gallery/ratangad/batch-4-konkankada.jpg'
import batchCampfire from '@/assets/gallery/ratangad/batch-5-campfire.jpg'
import batchBloom from '@/assets/gallery/ratangad/batch-6-bloom.jpg'
import batchWall from '@/assets/gallery/ratangad/batch-7-wall.jpg'
import batchTop from '@/assets/gallery/ratangad/batch-8-top.jpg'
import batchBoating from '@/assets/gallery/ratangad/batch-9-boating.jpg'
import sdKokankadaSunset from '@/assets/gallery/sandhan-14-nov/01-kokankada-sunset.jpg'
import sdLocalPoster from '@/assets/gallery/sandhan-14-nov/00-local-poster.jpg'
import sdTemple from '@/assets/gallery/sandhan-14-nov/00a-temple.jpg'
import sdKedareshwar from '@/assets/gallery/sandhan-14-nov/00b-kedareshwar-cave.jpg'
import sdCampSunrise from '@/assets/gallery/sandhan-14-nov/03-camp-sunrise.jpg'
import sdChulhaPoster from '@/assets/gallery/sandhan-14-nov/04-chulha-poster.jpg'
import sdChick from '@/assets/gallery/sandhan-14-nov/05-chick.jpg'
import sdRappelDown from '@/assets/gallery/sandhan-14-nov/06-rappel-down.jpg'
import sdRappelLip from '@/assets/gallery/sandhan-14-nov/07-rappel-lip.jpg'
import sdRappelRope from '@/assets/gallery/sandhan-14-nov/08-rappel-rope.jpg'
import sdRappelNear from '@/assets/gallery/sandhan-14-nov/09-rappel-near.jpg'
import sdCanyonGroup from '@/assets/gallery/sandhan-14-nov/10-canyon-group.jpg'
import sdSnakePoster from '@/assets/gallery/sandhan-14-nov/11-snake-poster.jpg'
import sdMoth from '@/assets/gallery/sandhan-14-nov/12-moth.jpg'
import sdForestGate from '@/assets/gallery/sandhan-14-nov/13-forest-gate.jpg'
import sdHostFamily from '@/assets/gallery/sandhan-14-nov/14-host-family.jpg'
import sdJeepDusk from '@/assets/gallery/sandhan-14-nov/15-jeep-dusk.jpg'

export type Album = {
  kind: 'programme'
  slug: string
  title: string
  /** “Sahyadri · October 2026” — region and when it ran. */
  where: string
  when: string
  /** The batch the photos are from, for the gallery card — “3–4 Oct 2026”. */
  date: string
  /** One or two sentences under the title. */
  summary: string
  cover: StaticImageData
  coverAlt: string
  /** The programme as it ran: photos, plan, price and inclusions. */
  programme: WeekendProgramme
}

export const ratangadAlbum: Album = {
  kind: 'programme',
  slug: 'ratangad-harishchandragad',
  title: 'Ratangad + Harishchandragad',
  where: 'Sahyadri, Maharashtra',
  when: 'October 2026',
  date: '3–4 Oct 2026',
  summary:
    'Two forts and a lakeside night in the last weeks of the flower season — Kedareshwar cave and Konkan Kada on Saturday, Ratangad in bloom and sunset boating on Sunday.',
  cover,
  coverAlt:
    'The whole batch sitting in a row on a rock ledge at the top of Ratangad, the fort cliffs and the valley behind them',
  programme: {
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
      // The last batch it was dated for. The album shows the plan by day
      // number, not by these dates.
      batches: [{ id: 'B1', day1: '2026-10-24', seats: { total: 8 } }],
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
}

// ---------------------------------------------------------------------------
// Story albums — one batch, in order.

/** Desktop placement in a chapter's 12-column grid, as literal Tailwind
 *  classes so the scanner sees them. Phones stack everything full-width
 *  unless `half` puts two side by side. */
export type StoryLayout = {
  col: string
  half?: boolean
  /** Overrides the `sizes` worked out from `col` — for media inside a side. */
  sizes?: string
}

export type StoryMedia =
  | {
      kind: 'photo'
      src: StaticImageData
      alt: string
      /** “17:26” — from the photo’s EXIF, IST. */
      time?: string
      caption: string
      layout: StoryLayout
    }
  | {
      kind: 'clip'
      poster: StaticImageData
      src: string
      alt: string
      time?: string
      caption: string
      /** Keeps the soundtrack: still autoplays muted, with a sound toggle. */
      sound?: boolean
      layout: StoryLayout
    }
  | {
      /** A line set large beside the media — a tagline, a hashtag. */
      kind: 'note'
      text: string
      tag?: string
      layout: StoryLayout
    }
  | {
      /** A few frames of one moment, shown side by side and numbered. */
      kind: 'sequence'
      time?: string
      caption: string
      frames: { src: StaticImageData; alt: string; label: string }[]
      layout: StoryLayout
    }

export type StoryChapter = {
  /** “Sat 14 Nov · evening” */
  when: string
  title: string
  /** One or two sentences under the title. */
  line: string
  media: StoryMedia[]
  /** Instead of one run of media: the chapter split into labelled sides, each
   *  taking `col` of the 12-column grid. Media inside a side lay out on a
   *  two-column grid (col-span-1 / col-span-2). */
  sides?: StorySide[]
}

export type StorySide = {
  /** “The spiritual side” */
  eyebrow: string
  /** “Peace for the soul” */
  title: string
  col: string
  media: StoryMedia[]
}

export type StoryAlbum = {
  kind: 'story'
  slug: string
  title: string
  where: string
  /** “14–15 Nov 2026” */
  date: string
  /** “Batch 1 · Sat 14 – Sun 15 Nov 2026” — the hero eyebrow. */
  batchLine: string
  /** ISO Day 1 of the batch; the closing band offers the next batch after it. */
  day1: string
  summary: string
  /** A few short facts under the hero — “2 days · 1 night”. */
  facts: string[]
  cover: StaticImageData
  coverAlt: string
  chapters: StoryChapter[]
}

export const sandhanNovAlbum: StoryAlbum = {
  kind: 'story',
  slug: 'sandhan-valley-14-nov-2026',
  title: 'Sandhan Valley + Harishchandragad',
  where: 'Sahyadri, Maharashtra',
  date: '14–15 Nov 2026',
  batchLine: 'Batch 1 · Sat 14 – Sun 15 Nov 2026',
  day1: '2026-11-14',
  summary:
    'A song in the Mumbai local, Kedareshwar cave and sunset at Kokankada on Saturday. On Sunday: sunrise at the lake, poha off a wood fire, a rappel down the valley wall, a snake on the rocks, and the jeep home at dusk.',
  facts: ['2 days · 1 night', 'By train, Vadodara ⇄ Vadodara', 'First rappel on this weekend'],
  cover: sdRappelDown,
  coverAlt:
    'A trekker in a red helmet and harness at the foot of the rappel wall in Sandhan Valley, arms flung wide, ropes coiled on the rock',
  chapters: [
    {
      when: 'Sat 14 Nov · early morning',
      title: 'Dadar to Kasara, by local',
      line: 'The first leg of the trek is the Mumbai local — and the batch did not wait for the mountains to start.',
      media: [
        {
          kind: 'clip',
          poster: sdLocalPoster,
          src: '/gallery/sandhan-14-nov/local.mp4',
          caption: 'Jaba jaba, in the local',
          alt: 'Clip with sound: trekkers in a crowded Mumbai local train clapping and gesturing along to a song',
          sound: true,
          layout: { col: 'lg:col-start-2 lg:col-span-4' },
        },
        {
          kind: 'note',
          text: 'With Eco Adventure, adventure never stops.',
          tag: '#JabaJabaInLocal',
          layout: { col: 'lg:col-start-7 lg:col-span-5 lg:self-center' },
        },
      ],
    },
    {
      when: 'Sat 14 Nov · afternoon to sunset',
      title: 'Two sides of Harishchandragad',
      line: 'An ancient temple and a Shivling standing in water in the afternoon; the edge of Kokankada as the sun went down.',
      media: [],
      sides: [
        {
          eyebrow: 'The spiritual side',
          title: 'Peace for the soul',
          col: 'lg:col-span-8',
          media: [
            {
              kind: 'photo',
              src: sdTemple,
              time: '15:42',
              caption: 'Harishchandreshwar temple',
              alt: 'The carved stone shikhara of the Harishchandreshwar temple against a clear blue sky, a trekker standing at its foot',
              layout: { col: 'lg:col-span-1', half: true, sizes: '(min-width:1440px) 431px, (min-width:1024px) 30vw, 50vw' },
            },
            {
              kind: 'photo',
              src: sdKedareshwar,
              time: '15:57',
              caption: 'Kedareshwar cave · the Shivling in water',
              alt: 'Inside Kedareshwar cave: the Shivling on its plinth in still, waist-deep water under the rock ceiling, trekkers wading around it',
              layout: { col: 'lg:col-span-1', half: true, sizes: '(min-width:1440px) 431px, (min-width:1024px) 30vw, 50vw' },
            },
          ],
        },
        {
          eyebrow: 'The beautiful side',
          title: 'Peace for the eyes',
          col: 'lg:col-span-4',
          media: [
            {
              kind: 'photo',
              src: sdKokankadaSunset,
              time: '17:26',
              caption: 'Sunset at Kokankada',
              alt: 'A trekker sitting on the rock at Kokankada at sunset, hair blowing in the wind, the sun low over the hazy Sahyadri ranges',
              layout: { col: 'lg:col-span-2', sizes: '(min-width:1440px) 431px, (min-width:1024px) 30vw, 100vw' },
            },
          ],
        },
      ],
    },
    {
      when: 'Sun 15 Nov · morning',
      title: 'Sunrise at the lake, breakfast off a wood fire',
      line: 'Tents on the Bhandardara shore, then poha cooked on a mud chulha before the jeeps.',
      media: [
        {
          kind: 'photo',
          src: sdCampSunrise,
          time: '07:19',
          caption: 'Sunrise at the lakeside camp',
          alt: 'The sun rising over the hills behind Bhandardara lake, an orange tent on the dry grass of the camp in the foreground',
          layout: { col: 'lg:col-span-4' },
        },
        {
          kind: 'clip',
          poster: sdChulhaPoster,
          src: '/gallery/sandhan-14-nov/chulha.mp4',
          time: '08:49',
          caption: 'Poha on the chulha',
          alt: 'Short clip: poha being stirred in a steel kadhai on a wood-fired mud chulha, haldi going in',
          layout: { col: 'lg:col-span-4', half: true },
        },
        {
          kind: 'photo',
          src: sdChick,
          time: '09:25',
          caption: 'Breakfast company',
          alt: 'A fluffy chick standing in an open palm on a village verandah, two men sitting on the bench behind',
          layout: { col: 'lg:col-span-4', half: true },
        },
      ],
    },
    {
      when: 'Sun 15 Nov · late morning',
      title: 'Down the wall',
      line: 'New on this batch: a rappel down the rock wall in Sandhan Valley, on fixed ropes with the guides.',
      media: [
        {
          kind: 'sequence',
          time: '11:13',
          caption: 'One rappel, three frames',
          frames: [
            {
              src: sdRappelLip,
              label: 'Over the lip',
              alt: 'Looking straight up the rappel wall: a small figure on the rope at the very top, trees and blue sky above',
            },
            {
              src: sdRappelRope,
              label: 'On the rope',
              alt: 'The rappel wall from below, a trekker a little way down the twin ropes against the sky',
            },
            {
              src: sdRappelNear,
              label: 'Nearly down',
              alt: 'A trekker in a red helmet near the foot of the wall, leaning back on the ropes',
            },
          ],
          layout: { col: 'lg:col-span-12' },
        },
      ],
    },
    {
      when: 'Sun 15 Nov · midday',
      title: 'Into the valley of shadows',
      line: 'Rock walls on both sides, a strip of light overhead, and company on the boulders.',
      media: [
        {
          kind: 'photo',
          src: sdCanyonGroup,
          time: '12:13',
          caption: 'The batch in the canyon',
          alt: 'Trekkers sitting and standing on a boulder deep in the Sandhan canyon, the two rock walls rising behind them to a thin strip of sky',
          layout: { col: 'lg:col-start-1 lg:col-span-4' },
        },
        {
          kind: 'clip',
          poster: sdSnakePoster,
          src: '/gallery/sandhan-14-nov/snake.mp4',
          time: '12:18',
          caption: 'A snake crossing our boulder',
          alt: 'Short clip: a banded snake sliding slowly across a sunlit boulder in the canyon',
          layout: { col: 'lg:col-start-5 lg:col-span-5 lg:self-center' },
        },
        {
          kind: 'photo',
          src: sdMoth,
          time: '12:23',
          caption: 'A moth on the rock',
          alt: 'A pale moth resting on dark rock in the canyon, its shadow sharp beside it',
          layout: { col: 'lg:col-start-10 lg:col-span-3 lg:self-end' },
        },
      ],
    },
    {
      when: 'Sun 15 Nov · evening',
      title: 'The way home',
      line: 'Out through the forest gate, goodbyes to our two-day family, then the open jeep as the light went.',
      media: [
        {
          kind: 'photo',
          src: sdForestGate,
          time: '13:13',
          caption: 'Out through the forest gate',
          alt: 'Five trekkers under the arched forest-department gate at Sandhan Valley, smoke drifting through the trees',
          layout: { col: 'lg:col-start-1 lg:col-span-3 lg:self-end' },
        },
        {
          kind: 'photo',
          src: sdHostFamily,
          time: '16:06',
          caption: 'Do din ki duniya',
          alt: 'A group selfie of the batch with the host family outside their pink-walled house',
          layout: { col: 'lg:col-start-4 lg:col-span-6 lg:self-end' },
        },
        {
          kind: 'photo',
          src: sdJeepDusk,
          time: '18:14',
          caption: 'Riding up top, at dusk',
          alt: 'Trekkers sitting on the roof of a white open jeep on a mountain road at dusk, the pinnacles of the Sahyadri behind',
          layout: { col: 'lg:col-start-10 lg:col-span-3' },
        },
      ],
    },
  ],
}

export type AnyAlbum = Album | StoryAlbum

/** Every album with a page at /gallery/<slug>. */
export const albums: AnyAlbum[] = [sandhanNovAlbum, ratangadAlbum]

export function findAlbum(slug: string): AnyAlbum | undefined {
  return albums.find((album) => album.slug === slug)
}

// ---------------------------------------------------------------------------
// The gallery index — what /gallery shows, newest first.

export type GalleryEntry = {
  slug: string
  title: string
  /** When the batch ran — “14–15 Nov 2026”. */
  date: string
  where: string
  cover: StaticImageData
  coverAlt: string
  /** object-position for the card crop, as a literal Tailwind class. */
  coverPosition?: string
}

export const galleryIndex: GalleryEntry[] = [
  {
    slug: sandhanNovAlbum.slug,
    title: sandhanNovAlbum.title,
    date: sandhanNovAlbum.date,
    where: sandhanNovAlbum.where,
    cover: sandhanNovAlbum.cover,
    coverAlt: sandhanNovAlbum.coverAlt,
    coverPosition: 'object-[50%_45%]',
  },
  {
    slug: ratangadAlbum.slug,
    title: ratangadAlbum.title,
    date: ratangadAlbum.date,
    where: ratangadAlbum.where,
    cover: ratangadAlbum.cover,
    coverAlt: ratangadAlbum.coverAlt,
  },
  {
    slug: 'naneghat',
    title: 'Naneghat Reverse Waterfall',
    date: '23 Aug 2026',
    where: 'Sahyadri, Maharashtra',
    cover: naneghat.posters.wave,
    coverAlt: 'Spray from the Naneghat reverse waterfall rising over the cliff edge',
  },
]