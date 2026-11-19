"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginFormData } from "@/lib/validations";
import { useApp } from "@/context/AppContext";
import { LethicsLogo } from "@/components/layout/LethicsLogo";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { iniciarSesionUsuario } = useApp();
  const [cargando, setCargando] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      correo: "alex.rivas@lethics.edu",
      contrasena: "Password123"
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    setCargando(true);
    try {
      await iniciarSesionUsuario(data.correo, data.contrasena);
      toast.success("¡Bienvenido de vuelta a Lethics!");
      router.push("/dashboard");
    } catch (err: unknown) {
      const mensaje = err instanceof Error ? err.message : "Error al iniciar sesión.";
      toast.error(mensaje);
    } finally {
      setCargando(false);
    }
  };

  const handleGoogleMock = async () => {
    setCargando(true);
    try {
      await iniciarSesionUsuario("alex.rivas@lethics.edu", "Password123");
      toast.success("Sesión iniciada con Google.");
      router.push("/dashboard");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFF5EC] px-4 py-8 md:px-10 flex items-center justify-center">
      {/* Botón circular flotante de regreso (Figma 105:2699) */}
      <Link
        href="/"
        aria-label="Volver al inicio"
        className="fixed left-5 top-5 md:left-7 md:top-7 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#3E4B8F] text-white shadow-[4px_4px_2px_rgba(0,0,0,0.25)] hover:bg-[#323D75] transition-colors"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="mx-auto w-full max-w-[1440px] grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-16 pt-10 lg:pt-0">
        {/* Columna izquierda: Logo + Espacio en blanco para ilustración (Figma 74:1158) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center gap-10">
          <LethicsLogo href="/" size="lg" />
          <div
            aria-hidden="true"
            className="hidden lg:block w-full max-w-[540px] aspect-[4/3] rounded-[36px] bg-white/40 border-2 border-dashed border-[#D8D8D8]"
          />
        </div>

        {/* Columna derecha: Formulario directo sobre canvas #FFF5EC (Figma 74:1131) */}
        <div className="lg:col-span-6 w-full max-w-[540px] mx-auto space-y-8">
          <h1 className="text-3xl md:text-[44px] font-extrabold text-[#3E4B8F] text-center">
            Inicia sesión
          </h1>

          {/* Botón Google + Divisor O */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={handleGoogleMock}
              disabled={cargando}
              className="flex h-14 md:h-[68px] w-full items-center justify-center gap-4 rounded-[48px] border border-[#A6A6A6] bg-white px-6 text-lg md:text-2xl text-[#959595] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-[#D8D8D8] text-xs font-bold text-[#3E4B8F]">
                G
              </span>
              <span>Ingresa con Google</span>
            </button>

            <div className="flex items-center gap-4 opacity-90">
              <div className="h-[1px] flex-1 bg-[#B2B2B2]" />
              <span className="text-xl md:text-2xl text-[#959595]">O</span>
              <div className="h-[1px] flex-1 bg-[#B2B2B2]" />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-1.5">
              <label
                htmlFor="login-correo"
                className="block text-lg md:text-xl font-normal text-[#1E1E1E]"
              >
                Correo electrónico
              </label>
              <input
                id="login-correo"
                type="email"
                placeholder="Inserte su correo electrónico"
                className="h-14 md:h-[64px] w-full rounded-[48px] border border-[#B2B2B2] bg-white px-6 text-base md:text-lg text-[#1E1E1E] placeholder:font-bold placeholder:text-[#959595] focus:border-[#3E4B8F] focus:outline-none focus:ring-2 focus:ring-[#3E4B8F]/30"
                {...register("correo")}
              />
              {errors.correo && (
                <p className="pl-4 text-xs font-medium text-[#FF5E19]">{errors.correo.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="login-password"
                className="block text-lg md:text-xl font-normal text-[#1E1E1E]"
              >
                Contraseña
              </label>
              <input
                id="login-password"
                type="password"
                placeholder="Ingrese su contraseña"
                className="h-14 md:h-[64px] w-full rounded-[48px] border border-[#B2B2B2] bg-white px-6 text-base md:text-lg text-[#1E1E1E] placeholder:font-bold placeholder:text-[#959595] focus:border-[#3E4B8F] focus:outline-none focus:ring-2 focus:ring-[#3E4B8F]/30"
                {...register("contrasena")}
              />
              {errors.contrasena && (
                <p className="pl-4 text-xs font-medium text-[#FF5E19]">
                  {errors.contrasena.message}
                </p>
              )}
              <div className="pt-1">
                <Link
                  href="/recuperar-contrasena"
                  className="text-base md:text-lg text-[#3E4B8F] underline underline-offset-4 hover:opacity-80"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="flex h-14 md:h-[70px] w-full items-center justify-center rounded-[48px] bg-[#3E4B8F] text-xl md:text-2xl font-bold text-white hover:bg-[#323D75] transition-colors disabled:opacity-50 cursor-pointer"
            >
              {cargando ? "Cargando..." : "Comenzar"}
            </button>

            <div className="text-center space-y-1 pt-2">
              <p className="text-base md:text-lg text-[#1E1E1E]">¿Aún no tienes cuenta?</p>
              <Link
                href="/registro"
                className="inline-block text-lg md:text-xl font-bold text-[#3E4B8F] underline underline-offset-4 hover:opacity-80"
              >
                Registrate aquí.
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
