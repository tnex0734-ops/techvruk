import React from "react";
import { cn } from "@/lib/utils";

type TagVariant = "red" | "neutral" | "outline" | "solid-ink";
type TagSize = "sm" | "md";

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  size?: TagSize;
  dot?: boolean;
}

const variantStyles: Record<TagVariant, string> = {
  red: "bg-[var(--color-red-light)] text-[var(--color-red)] border border-[var(--color-red)]/20",
  neutral:
    "bg-[var(--color-bg-subtle)] text-[var(--color-ink-subtle)] border border-[var(--color-border)]",
  outline:
    "bg-transparent text-[var(--color-ink)] border border-[var(--color-border)]",
  "solid-ink":
    "bg-[var(--color-ink)] text-white border border-transparent shadow-xs",
};

const sizeStyles: Record<TagSize, string> = {
  sm: "text-[10px] px-2.5 py-0.5 tracking-wider uppercase font-mono font-bold rounded-full",
  md: "text-xs px-3.5 py-1 tracking-wider uppercase font-mono font-bold rounded-full",
};

export function Tag({
  variant = "red",
  size = "md",
  dot = false,
  className,
  children,
  ...props
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 select-none transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full inline-block",
            variant === "red" ? "bg-[var(--color-red)]" : "bg-current"
          )}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}

