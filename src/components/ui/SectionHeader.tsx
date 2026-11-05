import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  number?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function SectionHeader({
  number,
  eyebrow,
  title,
  description,
  action,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "w-full flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-[var(--color-border)] mb-8 sm:mb-12 select-none",
        className
      )}
      {...props}
    >
      <div className="space-y-2 max-w-2xl">
        {(number || eyebrow) && (
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-red)]">
            {number && <span className="text-[var(--color-ink)]">{number}</span>}
            {number && eyebrow && <span className="text-[var(--color-border)]">/</span>}
            {eyebrow && <span>{eyebrow}</span>}
          </div>
        )}
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-ink)] leading-[1.08]">
          {title}
        </h2>
        {description && (
          <p className="text-sm sm:text-base text-[var(--color-muted)] font-normal leading-relaxed pt-1">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0 pt-2 md:pt-0">{action}</div>}
    </div>
  );
}

