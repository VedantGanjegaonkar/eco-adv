'use client'

import { MotionConfig } from 'motion/react'

/** Keeps the motion barrel out of the server graph and honours the OS
 *  reduced-motion setting for every declarative animation beneath. */
export default function GalleryMotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
