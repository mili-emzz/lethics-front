import React from "react";
import { cn } from "@/lib/utils";

interface BarraProgresoProps {
  valor: number; // 0 a 100
  mostrarTexto?: boolean;
  tamano?: "sm" | "md" | "lg";
  className?: string;
  colorBarra?: string;
}

export function BarraProgreso({
  valor,
  mostrarTexto = false,
  tamano = "md",
  className,
  colorBarra = "bg-[#FFB006]"
}: BarraProgresoProps) {
  const porcentaje = Math.min(100, Math.max(0, valor));

  const alturas = {
    sm: "h-2",
    md: "h-3.5",
    lg: "h-5"
  };

  return (
    <div className={cn("w-full space-y-1", className)}>
      <div className="flex items-center justify-between text-xs font-semibold text-[#1E1E1E]">
        {mostrarTexto && (
          <>
            <span>Progreso</span>
            <span>{porcentaje}%</span>
          </>
        )}
      </div>
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-[#EAEAF1] p-0.5 shadow-inner",
          alturas[tamano]
        )}
      >
        <div
          role="progressbar"
          aria-valuenow={porcentaje}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ width: `${porcentaje}%` }}
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            colorBarra
          )}
        />
      </div>
    </div>
  );
}
