import Image, { type StaticImageData } from 'next/image'
import { captionClass } from './StillCard'

type Props = { a: StaticImageData; b: StaticImageData; alt: string; caption: string; sizes: string }

/** Two frames six seconds apart, crossfading so the motorbike comes and goes. */
export default function SignCard({ a, b, alt, caption, sizes }: Props) {
  return (
    <figure className="m-0 flex flex-col lg:flex-row lg:gap-3">
      <figcaption className={captionClass}>{caption}</figcaption>
      <div className="relative aspect-[9/16] min-w-0 flex-1 overflow-hidden rounded-[4px] bg-line">
        <Image src={a} alt={alt} fill sizes={sizes} placeholder="blur" className="object-cover" />
        <Image
          src={b}
          alt=""
          aria-hidden
          fill
          sizes={sizes}
          placeholder="blur"
          className="animate-sign-swap object-cover motion-reduce:animate-none"
        />
      </div>
    </figure>
  )
}
