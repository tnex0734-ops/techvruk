"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Copy,
  Check,
  ExternalLink,
  Phone,
  MapPin,
  X,
  Sparkles,
} from "lucide-react";

export interface ContactSpotlightOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ContactSpotlightOverlay
 * Tactile stationery calling card with airmail border, one-click copy, and social links.
 * Clicking outside the content card returns the user to the entire room.
 */
export function ContactSpotlightOverlay({
  isOpen,
  onClose,
}: ContactSpotlightOverlayProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("taushikok@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 pointer-events-auto select-none bg-black/40 backdrop-blur-xs cursor-pointer"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md max-h-[90vh] overflow-y-auto cursor-default"
      >
        {/* ── Tactile Stationery Calling Card Panel ── */}
        <div
          data-testid="contact-spotlight-card"
          className="relative rounded-2xl sm:rounded-3xl border border-[#E2DBD1] bg-[#FCFAF7] shadow-[0_24px_65px_rgba(23,21,21,0.22)] p-6 sm:p-7 overflow-hidden text-[#1C1917]"
        >
          {/* Fun Tactile Detail: Airmail Red & Navy Diagonal Border Stripe along Bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1.5 opacity-80"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #E52424, #E52424 10px, transparent 10px, transparent 16px, #1E2738 16px, #1E2738 26px, transparent 26px, transparent 32px)",
            }}
          />

          {/* ── Top Header Strip ── */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E8E1D5] text-[#1C1917] font-mono text-xs uppercase font-bold">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E52424] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E52424] shadow-[0_0_6px_#e52424]" />
              </span>
              <span className="text-[#E52424] font-black tracking-wider">
                DIRECT COMMUNICATOR
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200 text-[10px] font-bold">
                PUBLIC CONTACT
              </span>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-[#171515] transition-colors cursor-pointer"
                aria-label="Return to entire room overview"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* ── Identity Block ── */}
          <div className="mb-4">
            <div className="text-[10px] font-mono text-[#E52424] uppercase tracking-wider mb-1 font-bold">
              ✦ STATIONERY CALLING CARD
            </div>
            <h2 className="text-2xl font-serif font-black text-[#171515] flex items-center gap-2">
              <span>Taushik Chandana</span>
              <Sparkles size={16} className="text-[#E52424]" />
            </h2>
            <p className="text-xs text-stone-600 font-mono mt-1 font-medium">
              Product Designer &amp; Creative Developer // Hyderabad, India
            </p>
          </div>

          {/* ── Contact Channels ── */}
          <div className="space-y-3 font-mono text-xs mb-5">
            {/* 1. Email */}
            <div className="p-3.5 rounded-xl bg-white border border-[#E2DBD1] shadow-2xs flex items-center justify-between gap-2 hover:border-[#E52424] transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-lg bg-[#E52424]/10 text-[#E52424] shrink-0">
                  <Mail size={16} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">
                    Primary Email
                  </span>
                  <a
                    data-testid="contact-email-link"
                    href="mailto:taushikok@gmail.com"
                    className="text-[#171515] hover:text-[#E52424] font-bold text-xs truncate underline decoration-stone-300"
                  >
                    taushikok@gmail.com
                  </a>
                </div>
              </div>

              <button
                type="button"
                data-testid="contact-copy-email-btn"
                onClick={handleCopyEmail}
                className={`px-3 py-2 min-h-[44px] min-w-[44px] rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                  copied
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-[#E52424] text-white border-[#E52424] hover:bg-[#b01723]"
                }`}
                aria-label="Copy email address"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? "COPIED" : "COPY"}</span>
              </button>
            </div>
            <div className="text-[10px] font-mono text-stone-500 pl-1 font-bold">
              [ ✦ CLICK TO COPY EMAIL OR LAUNCH CLIENT ]
            </div>

            {/* 2. LinkedIn */}
            <div className="p-3.5 rounded-xl bg-white border border-[#E2DBD1] shadow-2xs flex items-center justify-between gap-2 hover:border-[#E52424] transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-lg bg-stone-100 text-stone-700 shrink-0">
                  <ExternalLink size={16} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">
                    Professional Network
                  </span>
                  <span className="text-[#171515] font-bold text-xs truncate">
                    LinkedIn / taushik-chandana
                  </span>
                </div>
              </div>

              <a
                data-testid="contact-linkedin-link"
                href="https://www.linkedin.com/in/taushik-chandana-16ba14378"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 min-h-[44px] min-w-[44px] rounded-lg bg-white text-stone-800 border border-[#E2DBD1] hover:border-[#E52424] hover:text-[#E52424] transition-all font-bold flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                aria-label="Open LinkedIn profile"
              >
                <span>VISIT</span>
                <ExternalLink size={12} />
              </a>
            </div>
            <div className="text-[10px] font-mono text-stone-500 pl-1 font-bold">
              [ ✦ CLICK TO OPEN LINKEDIN PROFILE ↗ ]
            </div>

            {/* 3. Phone & Location Info */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <a
                data-testid="contact-phone-link"
                href="tel:+918919237170"
                className="p-2.5 rounded-xl bg-white border border-[#E2DBD1] shadow-2xs flex items-center gap-2 hover:border-[#E52424] transition-colors group"
              >
                <Phone size={14} className="text-[#E52424] shrink-0 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col truncate">
                  <span className="text-[9px] text-stone-400 font-bold">PHONE [CALL]</span>
                  <span className="text-stone-800 font-bold truncate text-[11px] group-hover:text-[#E52424]">
                    +91 8919237170
                  </span>
                </div>
              </a>

              <div className="p-2.5 rounded-xl bg-white border border-[#E2DBD1] shadow-2xs flex items-center gap-2">
                <MapPin size={14} className="text-[#E52424] shrink-0" />
                <div className="flex flex-col truncate">
                  <span className="text-[9px] text-stone-400 font-bold">LOCATION</span>
                  <span className="text-stone-800 font-bold truncate text-[11px]">
                    Hyderabad, IN
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="pt-3 pb-1 border-t border-[#E8E1D5] flex items-center justify-between text-[11px] font-mono text-stone-500">
            <span>Verified Public Inquiries</span>
            <button
              type="button"
              onClick={onClose}
              className="text-[#E52424] hover:underline font-bold cursor-pointer"
            >
              [ SEE ENTIRE ROOM (ESC) ]
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
