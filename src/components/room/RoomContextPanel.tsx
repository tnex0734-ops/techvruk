"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Briefcase,
  Trophy,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Layers,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { RoomInteractionTarget } from "./roomInteractionTypes";
import {
  aiProjects,
  uxUiProjects,
  experience,
  achievements,
  contactLinks,
} from "@/lib/content";

interface RoomContextPanelProps {
  activeTarget: RoomInteractionTarget;
  onClose: () => void;
}

export function RoomContextPanel({
  activeTarget,
  onClose,
}: RoomContextPanelProps) {
  const [projectCategory, setProjectCategory] = useState<"all" | "ai" | "ux">("all");
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (activeTarget) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTarget, onClose]);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 250);
  };

  if (!activeTarget) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none flex justify-end">
        
        {/* ── 1. Soft Ambient Backdrop Tint (Preserves 3D room visibility) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/20 backdrop-blur-[2px] pointer-events-auto"
          aria-hidden="true"
        />

        {/* ── 2. The Contextual Slide-Over Navigation Panel ── */}
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={
            activeTarget === "laptop"
              ? "Selected Work Panel"
              : activeTarget === "wardrobe"
              ? "Experience and Achievements Panel"
              : "Contact and Collaboration Panel"
          }
          initial={{ x: "100%", opacity: 0.8 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "100%", opacity: 0.8 }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          className="relative pointer-events-auto w-full sm:w-[480px] md:w-[520px] lg:w-[560px] h-full bg-white shadow-2xl flex flex-col border-l border-[var(--color-border)] overflow-hidden"
        >
          
          {/* Top Panel Header Bar */}
          <div className="p-4 sm:p-6 border-b border-[var(--color-border)] flex items-center justify-between gap-3 bg-[var(--color-bg-subtle)]">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[var(--color-red)] font-bold">
              <span className="w-2 h-2 rounded-full bg-[var(--color-red)] animate-pulse" />
              <span>
                {activeTarget === "laptop" && "01 // SELECTED WORK"}
                {activeTarget === "wardrobe" && "02 // EXPERIENCE & ARCHIVES"}
                {activeTarget === "door" && "03 // CONTACT & ENTRANCE"}
              </span>
            </div>

            {/* Close Button / Return to 3D Room */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close panel and return to room overview"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-white text-xs font-mono font-bold text-[var(--color-ink)] hover:text-[var(--color-red)] hover:border-[var(--color-red)] transition-all cursor-pointer shadow-2xs group"
            >
              <RotateCcw size={12} className="group-hover:-rotate-45 transition-transform" />
              <span>RETURN TO ROOM</span>
              <X size={14} className="ml-1" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-[var(--color-ink)] select-text">
            
            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  PANEL 1: LAPTOP — SELECTED WORK                               */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {activeTarget === "laptop" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-ink)]">
                    Selected Work &amp; Products
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1 font-mono">
                    AI-powered workspace tools, GenAI interfaces, and interactive design prototypes.
                  </p>
                </div>

                {/* Category Filter Tabs */}
                <div className="flex gap-1.5 p-1 rounded-lg bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-xs font-mono font-bold">
                  {(["all", "ai", "ux"] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setProjectCategory(cat)}
                      className={`flex-1 py-1.5 rounded-md text-center transition-all cursor-pointer ${
                        projectCategory === cat
                          ? "bg-[var(--color-red)] text-white shadow-xs"
                          : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                      }`}
                    >
                      {cat === "all" && "ALL (7)"}
                      {cat === "ai" && "AI PRODUCTS (4)"}
                      {cat === "ux" && "UX / UI (3)"}
                    </button>
                  ))}
                </div>

                {/* AI Products List */}
                {(projectCategory === "all" || projectCategory === "ai") && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-[var(--color-muted)]">
                      <Sparkles size={13} className="text-[var(--color-red)]" />
                      <span>AI Products</span>
                    </div>

                    {aiProjects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-4 rounded-xl border border-[var(--color-border)] bg-white hover:border-[var(--color-red)] transition-all group shadow-2xs"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm sm:text-base text-[var(--color-ink)] group-hover:text-[var(--color-red)] transition-colors">
                                {proj.title}
                              </span>
                              {proj.status && (
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase bg-[var(--color-red)]/10 text-[var(--color-red)]">
                                  {proj.status}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[var(--color-muted)] font-mono mt-0.5">
                              {proj.tagline}
                            </p>
                          </div>
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${proj.title} (opens in new tab)`}
                            className="p-2 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-red)] hover:bg-[var(--color-red)] hover:text-white transition-all text-[var(--color-muted)]"
                          >
                            <ExternalLink size={14} />
                          </a>
                        </div>

                        <p className="text-xs text-[var(--color-ink-subtle)] mt-2 leading-relaxed">
                          {proj.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {proj.tools.map((tool) => (
                            <span
                              key={tool}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-[var(--color-ink-subtle)]"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* UX / UI Projects List */}
                {(projectCategory === "all" || projectCategory === "ux") && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-[var(--color-muted)]">
                      <Layers size={13} className="text-[var(--color-red)]" />
                      <span>UX / UI Prototypes</span>
                    </div>

                    {uxUiProjects.map((proj) => (
                      <div
                        key={proj.title}
                        className="p-4 rounded-xl border border-[var(--color-border)] bg-white hover:border-[var(--color-red)] transition-all group shadow-2xs"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="font-bold text-sm sm:text-base text-[var(--color-ink)] group-hover:text-[var(--color-red)] transition-colors">
                              {proj.title}
                            </span>
                            <p className="text-xs text-[var(--color-muted)] font-mono mt-0.5">
                              {proj.category}
                            </p>
                          </div>
                          {proj.link && (
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open ${proj.title} (opens in new tab)`}
                              className="p-2 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-red)] hover:bg-[var(--color-red)] hover:text-white transition-all text-[var(--color-muted)]"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>

                        <p className="text-xs text-[var(--color-ink-subtle)] mt-2 leading-relaxed">
                          {proj.subtitle}
                        </p>

                        {/* Subproject links if available (e.g. Nexus GG Miro & Stitch) */}
                        {proj.subProjects && (
                          <div className="mt-3 space-y-1.5 pt-2 border-t border-[var(--color-border)]">
                            {proj.subProjects.map((sub) => (
                              <a
                                key={sub.title}
                                href={sub.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between text-xs font-mono p-2 rounded-md bg-[var(--color-bg-subtle)] hover:bg-[var(--color-red)]/5 hover:text-[var(--color-red)] transition-colors border border-[var(--color-border)]"
                              >
                                <span className="font-bold">{sub.actionLabel}</span>
                                <ExternalLink size={12} />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Section Bridge Link */}
                <button
                  type="button"
                  onClick={() => scrollToSection("products")}
                  className="w-full py-3 rounded-xl border border-dashed border-[var(--color-border)] text-xs font-mono font-bold uppercase text-[var(--color-muted)] hover:text-[var(--color-red)] hover:border-[var(--color-red)] hover:bg-[var(--color-red)]/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore In-Depth Project Showcase</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  PANEL 2: WARDROBE — EXPERIENCE & ACHIEVEMENTS                */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {activeTarget === "wardrobe" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-ink)]">
                    Experience &amp; Achievements
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1 font-mono">
                    Professional UI/UX internships, design leadership, and hackathon championships.
                  </p>
                </div>

                {/* Roles Timeline */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-[var(--color-muted)]">
                    <Briefcase size={13} className="text-[var(--color-red)]" />
                    <span>Experience History</span>
                  </div>

                  <div className="space-y-2.5">
                    {experience.map((item, idx) => (
                      <div
                        key={`${item.company}-${idx}`}
                        className="p-3.5 rounded-xl border border-[var(--color-border)] bg-white hover:border-[var(--color-red)] transition-all shadow-2xs"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-bold text-sm text-[var(--color-ink)]">
                            {item.company}
                          </span>
                          <span className="text-[10px] font-mono text-[var(--color-red)] font-bold">
                            {item.date}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--color-ink-subtle)] font-mono mt-0.5">
                          {item.role}
                        </p>
                        {item.tagline && (
                          <p className="text-xs text-[var(--color-muted)] mt-1.5">
                            {item.tagline} {item.focus && `— ${item.focus}`}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hackathon Awards */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-[var(--color-muted)]">
                    <Trophy size={13} className="text-[var(--color-red)]" />
                    <span>Hackathon Wins &amp; Contests</span>
                  </div>

                  <div className="space-y-2.5">
                    {achievements.map((ach) => (
                      <div
                        key={ach.id}
                        className="p-3.5 rounded-xl border border-[var(--color-border)] bg-white hover:border-[var(--color-red)] transition-all shadow-2xs"
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-bold text-sm text-[var(--color-ink)]">
                            {ach.title}
                          </span>
                          {ach.award && (
                            <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-[var(--color-red)]/10 text-[var(--color-red)]">
                              1ST PRIZE
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--color-muted)] font-mono mt-0.5">
                          Host: {ach.host}
                        </p>
                        <p className="text-xs text-[var(--color-ink-subtle)] mt-1.5 leading-relaxed">
                          {ach.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section Bridge Link */}
                <button
                  type="button"
                  onClick={() => scrollToSection("achievements")}
                  className="w-full py-3 rounded-xl border border-dashed border-[var(--color-border)] text-xs font-mono font-bold uppercase text-[var(--color-muted)] hover:text-[var(--color-red)] hover:border-[var(--color-red)] hover:bg-[var(--color-red)]/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Complete Achievements Gallery</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}

            {/* ══════════════════════════════════════════════════════════════ */}
            {/*  PANEL 3: DOOR — CONTACT & COLLABORATION                      */}
            {/* ══════════════════════════════════════════════════════════════ */}
            {activeTarget === "door" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-ink)]">
                    Get in Touch
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1 font-mono">
                    Open for product design roles, AI product engineering, and collaborative ventures.
                  </p>
                </div>

                {/* Contact Coordinates Cards */}
                <div className="space-y-2.5">
                  <a
                    href="mailto:taushikok@gmail.com"
                    className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-white hover:border-[var(--color-red)] hover:bg-[var(--color-red)]/5 transition-all group shadow-2xs"
                  >
                    <div className="p-2.5 rounded-lg bg-[var(--color-bg-subtle)] text-[var(--color-red)] group-hover:bg-[var(--color-red)] group-hover:text-white transition-colors">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[var(--color-muted)] font-bold">
                        Email Address
                      </span>
                      <p className="text-sm font-bold text-[var(--color-ink)] group-hover:text-[var(--color-red)] transition-colors">
                        taushikok@gmail.com
                      </p>
                    </div>
                  </a>

                  <a
                    href="tel:+918919237170"
                    className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-white hover:border-[var(--color-red)] hover:bg-[var(--color-red)]/5 transition-all group shadow-2xs"
                  >
                    <div className="p-2.5 rounded-lg bg-[var(--color-bg-subtle)] text-[var(--color-red)] group-hover:bg-[var(--color-red)] group-hover:text-white transition-colors">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[var(--color-muted)] font-bold">
                        Phone / WhatsApp
                      </span>
                      <p className="text-sm font-bold text-[var(--color-ink)] group-hover:text-[var(--color-red)] transition-colors">
                        +91 8919237170
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/taushik-chandana-16ba14378"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-white hover:border-[var(--color-red)] hover:bg-[var(--color-red)]/5 transition-all group shadow-2xs"
                  >
                    <div className="p-2.5 rounded-lg bg-[var(--color-bg-subtle)] text-[var(--color-red)] group-hover:bg-[var(--color-red)] group-hover:text-white transition-colors">
                      <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-mono uppercase text-[var(--color-muted)] font-bold">
                        LinkedIn Profile
                      </span>
                      <p className="text-sm font-bold text-[var(--color-ink)] group-hover:text-[var(--color-red)] transition-colors">
                        taushik-chandana
                      </p>
                    </div>
                    <ExternalLink size={14} className="text-[var(--color-muted)]" />
                  </a>

                  <div className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
                    <div className="p-2.5 rounded-lg bg-white text-[var(--color-red)] border border-[var(--color-border)]">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[var(--color-muted)] font-bold">
                        Location Coordinates
                      </span>
                      <p className="text-sm font-bold text-[var(--color-ink)]">
                        Hyderabad, India · 17.3850° N, 78.4867° E
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section Bridge Link */}
                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className="w-full py-3.5 rounded-xl bg-[var(--color-red)] text-white font-mono text-xs font-bold tracking-wider uppercase hover:bg-[var(--color-red-dark)] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Open Interactive Contact Letter</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}

          </div>

          {/* Bottom Panel Footer */}
          <div className="p-3 border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--color-muted)]">
            <span>Press ESC or click Return to exit</span>
            <span className="text-[var(--color-red)] font-bold">TAUSHIK PORTFOLIO // 2026</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
