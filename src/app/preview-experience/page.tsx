import { notFound } from "next/navigation";
import { JourneySection } from "@/components/journey/JourneySection";

export const dynamic = "force-dynamic";

/**
 * Development-Only Journey & Experience Inspection Suite
 *
 * Production Security Gate:
 * - In development (npm run dev), freely accessible.
 * - In production (next start / deployment), gated on the server-side via `ENABLE_DEV_PREVIEW`.
 * - Returns 404 notFound() when access is not permitted.
 */
export default function PreviewExperiencePage() {
  const isDev = process.env.NODE_ENV === "development";
  const isAllowed = process.env.ENABLE_DEV_PREVIEW === "true";

  if (!isDev && !isAllowed) {
    notFound();
  }

  return (
    <div className="bg-[var(--color-bg)] min-h-screen py-12">
      <JourneySection />
    </div>
  );
}
