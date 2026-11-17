"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Tarjeta, Boton, Badge } from "@/components/ui";
import { modulosService } from "@/services/mocks";
import { IntentoCuestionario } from "@/types";
import {
  esCalificacionAprobatoria,
  calcularPorcentajeAciertos,
  UMBRAL_CALIFICACION_APROBATORIA
} from "@/lib/rules";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award
} from "lucide-react";
import { toast } from "sonner";

export default function CuestionarioPage({
  params
}: {
  params: Promise<{ moduloId: string }>;
}) {
  const { moduloId } = use(params);
  const { modulos, usuario, recargarProgreso } = useApp();

  const modulo = modulos.find((m) => m.id === moduloId) || null;
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState(false);
  const [resultado, setResultado] = useState<IntentoCuestionario | null>(null);
  const [cargandoEnvio, setCargandoEnvio] = useState(false);
  const [revisandoRespuestas, setRevisandoRespuestas] = useState(false);

  if (!modulo) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3E4B8F] border-t-transparent" />
      </div>
    );
  }

  const cuestionario = modulo.cuestionario;
  const totalPreguntas = cuestionario.preguntas.length;
  const respondidasCount = Object.keys(respuestas).length;
  const todasRespondidas = respondidasCount === totalPreguntas;

  const seleccionarOpcion = (preguntaId: string, opcionId: string) => {
    if (enviado) return;
    setRespuestas((prev) => ({
      ...prev,
      [preguntaId]: opcionId
    }));
  };

  const enviarEvaluacion = async () => {
    if (!todasRespondidas) {
      toast.warning("Por favor responde todas las preguntas antes de enviar.");
      return;
    }

    setCargandoEnvio(true);
    try {
      let aciertos = 0;
      cuestionario.preguntas.forEach((p) => {
        if (respuestas[p.id] === p.opcionCorrectaId) {
          aciertos += 1;
        }
      });

      const calificacion = calcularPorcentajeAciertos(aciertos, totalPreguntas);
      const aprobado = esCalificacionAprobatoria(calificacion);

      const intentoGuardado = await modulosService.registrarIntentoCuestionario({
        cuestionarioId: cuestionario.id,
        moduloId: modulo.id,
        usuarioId: usuario?.id || "usr_estudiante_01",
        calificacion,
        aprobado,
        respuestasUsuario: respuestas,
        totalPreguntas,
        aciertos
      });

      setResultado(intentoGuardado);
      setEnviado(true);
      await recargarProgreso();

      if (aprobado) {
        toast.success(
          `¡Felicidades! Aprobaste con ${calificacion}%. El siguiente módulo ha sido desbloqueado (RN-02).`
        );
      } else {
        toast.error(
          `Obtuviste ${calificacion}%. El mínimo aprobatorio es 70% (RN-03). Puedes reintentar.`
        );
      }
    } catch {
      toast.error("Error al registrar tu evaluación.");
    } finally {
      setCargandoEnvio(false);
    }
  };

  const reiniciarCuestionario = () => {
    setRespuestas({});
    setEnviado(false);
    setResultado(null);
    setRevisandoRespuestas(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          Umbral aprobatorio: {UMBRAL_CALIFICACION_APROBATORIA}% (RN-03)
        </Badge>
      </div>

      {/* RESULTADO (CURSO CUESTIONARIO RESULTADO FIGMA) */}
      {enviado && resultado && !revisandoRespuestas && (
        <Tarjeta
          fondoSuave={resultado.aprobado ? "menta" : "rosa"}
          className="p-8 sm:p-12 text-center space-y-6 border-2 border-[#3E4B8F]/30 animate-in fade-in duration-300"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-md">
            {resultado.aprobado ? (
              <Award className="h-10 w-10 text-emerald-600" />
            ) : (
              <XCircle className="h-10 w-10 text-[#FF5E19]" />
            )}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6C6C63]">
              Resultado del Cuestionario
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1E1E1E]">
              {resultado.aprobado ? "¡Cuestionario Aprobado!" : "Calificación no aprobatoria"}
            </h1>
            <p className="text-sm text-[#474747] max-w-lg mx-auto">
              {resultado.aprobado
                ? "Has demostrado un sólido entendimiento de los principios éticos y normas aplicables."
                : "Se requiere un mínimo de 70% para acreditar el módulo y continuar a la siguiente etapa."}
            </p>
          </div>

          <div className="inline-flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-[#D8D8D8]/70 shadow-sm min-w-[200px]">
            <span
              className={`text-5xl font-black ${
                resultado.aprobado ? "text-emerald-600" : "text-[#FF5E19]"
              }`}
            >
              {resultado.calificacion}%
            </span>
            <span className="text-xs font-semibold text-[#6C6C63] mt-1">
              {resultado.aciertos} de {resultado.totalPreguntas} aciertos correctos
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Boton
              variant="secondary"
              onClick={() => setRevisandoRespuestas(true)}
              className="w-full sm:w-auto"
            >
              Revisar respuestas
            </Boton>

            <Boton
              variant="ghost"
              onClick={reiniciarCuestionario}
              className="w-full sm:w-auto gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reintentar (Intentos ilimitados)</span>
            </Boton>

            {resultado.aprobado && (
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Boton variant="primary" className="w-full gap-2">
                  <span>Ir al Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Boton>
              </Link>
            )}
          </div>
        </Tarjeta>
      )}

      {/* LISTA DE PREGUNTAS */}
      {(!enviado || revisandoRespuestas) && (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-black text-[#1E1E1E]">
                {cuestionario.titulo}
              </h1>
              {revisandoRespuestas && (
                <Boton
                  variant="secondary"
                  size="sm"
                  onClick={() => setRevisandoRespuestas(false)}
                >
                  Volver a resumen
                </Boton>
              )}
            </div>
            <p className="text-sm text-[#6C6C63]">{cuestionario.descripcion}</p>
          </div>

          <div className="space-y-6">
            {cuestionario.preguntas.map((pregunta, idx) => {
              const opcionElegida = respuestas[pregunta.id];
              const esCorrecta = opcionElegida === pregunta.opcionCorrectaId;

              return (
                <Tarjeta
                  key={pregunta.id}
                  className={`p-6 sm:p-8 bg-white border ${
                    revisandoRespuestas
                      ? esCorrecta
                        ? "border-emerald-400 bg-emerald-50/20"
                        : "border-red-400 bg-red-50/20"
                      : "border-[#D8D8D8]"
                  } space-y-4 shadow-sm`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3E4B8F]">
                      Pregunta {idx + 1} de {totalPreguntas}
                    </span>
                    {revisandoRespuestas && (
                      <span
                        className={`text-xs font-bold inline-flex items-center gap-1 ${
                          esCorrecta ? "text-emerald-700" : "text-red-600"
                        }`}
                      >
                        {esCorrecta ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" /> Acierto
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4" /> Incorrecto
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#1E1E1E] leading-snug">
                    {pregunta.enunciado}
                  </h3>

                  <div className="space-y-2.5 pt-2">
                    {pregunta.opciones.map((opcion) => {
                      const seleccionada = opcionElegida === opcion.id;
                      const esLaOpcionCorrecta = opcion.id === pregunta.opcionCorrectaId;

                      let estiloBoton =
                        "border-[#D8D8D8] bg-white text-[#1E1E1E] hover:border-[#3E4B8F] hover:bg-[#F4F8FD]";

                      if (seleccionada) {
                        estiloBoton = "border-2 border-[#3E4B8F] bg-[#F4F8FD] text-[#3E4B8F] font-bold";
                      }

                      if (revisandoRespuestas) {
                        if (esLaOpcionCorrecta) {
                          estiloBoton = "border-2 border-emerald-500 bg-emerald-100/60 text-emerald-900 font-bold";
                        } else if (seleccionada && !esLaOpcionCorrecta) {
                          estiloBoton = "border-2 border-red-500 bg-red-100/60 text-red-900 font-semibold";
                        }
                      }

                      return (
                        <button
                          key={opcion.id}
                          disabled={enviado}
                          onClick={() => seleccionarOpcion(pregunta.id, opcion.id)}
                          className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 min-h-[48px] cursor-pointer disabled:cursor-default ${estiloBoton}`}
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs mt-0.5">
                            {seleccionada ? "●" : ""}
                          </span>
                          <span className="leading-relaxed">{opcion.texto}</span>
                        </button>
                      );
                    })}
                  </div>

                  {revisandoRespuestas && (
                    <div className="mt-3 p-3.5 bg-[#FFECC2]/60 rounded-xl border border-[#FFDE97] text-xs text-[#1E1E1E] space-y-1">
                      <strong className="text-[#3E4B8F] block font-bold">
                        Fundamento y Explicación:
                      </strong>
                      <p>{pregunta.explicacion}</p>
                    </div>
                  )}
                </Tarjeta>
              );
            })}
          </div>

          {!enviado && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#D8D8D8]/60">
              <span className="text-xs font-semibold text-[#6C6C63]">
                Respondidas: {respondidasCount} de {totalPreguntas}
              </span>

              <Boton
                variant="primary"
                size="lg"
                onClick={enviarEvaluacion}
                cargando={cargandoEnvio}
                disabled={!todasRespondidas}
                className="w-full sm:w-auto gap-2 bg-[#3B3485] hover:bg-[#302a70]"
              >
                <span>Calificar Cuestionario</span>
                <Award className="h-4 w-4" />
              </Boton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
