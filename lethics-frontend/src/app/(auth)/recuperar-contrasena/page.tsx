"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecuperarContrasenaSchema, RecuperarContrasenaFormData } from "@/lib/validations";
import { authService } from "@/services/mocks";
import { LethicsLogo } from "@/components/layout/LethicsLogo";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function RecuperarContrasenaPage() {
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RecuperarContrasenaFormData>({
    resolver: zodResolver(RecuperarContrasenaSchema)
  });

  const onSubmit = async (data: RecuperarContrasenaFormData) => {
    setCargando(true);
    try {
      await authService.recuperarContrasena(data.correo);
      setEnviado(true);
      toast.success("Enlace de recuperación enviado a tu correo.");
    } catch (err: unknown) {
      const mensaje = err instanceof Error ? err.message : "Error al solicitar restablecimiento.";
      toast.error(mensaje);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFF5EC] px-4 py-12 flex items-center justify-center">
      {/* Botón circular flotante de regreso (Figma 108:2911) */}
      <Link
        href="/login"
        aria-label="Volver a iniciar sesión"
        className="fixed left-5 top-5 md:left-7 md:top-7 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#3E4B8F] text-white shadow-[4px_4px_2px_rgba(0,0,0,0.25)] hover:bg-[#323D75] transition-colors"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="w-full max-w-[582px] mx-auto flex flex-col items-center gap-12">
        <LethicsLogo href="/" size="lg" />

        <div className="w-full space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-[44px] font-extrabold text-[#3E4B8F] text-center leading-tight">
              Recupera tu contraseña
            </h1>
            <div className="h-[1px] w-full bg-[#B2B2B2]" />
          </div>

          <p className="text-lg md:text-2xl text-[#444] text-justify leading-relaxed">
            Coloca aquí tu correo para buscar tu usuario y enviarte un correo de recuperación de
            contraseña
          </p>

          {enviado ? (
            <div className="rounded-[24px] border border-emerald-300 bg-white p-6 text-center space-y-3">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
              <p className="text-lg font-bold text-[#1E1E1E]">Correo enviado con éxito</p>
              <p className="text-sm text-[#474747]">
                Revisa tu bandeja de entrada para restablecer tu contraseña.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-1.5">
                <label
                  htmlFor="rec-correo"
                  className="block text-lg md:text-xl font-normal text-[#1E1E1E]"
                >
                  Correo electrónico
                </label>
                <input
                  id="rec-correo"
                  type="email"
                  placeholder="Inserte su correo electrónico"
                  className="h-14 md:h-[68px] w-full rounded-[48px] border border-[#B2B2B2] bg-white px-6 text-base md:text-lg text-[#1E1E1E] placeholder:font-bold placeholder:text-[#959595] focus:border-[#3E4B8F] focus:outline-none focus:ring-2 focus:ring-[#3E4B8F]/30"
                  {...register("correo")}
                />
                {errors.correo && (
                  <p className="pl-4 text-xs font-medium text-[#FF5E19]">{errors.correo.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={cargando}
                className="flex h-14 md:h-[74px] w-full items-center justify-center rounded-[48px] bg-[#3E4B8F] text-xl md:text-2xl font-bold text-white hover:bg-[#323D75] transition-colors disabled:opacity-50 cursor-pointer"
              >
                {cargando ? "Enviando..." : "Enviar correo de recuperación"}
              </button>
            </form>
          )}

          <div className="text-center pt-2">
            <Link
              href="/login"
              className="text-lg md:text-xl font-bold text-[#3E4B8F] underline underline-offset-4 hover:opacity-80"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
