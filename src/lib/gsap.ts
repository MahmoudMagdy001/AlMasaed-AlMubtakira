import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Register plugins safely on the client side only (avoiding SSR issues during SSG build)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

/**
 * Standardized animation tokens for subtle, professional motion.
 * Grounded in brand aesthetics: gentle, reliable, and premium.
 */
export const ANIMATION_TOKENS = {
  duration: {
    instant: 0.01,
    fast: 0.25,
    normal: 0.45,
    slow: 0.65,
    hero: 0.8,
  },
  ease: {
    out: 'power2.out',
    smooth: 'power3.out',
    inOut: 'power2.inOut',
  },
  distance: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
  },
  stagger: {
    fast: 0.05,
    normal: 0.08,
    slow: 0.12,
  },
} as const

/**
 * Checks if user prefers reduced motion (client-side safe).
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export { gsap, ScrollTrigger, useGSAP }
