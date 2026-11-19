import React from "react";
import Link from "next/link";
import { Layers, Brain, ClipboardCheck, Folder } from "lucide-react";
import { LethicsLogo } from "@/components/layout/LethicsLogo";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFF5EC] text-[#1E1E1E] overflow-x-hidden">
      {/* NAVBAR FLOTANTE PILL (Figma 59:85) */}
      <header className="w-full px-4 pt-4 md:px-8 md:pt-7">
        <div className="mx-auto flex h-16 md:h-[112px] max-w-[1669px] items-center justify-between rounded-[56px] border border-black/50 bg-white px-5 md:px-14 shadow-[0_6px_4px_#FFDE97]">
          <LethicsLogo href="/" size="lg" />

          <nav className="flex items-center gap-4 md:gap-12">
            <a
              href="#inicio"
              className="hidden md:inline-block text-xl lg:text-2xl font-bold text-[#3E4B8F] hover:opacity-80 transition-opacity"
            >
              Inicio
            </a>
            <a
              href="#nosotros"
              className="hidden md:inline-block text-xl lg:text-2xl font-bold text-[#3E4B8F] hover:opacity-80 transition-opacity"
            >
              Nosotros
            </a>
            <a
              href="#contacto"
              className="hidden md:inline-block text-xl lg:text-2xl font-bold text-[#3E4B8F] hover:opacity-80 transition-opacity"
            >
              Contacto
            </a>
            <Link
              href="/login"
              className="inline-flex h-11 md:h-[60px] items-center justify-center rounded-[48px] bg-[#3E4B8F] px-6 md:px-10 text-sm md:text-2xl font-bold text-white shadow-[0_4px_2px_rgba(0,0,0,0.25)] hover:bg-[#323D75] transition-colors whitespace-nowrap"
            >
              Iniciar sesión
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO (Figma 70:608) */}
      <section
        id="inicio"
        className="mx-auto max-w-[1600px] px-4 pt-12 pb-16 md:px-12 md:pt-20 md:pb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="font-extrabold tracking-tight leading-[0.98]">
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[74px] text-lethics-brand">
                ILUMINA TU CÓDIGO
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-[74px] text-[#3E4B8F]">
                CON ÉTICA
              </span>
            </h1>

            <p className="max-w-2xl mx-auto lg:mx-0 text-lg sm:text-xl md:text-2xl text-[#6C6C63] leading-snug">
              Descubre los principios que guían el desarrollo de software responsable.
            </p>

            <div className="pt-2">
              <Link
                href="/registro"
                className="inline-flex h-14 md:h-[70px] w-full sm:w-[270px] items-center justify-center rounded-[53px] bg-[#3E4B8F] px-8 text-xl md:text-2xl font-bold text-white shadow-[0_4px_2px_rgba(0,0,0,0.25)] hover:bg-[#323D75] transition-colors"
              >
                Comenzar
              </Link>
            </div>
          </div>

          {/* Espacio reservado en blanco para la ilustración principal de Lumi */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div
              aria-hidden="true"
              className="w-full max-w-[560px] aspect-[4/3] rounded-[36px] bg-white/40 border-2 border-dashed border-[#D8D8D8]"
            />
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: DESARROLLA CON CONSCIENCIA (Figma 70:641) */}
      <section
        id="nosotros"
        className="mx-auto max-w-[1554px] px-4 py-12 md:px-12 md:py-20 space-y-12"
      >
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-[50px] font-extrabold text-[#3E4B8F] leading-tight">
            Desarrolla con consciencia
          </h2>
          <p className="text-lg sm:text-2xl md:text-[32px] font-normal text-[#3E4B8F] leading-snug">
            Explora la ética, las leyes y las responsabilidades detrás de la tecnología que creamos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Card 1: Aprende */}
          <article className="flex flex-col justify-between rounded-[36px] border border-[#D8D8D8] bg-white p-6 md:p-8 shadow-[4px_4px_2px_#FFEBC2]">
            <div className="space-y-4">
              {/* Espacio en blanco para ilustración */}
              <div
                aria-hidden="true"
                className="h-56 md:h-64 w-full rounded-[21px] border border-[#D8D8D8] bg-white"
              />
              <div className="flex justify-end">
                <span className="inline-flex min-w-[140px] items-center justify-center rounded-[36px] bg-[#FFECC2] px-5 py-1.5 text-lg md:text-xl font-medium text-[#FFB006]">
                  Aprende
                </span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <h3 className="text-2xl md:text-[28px] font-bold text-[#3E4B8F]">
                Ética digital
              </h3>
              <p className="text-base md:text-xl text-[#6C6C63] leading-snug">
                Comprende los principios y responsabilidades que orientan la creación de tecnología
              </p>
            </div>
          </article>

          {/* Card 2: Descubre */}
          <article className="flex flex-col justify-between rounded-[36px] border border-[#D8D8D8] bg-white p-6 md:p-8 shadow-[4px_4px_2px_#AED5F6]">
            <div className="space-y-4">
              {/* Espacio en blanco para ilustración */}
              <div
                aria-hidden="true"
                className="h-56 md:h-64 w-full rounded-[21px] border border-[#D8D8D8] bg-white"
              />
              <div className="flex justify-end">
                <span className="inline-flex min-w-[140px] items-center justify-center rounded-[36px] bg-[#FFECC2] px-5 py-1.5 text-lg md:text-xl font-medium text-[#FFB006]">
                  Descubre
                </span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <h3 className="text-2xl md:text-[28px] font-bold text-[#3E4B8F]">
                Leyes y normativas
              </h3>
              <p className="text-base md:text-xl text-[#6C6C63] leading-snug">
                Descubre las reglas que regulan el desarrollo de software y el uso responsable de la tecnología.
              </p>
            </div>
          </article>

          {/* Card 3: Aplica */}
          <article className="flex flex-col justify-between rounded-[36px] border border-[#D8D8D8] bg-white p-6 md:p-8 shadow-[4px_4px_2px_#FFEBC2]">
            <div className="space-y-4">
              {/* Espacio en blanco para ilustración */}
              <div
                aria-hidden="true"
                className="h-56 md:h-64 w-full rounded-[21px] border border-[#D8D8D8] bg-white"
              />
              <div className="flex justify-end">
                <span className="inline-flex min-w-[140px] items-center justify-center rounded-[36px] bg-[#FFECC2] px-5 py-1.5 text-lg md:text-xl font-medium text-[#FFB006]">
                  Aplica
                </span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <h3 className="text-2xl md:text-[28px] font-bold text-[#3E4B8F]">
                Desarrollo responsable
              </h3>
              <p className="text-base md:text-xl text-[#6C6C63] leading-snug">
                Aprende a reconocer los dilemas y las consecuencias de las decisiones tecnológicas.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* SECCIÓN 3: CUADRÍCULA 2x2 AZUL/CREMA + ILUSTRACIÓN (Figma 70:319) */}
      <section className="mx-auto max-w-[1554px] px-4 py-14 md:px-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-9">
            {/* Flashcards (#3A4A88) */}
            <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 rounded-[29px] border border-[#D8D8D8] bg-[#3A4A88] p-7 text-center text-white shadow-[3px_3px_2px_#838FCC]">
              <Layers className="h-14 w-14 text-white stroke-[1.75]" />
              <h3 className="text-2xl md:text-3xl font-bold">Flashcards</h3>
              <p className="text-base md:text-lg leading-snug text-white/95">
                Repasa conceptos clave con tarjetas interactivas
              </p>
            </div>

            {/* Simuladores (#FFDE97) */}
            <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 rounded-[29px] border border-[#D8D8D8] bg-[#FFDE97] p-7 text-center shadow-[3px_3px_2px_#FFEBBF]">
              <Brain className="h-14 w-14 text-white stroke-[1.75]" />
              <h3 className="text-2xl md:text-3xl font-bold text-white">Simuladores</h3>
              <p className="text-base md:text-lg leading-snug text-[#6C6C63]">
                Analiza tus decisiones con ayuda de la IA
              </p>
            </div>

            {/* Cuestionarios (#FFDE97) */}
            <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 rounded-[29px] border border-[#D8D8D8] bg-[#FFDE97] p-7 text-center shadow-[3px_3px_2px_#FFEBBF]">
              <ClipboardCheck className="h-14 w-14 text-white stroke-[1.75]" />
              <h3 className="text-2xl md:text-3xl font-bold text-white">Cuestionarios</h3>
              <p className="text-base md:text-lg leading-snug text-[#6C6C63]">
                Pon a prueba tus conocimientos con preguntas clave
              </p>
            </div>

            {/* Proyecto final (#3A4A88) */}
            <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 rounded-[29px] border border-[#D8D8D8] bg-[#3A4A88] p-7 text-center text-white shadow-[3px_3px_2px_#838FCC]">
              <Folder className="h-14 w-14 text-white stroke-[1.75]" />
              <h3 className="text-2xl md:text-3xl font-bold">Proyecto final</h3>
              <p className="text-base md:text-lg leading-snug text-white/95">
                Aplica lo aprendido para resolver una problemática
              </p>
            </div>
          </div>

          {/* Espacio en blanco para ilustración secundaria de Lumi */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div
              aria-hidden="true"
              className="w-full max-w-[520px] aspect-[4/3] rounded-[36px] bg-white/40 border-2 border-dashed border-[#D8D8D8]"
            />
          </div>
        </div>
      </section>

      {/* FOOTER (Figma 70:727) */}
      <footer id="contacto" className="mx-auto max-w-[1421px] px-4 pt-12 pb-12 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 border-l-2 border-[#D8D8D8] pl-6 md:pl-8 py-4">
          <div className="max-w-lg space-y-3">
            <span className="block text-3xl md:text-[40px] font-extrabold text-lethics-brand leading-none">
              Lethics
            </span>
            <p className="text-base md:text-lg text-[#757575]">
              Plataforma educativa para el aprendizaje de ética en el desarrollo de software
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 md:gap-16 text-base text-[#1E1E1E]">
            <ul className="space-y-3">
              <li>
                <Link href="/manual" className="hover:text-[#3E4B8F] transition-colors">
                  Aviso de privacidad
                </Link>
              </li>
              <li>
                <Link href="/manual" className="hover:text-[#3E4B8F] transition-colors">
                  Términos y condiciones de Uso
                </Link>
              </li>
              <li>
                <Link href="/manual" className="hover:text-[#3E4B8F] transition-colors">
                  Manual de Usuario
                </Link>
              </li>
            </ul>

            <ul className="space-y-3">
              <li>
                <a href="#inicio" className="hover:text-[#3E4B8F] transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-[#3E4B8F] transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-[#3E4B8F] transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 text-center text-sm md:text-base text-[#757575]">
          © [2026] Lethics Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
