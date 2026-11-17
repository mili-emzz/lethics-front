# Guía de Desarrollo y Reglas de Agente (Lethics)

## Resumen del Proyecto
Lethics es una aplicación web educativa para el aprendizaje autodidacta sobre ética, principios, leyes y normas que rigen el desarrollo de software. Está dirigida a estudiantes, profesionistas (17+ años) y usuarios casuales, estructurada en 5 módulos secuenciales con simuladores éticos, flashcards, cuestionarios y un cierre práctico con proyecto y examen final.

## Comandos Exactos
Ejecutar desde el directorio del proyecto `lethics-frontend`:

Instalar dependencias:
cd lethics-frontend; npm install

Iniciar servidor de desarrollo:
cd lethics-frontend; npm run dev

Compilar para producción:
cd lethics-frontend; npm run build

Ejecutar linter:
cd lethics-frontend; npm run lint

## Stack y Versiones
Lenguaje: TypeScript 5
Framework: Next.js 16.4.5 (App Router)
Librería UI: React 19.3.0
Estilos: Tailwind CSS v4
Formularios y validación: React Hook Form 7 + Zod 4 (para esquemas de datos y validaciones estrictas)
Animaciones: Framer Motion 14 (giro de flashcards y transiciones respetando accesibilidad)
Visualización de datos: Recharts 3 (curva de aprendizaje en historial)
Iconos y notificaciones: Lucide React + Sonner

## Estructura del Repositorio
docs/ : Documentación viva, registro de decisiones y progreso (`resumen_lethics.json`).
.agents/rules/ : Reglas modulares del proyecto y estándares operativos.
lethics-frontend/src/app/ : Rutas y layouts agrupados en `(auth)` y `(plataforma)`.
lethics-frontend/src/components/ : Componentes modulares por dominio (`ui`, `layout`, `auth`, `dashboard`, `modulos`, `cierre`, `historial`).
lethics-frontend/src/services/ : Capa de datos desacoplada (`contracts/`, `mocks/`, `api/`).
lethics-frontend/src/lib/ : Lógica pura de negocio en `rules/`, esquemas Zod en `validations/` y utilidades en `utils/`.
lethics-frontend/src/types/ : Modelos de dominio y contratos TypeScript.

## Convenciones de Código
Usa nombres descriptivos en español para entidades y reglas de dominio (ej. `Modulo`, `IntentoCuestionario`, `validarAccesoModulo`).
Usa tipado estricto en TypeScript; no uses `any`.
Usa funciones puras para reglas de negocio en `lib/rules/`; no mezcles lógica de aprobación o candados dentro de componentes visuales.
Maneja errores con mensajes claros y orientados al usuario final, nunca muestres errores técnicos crudos.

## Reglas de Arquitectura
El frontend nunca llama a la API de IA ni a endpoints externos directamente desde componentes; pasa siempre por la capa `services/`.
Los componentes consumen datos mediante contratos en `services/contracts/`; no importes datos falsos o mocks directamente en vistas.
Aísla las reglas de negocio en `src/lib/rules/`; las vistas solo muestran estado y despachan eventos.
Next.js 16 reemplazó `middleware.ts` por `proxy.ts`; no crees middlewares obsoletos.

## Reglas de Dominio y Negocio
RN-01: Acceso exclusivo a usuarios autenticados con correo verificado (enlace de un solo uso con vigencia de 5 minutos).
RN-02: Secuencialidad obligatoria; un módulo requiere tener aprobado el cuestionario y realizado el simulador anterior.
RN-03: Calificación mínima aprobatoria del 70% en cuestionarios y examen final.
RN-04: Intentos ilimitados en cuestionarios teóricos; cada intento se registra en el historial.
RN-05: El proyecto y examen final se desbloquean solo con el 100% de los 5 módulos concluidos (y proyecto entregado para habilitar el examen).
RN-06: La IA en simuladores solo provee retroalimentación cualitativa; nunca asigna una calificación numérica directa.
RN-07: Material didáctico en modo solo lectura para usuarios.

## Pruebas y Verificación
Verifica siempre:
Flujo de registro y temporizador de 5 minutos de verificación de correo.
Cálculo de desbloqueo de módulos y candados secuenciales (`RN-02`).
Lógica de evaluación de cuestionarios (umbral del 70% y guardado de intentos).
Autoguardado y reanudación de lecciones desde la sección exacta.

## Seguridad, Privacidad y Protección de .env
Protege de forma estricta los archivos `.env`, `.env.local` y variables de entorno; nunca los commitees ni expongas.
Nunca incluyas API keys o secretos en el código del cliente.
Sanitiza y formatea cualquier texto recibido de modelos de IA antes de renderizarlo.
Anonimiza cualquier dato usado para métricas o analíticas.
Valida el tipo, tamaño y formato de archivos en la subida del proyecto final con Zod.

