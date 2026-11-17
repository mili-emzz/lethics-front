import {
  Usuario,
  Modulo,
  IntentoCuestionario,
  SimuladorRespuesta,
  SimuladorRetroalimentacion,
  ProyectoEntrega,
  IntentoExamenFinal,
  ExamenFinal,
  ProgresoGlobal,
  RolUsuario
} from "@/types";
import {
  IAuthService,
  IModulosService,
  ICierreService,
  IProgresoService,
  IIASimuladorService
} from "@/services/contracts";
import {
  USUARIO_INICIAL_MOCK,
  MODULOS_SEMILLA,
  EXAMEN_FINAL_SEMILLA,
  INTENTOS_INICIALES_MOCK
} from "./seedData";
import {
  calcularEstadoModulos,
  esTokenVerificacionValido,
  calcularProgresoGlobalTotal,
  MINUTOS_EXPIRACION_VERIFICACION
} from "@/lib/rules";

const STORAGE_KEYS = {
  USUARIO: "lethics_usuario_sesion",
  MODULOS: "lethics_modulos_progreso",
  INTENTOS: "lethics_historial_intentos",
  ENTREGA_PROYECTO: "lethics_entrega_proyecto",
  INTENTOS_EXAMEN: "lethics_intentos_examen",
  TOKEN_VERIFICACION: "lethics_token_verificacion"
};

function getStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Manejo silencioso en entornos restringidos
  }
}

// ==========================================
// SERVICIO DE SIMULACIÓN DE IA (RN-06)
// ==========================================
export class MockIASimuladorService implements IIASimuladorService {
  async generarRetroalimentacion(
    moduloNumero: number,
    tituloCaso: string,
    dilema: string,
    respuestaEstudiante: string
  ): Promise<SimuladorRetroalimentacion> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const textoLimpio = respuestaEstudiante.toLowerCase();
    const mencionaInteresPublico =
      textoLimpio.includes("público") ||
      textoLimpio.includes("publico") ||
      textoLimpio.includes("vida") ||
      textoLimpio.includes("seguridad") ||
      textoLimpio.includes("paciente") ||
      textoLimpio.includes("usuario");

    const puntosFuertes: string[] = [
      "Planteamiento estructurado enfocado en las consecuencias prácticas de la decisión.",
      "Identificación clara de los actores vulnerables involucrados en el escenario."
    ];

    if (mencionaInteresPublico) {
      puntosFuertes.push("Priorización acertada del bienestar y seguridad de los usuarios sobre la premura operativa.");
    }

    const areasMejora: string[] = [
      "Puedes profundizar en la formalización de canales de escalamiento técnico y auditoría interna.",
      "Considera articular los artículos concretos de los códigos deontológicos (ACM/IEEE) aplicables."
    ];

    return {
      perspectivaEtica: `Tu razonamiento aborda el dilema del Módulo ${moduloNumero} ('${tituloCaso}') frente a: '${dilema.slice(0, 80)}...' desde una postura de impacto sistémico y responsabilidad técnica.`,
      puntosFuertes,
      areasMejora,
      reflexionFinal:
        "La verdadera integridad profesional no se demuestra cuando todo marcha en calma, sino cuando sostener el estándar ético implica resistir presiones de tiempo y presupuesto.",
      cumpleCriterios: true
    };
  }
}

// ==========================================
// SERVICIO DE AUTENTICACIÓN MOCK (RN-01)
// ==========================================
export class MockAuthService implements IAuthService {
  async iniciarSesion(correo: string, contrasena: string): Promise<Usuario> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const usuarioGuardado = getStorage<Usuario | null>(STORAGE_KEYS.USUARIO, null);

    if (usuarioGuardado && usuarioGuardado.correo.toLowerCase() === correo.toLowerCase()) {
      return usuarioGuardado;
    }

