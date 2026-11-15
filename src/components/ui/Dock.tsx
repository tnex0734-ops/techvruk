"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  BookOpen,
  FileEdit,
  Briefcase,
  Award,
  Phone,
  Music,
} from "lucide-react";
import { RoomInteractionTarget } from "../room/roomInteractionTypes";

export interface DockItem {
  id: RoomInteractionTarget;
  label: string;
  icon: React.ReactNode;
  shortcut: string;
}

export interface DockProps {
  activeTarget: RoomInteractionTarget;
  onSelect: (target: RoomInteractionTarget) => void;
}

/**
 * Dock (React Bits)
 * Floating bottom navigation bar with hover tooltips, smooth spring animations,
 * and direct one-click access to all in-room destinations.
 */
export function Dock({ activeTarget, onSelect }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items: DockItem[] = [
    {
      id: null,
      label: "Room Overview",
      icon: <Compass size={18} />,
      shortcut: "ESC",
    },
    {
      id: "book",
      label: "Projects Book",
      icon: <BookOpen size={18} />,
      shortcut: "1",
    },
    {
      id: "about",
      label: "About Sketchbook",
      icon: <FileEdit size={18} />,
      shortcut: "2",
    },
    {
      id: "wall",
      label: "Experience Wall",
      icon: <Briefcase size={18} />,
      shortcut: "3",
    },
    {
      id: "wardrobe",
      label: "Wardrobe Honors",
      icon: <Award size={18} />,
      shortcut: "4",
    },
    {
      id: "phone",
      label: "Desk Phone",
      icon: <Phone size={18} />,
      shortcut: "5",
    },
    {
      id: "music",
      label: "Listen to a Song",
      icon: <Music size={18} />,
      shortcut: "6",
    },
  ];

  return (
    <nav
      aria-label="In-Room Navigation Dock"
      className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 select-none"
    >
      <div className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-neutral-950/85 backdrop-blur-xl border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
        {items.map((item, index) => {
          const isActive = activeTarget === item.id;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={item.label}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* ── React Bits Hover Tooltip ── */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: -4, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full mb-2 px-2.5 py-1 rounded-lg bg-neutral-900 border border-white/20 text-white font-mono text-[11px] whitespace-nowrap shadow-xl flex items-center gap-1.5 pointer-events-none z-50"
                  >
                    <span className="font-semibold">{item.label}</span>
                    <span className="px-1 py-0.2 rounded bg-white/15 text-[9px] text-neutral-300 font-bold">
                      [{item.shortcut}]
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Dock Button ── */}
              <motion.button
                type="button"
                data-testid={`dock-btn-${item.id || "overview"}`}
                onClick={() => onSelect(item.id)}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 min-h-[44px] min-w-[44px] rounded-full transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[var(--color-red)] text-white shadow-[0_0_15px_rgba(201,31,43,0.6)]"
                    : "bg-white/10 text-neutral-300 hover:bg-white/20 hover:text-white"
                }`}
                aria-label={`${item.label} (${item.shortcut})`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.icon}

                {/* Active Indicator Glow Dot */}
                {isActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]" />
                )}
              </motion.button>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

