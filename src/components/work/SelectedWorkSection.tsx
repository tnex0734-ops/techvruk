"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  Layers,
  Code2,
  CheckCircle2,
  X,
  Compass,
  Monitor,
  Palette,
  Eye,
} from "lucide-react";
import {
  aiProjects,
  uxUiProjects,
  type AiProject,
  type UxUiProject,
  type SubProjectPart,
} from "@/lib/content";
import { BrandIcon } from "@/components/BrandIcon";

type FilterCategory = "all" | "ai" | "ux";

interface UnifiedProject {
  id: string;
  number: string;
  type: "ai" | "ux";
  title: string;
  tagline: string;
  category: string;
  description: string;
  tools: string[];
  link: string;
  screenshot: string;
  status?: string;
  highlights: string[];
  hasModal?: boolean;
  subProjects?: SubProjectPart[];
}

// Map factual content into a unified editorial structure
const unifiedProjects: UnifiedProject[] = [
  ...aiProjects.map((p, idx) => ({
    id: p.id,
    number: `0${idx + 1}`,
    type: "ai" as const,
    title: p.title,
    tagline: p.tagline,
    category: p.category,
    description: p.description,
    tools: p.tools,
    link: p.link,
    screenshot: p.screenshot,
    status: p.status,
    highlights: p.highlights,
  })),
  ...uxUiProjects.map((p, idx) => ({
    id: `ux-${p.number}`,
    number: `0${aiProjects.length + idx + 1}`,
    type: "ux" as const,
    title: p.title,
    tagline: p.subtitle,
    category: p.category,
    description: p.subtitle,
    tools: p.hasModal ? ["Miro", "Stitch"] : ["Figma"],
    link: p.link || "#",
    screenshot: p.coverImage,
    status: p.title.includes("Equifiz") ? "Shipped in Production" : undefined,
    highlights: p.hasModal
      ? [
          "Complete gaming UX research & player personas on Miro",
          "Interactive gaming UI prototype built with Stitch",
          "Comprehensive design tokens & micro-interactions",
        ]
      : p.title.includes("Palmist")
      ? [
          "Complete redesign from AI aesthetic to human-crafted touch",
          "Design system architecture documented inside Figma",
          "Refined typography scales & conversion-focused user flows",
        ]
      : [
          "Fintech production application for equity & asset workflows",
          "Shipped in live customer production environment",
          "Complex data density tables and financial interaction models",
        ],
    hasModal: p.hasModal,
    subProjects: p.subProjects,
  })),
];

