# Guía de Diseño y Experiencia de Usuario (DESIGN.md)

Documento maestro de diseño para **Lethics 1.0**, construido a partir del archivo oficial en Figma (`fileKey: bu0YqNIbyAIZb3OY7jbAYY`) y los requerimientos de interfaz de la plataforma.

## 1. Principios de Diseño
Lethics combina un tono cercano, educativo y amigable con una jerarquía visual clara que guía al estudiante paso a paso sin abrumarlo.
- **Enfoque Mobile-First:** Toda vista debe operar de forma cómoda desde `320px` (teléfonos pequeños), pasando por el punto base móvil de Figma (`440px`), hasta pantallas de escritorio (`1280px` a `1728px`).
- **Calidez y Legibilidad:** Uso constante del fondo crema cálido para reducir la fatiga visual en sesiones de lectura y estudio, contrastado con tarjetas blancas limpias y acentos en azul índigo.

## 2. Paleta de Colores Oficial (Tokens)

### Fondos y Superficies
- **Fondo Principal (Canvas):** `#FFF5EC` (Crema cálido base en todas las pantallas).
- **Superficie de Tarjetas y Contenedores:** `#FFFFFF` (Blanco puro).
- **Superficies Suaves de Apoyo (Cards / Estados):** `#F4F8FD` (Azul muy claro), `#E2F1F1` (Menta suave), `#FEF5F8` (Rosa tenue), `#EAEAF1` (Gris azulado claro para fondos secundarios).

### Colores de Marca y Acento
- **Primario Índigo:** `#3E4B8F` (Color principal de marca, encabezados destacados y botones primarios).
- **Primario Profundo (Evaluaciones):** `#3B3485` (Variante para acciones críticas de envío y bordes de botones secundarios en cuestionarios).
- **Acento Dorado / Racha:** `#FFB006` (Ícono de fuego de la racha diaria, progreso activo y elementos de gamificación).
- **Acento Crema Pastel:** `#FFDE97`, `#FFECC2` y `#FFEBC2` (Fondos de etiquetas, badges de módulos/lecciones y pills informativas).
- **Acento Alerta / Destacado:** `#FF5E19` (Naranja intenso para focos de atención y estados de alerta).

### Textos y Neutros
- **Texto Principal / Títulos:** `#1E1E1E` y `#000000` (Máximo contraste sobre fondos claros).
- **Texto de Lectura / Cuerpo:** `#474747` y `#444444`.
- **Texto Secundario / Metadatos:** `#6C6C63`, `#757575` y `#959595`.
- **Bordes y Divisores:** `#D8D8D8` (Bordes neutros de tarjetas/tabs) y `#80849D` (Bordes o textos apagados en tono índigo).

## 3. Tipografía
- **Títulos y Display:** `Batica Sans` (pesos `Regular` y `Bold`) para encabezados de pantalla, títulos de módulos y portadas.
- **Cuerpo de Interfaz y Lectura:** `Inter` (pesos `Regular`, `Semi Bold`, `Extra Bold`), con respaldo sans-serif institucional (`Arial, Helvetica, sans-serif`) para garantizar compatibilidad universal y legibilidad en lecciones largas.
- **Escala Base en Escritorio:** Títulos hero `48px–56px`, encabezados de sección `32px–40px`, subtítulos `24px–28px`, cuerpo y botones `16px–20px` (escalados proporcionalmente en móvil entre `14px` y `28px`).

## 4. Sistema de Botones y Controles

### Botón Primario
- **Uso:** Acción principal única por sección (*Iniciar sesión*, *Comenzar*, *Iniciar curso*, *Enviar*, *Analizar respuesta*, *Finalizar*).
- **Estilo:** Relleno sólido `#3E4B8F` (o `#3B3485` en envíos de evaluación), texto `#FFFFFF`, bordes totalmente redondeados (`rounded-full` / `48px`).
- **Estados:**
  - *Hover:* Ligero oscurecimiento (`#323D75`) y elevación sutil.
  - *Disabled:* Opacidad reducida (`50%`) y cursor deshabilitado (`RN-02` / formularios incompletos).

### Botón Secundario
- **Uso:** Acciones complementarias o de navegación alternativa (*Revisar respuestas*, *Volver*, pestañas *Descripción* / *Plan de estudios*).
- **Estilo:** Fondo transparente o `#FFFFFF`, borde de `2px` en `#3B3485` / `#3E4B8F` (o borde `1px` `#D8D8D8` en tabs de filtro), texto `#3E4B8F`, bordes `rounded-full`.
- **Estados:** *Hover* con tinte suave `#EAEAF1`.

### Botón Terciario / Acento / Ghost
- **Variante Pastilla (Pill Acento):** Fondo `#FFECC2` o `#FFEBC2`, texto `#1E1E1E` o `#3E4B8F`, `rounded-full`, usado para indicadores clicables o tags (*5 Módulos*, *50 lecciones*, *Aprende*, *Descubre*, *Aplica*).
- **Variante Ghost / Enlace:** Sin relleno ni borde, usado en flechas de regreso (`arrow-back`), enlaces de navegación del header y acciones de texto como *¿Olvidaste tu contraseña?*.

