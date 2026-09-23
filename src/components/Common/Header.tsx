'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { img, site } from '@/lib/content'
import LanguageToggle from './LanguageToggle'

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
          <LanguageToggle className="px-4 py-2 text-[15px]" />
          <a href={`tel:${site.phone}`} className="font-semibold text-cream hover:text-sand-300">
            {site.phoneDisplay}
          </a>
        </div>

        {/* Mobile: language pill + hamburger */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <LanguageToggle className="px-3.5 py-2 text-[14px]" />
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
