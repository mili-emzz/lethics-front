"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { modulosService } from "@/services/mocks";
import { CursoShell } from "@/components/layout/CursoShell";
import { Save, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function LeccionPage({
  params
}: {
  params: Promise<{ moduloId: string }>;
}) {
  const router = useRouter();
  const { moduloId } = use(params);
  const { modulos, recargarProgreso } = useApp();

  const modulo = modulos.find((m) => m.id === moduloId) || null;
  const [seccionActual, setSeccionActual] = useState(0);
  const [guardando, setGuardando] = useState(false);

  if (!modulo) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3E4B8F] border-t-transparent" />
      </div>
    );
  }

  const secciones = modulo.leccion.secciones;
  const actual = secciones[seccionActual] || secciones[0];
  const esUltima = seccionActual === secciones.length - 1;

  const cambiarSeccion = async (nuevoIndice: number) => {
    if (nuevoIndice < 0 || nuevoIndice >= secciones.length) return;
    setSeccionActual(nuevoIndice);
    setGuardando(true);
    try {
      await modulosService.guardarProgresoLeccion(modulo.id, nuevoIndice);
    } finally {
      setGuardando(false);
    }
  };

  const avanzarOSiguiente = async () => {
    if (!esUltima) {
      await cambiarSeccion(seccionActual + 1);
      return;
    }
    setGuardando(true);
    try {
      await modulosService.marcarLeccionCompletada(modulo.id);
      await recargarProgreso();
      toast.success("Lección completada. Continuando a Flashcards.");
      router.push(`/modulos/${modulo.id}/flashcards`);
    } finally {
      setGuardando(false);
    }
  };

  const retrocederOAnterior = async () => {
    if (seccionActual > 0) {
      await cambiarSeccion(seccionActual - 1);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <CursoShell
      moduloId={modulo.id}
      pasoActivo={1}
      onAnterior={retrocederOAnterior}
      onSiguiente={avanzarOSiguiente}
    >
      {/* Contenido de 2 columnas fiel a Figma CursoInfo (120:2293) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-10 px-1 md:px-6">
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Indicador discreto de sección y autoguardado */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {secciones.map((sec, idx) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => cambiarSeccion(idx)}
                  className={`rounded-full px-3.5 py-1 text-xs font-bold transition-colors cursor-pointer ${
                    idx === seccionActual
                      ? "bg-[#3E4B8F] text-white"
                      : "bg-[#FFF5EC] text-[#3E4B8F] hover:bg-[#FFECC2]"
                  }`}
                >
                  Sección {idx + 1}
                </button>
              ))}
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6C6C63]">
              <Save className={`h-3.5 w-3.5 ${guardando ? "animate-pulse text-[#3E4B8F]" : "text-emerald-600"}`} />
              {guardando ? "Autoguardando..." : "Autoguardado"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-[42px] font-extrabold text-[#444] leading-tight">
            {actual.titulo}
          </h1>

          <div className="text-base sm:text-lg md:text-[24px] text-black text-justify leading-relaxed space-y-4">
            <p className="whitespace-pre-line">{actual.contenido}</p>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={avanzarOSiguiente}
              disabled={guardando}
              className="inline-flex h-12 md:h-14 items-center justify-center gap-2 rounded-[48px] bg-[#3E4B8F] px-8 text-base md:text-xl font-bold text-white hover:bg-[#323D75] transition-colors cursor-pointer"
            >
              {esUltima ? (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Completar y pasar a Flashcards</span>
                </>
              ) : (
                <span>Siguiente sección</span>
              )}
            </button>
          </div>
        </div>

        {/* Espacio en blanco reservado para ilustración (Figma 118:2221) */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div
            aria-hidden="true"
            className="w-full max-w-[460px] aspect-[504/362] rounded-[24px] bg-white border-2 border-dashed border-[#D8D8D8]"
          />
        </div>
      </div>
    </CursoShell>
  );
}
