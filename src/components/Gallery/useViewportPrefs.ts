'use client'

import { useSyncExternalStore } from 'react'

export const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'
export const DESKTOP_QUERY = '(min-width: 1024px)'

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } }

export function prefersStatic() {
  return (
    window.matchMedia(REDUCED_QUERY).matches ||
    Boolean((navigator as NavigatorWithConnection).connection?.saveData)
  )
}

function subscribe(onChange: () => void) {
  const queries = [window.matchMedia(REDUCED_QUERY), window.matchMedia(DESKTOP_QUERY)]
  for (const q of queries) q.addEventListener('change', onChange)
  return () => {
    for (const q of queries) q.removeEventListener('change', onChange)
  }
}

function getSnapshot() {
  let bits = 0
  if (window.matchMedia(REDUCED_QUERY).matches) bits |= 1
  if (window.matchMedia(DESKTOP_QUERY).matches) bits |= 2
  if ((navigator as NavigatorWithConnection).connection?.saveData) bits |= 4
  return bits
}

const getServerSnapshot = () => 0

/**
 * Hydration-safe viewport preferences. The server and the hydration render
 * both see all-false; the real values arrive in the immediate post-hydration
 * re-render, so markup may branch on these without mismatches.
 */
export function useViewportPrefs() {
  const bits = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return {
    reduced: (bits & 1) !== 0,
    desktop: (bits & 2) !== 0,
    saveData: (bits & 4) !== 0,
    /** reduced motion or Save-Data: no scrubbing, no autoplay */
    static: (bits & 5) !== 0,
  }
}
