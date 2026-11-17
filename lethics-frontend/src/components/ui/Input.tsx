import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  etiqueta?: string;
  error?: string;
  ayuda?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, etiqueta, error, ayuda, id, ...props }, ref) => {
    const inputId = id || (etiqueta ? etiqueta.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {etiqueta && (
          <label htmlFor={inputId} className="block text-sm font-semibold text-[#1E1E1E]">
            {etiqueta}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-xl border bg-white px-4 py-2.5 text-sm md:text-base text-[#1E1E1E] transition-colors placeholder:text-[#959595] focus:outline-none focus:ring-2 focus:ring-[#3E4B8F] min-h-[44px]",
            error
              ? "border-[#FF5E19] focus:ring-[#FF5E19]"
              : "border-[#D8D8D8] focus:border-[#3E4B8F]",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs font-medium text-[#FF5E19]">{error}</p>}
        {ayuda && !error && <p className="text-xs text-[#6C6C63]">{ayuda}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
