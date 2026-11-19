"use client";

import React, { use } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { CursoShell } from "@/components/layout/CursoShell";
import { BookOpen, Layers, Cpu, HelpCircle, CheckCircle2, ArrowRight } from "lucide-react";

export default function ModuloInfoPage({
  params
}: {
  params: Promise<{ moduloId: string }>;
}) {
  const { moduloId } = use(params);
  const { modulos, cargando } = useApp();

  const modulo = modulos.find((m) => m.id === moduloId) || null;

  if (cargando || !modulo) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3E4B8F] border-t-transparent" />
      </div>
    );
  }

  return (
    <CursoShell moduloId={modulo.id} pasoActivo={1} mostrarStepper={false}>
      <div className="flex-1 flex flex-col justify-between gap-8 px-1 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex rounded-full bg-[#FFECC2] px-4 py-1 text-sm font-bold text-[#FFB006]">
              Módulo {modulo.numero} · {modulo.duracionHoras} horas
            </span>
            <h1 className="text-3xl md:text-[42px] font-extrabold text-[#444] leading-tight">
              {modulo.titulo}
            </h1>
            <p className="text-base md:text-xl text-black text-justify leading-relaxed">
              {modulo.descripcion}
            </p>
            <div className="space-y-2 pt-2">
              <h2 className="text-lg font-bold text-[#3E4B8F]">Objetivos de aprendizaje</h2>
              <ul className="space-y-2 text-base text-[#444]">
                {modulo.objetivos.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#FFB006] shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Espacio en blanco reservado para ilustración */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div
              aria-hidden="true"
              className="w-full max-w-[440px] aspect-[504/362] rounded-[24px] bg-white border-2 border-dashed border-[#D8D8D8]"
            />
          </div>
        </div>

        {/* Actividades del módulo en el estilo de dropdown/tarjetas Figma */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <Link
            href={`/modulos/${modulo.id}/leccion`}
            className="flex flex-col justify-between gap-3 rounded-[24px] border border-[#D8D8D8] bg-white p-5 shadow-[0_4px_2px_#AFD6F6] hover:bg-[#F4F8FD]/50 transition-colors"
          >
            <BookOpen className="h-7 w-7 text-[#3E4B8F]" />
            <div>
              <p className="text-xl font-bold text-[#3E4B8F]">1. Lección</p>
              <p className="text-sm text-[#6C6C63]">Lectura guiada con autoguardado</p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-[#3E4B8F]">
              Abrir <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href={`/modulos/${modulo.id}/flashcards`}
            className="flex flex-col justify-between gap-3 rounded-[24px] border border-[#D8D8D8] bg-white p-5 shadow-[0_4px_2px_#FFEBC2] hover:bg-[#FFF5EC]/60 transition-colors"
          >
            <Layers className="h-7 w-7 text-[#FFB006]" />
            <div>
              <p className="text-xl font-bold text-[#3E4B8F]">2. Flashcards</p>
              <p className="text-sm text-[#6C6C63]">{modulo.flashcards.length} tarjetas interactivas</p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-[#3E4B8F]">
              Practicar <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href={`/modulos/${modulo.id}/simulador`}
            className="flex flex-col justify-between gap-3 rounded-[24px] border border-[#D8D8D8] bg-white p-5 shadow-[0_4px_2px_#AFD6F6] hover:bg-[#F4F8FD]/50 transition-colors"
          >
            <Cpu className="h-7 w-7 text-[#3E4B8F]" />
            <div>
              <p className="text-xl font-bold text-[#3E4B8F]">3. Simulador</p>
              <p className="text-sm text-[#6C6C63]">Caso ético con feedback IA</p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-[#3E4B8F]">
              Resolver <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href={`/modulos/${modulo.id}/cuestionario`}
            className="flex flex-col justify-between gap-3 rounded-[24px] border border-[#D8D8D8] bg-white p-5 shadow-[0_4px_2px_#FFEBC2] hover:bg-[#FFF5EC]/60 transition-colors"
          >
            <HelpCircle className="h-7 w-7 text-[#3B3485]" />
            <div>
              <p className="text-xl font-bold text-[#3E4B8F]">4. Cuestionario</p>
              <p className="text-sm text-[#6C6C63]">Evaluación mínima del 70%</p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-[#3E4B8F]">
              Iniciar <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </CursoShell>
  );
}
