"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, User as UserIcon, BookOpen, Award, History, HelpCircle, LogOut } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function Header() {
  const pathname = usePathname();
  const { usuario, progreso, cerrarSesionUsuario } = useApp();

  const esRutaPublica =
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/registro") ||
    pathname.startsWith("/verificar-correo");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#D8D8D8]/60 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link href={usuario ? "/dashboard" : "/"} className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3E4B8F] text-white font-bold text-xl shadow-sm group-hover:scale-105 transition-transform">
            L
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-tight text-[#3E4B8F]">
              Lethics
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#FFB006] -mt-1 hidden sm:block">
              Ética en Software
            </span>
          </div>
        </Link>

        {/* NAVEGACIÓN O INDICADORES */}
        {esRutaPublica && !usuario ? (
          <div className="flex items-center gap-3 md:gap-6">
            <Link
              href="/#nosotros"
              className="text-sm font-medium text-[#474747] hover:text-[#3E4B8F] hidden md:block transition-colors"
            >
              Nosotros
            </Link>
            <Link
              href="/#modulos"
              className="text-sm font-medium text-[#474747] hover:text-[#3E4B8F] hidden md:block transition-colors"
            >
              Módulos
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-[#3E4B8F] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#323D75] transition-all"
            >
              Iniciar sesión
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3 sm:gap-6">
            {/* ENLACES RÁPIDOS ESCRITORIO */}
            <nav className="hidden lg:flex items-center gap-5 mr-2">
              <Link
                href="/dashboard"
                className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  pathname === "/dashboard" ? "text-[#3E4B8F]" : "text-[#6C6C63] hover:text-[#1E1E1E]"
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Módulos</span>
              </Link>
              <Link
                href="/historial"
                className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  pathname === "/historial" ? "text-[#3E4B8F]" : "text-[#6C6C63] hover:text-[#1E1E1E]"
                }`}
              >
                <History className="h-4 w-4" />
                <span>Historial</span>
              </Link>
              <Link
                href="/proyecto-final"
                className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  pathname === "/proyecto-final" ? "text-[#3E4B8F]" : "text-[#6C6C63] hover:text-[#1E1E1E]"
                }`}
              >
                <Award className="h-4 w-4" />
                <span>Cierre</span>
              </Link>
              <Link
                href="/manual"
                className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  pathname === "/manual" ? "text-[#3E4B8F]" : "text-[#6C6C63] hover:text-[#1E1E1E]"
                }`}
              >
                <HelpCircle className="h-4 w-4" />
                <span>Manual</span>
              </Link>
            </nav>

            {/* RACHA DIARIA (DESIGN.MD: #FFB006) */}
            <div
              className="flex items-center gap-1.5 rounded-full bg-[#FFECC2] px-3 py-1.5 text-xs sm:text-sm font-bold text-[#1E1E1E] border border-[#FFDE97] shadow-2xs"
              title="Racha de estudio activa"
            >
              <Flame className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFB006] fill-[#FFB006] animate-pulse" />
              <span>{progreso.rachaDias} días</span>
            </div>

            {/* PROGRESO GLOBAL % */}
            <div className="hidden sm:flex items-center gap-2 bg-[#F4F8FD] px-3.5 py-1.5 rounded-full border border-[#D8D8D8]/60">
              <span className="text-xs font-semibold text-[#6C6C63]">Avance:</span>
              <span className="text-sm font-bold text-[#3E4B8F]">
                {progreso.porcentajeCompletado}%
              </span>
            </div>

            {/* PERFIL / LOGOUT */}
            <div className="flex items-center gap-2">
              <div
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#3E4B8F]/10 border border-[#3E4B8F]/20 text-[#3E4B8F] font-bold text-sm"
                title={usuario?.nombreCompleto || "Estudiante"}
              >
                {usuario?.nombreCompleto ? usuario.nombreCompleto.charAt(0).toUpperCase() : <UserIcon className="h-4 w-4" />}
              </div>
              <button
                onClick={() => cerrarSesionUsuario()}
                className="p-2 text-[#6C6C63] hover:text-[#FF5E19] hover:bg-[#FEF5F8] rounded-full transition-colors hidden sm:block"
                title="Cerrar sesión"
                aria-label="Cerrar sesión"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
