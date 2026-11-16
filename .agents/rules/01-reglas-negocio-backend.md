# Regla 01: Negocio como Fuente de Verdad (Backend Manda) y Desacoplamiento

## Propósito
Asegurar que la lógica de negocio resida en contratos y validaciones del servidor, manteniendo el frontend como facilitador de experiencia de usuario (UX) desacoplado de la infraestructura de datos.

## Directrices
1. Fuente de verdad en el servidor:
Los guards del frontend (sesión activa, correo verificado, módulos bloqueados, habilitación del examen final) son para guiar al usuario. El backend valida y autoriza de forma definitiva cada petición.
2. Parámetros no estáticos en código:
Valores como la calificación mínima aprobatoria (70% según RN-03) y la vigencia del enlace de verificación (5 minutos según RN-01) no deben quemarse en componentes visuales. Se consumen como parámetros desde los contratos en `services/contracts/`.
3. Contratos y Mocks:
Mientras no exista backend activo, los componentes visuales interactúan únicamente con las interfaces de `services/contracts/`, consumiendo implementaciones de `services/mocks/`. Al conectar la API real, la vista no sufrirá cambios estructurales.
4. Secuencialidad y candados (RN-02 y RN-05):
El acceso a módulos superiores requiere que el módulo previo tenga su cuestionario aprobado y su simulador completado. El módulo de cierre (proyecto y examen) requiere el 100% de los 5 módulos concluidos y el proyecto entregado.
