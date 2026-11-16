Documento de requerimientos de
software

 [Lethics]
 
Tabla de contenido

1. Propósito

2. Alcance del producto / Software

3. Referencias

4. Funcionalidades del producto

5. Clases y características de usuarios

6. Entorno operativo

7. Requerimientos funcionales

7.1 Registro e inicio de sesión de usuario

7.2 Panel de progreso del curso

7.3 Cuestionarios de opción múltiple en cada módulo

7.4 Simuladores de casos reales que soliciten al usuario una respuesta o actitud ética

7.5 Retroalimentación de simuladores con Inteligencia Artificial

7.6 Historial de porcentajes logrados en cada cuestionario y laboratorio

7.7 Tarjetas de aprendizaje (Flashcards)

7.8 Examen final que concluya el curso en su totalidad

8. Reglas de negocio

9. Requerimientos de interfaces externas

9.1. Interfaces de usuario

9.2. Interfaces de hardware

9.3. Interfaces de software

9.4. Interfaces de comunicación

10. Requerimientos no funcionales

11. Otros requerimientos

3

3

3

4

4

5

5

5

6

6

7

7

8

8

9

10

11

11

11

11

11

11

13

Página 2

1.  Propósito

Lethics  1.0  es  un  software  educativo  enfocado en que   estudiantes y profesionales de
software  tengan  un  espacio  para  aprender  sobre  ética, principios, leyes y normas que
rigen el desarrollo de software.

2.  Alcance del producto / Software

●  Objetivo  general:  Desarrollar  una  aplicación  web  diseñada para el aprendizaje
autodidacta sobre las condiciones legales que rigen el desarrollo de software
●  Beneficios: El aprendizaje integral sobre el desarrollo de software, promoviendo

la visibilidad de buenas prácticas en el ámbito legal,

●  Objetivos específicos:

○  Desarrollar una interfaz amigable y atractiva que facilite el aprendizaje de

○

los usuarios
Implementar un flujo de aprendizaje dividido por 5  módulos que estructure
el curso de manera clara.

○  Solicitar un proyecto y un examen final que fortalezcan el aprendizaje

3.  Referencias

Modelo directo para tus "simuladores de casos reales" con IA
Socrat Cases - Socrat.ai

Introducción a la ética del software. El Centro Markkula de Ética Aplicada de Santa
Clara University ofrece un módulo de ética en ingeniería de software con lecturas,
tareas, casos de estudio y ejercicios de clase, pensado para provocar conversación
sobre dilemas éticos que enfrentarán los futuros ingenieros de software.
An Introduction to Software Engineering Ethics - Markkula Center, Santa Clara
University

Módulos de formación legal/normativa en privacidad y protección de datos, con quizzes
interactivos, a su propio ritmo.
IAPP Training - IAPP

Página 3

4.  Funcionalidades del producto

●  Registro e inicio de sesión de usuario
●  Panel de progreso del curso
●  Cuestionarios de opción múltiple en cada módulo
●  Simuladores  de  casos  reales  que  soliciten  al  usuario  una  respuesta  o  actitud

ética

●  Retroalimentación de simuladores con Inteligencia Artificial
●  Historial de porcentajes logrados en cada cuestionario y laboratorio
●  Tarjetas de aprendizaje
●  Proyecto al final del curso
●  Examen final que concluya el curso en su totalidad
●  Un sistema de racha por días que el usuario haya realizado una lección

5.  Clases y características de usuarios

●  Usuario estudiante/profesional:

○  Frecuencia de uso: Alta
○  Características: Se conforma por personas de 17 años en adelante que

quieren encaminar su carrera profesional al desarrollo de software.

○  Funcionalidades:

■  Registro: Registro de cuenta en el sistema
■  Visualización: Acceso al contenido del curso por módulo
■  Simuladores: Acceso a módulos con casos reales que pongan a

prueba el conocimiento y actitud ética del usuario.

■  Proyecto y examen final: Módulo final conformado por un examen

y un proyecto que refuerce sus conocimientos y complete el
progreso total del curso.

