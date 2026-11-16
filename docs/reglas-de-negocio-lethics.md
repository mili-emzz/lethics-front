# Lethics 1.0 – Reglas de negocio

Fuente: Documento de requerimientos de software de Lethics, sección 8 (RN-01 a RN-07). Las secciones 2 y 3 de este archivo reúnen reglas que el documento establece en otros apartados y puntos que aún requieren definición.

---

## 1. Reglas de negocio (sección 8 del documento)

### RN-01 – Acceso exclusivo a usuarios registrados
- Todo individuo, con rol de **Usuario estudiante/profesional** o **Usuario casual**, debe haber completado el registro y estar autenticado para:
  - visualizar el contenido de los módulos
  - utilizar los simuladores

### RN-02 – Secuencialidad obligatoria del aprendizaje
- El curso se divide en **5 módulos**.
- El avance es **estrictamente secuencial**.
- No se permite acceder a un módulo superior sin haber **aprobado el cuestionario y el simulador** del módulo inmediatamente anterior.

### RN-03 – Calificación mínima aprobatoria
- Un cuestionario de opción múltiple de un módulo, o el examen final, se considera **aprobado** con una calificación **≥ 70% de aciertos**.

### RN-04 – Intentos de evaluación
- Los cuestionarios teóricos de opción múltiple tienen **intentos ilimitados** en caso de reprobar.
- Cada intento se **registra en el historial** para fines de seguimiento.

### RN-05 – Requisitos para el módulo de cierre
- La **entrega del proyecto** y la presentación del **examen final** permanecen **bloqueadas** hasta que el panel de progreso registre **100% de finalización** en los módulos previos.

### RN-06 – Naturaleza de la retroalimentación con IA
- En los simuladores de casos reales, la IA actúa **únicamente como herramienta de evaluación cualitativa** de la actitud ética del usuario.
- La IA **no asigna una calificación numérica** que afecte el porcentaje del módulo.

### RN-07 – Restricción de modificación de contenido
- Los usuarios finales (estudiantes, profesionales o casuales) tienen:
  - **permisos de lectura** sobre el material didáctico
  - **permisos de escritura/envío** solo en los apartados de evaluación
- Bajo ninguna circunstancia pueden modificar el contenido del curso.

---

## 2. Reglas derivadas de los requerimientos funcionales

Estas no están numeradas como RN en el documento, pero funcionan como reglas del negocio.

### Cuenta y verificación (RF 7.1)
- El correo debe tener formato válido y **no estar duplicado**.
- Tras el registro se envía automáticamente un correo de verificación con un enlace único.
- El enlace tiene **vigencia máxima de 5 minutos** y es de **un solo uso**.
- El usuario puede **solicitar el reenvío** si el enlace expiró o no llegó.
- El acceso completo a los módulos se restringe hasta que la cuenta esté **verificada**.

### Progreso (RF 7.2)
- Los módulos tienen estados: **Pendiente, En progreso, Completado** (y **bloqueado**, con ícono de candado).
- El avance dentro de una lección se **guarda automáticamente**, sin acción del usuario.
- El progreso guardado se conserva **indefinidamente** y es accesible desde **cualquier dispositivo** hasta que el usuario concluya la lección.

### Cuestionarios (RF 7.3)
- **Una sola respuesta válida** por pregunta.
- La calificación se registra automáticamente al enviar.

### Simuladores (RF 7.4)
- Es **obligatorio** ingresar una respuesta o seleccionar una actitud antes de pasar a la retroalimentación.
- Se guarda el **registro exacto** de las decisiones del usuario.

### Historial (RF 7.6)
- Cada intento se almacena **de forma independiente**.
- Cada registro incluye: nombre de la actividad, tipo (cuestionario o simulador), fecha y porcentaje logrado.

### Proyecto final (RF 7.8)
- Se acepta archivo adjunto o enlace a repositorio externo.
- Se valida el **peso máximo** y los **formatos permitidos**.
- Al cargarse la evidencia, el estado pasa a **"Entregado"**.

### Examen final (RF 7.8)
- Solo se habilita con **100% de módulos completados** y el **proyecto entregado**.
- Con calificación aprobatoria, el curso pasa a **"Finalizado"** y se muestra un mensaje de felicitación.

---

## 3. Puntos por definir

- **RN-02 vs RN-06:** el avance exige "aprobar el simulador", pero la IA no califica. Falta definir el criterio (por ejemplo, haber enviado una respuesta válida).
- **Peso máximo y formatos permitidos** del proyecto final.
- **Calificación del proyecto final:** el documento no indica quién lo revisa ni si tiene criterio de aprobación.
- **Aprobación del examen final:** se rige por el 70% de RN-03, pero no se define si hay límite de intentos.
- **Sistema de racha diaria:** aparece en las funcionalidades del producto, pero no tiene reglas asociadas.
