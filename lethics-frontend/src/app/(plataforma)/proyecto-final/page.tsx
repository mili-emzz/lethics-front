"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProyectoEntregaSchema, ProyectoEntregaFormData } from "@/lib/validations";
import { useApp } from "@/context/AppContext";
import { Tarjeta, Boton, Badge, Input } from "@/components/ui";
import { cierreService } from "@/services/mocks";
import { ProyectoEntrega } from "@/types";
import {
  UploadCloud,
  FileCheck2,
  Lock,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";

export default function ProyectoFinalPage() {
  const { progreso, usuario, recargarProgreso } = useApp();

  const [entrega, setEntrega] = useState<ProyectoEntrega | null>(null);
  const [cargando, setCargando] = useState(false);
  const [nombreArchivo, setNombreArchivo] = useState<string>("");

  const puedeAcceder = progreso.todosModulosCompletados;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ProyectoEntregaFormData>({
    resolver: zodResolver(ProyectoEntregaSchema),
    defaultValues: {
      titulo: "",
      descripcion: "",
      enlaceRepositorio: ""
    }
  });

  useEffect(() => {
    async function cargarEntrega() {
      if (usuario) {
        const existente = await cierreService.obtenerEntregaProyecto(usuario.id);
        if (existente) setEntrega(existente);
      }
    }
    cargarEntrega();
  }, [usuario]);

  const handleSimularArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNombreArchivo(file.name);
      setValue("archivoNombre", file.name);
      toast.info(`Archivo '${file.name}' adjuntado.`);
    }
  };

  const onSubmit = async (data: ProyectoEntregaFormData) => {
    if (!usuario) return;
    setCargando(true);
    try {
      const entregaRealizada = await cierreService.entregarProyecto({
        usuarioId: usuario.id,
        titulo: data.titulo,
        descripcion: data.descripcion,
        enlaceRepositorio: data.enlaceRepositorio || undefined,
        nombreArchivo: nombreArchivo || undefined,
        tamanoArchivoBytes: 1024 * 1024 * 2
      });
      setEntrega(entregaRealizada);
      await recargarProgreso();
      toast.success("¡Proyecto entregado con éxito! El Examen Final está habilitado (RN-05).");
    } catch {
      toast.error("Error al procesar la entrega.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* CABECERA */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="indigo" size="md">
            Cierre Práctico
          </Badge>
          <Badge variant="dorado" size="md">
            Regla RN-05
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#1E1E1E]">
          Proyecto Final Integrador
        </h1>
        <p className="text-sm sm:text-base text-[#474747] leading-relaxed">
          Diseña una auditoría ética y plan de remediación técnica para un sistema de software
          crítico aplicando los principios estudiados en los 5 módulos.
        </p>
      </div>

      {/* BLOQUEO SI NO ESTÁN LOS 5 MÓDULOS (RN-05) */}
      {!puedeAcceder ? (
        <Tarjeta fondoSuave="rosa" className="p-8 text-center space-y-4 border-2 border-[#FF5E19]/30">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#FF5E19] shadow-sm">
            <Lock className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#1E1E1E]">
              Proyecto Bloqueado por Requisitos Previos
            </h2>
            <p className="text-sm text-[#474747] max-w-md mx-auto">
              Por regla de acreditación (RN-05), debes haber aprobado el cuestionario y resuelto el
              simulador de los 5 módulos formativos.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/dashboard">
              <Boton variant="primary">Continuar con los módulos pendientes</Boton>
            </Link>
          </div>
        </Tarjeta>
      ) : entrega ? (
        <Tarjeta fondoSuave="menta" className="p-8 sm:p-10 border-2 border-emerald-300 space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                <FileCheck2 className="h-6 w-6" />
              </div>
              <div>
                <Badge variant="verde" size="sm">
                  Entrega Acreditada
                </Badge>
                <h2 className="text-2xl font-black text-[#1E1E1E] mt-1">
                  {entrega.titulo}
                </h2>
              </div>
            </div>
            <span className="text-xs text-[#6C6C63]">
              {new Date(entrega.fechaEntrega).toLocaleDateString("es-MX")}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#D8D8D8]/70 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3E4B8F]">
              Justificación y Memoria Técnica
            </h4>
            <p className="text-sm text-[#474747] leading-relaxed whitespace-pre-line">
              {entrega.descripcion}
            </p>
            {entrega.enlaceRepositorio && (
              <div className="pt-2">
                <a
                  href={entrega.enlaceRepositorio}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3E4B8F] hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>{entrega.enlaceRepositorio}</span>
                </a>
              </div>
            )}
          </div>

          {entrega.retroalimentacion && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-900 space-y-1">
              <strong>Dictamen de Aprobación: </strong>
              <span>{entrega.retroalimentacion}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <Link href="/examen-final">
              <Boton size="lg" className="gap-2 bg-emerald-700 hover:bg-emerald-800">
                <span>Presentar Examen Final</span>
                <ArrowRight className="h-4 w-4" />
              </Boton>
            </Link>
          </div>
        </Tarjeta>
      ) : (
        <Tarjeta className="p-6 sm:p-10 bg-white border border-[#D8D8D8] space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              etiqueta="Título del Proyecto"
              placeholder="Ej. Auditoría Ética y Remediación en Algoritmo de Otorgamiento Crediticio"
              error={errors.titulo?.message}
              {...register("titulo")}
            />

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-[#1E1E1E]">
                Memoria Técnica y Justificación Ética
              </label>
              <textarea
                rows={5}
                placeholder="Describe el sistema auditado, los dilemas detectados (privacidad, sesgos, licencias o seguridad) y las salvaguardas implementadas..."
                className="w-full rounded-2xl border border-[#D8D8D8] p-4 text-sm text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#3E4B8F] placeholder:text-[#959595]"
                {...register("descripcion")}
              />
              {errors.descripcion && (
                <p className="text-xs font-medium text-[#FF5E19]">
                  {errors.descripcion.message}
                </p>
              )}
            </div>

            <Input
              etiqueta="Enlace al Repositorio (GitHub, GitLab, etc.)"
              placeholder="https://github.com/usuario/auditoria-etica-software"
              error={errors.enlaceRepositorio?.message}
              {...register("enlaceRepositorio")}
            />

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-[#1E1E1E]">
                Adjuntar Memoria o Archivo ZIP (Opcional si diste repo)
              </label>
              <div className="border-2 border-dashed border-[#D8D8D8] hover:border-[#3E4B8F] rounded-2xl p-6 text-center bg-[#F4F8FD]/40 transition-colors">
                <UploadCloud className="h-8 w-8 text-[#3E4B8F] mx-auto mb-2" />
                <p className="text-xs text-[#474747]">
                  {nombreArchivo ? (
                    <span className="font-bold text-emerald-700">Archivo: {nombreArchivo}</span>
                  ) : (
                    "Arrastra tu archivo aquí o haz clic para explorar (PDF o ZIP hasta 15MB)"
                  )}
                </p>
                <input
                  type="file"
                  accept=".pdf,.zip"
                  onChange={handleSimularArchivo}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="mt-3 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#3E4B8F] border border-[#3E4B8F] hover:bg-[#EAEAF1] cursor-pointer"
                >
                  Seleccionar archivo
                </label>
              </div>
            </div>

            <Boton
              type="submit"
              cargando={cargando}
              size="lg"
              className="w-full gap-2 shadow-md"
            >
              <UploadCloud className="h-4 w-4" />
              <span>Enviar Proyecto para Dictamen</span>
            </Boton>
          </form>
        </Tarjeta>
      )}
    </div>
  );
}
