"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ArrowRight, LogOut } from "lucide-react";
import { toast } from "sonner";

export default function PerfilPage() {
  const router = useRouter();
  const { usuario, cerrarSesionUsuario } = useApp();

  const [nombre, setNombre] = useState(usuario?.nombreCompleto || "Ana María López Mendoza");
  const [correo, setCorreo] = useState(usuario?.correo || "ejemplo@gmail.com");
  const [contrasena, setContrasena] = useState("••••••••••••••••");
  const [guardando, setGuardando] = useState(false);

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    await new Promise((r) => setTimeout(r, 350));
    setGuardando(false);
    toast.success("Cambios de perfil guardados correctamente.");
  };

  const handleSalir = async () => {
    await cerrarSesionUsuario();
    toast.info("Sesión cerrada.");
    router.push("/login");
  };

  return (
    <div className="mx-auto max-w-[1601px] px-4 py-6 md:px-8 md:py-8">
      {/* Tarjeta blanca principal fiel a Figma (185:1672) */}
      <section className="mx-auto flex min-h-[640px] flex-col items-center justify-center rounded-[24px] border border-[#808080] bg-white p-6 md:p-12">
        <div className="w-full max-w-[450px] space-y-8">
          <h1 className="text-center text-3xl md:text-[44px] font-extrabold text-[#3E4B8F]">
            Editar Perfil
          </h1>

          <form onSubmit={handleGuardar} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="perfil-nombre"
                className="block text-lg md:text-xl font-bold text-[#1E1E1E]"
              >
                Nombre completo
              </label>
              <input
                id="perfil-nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="h-14 md:h-[66px] w-full rounded-[48px] border border-[#B2B2B2] bg-white px-6 text-base md:text-lg text-black focus:border-[#3E4B8F] focus:outline-none focus:ring-2 focus:ring-[#3E4B8F]/30"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="perfil-correo"
                className="block text-lg md:text-xl font-bold text-[#1E1E1E]"
              >
                Correo electrónico
              </label>
              <input
                id="perfil-correo"
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="h-14 md:h-[66px] w-full rounded-[48px] border border-[#B2B2B2] bg-white px-6 text-base md:text-lg text-black focus:border-[#3E4B8F] focus:outline-none focus:ring-2 focus:ring-[#3E4B8F]/30"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="perfil-pass"
                className="block text-lg md:text-xl font-bold text-[#1E1E1E]"
              >
                Contraseña
              </label>
              <input
                id="perfil-pass"
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="h-14 md:h-[66px] w-full rounded-[48px] border border-[#B2B2B2] bg-white px-6 text-base md:text-lg text-[#1E1E1E] focus:border-[#3E4B8F] focus:outline-none focus:ring-2 focus:ring-[#3E4B8F]/30"
              />
            </div>

            <div className="pt-2 space-y-4">
              <button
                type="submit"
                disabled={guardando}
                className="flex h-14 md:h-[68px] w-full items-center justify-center gap-4 rounded-[48px] bg-[#3E4B8F] text-xl md:text-2xl font-bold text-white hover:bg-[#323D75] transition-colors disabled:opacity-50 cursor-pointer"
              >
                <span>{guardando ? "Guardando..." : "Guardar cambios"}</span>
                <ArrowRight className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={handleSalir}
                className="flex w-full items-center justify-center gap-2 py-2 text-sm font-bold text-[#6C6C63] hover:text-[#FF5E19] transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
