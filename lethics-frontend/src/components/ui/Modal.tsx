"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  abierto: boolean;
  alCerrar: () => void;
  titulo?: string;
  descripcion?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  abierto,
  alCerrar,
  titulo,
  descripcion,
  children,
  className
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") alCerrar();
    };
    if (abierto) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [abierto, alCerrar]);

  if (!abierto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="fixed inset-0"
        onClick={alCerrar}
        aria-hidden="true"
      />
      <div
        className={cn(
          "relative w-full max-w-lg rounded-2xl bg-white p-6 md:p-8 shadow-xl border border-[#D8D8D8] z-10 max-h-[90vh] overflow-y-auto",
          className
        )}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            {titulo && (
              <h3 className="text-xl font-bold text-[#1E1E1E]">{titulo}</h3>
            )}
            {descripcion && (
              <p className="text-sm text-[#6C6C63] mt-1">{descripcion}</p>
            )}
          </div>
          <button
            onClick={alCerrar}
            className="rounded-full p-1.5 text-[#6C6C63] hover:bg-[#EAEAF1] hover:text-[#1E1E1E] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
