import {
  Usuario,
  Modulo,
  IntentoCuestionario,
  SimuladorRespuesta,
  SimuladorRetroalimentacion,
  ProyectoEntrega,
  IntentoExamenFinal,
  ExamenFinal,
  ProgresoGlobal
} from "@/types";

export interface IAuthService {
  iniciarSesion(correo: string, contrasena: string): Promise<Usuario>;
  registrarse(datos: {
    nombreCompleto: string;
    correo: string;
    contrasena: string;
    rol: string;
  }): Promise<{ usuario: Usuario; tiempoExpiracionMs: number }>;
  verificarCodigoCorreo(correo: string, codigo: string): Promise<boolean>;
  reenviarCodigoCorreo(correo: string): Promise<number>; // retorna nuevo tiempo expiracion
  recuperarContrasena(correo: string): Promise<boolean>;
  obtenerUsuarioActual(): Promise<Usuario | null>;
  cerrarSesion(): Promise<void>;
}

export interface IModulosService {
  obtenerTodos(): Promise<Modulo[]>;
  obtenerPorId(moduloId: string): Promise<Modulo | null>;
  guardarProgresoLeccion(moduloId: string, seccionIndice: number): Promise<void>;
  marcarLeccionCompletada(moduloId: string): Promise<void>;
  enviarRespuestaSimulador(
    moduloId: string,
    casoId: string,
    textoRespuesta: string
  ): Promise<SimuladorRespuesta>;
  registrarIntentoCuestionario(
    intento: Omit<IntentoCuestionario, "id" | "fecha">
  ): Promise<IntentoCuestionario>;
  obtenerHistorialIntentos(usuarioId: string): Promise<IntentoCuestionario[]>;
}

export interface ICierreService {
  entregarProyecto(
    datos: Omit<ProyectoEntrega, "id" | "fechaEntrega" | "aprobado">
  ): Promise<ProyectoEntrega>;
  obtenerEntregaProyecto(usuarioId: string): Promise<ProyectoEntrega | null>;
  obtenerExamenFinal(): Promise<ExamenFinal>;
  registrarIntentoExamenFinal(
    intento: Omit<IntentoExamenFinal, "id" | "fecha">
  ): Promise<IntentoExamenFinal>;
  obtenerHistorialExamenFinal(usuarioId: string): Promise<IntentoExamenFinal[]>;
}

export interface IProgresoService {
  obtenerProgresoGlobal(usuarioId: string): Promise<ProgresoGlobal>;
  actualizarRacha(usuarioId: string): Promise<number>;
}

export interface IIASimuladorService {
  generarRetroalimentacion(
    moduloNumero: number,
    tituloCaso: string,
    dilema: string,
    respuestaEstudiante: string
  ): Promise<SimuladorRetroalimentacion>;
}