●  Usuario casual:

○  Frecuencia de uso:  Media - Baja
○  Características: Se conforma por personas de 17 años en adelante que

únicamente accedieron al curso de manera recreativa.

○  Funcionalidades:

■  Registro: Registro de cuenta en el sistema
■  Visualización: Acceso al contenido del curso por módulo
■  Simuladores: Acceso a módulos con casos reales que pongan a

prueba el conocimiento y actitud ética del usuario.

■  Proyecto y examen final: Módulo final conformado por un examen

y un proyecto que refuerce sus conocimientos y complete el
progreso total del curso.

Página 4

6.  Entorno operativo

Lethics 1.0 es una aplicación web multiplataforma, diseñada para funcionar de manera
consistente, ligera y sin restricciones de dispositivo, sistema operativo o navegador.

●  Plataforma de hardware: cualquier dispositivo con conexión a internet capaz de
ejecutar  un  navegador  web  moderno  (computadoras  de  escritorio,  laptops,
tablets  y  smartphones),  sin  requerir  hardware  especializado  ni  instalación  de
software adicional.

●  Diseño  responsivo:  la  interfaz  se  adaptará  automáticamente  al  tamaño  de
pantalla  del  dispositivo  mediante  un  enfoque  mobile  first,  garantizando  una
experiencia  de  uso  equivalente  desde  pantallas  pequeñas  (a  partir  de  320px)
hasta monitores de escritorio.

●  Sistemas  operativos:  compatible  con  Windows  10  o  superior,  macOS  11  o
superior,  distribuciones  recientes  de  Linux,  Android  8  o  superior  e  iOS  13  o
superior, sin diferencias funcionales entre plataformas.

●  Navegadores  compatibles:  las  últimas  dos  versiones  estables  de  Google
Chrome,  Mozilla  Firefox,  Safari,  Microsoft  Edge  y  navegadores  basados  en
Chromium.

●  Rendimiento y ligereza: el sistema minimizará el peso de los recursos cargados
(imágenes  optimizadas,  carga  diferida,  minificación  de  código  y  uso  de  CDN)
para  garantizar  tiempos  de  carga  rápidos  incluso  en  conexiones  limitadas
(3G/4G) y dispositivos de gama media o baja.

●  Arquitectura  y  componentes:  comunicación  mediante  API  REST  hacia  el
backend,  la  base  de  datos  y  el  servicio  de  retroalimentación  con  Inteligencia
tecnologías
Artificial  (ver  sección  7.5),  sin  dependencias  de  plugins  o
propietarias.

●  Conectividad:  el  sistema  deberá  operar  correctamente  bajo  condiciones  de
conectividad  variables,  mostrando  indicadores  claros  de  carga  y  manejando
errores de conexión sin pérdida del progreso del usuario (ver sección 7.9).

7.  Requerimientos funcionales

7.1 Registro e inicio de sesión de usuario

Descripción: Funcionalidad que permite a los usuarios (estudiantes, profesionistas o
casuales) crear una nueva cuenta y autenticarse para acceder al contenido de los
módulos de Lethics.

Prioridad: Alta

Página 5

Acciones iniciadoras y comportamiento esperado: El usuario llena el formulario de
registro con sus datos o ingresa sus credenciales en la pantalla de inicio de sesión. El
sistema procesa y valida la información ingresada, crea el registro en la base de datos o
autentica al usuario, y finalmente concede el acceso a la plataforma. Además de que el
usuario debe recibir un correo de verificación del correo electrónico.

Requerimientos funcionales:

●  El sistema permitirá el registro de cuenta en el sistema solicitando datos

obligatorios (ej. nombre, correo electrónico y contraseña), los cuales deben
ingresar completos antes de poder aprobarse la creación del perfil.

●  El sistema validará que la dirección de correo electrónico proporcionada durante
el registro tenga un formato válido y no se encuentre duplicada en la base de
datos.

●  El sistema podrá autenticar al usuario al momento de iniciar sesión, verificando
que las credenciales ingresadas coincidan exactamente con las registradas.
●  El sistema permitirá el registro nuevo de datos de un usuario para acceder a la

