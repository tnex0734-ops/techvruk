"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  ExternalLink,
  ArrowUpRight,
  Download,
  Send,
  MessageSquare,
  Sparkles,
  Clock,
  ArrowUp,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { contactLinks } from "@/lib/content";

interface IntentOption {
  id: string;
  badge: string;
  label: string;
  subject: string;
  description: string;
  sampleMessage: string;
}

const COLLABORATION_INTENTS: IntentOption[] = [
  {
    id: "product",
    badge: "PRODUCT DESIGN",
    label: "Senior Product Design",
    subject: "Product Design Collaboration — Taushik Chandana",
    description:
      "End-to-end design strategy, interactive Figma design systems, complex SaaS flows, and usability heuristics.",
    sampleMessage:
      "Hi Taushik, we are looking for a senior product designer to collaborate on our core product experience...",
  },
  {
    id: "ai",
    badge: "AI WORKSPACES",
    label: "AI Workspaces & Systems",
    subject: "AI Workspace / Systems Collaboration — Taushik Chandana",
    description:
      "Agentic workspace architecture, multimodal ergonomics, tool execution UX, and developer experience platforms.",
    sampleMessage:
      "Hi Taushik, I came across your Dev Atlas and Signal Labs AI workspace projects. We would love to discuss...",
  },
  {
    id: "sprint",
    badge: "FRONTEND SPRINT",
    label: "Design System & Frontend",
    subject: "Design System / Frontend Sprint — Taushik Chandana",
    description:
      "Design token architecture, Tailwind CSS v4 component libraries, micro-interaction choreography, and Next.js interfaces.",
    sampleMessage:
      "Hi Taushik, we have an upcoming initiative requiring rigorous design tokens, accessible components, and frontend craftsmanship...",
  },
];

