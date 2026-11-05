import React from "react";
import { cn } from "@/lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  accent?: boolean;
  spacing?: "none" | "sm" | "md" | "lg";
}

const spacingStyles = {
  none: "my-0",
  sm: "my-4 sm:my-6",
  md: "my-8 sm:my-12",
  lg: "my-12 sm:my-16",
};

export function Divider({
  accent = false,
  spacing = "md",
  className,
  ...props
}: DividerProps) {
  return (
    <hr
      className={cn(
        "w-full border-0 border-t",
        accent ? "border-[var(--color-red)]" : "border-[var(--color-border)]",
        spacingStyles[spacing],
        className
      )}
      {...props}
    />
  );
}

