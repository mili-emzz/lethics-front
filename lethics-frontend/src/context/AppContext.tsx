"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Usuario, Modulo, ProgresoGlobal } from "@/types";
import { authService, modulosService, progresoService } from "@/services/mocks";

interface AppContextType {
  usuario: Usuario | null;
  modulos: Modulo[];
  progreso: ProgresoGlobal;
  cargando: boolean;
  recargarProgreso: () => Promise<void>;
  iniciarSesionUsuario: (correo: string, contrasena: string) => Promise<Usuario>;
  cerrarSesionUsuario: () => Promise<void>;
  incrementarRacha: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const PROGRESO_DEFECTO: ProgresoGlobal = {
  porcentajeCompletado: 0,
  modulosCompletados: 0,
  totalModulos: 5,
  todosModulosCompletados: false,
  proyectoEntregado: false,
  examenFinalAprobado: false,
  rachaDias: 4
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [progreso, setProgreso] = useState<ProgresoGlobal>(PROGRESO_DEFECTO);
  const [cargando, setCargando] = useState(true);

  const recargarProgreso = useCallback(async () => {
    try {
      const u = await authService.obtenerUsuarioActual();
      setUsuario(u);

      const m = await modulosService.obtenerTodos();
      setModulos(m);

      if (u) {
        const p = await progresoService.obtenerProgresoGlobal(u.id);
        setProgreso(p);
      }
    } catch {
      // Manejo silencioso en carga
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    let activo = true;
    async function inicializar() {
      try {
        const u = await authService.obtenerUsuarioActual();
        if (!activo) return;
        setUsuario(u);

        const m = await modulosService.obtenerTodos();
        if (!activo) return;
        setModulos(m);

        if (u) {
          const p = await progresoService.obtenerProgresoGlobal(u.id);
          if (!activo) return;
          setProgreso(p);
        }
      } catch {
        // Ignorar
      } finally {
        if (activo) setCargando(false);
      }
    }
    inicializar();
    return () => {
      activo = false;
    };
  }, []);

  const iniciarSesionUsuario = async (correo: string, contrasena: string) => {
    const u = await authService.iniciarSesion(correo, contrasena);
    setUsuario(u);
    await recargarProgreso();
    return u;
  };

  const cerrarSesionUsuario = async () => {
    await authService.cerrarSesion();
    setUsuario(null);
    await recargarProgreso();
  };

  const incrementarRacha = async () => {
    if (!usuario) return;
    const nuevaRacha = await progresoService.actualizarRacha(usuario.id);
    setUsuario((prev) => (prev ? { ...prev, rachaDias: nuevaRacha } : null));
    setProgreso((prev) => ({ ...prev, rachaDias: nuevaRacha }));
  };

  return (
    <AppContext.Provider
      value={{
        usuario,
        modulos,
        progreso,
        cargando,
        recargarProgreso,
        iniciarSesionUsuario,
        cerrarSesionUsuario,
        incrementarRacha
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp debe utilizarse dentro de un AppProvider");
  }
  return context;
}
