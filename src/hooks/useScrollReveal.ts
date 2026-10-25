import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion, ANIMATION_TOKENS } from '@/lib/gsap'

export interface ScrollRevealOptions {
  /** Selector for elements inside the container to reveal */
  selector?: string
  /** Stagger time in seconds between revealed elements */
  stagger?: number
  /** Y displacement in pixels */
  distance?: number
  /** Duration of reveal in seconds */
  duration?: number
  /** Viewport scroll position to trigger reveal (e.g., 'top 88%') */
  start?: string
  /** Delay before reveal animation begins */
  delay?: number
  /** Dependencies that re-synchronize the scroll trigger (e.g., when async items load) */
  dependencies?: unknown[]
}

/**
 * Hook to apply tasteful scroll-triggered fade and rise to headings, cards, and content blocks.
 * Scoped to the container; automatically cleaned up by useGSAP on unmount.
 */
export const useScrollReveal = <T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {},
) => {
  const containerRef = useRef<T>(null)
  const {
    selector = '[data-reveal]',
    stagger = ANIMATION_TOKENS.stagger.normal,
    distance = ANIMATION_TOKENS.distance.sm,
    duration = ANIMATION_TOKENS.duration.normal,
    start = 'top 88%',
    delay = 0,
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
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          once: true,
        },
        clearProps: 'transform,opacity',
      })
    },
    {
      scope: containerRef,
      dependencies,
      revertOnUpdate: true,
    },
  )

  return containerRef
}
