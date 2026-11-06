import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import BatchPhotos from '@/components/Trek/BatchPhotos'
import type { Album as AlbumData } from '@/lib/albums'
import { sahyadri } from '@/lib/treks'

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] tracking-[.14em] text-moss-500 uppercase lg:text-[12px]">{children}</div>
}

/** A programme that has run, kept as a record under the gallery: the cover,
 *  the batch's photos, the plan day by day and what it included. No dates on
 *  the plan and no booking button — it closes by pointing at what runs now. */
export default function Album({ album }: { album: AlbumData }) {
  const t = useTranslations('albumPage')
  const p = album.programme

  return (
    <>
      <section className="relative h-[280px] lg:h-[560px]">
        <Image
          src={album.cover}
          alt={album.coverAlt}
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[50%_70%]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,42,23,.55)_0%,rgba(12,42,23,0)_34%,rgba(12,42,23,.86)_78%)] lg:hidden"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(12,42,23,.82)_0%,rgba(12,42,23,.35)_48%,rgba(12,42,23,0)_72%)] lg:block"
        />
        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-[1440px] flex-col justify-between px-5 pt-4 pb-5 lg:px-14 lg:pt-7 lg:pb-16">
            <Link
              href="/gallery"
              className="group self-start text-[12px] font-semibold tracking-[.12em] uppercase [text-shadow:0_1px_8px_rgba(12,42,23,.6)] lg:text-[13px]"
            >
              {/* Colour on the span: the global `a { color }` rule outranks utilities on the anchor itself. */}
              <span className="text-cream group-hover:text-sand-300">← {t('back')}</span>
            </Link>
            <div className="lg:w-[640px]">
              <div className="text-[12px] tracking-[.14em] text-sand-300 uppercase lg:text-[13px] lg:tracking-[.16em]">
                {t('eyebrow', { where: album.where, when: album.when })}
              </div>
              <h1 className="m-0 mt-1.5 font-serif text-[34px] leading-[1.06] font-normal text-cream lg:mt-4 lg:text-[64px] lg:leading-[1.04]">
                {album.title}
              </h1>
              <p className="mt-2 mb-0 max-w-[520px] text-[15px] leading-[1.5] text-moss-200 lg:mt-4 lg:text-[19px] lg:leading-[1.55]">
                {album.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-cream">
        <div className="mx-auto max-w-[1440px] px-5 pt-7 pb-8 lg:px-14 lg:pt-[72px] lg:pb-20">
          <div className="lg:flex lg:items-baseline lg:justify-between lg:gap-10">
            <h2 className="m-0 font-serif text-[22px] leading-[1.15] font-normal text-forest-950 lg:text-[28px]">
              {t('photosHeading', { from: p.photosFrom })}
            </h2>
            <p className="mt-1 mb-0 text-[14px] text-ink-soft lg:mt-0 lg:text-[16px]">{t('photosSub')}</p>
          </div>
          <BatchPhotos photos={p.photos} label={t('photosLabel')} />

          <div className="mt-8 grid gap-8 lg:mt-16 lg:grid-cols-[1fr_440px] lg:gap-14">
            <div>
              <Label>{t('planLabel')}</Label>
              <h2 className="m-0 mt-1.5 font-serif text-[22px] leading-[1.2] font-normal text-forest-950 lg:text-[28px]">
                {p.timeline.heading}
              </h2>
              <ol className="mt-4 border-b border-line">
                {p.timeline.blocks.map((block) => (
                  <li
                    key={`${block.day}-${block.title}`}
                    className="grid grid-cols-[96px_1fr] gap-x-4 border-t border-line py-4 lg:grid-cols-[150px_1fr] lg:gap-x-6 lg:py-5"
                  >
                    <span className="text-[14px] leading-[1.4] font-semibold text-ink lg:text-[16px]">
                      {t('day', { n: block.day })}
                      {block.label && <span className="block font-normal text-moss-500">{block.label}</span>}
                    </span>
                    <span>
                      <span className="block font-serif text-[19px] leading-[1.2] text-forest-950 lg:text-[23px]">
                        {block.title}
                      </span>
                      <ul className="mt-2 flex flex-col gap-1.5">
                        {block.items.map((item) => (
                          <li
                            key={item.time + item.what}
                            className="grid grid-cols-[80px_1fr] gap-x-3 text-[14px] leading-[1.5] lg:grid-cols-[96px_1fr] lg:text-[16px]"
                          >
                            <span className="font-semibold text-ember-800">{item.time}</span>
                            <span className="text-ink-soft">{item.what}</span>
                          </li>
                        ))}
                      </ul>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="self-start rounded-[4px] border border-line bg-cream-hover p-5 lg:p-7">
              <Label>{t('factsLabel')}</Label>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-serif text-[30px] leading-none text-forest-950 lg:text-[36px]">{p.price}</span>
                <span className="text-[14px] text-ink-soft lg:text-[15px]">{p.priceNote}</span>
              </div>
              <ul className="mt-4 flex flex-col gap-1.5 text-[15px] leading-[1.45] text-ink">
                {p.included.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden className="w-4 flex-none font-bold text-forest-800">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
                {p.notIncluded.map((item) => (
                  <li key={item} className="flex gap-2.5 text-ink-soft">
                    <span aria-hidden className="w-4 flex-none font-bold text-ember-800">
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 border-t border-line pt-4">
                <Label>{t('difficultyLabel')}</Label>
                <p className="mt-1 mb-0 text-[15px] leading-[1.5] text-ink">{p.difficulty}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-forest-950">
        <div className="mx-auto max-w-[1440px] px-5 py-14 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:px-14 lg:py-24">
          <div>
            <div className="text-[13px] tracking-[.16em] text-sand-300 uppercase">{t('nextEyebrow')}</div>
            <h2 className="m-0 mt-3 font-serif text-[32px] leading-[1.08] font-normal text-cream lg:text-[56px]">
              {sahyadri.weekend.title}
            </h2>
            <p className="mt-2 mb-0 max-w-[640px] text-[16px] leading-[1.5] text-moss-300 lg:text-[18px]">
              {sahyadri.weekend.kind}
            </p>
          </div>
          <Link
            href={`/treks/${sahyadri.slug}`}
            className="mt-6 block flex-none rounded-[3px] bg-ember-600 px-5 py-[15px] text-center text-[17px] font-semibold whitespace-nowrap hover:bg-ember-800 lg:mt-0 lg:inline-block lg:px-[38px] lg:py-[17px]"
          >
            {/* Colour on the span: the global `a { color }` rule outranks utilities on the anchor. */}
            <span className="text-cream">{t('nextCta')}</span>
          </Link>
        </div>
      </section>
    </>
  )
}
