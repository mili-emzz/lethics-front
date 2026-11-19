"use client";

import React, { useState, use } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { CursoShell } from "@/components/layout/CursoShell";
import { Shuffle, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const COLORES_TARJETA = ["#F4F8FD", "#FEF5F8", "#E2F1F1"];

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
  const colorReverso = COLORES_TARJETA[indiceActual % COLORES_TARJETA.length];

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
    <CursoShell moduloId={modulo.id} pasoActivo={2}>
      <div className="flex-1 flex flex-col items-center justify-between gap-6 px-1 md:px-6">
        {/* Encabezado alineado a la izquierda fiel a Figma (120:2335) */}
        <div className="w-full flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-[42px] font-extrabold text-[#444]">
            {modulo.titulo}
          </h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={barajarMazo}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#FFECC2] px-4 py-2 text-sm font-bold text-[#3E4B8F] hover:bg-[#FFDE97] transition-colors cursor-pointer"
            >
              <Shuffle className="h-4 w-4" />
              <span>Barajar</span>
            </button>
            <span className="rounded-full bg-[#EAEAF1] px-4 py-2 text-sm font-bold text-[#474747]">
              {indiceActual + 1} / {total}
            </span>
          </div>
        </div>

        {/* Mazo vertical apilado fiel a Figma (_cards 121:2614: 272x409 rounded-18px) */}
        <div className="relative my-4 flex items-center justify-center perspective-1000">
          {/* Tarjeta apilada fondo 2 */}
          <div
            aria-hidden="true"
            className="absolute translate-x-[18px] translate-y-[18px] h-[390px] w-[272px] sm:h-[410px] sm:w-[290px] rounded-[18px] bg-[#EAEAF1] shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
          />
          {/* Tarjeta apilada fondo 1 */}
          <div
            aria-hidden="true"
            className="absolute translate-x-[9px] translate-y-[9px] h-[390px] w-[272px] sm:h-[410px] sm:w-[290px] rounded-[18px] bg-[#EAEAF1] shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
          />

          {/* Tarjeta activa con giro 3D */}
          <motion.button
            type="button"
            onClick={() => setEstaVolteada(!estaVolteada)}
            aria-label="Voltear flashcard"
            className="relative h-[390px] w-[272px] sm:h-[410px] sm:w-[290px] cursor-pointer rounded-[18px] text-left focus:outline-none focus:ring-2 focus:ring-[#3E4B8F]"
            animate={{
              rotateY: prefersReducedMotion ? 0 : estaVolteada ? 180 : 0
            }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.45 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Cara frontal (bg #EAEAF1 como Figma) */}
            <div
              className={`absolute inset-0 flex flex-col justify-between rounded-[18px] bg-[#EAEAF1] p-6 shadow-[0_4px_6px_rgba(0,0,0,0.12)] backface-hidden ${
                estaVolteada && prefersReducedMotion ? "hidden" : "flex"
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-[#80849D]">
                {tarjetaActual.categoria}
              </span>
              <div className="my-auto text-center space-y-4">
                <span className="block text-5xl font-black text-black">
                  {tarjetaActual.categoria.charAt(0).toUpperCase()}
                </span>
                <p className="text-base sm:text-lg font-bold text-[#474747] leading-snug">
                  {tarjetaActual.pregunta}
                </p>
              </div>
              <span className="text-center text-xs font-medium text-[#80849D]">
                Toca para girar
              </span>
            </div>

            {/* Cara trasera (borde blanco + fondo suave #F4F8FD / #FEF5F8 / #E2F1F1 como Figma) */}
            <div
              className={`absolute inset-0 flex flex-col rounded-[18px] bg-white p-2.5 shadow-[0_4px_6px_rgba(0,0,0,0.12)] backface-hidden ${
                !estaVolteada && prefersReducedMotion ? "hidden" : "flex"
              }`}
              style={{
                transform: prefersReducedMotion ? "none" : "rotateY(180deg)"
              }}
            >
              <div
                style={{ backgroundColor: colorReverso }}
                className="flex flex-1 flex-col justify-between rounded-[14px] p-5"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#3E4B8F]">
                  Respuesta
                </span>
                <p className="my-auto text-base sm:text-[17px] font-semibold text-[#474747] leading-relaxed">
                  {tarjetaActual.respuesta}
                </p>
                <span className="text-xs font-medium text-[#80849D]">
                  Toca para regresar
                </span>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Controles inferiores */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={anteriorTarjeta}
            className="inline-flex h-12 items-center justify-center gap-1 rounded-[48px] border-2 border-[#3B3485] bg-white px-5 text-sm font-bold text-[#3E4B8F] hover:bg-[#EAEAF1] transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Anterior</span>
          </button>

          <button
            type="button"
            onClick={() => setEstaVolteada(!estaVolteada)}
            className="inline-flex h-12 items-center justify-center gap-1.5 rounded-[48px] bg-[#FFECC2] px-5 text-sm font-bold text-[#1E1E1E] hover:bg-[#FFDE97] transition-colors cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Girar</span>
          </button>

          <button
            type="button"
            onClick={siguienteTarjeta}
            className="inline-flex h-12 items-center justify-center gap-1 rounded-[48px] bg-[#3E4B8F] px-5 text-sm font-bold text-white hover:bg-[#323D75] transition-colors cursor-pointer"
          >
            <span>Siguiente</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </CursoShell>
  );
}
