import React from "react";
import Link from "next/link";
import { Tarjeta, Boton, Badge } from "@/components/ui";
import {
  BookOpen,
  Layers,
  Cpu,
  Award,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export default function ManualPage() {
  const secciones = [
    {
      icono: BookOpen,
      titulo: "1. Lecciones Teóricas y Autoguardado",
      contenido:
        "Cada módulo incluye lecturas reflexivas estructuradas. Tu avance de lectura se guarda automáticamente sección por sección en tu navegador, permitiéndote pausar y retomar en cualquier momento."
    },
    {
      icono: Layers,
      titulo: "2. Mazo de Flashcards con Giro 3D",
      contenido:
        "Utiliza las tarjetas para estudio espaciado. Toca o haz clic sobre la tarjeta para voltearla en 3D (respetando la preferencia del sistema para reducir movimiento) y usa el botón 'Barajar' para dinamizar el repaso."
    },
    {
      icono: Cpu,
      titulo: "3. Simulador de Casos Éticos e IA (RN-06)",
      contenido:
        "Enfrentarás dilemas reales de la industria. Redacta tu propuesta fundada en códigos éticos. La IA evaluará cualitativamente tus argumentos destacando fortalezas y áreas de mejora sin otorgar notas numéricas sesgadas."
    },
    {
      icono: CheckCircle2,
      titulo: "4. Cuestionarios y Candados Secuenciales (RN-02, RN-03)",
      contenido:
        "Para desbloquear el siguiente módulo se requiere aprobar el cuestionario con al menos 70% de aciertos y haber resuelto el simulador previo. Tienes intentos ilimitados y cada intento queda registrado en tu historial."
    },
    {
      icono: Award,
      titulo: "5. Proyecto Final y Examen de Acreditación (RN-05)",
      contenido:
        "Al completar el 100% de los 5 módulos formativos se desbloquea la entrega del Proyecto Final. Una vez entregada la memoria o repositorio, podrás presentar el Examen Final Integrador para obtener tu acreditación."
    }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2">
        <Badge variant="indigo" size="md">
          Guía de Uso de la Plataforma
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1E1E1E]">
          Manual de Usuario de Lethics
        </h1>
        <p className="text-sm sm:text-base text-[#474747]">
          Conoce el flujo pedagógico, las reglas de negocio y los componentes interactivos
          diseñados para tu formación ética.
        </p>
      </div>

      <div className="space-y-4">
        {secciones.map((sec, i) => {
          const Icono = sec.icono;
          return (
            <Tarjeta key={i} className="p-6 bg-white border border-[#D8D8D8] space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#FFECC2] text-[#3E4B8F] flex items-center justify-center shrink-0">
                  <Icono className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-[#1E1E1E]">{sec.titulo}</h2>
              </div>
              <p className="text-sm text-[#474747] leading-relaxed pl-13">
                {sec.contenido}
              </p>
            </Tarjeta>
          );
        })}
      </div>

      <div className="pt-4 flex justify-center">
        <Link href="/dashboard">
          <Boton size="lg" className="gap-2">
            <span>Ir al Panel de Estudio</span>
            <ArrowRight className="h-4 w-4" />
          </Boton>
        </Link>
      </div>
    </div>
  );
}
