import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion, ANIMATION_TOKENS } from '@/lib/gsap'

export interface HeroAnimationOptions {
  /** Selector for elements to animate in stagger order */
  selector?: string
  /** Stagger interval in seconds */
  stagger?: number
  /** Y displacement in pixels */
  distance?: number
  /** Base duration in seconds */
  duration?: number
  /** Delay before animation begins */
  delay?: number
  /** Dependencies to re-trigger the animation when dynamic content loads */
  dependencies?: unknown[]
}

/**
 * Hook to apply a refined entrance animation to hero headings, supporting text, and CTAs.
 * Scoped to the container ref; cleans up automatically on unmount.
 */
export const useHeroAnimation = <T extends HTMLElement = HTMLDivElement>(
  options: HeroAnimationOptions = {},
) => {
  const containerRef = useRef<T>(null)
  const {
    selector = '[data-hero-element]',
    stagger = ANIMATION_TOKENS.stagger.slow,
    distance = ANIMATION_TOKENS.distance.md,
    duration = ANIMATION_TOKENS.duration.hero,
    delay = 0.05,
    dependencies = [],
  } = options

  useGSAP(
    () => {
      if (typeof window === 'undefined') return
      const isReduced = prefersReducedMotion()

      const elements = gsap.utils.toArray<HTMLElement>(selector)
      if (!elements || elements.length === 0) return

      if (isReduced) {
        gsap.set(elements, { opacity: 1, y: 0 })
        return
      }

      gsap.from(elements, {
        opacity: 0,
        y: distance,
        duration,
        stagger,
        delay,
        ease: ANIMATION_TOKENS.ease.out,
        clearProps: 'transform,opacity',
      })
    },
    { scope: containerRef, dependencies },
  )

  return containerRef
}
