"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Tarjeta, Boton, Badge } from "@/components/ui";
import { Modulo } from "@/types";
import { Lock, CheckCircle2, PlayCircle, Clock, BookOpen, ArrowRight, Award } from "lucide-react";

export default function DashboardPage() {
  const { usuario, modulos, progreso, cargando } = useApp();

  if (cargando) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3E4B8F] border-t-transparent" />
          <p className="text-sm font-semibold text-[#6C6C63]">Cargando tu mapa de aprendizaje...</p>
        </div>
      </div>
    );
  }

  const moduloActivo: Modulo =
    modulos.find((m) => m.estado === "en_progreso" || m.estado === "pendiente") || modulos[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* PORTADA DE BIENVENIDA / HERO DASHBOARD */}
      <Tarjeta
        fondoSuave="azul"
        className="relative overflow-hidden border-2 border-[#3E4B8F]/15 p-6 sm:p-10 shadow-sm"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2">
              <Badge variant="crema" size="md">
                👋 Hola, {usuario?.nombreCompleto || "Estudiante"}
              </Badge>
              <Badge variant="dorado" size="md">
                Racha: {progreso.rachaDias} días activos
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1E1E1E] tracking-tight">
              Continúa forjando tu criterio ético en software
            </h1>
            <p className="text-sm sm:text-base text-[#474747] leading-relaxed">
              Completa cada lección, ejercita tus reflejos éticos en los simuladores interactivos
              y aprueba los cuestionarios (mínimo 70%) para avanzar secuencialmente.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {moduloActivo && (
                <Link href={`/modulos/${moduloActivo.id}`}>
                  <Boton size="lg" className="gap-2 shadow-md w-full sm:w-auto">
                    <PlayCircle className="h-5 w-5" />
                    <span>Reanudar: Módulo {moduloActivo.numero}</span>
                  </Boton>
                </Link>
              )}
              <Link href="/manual">
                <Boton variant="secondary" size="lg" className="w-full sm:w-auto">
                  Guía de la plataforma
                </Boton>
              </Link>
            </div>
          </div>

          {/* TARJETA RESUMEN DE PROGRESO */}
          <div className="w-full lg:w-80 bg-white p-6 rounded-2xl border border-[#D8D8D8]/70 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-[#6C6C63] tracking-wider">
                Progreso General
              </span>
              <span className="text-2xl font-black text-[#3E4B8F]">
                {progreso.porcentajeCompletado}%
              </span>
            </div>
            <div className="w-full bg-[#EAEAF1] rounded-full h-3.5 p-0.5 shadow-inner">
              <div
                style={{ width: `${progreso.porcentajeCompletado}%` }}
                className="bg-[#FFB006] h-full rounded-full transition-all duration-500 ease-out"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#474747]">
              <div className="bg-[#FFF5EC] p-2.5 rounded-xl border border-[#FFDE97]/40 text-center">
                <span className="block font-bold text-base text-[#1E1E1E]">
                  {progreso.modulosCompletados} / {progreso.totalModulos}
                </span>
                <span>Módulos listos</span>
              </div>
              <div className="bg-[#F4F8FD] p-2.5 rounded-xl border border-[#D8D8D8]/50 text-center">
                <span className="block font-bold text-base text-[#3E4B8F]">
                  {progreso.todosModulosCompletados ? "Desbloqueado" : "En curso"}
                </span>
                <span>Proyecto Final</span>
              </div>
            </div>
          </div>
        </div>
      </Tarjeta>

      {/* MAPA SECUENCIAL DE LOS 5 MÓDULOS */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-black text-[#1E1E1E]">
              Ruta Secuencial de Aprendizaje
            </h2>
            <p className="text-sm text-[#6C6C63]">
              Avanza en orden: cada módulo se desbloquea al aprobar el anterior (RN-02).
            </p>
          </div>
          <Badge variant="indigo" size="md">
            5 Módulos Obligatorios
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modulos.map((modulo) => {
            const estaBloqueado = modulo.estado === "bloqueado";
            const estaCompletado = modulo.estado === "completado";
            const enProgreso = modulo.estado === "en_progreso";

            return (
              <Tarjeta
                key={modulo.id}
                fondoSuave={estaBloqueado ? "blanco" : estaCompletado ? "menta" : "blanco"}
                className={`relative flex flex-col justify-between p-6 transition-all ${
                  estaBloqueado
                    ? "opacity-60 bg-gray-50 border-dashed"
                    : "hover:scale-[1.01] border-[#3E4B8F]/30"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#3E4B8F]">
                      Módulo {modulo.numero}
                    </span>
                    {estaBloqueado && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500">
                        <Lock className="h-3.5 w-3.5" /> Bloqueado
                      </span>
                    )}
                    {estaCompletado && (
                      <Badge variant="verde" size="sm">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Aprobado
                      </Badge>
                    )}
                    {enProgreso && (
                      <Badge variant="dorado" size="sm">
                        En curso
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[#1E1E1E] leading-snug">
                    {modulo.titulo}
                  </h3>

                  <p className="text-xs text-[#474747] line-clamp-3 leading-relaxed">
                    {modulo.descripcion}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-medium text-[#6C6C63] pt-2 border-t border-[#D8D8D8]/50">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[#3E4B8F]" />
                      {modulo.duracionHoras} hrs
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5 text-[#3E4B8F]" />
                      {modulo.flashcards.length} Flashcards
                    </span>
                  </div>
                </div>

                <div className="pt-6">
                  {estaBloqueado ? (
                    <Boton
                      disabled
                      variant="secondary"
                      className="w-full text-xs gap-1.5 opacity-60"
                    >
                      <Lock className="h-3.5 w-3.5" /> Requisito previo pendiente
                    </Boton>
                  ) : (
                    <Link href={`/modulos/${modulo.id}`} className="block w-full">
                      <Boton
                        variant={estaCompletado ? "secondary" : "primary"}
                        className="w-full text-sm gap-2"
                      >
                        <span>{estaCompletado ? "Repasar módulo" : "Entrar al módulo"}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Boton>
                    </Link>
                  )}
                </div>
              </Tarjeta>
            );
          })}

          <Tarjeta
            fondoSuave="rosa"
            className="flex flex-col justify-between p-6 border-2 border-[#3E4B8F]/20"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#3E4B8F]">
                  Cierre de Curso
                </span>
                <Badge variant="indigo" size="sm">
                  Acreditación
                </Badge>
              </div>

              <h3 className="text-lg font-bold text-[#1E1E1E]">
                Proyecto y Examen Final
              </h3>

              <p className="text-xs text-[#474747] leading-relaxed">
                Acredita el 100% de los 5 módulos para entregar tu análisis ético aplicado y presentar
                el examen evaluador integral (RN-05).
              </p>

              <div className="p-3 bg-white/80 rounded-xl border border-[#D8D8D8]/60 text-xs space-y-1">
                <div className="flex items-center justify-between font-semibold">
                  <span>Proyecto entregado:</span>
                  <span className={progreso.proyectoEntregado ? "text-emerald-600" : "text-amber-600"}>
                    {progreso.proyectoEntregado ? "Sí" : "Pendiente"}
                  </span>
                </div>
                <div className="flex items-center justify-between font-semibold">
                  <span>Examen acreditado:</span>
                  <span className={progreso.examenFinalAprobado ? "text-emerald-600" : "text-gray-500"}>
                    {progreso.examenFinalAprobado ? "Aprobado (>=70%)" : "Bloqueado"}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link href="/proyecto-final" className="block w-full">
                <Boton
                  variant="primary"
                  className="w-full text-sm gap-2"
                  disabled={!progreso.todosModulosCompletados}
                >
                  <Award className="h-4 w-4" />
                  <span>
                    {progreso.todosModulosCompletados
                      ? "Ir a Proyecto y Examen"
                      : "Requiere 5 módulos (RN-05)"}
                  </span>
                </Boton>
              </Link>
            </div>
          </Tarjeta>
        </div>
      </div>
    </div>
  );
}
