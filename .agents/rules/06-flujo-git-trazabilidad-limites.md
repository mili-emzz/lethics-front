# Regla 06: Flujo de GitHub, Trazabilidad y Límites de Acción

## Propósito
Mantener un historial de versiones limpio, auditable y disciplinado, asegurando que cada cambio esté alineado con los requerimientos funcionales y las políticas del proyecto.

## Directrices
1. Flujo de trabajo en GitHub:
- Ramas temáticas: Desarrollar en la rama indicada para la funcionalidad (`feature/nombre-tarea` o `fix/nombre-bug`).
- Commits atómicos por bloque: Realizar un commit por cada bloque funcional terminado y verificado, evitando mezclar múltiples objetivos en un solo cambio.
- Mensajes de commit con trazabilidad: Redactar en imperativo citando el requerimiento funcional o regla de negocio implementada.
  Ejemplo: `feat(cuestionario): validar calificacion minima del 70% (RN-03)`
- Push a la rama remota: Efectuar el push a la rama de trabajo correspondiente una vez que el bloque compile y cumpla las pruebas sin errores.

2. Bitácora viva obligatoria:
Tras cada implementación o avance, actualizar obligatoriamente el archivo `docs/resumen_lethics.json`, registrando decisiones tomadas, estado actual, tareas concluidas y el siguiente paso pendiente.

3. Límites en tres niveles:
- Siempre: Actualizar `docs/resumen_lethics.json`, validar compilación con `npm run build` y linter con `npm run lint`, verificar responsividad mobile-first y respetar `prefers-reduced-motion`.
- Preguntar antes: Instalar o alterar dependencias en `package.json`, modificar esquemas de datos o contratos en `services/contracts/`, o realizar cambios en la carpeta `public/`.
- Nunca: Modificar o agregar archivos en `public/` sin autorización explícita de la usuaria, commitear archivos `.env` o secretos, dejar componentes visuales llamando directamente a APIs externas o saltarse validaciones de tipado.
