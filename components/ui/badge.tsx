import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "warning" | "danger" | "success" | "model";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide transition-colors";

  const variants = {
    default:
      "bg-emerald-950/70 text-emerald-300 border border-emerald-800/60 shadow-sm",
    secondary:
      "bg-forest-800/80 text-forest-200 border border-forest-750",
    outline:
      "border border-forest-700 text-forest-300 bg-transparent",
    warning:
      "bg-amber-950/60 text-amber-300 border border-amber-800/60",
    danger:
      "bg-red-950/70 text-red-300 border border-red-800/60",
    success:
      "bg-emerald-900/60 text-emerald-200 border border-emerald-700/60",
    model:
      "bg-emerald-950/90 text-emerald-300 border border-emerald-600/50 shadow-[0_0_12px_rgba(16,185,129,0.15)] font-mono text-[11px]",
  };

  return (
    <div className={cn(base, variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