export function ContactSection() {
  const [activeIntent, setActiveIntent] = useState<IntentOption>(COLLABORATION_INTENTS[0]);
  const [copiedType, setCopiedType] = useState<"email" | "phone" | null>(null);
  const [visitorName, setVisitorName] = useState("");
  const [visitorMessage, setVisitorMessage] = useState("");
  const [liveTime, setLiveTime] = useState("");

  // Live Hyderabad Time (IST, GMT+5:30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setLiveTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string, type: "email" | "phone") => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2400);
    }
  };

  const getMailtoLink = () => {
    const email = "taushikok@gmail.com";
    const subject = encodeURIComponent(activeIntent.subject);
    const bodyContent = visitorMessage.trim()
      ? `${visitorMessage}\n\n— ${visitorName.trim() || "Collaborator"}`
      : `${activeIntent.sampleMessage}\n\n— ${visitorName.trim() || "[Your Name]"}`;
    const body = encodeURIComponent(bodyContent);
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Direct Collaboration"
      className="relative py-20 sm:py-28 bg-[var(--color-bg)] scroll-mt-20 border-t border-[var(--color-border-subtle)]"
    >
      {/* Backward-Compatible Anchor for Legacy Bookmarks */}
      <span id="collaboration" className="absolute -top-24" aria-hidden="true" />

      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header (Architectural Threshold Narrative) ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[var(--color-border)]">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--color-red)] animate-pulse" aria-hidden="true" />
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-red)]">
                04 // THE OPEN DOOR &bull; DIRECT COLLABORATION
              </p>
            </div>
            <h2 className="display-font text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-[var(--color-ink)] tracking-tight leading-[1.08]">
              Step Through The Threshold. Let&apos;s Build Exceptional Software.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
              The virtual room&apos;s entrance door opens directly into this collaboration hub.
              Whether you are scaling an early-stage product, architecting intelligent AI workspaces, or hiring senior design engineering leadership, my door is open.
            </p>
          </div>

          {/* ── Live Studio Status & Local Time Badge ── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 self-start lg:self-end">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-xs font-mono font-bold text-[var(--color-ink)] shadow-2xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
              </span>
              <span>HYDERABAD, IN &bull; {liveTime || "12:00 PM"} IST</span>
              <span className="text-[var(--color-border-strong)]">|</span>
              <span className="text-[var(--color-red)]">OPEN FOR INQUIRIES</span>
            </div>
          </div>
        </div>

        {/* ── Collaboration Intent Selector ── */}
        <div className="mt-10 sm:mt-12">
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
              SELECT COLLABORATION INTENT
            </span>
            <span className="font-mono text-[11px] text-[var(--color-red)] font-semibold hidden sm:inline">
              Prefills subject line &amp; context
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Collaboration Intent"
            className="grid grid-cols-1 md:grid-cols-3 gap-3.5"
          >
            {COLLABORATION_INTENTS.map((intent) => {
              const isSelected = activeIntent.id === intent.id;
              return (
                <button
                  key={intent.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveIntent(intent)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer select-none flex flex-col justify-between gap-3 ${
                    isSelected
                      ? "border-[var(--color-red)] bg-[var(--color-red-light)]/40 shadow-xs"
                      : "border-[var(--color-border)] bg-white hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-subtle)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        isSelected
                          ? "bg-[var(--color-red)] text-white"
                          : "bg-[var(--color-bg-subtle)] text-[var(--color-muted)] border border-[var(--color-border)]"
                      }`}
                    >
                      {intent.badge}
                    </span>
                    {isSelected && (
                      <CheckCircle2 size={16} className="text-[var(--color-red)] shrink-0" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--color-ink)] mb-1">
                      {intent.label}
                    </h3>
                    <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                      {intent.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Primary Hero Dossier (Email Card) & Direct Dispatcher ── */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Direct Inbox Card (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-[var(--color-border)] bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-[var(--color-red-light)] text-[var(--color-red)]">
                    <Mail size={16} />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]">
                    PRIMARY DISPATCH &bull; DIRECT INBOX
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[var(--color-muted)]">
                  Response within 24h
                </span>
              </div>

              <div className="my-6">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)] block mb-1">
                  OFFICIAL EMAIL COORDINATE
                </span>
                <p className="font-mono text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-ink)] tracking-tight break-all">
                  taushikok@gmail.com
                </p>
                <p className="mt-2 text-xs sm:text-sm text-[var(--color-muted)]">
                  Active filter: <span className="font-semibold text-[var(--color-ink)]">{activeIntent.label}</span>. One click triggers your local email client with tailored collaboration context.
                </p>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-4 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={getMailtoLink()}
                data-mailto-trigger="true"
                className="flex-1 py-3.5 px-6 rounded-xl bg-[var(--color-red)] hover:bg-[var(--color-red-deep)] text-white font-mono text-xs font-bold tracking-wider uppercase transition-all duration-150 flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] cursor-pointer"
              >
                <Send size={15} />
                <span>Launch Email Client</span>
                <ArrowUpRight size={14} />
              </a>

              <button
                type="button"
                onClick={() => handleCopy("taushikok@gmail.com", "email")}
                aria-label="Copy email address to clipboard"
                className="py-3.5 px-5 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-red)] bg-white hover:bg-[var(--color-bg-subtle)] font-mono text-xs font-bold tracking-wider uppercase transition-all duration-150 flex items-center justify-center gap-2 text-[var(--color-ink)] hover:text-[var(--color-red)] active:scale-[0.98] cursor-pointer shrink-0"
              >
                {copiedType === "email" ? (
                  <>
                    <Check size={14} className="text-emerald-600" />
                    <span className="text-emerald-700">COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>COPY ADDRESS</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Message Dispatch Composer (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-6 sm:p-8 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-white border border-[var(--color-border)] text-[var(--color-red)]">
                    <MessageSquare size={16} />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]">
                    COLLABORATION BRIEF
                  </span>
                </div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[var(--color-muted)] border border-[var(--color-border)]">
                  DIRECT DRAFT
                </span>
              </div>

              <div className="mt-4 space-y-3.5">
                <div>
                  <label
                    htmlFor="contact-visitor-name"
                    className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1"
                  >
                    Your Name or Organization
                  </label>
                  <input
                    id="contact-visitor-name"
                    type="text"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="e.g. Alex Rivera // Founder or Design Lead"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-white font-sans text-xs sm:text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/60 focus:outline-none focus:border-[var(--color-red)] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-visitor-message"
                    className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1"
                  >
                    Brief Project Scope or Role Details
                  </label>
                  <textarea
                    id="contact-visitor-message"
                    rows={3}
                    value={visitorMessage}
                    onChange={(e) => setVisitorMessage(e.target.value)}
                    placeholder={activeIntent.sampleMessage}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--color-border)] bg-white font-sans text-xs sm:text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/60 focus:outline-none focus:border-[var(--color-red)] transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--color-border)]">
              <a
                href={getMailtoLink()}
                className="w-full py-2.5 px-4 rounded-lg bg-[var(--color-ink)] hover:bg-[var(--color-red)] text-white font-mono text-xs font-bold tracking-wider uppercase transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Dispatch Brief via Mail</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Secondary Contact Channels Grid (4 Architectural Cards) ── */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. LinkedIn */}
          <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-white hover:border-[var(--color-red)] transition-all group flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="p-2 rounded-lg bg-[var(--color-bg-subtle)] text-[var(--color-red)] group-hover:bg-[var(--color-red)] group-hover:text-white transition-colors">
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  NETWORK
                </span>
              </div>
              <h4 className="text-sm font-bold text-[var(--color-ink)]">
                LinkedIn Profile
              </h4>
              <p className="font-mono text-xs text-[var(--color-red)] font-semibold mt-0.5 truncate">
                in/taushik-chandana
              </p>
              <p className="text-xs text-[var(--color-muted)] mt-2 leading-relaxed">
                Connect for design systems discussions, product insights, and leadership connections.
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/taushik-chandana-16ba14378"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Taushik Chandana's LinkedIn profile in a new tab"
              className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono font-bold uppercase text-[var(--color-ink)] group-hover:text-[var(--color-red)] transition-colors cursor-pointer"
            >
              <span>Connect on LinkedIn</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* 2. Direct Phone & WhatsApp */}
          <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-white hover:border-[var(--color-red)] transition-all group flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="p-2 rounded-lg bg-[var(--color-bg-subtle)] text-[var(--color-red)] group-hover:bg-[var(--color-red)] group-hover:text-white transition-colors">
                  <Phone size={18} />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  DIRECT LINE
                </span>
              </div>
              <h4 className="text-sm font-bold text-[var(--color-ink)]">
                Phone &amp; WhatsApp
              </h4>
              <p className="font-mono text-xs text-[var(--color-red)] font-semibold mt-0.5">
                +91 8919237170
              </p>
              <p className="text-xs text-[var(--color-muted)] mt-2 leading-relaxed">
                Direct voice line or instant chat for urgent project sprints or scheduling calls.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center justify-between gap-2">
              <a
                href="https://wa.me/918919237170"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-1.5 px-2.5 rounded-lg bg-[var(--color-bg-subtle)] hover:bg-[var(--color-red)] hover:text-white text-[11px] font-mono font-bold uppercase text-center transition-colors"
              >
                WhatsApp ↗
              </a>
              <button
                type="button"
                onClick={() => handleCopy("+918919237170", "phone")}
                aria-label="Copy phone number"
                className="py-1.5 px-2.5 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-red)] text-[11px] font-mono font-bold uppercase transition-colors shrink-0"
              >
                {copiedType === "phone" ? "COPIED" : "COPY"}
              </button>
            </div>
          </div>

          {/* 3. Resume / Curriculum Vitae */}
          <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-white hover:border-[var(--color-red)] transition-all group flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="p-2 rounded-lg bg-[var(--color-bg-subtle)] text-[var(--color-red)] group-hover:bg-[var(--color-red)] group-hover:text-white transition-colors">
                  <Download size={18} />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  CURRICULUM VITAE
                </span>
              </div>
              <h4 className="text-sm font-bold text-[var(--color-ink)]">
                Resume &bull; 2026 Edition
              </h4>
              <p className="font-mono text-xs text-[var(--color-red)] font-semibold mt-0.5 truncate">
                Taushik_ux_resume.pdf
              </p>
              <p className="text-xs text-[var(--color-muted)] mt-2 leading-relaxed">
                Official single-page PDF covering career history, design metrics, and tool certifications.
              </p>
            </div>
            <a
              href="/Taushik_ux_resume.pdf"
              download="Taushik_ux_resume.pdf"
              className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono font-bold uppercase text-[var(--color-ink)] group-hover:text-[var(--color-red)] transition-colors cursor-pointer"
            >
              <span>Download PDF</span>
              <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* 4. Studio Location & Guild Leadership */}
          <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="p-2 rounded-lg bg-white border border-[var(--color-border)] text-[var(--color-red)]">
                  <MapPin size={18} />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  LOCATION BASE
                </span>
              </div>
              <h4 className="text-sm font-bold text-[var(--color-ink)]">
                Hyderabad, India
              </h4>
              <p className="font-mono text-xs text-[var(--color-ink)] font-semibold mt-0.5">
                Core Member @ UI/UX Hyderabad
              </p>
              <p className="text-xs text-[var(--color-muted)] mt-2 leading-relaxed">
                Available for hybrid roles in Hyderabad, worldwide remote collaboration, or relocation.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
              <span>Open for Inquiries &amp; New Opportunities</span>
            </div>
          </div>
        </div>

        {/* ── Closing Artwork Showcase: LESS CHAOS. MORE DESIGN. ── */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-[var(--color-border)]">
          <div className="relative rounded-3xl border border-[var(--color-border)] bg-gradient-to-b from-[#FDFCFC] to-[#FCEBED]/30 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-red)] mb-1">
                  CORE DESIGN PHILOSOPHY
                </p>
                <h3 className="display-font text-2xl sm:text-3xl font-black uppercase text-[var(--color-ink)] tracking-tight">
                  Less Chaos. More Design.
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--color-border)] hover:border-[var(--color-red)] bg-white text-xs font-mono font-bold uppercase text-[var(--color-ink)] hover:text-[var(--color-red)] shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-95"
                >
                  <span>Return to Top / 3D Room</span>
                  <ArrowUp size={14} />
                </button>
              </div>
            </div>

            {/* Graphic Illustration */}
            <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-[var(--color-border)] bg-white shadow-xs">
              <img
                src="/footer_designer.png"
                alt="Taushik Chandana editorial illustration — Less Chaos. More Design."
                className="w-full h-full object-contain object-center"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* ── Architectural Portfolio Footer ── */}
        <footer className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-[var(--color-muted)]">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[var(--color-ink)]">
              TAUSHIK CHANDANA
            </span>
            <span>&bull;</span>
            <span>PRODUCT DESIGNER &bull; AI WORKSPACES &bull; HYDERABAD</span>
          </div>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            <a href="#hero" className="hover:text-[var(--color-red)] transition-colors">
              01 ROOM
            </a>
            <a href="#about" className="hover:text-[var(--color-red)] transition-colors">
              02 ABOUT
            </a>
            <a href="#work" className="hover:text-[var(--color-red)] transition-colors">
              03 WORK
            </a>
            <a href="#journey" className="hover:text-[var(--color-red)] transition-colors">
              04 JOURNEY
            </a>
            <a href="#contact" className="text-[var(--color-red)] font-bold">
              05 CONTACT
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span>&copy; 2026 TAUSHIK CHANDANA.</span>
            <span className="text-[var(--color-red)] font-black">&bull;</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
