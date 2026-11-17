"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegistroPaso1Schema,
  RegistroPaso2Schema,
  RegistroPaso3Schema,
  RegistroCompletoFormData
} from "@/lib/validations";
import { Boton, Input, Tarjeta, Badge } from "@/components/ui";
import { authService } from "@/services/mocks";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export default function RegistroPage() {
  const router = useRouter();
  const [paso, setPaso] = useState<1 | 2 | 3>(1);
  const [cargando, setCargando] = useState(false);

  const [datosRegistro, setDatosRegistro] = useState<Partial<RegistroCompletoFormData>>({
    nombreCompleto: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
    rol: "estudiante"
  });

  const formPaso1 = useForm({
    resolver: zodResolver(RegistroPaso1Schema),
    defaultValues: { nombreCompleto: datosRegistro.nombreCompleto || "" }
  });

  const formPaso2 = useForm({
    resolver: zodResolver(RegistroPaso2Schema),
    defaultValues: { correo: datosRegistro.correo || "" }
  });

  const formPaso3 = useForm({
    resolver: zodResolver(RegistroPaso3Schema),
    defaultValues: {
      contrasena: "",
      confirmarContrasena: "",
      rol: datosRegistro.rol || "estudiante"
    }
  });

  const avanzarPaso1 = formPaso1.handleSubmit((data) => {
    setDatosRegistro((prev) => ({ ...prev, ...data }));
    setPaso(2);
  });

  const avanzarPaso2 = formPaso2.handleSubmit((data) => {
    setDatosRegistro((prev) => ({ ...prev, ...data }));
    setPaso(3);
  });

  const finalizarRegistro = formPaso3.handleSubmit(async (data) => {
    setCargando(true);
    try {
      const payloadCompleto = {
        nombreCompleto: datosRegistro.nombreCompleto || "",
        correo: datosRegistro.correo || "",
        contrasena: data.contrasena,
        rol: data.rol
      };

      await authService.registrarse(payloadCompleto);
      toast.success("Cuenta creada con éxito. Te enviamos tu código de verificación.");
      router.push(`/verificar-correo?correo=${encodeURIComponent(payloadCompleto.correo)}`);
    } catch (err: unknown) {
      const mensaje = err instanceof Error ? err.message : "Error al procesar el registro.";
      toast.error(mensaje);
    } finally {
      setCargando(false);
    }
  });

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <Tarjeta className="border border-[#D8D8D8] p-8 md:p-10 shadow-lg bg-white space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3E4B8F]">
                Paso {paso} de 3
              </span>
              <Badge variant="crema" size="sm">
                Registro Lethics
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  paso >= 1 ? "bg-[#3E4B8F]" : "bg-[#EAEAF1]"
                }`}
              />
              <div
                className={`h-2 rounded-full transition-all ${
                  paso >= 2 ? "bg-[#3E4B8F]" : "bg-[#EAEAF1]"
                }`}
              />
              <div
                className={`h-2 rounded-full transition-all ${
                  paso >= 3 ? "bg-[#3E4B8F]" : "bg-[#EAEAF1]"
                }`}
              />
            </div>
          </div>

          {paso === 1 && (
            <form onSubmit={avanzarPaso1} className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-2xl font-black text-[#1E1E1E]">¿Cómo te llamas?</h1>
                <p className="text-sm text-[#6C6C63]">
                  Utilizaremos tu nombre para personalizar tu expediente y emitir tu constancia.
                </p>
              </div>

              <Input
                etiqueta="Nombre y Apellidos"
                placeholder="Ej. Valeria Santana Morales"
                error={formPaso1.formState.errors.nombreCompleto?.message}
                {...formPaso1.register("nombreCompleto")}
              />

              <Boton type="submit" size="lg" className="w-full gap-2">
                <span>Continuar</span>
                <ArrowRight className="h-4 w-4" />
              </Boton>
            </form>
          )}

          {paso === 2 && (
            <form onSubmit={avanzarPaso2} className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-2xl font-black text-[#1E1E1E]">Tu correo de contacto</h1>
                <p className="text-sm text-[#6C6C63]">
                  Enviaremos un código de seguridad con vigencia de 5 minutos (RN-01).
                </p>
              </div>

              <Input
                etiqueta="Correo Electrónico"
                type="email"
                placeholder="ejemplo@universidad.edu"
                error={formPaso2.formState.errors.correo?.message}
                {...formPaso2.register("correo")}
              />

              <div className="flex items-center gap-3">
                <Boton
                  type="button"
                  variant="secondary"
                  onClick={() => setPaso(1)}
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Volver
                </Boton>
                <Boton type="submit" className="flex-1 gap-2">
                  <span>Siguiente</span>
                  <ArrowRight className="h-4 w-4" />
                </Boton>
              </div>
            </form>
          )}

          {paso === 3 && (
            <form onSubmit={finalizarRegistro} className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-2xl font-black text-[#1E1E1E]">Seguridad y Rol</h1>
                <p className="text-sm text-[#6C6C63]">
                  Configura tu contraseña segura y selecciona tu perfil de aprendizaje.
                </p>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block text-sm font-semibold text-[#1E1E1E]">
                  Perfil principal
                </label>
                <select
                  {...formPaso3.register("rol")}
                  className="w-full rounded-xl border border-[#D8D8D8] bg-white px-4 py-2.5 text-sm text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#3E4B8F] min-h-[44px]"
                >
                  <option value="estudiante">Estudiante de Ingeniería / Ciencias de la Computación</option>
                  <option value="profesionista">Profesionista en ejercicio / Tech Lead / Dev</option>
                  <option value="casual">Usuario casual interesado en ética y tecnología</option>
                </select>
              </div>

              <Input
                etiqueta="Contraseña"
                type="password"
                placeholder="Mínimo 8 caracteres, mayúscula y número"
                error={formPaso3.formState.errors.contrasena?.message}
                {...formPaso3.register("contrasena")}
              />

              <Input
                etiqueta="Confirmar Contraseña"
                type="password"
                placeholder="Repite tu contraseña"
                error={formPaso3.formState.errors.confirmarContrasena?.message}
                {...formPaso3.register("confirmarContrasena")}
              />

              <div className="flex items-center gap-3 pt-2">
                <Boton
                  type="button"
                  variant="secondary"
                  onClick={() => setPaso(2)}
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Volver
                </Boton>
                <Boton
                  type="submit"
                  cargando={cargando}
                  className="flex-1 gap-2"
                >
                  <span>Crear Cuenta</span>
                  <Check className="h-4 w-4" />
                </Boton>
              </div>
            </form>
          )}

          <div className="text-center text-sm text-[#474747] pt-2 border-t border-[#D8D8D8]/60">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="font-bold text-[#3E4B8F] hover:underline">
              Inicia sesión
            </Link>
          </div>
        </Tarjeta>
      </div>
    </div>
  );
}
