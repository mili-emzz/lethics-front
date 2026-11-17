import React from "react";
import Link from "next/link";
import { ShieldCheck, Scale, Cpu, Terminal, ArrowRight, CheckCircle2 } from "lucide-react";
import { Boton, Tarjeta, Badge } from "@/components/ui";

export default function LandingPage() {
  const caracteristicas = [
    {
      icono: Scale,
      titulo: "Deontología ACM / IEEE",
      desc: "Aprende los 8 principios del código deontológico que todo profesional debe salvaguardar."
    },
    {
      icono: ShieldCheck,
      titulo: "Privacy by Design",
      desc: "Implementa arquitecturas de datos seguras bajo estándares GDPR, minimización y consentimiento."
    },
    {
      icono: Cpu,
      titulo: "IA y Sesgos Algorítmicos",
      desc: "Detecta variables proxy y aplica métricas de justicia algorítmica con supervisión humana."
    },
    {
      icono: Terminal,
      titulo: "Ciberseguridad y Hackeo Ético",
      desc: "Domina los límites legales de divulgación coordinada y protección ante brechas críticas."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* SECCIÓN HERO */}
      <section className="relative overflow-hidden px-4 pt-12 pb-20 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2">
              <Badge variant="crema" size="md">
                🎓 Formación Ética para Ingenieros de Software
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1E1E1E] leading-[1.1]">
              Construye software <span className="text-[#3E4B8F]">responsable</span>, legal y justo.
            </h1>
            <p className="text-lg sm:text-xl text-[#474747] leading-relaxed">
              Lethics es la plataforma interactiva diseñada para aprender principios, leyes y marcos
              normativos mediante simuladores éticos, flashcards y casos de estudio reales.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
              <Link href="/registro" className="w-full sm:w-auto">
                <Boton size="lg" className="w-full sm:w-auto shadow-md gap-2">
                  <span>Comenzar ahora</span>
                  <ArrowRight className="h-5 w-5" />
                </Boton>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Boton variant="secondary" size="lg" className="w-full sm:w-auto">
                  Iniciar sesión
                </Boton>
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-4 text-xs font-semibold text-[#6C6C63] justify-center lg:justify-start">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> 5 Módulos progresivos
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Simuladores interactivos
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Acreditación final
              </span>
            </div>
          </div>

          {/* ILUSTRACIÓN / PREVIEW HERO */}
          <div className="w-full max-w-lg lg:max-w-md">
            <Tarjeta fondoSuave="azul" className="border-2 border-[#3E4B8F]/20 p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#D8D8D8]/60 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-mono text-[#6C6C63]">Simulador de Caso Ético #01</span>
              </div>
              <div className="space-y-3">
                <Badge variant="indigo" size="sm">
                  Caso MediPulse
                </Badge>
                <h3 className="font-bold text-lg text-[#1E1E1E]">
                  ¿Desplegar a producción con una falla de telemetría médica conocida?
                </h3>
                <p className="text-sm text-[#474747] italic bg-white p-3 rounded-xl border border-[#D8D8D8]/50">
                  &quot;El bienestar, la seguridad y la salud del público deben estar siempre por encima
                  del interés comercial.&quot;
                </p>
              </div>
              <div className="pt-2">
                <div className="w-full bg-[#EAEAF1] rounded-full h-2">
                  <div className="bg-[#3E4B8F] h-2 rounded-full w-3/5" />
                </div>
                <div className="flex justify-between text-[11px] text-[#6C6C63] mt-2 font-medium">
                  <span>Análisis de dilema</span>
                  <span>Evaluación en tiempo real</span>
                </div>
              </div>
            </Tarjeta>
          </div>
        </div>
      </section>

      {/* PILARES EDUCATIVOS */}
      <section id="modulos" className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-[#D8D8D8]/60">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="dorado">Ruta Formativa Integral</Badge>
            <h2 className="text-3xl font-extrabold text-[#1E1E1E]">
              Domina las 5 dimensiones éticas del software
            </h2>
            <p className="text-[#6C6C63] text-sm md:text-base">
              Estructura secuencial basada en estándares de la industria, normativas internacionales y
              casos del mundo real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {caracteristicas.map((item, idx) => {
              const Icono = item.icono;
              return (
                <Tarjeta key={idx} fondoSuave="crema" className="space-y-3 border-[#D8D8D8]">
                  <div className="h-10 w-10 rounded-xl bg-[#3E4B8F] text-white flex items-center justify-center shadow-xs">
                    <Icono className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#1E1E1E]">{item.titulo}</h3>
                  <p className="text-sm text-[#474747] leading-relaxed">{item.desc}</p>
                </Tarjeta>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
