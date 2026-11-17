"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginFormData } from "@/lib/validations";
import { Boton, Input, Tarjeta } from "@/components/ui";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

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

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Tarjeta className="border border-[#D8D8D8] p-8 md:p-10 shadow-lg bg-white space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1E1E1E]">
              Iniciar Sesión
            </h1>
            <p className="text-sm text-[#6C6C63]">
              Accede a tu ruta de aprendizaje y continúa tu progreso
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <Input
                etiqueta="Correo Electrónico"
                type="email"
                placeholder="ejemplo@lethics.edu"
                error={errors.correo?.message}
                {...register("correo")}
              />
            </div>

            <div className="relative">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-[#1E1E1E]">Contraseña</label>
                <Link
                  href="/recuperar-contrasena"
                  className="text-xs font-semibold text-[#3E4B8F] hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                error={errors.contrasena?.message}
                {...register("contrasena")}
              />
            </div>

            <Boton
              type="submit"
              cargando={cargando}
              className="w-full mt-4 gap-2"
              size="lg"
            >
              <span>Ingresar a la plataforma</span>
              <ArrowRight className="h-4 w-4" />
            </Boton>
          </form>

          <div className="text-center text-sm text-[#474747] pt-2 border-t border-[#D8D8D8]/60">
            ¿No tienes una cuenta aún?{" "}
            <Link
              href="/registro"
              className="font-bold text-[#3E4B8F] hover:underline"
            >
              Regístrate gratis
            </Link>
          </div>
        </Tarjeta>
      </div>
    </div>
  );
}
