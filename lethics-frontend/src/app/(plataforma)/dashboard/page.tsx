"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  ArrowRight,
  ChevronDown,
  Lock,
  CheckCircle2,
  Layers,
  BookOpen,
  Award
} from "lucide-react";

export default function DashboardPage() {
  const { modulos, progreso, cargando } = useApp();
  const [tabActiva, setTabActiva] = useState<"descripcion" | "plan">("descripcion");
  const [moduloAbierto, setModuloAbierto] = useState<string | null>("modulo-1");

  if (cargando) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#3E4B8F] border-t-transparent" />
      </div>
    );
  }

  const moduloActivo =
    modulos.find((m) => m.estado === "en_progreso" || m.estado === "pendiente") || modulos[0];

  // Cálculo del anillo circular SVG (Figma 96:476)
  const porcentaje = progreso.porcentajeCompletado;
  const radio = 104;
  const circunferencia = 2 * Math.PI * radio;
  const offset = circunferencia - (porcentaje / 100) * circunferencia;

  return (
    <div className="mx-auto max-w-[1601px] px-4 py-6 md:px-8 md:py-8 space-y-7">
      {/* TARJETA SUPERIOR: COMPLETECOVER (Figma 96:464) */}
      <section className="rounded-[40px] border border-[#D8D8D8] bg-white p-6 md:p-10 shadow-[4px_4px_2px_#FFEBC2] space-y-6">
        <h1 className="text-2xl sm:text-3xl md:text-[44px] font-extrabold text-[#444] leading-tight">
          Introducción a la Ética de Software
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 px-2 md:px-10 py-2">
          {/* Izquierda: Espacio en blanco para ilustración + botón Iniciar curso */}
          <div className="flex flex-col items-center justify-center gap-6">
            <div
              aria-hidden="true"
              className="h-56 w-56 md:h-[290px] md:w-[290px] rounded-[32px] bg-white border-2 border-dashed border-[#D8D8D8]"
            />

            {moduloActivo && (
              <Link
                href={`/modulos/${moduloActivo.id}/leccion`}
                className="inline-flex h-14 md:h-[68px] w-full max-w-[360px] items-center justify-center gap-4 rounded-[48px] bg-[#3E4B8F] px-8 text-xl md:text-[26px] font-bold text-white hover:bg-[#323D75] transition-colors"
              >
                <span>
                  {progreso.porcentajeCompletado > 0 ? "Reanudar curso" : "Iniciar curso"}
                </span>
                <ArrowRight className="h-6 w-6" />
              </Link>
            )}
          </div>

          {/* Derecha: Anillo circular de progreso + 2 pills crema (Figma 96:474) */}
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="relative flex h-[220px] w-[220px] md:h-[260px] md:w-[260px] items-center justify-center">
              <svg
                className="h-full w-full -rotate-90"
                viewBox="0 0 240 240"
                aria-label={`Progreso del curso: ${porcentaje}%`}
              >
                <circle
                  cx="120"
                  cy="120"
                  r={radio}
                  fill="none"
                  stroke="#FFDE97"
                  strokeWidth="20"
                />
                <circle
                  cx="120"
                  cy="120"
                  r={radio}
                  fill="none"
                  stroke="#FFB006"
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeDasharray={circunferencia}
                  strokeDashoffset={offset}
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <span className="absolute text-3xl md:text-[38px] font-normal tracking-wider text-[#FFB006]">
                {porcentaje}%
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-7">
              <div className="inline-flex h-12 items-center justify-center gap-2.5 rounded-[26px] bg-[#FFEBC2] px-6 text-lg md:text-xl font-bold text-[#FFB006]">
                <Layers className="h-5 w-5" />
                <span>5 Módulos</span>
              </div>
              <div className="inline-flex h-12 items-center justify-center gap-2.5 rounded-[26px] bg-[#FFEBC2] px-6 text-lg md:text-xl font-bold text-[#FFB006]">
                <BookOpen className="h-5 w-5" />
                <span>50 lecciones</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TARJETA INFERIOR: TABS + DESCRIPCIÓN + DROPDOWNS DE MÓDULOS (Figma 105:2626) */}
      <section className="rounded-[40px] border border-[#D8D8D8] bg-white p-5 md:p-9 shadow-[4px_4px_2px_#FFEBC2] space-y-7">
        {/* Pestañas con sombra azul claro (Figma 101:1881) */}
        <div className="flex flex-wrap items-center gap-4 md:gap-12">
          <button
            type="button"
            onClick={() => setTabActiva("descripcion")}
            className={`min-w-[180px] md:min-w-[250px] rounded-[48px] border border-[#D8D8D8] px-6 py-2.5 text-lg md:text-2xl font-bold text-[#3E4B8F] shadow-[4px_4px_2px_#AED5F6] transition-all cursor-pointer ${
              tabActiva === "descripcion" ? "bg-[#F4F8FD]" : "bg-white hover:bg-gray-50"
            }`}
          >
            Descripción
          </button>
          <button
            type="button"
            onClick={() => setTabActiva("plan")}
            className={`min-w-[180px] md:min-w-[280px] rounded-[48px] border border-[#D8D8D8] px-6 py-2.5 text-lg md:text-2xl font-bold text-[#3E4B8F] shadow-[4px_4px_2px_#AED5F6] transition-all cursor-pointer ${
              tabActiva === "plan" ? "bg-[#F4F8FD]" : "bg-white hover:bg-gray-50"
            }`}
          >
            Plan de estudios
          </button>
        </div>

        {/* Caja de descripción o plan */}
        <div className="rounded-[32px] md:rounded-[40px] border border-[#D8D8D8] bg-white p-5 md:p-7">
          {tabActiva === "descripcion" ? (
            <p className="text-base sm:text-lg md:text-2xl text-[#444] text-justify leading-relaxed">
              Aprende sobre los principios éticos, las leyes y las normas que orientan el desarrollo
              de software. A través de lecciones interactivas, casos prácticos y actividades,
              descubrirás cómo tomar decisiones responsables y comprender el impacto de la
              tecnología en la sociedad.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base md:text-lg text-[#444]">
              {modulos.map((m) => (
                <div key={m.id} className="space-y-1">
                  <p className="font-bold text-[#3E4B8F]">
                    Módulo {m.numero}: {m.titulo}
                  </p>
                  <p className="text-sm text-[#6C6C63]">{m.descripcion}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lista de Dropdowns de los 5 módulos (Figma 195:1413 & 191:1394) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-5">
            {modulos.map((modulo) => {
              const bloqueado = modulo.estado === "bloqueado";
              const completado = modulo.estado === "completado";
              const abierto = moduloAbierto === modulo.id;

              return (
                <div key={modulo.id} className="space-y-2">
                  <button
                    type="button"
                    disabled={bloqueado}
                    onClick={() => setModuloAbierto(abierto ? null : modulo.id)}
                    className={`flex h-16 md:h-[78px] w-full items-center justify-between rounded-[32px] border border-[#D8D8D8] bg-white px-6 shadow-[0_4px_2px_#AFD6F6] transition-all ${
                      bloqueado
                        ? "opacity-55 cursor-not-allowed"
                        : "cursor-pointer hover:bg-[#F4F8FD]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-xl md:text-[28px] font-bold text-[#3E4B8F]">
                        Módulo {modulo.numero}
                      </span>
                      {completado && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                      {bloqueado && <Lock className="h-5 w-5 text-[#80849D]" />}
                    </div>
                    <ChevronDown
                      className={`h-7 w-7 text-[#3E4B8F] transition-transform duration-200 ${
                        abierto ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Contenido desplegable fiel a Figma (191:1394) */}
                  {abierto && !bloqueado && (
                    <div className="overflow-hidden rounded-[32px] border border-[#D8D8D8] bg-white shadow-[0_4px_2px_rgba(0,0,0,0.25)]">
                      <Link
                        href={`/modulos/${modulo.id}/leccion`}
                        className="flex items-center justify-between border-b border-[#3E4B8F] px-6 py-4 hover:bg-[#F4F8FD] transition-colors"
                      >
                        <div>
                          <p className="text-xl md:text-2xl font-bold text-[#3E4B8F]">
                            Lección {modulo.numero}
                          </p>
                          <p className="text-base md:text-lg text-[#3E4B8F]/85">
                            {modulo.leccion.titulo}
                          </p>
                        </div>
                        {modulo.leccion.completada && (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                        )}
                      </Link>

                      <Link
                        href={`/modulos/${modulo.id}/flashcards`}
                        className="flex items-center justify-between border-b border-[#3E4B8F] px-6 py-4 hover:bg-[#F4F8FD] transition-colors"
                      >
                        <div>
                          <p className="text-xl md:text-2xl font-bold text-[#3E4B8F]">
                            Flashcards
                          </p>
                          <p className="text-base md:text-lg text-[#3E4B8F]/85">
                            Repaso interactivo ({modulo.flashcards.length} tarjetas)
                          </p>
                        </div>
                      </Link>

                      <Link
                        href={`/modulos/${modulo.id}/simulador`}
                        className="flex items-center justify-between border-b border-[#3E4B8F] px-6 py-4 hover:bg-[#F4F8FD] transition-colors"
                      >
                        <div>
                          <p className="text-xl md:text-2xl font-bold text-[#3E4B8F]">
                            Simulador ético
                          </p>
                          <p className="text-base md:text-lg text-[#3E4B8F]/85">
                            {modulo.simulador.titulo}
                          </p>
                        </div>
                        {modulo.simuladorCompletado && (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                        )}
                      </Link>

                      <Link
                        href={`/modulos/${modulo.id}/cuestionario`}
                        className="flex items-center justify-between px-6 py-4 hover:bg-[#F4F8FD] transition-colors"
                      >
                        <div>
                          <p className="text-xl md:text-2xl font-bold text-[#3E4B8F]">
                            Cuestionario
                          </p>
                          <p className="text-base md:text-lg text-[#3E4B8F]/85">
                            Evaluación del módulo (mínimo 70%)
                          </p>
                        </div>
                        {modulo.cuestionarioAprobado && (
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                            {modulo.mejorCalificacionCuestionario}%
                          </span>
                        )}
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bloque lateral limpio de cierre (Proyecto Final y Examen Final - RN-05) */}
          <div className="lg:col-span-6 space-y-5">
            <div className="rounded-[32px] border border-[#D8D8D8] bg-[#FFF5EC]/60 p-6 md:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#3E4B8F]">Cierre del Curso</h2>
                <Award className="h-7 w-7 text-[#FFB006]" />
              </div>
              <p className="text-base text-[#444] leading-relaxed">
                Al completar el 100% de los 5 módulos podrás entregar tu Proyecto Final y desbloquear
                el Examen Final Integrador (RN-05).
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/proyecto-final"
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-[48px] bg-[#3E4B8F] px-6 text-base font-bold text-white hover:bg-[#323D75] transition-colors"
                >
                  <span>Proyecto Final</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/examen-final"
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-[48px] border-2 border-[#3B3485] bg-white px-6 text-base font-bold text-[#3E4B8F] hover:bg-[#EAEAF1] transition-colors"
                >
                  <span>Examen Final</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