## 5. Elementos Permanentes en Todas las Pantallas
1. **Encabezado Fijo (Navbar):**
   - **Área Pública (`LandingPage`):** Logotipo `Lethics` a la izquierda, enlaces de sección (*Inicio*, *Nosotros*, *Contacto*) al centro/derecha y botón primario *Iniciar sesión*.
   - **Área Privada (`(plataforma)`):** Presente en todas las vistas autenticadas (`Home/Curso`, `CursoInfo`, `Lección`, `Flashcards`, `Simulador`, `Cuestionario`, `Perfil`, `Historial`, `Proyecto/Examen Final` y `Manual`). Muestra:
     - Logotipo `Lethics` a la izquierda (navega al Dashboard).
     - Bloque de usuario a la derecha con: **indicador de racha diaria** (ícono de fuego en `#FFB006` + contador numérico), **progreso global (%)** y **avatar/ícono de perfil**.
2. **Retroalimentación Uniforme:** Todos los errores, avisos de conectividad o confirmaciones usan un único componente estándar de **Banner / Toast (Sonner)** y **Modal**, evitando alertas nativas del navegador.
3. **Iconografía de Estado de Módulos:** Representación visual uniforme para los cuatro estados: *Pendiente*, *En progreso*, *Completado* y *Bloqueado* (ícono de candado).

## 6. Flujo Completo de Pantallas
1. **Entrada y Autenticación:**
   `LandingPage` -> `InicioSesion` / `Registro` (flujo en 3 pasos) / `Recuperación de contraseña` -> `Verificar correo` (temporizador de 5 minutos y reenvío).
2. **Panel Principal (Dashboard):**
   `Home/Curso` muestra el avance global, botón de acción principal (*Iniciar / Reanudar curso*) y el mapa secuencial de los **5 módulos**.
3. **Detalle y Flujo Interno por Módulo (`[moduloId]`):**
   `CursoInfo` (descripción y plan de estudios) -> `Lección` (material en solo lectura con autoguardado automático) -> `Flashcards` (repaso interactivo con giro 3D y barajado) -> `Simulador` (caso ético con retroalimentación cualitativa de IA) -> `Cuestionario` (opción múltiple, mínimo 70%) -> `Resultado de Cuestionario` (muestra puntaje, estado aprobado/reprobado y opción de revisar o reintentar).
4. **Cierre del Curso y Seguimiento:**
   `Proyecto Final` (habilitado al 100% de los 5 módulos) -> `Examen Final` (habilitado tras entregar el proyecto) -> `Historial` (listado filtrable + gráfica de curva de mejora) + `Perfil estudiante` + `Manual de usuario`.

## 7. Adaptación Responsiva (Móvil vs. Escritorio)
Tomando como base las vistas diseñadas en Figma (`440x956` en móvil y `1728px` en escritorio) y aplicando *mobile-first* desde `320px`:

- **Encabezado:** En escritorio ocupa `142px` de alto con espaciado amplio; en móvil se compacta a una sola barra de `45px–56px` manteniendo siempre visibles el logo `Lethics`, la racha y el acceso al perfil.
- **Pantallas de Autenticación (`InicioSesion`, `Registro`, `Recuperación`):** En escritorio usan diseño dividido (formulario + ilustración de Lumi); en móvil pasan a una sola columna centrada (`px-4`), priorizando campos táctiles amplios y ocultando o reduciendo la ilustración lateral para evitar scroll innecesario.
- **Home/Curso (Dashboard):** En escritorio muestra la portada de resumen arriba y los módulos en grilla o tarjetas amplias; en móvil todo se apila verticalmente (`flex-col`) con tarjetas de ancho completo (`100%`), manteniendo arriba el porcentaje global y el botón *Iniciar / Reanudar curso*.
- **Vistas de Trabajo (`CursoInfo`, `Lección`, `Flashcards`, `Simulador`, `Cuestionario`):**
  - En escritorio incluyen un contenedor lateral izquierdo (`110px`) de guía/pasos junto al área de contenido (`1450px`).
  - **Estimación Responsiva para Móvil (`< 768px`):** El contenedor lateral se transforma en una **barra superior compacta** (indicador de paso o progreso del módulo), dejando el 100% del ancho útil para el contenido:
    - *Lección:* Lectura fluida con tipografía legible (`16px`), márgenes cómodos y barra fija inferior o superior discreta indicando el autoguardado.
    - *Flashcards:* Tarjeta centrada adaptada al ancho móvil (`max-w-sm`), controles de navegación (*Anterior*, *Barajar*, *Siguiente*) agrupados abajo para alcance cómodo con el pulgar, respetando `prefers-reduced-motion`.
    - *Simulador:* Caso ético arriba en tarjeta compacta, área de texto amplia debajo, botón *Analizar respuesta* a ancho completo (`w-full`) y tarjeta de retroalimentación IA inmediatamente debajo sin borrar el borrador del usuario.
    - *Cuestionario y Resultado:* Opciones de respuesta en botones/tarjetas apiladas verticalmente con altura mínima táctil de `48px` y botones de acción (*Enviar*, *Revisar respuestas*, *Finalizar*) apilados a ancho completo.
    - *Proyecto Final, Examen Final e Historial:* Subida de archivo con zona táctil clara; en el *Historial*, la tabla de escritorio se transforma en tarjetas apiladas por intento en pantallas menores a `768px` y la gráfica de Recharts usa ancho fluido (`100%`).
