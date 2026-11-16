# Regla 05: Consistencia de UI, Accesibilidad y Rendimiento

## Propósito
Garantizar una experiencia de usuario homogénea, accesible y fluida en cualquier dispositivo o navegador moderno, cumpliendo las pautas de interfaz y rendimiento del sistema.

## Directrices
1. Consistencia visual y componentes base:
- Encabezado fijo presente en todas las vistas del curso con logotipo, navegación, porcentaje de avance global y racha de días activos.
- Componente uniforme de Banner o Modal para mensajes de confirmación, alerta y error.
- Estados estandarizados para botones primarios y secundarios (normal, hover, activo, deshabilitado).
- Tipografía institucional sans-serif consistente (Arial) y diseño responsivo mobile-first operable desde 320px de ancho.
2. Accesibilidad y reducción de movimiento:
- Toda interacción debe ser accesible mediante teclado, con indicadores de foco visibles y niveles de contraste adecuados.
- Las animaciones y transiciones de Framer Motion (en especial el giro de las flashcards) deben respetar de forma estricta la preferencia del sistema `prefers-reduced-motion`, ofreciendo una transición suave o instantánea para evitar incomodidad visual.
3. Rendimiento y ligereza (Sección 6 y 10):
- Carga de rutas con división de código (code splitting).
- Tiempo de respuesta de las funcionalidades menor a 5 segundos con indicadores visuales de carga claros.
- Consumo óptimo de recursos sin depender de librerías propietarias o plugins pesados.
