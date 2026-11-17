"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SimuladorRespuestaSchema, SimuladorRespuestaFormData } from "@/lib/validations";
import { useApp } from "@/context/AppContext";
import { Tarjeta, Boton, Badge } from "@/components/ui";
import { modulosService } from "@/services/mocks";
import { Modulo, SimuladorRetroalimentacion } from "@/types";
import {
  ArrowLeft,
  Cpu,
  Sparkles,
  Users,
  HelpCircle,
  CheckCircle2,
  Lightbulb,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";

export default function SimuladorPage({
  params
}: {
  params: Promise<{ moduloId: string }>;
}) {
  const { moduloId } = use(params);
  const { modulos, recargarProgreso } = useApp();

  const [modulo, setModulo] = useState<Modulo | null>(null);
  const [retroalimentacion, setRetroalimentacion] =
    useState<SimuladorRetroalimentacion | null>(null);
  const [analizando, setAnalizando] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SimuladorRespuestaFormData>({
    resolver: zodResolver(SimuladorRespuestaSchema),
    defaultValues: {
      textoRespuesta: ""
    }
  });

  const textoRespuesta = watch("textoRespuesta");

  useEffect(() => {
    if (modulos.length > 0) {
      const encontrado = modulos.find((m) => m.id === moduloId);
      if (encontrado) {
        setModulo(encontrado);
      }
    }
  }, [modulos, moduloId]);

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
      setRetroalimentacion(resultado.retroalimentacionIA);
      await recargarProgreso();
      toast.success("Análisis completado. La IA ha evaluado tu razonamiento ético.");
    } catch (err: unknown) {
      const mensaje = err instanceof Error ? err.message : "Error al procesar la simulación.";
      toast.error(mensaje);
    } finally {
      setAnalizando(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* NAVEGACIÓN SUPERIOR */}
      <div className="flex items-center justify-between border-b border-[#D8D8D8]/60 pb-4">
        <Link
          href={`/modulos/${modulo.id}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#3E4B8F] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al módulo
        </Link>
        <Badge variant="indigo" size="sm">
          Simulador Ético Interactivo (RN-06)
        </Badge>
      </div>

      {/* TARJETA DEL CASO Y DILEMA */}
      <Tarjeta fondoSuave="crema" className="p-6 sm:p-8 border-[#3E4B8F]/20 space-y-6">
        <div className="space-y-2">
          <Badge variant="dorado" size="sm">
            Caso de Estudio: Módulo {modulo.numero}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1E1E1E]">
            {caso.titulo}
          </h1>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#D8D8D8]/60 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#3E4B8F]">
            Contexto del Entorno
          </h3>
          <p className="text-sm text-[#474747] leading-relaxed">{caso.contexto}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-[#3E4B8F]/20 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#FF5E19]">
            El Dilema Ético
          </h3>
          <p className="text-sm sm:text-base font-semibold text-[#1E1E1E] leading-relaxed">
            {caso.dilema}
          </p>
        </div>

        {/* ROLES Y PREGUNTAS GUÍA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-white p-4 rounded-xl border border-[#D8D8D8]/50 space-y-2">
            <h4 className="text-xs font-bold text-[#1E1E1E] flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-[#3E4B8F]" /> Actores Involucrados
            </h4>
            <ul className="text-xs text-[#6C6C63] space-y-1">
              {caso.rolesInvolucrados.map((rol, i) => (
                <li key={i}>• {rol}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded-xl border border-[#D8D8D8]/50 space-y-2">
            <h4 className="text-xs font-bold text-[#1E1E1E] flex items-center gap-1.5">
              <HelpCircle className="h-3.5 w-3.5 text-[#3E4B8F]" /> Preguntas para Reflexionar
            </h4>
            <ul className="text-xs text-[#6C6C63] space-y-1">
              {caso.preguntasGuia.map((pg, i) => (
                <li key={i}>• {pg}</li>
              ))}
            </ul>
          </div>
        </div>
      </Tarjeta>

      {/* ÁREA DE CAPTURA DE RESPUESTA */}
      <Tarjeta className="p-6 sm:p-8 bg-white border border-[#D8D8D8] space-y-5">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-[#1E1E1E]">Tu Postura Profesional</h2>
          <p className="text-xs text-[#6C6C63]">
            Redacta tu propuesta de acción considerando los códigos de ética y el bienestar público.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <textarea
              rows={6}
              placeholder="Escribe tu razonamiento ético aquí. Justifica tu decisión ponderando el interés público, las responsabilidades legales y alternativas constructivas..."
              className="w-full rounded-2xl border border-[#D8D8D8] p-4 text-sm md:text-base text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#3E4B8F] placeholder:text-[#959595]"
              {...register("textoRespuesta")}
            />
            {errors.textoRespuesta && (
              <p className="text-xs font-medium text-[#FF5E19]">
                {errors.textoRespuesta.message}
              </p>
            )}
            <div className="flex justify-between text-xs text-[#6C6C63] pt-1">
              <span>Mínimo 40 caracteres</span>
              <span>{textoRespuesta?.length || 0} / 2500 caracteres</span>
            </div>
          </div>

          <Boton
            type="submit"
            cargando={analizando}
            size="lg"
            className="w-full sm:w-auto gap-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>Analizar razonamiento ético</span>
          </Boton>
        </form>
      </Tarjeta>

      {/* RETROALIMENTACIÓN CUALITATIVA DE IA (RN-06) */}
      {retroalimentacion && (
        <Tarjeta
          fondoSuave="azul"
          className="p-6 sm:p-8 border-2 border-[#3E4B8F]/30 space-y-6 animate-in fade-in duration-300"
        >
          <div className="flex items-center justify-between border-b border-[#D8D8D8]/60 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[#3E4B8F] text-white flex items-center justify-center">
                <Cpu className="h-4 w-4" />
              </div>
              <h3 className="font-extrabold text-lg text-[#1E1E1E]">
                Evaluación Cualitativa de IA
              </h3>
            </div>
            <Badge variant="verde" size="sm">
              <CheckCircle2 className="h-3.5 w-3.5" /> Caso Concluido
            </Badge>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3E4B8F]">
              Perspectiva Ética Identificada
            </h4>
            <p className="text-sm text-[#1E1E1E] leading-relaxed bg-white p-4 rounded-xl border border-[#D8D8D8]/50">
              {retroalimentacion.perspectivaEtica}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-emerald-200 space-y-2">
              <h5 className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Puntos Fuertes de tu Argumento
              </h5>
              <ul className="text-xs text-[#474747] space-y-1.5">
                {retroalimentacion.puntosFuertes.map((pf, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{pf}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-2">
              <h5 className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <Lightbulb className="h-4 w-4 text-amber-600" /> Oportunidades de Profundización
              </h5>
              <ul className="text-xs text-[#474747] space-y-1.5">
                {retroalimentacion.areasMejora.map((am, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{am}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-[#FFECC2] p-4 rounded-xl border border-[#FFDE97] text-xs text-[#1E1E1E] leading-relaxed">
            <strong>Reflexión final: </strong>
            {retroalimentacion.reflexionFinal}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Link href={`/modulos/${modulo.id}/cuestionario`}>
              <Boton variant="primary" className="gap-2">
                <span>Continuar al Cuestionario</span>
                <ArrowRight className="h-4 w-4" />
              </Boton>
            </Link>
          </div>
        </Tarjeta>
      )}
    </div>
  );
}
