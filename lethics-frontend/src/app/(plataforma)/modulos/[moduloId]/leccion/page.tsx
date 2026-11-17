"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Tarjeta, Boton, Badge } from "@/components/ui";
import { modulosService } from "@/services/mocks";
import { ArrowLeft, ArrowRight, CheckCircle2, Save } from "lucide-react";
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

  const completarLeccion = async () => {
    setGuardando(true);
    try {
      await modulosService.marcarLeccionCompletada(modulo.id);
      await recargarProgreso();
      toast.success("¡Lección completada con éxito!");
      router.push(`/modulos/${modulo.id}`);
    } catch {
      toast.error("Error al registrar avance.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* NAVEGACIÓN SUPERIOR Y ESTADO DE AUTOGUARDADO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8D8D8]/60 pb-4">
        <Link
          href={`/modulos/${modulo.id}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#3E4B8F] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a info del módulo
        </Link>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-[#6C6C63] font-medium bg-white px-3 py-1 rounded-full border border-[#D8D8D8]/50">
            <Save className={`h-3.5 w-3.5 ${guardando ? "animate-pulse text-[#3E4B8F]" : "text-emerald-600"}`} />
            {guardando ? "Autoguardando..." : "Progreso autoguardado"}
          </span>
          <Badge variant="indigo" size="sm">
            Sección {seccionActual + 1} de {secciones.length}
          </Badge>
        </div>
      </div>

      {/* ÍNDICE RÁPIDO DE SECCIONES (TABS) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {secciones.map((sec, idx) => (
          <button
            key={sec.id}
            onClick={() => cambiarSeccion(idx)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
              idx === seccionActual
                ? "bg-[#3E4B8F] text-white shadow-xs"
                : "bg-white text-[#6C6C63] hover:bg-[#EAEAF1] border border-[#D8D8D8]/60"
            }`}
          >
            Sección {idx + 1}
          </button>
        ))}
      </div>

      {/* CONTENIDO SOLO LECTURA DE LA LECCIÓN (RN-07) */}
      <Tarjeta className="p-6 sm:p-10 bg-white border border-[#D8D8D8] space-y-6 shadow-sm">
        <div className="space-y-2 border-b border-[#D8D8D8]/50 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3E4B8F]">
            {modulo.titulo}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1E1E1E]">
            {actual.titulo}
          </h1>
        </div>

        <div className="prose prose-slate max-w-none text-[#1E1E1E] leading-relaxed text-base sm:text-lg space-y-4">
          <p className="whitespace-pre-line">{actual.contenido}</p>
        </div>
      </Tarjeta>

      {/* BARRA DE NAVEGACIÓN INFERIOR */}
      <div className="flex items-center justify-between pt-4">
        <Boton
          variant="secondary"
          disabled={seccionActual === 0}
          onClick={() => cambiarSeccion(seccionActual - 1)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Anterior</span>
        </Boton>

        {esUltima ? (
          <Boton
            variant="primary"
            onClick={completarLeccion}
            cargando={guardando}
            className="gap-2 bg-emerald-700 hover:bg-emerald-800"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Completar Lección</span>
          </Boton>
        ) : (
          <Boton
            variant="primary"
            onClick={() => cambiarSeccion(seccionActual + 1)}
            className="gap-2"
          >
            <span>Siguiente</span>
            <ArrowRight className="h-4 w-4" />
          </Boton>
        )}
      </div>
    </div>
  );
}
