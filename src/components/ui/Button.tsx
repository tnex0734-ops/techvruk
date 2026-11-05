import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "pill"
  | "outline-red";
export type ButtonSize = "sm" | "md" | "lg";

export interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export type ButtonAsButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonAsLinkProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-red)] text-white hover:bg-[var(--color-red-deep)] border border-transparent shadow-xs active:scale-[0.98]",
  secondary:
    "bg-white text-[var(--color-ink)] hover:text-[var(--color-red)] hover:border-[var(--color-red)] border border-[var(--color-border)] shadow-xs active:scale-[0.98]",
  ghost:
    "bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-red)] border border-transparent active:scale-[0.98]",
  pill:
    "bg-[var(--color-ink)] text-white hover:bg-[var(--color-red)] rounded-full border border-transparent shadow-xs active:scale-[0.98]",
  "outline-red":
    "bg-transparent text-[var(--color-red)] hover:bg-[var(--color-red-light)] border border-[var(--color-red)] active:scale-[0.98]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5 rounded-full font-medium tracking-wide",
  md: "text-sm px-4 py-2 rounded-full font-semibold tracking-wide",
  lg: "text-base px-6 py-2.5 rounded-full font-semibold tracking-wide",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const commonClasses = cn(
    "inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-red)] focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if ("href" in props && typeof props.href === "string") {
    const { href, external, ...anchorProps } = props as ButtonAsLinkProps;
    if (external || href.startsWith("http") || href.endsWith(".pdf")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={commonClasses}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={commonClasses} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={commonClasses}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
