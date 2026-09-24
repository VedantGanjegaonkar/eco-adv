'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { img, site } from '@/lib/content'

/** Feather “phone” (MIT) — stroke icon, takes its colour from `currentColor`. */
function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

/** WhatsApp glyph (Simple Icons, CC0) — filled, takes its colour from `currentColor`. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

export default function Header() {
  const t = useTranslations()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '/treks', label: t('nav.treks') },
    { href: '/gallery', label: t('nav.gallery') },
    { href: '/#programmes', label: t('nav.youthCamps') },
    { href: '/#programmes', label: t('nav.familyCamps') },
    { href: '/#programmes', label: t('nav.outbound') },
    { href: '/#why', label: t('nav.theTrust') },
  ]

  return (
    <header className="bg-forest-950">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-[18px] py-3.5 lg:px-14 lg:py-5">
        {/* Logo + wordmark */}
        <Link href="/" className="flex items-center gap-2.5 lg:gap-3.5">
          <Image
            src={img.logo}
            alt={site.name}
            width={320}
            height={200}
            priority
            className="h-[38px] w-auto rounded-[3px] lg:h-[52px]"
          />
          <span className="leading-[1.15]">
            {/* Mobile: stacked short name — Desktop: full name + tagline */}
            <span className="block font-serif text-[17px] text-cream lg:hidden">
              {t('common.orgNameA')}
            </span>
            <span className="block text-[10px] tracking-[.14em] text-moss-400 uppercase lg:hidden">
              {t('common.orgNameB')}
            </span>
            <span className="hidden font-serif text-[21px] text-cream lg:block">
              {t('common.orgName')}
            </span>
            <span className="hidden text-[11px] tracking-[.16em] text-moss-400 uppercase lg:block">
              {t('common.headerTagline')}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-[34px] text-[17px] lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-moss-200 hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
          <span aria-hidden className="h-5 w-px bg-forest-850" />
          <a href={`tel:${site.phone}`} className="font-semibold text-cream hover:text-sand-300">
            {site.phoneDisplay}
          </a>
        </div>

        {/* Mobile: call + WhatsApp icons, then the hamburger */}
        <div className="flex items-center gap-0.5 lg:hidden">
          <a
            href={`tel:${site.phone}`}
            aria-label={t('common.callUs')}
            className="flex size-10 items-center justify-center rounded-full hover:bg-forest-900"
          >
            {/* Colour on the icon: the global `a { color }` rule outranks utilities on the anchor. */}
            <PhoneIcon className="size-[21px] text-cream" />
          </a>
          <a
            href={site.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('common.whatsApp')}
            className="flex size-10 items-center justify-center rounded-full hover:bg-forest-900"
          >
            <WhatsAppIcon className="size-[22px] text-cream" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={t('common.menu')}
            className="flex cursor-pointer flex-col gap-1 border-0 bg-transparent px-1 py-2"
          >
            <span className="block h-[1.5px] w-5 bg-cream" />
            <span className="block h-[1.5px] w-5 bg-cream" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-forest-900 px-5 pt-2 pb-5 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-forest-900 py-3 text-[17px] text-moss-200"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:${site.phone}`}
            className="mt-4 block font-semibold text-sand-300"
          >
            {site.phoneDisplay} · {t('common.officeHours')}
          </a>
        </nav>
      )}
    </header>
  )
}
