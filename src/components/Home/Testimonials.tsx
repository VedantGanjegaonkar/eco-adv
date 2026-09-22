import { quotes } from '@/lib/content'

export default function Testimonials() {
  return (
    <section>
      <div className="mx-auto grid max-w-[1440px] gap-[26px] px-5 pt-8 pb-9 lg:grid-cols-3 lg:gap-14 lg:border-t lg:border-line lg:px-14 lg:pt-[76px] lg:pb-[84px]">
        {quotes.map((q) => (
          <figure key={q.who} className="m-0">
            <blockquote className="m-0 font-serif text-[22px] leading-[1.4] text-pretty text-forest-950 lg:text-[26px] lg:leading-[1.45]">
              &ldquo;{q.text}&rdquo;
            </blockquote>
            <figcaption className="mt-2.5 text-[15px] text-ink-soft lg:mt-4 lg:border-t lg:border-line lg:pt-3.5 lg:text-[16px]">
              {q.who} · {q.prog}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
