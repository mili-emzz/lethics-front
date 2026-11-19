"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, History, Award, UserCircle2 } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const enlaces = [
    { href: "/dashboard", label: "Curso", icono: BookOpen },
    { href: "/historial", label: "Historial", icono: History },
    { href: "/proyecto-final", label: "Cierre", icono: Award },
    { href: "/perfil", label: "Perfil", icono: UserCircle2 }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/20 bg-white px-2 py-2 lg:hidden shadow-lg">
      <div className="flex items-center justify-around">
        {enlaces.map((enlace) => {
          const Icono = enlace.icono;
          const activo = pathname.startsWith(enlace.href);
          return (
            <Link
              key={enlace.href}
              href={enlace.href}
              className={`flex flex-col items-center gap-1 rounded-2xl px-3 py-1.5 text-xs font-bold transition-all min-h-[48px] justify-center ${
                activo
                  ? "text-[#3E4B8F] bg-[#FFF5EC]"
                  : "text-[#6C6C63] hover:text-[#1E1E1E]"
              }`}
            >
              <Icono className={`h-5 w-5 ${activo ? "stroke-[2.5]" : "stroke-2"}`} />
              <span>{enlace.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
