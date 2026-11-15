"use client";

import React from "react";

export interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: "white" | "red" | "gold" | "aqua";
}

/**
 * ShinyText (React Bits)
 * Shimmering metallic text sweep animation for badges, tags, numbers, and headlines.
 */
export function ShinyText({
  text,
  disabled = false,
  speed = 3,
  className = "",
  color = "white",
}: ShinyTextProps) {
  if (disabled) {
    return <span className={className}>{text}</span>;
  }

  const gradientMap = {
    white: "linear-gradient(120deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.4) 100%)",
    red: "linear-gradient(120deg, rgba(201, 31, 43, 0.6) 0%, rgba(255, 120, 130, 1) 50%, rgba(201, 31, 43, 0.6) 100%)",
    gold: "linear-gradient(120deg, rgba(212, 175, 55, 0.6) 0%, rgba(255, 235, 150, 1) 50%, rgba(212, 175, 55, 0.6) 100%)",
    aqua: "linear-gradient(120deg, rgba(122, 197, 199, 0.6) 0%, rgba(215, 250, 252, 1) 50%, rgba(122, 197, 199, 0.6) 100%)",
  };

  return (
    <span
      className={`inline-block font-mono tracking-wide ${className}`}
      style={{
        backgroundImage: gradientMap[color],
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: `shiny-sweep ${speed}s linear infinite`,
      }}
    >
      {text}
      <style jsx>{`
        @keyframes shiny-sweep {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </span>
  );
}

