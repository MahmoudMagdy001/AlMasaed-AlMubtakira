import { useScrollReveal, type ScrollRevealOptions } from './useScrollReveal'
import { ANIMATION_TOKENS } from '@/lib/gsap'

export type HeroAnimationOptions = ScrollRevealOptions

/**
 * Hook to apply a refined entrance animation to hero headings, supporting text, and CTAs.
 * Scoped to the container ref; cleans up automatically on unmount.
 */
export const useHeroAnimation = <T extends HTMLElement = HTMLDivElement>(
  options: HeroAnimationOptions = {},
) => {
  return useScrollReveal<T>({
    selector: '[data-hero-element]',
    stagger: ANIMATION_TOKENS.stagger.slow,
    distance: ANIMATION_TOKENS.distance.md,
    duration: ANIMATION_TOKENS.duration.hero,
    delay: 0.05,
    scrollTrigger: false,
    ...options,
  })
}
