# Regla 02: Inteligencia Artificial en Simuladores Éticos

## Propósito
Garantizar el uso seguro, resiliente y estrictamente pedagógico de la Inteligencia Artificial en los simuladores de casos éticos reales, protegiendo la integridad de la evaluación del curso.

## Directrices
1. Retroalimentación cualitativa estricta (RN-06):
La IA genera análisis cualitativo y reflexivo sobre la postura ética del usuario. La interfaz bajo ninguna circunstancia debe mostrar ni calcular una calificación o porcentaje numérico a partir del veredicto de la IA.
2. Canalización segura de peticiones:
El frontend nunca invoca APIs de IA de forma directa ni expone credenciales. Toda llamada pasa por la capa de servicios o endpoint seguro del backend.
3. Sanitización de salidas:
Cualquier contenido retornado por modelos de lenguaje debe sanitizarse y formatearse antes de su renderizado en pantalla para neutralizar posibles vectores XSS.
4. Resiliencia y preservación de respuesta (RF 7.5):
Si el servicio de IA se encuentra indisponible, responde con error o excede el tiempo límite (5 segundos), la interfaz muestra un banner claro informando el incidente y mantiene intacta la respuesta redactada por el usuario para permitir reintentar sin pérdida de información.