    const usuario: Usuario = {
      ...USUARIO_INICIAL_MOCK,
      correo: correo || USUARIO_INICIAL_MOCK.correo
    };
    if (contrasena.length > 0) {
      setStorage(STORAGE_KEYS.USUARIO, usuario);
    }
    return usuario;
  }

  async registrarse(datos: {
    nombreCompleto: string;
    correo: string;
    contrasena: string;
    rol: string;
  }): Promise<{ usuario: Usuario; tiempoExpiracionMs: number }> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const rolValido: RolUsuario = (["estudiante", "profesionista", "casual"].includes(datos.rol)
      ? datos.rol
      : "estudiante") as RolUsuario;

    const nuevoUsuario: Usuario = {
      id: `usr_${Date.now()}`,
      nombreCompleto: datos.nombreCompleto,
      correo: datos.correo,
      correoVerificado: false,
      rol: rolValido,
      fechaRegistro: new Date().toISOString(),
      rachaDias: 1,
      ultimaConexion: new Date().toISOString()
    };

    setStorage(STORAGE_KEYS.USUARIO, nuevoUsuario);

    const expiracion = Date.now() + MINUTOS_EXPIRACION_VERIFICACION * 60 * 1000;
    setStorage(STORAGE_KEYS.TOKEN_VERIFICACION, {
      correo: datos.correo,
      codigo: "123456",
      creadoEn: new Date().toISOString(),
      expiraEn: expiracion
    });

    return {
      usuario: nuevoUsuario,
      tiempoExpiracionMs: expiracion - Date.now()
    };
  }

  async verificarCodigoCorreo(correo: string, codigo: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const token = getStorage<{ correo: string; codigo: string; creadoEn: string } | null>(
      STORAGE_KEYS.TOKEN_VERIFICACION,
      null
    );

    if (!token) return true;

    const esValido = esTokenVerificacionValido(new Date(token.creadoEn));
    if (!esValido) {
      throw new Error("El código de verificación ha expirado (límite de 5 minutos). Solicita uno nuevo.");
    }

    if (codigo !== "123456" && token.codigo !== codigo) {
      throw new Error("El código ingresado es incorrecto.");
    }

    const usuario = getStorage<Usuario | null>(STORAGE_KEYS.USUARIO, USUARIO_INICIAL_MOCK);
    if (usuario && (!token.correo || token.correo === correo)) {
      usuario.correoVerificado = true;
      setStorage(STORAGE_KEYS.USUARIO, usuario);
    }
    return true;
  }

  async reenviarCodigoCorreo(correo: string): Promise<number> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const expiracion = Date.now() + MINUTOS_EXPIRACION_VERIFICACION * 60 * 1000;
    setStorage(STORAGE_KEYS.TOKEN_VERIFICACION, {
      correo,
      codigo: "123456",
      creadoEn: new Date().toISOString(),
      expiraEn: expiracion
    });
    return MINUTOS_EXPIRACION_VERIFICACION * 60;
  }

  async recuperarContrasena(correo: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return correo.length > 0;
  }

  async obtenerUsuarioActual(): Promise<Usuario | null> {
    return getStorage<Usuario | null>(STORAGE_KEYS.USUARIO, USUARIO_INICIAL_MOCK);
  }

  async cerrarSesion(): Promise<void> {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEYS.USUARIO);
    }
  }
}

// ==========================================
// SERVICIO DE MÓDULOS MOCK (RN-02, RN-03, RN-04)
// ==========================================
export class MockModulosService implements IModulosService {
  private iaService = new MockIASimuladorService();

  async obtenerTodos(): Promise<Modulo[]> {
    const modulosGuardados = getStorage<Modulo[]>(STORAGE_KEYS.MODULOS, MODULOS_SEMILLA);
    const modulosActualizados = calcularEstadoModulos(modulosGuardados);
    setStorage(STORAGE_KEYS.MODULOS, modulosActualizados);
    return modulosActualizados;
  }

