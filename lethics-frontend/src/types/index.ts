export type RolUsuario = "estudiante" | "profesionista" | "casual" | "administrador";

export interface Usuario {
  id: string;
  nombreCompleto: string;
  correo: string;
  correoVerificado: boolean;
  rol: RolUsuario;
  avatarUrl?: string;
  fechaRegistro: string;
  rachaDias: number;
  ultimaConexion: string;
}

export type EstadoModulo = "bloqueado" | "pendiente" | "en_progreso" | "completado";

export interface SeccionContenido {
  id: string;
  titulo: string;
  contenido: string;
  orden: number;
}

export interface Leccion {
  id: string;
  moduloId: string;
  titulo: string;
  descripcion: string;
  duracionEstimadaMinutos: number;
  secciones: SeccionContenido[];
  completada: boolean;
  ultimaSeccionGuardada?: number;
}

export interface Flashcard {
  id: string;
  moduloId: string;
  pregunta: string;
  respuesta: string;
  categoria: string;
}

export interface SimuladorCaso {
  id: string;
  moduloId: string;
  titulo: string;
  dilema: string;
  contexto: string;
  rolesInvolucrados: string[];
  preguntasGuia: string[];
}

export interface SimuladorRespuesta {
  casoId: string;
  moduloId: string;
  textoRespuesta: string;
  fechaEnvio: string;
  retroalimentacionIA: SimuladorRetroalimentacion;
}

export interface SimuladorRetroalimentacion {
  perspectivaEtica: string;
  puntosFuertes: string[];
  areasMejora: string[];
  reflexionFinal: string;
  cumpleCriterios: boolean;
}

export interface OpcionPregunta {
  id: string;
  texto: string;
}

export interface Pregunta {
  id: string;
  cuestionarioId: string;
  enunciado: string;
  opciones: OpcionPregunta[];
  opcionCorrectaId: string;
  explicacion: string;
}

export interface Cuestionario {
  id: string;
  moduloId: string;
  titulo: string;
  descripcion: string;
  preguntas: Pregunta[];
  calificacionMinimaAprobatoria: number; // Por regla RN-03: 70
}

export interface IntentoCuestionario {
  id: string;
  cuestionarioId: string;
  moduloId: string;
  usuarioId: string;
  calificacion: number; // 0 a 100
  aprobado: boolean;
  respuestasUsuario: Record<string, string>; // preguntaId -> opcionSeleccionadaId
  fecha: string;
  totalPreguntas: number;
  aciertos: number;
}

export interface Modulo {
  id: string;
  numero: number;
  titulo: string;
  descripcion: string;
  objetivos: string[];
  planEstudio: string[];
  duracionHoras: number;
  estado: EstadoModulo;
  leccion: Leccion;
  flashcards: Flashcard[];
  simulador: SimuladorCaso;
  cuestionario: Cuestionario;
  simuladorCompletado: boolean;
  cuestionarioAprobado: boolean;
  mejorCalificacionCuestionario?: number;
}

export interface ProyectoEntrega {
  id: string;
  usuarioId: string;
  titulo: string;
  descripcion: string;
  enlaceRepositorio?: string;
  nombreArchivo?: string;
  tamanoArchivoBytes?: number;
  fechaEntrega: string;
  aprobado: boolean;
  retroalimentacion?: string;
}

export interface ExamenFinalPregunta {
  id: string;
  enunciado: string;
  moduloOrigenNumero: number;
  opciones: OpcionPregunta[];
  opcionCorrectaId: string;
  explicacion: string;
}

export interface ExamenFinal {
  id: string;
  titulo: string;
  descripcion: string;
  preguntas: ExamenFinalPregunta[];
  calificacionMinimaAprobatoria: number; // 70
}

export interface IntentoExamenFinal {
  id: string;
  usuarioId: string;
  calificacion: number;
  aprobado: boolean;
  respuestasUsuario: Record<string, string>;
  fecha: string;
  totalPreguntas: number;
  aciertos: number;
}

export interface ProgresoGlobal {
  porcentajeCompletado: number; // 0 a 100
  modulosCompletados: number;
  totalModulos: number;
  todosModulosCompletados: boolean;
  proyectoEntregado: boolean;
  examenFinalAprobado: boolean;
  rachaDias: number;
}