app

●  El sistema proporcionará mensajes de error que sean informativos y orientados
al usuario final si se intentan ingresar credenciales incorrectas o si se dejan
campos vacíos durante el registro.

●  El sistema enviará automáticamente, inmediatamente después de completar el
registro, un correo electrónico de verificación a la dirección proporcionada,
incluyendo un enlace único de confirmación.

●  El enlace de verificación enviado por correo electrónico tendrá una vigencia
máxima de 5 minutos a partir de su generación, transcurridos los cuales el
sistema lo invalidará automáticamente.

●  El sistema permitirá al usuario solicitar el reenvío del correo de verificación en

caso de que el enlace original haya expirado o no haya sido recibido.

●  El sistema restringirá el acceso completo a los módulos del curso hasta que la

cuenta del usuario sea marcada como "verificada" mediante el acceso al enlace
de confirmación dentro de su tiempo de vigencia.

7.2 Panel de progreso del curso

Descripción: Interfaz principal donde el usuario puede visualizar su avance global a
través de los 5 módulos del curso.

Prioridad: Alta

Acciones iniciadoras y comportamiento esperado: El usuario inicia sesión de
manera exitosa y el sistema lo redirige al panel principal, cargando y mostrando el

Página 6

porcentaje de progreso calculado según los módulos y actividades completadas.
Además de que permite conservar el punto exacto en el que un usuario dejó una
lección inconclusa, de modo que pueda retomarla posteriormente desde ese mismo
punto en lugar de reiniciarla.

Requerimientos funcionales:

●  El sistema calculará y mostrará visualmente el porcentaje general de avance del

usuario en el curso.

●  El sistema permitirá visualizar el estado actual (ej. Pendiente, En

progreso,Completado) de cada uno de los 5 módulos que estructuran el curso

●  El sistema bloqueará el acceso a módulos posteriores si el usuario no ha
completado los módulos pre-requisitos, mostrando un ícono de candado
●  El sistema guardará automáticamente, sin requerir una acción explícita del

usuario, el avance dentro de una lección (por ejemplo, la sección en la que se
encuentre).

●  El sistema permitirá al usuario reanudar una lección inconclusa exactamente

desde el último punto guardado al reingresar a ella.

●  El sistema indicará visualmente, dentro del panel de progreso del curso, qué

lecciones se encuentran en estado "En progreso" (iniciadas pero no concluidas).

●  El progreso guardado de una lección se mantendrá disponible indefinidamente

hasta que el usuario la concluya, sin importar el tiempo transcurrido o el
dispositivo desde el cual acceda nuevamente.

7.3 Cuestionarios de opción múltiple en cada módulo

Descripción: Herramienta de evaluación teórica al final de cada módulo para medir la
retención de conocimientos sobre leyes, normas y principios éticos.

Prioridad: Alta

Acciones iniciadoras y comportamiento esperado: El usuario inicia un cuestionario,
selecciona las respuestas a las preguntas presentadas y presiona enviar. El sistema
evalúa las respuestas, calcula la calificación y muestra el resultado en pantalla.

Requerimientos funcionales:

●  El sistema desplegará una serie de preguntas de opción múltiple, permitiendo

seleccionar únicamente una respuesta válida por pregunta.

●  El sistema registrará la calificación final del cuestionario de forma automática una

vez que el usuario envíe sus respuestas.

Página 7

●  El sistema permitirá repetir el cuestionario si el usuario no alcanza la calificación

mínima aprobatoria definida en las reglas de negocio.

7.4 Simuladores de casos reales que soliciten al usuario una respuesta o actitud
ética

Descripción: Entornos de casos prácticos donde se exponen dilemas reales de
desarrollo de software para que el usuario tome decisiones críticas basadas en la ética
profesional.

Prioridad: Alta

Acciones iniciadoras y comportamiento esperado: El usuario accede al simulador,
lee la descripción del caso real y formula o selecciona su decisión. El sistema almacena
la decisión tomada para su posterior análisis.