  async obtenerPorId(moduloId: string): Promise<Modulo | null> {
    const modulos = await this.obtenerTodos();
    return modulos.find((m) => m.id === moduloId) || null;
  }

  async guardarProgresoLeccion(moduloId: string, seccionIndice: number): Promise<void> {
    const modulos = await this.obtenerTodos();
    const indice = modulos.findIndex((m) => m.id === moduloId);
    if (indice !== -1) {
      modulos[indice].leccion.ultimaSeccionGuardada = seccionIndice;
      setStorage(STORAGE_KEYS.MODULOS, modulos);
    }
  }

  async marcarLeccionCompletada(moduloId: string): Promise<void> {
    const modulos = await this.obtenerTodos();
    const indice = modulos.findIndex((m) => m.id === moduloId);
    if (indice !== -1) {
      modulos[indice].leccion.completada = true;
      setStorage(STORAGE_KEYS.MODULOS, modulos);
    }
  }

  async enviarRespuestaSimulador(
    moduloId: string,
    casoId: string,
    textoRespuesta: string
  ): Promise<SimuladorRespuesta> {
    const modulos = await this.obtenerTodos();
    const modulo = modulos.find((m) => m.id === moduloId);

    const retro = await this.iaService.generarRetroalimentacion(
      modulo ? modulo.numero : 1,
      modulo?.simulador.titulo || "Caso Ético",
      modulo?.simulador.dilema || "",
      textoRespuesta
    );

    if (modulo) {
      modulo.simuladorCompletado = true;
      const modulosRecalculados = calcularEstadoModulos(modulos);
      setStorage(STORAGE_KEYS.MODULOS, modulosRecalculados);
    }

    return {
      casoId,
      moduloId,
      textoRespuesta,
      fechaEnvio: new Date().toISOString(),
      retroalimentacionIA: retro
    };
  }

  async registrarIntentoCuestionario(
    intento: Omit<IntentoCuestionario, "id" | "fecha">
  ): Promise<IntentoCuestionario> {
    const nuevoIntento: IntentoCuestionario = {
      ...intento,
      id: `intento_${Date.now()}`,
      fecha: new Date().toISOString()
    };

    const historial = getStorage<IntentoCuestionario[]>(
      STORAGE_KEYS.INTENTOS,
      INTENTOS_INICIALES_MOCK
    );
    historial.unshift(nuevoIntento);
    setStorage(STORAGE_KEYS.INTENTOS, historial);

    const modulos = await this.obtenerTodos();
    const indice = modulos.findIndex((m) => m.id === intento.moduloId);

    if (indice !== -1) {
      const actual = modulos[indice];
      const mejorCalificacion = Math.max(
        actual.mejorCalificacionCuestionario || 0,
        intento.calificacion
      );
      actual.mejorCalificacionCuestionario = mejorCalificacion;
      if (intento.aprobado) {
        actual.cuestionarioAprobado = true;
      }
      const modulosRecalculados = calcularEstadoModulos(modulos);
      setStorage(STORAGE_KEYS.MODULOS, modulosRecalculados);
    }

    return nuevoIntento;
  }

  async obtenerHistorialIntentos(usuarioId: string): Promise<IntentoCuestionario[]> {
    const historial = getStorage<IntentoCuestionario[]>(
      STORAGE_KEYS.INTENTOS,
      INTENTOS_INICIALES_MOCK
    );
    return historial.filter((i) => !usuarioId || i.usuarioId === usuarioId || i.usuarioId === "usr_estudiante_01");
  }
}

