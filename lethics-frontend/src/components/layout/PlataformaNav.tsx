"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, UserCircle2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { LethicsLogo } from "./LethicsLogo";

export function PlataformaNav() {
  const pathname = usePathname();
  const { progreso } = useApp();

  return (
    <header className="w-full px-4 pt-4 md:px-8 md:pt-7">
      <div className="mx-auto flex h-16 md:h-[112px] max-w-[1601px] items-center justify-between rounded-[56px] border border-black/50 bg-white px-5 md:px-14">
        <LethicsLogo href="/dashboard" size="md" />

        {/* Enlaces sutiles en escritorio para secciones de cierre y seguimiento */}
        <nav className="hidden lg:flex items-center gap-8 text-base font-bold text-[#3E4B8F]">
          <Link
            href="/dashboard"
            className={`transition-colors hover:opacity-80 ${
              pathname === "/dashboard" ? "underline underline-offset-4" : "opacity-75"
            }`}
          >
            Curso
          </Link>
          <Link
            href="/historial"
            className={`transition-colors hover:opacity-80 ${
              pathname.startsWith("/historial") ? "underline underline-offset-4" : "opacity-75"
            }`}
          >
            Historial
          </Link>
          <Link
            href="/proyecto-final"
            className={`transition-colors hover:opacity-80 ${
              pathname.startsWith("/proyecto-final") || pathname.startsWith("/examen-final")
                ? "underline underline-offset-4"
                : "opacity-75"
            }`}
          >
            Proyecto y Examen
          </Link>
          <Link
            href="/manual"
            className={`transition-colors hover:opacity-80 ${
              pathname.startsWith("/manual") ? "underline underline-offset-4" : "opacity-75"
            }`}
          >
            Manual
          </Link>
        </nav>

        {/* Bloque derecho fiel a Figma: Racha (#FFB006) + Ícono de perfil */}
        <div className="flex items-center gap-5 md:gap-12">
          <div
            className="flex items-center gap-1 select-none"
            title="Racha de días activos"
          >
            <span className="text-2xl md:text-[38px] font-extrabold leading-none text-[#FFB006]">
              {progreso.rachaDias}
            </span>
            <Flame className="h-7 w-7 md:h-11 md:w-11 text-[#FFB006] fill-[#FFDE97]" />
          </div>

          <Link
            href="/perfil"
            aria-label="Editar perfil"
            title="Editar perfil"
            className="flex h-10 w-10 md:h-[52px] md:w-[52px] items-center justify-center rounded-full text-[#FFDE97] hover:scale-105 transition-transform"
          >
            <UserCircle2 className="h-9 w-9 md:h-[50px] md:w-[50px] text-[#FFB006] stroke-[1.75]" />
          </Link>
        </div>
      </div>
    </header>
  );
}