Requerimientos funcionales:

●  El sistema presentará el contexto detallado de un caso práctico, acompañado de

posibles acciones o un campo de texto para que el usuario documente su
respuesta ética.

●  El sistema requerirá obligatoriamente que el usuario ingrese una respuesta o
seleccione una actitud antes de permitirle avanzar a la retroalimentación.

●  El sistema guardará el registro exacto de las decisiones tomadas por el usuario

para integrarlas a su historial.

7.5 Retroalimentación de simuladores con Inteligencia Artificial

Descripción: Evaluación automatizada del desempeño del usuario en los simuladores
de casos reales, utilizando IA para analizar el razonamiento ético.

Prioridad: Media

Acciones iniciadoras y comportamiento esperado: Tras enviar su respuesta en el
simulador, el usuario espera la evaluación. El sistema envía los datos al motor de
Inteligencia Artificial, recibe el análisis y lo formatea en pantalla como retroalimentación
constructiva.

Requerimientos funcionales:

●  El sistema consumirá una interfaz externa de Inteligencia Artificial (API) enviando

la respuesta del usuario y el contexto del simulador para su análisis.

Página 8

●  El sistema mostrará en pantalla la retroalimentación generada por la Inteligencia

Artificial en un tiempo de respuesta adecuado.

●  El sistema responderá adecuadamente a condiciones de error, mostrando un
mensaje de alerta en caso de que el servicio de Inteligencia Artificial no se
encuentre disponible.

7.6 Historial de porcentajes logrados en cada cuestionario y laboratorio

Descripción: Registro detallado de las calificaciones, intentos y métricas de
desempeño del usuario a lo largo de los cuestionarios y simuladores.

Prioridad: Baja

Acciones iniciadoras y comportamiento esperado: El usuario navega a la sección
de su historial. El sistema consulta la base de datos y despliega una lista cronológica
con los resultados obtenidos en las actividades evaluativas.

Requerimientos funcionales:

●  El sistema emitirá un listado del historial del usuario que incluya: nombre de la
actividad, tipo (cuestionario o simulador), fecha de realización y porcentaje
logrado.

●  El sistema permitirá filtrar y ordenar los registros del historial por módulo o por

calificación más alta/baja.

●  El sistema almacenará cada intento realizado de forma independiente para

permitir al usuario observar su curva de mejora.

7.7 Tarjetas de aprendizaje (Flashcards)

Descripción: Herramienta lúdica e interactiva para el estudio y memorización de
conceptos técnicos, principios de software y normativas legales.

Prioridad: Baja

Acciones iniciadoras y comportamiento esperado: El usuario visualiza una tarjeta
con un concepto y hace clic sobre ella. El sistema ejecuta una animación para girar la
tarjeta y muestra la definición correspondiente en el reverso.

Requerimientos funcionales:

●  El sistema permitirá interactuar con las tarjetas mediante clics o toques táctiles

para alternar entre el frente (concepto) y el reverso (definición).

Página 9

●  El sistema proporcionará botones de navegación para avanzar a la siguiente
tarjeta o retroceder a la anterior dentro del mazo de un módulo específico.

●  El sistema barajará las tarjetas de aprendizaje si el usuario selecciona la opción

de repaso aleatorio.

7.8 Proyecto al final del curso

Descripción: Módulo de entrega final donde el usuario debe subir un entregable
práctico que demuestre la asimilación integral del desarrollo de software y buenas
prácticas legales.

Prioridad: Alta

Acciones iniciadoras y comportamiento esperado: El usuario accede a la sección
del proyecto, adjunta su documento y confirma la entrega. El sistema carga el archivo,
asocia la entrega al perfil del usuario y notifica la recepción exitosa.

Requerimientos funcionales:

●  El sistema permitirá adjuntar archivos o proporcionar enlaces a repositorios

externos como evidencia de la realización del proyecto final.

●  El sistema validará que los archivos cargados no superen el límite de peso

establecido y cumplan con los formatos permitidos.

