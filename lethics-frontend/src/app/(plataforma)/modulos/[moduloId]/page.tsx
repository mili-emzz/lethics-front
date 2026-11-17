"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Tarjeta, Boton, Badge } from "@/components/ui";
import {
  BookOpen,
  Layers,
  Cpu,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Clock,
  Target
} from "lucide-react";

export default function ModuloInfoPage({
  params
}: {
  params: Promise<{ moduloId: string }>;
}) {
  const { moduloId } = use(params);
  const { modulos, cargando } = useApp();

  const [tabActiva, setTabActiva] = useState<"descripcion" | "plan">("descripcion");

  const modulo = modulos.find((m) => m.id === moduloId) || null;

  if (cargando || !modulo) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3E4B8F] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* BOTÓN VOLVER */}
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#3E4B8F] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al mapa de módulos
        </Link>
      </div>

      {/* CABECERA PRINCIPAL */}
      <Tarjeta fondoSuave="azul" className="p-6 sm:p-10 border-[#3E4B8F]/20 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="indigo" size="md">
              Módulo {modulo.numero}
            </Badge>
            <Badge variant="crema" size="md">
              {modulo.duracionHoras} Horas estimadas
            </Badge>
          </div>
          {modulo.cuestionarioAprobado && (
            <Badge variant="verde" size="md">
              <CheckCircle2 className="h-4 w-4" /> Módulo Aprobado
            </Badge>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#1E1E1E]">
          {modulo.titulo}
        </h1>

        <p className="text-base sm:text-lg text-[#474747] leading-relaxed max-w-3xl">
          {modulo.descripcion}
        </p>

        {/* PESTAÑAS: DESCRIPCIÓN Y PLAN DE ESTUDIOS */}
        <div className="flex items-center gap-3 border-b border-[#D8D8D8] pt-4">
          <button
            onClick={() => setTabActiva("descripcion")}
            className={`pb-3 text-sm font-bold transition-colors border-b-2 -mb-[2px] ${
              tabActiva === "descripcion"
                ? "border-[#3E4B8F] text-[#3E4B8F]"
                : "border-transparent text-[#6C6C63] hover:text-[#1E1E1E]"
            }`}
          >
            Objetivos y Enfoque
          </button>
          <button
            onClick={() => setTabActiva("plan")}
            className={`pb-3 text-sm font-bold transition-colors border-b-2 -mb-[2px] ${
              tabActiva === "plan"
                ? "border-[#3E4B8F] text-[#3E4B8F]"
                : "border-transparent text-[#6C6C63] hover:text-[#1E1E1E]"
            }`}
          >
            Plan de Estudios
          </button>
        </div>

        {/* CONTENIDO DE PESTAÑA */}
        {tabActiva === "descripcion" ? (
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#3E4B8F] flex items-center gap-2">
              <Target className="h-4 w-4" /> Objetivos de aprendizaje
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {modulo.objetivos.map((obj, i) => (
                <li
                  key={i}
                  className="bg-white p-4 rounded-xl border border-[#D8D8D8]/70 text-xs sm:text-sm text-[#474747] leading-snug flex items-start gap-2"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#3E4B8F] flex items-center gap-2">
              <Clock className="h-4 w-4" /> Unidades temáticas
            </h3>
            <div className="space-y-2">
              {modulo.planEstudio.map((unidad, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-xl border border-[#D8D8D8]/60 text-sm font-medium text-[#1E1E1E]"
                >
                  {unidad}
                </div>
              ))}
            </div>
          </div>
        )}
      </Tarjeta>

      {/* RUTAS Y ACTIVIDADES DEL MÓDULO */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-[#1E1E1E]">Actividades del Módulo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. LECCIÓN TEÓRICA */}
          <Tarjeta className="flex flex-col justify-between p-6 space-y-4 border-[#3E4B8F]/20">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[#3E4B8F]/10 text-[#3E4B8F] flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-[#1E1E1E]">Lección Teórica</h3>
              <p className="text-xs text-[#6C6C63] leading-relaxed">
                Lectura interactiva con autoguardado continuo de tu avance por secciones.
              </p>
              {modulo.leccion.completada && (
                <Badge variant="verde" size="sm">
                  Completada
                </Badge>
              )}
            </div>
            <Link href={`/modulos/${modulo.id}/leccion`}>
              <Boton variant="primary" className="w-full text-xs gap-1.5">
                <span>{modulo.leccion.completada ? "Repasar Lección" : "Iniciar Lección"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Boton>
            </Link>
          </Tarjeta>

          {/* 2. FLASHCARDS */}
          <Tarjeta className="flex flex-col justify-between p-6 space-y-4 border-[#3E4B8F]/20">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[#FFECC2] text-[#8c5e00] flex items-center justify-center">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-[#1E1E1E]">Flashcards</h3>
              <p className="text-xs text-[#6C6C63] leading-relaxed">
                Repaso espaciado con mazo interactivo 3D y opción de barajado.
              </p>
              <Badge variant="crema" size="sm">
                {modulo.flashcards.length} Tarjetas
              </Badge>
            </div>
            <Link href={`/modulos/${modulo.id}/flashcards`}>
              <Boton variant="secondary" className="w-full text-xs gap-1.5">
                <span>Practicar Tarjetas</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Boton>
            </Link>
          </Tarjeta>

          {/* 3. SIMULADOR ÉTICO */}
          <Tarjeta className="flex flex-col justify-between p-6 space-y-4 border-[#3E4B8F]/20">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-purple-100 text-[#3E4B8F] flex items-center justify-center">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-[#1E1E1E]">Simulador Ético</h3>
              <p className="text-xs text-[#6C6C63] leading-relaxed">
                Dilema real con retroalimentación cualitativa de IA (RN-06).
              </p>
              {modulo.simuladorCompletado ? (
                <Badge variant="verde" size="sm">
                  Caso Resuelto
                </Badge>
              ) : (
                <Badge variant="dorado" size="sm">
                  Obligatorio (RN-02)
                </Badge>
              )}
            </div>
            <Link href={`/modulos/${modulo.id}/simulador`}>
              <Boton
                variant={modulo.simuladorCompletado ? "secondary" : "primary"}
                className="w-full text-xs gap-1.5"
              >
                <span>{modulo.simuladorCompletado ? "Ver caso y respuesta" : "Resolver Dilema"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Boton>
            </Link>
          </Tarjeta>

          {/* 4. CUESTIONARIO EVALUATIVO */}
          <Tarjeta className="flex flex-col justify-between p-6 space-y-4 border-[#3E4B8F]/20">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-[#1E1E1E]">Cuestionario</h3>
              <p className="text-xs text-[#6C6C63] leading-relaxed">
                Opción múltiple con umbral mínimo de 70% e intentos ilimitados (RN-03, RN-04).
              </p>
              {modulo.cuestionarioAprobado ? (
                <Badge variant="verde" size="sm">
                  Aprobado ({modulo.mejorCalificacionCuestionario}%)
                </Badge>
              ) : (
                <Badge variant="rojo" size="sm">
                  Requiere ≥ 70%
                </Badge>
              )}
            </div>
            <Link href={`/modulos/${modulo.id}/cuestionario`}>
              <Boton
                variant={modulo.cuestionarioAprobado ? "secondary" : "primary"}
                className="w-full text-xs gap-1.5"
              >
                <span>{modulo.cuestionarioAprobado ? "Reintentar para mejorar" : "Presentar Test"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Boton>
            </Link>
          </Tarjeta>
        </div>
      </div>
    </div>
  );
}
