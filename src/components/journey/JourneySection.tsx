"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Trophy,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Award,
  X,
  ShieldCheck,
  Building2,
  Users,
  Compass,
} from "lucide-react";
import {
  experience,
  achievements,
  type ExperienceItem,
  type Achievement,
} from "@/lib/content";

type JourneyFilter = "all" | "experience" | "awards";

export function JourneySection() {
  const [activeFilter, setActiveFilter] = useState<JourneyFilter>("all");
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Close modal on Escape key and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedAchievement(null);
      }
    };
    if (selectedAchievement) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedAchievement]);

  // Reverse chronological experience: UI/UX Hyderabad (Present) down to RamScript (Jan 2026)
  const orderedExperience: ExperienceItem[] = [
    experience[3], // UI/UX Hyderabad (May 2026 - Present)
    experience[2], // The Regiment (Jun 2026 - Sep 2026)
    experience[1], // Acquiq (May 2026 - Jul 2026)
    experience[0], // RamScript (Jan 2026 - Feb 2026)
  ].filter(Boolean);

  return (
    <section
      id="journey"
      aria-label="Professional Journey, Experience & Achievements"
      className="relative py-20 sm:py-28 bg-[var(--color-bg)] scroll-mt-20 border-t border-[var(--color-border-subtle)]"
    >
      {/* ── Backward-Compatible Anchors for Navbar & Drawer Deep Links ── */}
      <span id="experience" className="absolute -top-24" aria-hidden="true" />
      <span id="achievements" className="absolute -top-24" aria-hidden="true" />

      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header (Editorial Architecture) ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[var(--color-border)]">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--color-red)]" aria-hidden="true" />
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-red)]">
                03 // PROFESSIONAL JOURNEY &amp; ARCHIVE
              </p>
            </div>
            <h2 className="display-font text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-[var(--color-ink)] tracking-tight leading-[1.08]">
              Career Progression, Guild Leadership &amp; Honors.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
              The physical archive in the 3D room's wardrobe opens into this chronological ledger: product design internships, AI hiring UX infrastructure, design guild leadership at UI/UX Hyderabad, and four collegiate hackathon victories.
            </p>
          </div>

          {/* ── Category Filters with Spring Indicator ── */}
          <div
            role="tablist"
            aria-label="Filter journey by category"
            className="flex items-center p-1 rounded-xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] self-start lg:self-end overflow-x-auto max-w-full"
          >
            {(
              [
                { id: "all", label: "ALL", count: 8 },
                { id: "experience", label: "EXPERIENCE", count: 4 },
                { id: "awards", label: "HONORS", count: 4 },
              ] as const
            ).map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-3 sm:px-4 py-2 rounded-lg font-mono text-xs font-bold tracking-wider uppercase whitespace-nowrap shrink-0 transition-colors cursor-pointer select-none ${
                    isActive
                      ? "text-white"
                      : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="journeyActiveTabPill"
                      className="absolute inset-0 rounded-lg bg-[var(--color-red)] shadow-xs"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-black/5 text-[var(--color-muted)]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/*  PART 1: PROFESSIONAL EXPERIENCE TIMELINE                      */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {(activeFilter === "all" || activeFilter === "experience") && (
          <div className="mt-14">
            <div className="flex items-center justify-between pb-6 border-b border-[var(--color-border-subtle)]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[var(--color-red-light)] text-[var(--color-red)]">
                  <Briefcase size={16} />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]">
                    PROFESSIONAL ROLES &amp; DESIGN LEADERSHIP
                  </h3>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">
                    Reverse-chronological progression from startup UI/UX internships to community leadership.
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs text-[var(--color-muted)] hidden sm:block">
                4 VERIFIED ROLES
              </span>
            </div>

            {/* Experience Dossier Grid / Timeline Cards */}
            <div className="mt-8 space-y-6">
              {orderedExperience.map((item, index) => {
                const isCurrent = item.date.toLowerCase().includes("present");
                return (
                  <div
                    key={`${item.company}-${index}`}
                    className="group relative rounded-2xl border border-[var(--color-border)] bg-white p-6 sm:p-8 shadow-2xs hover:border-[var(--color-red)]/50 hover:shadow-md transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      {/* Date & Organization Pillar */}
                      <div className="lg:col-span-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-mono text-xs font-bold text-[var(--color-red)] bg-[var(--color-red-light)] px-2.5 py-0.5 rounded-md">
                              0{index + 1}
                            </span>
                            {isCurrent && (
                              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-mono text-[11px] font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                CURRENT ROLE
                              </span>
                            )}
                          </div>

                          <h4 className="display-font text-xl sm:text-2xl font-black uppercase text-[var(--color-ink)] group-hover:text-[var(--color-red)] transition-colors">
                            {item.company}
                          </h4>
                          <p className="font-mono text-xs sm:text-sm text-[var(--color-red)] font-semibold mt-1">
                            {item.role}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[var(--color-muted)]">
                          <Calendar size={13} className="text-[var(--color-muted)]" />
                          <span>{item.date}</span>
                        </div>
                      </div>

                      {/* Role Responsibilities & Core Focus */}
                      <div className="lg:col-span-8 flex flex-col justify-between h-full pt-4 lg:pt-0 lg:border-l lg:border-[var(--color-border)] lg:pl-8">
                        <div>
                          {item.tagline && (
                            <p className="text-base font-bold text-[var(--color-ink)] leading-snug">
                              {item.tagline}
                            </p>
                          )}
                          {item.focus && (
                            <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                              Focus: <span className="text-[var(--color-ink-subtle)] font-medium">{item.focus}</span>
                            </p>
                          )}

                          {/* Specific contextual highlights */}
                          <div className="mt-4 space-y-2">
                            {item.company.includes("UI/UX Hyderabad") && (
                              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-ink-subtle)]">
                                <CheckCircle2 size={15} className="text-[var(--color-red)] shrink-0 mt-0.5" />
                                <span>Directing design sprints, curating industry design meetups, and mentoring aspiring product designers.</span>
                              </div>
                            )}
                            {item.company.includes("The Regiment") && (
                              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-ink-subtle)]">
                                <CheckCircle2 size={15} className="text-[var(--color-red)] shrink-0 mt-0.5" />
                                <span>Structured cross-platform mobile and web design systems with comprehensive design tokens.</span>
                              </div>
                            )}
                            {item.company.includes("Acquiq") && (
                              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-ink-subtle)]">
                                <CheckCircle2 size={15} className="text-[var(--color-red)] shrink-0 mt-0.5" />
                                <span>Designed recruiter interaction workflows and heuristic evaluation flows for AI hiring tools.</span>
                              </div>
                            )}
                            {item.company.includes("RamScript") && (
                              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-ink-subtle)]">
                                <CheckCircle2 size={15} className="text-[var(--color-red)] shrink-0 mt-0.5" />
                                <span>Engineered interactive product prototypes, wireframes, and standardized component libraries.</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Domain Tags */}
                        <div className="mt-6 pt-4 border-t border-[var(--color-border-subtle)] flex flex-wrap gap-1.5">
                          <span className="px-2.5 py-1 rounded-md bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-xs font-mono font-medium text-[var(--color-ink-subtle)]">
                            UI/UX Architecture
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-xs font-mono font-medium text-[var(--color-ink-subtle)]">
                            Figma Systems
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-xs font-mono font-medium text-[var(--color-ink-subtle)]">
                            User Journey Mapping
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/*  PART 2: HACKATHON ACHIEVEMENTS & TROPHY CABINET               */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {(activeFilter === "all" || activeFilter === "awards") && (
          <div className="mt-20">
            <div className="flex items-center justify-between pb-6 border-b border-[var(--color-border-subtle)]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[var(--color-red-light)] text-[var(--color-red)]">
                  <Trophy size={16} />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]">
                    COMPETITIVE HACKATHONS &amp; RECOGNITION
                  </h3>
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">
                    Championships earned under high-pressure designathons and AI hack days.
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs text-[var(--color-muted)] hidden sm:block">
                4 RECOGNITIONS
              </span>
            </div>

            {/* Achievement Cards Grid (2 columns on desktop) */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="group flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-white p-6 sm:p-7 shadow-2xs hover:border-[var(--color-red)]/50 hover:shadow-md transition-all duration-300"
                >
                  <div>
                    {/* Top Metadata */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="font-mono text-xs font-bold text-[var(--color-red)] bg-[var(--color-red-light)] px-2.5 py-0.5 rounded-md">
                        {ach.tag}
                      </span>
                      {ach.badge && (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60 font-mono text-[10px] font-bold uppercase">
                          <Award size={11} className="text-amber-600" />
                          {ach.badge}
                        </span>
                      )}
                    </div>

                    {/* Certificate Thumbnail Preview Container */}
                    <div
                      onClick={() => setSelectedAchievement(ach)}
                      className="relative aspect-[16/10] rounded-xl border border-[var(--color-border)] overflow-hidden bg-[var(--color-bg-subtle)] mb-5 cursor-pointer group/thumb"
                    >
                      <img
                        src={ach.image}
                        alt={`${ach.title} certificate / trophy`}
                        className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/thumb:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                        <span className="px-3.5 py-1.5 rounded-lg bg-[var(--color-ink)]/90 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md">
                          <span>Inspect Certificate</span>
                          <ArrowUpRight size={13} />
                        </span>
                      </div>
                    </div>

                    {/* Content Dossier */}
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="display-font text-xl sm:text-2xl font-black uppercase text-[var(--color-ink)] group-hover:text-[var(--color-red)] transition-colors">
                        {ach.title}
                      </h4>
                      {ach.date && (
                        <span className="font-mono text-xs text-[var(--color-muted)] shrink-0">
                          {ach.date}
                        </span>
                      )}
                    </div>

                    <p className="font-mono text-xs text-[var(--color-red)] font-semibold mt-1">
                      {ach.award}
                    </p>

                    <p className="text-xs text-[var(--color-muted)] font-mono mt-1">
                      Host: {ach.host}
                    </p>

                    <p className="mt-3 text-xs sm:text-sm text-[var(--color-ink-subtle)] leading-relaxed">
                      {ach.description}
                    </p>

                    {/* Verified Metrics Pills */}
                    {ach.metrics && ach.metrics.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {ach.metrics.map((m, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-xs font-mono"
                          >
                            <span className="font-black text-[var(--color-red)]">{m.value}</span>
                            <span className="text-[var(--color-muted)]">{m.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="mt-6 pt-5 border-t border-[var(--color-border)] flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] text-[var(--color-muted)]">
                      VERIFIED RECOGNITION
                    </span>

                    <motion.button
                      type="button"
                      data-cert-trigger="true"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedAchievement(ach)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-red)] hover:text-[var(--color-red)] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <span>View Certificate</span>
                      <ArrowUpRight size={13} />
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── ACCESSIBLE CERTIFICATE / TROPHY LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedAchievement.title} Certificate`}
              initial={{ scale: 0.96, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl border border-[var(--color-border)] bg-white p-6 sm:p-8 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-[var(--color-border)] pb-4 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-white bg-[var(--color-red)] px-2.5 py-0.5 rounded-md">
                      {selectedAchievement.badge || "HONOR"}
                    </span>
                    <span className="font-mono text-xs font-bold uppercase text-[var(--color-muted)]">
                      {selectedAchievement.host}
                    </span>
                  </div>
                  <h3 className="display-font text-2xl sm:text-3xl font-black uppercase text-[var(--color-ink)]">
                    {selectedAchievement.headline || selectedAchievement.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[var(--color-red)] font-mono font-semibold">
                    {selectedAchievement.award}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedAchievement(null)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:bg-[var(--color-red)] hover:text-white hover:border-[var(--color-red)] transition-all cursor-pointer"
                  aria-label="Close certificate dialog"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Full-Scale Certificate Image */}
              <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[#171515] p-2 sm:p-4 overflow-hidden flex items-center justify-center">
                <img
                  src={selectedAchievement.image}
                  alt={`${selectedAchievement.title} full certificate`}
                  className="max-h-[60vh] w-auto object-contain rounded-lg shadow-md"
                />
              </div>

              {/* Description & Metrics in Modal */}
              <div className="mt-5 text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                {selectedAchievement.description}
              </div>

              {selectedAchievement.metrics && selectedAchievement.metrics.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedAchievement.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-xs font-mono"
                    >
                      <span className="font-bold text-[var(--color-red)] mr-1.5">{m.value}</span>
                      <span className="text-[var(--color-ink-subtle)]">{m.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-muted)]">
                <span>WARDROBE ARCHIVE // VERIFIED PROOF</span>
                <button
                  type="button"
                  onClick={() => setSelectedAchievement(null)}
                  className="text-[var(--color-red)] hover:underline cursor-pointer"
                >
                  Close [ESC]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
