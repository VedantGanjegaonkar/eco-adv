/**
 * Photo albums from programmes that have run, shown under the gallery.
 *
 * Ratangad + Harishchandragad was the Sahyadri weekend through October 2026.
 * When the Sandhan Valley weekend replaced it on /treks/sahyadri (6 Nov 2026)
 * its photos, plan and facts moved here unchanged, so the page reads as a
 * record of what ran rather than an offer. Images are written by
 * scripts/prepare-trek-assets.mjs into src/assets/gallery/<slug>/.
 */
import type { StaticImageData } from 'next/image'
import type { WeekendProgramme } from '@/lib/treks'
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

export type Album = {
  slug: string
  title: string
  /** “Sahyadri · October 2026” — region and when it ran. */
  where: string
  when: string
  /** One or two sentences under the title. */
  summary: string
  cover: StaticImageData
  coverAlt: string
  /** The programme as it ran: photos, plan, price and inclusions. */
  programme: WeekendProgramme
}

export const ratangadAlbum: Album = {
  slug: 'ratangad-harishchandragad',
  title: 'Ratangad + Harishchandragad',
  where: 'Sahyadri, Maharashtra',
  when: 'October 2026',
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

export const albums: Album[] = [ratangadAlbum]

export function findAlbum(slug: string): Album | undefined {
  return albums.find((album) => album.slug === slug)
}