export function SelectedWorkSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<UnifiedProject | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCaseStudy(null);
      }
    };
    if (selectedCaseStudy) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCaseStudy]);

  const filteredProjects = unifiedProjects.filter((project) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "ai") return project.type === "ai";
    if (activeFilter === "ux") return project.type === "ux";
    return true;
  });

  const flagshipProject = unifiedProjects.find((p) => p.id === "devatlas");
  const secondaryProjects = filteredProjects.filter((p) =>
    activeFilter === "all" ? p.id !== "devatlas" : true
  );

  return (
    <section
      id="work"
      aria-label="Selected Work & Case Studies"
      className="relative py-20 sm:py-28 bg-[var(--color-bg)] scroll-mt-20 border-t border-[var(--color-border-subtle)]"
    >
      {/* ── Backward Compatibility Anchors for Navigation Links ── */}
      <span id="products" className="absolute -top-24" aria-hidden="true" />
      <span id="ux-ui" className="absolute -top-24" aria-hidden="true" />
      <span id="figma" className="absolute -top-24" aria-hidden="true" />

      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header (Restrained Editorial Architecture) ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[var(--color-border)]">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--color-red)]" aria-hidden="true" />
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-red)]">
                02 // SELECTED WORK & CASE STUDIES
              </p>
            </div>
            <h2 className="display-font text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-[var(--color-ink)] tracking-tight leading-[1.08]">
              Crafted Systems, AI Platforms & Shipped Interfaces.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
              A curated collection of developer workspaces, generative AI studios, and design systems designed and built across Next.js, TypeScript, and Figma.
            </p>
          </div>

          {/* ── Interactive Category Filters with Shared Spring Layout ── */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex items-center p-1 rounded-xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] self-start lg:self-end overflow-x-auto max-w-full"
          >
            {(
              [
                { id: "all", label: "ALL", count: 7 },
                { id: "ai", label: "AI PRODUCTS", count: 4 },
                { id: "ux", label: "UX / UI", count: 3 },
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
                      layoutId="workActiveTabPill"
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

        {/* ── Flagship Showcase: Dev Atlas (Displayed in "All" view) ── */}
        {activeFilter === "all" && flagshipProject && (
          <div className="mt-12">
            <div className="group relative rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-white via-white to-[var(--color-bg-subtle)] p-6 sm:p-8 lg:p-10 shadow-xs hover:border-[var(--color-red)]/40 hover:shadow-lg transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Dossier Column */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-md bg-[var(--color-red-light)] text-[var(--color-red)] font-mono text-xs font-bold tracking-wider uppercase">
                        {flagshipProject.number} // FLAGSHIP
                      </span>
                      {flagshipProject.status && (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-mono text-[11px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {flagshipProject.status}
                        </span>
                      )}
                    </div>

                    <h3 className="display-font text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-[var(--color-ink)] group-hover:text-[var(--color-red)] transition-colors">
                      {flagshipProject.title}
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-[var(--color-red)] font-semibold mt-1">
                      {flagshipProject.tagline}
                    </p>

                    <p className="mt-4 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                      {flagshipProject.description}
                    </p>

                    {/* Verifiable Feature Highlights */}
                    <div className="mt-6 space-y-2">
                      {flagshipProject.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-ink-subtle)]">
                          <CheckCircle2 size={16} className="text-[var(--color-red)] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack & Action CTA */}
                  <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {flagshipProject.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 rounded-md bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-xs font-mono font-medium text-[var(--color-ink-subtle)]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <motion.a
                      href={flagshipProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-red)] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-[var(--color-red-deep)] transition-all cursor-pointer"
                      aria-label={`Launch ${flagshipProject.title} (opens in new tab)`}
                    >
                      <span>Launch Live Workspace</span>
                      <ArrowUpRight size={14} />
                    </motion.a>
                  </div>
                </div>

                {/* Right Architectural Preview Mockup */}
                <div className="lg:col-span-7">
                  <div className="relative rounded-xl border border-[var(--color-border)] bg-[#171515] overflow-hidden shadow-md">
                    {/* Mock Browser Header */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#1F1C1D] border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] block" />
                      </div>
                      <span className="font-mono text-[11px] text-white/50 tracking-wide select-none">
                        devatlas-lake.vercel.app
                      </span>
                      <span className="w-6" />
                    </div>

                    {/* Screenshot Container with subtle hover zoom */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                      <img
                        src={flagshipProject.screenshot}
                        alt="Dev Atlas Developer OS Dashboard preview"
                        className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        loading="lazy"
                        decoding="async"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Secondary Curated Work Grid ── */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {secondaryProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-white p-6 sm:p-7 shadow-2xs hover:border-[var(--color-red)]/50 hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Header Metadata */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[var(--color-red)] bg-[var(--color-red-light)] px-2.5 py-0.5 rounded-md">
                      {project.number}
                    </span>
                    <span className="font-mono text-xs font-bold uppercase text-[var(--color-muted)]">
                      {project.category}
                    </span>
                  </div>
                  {project.status && (
                    <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-[var(--color-ink-subtle)] font-mono text-[10px] font-bold uppercase">
                      {project.status}
                    </span>
                  )}
                </div>

                {/* Screenshot Framing */}
                <div className="relative aspect-[16/10] rounded-xl border border-[var(--color-border)] overflow-hidden bg-[var(--color-bg-subtle)] mb-5">
                  <img
                    src={project.screenshot}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  {project.hasModal && (
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-[var(--color-ink)]/90 text-white font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-sm backdrop-blur-xs">
                      <Sparkles size={12} className="text-[var(--color-red)]" />
                      <span>UX Research + UI Prototype</span>
                    </div>
                  )}
                </div>

                {/* Content Dossier */}
                <h3 className="display-font text-xl sm:text-2xl font-black uppercase text-[var(--color-ink)] group-hover:text-[var(--color-red)] transition-colors">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-[var(--color-red)] font-semibold mt-1">
                  {project.tagline}
                </p>
                <p className="mt-3 text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                  {project.description}
                </p>

                {/* Feature Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="mt-4 space-y-1.5">
                    {project.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[var(--color-ink-subtle)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)] mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="mt-6 pt-5 border-t border-[var(--color-border)] flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1">
                  {project.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-[var(--color-ink-subtle)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {project.hasModal ? (
                  <motion.button
                    type="button"
                    data-case-study-trigger="true"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCaseStudy(project)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--color-red)] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-[var(--color-red-deep)] transition-all cursor-pointer"
                  >
                    <span>Inspect Case Study</span>
                    <ArrowUpRight size={13} />
                  </motion.button>
                ) : (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-red)] hover:text-[var(--color-red)] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    aria-label={`Open ${project.title} (opens in new tab)`}
                  >
                    <span>
                      {project.type === "ai"
                        ? "Launch Live App"
                        : "Inspect Figma File"}
                    </span>
                    <ArrowUpRight size={13} />
                  </motion.a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── NEXUS GG DUAL CASE STUDY MODAL (Miro UX + Stitch UI) ── */}
      <AnimatePresence>
        {selectedCaseStudy && selectedCaseStudy.subProjects && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedCaseStudy(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedCaseStudy.title} Case Study`}
              initial={{ scale: 0.96, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--color-border)] bg-white p-6 sm:p-8 shadow-2xl"
            >
              {/* Modal Top Header */}
              <div className="flex items-start justify-between border-b border-[var(--color-border)] pb-5 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-white bg-[var(--color-red)] px-2.5 py-0.5 rounded-md">
                      {selectedCaseStudy.number}
                    </span>
                    <span className="font-mono text-xs font-bold uppercase text-[var(--color-muted)]">
                      {selectedCaseStudy.category} // DUAL ARTIFACTS
                    </span>
                  </div>
                  <h3 className="display-font text-2xl sm:text-3xl font-black uppercase text-[var(--color-ink)]">
                    {selectedCaseStudy.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[var(--color-muted)]">
                    Explore both the foundational UX Research architecture on Miro and the interactive design system prototype on Stitch with Google:
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(null)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:bg-[var(--color-red)] hover:text-white hover:border-[var(--color-red)] transition-all cursor-pointer"
                  aria-label="Close case study dialog"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Dual Sub-projects Showcase Grid */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedCaseStudy.subProjects.map((part) => (
                  <div
                    key={part.type}
                    className="flex flex-col justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-5 shadow-xs"
                  >
                    <div>
                      {/* Artwork Cover */}
                      <div className="w-full flex items-center justify-center p-3 rounded-lg bg-white border border-[var(--color-border-subtle)] overflow-hidden">
                        <img
                          src={part.coverImage}
                          alt={part.title}
                          className="w-full max-h-[220px] object-contain"
                          loading="lazy"
                        />
                      </div>

                      <div className="mt-4">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--color-red)]">
                          {part.badge}
                        </span>
                        <h4 className="text-lg font-black uppercase text-[var(--color-ink)] mt-1">
                          {part.title}
                        </h4>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--color-muted)]">
                          {part.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
                      <motion.a
                        href={part.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[var(--color-red)] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-[var(--color-red-deep)] transition-all cursor-pointer"
                        aria-label={`Open ${part.title} (opens in new tab)`}
                      >
                        <BrandIcon
                          name={part.type === "ux" ? "Miro" : "Stitch"}
                          className="h-4 w-4"
                        />
                        <span>{part.actionLabel}</span>
                      </motion.a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-muted)]">
                <span>NEXUS GG ECOSYSTEM // DUAL FLOW</span>
                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(null)}
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