// ==========================================
// SERVICIO DE CIERRE MOCK (RN-05)
// ==========================================
export class MockCierreService implements ICierreService {
  async entregarProyecto(
    datos: Omit<ProyectoEntrega, "id" | "fechaEntrega" | "aprobado">
  ): Promise<ProyectoEntrega> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const entrega: ProyectoEntrega = {
      ...datos,
      id: `proy_${Date.now()}`,
      fechaEntrega: new Date().toISOString(),
      aprobado: true,
      retroalimentacion:
        "Proyecto validado con éxito. El análisis de impacto, la matriz de riesgos éticos y el inventario de dependencias cumplen con las directrices de la rúbrica de Lethics."
    };
    setStorage(STORAGE_KEYS.ENTREGA_PROYECTO, entrega);
    return entrega;
  }

  async obtenerEntregaProyecto(usuarioId: string): Promise<ProyectoEntrega | null> {
    const entrega = getStorage<ProyectoEntrega | null>(STORAGE_KEYS.ENTREGA_PROYECTO, null);
    if (!entrega || entrega.usuarioId === usuarioId) return entrega;
    return entrega;
  }

  async obtenerExamenFinal(): Promise<ExamenFinal> {
    return EXAMEN_FINAL_SEMILLA;
  }

  async registrarIntentoExamenFinal(
    intento: Omit<IntentoExamenFinal, "id" | "fecha">
  ): Promise<IntentoExamenFinal> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const nuevoIntento: IntentoExamenFinal = {
      ...intento,
      id: `examen_intento_${Date.now()}`,
      fecha: new Date().toISOString()
    };
    const historial = getStorage<IntentoExamenFinal[]>(STORAGE_KEYS.INTENTOS_EXAMEN, []);
    historial.unshift(nuevoIntento);
    setStorage(STORAGE_KEYS.INTENTOS_EXAMEN, historial);
    return nuevoIntento;
  }

  async obtenerHistorialExamenFinal(usuarioId: string): Promise<IntentoExamenFinal[]> {
    const historial = getStorage<IntentoExamenFinal[]>(STORAGE_KEYS.INTENTOS_EXAMEN, []);
    return historial.filter((i) => !usuarioId || i.usuarioId === usuarioId || i.usuarioId === "usr_estudiante_01");
  }
}

// ==========================================
// SERVICIO DE PROGRESO GLOBAL
// ==========================================
export class MockProgresoService implements IProgresoService {
  private modulosService = new MockModulosService();
  private cierreService = new MockCierreService();

  async obtenerProgresoGlobal(usuarioId: string): Promise<ProgresoGlobal> {
    const modulos = await this.modulosService.obtenerTodos();
    const entrega = await this.cierreService.obtenerEntregaProyecto(usuarioId);
    const intentosExamen = await this.cierreService.obtenerHistorialExamenFinal(usuarioId);
    const examenAprobado = intentosExamen.some((i) => i.aprobado);

    const completados = modulos.filter(
      (m) => m.cuestionarioAprobado && m.simuladorCompletado
    ).length;

    const porcentaje = calcularProgresoGlobalTotal(
      modulos,
      Boolean(entrega),
      examenAprobado
    );

    const usuario = getStorage<Usuario | null>(STORAGE_KEYS.USUARIO, USUARIO_INICIAL_MOCK);

    return {
      porcentajeCompletado: porcentaje,
      modulosCompletados: completados,
      totalModulos: modulos.length,
      todosModulosCompletados: completados === modulos.length,
      proyectoEntregado: Boolean(entrega),
      examenFinalAprobado: examenAprobado,
      rachaDias: usuario?.rachaDias || 4
    };
  }

  async actualizarRacha(usuarioId: string): Promise<number> {
    const usuario = getStorage<Usuario | null>(STORAGE_KEYS.USUARIO, USUARIO_INICIAL_MOCK);
    if (!usuario || (usuarioId && usuario.id !== usuarioId)) return 1;
    usuario.rachaDias += 1;
    usuario.ultimaConexion = new Date().toISOString();
    setStorage(STORAGE_KEYS.USUARIO, usuario);
    return usuario.rachaDias;
  }
}

export const authService = new MockAuthService();
export const modulosService = new MockModulosService();
export const cierreService = new MockCierreService();
export const progresoService = new MockProgresoService();
export const iaSimuladorService = new MockIASimuladorService();
