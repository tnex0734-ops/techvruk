import type { Transition, Variants } from "framer-motion";

/**
 * Editorial Motion Tokens — Phase 1 Design Foundation
 * Single source of truth for motion across the portfolio.
 * Uses Framer Motion exclusively.
 */

// Snappy, high-craft editorial ease-out curve
export const editorialEase = [0.16, 1, 0.3, 1] as const;

export const transitionFast: Transition = {
  duration: 0.18,
  ease: editorialEase,
};

export const transitionNormal: Transition = {
  duration: 0.28,
  ease: editorialEase,
};

export const transitionSlow: Transition = {
  duration: 0.5,
  ease: editorialEase,
};

export const fadeInVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitionNormal,
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: transitionFast,
  },
};

export const revealFromBottom: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitionSlow,
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