●  El sistema cambiará el estado del módulo de proyecto a "Entregado" una vez que

la carga de la evidencia concluya exitosamente.

7.8 Examen final que concluya el curso en su totalidad

Descripción: Evaluación global que engloba todos los conceptos de ética y normas del
desarrollo de software vistos a lo largo del curso.

Prioridad: Alta

Acciones iniciadoras y comportamiento esperado: El usuario inicia el examen final.
Al responder la última pregunta y enviar, el sistema procesa la calificación, determina si
se aprobó el curso y marca Lethics como completado para ese usuario.

Requerimientos funcionales:

●  El sistema habilitará el acceso al examen final única y exclusivamente si el
usuario ha completado el 100% de los módulos anteriores y entregado el
proyecto final.

●  El sistema calculará la puntuación global del examen al finalizar el intento.

Página 10

●  El sistema marcará el curso como "Finalizado" y emitirá un mensaje de
felicitación si la calificación obtenida en el examen final es aprobatoria

8.  Reglas de negocio

RN-01:  Acceso  exclusivo  a  usuarios  registrados:  Todo individuo, ya sea bajo el rol
de  "Usuario  estudiante/profesional"  o  "Usuario  casual",  debe  haber  completado  el
registro  y  estar  autenticado  en  el  sistema  para  poder  visualizar  el  contenido  de  los
módulos y utilizar los simuladores.

RN-02:  Secuencialidad  obligatoria  del  aprendizaje:  El  flujo  de  aprendizaje  está
dividido por 5 módulos. El avance de un usuario debe ser estrictamente secuencial; no
se permitirá el acceso a un módulo superior sin antes haber aprobado el cuestionario y
el simulador del módulo inmediatamente anterior.

RN-03:  Calificación  mínima  aprobatoria:  Para  que  el  sistema  considere  como
"aprobado" cualquier cuestionario de opción múltiple de un módulo o el examen final, el
usuario deberá obtener una calificación igual o superior al 70% de aciertos.

RN-04:  Intentos  de  evaluación:  Los usuarios tendrán intentos ilimitados para realizar
los  cuestionarios  teóricos  de  opción  múltiple  en  caso  de  reprobar,  pero  el  sistema
registrará cada intento en el historial para fines de seguimiento.
RN-05: Requisitos para el módulo de cierre: El acceso a la entrega del proyecto y la
presentación  del  examen  final  estará  bloqueado  hasta  que  el  panel  de  progreso  del
curso registre un 100% de finalización en los módulos previos.

RN-06:  Naturaleza  de  la  retroalimentación  con  Inteligencia  Artificial:  La  IA  en  los
simuladores  de casos reales actuará únicamente como una herramienta de evaluación
cualitativa  sobre  la  actitud  ética  del  usuario,  y  no  asignará  una  calificación  numérica
directa que afecte el porcentaje del módulo.

RN-07:  Restricción  de  modificación  de  contenido:  Los  individuos  con  el  rol  de
usuario  final  (estudiantes,  profesionales  o  casuales)  tendrán  permisos  exclusivos  de
lectura  sobre  el  material  didáctico  y  solo  tendrán  permisos  de  escritura/envío  en  los
apartados  de  evaluación. Bajo ninguna circunstancia podrán modificar el contenido del
curso.

Página 11

9.  Requerimientos de interfaces externas

9.1.  Interfaces de usuario

Lethics cuenta con una única interfaz de usuario tipo aplicación web, accesible desde
cualquier navegador, organizada en las siguientes áreas con interfaz distinta:

●  Área de autenticación: pantallas de registro, inicio de sesión y verificación de

correo electrónico

●  Panel de progreso: pantalla principal donde el usuario visualiza su avance

general a través de los 5 módulos del curso

●  Área de módulos: pantallas de contenido, cuestionarios, simuladores con
retroalimentación de Inteligencia Artificial y flashcards de cada módulo

●  Área de cierre de curso: pantallas del proyecto final, examen final e historial de

calificaciones

●  Estándares de interfaz gráfica (GUI): diseño responsivo mobile first (sección 6),

