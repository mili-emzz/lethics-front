import { Modulo, EstadoModulo, SimuladorRetroalimentacion } from "@/types";

/**
 * RN-01: Verificación de correo en 5 minutos (300,000 ms).
 * Valida si el token o enlace de verificación aún se encuentra en su ventana válida.
 */
export const MINUTOS_EXPIRACION_VERIFICACION = 5;
export const MILISEGUNDOS_EXPIRACION_VERIFICACION = MINUTOS_EXPIRACION_VERIFICACION * 60 * 1000;

export function esTokenVerificacionValido(fechaCreacion: Date, ahora: Date = new Date()): boolean {
  const diferenciaMs = ahora.getTime() - fechaCreacion.getTime();
  return diferenciaMs >= 0 && diferenciaMs <= MILISEGUNDOS_EXPIRACION_VERIFICACION;
}

export function calcularSegundosRestantes(fechaCreacion: Date, ahora: Date = new Date()): number {
  const diferenciaMs = ahora.getTime() - fechaCreacion.getTime();
  const restantesMs = MILISEGUNDOS_EXPIRACION_VERIFICACION - diferenciaMs;
  return restantesMs > 0 ? Math.floor(restantesMs / 1000) : 0;
}

/**
 * RN-03: Umbral mínimo aprobatorio del 70%.
 */
export const UMBRAL_CALIFICACION_APROBATORIA = 70;

export function esCalificacionAprobatoria(calificacion: number): boolean {
  return calificacion >= UMBRAL_CALIFICACION_APROBATORIA;
}

export function calcularPorcentajeAciertos(aciertos: number, totalPreguntas: number): number {
  if (totalPreguntas <= 0) return 0;
  return Math.round((aciertos / totalPreguntas) * 100);
}

/**
 * RN-02: Candados secuenciales de módulos.
 * Un módulo (N) está desbloqueado si es el Módulo 1 o si el Módulo (N-1)
 * tiene su cuestionario aprobado (>= 70%) y su simulador completado.
 */
export function validarAccesoModulo(
  moduloActual: Modulo,
  moduloAnterior?: Modulo | null
): { puedeAcceder: boolean; motivoBloqueo?: string } {
  if (moduloActual.numero === 1) {
    return { puedeAcceder: true };
  }

  if (!moduloAnterior) {
    return {
      puedeAcceder: false,
      motivoBloqueo: "No se encontró el módulo anterior necesario."
    };
  }

  const anteriorCuestionarioAprobado =
    moduloAnterior.cuestionarioAprobado ||
    (moduloAnterior.mejorCalificacionCuestionario !== undefined &&
      moduloAnterior.mejorCalificacionCuestionario >= UMBRAL_CALIFICACION_APROBATORIA);

  if (!anteriorCuestionarioAprobado) {
    return {
      puedeAcceder: false,
      motivoBloqueo: `Debes aprobar el cuestionario del Módulo ${moduloAnterior.numero} con mínimo ${UMBRAL_CALIFICACION_APROBATORIA}%.`
    };
  }

  if (!moduloAnterior.simuladorCompletado) {
    return {
      puedeAcceder: false,
      motivoBloqueo: `Debes completar el simulador ético del Módulo ${moduloAnterior.numero}.`
    };
  }

  return { puedeAcceder: true };
}

/**
 * Calcula el estado de cada módulo de acuerdo a las reglas secuenciales.
 */
