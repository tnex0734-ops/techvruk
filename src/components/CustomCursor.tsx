"use client";

/**
 * CustomCursor
 * Completely disabled to remove mousemove listener churn, spring physics latency,
 * and eliminate the distracting red selection ring in accordance with Section 8.
 * Restores 100% native hardware cursor performance at 0ms latency.
 */
export function CustomCursor() {
  return null;
}
