"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerificarCorreoSchema, VerificarCorreoFormData } from "@/lib/validations";
import { Boton, Input, Tarjeta } from "@/components/ui";
import { authService } from "@/services/mocks";
import { formatearTiempoRestante } from "@/lib/utils";
import { toast } from "sonner";
import { Mail, Clock, RefreshCw, ArrowRight } from "lucide-react";

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
      toast.error("El tiempo límite de 5 minutos ha expirado. Por favor solicita un nuevo código.");
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
      toast.info("Hemos enviado un nuevo código de 6 dígitos a tu bandeja.");
    } catch {
      toast.error("No se pudo reenviar el código. Intenta de nuevo.");
    } finally {
      setReenviando(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Tarjeta className="border border-[#D8D8D8] p-8 md:p-10 shadow-lg bg-white space-y-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFECC2] text-[#3E4B8F]">
          <Mail className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-[#1E1E1E]">Verifica tu Correo</h1>
          <p className="text-sm text-[#474747]">
            Hemos enviado un código numérico a <strong className="text-[#1E1E1E]">{correoParam}</strong>
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 rounded-xl bg-[#F4F8FD] p-3 text-sm font-semibold border border-[#D8D8D8]/60">
          <Clock className={`h-4 w-4 ${segundosRestantes < 60 ? "text-[#FF5E19] animate-bounce" : "text-[#3E4B8F]"}`} />
          <span className="text-[#6C6C63]">Vigencia restante:</span>
          <span
            className={`font-mono text-base font-bold ${
              segundosRestantes < 60 ? "text-[#FF5E19]" : "text-[#3E4B8F]"
            }`}
          >
            {formatearTiempoRestante(segundosRestantes)}
          </span>
        </div>

        {segundosRestantes <= 0 && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            El código ha expirado por regla de seguridad (RN-01). Haz clic abajo para generar uno nuevo.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Ingresa los 6 dígitos"
            maxLength={6}
            className="text-center text-xl tracking-widest font-mono font-bold"
            error={errors.codigo?.message}
            disabled={segundosRestantes <= 0}
            {...register("codigo")}
          />

          <Boton
            type="submit"
            cargando={cargando}
            disabled={segundosRestantes <= 0}
            className="w-full gap-2"
            size="lg"
          >
            <span>Verificar y Comenzar</span>
            <ArrowRight className="h-4 w-4" />
          </Boton>
        </form>

        <div className="space-y-3 pt-2 border-t border-[#D8D8D8]/60">
          <button
            onClick={handleReenviar}
            disabled={reenviando}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3E4B8F] hover:underline disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${reenviando ? "animate-spin" : ""}`} />
            <span>¿No recibiste el código? Reenviar</span>
          </button>
          <div>
            <Link href="/login" className="text-xs text-[#6C6C63] hover:text-[#1E1E1E]">
              Volver a Iniciar Sesión
            </Link>
          </div>
        </div>
      </Tarjeta>
    </div>
  );
}

export default function VerificarCorreoPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
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
