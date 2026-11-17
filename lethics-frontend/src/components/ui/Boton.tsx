import React from "react";
import { cn } from "@/lib/utils";

export interface BotonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "pill" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  cargando?: boolean;
}

export const Boton = React.forwardRef<HTMLButtonElement, BotonProps>(
  ({ className, variant = "primary", size = "md", cargando, children, disabled, ...props }, ref) => {
    const baseEstilos =
      "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus:outline-none focus:ring-2 focus:ring-[#3E4B8F] focus:ring-offset-2";

    const variantes = {
      primary: "bg-[#3E4B8F] hover:bg-[#323D75] text-white rounded-full shadow-sm active:scale-[0.98]",
      secondary:
        "bg-white border-2 border-[#3E4B8F] text-[#3E4B8F] hover:bg-[#EAEAF1] rounded-full active:scale-[0.98]",
      pill: "bg-[#FFECC2] hover:bg-[#FFDE97] text-[#1E1E1E] rounded-full border border-[#FFDE97]",
      ghost: "bg-transparent text-[#3E4B8F] hover:bg-[#EAEAF1]/50 rounded-full",
      danger: "bg-[#FF5E19] hover:bg-[#e04f12] text-white rounded-full shadow-sm active:scale-[0.98]"
    };

    const tamanos = {
      sm: "px-3 py-1.5 text-xs min-h-[36px]",
      md: "px-6 py-2.5 text-sm md:text-base min-h-[44px]",
      lg: "px-8 py-3.5 text-base md:text-lg min-h-[48px]"
    };

    return (
      <button
        ref={ref}
        disabled={disabled || cargando}
        className={cn(baseEstilos, variantes[variant], tamanos[size], className)}
        {...props}
      >
        {cargando ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Cargando...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Boton.displayName = "Boton";