export function calcularEstadoModulos(modulos: Modulo[]): Modulo[] {
  const modulosOrdenados = [...modulos].sort((a, b) => a.numero - b.numero);

  return modulosOrdenados.map((modulo, index) => {
    if (index === 0) {
      if (modulo.cuestionarioAprobado && modulo.simuladorCompletado) {
        return { ...modulo, estado: "completado" as EstadoModulo };
      }
      return {
        ...modulo,
        estado: (modulo.estado === "bloqueado" ? "en_progreso" : modulo.estado) as EstadoModulo
      };
    }

    const moduloAnterior = modulosOrdenados[index - 1];
    const acceso = validarAccesoModulo(modulo, moduloAnterior);

    if (!acceso.puedeAcceder) {
      return { ...modulo, estado: "bloqueado" as EstadoModulo };
    }

    if (modulo.cuestionarioAprobado && modulo.simuladorCompletado) {
      return { ...modulo, estado: "completado" as EstadoModulo };
    }

    return {
      ...modulo,
      estado: (modulo.estado === "bloqueado" ? "pendiente" : modulo.estado) as EstadoModulo
    };
  });
}

/**
 * RN-05: El proyecto y examen final se desbloquean solo con el 100% de los 5 módulos concluidos.
 * El examen final requiere además que el proyecto haya sido entregado.
 */
export function validarDesbloqueoCierre(
  modulos: Modulo[],
  proyectoEntregado: boolean
): {
  puedeEntregarProyecto: boolean;
  puedeRealizarExamen: boolean;
  motivoBloqueoProyecto?: string;
  motivoBloqueoExamen?: string;
} {
  const todosModulosAprobados =
    modulos.length === 5 &&
    modulos.every((m) => m.cuestionarioAprobado && m.simuladorCompletado);

  if (!todosModulosAprobados) {
    const incompletos = modulos.filter(
      (m) => !m.cuestionarioAprobado || !m.simuladorCompletado
    );
    const mensaje = `Debes completar los 5 módulos (quedan ${incompletos.length} pendientes).`;
    return {
      puedeEntregarProyecto: false,
      puedeRealizarExamen: false,
      motivoBloqueoProyecto: mensaje,
      motivoBloqueoExamen: mensaje
    };
  }

  if (!proyectoEntregado) {
    return {
      puedeEntregarProyecto: true,
      puedeRealizarExamen: false,
      motivoBloqueoExamen: "Debes entregar el proyecto final antes de presentar el examen."
    };
  }

  return {
    puedeEntregarProyecto: true,
    puedeRealizarExamen: true
  };
}

/**
 * RN-06: Retroalimentación cualitativa de IA.
 * La IA en simuladores solo evalúa razonamiento ético, marcos normativos y consecuencias;
 * nunca asigna calificaciones numéricas directas.
 */
export function validarEstructuraRetroalimentacionIA(
  retro: SimuladorRetroalimentacion
): boolean {
  return (
    typeof retro.perspectivaEtica === "string" &&
    retro.perspectivaEtica.trim().length > 0 &&
    Array.isArray(retro.puntosFuertes) &&
    retro.puntosFuertes.length > 0 &&
    Array.isArray(retro.areasMejora) &&
    typeof retro.reflexionFinal === "string" &&
    typeof retro.cumpleCriterios === "boolean"
  );
}

/**
 * Cálculo del porcentaje de progreso global del curso.
 * 5 módulos equivalen al 80% (16% cada uno), el proyecto final 10% y el examen 10%.
 */
export function calcularProgresoGlobalTotal(
  modulos: Modulo[],
  proyectoEntregado: boolean,
  examenAprobado: boolean
): number {
  if (!modulos || modulos.length === 0) return 0;

  const totalModulos = modulos.length;
  let puntosModulos = 0;

  modulos.forEach((m) => {
    let puntos = 0;
    if (m.leccion?.completada) puntos += 0.3;
    if (m.simuladorCompletado) puntos += 0.35;
    if (m.cuestionarioAprobado) puntos += 0.35;
    puntosModulos += puntos;
  });

  const porcentajeModulos = (puntosModulos / totalModulos) * 80;
  const porcentajeProyecto = proyectoEntregado ? 10 : 0;
  const porcentajeExamen = examenAprobado ? 10 : 0;

  return Math.min(100, Math.round(porcentajeModulos + porcentajeProyecto + porcentajeExamen));
}
