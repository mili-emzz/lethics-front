# Regla 04: Seguridad, Privacidad y Protección de Variables de Entorno

## Propósito
Blindar la aplicación contra filtraciones de credenciales, vulnerabilidades de inyección y exposición de datos personales, cumpliendo los requerimientos no funcionales de seguridad y privacidad.

## Directrices
1. Protección estricta de archivos `.env`:
Los archivos `.env`, `.env.local`, `.env.development` o `.env.production` nunca deben subirse al repositorio de código ni compartirse. El archivo `.gitignore` debe asegurar su exclusión permanente. Se mantendrá únicamente un archivo `.env.example` con valores de ejemplo sin secretos reales.
2. Cero secretos en cliente:
Ninguna API key, token privado de servicio o contraseña se escribe en código del cliente o en rutas públicas.
3. Manejo de tokens y sesiones:
Los tokens de sesión no deben persistirse de forma desprotegida o sin justificación. Las contraseñas viajan bajo HTTPS (TLS 1.2+) y se almacenan mediante algoritmos de hash seguros.
4. Validación estricta con Zod:
Todas las entradas de usuario (formularios de registro, respuestas de simulador y carga de archivos del proyecto final) se validan mediante esquemas Zod en cliente y servidor, limitando tamaño, formato y caracteres no permitidos.
5. Privacidad y anonimización:
Cualquier dato recopilado con fines analíticos debe anonimizarse completamente, impidiendo la identificación directa de los usuarios.
6. Permisos de solo lectura (RN-07):
Los usuarios finales tienen permisos exclusivos de lectura sobre el material didáctico y no pueden modificar el contenido publicado.
