import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "crema" | "indigo" | "dorado" | "verde" | "rojo";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "crema",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantes = {
    crema: "bg-[#FFECC2] text-[#1E1E1E] border border-[#FFDE97]",
    indigo: "bg-[#3E4B8F] text-white",
    dorado: "bg-[#FFB006]/20 text-[#8c5e00] border border-[#FFB006]/40",
    verde: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    rojo: "bg-red-100 text-red-700 border border-red-200"
  };

  const tamanos = {
    sm: "px-2.5 py-0.5 text-xs font-medium",
    md: "px-3 py-1 text-xs md:text-sm font-semibold"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full",
        variantes[variant],
        tamanos[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
