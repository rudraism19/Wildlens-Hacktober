import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "emerald";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none focus:outline-none focus:ring-2 focus:ring-emerald-500/40";

    const variantStyles = {
      primary:
        "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40 border border-emerald-500/30",
      emerald:
        "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/50 border border-emerald-400/30",
      secondary:
        "bg-forest-800 hover:bg-forest-750 text-forest-100 border border-forest-700/60 shadow-sm",
      outline:
        "bg-transparent hover:bg-forest-800/60 text-forest-200 border border-forest-700 hover:border-forest-600",
      ghost:
        "bg-transparent hover:bg-forest-800/50 text-forest-300 hover:text-forest-100",
      danger:
        "bg-red-900/60 hover:bg-red-800/80 text-red-200 border border-red-700/60",
    };

    const sizeStyles = {
      sm: "h-9 px-3 text-xs gap-1.5",
      md: "h-11 px-4 text-sm gap-2",
      lg: "h-13 px-6 text-base gap-2.5 font-semibold",
      icon: "h-11 w-11 p-0 shrink-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