paleta de colores institucional, tipografía sans-serif consistente (Arial) e
iconografía uniforme para representar el estado de módulos y lecciones
(pendiente, en progreso, completado, bloqueado).

●  Guías de estilo: encabezado fijo presente en todas las pantallas con el logotipo,
la navegación principal y el porcentaje de progreso global del usuario; botones
primarios y secundarios con estilo, tamaño y estados (normal, hover,
deshabilitado) estandarizados; mensajes de error y confirmación mostrados
mediante un componente uniforme (banner o modal) en toda la aplicación.

9.2.  Interfaces de hardware

●  El sistema es compatible con cualquier dispositivo con acceso a internet y
navegador web: computadoras de escritorio, laptops, tablets y teléfonos
inteligentes. No requiere impresoras ni otros dispositivos periféricos
especializados, ya que toda la interacción con el usuario es digital.

●  Protocolos de comunicación: el sistema utiliza los protocolos estándar de internet
(TCP/IP, HTTPS) soportados nativamente por el navegador de cada dispositivo,
sin requerir protocolos propietarios adicionales.
Interacciones de datos y control: la interacción con el hardware se limita a los
periféricos de entrada estándar del dispositivo (teclado, mouse, pantalla táctil),
gestionados por el sistema operativo y el navegador; el sistema no controla
directamente componentes de hardware.

●

Página 12

9.3.  Interfaces de software

Lethics interactúa con los siguientes componentes de software:

●  Backend / API REST: capa de servicios que procesa la lógica de negocio
(registro, progreso, calificaciones) y expone los endpoints que consume la
interfaz web.

●  Base de datos: sistema de almacenamiento donde se guardan los usuarios, su

progreso, calificaciones e intentos de cuestionarios.

●  Servicio de correo electrónico: componente externo (proveedor de envío

transaccional) utilizado para el envío del correo de verificación de cuenta, con
enlace de confirmación de 5 minutos de vigencia

●  Servicio de Inteligencia Artificial: componente externo consumido vía API que
genera la retroalimentación cualitativa de los simuladores de casos éticos
●  Navegadores web: Google Chrome, Mozilla Firefox, Safari, Microsoft Edge y
navegadores basados en Chromium, en sus últimas dos versiones estables

9.4.  Interfaces de comunicación

●  Correo electrónico: envío del enlace de verificación de cuenta al registrarse
(vigencia de 5 minutos) y del reenvío del enlace en caso de expiración
●  Comunicación cliente-servidor: mediante solicitudes HTTP/HTTPS entre el

navegador del usuario y la API REST del backend.

●  Formato de mensajería: intercambio de datos en formato JSON entre el frontend

y la API; los correos electrónicos se envían en formato HTML.

●  Todas las comunicaciones entre el cliente y el servidor se realizarán bajo el
protocolo HTTPS (TLS 1.2 o superior). Las contraseñas de los usuarios se
almacenarán mediante un algoritmo de hash seguro y nunca en texto plano. Los
enlaces de verificación de correo serán tokens de un solo uso, con una vigencia
máxima de 5 minutos, para evitar accesos no autorizados

10.  Requerimientos no funcionales

Privacidad

●  El sistema no compartirá información con terceros sin el consentimiento explícito

del usuario.

●  Los  datos  utilizados  para  analíticas  deben  ser  anonimizados  para  impedir  la

identificación directa de los usuarios.

●  Solo  el  personal  autorizado  tendrá  acceso  a  los  datos  de  los  usuarios,

restringiendo el acceso basado en el rol.

Eficiencia

Página 13

●  Toda  funcionalidad  del  sistema  debe  responder  al  usuario  en  menos  de  5

segundos.

●  El  sistema  debe  ser  capaz  de  operar  adecuadamente  con  hasta  100.000

usuarios con sesiones concurrentes.

●  Las estadísticas deberán generarse en un tiempo máximo de 3 segundos

Usabilidad

