/**
 * Small, dependency-free date helpers for programme batches. Everything runs
 * in UTC from ISO `YYYY-MM-DD` strings so server and client render the same
 * text (no locale or timezone drift, hence no hydration mismatch).
 */

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const

/** `dayIso` plus `offset` days, as a UTC Date. */
export function addDays(dayIso: string, offset: number): Date {
  const d = new Date(`${dayIso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + offset)
  return d
}

/** “Thu 1 Oct” */
export function formatDay(d: Date): string {
  return `${WEEKDAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`
}

/** “2–3 Oct”, or “31 Oct–1 Nov” across a month boundary. */
export function formatRange(from: Date, to: Date): string {
  if (from.getUTCMonth() === to.getUTCMonth()) {
    return `${from.getUTCDate()}–${to.getUTCDate()} ${MONTHS[from.getUTCMonth()]}`
  }
  return `${from.getUTCDate()} ${MONTHS[from.getUTCMonth()]}–${to.getUTCDate()} ${MONTHS[to.getUTCMonth()]}`
}
