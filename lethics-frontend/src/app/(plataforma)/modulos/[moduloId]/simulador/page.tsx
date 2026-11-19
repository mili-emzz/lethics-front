"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SimuladorRespuestaSchema, SimuladorRespuestaFormData } from "@/lib/validations";
import { useApp } from "@/context/AppContext";
import { modulosService } from "@/services/mocks";
import { SimuladorRetroalimentacion } from "@/types";
import { CursoShell } from "@/components/layout/CursoShell";
import { Sparkles, ArrowRight, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function SimuladorPage({
  params
}: {
  params: Promise<{ moduloId: string }>;
}) {
  const { moduloId } = use(params);
  const { modulos, recargarProgreso } = useApp();

  const modulo = modulos.find((m) => m.id === moduloId) || null;
  const [retroalimentacion, setRetroalimentacion] =
    useState<SimuladorRetroalimentacion | null>(null);
  const [respuestaEnviada, setRespuestaEnviada] = useState("");
  const [analizando, setAnalizando] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SimuladorRespuestaFormData>({
    resolver: zodResolver(SimuladorRespuestaSchema),
    defaultValues: { textoRespuesta: "" }
  });

  if (!modulo) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3E4B8F] border-t-transparent" />
      </div>
    );
  }

  const caso = modulo.simulador;

  const onSubmit = async (data: SimuladorRespuestaFormData) => {
    setAnalizando(true);
    try {
      const resultado = await modulosService.enviarRespuestaSimulador(
        modulo.id,
        caso.id,
        data.textoRespuesta
      );
      setRespuestaEnviada(data.textoRespuesta);
      setRetroalimentacion(resultado.retroalimentacionIA);
      await recargarProgreso();
      toast.success("Análisis completado. Revisa la retroalimentación cualitativa de IA.");
    } catch (err: unknown) {
      const mensaje = err instanceof Error ? err.message : "Error al analizar respuesta.";
      toast.error(mensaje);
    } finally {
      setAnalizando(false);
    }
  };

  return (
    <CursoShell moduloId={modulo.id} pasoActivo={3}>
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-10 px-1 md:px-6">
        {/* Columna izquierda */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {!retroalimentacion ? (
            /* ESTADO 1: SIMULADOR ÉTICO (Figma 121:2751) */
            <>
              <h1 className="text-2xl sm:text-3xl md:text-[42px] font-extrabold text-[#444]">
                Simulador ético
              </h1>

              <p className="text-base sm:text-lg md:text-[23px] text-black text-justify leading-relaxed">
                {caso.contexto} {caso.dilema}
                <br />
                ¿Qué harías en esa situación?
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-1.5">
                  <textarea
                    rows={5}
                    placeholder="Ingresa tu respuesta"
                    className="w-full rounded-[24px] border border-[#B2B2B2] bg-white px-6 py-4 text-base md:text-xl text-[#1E1E1E] placeholder:text-[#959595] focus:border-[#3E4B8F] focus:outline-none focus:ring-2 focus:ring-[#3E4B8F]/30"
                    {...register("textoRespuesta")}
                  />
                  {errors.textoRespuesta && (
                    <p className="text-xs font-medium text-[#FF5E19]">
                      {errors.textoRespuesta.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={analizando}
                  className="inline-flex h-14 md:h-[68px] w-full sm:w-[340px] items-center justify-center gap-3 rounded-[48px] bg-[#3E4B8F] px-8 text-xl md:text-2xl font-bold text-white hover:bg-[#323D75] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <span>{analizando ? "Analizando..." : "Analizar respuesta"}</span>
                  <Sparkles className="h-6 w-6" />
                </button>
              </form>
            </>
          ) : (
            /* ESTADO 2: RETROALIMENTACIÓN DE IA (Figma 185:1786) */
            <>
              <h1 className="text-2xl sm:text-3xl md:text-[42px] font-extrabold text-[#444]">
                Retroalimentación de IA
              </h1>

              {/* Caja "Tu respuesta" (Figma 219:1321) */}
              <div className="rounded-[24px] border border-[#808080] bg-white p-6 md:p-7 space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-[#444]">Tu respuesta</h2>
                <p className="text-base md:text-lg text-[#444] leading-relaxed">
                  {respuestaEnviada}
                </p>
              </div>

              {/* Caja azul "Retroalimentación Y Sugerencias" (Figma 185:1834) */}
              <div className="rounded-[24px] border-2 border-[#3E4B8F] bg-[#F0F9FF] p-6 md:p-7 space-y-3">
                <h2 className="text-xl md:text-2xl font-bold text-[#3E4B8F]">
                  Retroalimentación Y Sugerencias
                </h2>
                <p className="text-base md:text-lg text-[#444] leading-relaxed">
                  {retroalimentacion.perspectivaEtica} {retroalimentacion.reflexionFinal}
                </p>
                <ul className="list-disc pl-5 text-sm md:text-base text-[#444] space-y-1 pt-1">
                  {retroalimentacion.puntosFuertes.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                  {retroalimentacion.areasMejora.map((a, idx) => (
                    <li key={`m-${idx}`}>{a}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={`/modulos/${modulo.id}/cuestionario`}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-[48px] bg-[#3E4B8F] px-8 text-lg font-bold text-white hover:bg-[#323D75] transition-colors"
                >
                  <span>Ir al Cuestionario</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <button
                  type="button"
                  onClick={() => setRetroalimentacion(null)}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-[48px] border-2 border-[#3E4B8F] bg-white px-6 text-base font-bold text-[#3E4B8F] hover:bg-[#EAEAF1] transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Editar respuesta</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Espacio en blanco reservado para ilustración de Lumi (Figma 121:2798 / 185:1839) */}
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
