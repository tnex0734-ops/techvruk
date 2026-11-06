import { notFound } from "next/navigation";
import PreviewRoomClient from "./PreviewRoomClient";

export const dynamic = "force-dynamic";

/**
 * Development-Only 3D Room Architectural Inspection Suite
 *
 * Production Security Gate:
 * - Evaluated dynamically at request time (force-dynamic).
 * - In development (npm run dev), freely accessible.
 * - In production (next start / deployment), gated on the server-side via `ENABLE_DEV_PREVIEW`.
 * - Never leaks secret environment flags or preview controls to the public client JS bundle.
 */
export default function PreviewRoomPage() {
  const isDev = process.env.NODE_ENV === "development";
  const isAllowed = process.env.ENABLE_DEV_PREVIEW === "true";

  if (!isDev && !isAllowed) {
    notFound();
  }

  return <PreviewRoomClient />;
}
