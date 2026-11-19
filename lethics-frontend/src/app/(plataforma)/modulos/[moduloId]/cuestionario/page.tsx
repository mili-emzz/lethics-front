"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { modulosService } from "@/services/mocks";
import { IntentoCuestionario } from "@/types";
import {
  esCalificacionAprobatoria,
  calcularPorcentajeAciertos
} from "@/lib/rules";
import { CursoShell } from "@/components/layout/CursoShell";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function CuestionarioPage({
  params
}: {
  params: Promise<{ moduloId: string }>;
}) {
  const { moduloId } = use(params);
  const { modulos, usuario, recargarProgreso } = useApp();

  const modulo = modulos.find((m) => m.id === moduloId) || null;
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [resultado, setResultado] = useState<IntentoCuestionario | null>(null);
  const [revisando, setRevisando] = useState(false);
  const [enviando, setEnviando] = useState(false);

  if (!modulo) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3E4B8F] border-t-transparent" />
      </div>
    );
  }

  const cuestionario = modulo.cuestionario;
  const preguntas = cuestionario.preguntas;
  const totalPreguntas = preguntas.length;
  const preguntaActual = preguntas[indicePregunta] || preguntas[0];
  const opcionActualSeleccionada = respuestas[preguntaActual.id];
  const esUltimaPregunta = indicePregunta === totalPreguntas - 1;

  const seleccionarOpcion = (preguntaId: string, opcionId: string) => {
    if (resultado) return;
    setRespuestas((prev) => ({ ...prev, [preguntaId]: opcionId }));
  };

  const handleSiguienteOEnviar = async () => {
    if (!opcionActualSeleccionada) {
      toast.warning("Selecciona una opción para continuar.");
      return;
    }

    if (!esUltimaPregunta) {
      setIndicePregunta((prev) => prev + 1);
      return;
    }

    setEnviando(true);
    try {
      let aciertos = 0;
      preguntas.forEach((p) => {
        if (respuestas[p.id] === p.opcionCorrectaId) aciertos += 1;
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
      await recargarProgreso();

      if (aprobado) {
        toast.success(`¡Aprobaste con ${calificacion}%!`);
      } else {
        toast.error(`Obtuviste ${calificacion}%. Necesitas mínimo 70% (RN-03).`);
      }
    } catch {
      toast.error("No se pudo registrar el cuestionario.");
    } finally {
      setEnviando(false);
    }
  };

  const reiniciar = () => {
    setIndicePregunta(0);
    setRespuestas({});
    setResultado(null);
    setRevisando(false);
  };

  const porcentajeBarra = resultado
    ? 100
    : Math.round(((indicePregunta + 1) / totalPreguntas) * 100);

  return (
    <CursoShell moduloId={modulo.id} pasoActivo={4} mostrarStepper={false}>
      <div className="flex-1 flex flex-col gap-8 px-1 md:px-6">
        {/* Barra de progreso delgada superior fiel a Figma (226:1300 / 227:1491) */}
        <div className="space-y-2">
          <div className="h-1 w-full rounded-[2px] bg-[#EAEAF1] overflow-hidden">
            <div
              style={{ width: `${porcentajeBarra}%` }}
              className="h-full bg-[#3B3485] transition-all duration-300"
            />
          </div>
          <p className="text-xs font-medium text-[#80849D]">
            {resultado
              ? "Resultados del cuestionario"
              : `Pregunta ${indicePregunta + 1} de ${totalPreguntas}`}
          </p>
        </div>

        {/* VISTA RESULTADOS FIEL A FIGMA (227:1488) */}
        {resultado && !revisando && (
          <div className="flex-1 flex flex-col items-center justify-center gap-7 py-4 text-center">
            <div className="flex h-[200px] w-[200px] md:h-[240px] md:w-[240px] items-center justify-center rounded-full bg-[#3B3485]">
              <span className="text-5xl md:text-[72px] font-bold text-[#FFF5EC]">
                {resultado.calificacion}%
              </span>
            </div>

            <h1 className="text-2xl md:text-[32px] font-extrabold text-[#3B3485]">
              {resultado.aprobado ? "¡Excelente trabajo!" : "Sigue practicando"}
            </h1>

            <p className="max-w-[720px] text-lg md:text-2xl font-bold text-[#474747] leading-snug">
              {resultado.aprobado
                ? "¡Felicidades! Has completado el cuestionario con un alto nivel de acierto."
                : "Necesitas al menos 70% de aciertos para aprobar este módulo (RN-03). Puedes volver a intentarlo las veces que necesites."}
            </p>

            <div className="flex flex-col items-center gap-4 pt-2 w-full max-w-[320px]">
              <button
                type="button"
                onClick={() => setRevisando(true)}
                className="flex h-14 md:h-[64px] w-full items-center justify-center rounded-[48px] border-2 border-[#3B3485] bg-white px-8 text-lg md:text-2xl font-bold text-[#3E4B8F] hover:bg-[#EAEAF1] transition-colors cursor-pointer"
              >
                Revisar respuestas
              </button>

              {resultado.aprobado ? (
                <Link
                  href="/dashboard"
                  className="flex h-14 md:h-[64px] w-full items-center justify-center rounded-[48px] bg-[#3E4B8F] px-8 text-lg md:text-2xl font-bold text-white hover:bg-[#323D75] transition-colors"
                >
                  Finalizar
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={reiniciar}
                  className="flex h-14 md:h-[64px] w-full items-center justify-center gap-2 rounded-[48px] bg-[#3E4B8F] px-8 text-lg md:text-2xl font-bold text-white hover:bg-[#323D75] transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-5 w-5" />
                  <span>Reintentar</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* VISTA PREGUNTA ACTIVA FIEL A FIGMA (217:1365) */}
        {!resultado && (
          <div className="flex-1 flex flex-col justify-between gap-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-[44px] font-extrabold text-[#444]">
                Cuestionario
              </h1>
              <p className="text-lg md:text-[23px] font-body text-[#474747] text-justify leading-relaxed">
                {preguntaActual.enunciado}
              </p>
            </div>

            {/* Tarjetas de opciones centradas (max-w-800px, border-2 #3B3485, rounded-16px) */}
            <div className="mx-auto w-full max-w-[800px] space-y-4">
              {preguntaActual.opciones.map((opcion) => {
                const seleccionada = opcionActualSeleccionada === opcion.id;
                return (
                  <button
                    key={opcion.id}
                    type="button"
                    onClick={() => seleccionarOpcion(preguntaActual.id, opcion.id)}
                    className={`flex w-full items-center gap-4 rounded-[16px] border-2 border-[#3B3485] p-5 md:p-6 text-left transition-all cursor-pointer min-h-[60px] ${
                      seleccionada
                        ? "bg-[#F4F8FD] shadow-sm"
                        : "bg-white hover:bg-[#F4F8FD]/50"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#3B3485] ${
                        seleccionada ? "bg-[#3B3485]" : "bg-white"
                      }`}
                    >
                      {seleccionada && <span className="h-2.5 w-2.5 rounded-full bg-white" />}
                    </span>
                    <span className="text-base md:text-xl font-bold text-[#474747]">
                      {opcion.texto}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Botón Enviar / Siguiente centrado (#3B3485) */}
            <div className="flex justify-center pt-2">
              <button
                type="button"
                disabled={enviando || !opcionActualSeleccionada}
                onClick={handleSiguienteOEnviar}
                className="flex h-14 md:h-[68px] w-full max-w-[292px] items-center justify-center rounded-[48px] bg-[#3B3485] px-12 text-xl md:text-[26px] font-bold text-white hover:bg-[#2E286E] transition-colors disabled:opacity-45 cursor-pointer"
              >
                {enviando
                  ? "Calificando..."
                  : esUltimaPregunta
                  ? "Enviar"
                  : "Siguiente"}
              </button>
            </div>
          </div>
        )}

        {/* MODO REVISIÓN DE RESPUESTAS */}
        {resultado && revisando && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#444]">
                Revisión de respuestas ({resultado.calificacion}%)
              </h2>
              <button
                type="button"
                onClick={() => setRevisando(false)}
                className="rounded-[48px] border-2 border-[#3B3485] px-6 py-2 text-sm font-bold text-[#3E4B8F] hover:bg-[#EAEAF1] cursor-pointer"
              >
                Volver al resultado
              </button>
            </div>

            <div className="space-y-5">
              {preguntas.map((p, idx) => {
                const elegida = respuestas[p.id];
                const correcta = elegida === p.opcionCorrectaId;
                return (
                  <div
                    key={p.id}
                    className={`rounded-[20px] border-2 p-5 space-y-3 ${
                      correcta ? "border-emerald-400 bg-emerald-50/30" : "border-[#FF5E19] bg-red-50/30"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase text-[#3E4B8F]">
                        Pregunta {idx + 1}
                      </span>
                      {correcta ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                          <CheckCircle2 className="h-4 w-4" /> Correcta
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FF5E19]">
                          <XCircle className="h-4 w-4" /> Incorrecta
                        </span>
                      )}
                    </div>
                    <p className="font-bold text-base text-[#1E1E1E]">{p.enunciado}</p>
                    <p className="text-sm text-[#474747] bg-[#FFECC2]/60 rounded-xl p-3">
                      <strong>Explicación:</strong> {p.explicacion}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </CursoShell>
  );
}
