"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistroCompletoSchema, RegistroCompletoFormData } from "@/lib/validations";
import { authService } from "@/services/mocks";
import { LethicsLogo } from "@/components/layout/LethicsLogo";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function RegistroPage() {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegistroCompletoFormData>({
    resolver: zodResolver(RegistroCompletoSchema),
    defaultValues: {
      nombreCompleto: "",
      correo: "",
      contrasena: "",
      confirmarContrasena: "",
      rol: "estudiante"
    }
  });

  const onSubmit = async (data: RegistroCompletoFormData) => {
    setCargando(true);
    try {
      await authService.registrarse({
        nombreCompleto: data.nombreCompleto,
        correo: data.correo,
        contrasena: data.contrasena,
        rol: data.rol
      });
      toast.success("Cuenta creada con éxito. Te enviamos tu código de verificación.");
      router.push(`/verificar-correo?correo=${encodeURIComponent(data.correo)}`);
    } catch (err: unknown) {
      const mensaje = err instanceof Error ? err.message : "Error al procesar el registro.";
      toast.error(mensaje);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFF5EC] px-4 py-8 md:px-10 flex items-center justify-center">
      {/* Botón circular flotante de regreso (Figma 76:1395) */}
      <Link
        href="/"
        aria-label="Volver al inicio"
        className="fixed left-5 top-5 md:left-7 md:top-7 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#3E4B8F] text-white shadow-[4px_4px_2px_rgba(0,0,0,0.25)] hover:bg-[#323D75] transition-colors"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="mx-auto w-full max-w-[1440px] grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-16 pt-10 lg:pt-0">
        {/* Columna izquierda: Logo + Espacio en blanco para ilustración (Figma 76:1393) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center gap-10">
          <LethicsLogo href="/" size="lg" />
          <div
            aria-hidden="true"
            className="hidden lg:block w-full max-w-[540px] aspect-[4/3] rounded-[36px] bg-white/40 border-2 border-dashed border-[#D8D8D8]"
          />
        </div>

        {/* Columna derecha: Formulario directo sobre #FFF5EC (Figma 75:1362) */}
        <div className="lg:col-span-6 w-full max-w-[540px] mx-auto space-y-5">
          <h1 className="text-3xl md:text-[42px] font-extrabold text-[#3E4B8F] text-center">
            Regístrate a Lethics
          </h1>

          {/* Botón Google + Divisor O */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex h-14 md:h-[64px] w-full items-center justify-center gap-4 rounded-[48px] border border-[#A6A6A6] bg-white px-6 text-lg md:text-2xl text-[#959595] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-[#D8D8D8] text-xs font-bold text-[#3E4B8F]">
                G
              </span>
              <span>Regístrate con Google</span>
            </button>

            <div className="flex items-center gap-4 opacity-90">
              <div className="h-[1px] flex-1 bg-[#B2B2B2]" />
              <span className="text-xl text-[#959595]">O</span>
              <div className="h-[1px] flex-1 bg-[#B2B2B2]" />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="reg-nombre" className="block text-base md:text-lg text-[#1E1E1E]">
                Nombre
              </label>
              <input
                id="reg-nombre"
                type="text"
                placeholder="Ingrese su nombre completo"
                className="h-13 md:h-[58px] w-full rounded-[48px] border border-[#B2B2B2] bg-white px-6 text-base text-[#1E1E1E] placeholder:font-bold placeholder:text-[#959595] focus:border-[#3E4B8F] focus:outline-none focus:ring-2 focus:ring-[#3E4B8F]/30"
                {...register("nombreCompleto")}
              />
              {errors.nombreCompleto && (
                <p className="pl-4 text-xs font-medium text-[#FF5E19]">
                  {errors.nombreCompleto.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="reg-correo" className="block text-base md:text-lg text-[#1E1E1E]">
                Correo electrónico
              </label>
              <input
                id="reg-correo"
                type="email"
                placeholder="Inserte su correo electrónico"
                className="h-13 md:h-[58px] w-full rounded-[48px] border border-[#B2B2B2] bg-white px-6 text-base text-[#1E1E1E] placeholder:font-bold placeholder:text-[#959595] focus:border-[#3E4B8F] focus:outline-none focus:ring-2 focus:ring-[#3E4B8F]/30"
                {...register("correo")}
              />
              {errors.correo && (
                <p className="pl-4 text-xs font-medium text-[#FF5E19]">{errors.correo.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="reg-fecha" className="block text-base md:text-lg text-[#1E1E1E]">
                Fecha de nacimiento
              </label>
              <input
                id="reg-fecha"
                type="text"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                placeholder="DD  /  MM  /  AAAA"
                className="h-13 md:h-[58px] w-full rounded-[48px] border border-[#B2B2B2] bg-white px-6 text-base text-[#1E1E1E] placeholder:font-bold placeholder:text-[#959595] focus:border-[#3E4B8F] focus:outline-none focus:ring-2 focus:ring-[#3E4B8F]/30"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="reg-pass" className="block text-base md:text-lg text-[#1E1E1E]">
                Contraseña
              </label>
              <input
                id="reg-pass"
                type="password"
                placeholder="Ingrese su contraseña"
                className="h-13 md:h-[58px] w-full rounded-[48px] border border-[#B2B2B2] bg-white px-6 text-base text-[#1E1E1E] placeholder:font-bold placeholder:text-[#959595] focus:border-[#3E4B8F] focus:outline-none focus:ring-2 focus:ring-[#3E4B8F]/30"
                {...register("contrasena")}
              />
              {errors.contrasena && (
                <p className="pl-4 text-xs font-medium text-[#FF5E19]">
                  {errors.contrasena.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="reg-confirm" className="block text-base md:text-lg text-[#1E1E1E]">
                Confirme su contraseña
              </label>
              <input
                id="reg-confirm"
                type="password"
                placeholder="Ingrese su contraseña"
                className="h-13 md:h-[58px] w-full rounded-[48px] border border-[#B2B2B2] bg-white px-6 text-base text-[#1E1E1E] placeholder:font-bold placeholder:text-[#959595] focus:border-[#3E4B8F] focus:outline-none focus:ring-2 focus:ring-[#3E4B8F]/30"
                {...register("confirmarContrasena")}
              />
              {errors.confirmarContrasena && (
                <p className="pl-4 text-xs font-medium text-[#FF5E19]">
                  {errors.confirmarContrasena.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={cargando}
                className="flex h-14 md:h-[68px] w-full items-center justify-center rounded-[48px] bg-[#3E4B8F] text-xl md:text-2xl font-bold text-white hover:bg-[#323D75] transition-colors disabled:opacity-50 cursor-pointer"
              >
                {cargando ? "Creando cuenta..." : "Comenzar"}
              </button>
            </div>

            <div className="text-center space-y-1 pt-1">
              <p className="text-base text-[#1E1E1E]">¿Ya tienes una cuenta?</p>
              <Link
                href="/login"
                className="inline-block text-lg font-bold text-[#3E4B8F] underline underline-offset-4 hover:opacity-80"
              >
                Ingresa aquí
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