●  El sistema debe contar con manuales de usuario estructurados adecuadamente.
●  El  sistema  debe  proporcionar  mensajes  de  error  que  sean  informativos  y

orientados al usuario final.

●  El  sistema  deberá  contar  con  una  interfaz  agradable  e  intuitiva  que  permita

realizar los registros en 3 pasos.

●  Deberá ser usable sin ninguna capacitación previa.
●  La  tasa  de  errores  cometidos  por  el  usuario  deberá  ser  menor  del  1%  de  las

transacciones totales ejecutadas en el sistema.

●  La  aplicación  web  debe  poseer  un diseño  “Responsive” a  fin  de  garantizar  la
adecuada  visualización  en  múltiples  computadores  personales,  dispositivos
tableta y teléfonos inteligentes.

Seguridad lógica y de datos

●  Los  permisos  de  acceso  al  sistema  podrán  ser  cambiados  solamente  por  el

administrador de acceso a datos.

Disponibilidad

●  El  sistema  debe  tener  una  disponibilidad  del  99,99%  de  las  veces  en  que  un

usuario intente acceder.

●  El tiempo para iniciar o reiniciar el sistema no podrá ser mayor a 5 minutos.
●  La tasa de tiempos de falla del sistema no podrá ser mayor al 0,5% del tiempo de

operación total.

●  El promedio de duración de fallas no podrá ser mayor a 15 minutos.
●  La probabilidad de falla del Sistema no podrá ser mayor a 0,05.

11.  Otros requerimientos

Requerimientos no cubiertos en ninguna otra sección del documento de requerimientos
de  software,  por  ejemplo:  Requerimientos  de  bases  de  datos,  internacionalización,
legales y objetivos de reuso de componentes de software.

Ejemplos:

●  El sistema será desarrollado para las plataformas PC y Macintosh.
●  La  aplicación  debe  ser  compatible  con  todas  las  versiones  de  Windows,

desde Windows 7.

●  La aplicación deberá consumir menos de 500 Mb de memoria RAM.

Página 14

●  La aplicación no podrá ocupar más de 2 GB de espacio en disco.
●  La nueva aplicación debe manejar fuentes del alfabeto en Inglés, Idiomas

latinos (Español, Francés, Portugués, Italiano), Arábico y Chino.

●  La

interfaz  de  usuario  será
únicamente con HTML5 y JavaScript.

implementada  para  navegadores  web

12.  Glosario

●  Software: Conjunto de programas informáticos diseñados para facilitar al usuario
final  la  realización  de  tareas  específicas,  tales  como  escribir  documentos,
navegar  por  internet,  editar  imágenes  o  gestionar  bases  de  datos.  A  diferencia
del software de sistema, este interactúa directamente con el usuario y se ejecuta
sobre un sistema operativo

●  API (Application Programming Interface) : Interfaz que permite la comunicación y
intercambio  de  datos  de  forma  estructurada  entre  el  backend  y  las

el
aplicaciones cliente (móvil o web)

●  Backend: Capa lógica e invisible del sistema que procesa las reglas de negocio,

la seguridad, la autenticación y la conexión con la base de datos

●  Hardware:   Se  refiere  a  los  componentes  físicos  de un sistema informático que
puedes  ver  y  tocar.  Esto  incluye  dispositivos  como  la  unidad  central  de
procesamiento  (CPU),  módulos  de  memoria,  discos  duros,  teclados,  mouse,
monitores y otros periféricos

●  Base  de  datos:  Conjunto  lógico  de  datos  estructurados organizado que permite
almacenar,  gestionar,  actualizar  y  consultar  grandes  volúmenes  de  datos  de
forma eficiente y segura

●  API  RESTful:  Interfaz  de  programación  de  aplicaciones  que  sigue  el  estilo
arquitectónico  REST  (Representational  State  Transfer)  para  intercambiar  datos
de  forma  eficiente,  segura  y  escalable  entre  sistemas  a  través  de  internet,
utilizando  mayormente  el  protocolo  HTTP.  Permite  que  aplicaciones,  como
frontend y backend, se comuniquen independientemente.

Página 15


