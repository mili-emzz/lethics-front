# Regla 03: Progreso del Curso, Autoguardado y Resiliencia

## Propósito
Preservar de forma continua el esfuerzo y avance del usuario a lo largo de los 5 módulos, asegurando que las lecciones puedan reanudarse con precisión incluso ante fallos de red o cambios de dispositivo.

## Directrices
1. Autoguardado transparente con debounce (RF 7.2):
El avance dentro de las lecciones (sección o bloque actual) se almacena automáticamente sin requerir que el usuario presione un botón de guardado. Se emplea debounce para evitar saturación de peticiones.
2. Reanudación exacta y multi-dispositivo:
Al volver a entrar a una lección inconclusa, el sistema posiciona al usuario en el último punto registrado. El progreso se almacena de forma duradera sin caducidad.
3. Respaldo local tolerante a fallas (Sección 6):
Ante desconexiones o redes inestables (3G/4G), el progreso y borradores de respuestas se respaldan temporalmente en almacenamiento local, sincronizándose al reanudar la conexión sin pérdida de datos.
4. Registro independiente de intentos (RN-04 y RF 7.6):
Cada intento de cuestionario o entrega de actividad se almacena como un registro histórico independiente, con su fecha y calificación obtenida, alimentando la curva de aprendizaje en el historial.
