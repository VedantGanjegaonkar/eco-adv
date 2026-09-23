import Image, { type StaticImageData } from 'next/image'

export const captionClass =
  'order-last mt-3 font-sans text-[12px] tracking-[.14em] text-moss-500 uppercase ' +
  'lg:order-first lg:mt-0 lg:self-end lg:[writing-mode:vertical-rl] lg:rotate-180'

type Props = { src: StaticImageData; alt: string; caption: string; sizes: string }

/** A still with its caption set vertically along the left edge on desktop. */
export default function StillCard({ src, alt, caption, sizes }: Props) {
  return (
    <figure className="m-0 flex flex-col lg:flex-row lg:gap-3">
      <figcaption className={captionClass}>{caption}</figcaption>
      <div className="relative min-w-0 flex-1 overflow-hidden rounded-[4px] bg-line">
        <Image src={src} alt={alt} sizes={sizes} placeholder="blur" className="h-auto w-full" />
      </div>
    </figure>
  )
}
