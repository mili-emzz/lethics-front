"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecuperarContrasenaSchema, RecuperarContrasenaFormData } from "@/lib/validations";
import { Boton, Input, Tarjeta } from "@/components/ui";
import { authService } from "@/services/mocks";
import { toast } from "sonner";
import { KeyRound, ArrowLeft, CheckCircle2 } from "lucide-react";

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
      toast.success("Enlace de restablecimiento enviado a tu bandeja.");
    } catch (err: unknown) {
      const mensaje = err instanceof Error ? err.message : "Error al solicitar restablecimiento.";
      toast.error(mensaje);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Tarjeta className="border border-[#D8D8D8] p-8 md:p-10 shadow-lg bg-white space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFECC2] text-[#3E4B8F] mb-3">
              <KeyRound className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-black text-[#1E1E1E]">Recuperar Contraseña</h1>
            <p className="text-sm text-[#6C6C63]">
              Ingresa el correo asociado a tu cuenta para restablecer tu acceso.
            </p>
          </div>

          {enviado ? (
            <div className="space-y-4 text-center">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm space-y-2">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 mx-auto" />
                <p className="font-semibold">Instrucciones enviadas</p>
                <p className="text-xs text-emerald-700">
                  Revisa tu bandeja de entrada o spam para completar el cambio de contraseña.
                </p>
              </div>
              <Link href="/login" className="inline-block w-full">
                <Boton variant="secondary" className="w-full">
                  Volver a Iniciar Sesión
                </Boton>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                etiqueta="Correo Electrónico"
                type="email"
                placeholder="ejemplo@lethics.edu"
                error={errors.correo?.message}
                {...register("correo")}
              />

              <Boton
                type="submit"
                cargando={cargando}
                className="w-full mt-2"
                size="lg"
              >
                Enviar enlace de recuperación
              </Boton>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6C6C63] hover:text-[#1E1E1E]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Volver a Iniciar Sesión
                </Link>
              </div>
            </form>
          )}
        </Tarjeta>
      </div>
    </div>
  );
}