## Flujo de Trabajo (Git, Bloques y Commits)
Desarrolla en la rama temática designada para la tarea (`feature/nombre-tarea` o `fix/nombre-bug`).
Efectúa un commit por cada bloque funcional terminado y verificado.
Escribe mensajes de commit en imperativo citando el requerimiento o regla implementada:
Ejemplo: `feat(cuestionario): validar calificacion minima del 70% (RN-03)`
Realiza el push a la rama remota al concluir cada bloque funcional probado.

## Límites en Tres Niveles
Siempre:
Actualiza obligatoriamente `docs/resumen_lethics.json` tras cada implementación o avance.
Consulta la documentación interna de Next.js en `node_modules/next/dist/docs/` ante cambios de API.
Mantén comunicación fluida sin líneas divisorias horizontales (`---`).

Preguntar antes:
Modificar o agregar paquetes en `package.json`.
Modificar contratos en `services/contracts/` o esquemas de base de datos.
Cualquier acción en la carpeta `public/`.

Nunca:
Agregar, editar o eliminar archivos en `public/` sin autorización explícita de la usuaria.
Hacer commit de secretos, variables `.env`, tokens o credenciales.
Saltarse la validación de compilación o linter antes de dar por cerrada una tarea.

## Definición de "Terminado"
Una tarea se considera terminada cuando:
Cumple el requerimiento funcional (RF) y regla de negocio (RN) especificados.
Pasa la compilación con `npm run build` y el linter con `npm run lint` sin errores.
Las animaciones respetan `prefers-reduced-motion`.
El bloque cuenta con su commit citando el RF/RN y push a la rama de trabajo.
El archivo `docs/resumen_lethics.json` está actualizado con el estado actual y siguiente paso.

## Trampas Conocidas
Flashcards: Deben respetar `prefers-reduced-motion` para usuarios con sensibilidad al movimiento.
Desacoplamiento: No asumas que hay un backend activo; programa siempre contra contratos y mocks.
Next.js 16: APIs asíncronas para `params` y `searchParams` en componentes de servidor.

## Referencias y Reglas Modulares
Requerimientos del producto: [requerimientosLethics.md](file:///c:/Users/Emilia/OneDrive/Documentos/Emilia/UP/ETICA/LETHICS/lethics_frontend/requerimientosLethics.md)
Guía de diseño y UI: [DESIGN.md](file:///c:/Users/Emilia/OneDrive/Documentos/Emilia/UP/ETICA/LETHICS/lethics_frontend/DESIGN.md)
Registro de progreso y decisiones: [resumen_lethics.json](file:///c:/Users/Emilia/OneDrive/Documentos/Emilia/UP/ETICA/LETHICS/lethics_frontend/docs/resumen_lethics.json)
Documentación Next.js 16: `lethics-frontend/node_modules/next/dist/docs/`
Regla 01 - Negocio y Backend: [.agents/rules/01-reglas-negocio-backend.md](file:///c:/Users/Emilia/OneDrive/Documentos/Emilia/UP/ETICA/LETHICS/lethics_frontend/.agents/rules/01-reglas-negocio-backend.md)
Regla 02 - IA en Simuladores: [.agents/rules/02-ia-simuladores.md](file:///c:/Users/Emilia/OneDrive/Documentos/Emilia/UP/ETICA/LETHICS/lethics_frontend/.agents/rules/02-ia-simuladores.md)
Regla 03 - Progreso y Resiliencia: [.agents/rules/03-progreso-resiliencia.md](file:///c:/Users/Emilia/OneDrive/Documentos/Emilia/UP/ETICA/LETHICS/lethics_frontend/.agents/rules/03-progreso-resiliencia.md)
Regla 04 - Seguridad y Privacidad: [.agents/rules/04-seguridad-privacidad-env.md](file:///c:/Users/Emilia/OneDrive/Documentos/Emilia/UP/ETICA/LETHICS/lethics_frontend/.agents/rules/04-seguridad-privacidad-env.md)
Regla 05 - UI, Accesibilidad y Rendimiento: [.agents/rules/05-ui-accesibilidad-rendimiento.md](file:///c:/Users/Emilia/OneDrive/Documentos/Emilia/UP/ETICA/LETHICS/lethics_frontend/.agents/rules/05-ui-accesibilidad-rendimiento.md)
Regla 06 - Flujo de Git y Trazabilidad: [.agents/rules/06-flujo-git-trazabilidad-limites.md](file:///c:/Users/Emilia/OneDrive/Documentos/Emilia/UP/ETICA/LETHICS/lethics_frontend/.agents/rules/06-flujo-git-trazabilidad-limites.md)
