"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerificarCorreoSchema, VerificarCorreoFormData } from "@/lib/validations";
import { authService } from "@/services/mocks";
import { formatearTiempoRestante } from "@/lib/utils";
import { LethicsLogo } from "@/components/layout/LethicsLogo";
import { toast } from "sonner";
import { ArrowLeft, Clock, RefreshCw } from "lucide-react";

function ContenidoVerificarCorreo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const correoParam = searchParams.get("correo") || "tu correo";

  const [segundosRestantes, setSegundosRestantes] = useState(300);
  const [cargando, setCargando] = useState(false);
  const [reenviando, setReenviando] = useState(false);

  useEffect(() => {
    if (segundosRestantes <= 0) return;
    const interval = setInterval(() => {
      setSegundosRestantes((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [segundosRestantes]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<VerificarCorreoFormData>({
    resolver: zodResolver(VerificarCorreoSchema),
    defaultValues: { codigo: "123456" }
  });

  const onSubmit = async (data: VerificarCorreoFormData) => {
    if (segundosRestantes <= 0) {
      toast.error("El tiempo límite de 5 minutos ha expirado. Solicita un nuevo código.");
      return;
    }
    setCargando(true);
    try {
      await authService.verificarCodigoCorreo(correoParam, data.codigo);
      toast.success("¡Correo verificado con éxito! Bienvenido a Lethics.");
      router.push("/dashboard");
    } catch (err: unknown) {
      const mensaje = err instanceof Error ? err.message : "Error al verificar código.";
      toast.error(mensaje);
    } finally {
      setCargando(false);
    }
  };

  const handleReenviar = async () => {
    setReenviando(true);
    try {
      const nuevosSegundos = await authService.reenviarCodigoCorreo(correoParam);
      setSegundosRestantes(nuevosSegundos);
      toast.info("Hemos enviado un nuevo código de 6 dígitos.");
    } catch {
      toast.error("No se pudo reenviar el código.");
    } finally {
      setReenviando(false);
    }
  };

  return (
    <div className="w-full max-w-[582px] mx-auto flex flex-col items-center gap-10">
      <LethicsLogo href="/" size="lg" />

      <div className="w-full space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-[44px] font-extrabold text-[#3E4B8F] text-center leading-tight">
            Verifica tu correo
          </h1>
          <div className="h-[1px] w-full bg-[#B2B2B2]" />
        </div>

        <p className="text-lg md:text-xl text-[#444] text-center leading-relaxed">
          Ingresa el código de 6 dígitos enviado a{" "}
          <strong className="text-[#1E1E1E]">{correoParam}</strong>
        </p>

        <div className="flex items-center justify-center gap-2 rounded-[48px] bg-white border border-[#D8D8D8] py-3 px-6 text-base font-bold">
          <Clock
            className={`h-5 w-5 ${
              segundosRestantes < 60 ? "text-[#FF5E19] animate-pulse" : "text-[#FFB006]"
            }`}
          />
          <span className="text-[#6C6C63]">Vigencia restante (RN-01):</span>
          <span
            className={`font-mono text-lg ${
              segundosRestantes < 60 ? "text-[#FF5E19]" : "text-[#3E4B8F]"
            }`}
          >
            {formatearTiempoRestante(segundosRestantes)}
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1.5">
            <label htmlFor="ver-codigo" className="block text-lg text-[#1E1E1E]">
              Código de verificación
            </label>
            <input
              id="ver-codigo"
              type="text"
              maxLength={6}
              disabled={segundosRestantes <= 0}
              placeholder="123456"
              className="h-14 md:h-[68px] w-full rounded-[48px] border border-[#B2B2B2] bg-white px-6 text-center text-2xl font-mono font-bold tracking-[0.4em] text-[#1E1E1E] focus:border-[#3E4B8F] focus:outline-none focus:ring-2 focus:ring-[#3E4B8F]/30 disabled:opacity-50"
              {...register("codigo")}
            />
            {errors.codigo && (
              <p className="pl-4 text-xs font-medium text-[#FF5E19]">{errors.codigo.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={cargando || segundosRestantes <= 0}
            className="flex h-14 md:h-[74px] w-full items-center justify-center rounded-[48px] bg-[#3E4B8F] text-xl md:text-2xl font-bold text-white hover:bg-[#323D75] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {cargando ? "Verificando..." : "Verificar y Comenzar"}
          </button>
        </form>

        <div className="flex flex-col items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleReenviar}
            disabled={reenviando}
            className="inline-flex items-center gap-2 text-base font-bold text-[#3E4B8F] underline underline-offset-4 hover:opacity-80 cursor-pointer"
          >
            <RefreshCw className={`h-4 w-4 ${reenviando ? "animate-spin" : ""}`} />
            <span>Reenviar código</span>
          </button>
          <Link href="/login" className="text-sm text-[#6C6C63] hover:text-[#1E1E1E]">
            Volver a Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerificarCorreoPage() {
  return (
    <div className="relative min-h-screen bg-[#FFF5EC] px-4 py-12 flex items-center justify-center">
      <Link
        href="/registro"
        aria-label="Volver al registro"
        className="fixed left-5 top-5 md:left-7 md:top-7 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#3E4B8F] text-white shadow-[4px_4px_2px_rgba(0,0,0,0.25)] hover:bg-[#323D75] transition-colors"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>
      <Suspense
        fallback={
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#3E4B8F] border-t-transparent" />
        }
      >
        <ContenidoVerificarCorreo />
      </Suspense>
    </div>
  );
}
