import { notFound } from "next/navigation";
import { ToolsSection } from "@/components/ToolsSection";
import { JourneySection } from "@/components/journey/JourneySection";
import { ContactSection } from "@/components/contact/ContactSection";
import { FloatingNavbar } from "@/components/FloatingNavbar";

export const dynamic = "force-dynamic";

/**
 * Development-Only Full Portfolio Component Inspection Suite
 *
 * Production Security Gate:
 * - In development (npm run dev), freely accessible.
 * - In production (next start / deployment), gated on the server-side via `ENABLE_DEV_PREVIEW`.
 * - Returns 404 notFound() when access is not permitted.
 */
export default function PreviewAllPage() {
  const isDev = process.env.NODE_ENV === "development";
  const isAllowed = process.env.ENABLE_DEV_PREVIEW === "true";

  if (!isDev && !isAllowed) {
    notFound();
  }

  return (
    <div className="bg-[var(--color-bg)] min-h-screen">
      <FloatingNavbar />
      <div className="pt-20 space-y-8">
        <ToolsSection />
        <JourneySection />
        <ContactSection />
      </div>
    </div>
  );
}
