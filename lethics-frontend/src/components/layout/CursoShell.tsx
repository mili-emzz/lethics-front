"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Layers,
  Cpu,
  HelpCircle,
  Home,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface CursoShellProps {
  moduloId: string;
  pasoActivo?: 1 | 2 | 3 | 4; // 1: Lección, 2: Flashcards, 3: Simulador, 4: Cuestionario
  mostrarStepper?: boolean;
  onAnterior?: () => void;
  onSiguiente?: () => void;
  children: React.ReactNode;
}

export function CursoShell({
  moduloId,
  pasoActivo = 1,
  mostrarStepper = true,
  onAnterior,
  onSiguiente,
  children
}: CursoShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const rutasPasos = [
    `/modulos/${moduloId}/leccion`,
    `/modulos/${moduloId}/flashcards`,
    `/modulos/${moduloId}/simulador`,
    `/modulos/${moduloId}/cuestionario`
  ];

  const itemsBarra = [
    { href: "/dashboard", icono: Home, label: "Inicio" },
    { href: rutasPasos[0], icono: BookOpen, label: "Lección", paso: 1 },
    { href: rutasPasos[1], icono: Layers, label: "Flashcards", paso: 2 },
    { href: rutasPasos[2], icono: Cpu, label: "Simulador", paso: 3 },
    { href: rutasPasos[3], icono: HelpCircle, label: "Cuestionario", paso: 4 }
  ];

  const irAnterior = () => {
    if (onAnterior) return onAnterior();
    if (pasoActivo > 1) {
      router.push(rutasPasos[pasoActivo - 2]);
    } else {
      router.push("/dashboard");
    }
  };

  const irSiguiente = () => {
    if (onSiguiente) return onSiguiente();
    if (pasoActivo < 4) {
      router.push(rutasPasos[pasoActivo]);
    }
  };

  return (
    <div className="mx-auto max-w-[1601px] px-4 py-6 md:px-8 md:py-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-9 items-stretch">
        {/* BARRA LATERAL IZQUIERDA (Figma: 110px blanca con borde negro/50, rounded-24px) */}
        <aside className="hidden lg:flex w-[110px] shrink-0 flex-col items-center justify-start gap-6 rounded-[24px] border border-black/50 bg-white py-8">
          {itemsBarra.map((item) => {
            const Icono = item.icono;
            const activo =
              item.paso !== undefined
                ? item.paso === pasoActivo
                : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                aria-label={item.label}
                className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all ${
                  activo
                    ? "bg-[#3E4B8F] text-white shadow-sm"
                    : "text-[#3E4B8F]/70 hover:bg-[#FFF5EC] hover:text-[#3E4B8F]"
                }`}
              >
                <Icono className="h-6 w-6" />
              </Link>
            );
          })}
        </aside>

        {/* BARRA SUPERIOR COMPACTA EN MÓVIL */}
        <div className="flex lg:hidden items-center justify-between gap-2 rounded-[20px] border border-black/30 bg-white p-2">
          {itemsBarra.map((item) => {
            const Icono = item.icono;
            const activo =
              item.paso !== undefined
                ? item.paso === pasoActivo
                : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-[11px] font-bold transition-colors ${
                  activo ? "bg-[#3E4B8F] text-white" : "text-[#3E4B8F]"
                }`}
              >
                <Icono className="h-4 w-4" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* CONTENEDOR PRINCIPAL BLANCO (Figma: border #808080, rounded-24px) */}
        <section className="flex-1 rounded-[24px] border border-[#808080] bg-white p-6 md:p-10 min-h-[640px] flex flex-col">
          {/* STEPPER DORADO SUPERIOR (Figma: flechas circulares #FFB006 y 4 puntos unidos por líneas) */}
          {mostrarStepper && (
            <div className="mb-8 md:mb-12 flex items-center justify-between gap-4 md:gap-10 px-1 md:px-6">
              <button
                type="button"
                onClick={irAnterior}
                aria-label="Paso anterior"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFB006] text-white shadow-xs hover:brightness-95 transition cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5 stroke-[3]" />
              </button>

              <div className="flex flex-1 items-center justify-between max-w-4xl mx-auto">
                {[1, 2, 3, 4].map((paso, idx) => {
                  const completadoOActivo = paso <= pasoActivo;
                  return (
                    <React.Fragment key={paso}>
                      <Link
                        href={rutasPasos[idx]}
                        aria-label={`Ir al paso ${paso}`}
                        className={`h-7 w-7 md:h-9 md:w-9 shrink-0 rounded-full transition-all ${
                          completadoOActivo
                            ? "bg-[#FFB006] scale-100"
                            : "bg-[#FFDE97] hover:bg-[#FFB006]/70"
                        }`}
                      />
                      {idx < 3 && (
                        <div className="mx-2 md:mx-4 h-[2px] flex-1 bg-[#D8D8D8]" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={irSiguiente}
                disabled={pasoActivo >= 4 && !onSiguiente}
                aria-label="Siguiente paso"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFB006] text-white shadow-xs hover:brightness-95 transition disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="h-5 w-5 stroke-[3]" />
              </button>
            </div>
          )}

          {/* CONTENIDO DE LA VISTA */}
          <div className="flex-1 flex flex-col">{children}</div>
        </section>
      </div>
    </div>
  );
}
