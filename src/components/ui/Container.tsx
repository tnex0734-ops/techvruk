import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
  narrow?: boolean;
  cleanPadding?: boolean;
}

export function Container({
  as: Component = "div",
  narrow = false,
  cleanPadding = false,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "w-full mx-auto",
        narrow ? "max-w-[960px]" : "max-w-[1240px]",
        !cleanPadding && "px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

