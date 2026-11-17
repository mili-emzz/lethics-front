"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Tarjeta, Badge } from "@/components/ui";
import { modulosService } from "@/services/mocks";
import { IntentoCuestionario } from "@/types";
import { formatearFechaCorta } from "@/lib/utils";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import { CheckCircle2, XCircle, TrendingUp, Filter } from "lucide-react";

export default function HistorialPage() {
  const { usuario, modulos } = useApp();

  const [intentos, setIntentos] = useState<IntentoCuestionario[]>([]);
  const [filtroModulo, setFiltroModulo] = useState<string>("todos");

  useEffect(() => {
    async function cargarHistorial() {
      if (usuario) {
        const hist = await modulosService.obtenerHistorialIntentos(usuario.id);
        setIntentos(hist);
      }
    }
    cargarHistorial();
  }, [usuario]);

  const intentosFiltrados =
    filtroModulo === "todos"
      ? intentos
      : intentos.filter((i) => i.moduloId === filtroModulo);

  const datosGrafica = [...intentosFiltrados]
    .reverse()
    .map((item, index) => ({
      intento: `#${index + 1}`,
      fecha: formatearFechaCorta(item.fecha),
      calificacion: item.calificacion
    }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* CABECERA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="indigo" size="md">
              Trazabilidad Continua
            </Badge>
            <Badge variant="dorado" size="md">
              Regla RN-04
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1E1E1E]">
            Historial de Intentos y Curva de Aprendizaje
          </h1>
          <p className="text-sm text-[#474747]">
            Consulta el registro histórico de todas tus evaluaciones y el progreso de tus calificaciones.
          </p>
        </div>

        {/* FILTRO POR MÓDULO */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#3E4B8F]" />
          <select
            value={filtroModulo}
            onChange={(e) => setFiltroModulo(e.target.value)}
            className="rounded-full border border-[#D8D8D8] bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#3E4B8F]"
          >
            <option value="todos">Todos los módulos</option>
            {modulos.map((m) => (
              <option key={m.id} value={m.id}>
                Módulo {m.numero}: {m.titulo.slice(0, 25)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* GRÁFICA DE CURVA DE APRENDIZAJE (RECHARTS) */}
      <Tarjeta className="p-6 sm:p-8 bg-white border border-[#D8D8D8] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-[#FFECC2] text-[#8c5e00] flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-[#1E1E1E]">Curva de Desempeño</h2>
          </div>
          <span className="text-xs text-[#6C6C63]">Umbral mínimo: 70%</span>
        </div>

        <div className="h-64 sm:h-72 w-full pt-4">
          {datosGrafica.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={datosGrafica}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAEAF1" />
                <XAxis dataKey="intento" stroke="#6C6C63" fontSize={12} />
                <YAxis domain={[0, 100]} stroke="#6C6C63" fontSize={12} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "0.75rem",
                    border: "1px solid #D8D8D8",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="calificacion"
                  stroke="#3E4B8F"
                  strokeWidth={3}
                  dot={{ fill: "#FFB006", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[#6C6C63]">
              No hay evaluaciones registradas con el filtro actual.
            </div>
          )}
        </div>
      </Tarjeta>

      {/* TABLA CRONOLÓGICA / TARJETAS RESPONSIVAS EN MÓVIL */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#1E1E1E]">Registro Detallado</h2>

        {intentosFiltrados.length === 0 ? (
          <Tarjeta className="p-8 text-center text-sm text-[#6C6C63] bg-white">
            No se encontraron intentos para mostrar.
          </Tarjeta>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[#D8D8D8] bg-white shadow-sm">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm text-[#1E1E1E]">
                <thead className="border-b border-[#D8D8D8] bg-[#F4F8FD] text-xs uppercase tracking-wider text-[#6C6C63]">
                  <tr>
                    <th className="px-6 py-3.5">Módulo</th>
                    <th className="px-6 py-3.5">Fecha</th>
                    <th className="px-6 py-3.5">Aciertos</th>
                    <th className="px-6 py-3.5">Calificación</th>
                    <th className="px-6 py-3.5">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D8D8D8]/60">
                  {intentosFiltrados.map((intento) => {
                    const mod = modulos.find((m) => m.id === intento.moduloId);
                    return (
                      <tr key={intento.id} className="hover:bg-[#FFF5EC]/40 transition-colors">
                        <td className="px-6 py-4 font-semibold text-[#1E1E1E]">
                          Módulo {mod ? mod.numero : "-"}: {mod?.titulo || "Evaluación"}
                        </td>
                        <td className="px-6 py-4 text-xs text-[#6C6C63]">
                          {formatearFechaCorta(intento.fecha)}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium">
                          {intento.aciertos} / {intento.totalPreguntas}
                        </td>
                        <td className="px-6 py-4 font-black text-base">
                          <span
                            className={
                              intento.aprobado ? "text-emerald-700" : "text-[#FF5E19]"
                            }
                          >
                            {intento.calificacion}%
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {intento.aprobado ? (
                            <Badge variant="verde" size="sm">
                              <CheckCircle2 className="h-3 w-3" /> Aprobado
                            </Badge>
                          ) : (
                            <Badge variant="rojo" size="sm">
                              <XCircle className="h-3 w-3" /> No acreditado
                            </Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-[#D8D8D8]">
              {intentosFiltrados.map((intento) => {
                const mod = modulos.find((m) => m.id === intento.moduloId);
                return (
                  <div key={intento.id} className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#3E4B8F]">
                        Módulo {mod?.numero || "-"}
                      </span>
                      <span className="text-xs text-[#6C6C63]">
                        {formatearFechaCorta(intento.fecha)}
                      </span>
                    </div>
                    <p className="font-semibold text-sm text-[#1E1E1E]">
                      {mod?.titulo || "Cuestionario"}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-[#6C6C63]">
                        Aciertos: {intento.aciertos}/{intento.totalPreguntas}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-black text-base ${
                            intento.aprobado ? "text-emerald-700" : "text-[#FF5E19]"
                          }`}
                        >
                          {intento.calificacion}%
                        </span>
                        {intento.aprobado ? (
                          <Badge variant="verde" size="sm">
                            Aprobado
                          </Badge>
                        ) : (
                          <Badge variant="rojo" size="sm">
                            Reprobado
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
