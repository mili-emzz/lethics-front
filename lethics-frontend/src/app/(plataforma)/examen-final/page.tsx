"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Tarjeta, Boton, Badge } from "@/components/ui";
import { cierreService } from "@/services/mocks";
import { ExamenFinal, IntentoExamenFinal } from "@/types";
import {
  esCalificacionAprobatoria,
  calcularPorcentajeAciertos
} from "@/lib/rules";
import {
  Award,
  Lock,
  XCircle,
  RotateCcw
} from "lucide-react";
import { toast } from "sonner";

export default function ExamenFinalPage() {
  const { progreso, usuario, recargarProgreso } = useApp();

  const [examen, setExamen] = useState<ExamenFinal | null>(null);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [resultado, setResultado] = useState<IntentoExamenFinal | null>(null);
  const [enviado, setEnviado] = useState(false);
  const [cargandoEnvio, setCargandoEnvio] = useState(false);

  const puedePresentar = progreso.todosModulosCompletados && progreso.proyectoEntregado;

  useEffect(() => {
    async function cargar() {
      const ex = await cierreService.obtenerExamenFinal();
      setExamen(ex);
    }
    cargar();
  }, []);

  if (!examen) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3E4B8F] border-t-transparent" />
      </div>
    );
  }

  // Candado estricto RN-05
  if (!puedePresentar) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Tarjeta fondoSuave="rosa" className="p-8 sm:p-12 text-center space-y-4 border-2 border-[#FF5E19]/30">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#FF5E19] shadow-sm">
            <Lock className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-black text-[#1E1E1E]">Examen Final Bloqueado</h1>
          <p className="text-sm text-[#474747] max-w-md mx-auto">
            Para presentar la evaluación integradora final, debes haber completado los 5 módulos
            formativos y entregado el Proyecto Final (Regla RN-05).
          </p>
          <div className="pt-2">
            <Link href="/proyecto-final">
              <Boton variant="primary">Ir al Proyecto Final</Boton>
            </Link>
          </div>
        </Tarjeta>
      </div>
    );
  }

  const totalPreguntas = examen.preguntas.length;
  const respondidasCount = Object.keys(respuestas).length;
  const todasRespondidas = respondidasCount === totalPreguntas;

  const seleccionarOpcion = (preguntaId: string, opcionId: string) => {
    if (enviado) return;
    setRespuestas((prev) => ({ ...prev, [preguntaId]: opcionId }));
  };

  const enviarExamen = async () => {
    if (!todasRespondidas) {
      toast.warning("Por favor responde todas las preguntas del examen.");
      return;
    }

    setCargandoEnvio(true);
    try {
      let aciertos = 0;
      examen.preguntas.forEach((p) => {
        if (respuestas[p.id] === p.opcionCorrectaId) aciertos += 1;
      });

      const calificacion = calcularPorcentajeAciertos(aciertos, totalPreguntas);
      const aprobado = esCalificacionAprobatoria(calificacion);

      const intento = await cierreService.registrarIntentoExamenFinal({
        usuarioId: usuario?.id || "usr_estudiante_01",
        calificacion,
        aprobado,
        respuestasUsuario: respuestas,
        totalPreguntas,
        aciertos
      });

      setResultado(intento);
      setEnviado(true);
      await recargarProgreso();

      if (aprobado) {
        toast.success(`¡Enhorabuena! Has acreditado el Examen Final con ${calificacion}%.`);
      } else {
        toast.error(`Obtuviste ${calificacion}%. Requiere mínimo 70% (RN-03). Puedes reintentar.`);
      }
    } catch {
      toast.error("Error al registrar el examen final.");
    } finally {
      setCargandoEnvio(false);
    }
  };

  const reiniciarExamen = () => {
    setRespuestas({});
    setEnviado(false);
    setResultado(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* CABECERA */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="indigo" size="md">
            Acreditación General
          </Badge>
          <Badge variant="dorado" size="md">
            Mínimo 70% (RN-03)
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1E1E1E]">
          {examen.titulo}
        </h1>
        <p className="text-sm sm:text-base text-[#474747] leading-relaxed">
          {examen.descripcion}
        </p>
      </div>

      {/* RESULTADO FINAL */}
      {enviado && resultado ? (
        <Tarjeta
          fondoSuave={resultado.aprobado ? "menta" : "rosa"}
          className="p-8 sm:p-12 text-center space-y-6 border-2 border-[#3E4B8F]/30"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-md">
            {resultado.aprobado ? (
              <Award className="h-10 w-10 text-emerald-600" />
            ) : (
              <XCircle className="h-10 w-10 text-[#FF5E19]" />
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black text-[#1E1E1E]">
              {resultado.aprobado
                ? "¡Has Culminado el Curso de Ética en Software!"
                : "No se alcanzó el umbral del 70%"}
            </h2>
            <p className="text-sm text-[#474747] max-w-md mx-auto">
              {resultado.aprobado
                ? "Tu constancia de acreditación y perfil han sido actualizados satisfactoriamente."
                : "Repasa los conceptos clave en las flashcards e inténtalo nuevamente."}
            </p>
          </div>

          <div className="inline-flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-[#D8D8D8] min-w-[200px]">
            <span
              className={`text-5xl font-black ${
                resultado.aprobado ? "text-emerald-600" : "text-[#FF5E19]"
              }`}
            >
              {resultado.calificacion}%
            </span>
            <span className="text-xs font-semibold text-[#6C6C63] mt-1">
              {resultado.aciertos} de {resultado.totalPreguntas} aciertos
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Boton
              variant="secondary"
              onClick={reiniciarExamen}
              className="gap-2 w-full sm:w-auto"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reintentar Examen</span>
            </Boton>
            <Link href="/historial" className="w-full sm:w-auto">
              <Boton variant="primary" className="w-full">
                Ver Historial de Intentos
              </Boton>
            </Link>
          </div>
        </Tarjeta>
      ) : (
        /* PREGUNTAS DEL EXAMEN */
        <div className="space-y-6">
          {examen.preguntas.map((pregunta, idx) => {
            const seleccionadaId = respuestas[pregunta.id];
            return (
              <Tarjeta
                key={pregunta.id}
                className="p-6 sm:p-8 bg-white border border-[#D8D8D8] space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#3E4B8F]">
                    Reactivo {idx + 1} de {totalPreguntas}
                  </span>
                  <Badge variant="crema" size="sm">
                    Módulo {pregunta.moduloOrigenNumero}
                  </Badge>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#1E1E1E] leading-snug">
                  {pregunta.enunciado}
                </h3>

                <div className="space-y-2.5 pt-2">
                  {pregunta.opciones.map((opcion) => {
                    const esSeleccionada = seleccionadaId === opcion.id;
                    return (
                      <button
                        key={opcion.id}
                        onClick={() => seleccionarOpcion(pregunta.id, opcion.id)}
                        className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 min-h-[48px] cursor-pointer ${
                          esSeleccionada
                            ? "border-2 border-[#3E4B8F] bg-[#F4F8FD] text-[#3E4B8F] font-bold"
                            : "border-[#D8D8D8] bg-white text-[#1E1E1E] hover:bg-[#F4F8FD]"
                        }`}
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs mt-0.5">
                          {esSeleccionada ? "●" : ""}
                        </span>
                        <span className="leading-relaxed">{opcion.texto}</span>
                      </button>
                    );
                  })}
                </div>
              </Tarjeta>
            );
          })}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#D8D8D8]/60">
            <span className="text-xs font-semibold text-[#6C6C63]">
              Respondidas: {respondidasCount} de {totalPreguntas}
            </span>

            <Boton
              size="lg"
              onClick={enviarExamen}
              cargando={cargandoEnvio}
              disabled={!todasRespondidas}
              className="w-full sm:w-auto gap-2 bg-[#3B3485] hover:bg-[#302a70]"
            >
              <span>Finalizar y Calificar Examen</span>
              <Award className="h-4 w-4" />
            </Boton>
          </div>
        </div>
      )}
    </div>
  );
}
