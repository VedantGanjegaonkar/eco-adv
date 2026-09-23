'use client'

import { motion, useTransform, type MotionValue } from 'motion/react'
import { useViewportPrefs } from './useViewportPrefs'

type Props = {
  progress: MotionValue<number>
  /** px of upward drift across the section */
  delta: number
  className?: string
  children: React.ReactNode
}

/** Outer layer drifts with scroll; inner layer handles the one-time entrance,
 *  so the two transforms never fight. */
export default function ParallaxItem({ progress, delta, className = '', children }: Props) {
  const { reduced } = useViewportPrefs()
  // Function form keeps this on the JS path (see ScrubHero for why).
  const y = useTransform(() => (reduced ? 0 : delta - 2 * delta * progress.get()))

  return (
    <motion.div style={{ y }} className={`will-change-transform ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
