"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Boton, Badge } from "@/components/ui";
import { ArrowLeft, ArrowRight, Shuffle, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function FlashcardsPage({
  params
}: {
  params: Promise<{ moduloId: string }>;
}) {
  const { moduloId } = use(params);
  const { modulos } = useApp();
  const prefersReducedMotion = useReducedMotion();

  const modulo = modulos.find((m) => m.id === moduloId) || null;
  const [ordenIndices, setOrdenIndices] = useState<number[]>([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [estaVolteada, setEstaVolteada] = useState(false);

  if (!modulo || modulo.flashcards.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3E4B8F] border-t-transparent" />
      </div>
    );
  }

  const flashcardsOriginales = modulo.flashcards;
  const total = flashcardsOriginales.length;

  const mazoActual =
    ordenIndices.length === total
      ? ordenIndices.map((i) => flashcardsOriginales[i])
      : flashcardsOriginales;

  const tarjetaActual = mazoActual[indiceActual] || mazoActual[0];

  const siguienteTarjeta = () => {
    setEstaVolteada(false);
    setIndiceActual((prev) => (prev + 1) % total);
  };

  const anteriorTarjeta = () => {
    setEstaVolteada(false);
    setIndiceActual((prev) => (prev - 1 + total) % total);
  };

  const barajarMazo = () => {
    setEstaVolteada(false);
    const indicesAleatorios = Array.from({ length: total }, (_, i) => i).sort(
      () => Math.random() - 0.5
    );
    setOrdenIndices(indicesAleatorios);
    setIndiceActual(0);
    toast.info("Mazo barajado al azar.");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* NAVEGACIÓN SUPERIOR */}
      <div className="flex items-center justify-between border-b border-[#D8D8D8]/60 pb-4">
        <Link
          href={`/modulos/${modulo.id}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#3E4B8F] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al módulo
        </Link>
        <div className="flex items-center gap-2">
          <Boton
            variant="ghost"
            size="sm"
            onClick={barajarMazo}
            className="text-xs gap-1.5 text-[#3E4B8F]"
          >
            <Shuffle className="h-3.5 w-3.5" />
            <span>Barajar</span>
          </Boton>
          <Badge variant="indigo" size="sm">
            {indiceActual + 1} de {total}
          </Badge>
        </div>
      </div>

      <div className="text-center space-y-1">
        <Badge variant="crema" size="sm">
          {tarjetaActual.categoria}
        </Badge>
        <h1 className="text-xl sm:text-2xl font-black text-[#1E1E1E]">
          Mazo de Repaso Activo
        </h1>
        <p className="text-xs text-[#6C6C63]">
          Haz clic o presiona sobre la tarjeta para revelar la respuesta
        </p>
      </div>

      {/* CONTENEDOR FLASHCARD CON GIRO 3D / PREFERS-REDUCED-MOTION */}
      <div className="perspective-1000 w-full min-h-[300px] sm:min-h-[340px] flex items-center justify-center">
        <motion.div
          onClick={() => setEstaVolteada(!estaVolteada)}
          className="relative w-full h-[320px] sm:h-[360px] cursor-pointer rounded-3xl p-6 sm:p-10 select-none shadow-md transition-shadow hover:shadow-xl border-2 border-[#3E4B8F]/25 bg-white flex flex-col justify-between"
          animate={{
            rotateY: prefersReducedMotion ? 0 : estaVolteada ? 180 : 0,
            opacity: prefersReducedMotion && estaVolteada ? 0.95 : 1
          }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.4 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRENTE: PREGUNTA */}
          <div
            className={`absolute inset-0 p-8 sm:p-10 flex flex-col justify-between rounded-3xl bg-white ${
              estaVolteada ? "hidden" : "flex"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-[#6C6C63]">
              <span className="uppercase tracking-wider">Pregunta de reflexión</span>
              <span className="flex items-center gap-1 text-[#3E4B8F]">
                <RotateCcw className="h-3.5 w-3.5" /> Girar
              </span>
            </div>

            <div className="my-auto text-center">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E1E1E] leading-relaxed">
                {tarjetaActual.pregunta}
              </h2>
            </div>

            <div className="text-center text-[11px] text-[#959595] font-medium">
              Toca para voltear y comprobar
            </div>
          </div>

          {/* REVERSO: RESPUESTA */}
          <div
            className={`absolute inset-0 p-8 sm:p-10 flex flex-col justify-between rounded-3xl bg-[#F4F8FD] border-2 border-[#3E4B8F] ${
              estaVolteada ? "flex" : "hidden"
            }`}
            style={{ transform: prefersReducedMotion ? "none" : "rotateY(180deg)" }}
          >
            <div className="flex items-center justify-between text-xs font-bold text-[#3E4B8F]">
              <span className="uppercase tracking-wider">Fundamento / Respuesta</span>
              <Badge variant="verde" size="sm">
                Explicación
              </Badge>
            </div>

            <div className="my-auto text-center">
              <p className="text-base sm:text-lg font-semibold text-[#1E1E1E] leading-relaxed">
                {tarjetaActual.respuesta}
              </p>
            </div>

            <div className="text-center text-[11px] text-[#6C6C63] font-medium">
              Toca nuevamente para volver a la pregunta
            </div>
          </div>
        </motion.div>
      </div>

      {/* CONTROLES DE NAVEGACIÓN */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <Boton
          variant="secondary"
          onClick={anteriorTarjeta}
          className="gap-2 flex-1 sm:flex-initial"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Anterior</span>
        </Boton>

        <Boton
          variant="pill"
          onClick={() => setEstaVolteada(!estaVolteada)}
          className="gap-1.5 text-xs font-bold"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>{estaVolteada ? "Ver Pregunta" : "Ver Respuesta"}</span>
        </Boton>

        <Boton
          variant="primary"
          onClick={siguienteTarjeta}
          className="gap-2 flex-1 sm:flex-initial"
        >
          <span>Siguiente</span>
          <ArrowRight className="h-4 w-4" />
        </Boton>
      </div>
    </div>
  );
}
