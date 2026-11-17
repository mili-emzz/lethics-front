import { Modulo, ExamenFinal, IntentoCuestionario, Usuario } from "@/types";

export const USUARIO_INICIAL_MOCK: Usuario = {
  id: "usr_estudiante_01",
  nombreCompleto: "Alex Rivas",
  correo: "alex.rivas@lethics.edu",
  correoVerificado: true,
  rol: "estudiante",
  avatarUrl: "",
  fechaRegistro: "2026-11-01T10:00:00Z",
  rachaDias: 4,
  ultimaConexion: "2026-11-17T08:00:00Z"
};

export const MODULOS_SEMILLA: Modulo[] = [
  {
    id: "modulo-1",
    numero: 1,
    titulo: "Fundamentos Éticos y Deontología en Software",
    descripcion:
      "Explora los principios éticos primarios, la responsabilidad profesional del ingeniero de software y los códigos deontológicos ACM e IEEE.",
    objetivos: [
      "Comprender la diferencia entre legalidad y moralidad en el código.",
      "Identificar los principios clave del Código de Ética ACM/IEEE.",
      "Reconocer el impacto social de las decisiones de diseño arquitectónico."
    ],
    planEstudio: [
      "1. Introducción a la ética aplicada a las tecnologías digitales",
      "2. Los 8 principios del Código Deontológico de la ACM/IEEE",
      "3. Dilemas deontológicos vs. consecuencialismo en la ingeniería",
      "4. Caso de estudio: Responsabilidad en sistemas críticos de vida"
    ],
    duracionHoras: 4,
    estado: "en_progreso",
    simuladorCompletado: false,
    cuestionarioAprobado: false,
    leccion: {
      id: "lec-mod-1",
      moduloId: "modulo-1",
      titulo: "Principios Rectores y Códigos Deontológicos",
      descripcion: "Lectura profunda sobre el compromiso público y los cánones de conducta del software.",
      duracionEstimadaMinutos: 25,
      completada: false,
      ultimaSeccionGuardada: 0,
      secciones: [
        {
          id: "sec-1-1",
          titulo: "1. El imperativo del interés público",
          contenido:
            "El principio primordial de todo desarrollador de software establece que el bienestar, la seguridad y la salud del público deben estar siempre por encima de los intereses comerciales o del empleador. Cuando un sistema puede comprometer vidas humanas o derechos fundamentales, el silencio técnico equivale a complicidad.",
          orden: 1
        },
        {
          id: "sec-1-2",
          titulo: "2. Cánones de la ACM e IEEE-CS",
          contenido:
            "La Asociación para la Maquinaria Computacional (ACM) y la Sociedad de Computación del IEEE han formulado un código que prescribe: 1) Actuar con consistencia al interés público; 2) Servir fielmente al cliente o empleador dentro de la ley; 3) Mantener los más altos estándares profesionales en el producto; 4) Respaldar el juicio profesional independiente.",
          orden: 2
        },
        {
          id: "sec-1-3",
          titulo: "3. La 'deuda ética' en los despliegues acelerados",
          contenido:
            "Así como existe la deuda técnica por malas prácticas de arquitectura, la deuda ética surge cuando se omiten auditorías de sesgo, controles de privacidad o salvaguardas de seguridad para cumplir plazos de entrega apresurados. Salir a producción con fallas de seguridad conocidas deliberadamente es una falta ética grave.",
          orden: 3
        }
      ]
    },
    flashcards: [
      {
        id: "fc-1-1",
        moduloId: "modulo-1",
        categoria: "Código ACM/IEEE",
        pregunta: "¿Cuál es el primer principio fundamental del Código de Ética del Software de la ACM/IEEE?",
        respuesta:
          "PÚBLICO: Los ingenieros de software deberán actuar consistentemente con el interés público en todas sus decisiones técnicas."
      },
      {
        id: "fc-1-2",
        moduloId: "modulo-1",
        categoria: "Conceptos Clave",
        pregunta: "¿Qué diferencia existe entre una acción legal y una acción ética en desarrollo de software?",
        respuesta:
          "La ley marca el límite punitivo mínimo obligatorio, mientras que la ética exige reflexionar sobre el bien común, la justicia y el daño potencial aun cuando una práctica no esté explícitamente prohibida."
      },
      {
        id: "fc-1-3",
        moduloId: "modulo-1",
        categoria: "Responsabilidad",
        pregunta: "¿Qué prescribe el código si el empleador exige liberar un producto con fallas críticas que ponen en riesgo al usuario?",
        respuesta:
          "El profesional debe agotar las vías internas de comunicación técnica alertando del riesgo, rehusarse a validar el producto peligroso y, en caso extremo, ejercer la denuncia responsable (whistleblowing)."
      },
      {
        id: "fc-1-4",
        moduloId: "modulo-1",
        categoria: "Gobernanza",
        pregunta: "¿A qué se refiere el principio de 'Juicio Profesional' en software?",
        respuesta:
          "A mantener la integridad e independencia técnica frente a presiones comerciales, evitando validar especificaciones que vulneren la seguridad o derechos de los usuarios."
      }
    ],
    simulador: {
      id: "sim-mod-1",
      moduloId: "modulo-1",
      titulo: "El Dilema del Despliegue en Telemetría Médica (MediPulse)",
      contexto:
        "Eres el Tech Lead en MediPulse, una startup biomédica. El producto estelar es un monitor de signos vitales para pacientes ambulatorios que se comunica vía WebSocket con hospitales.",
      dilema:
        "A 36 horas del lanzamiento oficial comprometido con inversionistas, descubres una condición de carrera que bajo alto tráfico descarta el 3% de las alertas críticas de taquicardia. El Director de Producto te solicita no frenar el lanzamiento, argumentando que el tráfico inicial será bajo y podrán parcharlo en la versión 1.0.1 la próxima semana.",
      rolesInvolucrados: [
        "Tech Lead (Tú)",
        "Director de Producto (Presión comercial)",
        "Pacientes con afecciones cardíacas",
        "Hospitales y médicos tratantes"
      ],
      preguntasGuia: [
        "¿Cómo ponderas el riesgo a la vida humana frente al costo financiero del retraso?",
        "¿Qué principios del código de ética ACM vulneraría el lanzamiento según lo solicitado?",
        "¿Cuál es tu plan de acción constructivo para escalar la situación formalmente?"
      ]
    },
    cuestionario: {
      id: "cues-mod-1",
      moduloId: "modulo-1",
      titulo: "Evaluación Teórica: Principios y Deontología",
      descripcion: "Demuestra tu dominio sobre los códigos éticos profesionales. Requiere 70% para aprobar.",
      calificacionMinimaAprobatoria: 70,
      preguntas: [
        {
          id: "preg-1-1",
          cuestionarioId: "cues-mod-1",
          enunciado: "¿Cuál es la jerarquía ética correcta ante un conflicto entre las directivas del empleador y la seguridad pública?",
          opciones: [
            { id: "opt-1-1-a", texto: "La obediencia al empleador es prioritaria si el contrato contiene cláusulas de confidencialidad." },
            { id: "opt-1-1-b", texto: "El bienestar y seguridad del público prevalece sobre los intereses comerciales y del empleador." },
            { id: "opt-1-1-c", texto: "Ambas tienen el mismo peso y debe someterse a arbitraje legal antes de tomar postura." },
            { id: "opt-1-1-d", texto: "El programador debe desligarse de toda responsabilidad pues sólo sigue órdenes." }
          ],
          opcionCorrectaId: "opt-1-1-b",
          explicacion: "El Principio 1 de la ACM/IEEE estipula sin ambigüedad que el interés y seguridad pública están siempre por encima de cualquier interés comercial o patronal."
        },
        {
          id: "preg-1-2",
          cuestionarioId: "cues-mod-1",
          enunciado: "¿Qué define el principio de 'Colegas' en el código de ética?",
          opciones: [
            { id: "opt-1-2-a", texto: "Ocultar errores de los compañeros para fomentar la lealtad interna del equipo." },
            { id: "opt-1-2-b", texto: "Competir agresivamente por bonos sin importar desacreditar el trabajo de otros." },
            { id: "opt-1-2-c", texto: "Ser justo y comprensivo con los colegas, apoyar su desarrollo profesional y revisar su trabajo con objetividad y respeto." },
            { id: "opt-1-2-d", texto: "Aceptar sólo código de personas con las mismas credenciales universitarias." }
          ],
          opcionCorrectaId: "opt-1-2-c",
          explicacion: "El principio 7 (Colegas) exige trato justo, revisión constructiva y estímulo del crecimiento profesional mutuo."
        },
        {
          id: "preg-1-3",
          cuestionarioId: "cues-mod-1",
          enunciado: "Si un cliente te pide clonar la interfaz e ingeniería inversa de un software competidor con patente activa:",
          opciones: [
            { id: "opt-1-3-a", texto: "Debes aceptar si el cliente firma un deslinde de responsabilidad civil." },
            { id: "opt-1-3-b", texto: "Debes rechazarlo, pues vulnera los derechos de propiedad intelectual y los principios de integridad profesional." },
            { id: "opt-1-3-c", texto: "Es ético siempre que se cambien los colores y la tipografía en un 20%." },
            { id: "opt-1-3-d", texto: "Solo es indebido si el software original está registrado en tu mismo país." }
          ],
          opcionCorrectaId: "opt-1-3-b",
          explicacion: "El respeto a la propiedad intelectual y la honestidad técnica prohíben la apropiación indebida de obra ajena."
        },
        {
          id: "preg-1-4",
          cuestionarioId: "cues-mod-1",
          enunciado: "¿Qué se entiende por 'divulgación responsable' (Responsible Disclosure)?",
          opciones: [
            { id: "opt-1-4-a", texto: "Publicar en foros públicos una vulnerabilidad zero-day de inmediato para ganar notoriedad." },
            { id: "opt-1-4-b", texto: "Notificar en privado a la entidad afectada, otorgando un plazo razonable de remediación antes de cualquier revelación pública." },
            { id: "opt-1-4-c", texto: "Vender el exploit al mejor postor en mercados grises de seguridad." },
            { id: "opt-1-4-d", texto: "Ignorar la vulnerabilidad para evitar repercusiones legales." }
          ],
          opcionCorrectaId: "opt-1-4-b",
          explicacion: "La divulgación responsable busca proteger a los usuarios permitiendo a los creadores remediar el fallo antes de que actores maliciosos lo exploten."
        }
      ]
    }
  },
  {
    id: "modulo-2",
    numero: 2,
    titulo: "Privacidad, Protección de Datos y Vigilancia Digital",
    descripcion:
      "Analiza el marco normativo internacional (GDPR, LGPD, LFPDPPP), la privacidad por diseño (Privacy by Design) y los riesgos de la sobre-recolección de telemetría.",
    objetivos: [
      "Aplicar los 7 principios de Privacy by Design en la arquitectura de datos.",
      "Identificar bases legales y consentimiento explícito en el tratamiento de información.",
      "Evaluar riesgos de reidentificación y vigilancia masiva en sistemas modernos."
    ],
    planEstudio: [
      "1. Principios rectores del GDPR y legislaciones iberoamericanas",
      "2. Privacy by Design y Privacy by Default",
      "3. Técnicas de anonimización, seudonimización y privacidad diferencial",
      "4. Patrones oscuros (Dark Patterns) en la captura de consentimiento"
    ],
    duracionHoras: 5,
    estado: "bloqueado",
    simuladorCompletado: false,
    cuestionarioAprobado: false,
    leccion: {
      id: "lec-mod-2",
      moduloId: "modulo-2",
      titulo: "Privacidad por Diseño y Gobierno de Datos",
      descripcion: "De los conceptos legales a la ingeniería de software respetuosa del usuario.",
      duracionEstimadaMinutos: 30,
      completada: false,
      ultimaSeccionGuardada: 0,
      secciones: [
        {
          id: "sec-2-1",
          titulo: "1. Minimización de datos: menos es más seguro",
          contenido:
            "El principio de minimización de datos estipula que los sistemas deben recolectar únicamente los datos estrictamente necesarios para cumplir la finalidad legítima informada. Cualquier dato almacenado 'por si acaso' representa un vector de ataque y un pasivo legal.",
          orden: 1
        },
        {
          id: "sec-2-2",
          titulo: "2. Consentimiento libre, informado y revocable",
          contenido:
            "El consentimiento no puede obtenerse mediante casillas premarcadas, términos confusos ni condicionando el servicio esencial al otorgamiento de datos no relacionados. Además, debe ser tan sencillo revocar el consentimiento como lo fue otorgarlo.",
          orden: 2
        },
        {
          id: "sec-2-3",
          titulo: "3. Patrones oscuros (Dark Patterns)",
          contenido:
            "El diseño de interfaces que manipula o coacciona psicológicamente a los usuarios para entregar más datos personales o suscribirse a servicios no deseados constituye una grave infracción ética y legal creciente en las cortes mundiales.",
          orden: 3
        }
      ]
    },
    flashcards: [
      {
        id: "fc-2-1",
        moduloId: "modulo-2",
        categoria: "Privacy by Design",
        pregunta: "¿Qué significa el principio 'Proactivo, no reactivo; Preventivo, no correctivo'?",
        respuesta:
          "Anticipar y prevenir las violaciones a la privacidad desde la arquitectura misma del sistema antes de que ocurran, en lugar de parchar o mitigar tras una brecha de seguridad."
      },
      {
        id: "fc-2-2",
        moduloId: "modulo-2",
        categoria: "Técnicas",
        pregunta: "¿Cuál es la diferencia sustancial entre anonimización y seudonimización?",
        respuesta:
          "La anonimización es irreversible y desvincula totalmente al individuo (ya no se considera dato personal); la seudonimización permite reidentificar con información adicional separada."
      },
      {
        id: "fc-2-3",
        moduloId: "modulo-2",
        categoria: "Normativa",
        pregunta: "¿Qué es el derecho al olvido o derecho de supresión?",
        respuesta:
          "La facultad del titular de exigir la eliminación total de sus datos personales cuando hayan dejado de ser necesarios o se retire el consentimiento legítimo."
      }
    ],
    simulador: {
      id: "sim-mod-2",
      moduloId: "modulo-2",
      titulo: "El SDK de Telemetría 'Gratuito' (DataHarvest)",
      contexto:
        "Eres el arquitecto de una aplicación educativa para escuelas primarias y secundarias. La directiva busca monetizar o abaratar costos de infraestructura.",
      dilema:
        "El equipo comercial propone integrar un SDK analítico gratuito que ofrece paneles en tiempo real increíbles, pero en sus términos y condiciones de 80 páginas se autoriza a recopilar el identificador de publicidad del dispositivo, ubicación precisa y patrones de navegación para alimentar redes de anuncios programáticos de terceros.",
      rolesInvolucrados: [
        "Arquitecto de Software (Tú)",
        "Equipo de Finanzas/Comercial",
        "Menores de edad y sus tutores legales",
        "Autoridades regulatorias de protección a la niñez (COPPA/GDPR-K)"
      ],
      preguntasGuia: [
        "¿Cuáles son las implicaciones éticas y legales de monetizar con datos de menores?",
        "¿Cómo explicarías el concepto de 'Privacy by Default' a los líderes comerciales?",
        "¿Qué alternativa técnica viable propones para métricas sin comprometer la privacidad?"
      ]
    },
    cuestionario: {
      id: "cues-mod-2",
      moduloId: "modulo-2",
      titulo: "Evaluación: Privacidad y Normativas de Datos",
      descripcion: "Evalúa tu comprensión sobre GDPR, minimización y gobernanza de datos.",
      calificacionMinimaAprobatoria: 70,
      preguntas: [
        {
          id: "preg-2-1",
          cuestionarioId: "cues-mod-2",
          enunciado: "¿Cuál de las siguientes acciones viola el principio de Privacy by Default?",
          opciones: [
            { id: "opt-2-1-a", texto: "Desactivar por defecto el rastreo de ubicación hasta que el usuario lo active conscientemente." },
            { id: "opt-2-1-b", texto: "Tener casillas de consentimiento preseleccionadas al momento de registrar una cuenta." },
            { id: "opt-2-1-c", texto: "Cifrar la base de datos en reposo y en tránsito." },
            { id: "opt-2-1-d", texto: "Permitir al usuario descargar una copia de todos sus datos almacenados." }
          ],
          opcionCorrectaId: "opt-2-1-b",
          explicacion: "Las casillas preseleccionadas constituyen un patrón oscuro prohibido expresamente por legislaciones modernas como el GDPR."
        },
        {
          id: "preg-2-2",
          cuestionarioId: "cues-mod-2",
          enunciado: "El principio de minimización de datos exige que:",
          opciones: [
            { id: "opt-2-2-a", texto: "Se almacene el máximo de datos posible para futuros algoritmos de Machine Learning." },
            { id: "opt-2-2-b", texto: "Los datos se borren cada 24 horas sin excepción alguna." },
            { id: "opt-2-2-c", texto: "Solo se recaben los datos estrictamente adecuados, pertinentes y limitados a lo necesario para la finalidad del servicio." },
            { id: "opt-2-2-d", texto: "Se reduzca la resolución de las fotos de perfil." }
          ],
          opcionCorrectaId: "opt-2-2-c",
          explicacion: "Minimización significa no pedir ni retener datos que no sean indispensables para brindar la funcionalidad prometida."
        },
        {
          id: "preg-2-3",
          cuestionarioId: "cues-mod-2",
          enunciado: "¿Qué caracteriza a un 'Dark Pattern' en el contexto de privacidad?",
          opciones: [
            { id: "opt-2-3-a", texto: "Un modo de alto contraste para personas con debilidad visual." },
            { id: "opt-2-3-b", texto: "Una técnica de diseño intencional que manipula o engaña al usuario para que tome decisiones desfavorables para su privacidad." },
            { id: "opt-2-3-c", texto: "Un fallo imprevisto en la renderización de estilos CSS." },
            { id: "opt-2-3-d", texto: "Un protocolo de cifrado asimétrico anticuado." }
          ],
          opcionCorrectaId: "opt-2-3-b",
          explicacion: "Los patrones oscuros emplean sesgos cognitivos para inducir al usuario a autorizar cesiones de datos involuntarias."
        }
      ]
    }
  },
  {
    id: "modulo-3",
    numero: 3,
    titulo: "Sesgos Algorítmicos, Equidad e Inteligencia Artificial",
    descripcion:
      "Profundiza en las fuentes de sesgo en modelos predictivos, métricas de equidad (Fairness), explicabilidad (XAI) y auditorías de discriminación algorítmica.",
    objetivos: [
      "Identificar el sesgo histórico y de muestreo en conjuntos de datos de entrenamiento.",
      "Distinguir paridad demográfica, igualdad de oportunidades y calibración.",
      "Diseñar mecanismos de auditoría técnica y supervisión humana (Human-in-the-loop)."
    ],
    planEstudio: [
      "1. De dónde provienen los sesgos: datos, algoritmos y retroalimentación iterativa",
      "2. Métricas matemáticas de equidad algorítmica y sus compensaciones",
      "3. Explicabilidad, auditabilidad y transparencia en cajas negras",
      "4. Casos reales: Contratación automatizada, créditos bancarios y justicia penal"
    ],
    duracionHoras: 6,
    estado: "bloqueado",
    simuladorCompletado: false,
    cuestionarioAprobado: false,
    leccion: {
      id: "lec-mod-3",
      moduloId: "modulo-3",
      titulo: "Justicia Algorítmica y Supervisión de Modelos",
      descripcion: "Cómo evitar que los algoritmos automaticen y multipliquen injusticias históricas.",
      duracionEstimadaMinutos: 30,
      completada: false,
      ultimaSeccionGuardada: 0,
      secciones: [
        {
          id: "sec-3-1",
          titulo: "1. La falacia de la neutralidad de los datos",
          contenido:
            "Los datos de entrenamiento son un reflejo de la historia humana, con todos sus prejuicios, discriminaciones estructurales y omisiones. Un modelo que aprende ciegamente de contrataciones de los últimos 20 años reproducirá la subrepresentación de mujeres y minorías.",
          orden: 1
        },
        {
          id: "sec-3-2",
          titulo: "2. Atributos protegidos e inferencia por proxies",
          contenido:
            "Eliminar la variable de género o raza del modelo no basta. Los modelos de alto rendimiento encuentran rápidamente 'proxies' (código postal, historial de escuelas, palabras en el CV) que correlacionan fuertemente con el atributo protegido.",
          orden: 2
        },
        {
          id: "sec-3-3",
          titulo: "3. La necesidad del 'Human-in-the-loop'",
          contenido:
            "En decisiones de alto impacto que afecten derechos, libertades o medios de vida (salud, justicia penal, préstamos), el sistema debe ofrecer explicaciones comprensibles y la decisión final debe ser auditada por un humano calificado.",
          orden: 3
        }
      ]
    },
    flashcards: [
      {
        id: "fc-3-1",
        moduloId: "modulo-3",
        categoria: "Sesgo",
        pregunta: "¿Qué es una variable 'proxy' en el entrenamiento de modelos de Machine Learning?",
        respuesta:
          "Una variable en apariencia neutra (como el código postal o pasatiempos) que se correlaciona con atributos protegidos (raza, nivel socioeconómico), introduciendo discriminación indirecta."
      },
      {
        id: "fc-3-2",
        moduloId: "modulo-3",
        categoria: "Equidad",
        pregunta: "¿Qué plantea la 'Paridad Demográfica' como criterio de justicia?",
        respuesta:
          "Que la probabilidad de recibir un resultado positivo del modelo debe ser igual para todos los grupos demográficos protegidos, independientemente de la tasa base."
      },
      {
        id: "fc-3-3",
        moduloId: "modulo-3",
        categoria: "Explicabilidad",
        pregunta: "¿Por qué es crucial la explicabilidad (XAI) en sistemas de soporte a decisiones críticas?",
        respuesta:
          "Porque permite detectar razonamientos espurios, verificar el cumplimiento normativo y brindar a los afectados el derecho a impugnar una decisión."
      }
    ],
    simulador: {
      id: "sim-mod-3",
      moduloId: "modulo-3",
      titulo: "El Filtro Predictivo de Talento (TalentScan AI)",
      contexto:
        "Una corporación de retail contrata a tu equipo para construir un clasificador automático de currículums que preseleccione al 10% superior de candidatos.",
      dilema:
        "Durante la validación, descubres que el modelo penaliza a aspirantes provenientes de universidades públicas y descarta solicitudes que contienen la palabra 'asociación comunitaria' o nombres tradicionalmente indígenas, debido a que el historial de promociones de los últimos 15 años de la empresa favoreció a perfiles homogéneos.",
      rolesInvolucrados: [
        "Ingeniero de ML (Tú)",
        "Directora de Recursos Humanos",
        "Candidatos calificados de grupos subrepresentados",
        "Comité de Diversidad e Inclusión"
      ],
      preguntasGuia: [
        "¿Por qué el argumento de que 'el modelo sólo aprende de datos reales' es éticamente insostenible?",
        "¿Qué técnicas de preprocesamiento, in-processing o post-processing aplicarías?",
        "¿Recomendarías frenar la implementación o agregar una etapa de supervisión humana?"
      ]
    },
    cuestionario: {
      id: "cues-mod-3",
      moduloId: "modulo-3",
      titulo: "Evaluación: Equidad y Sesgos en Inteligencia Artificial",
      descripcion: "Verifica tu comprensión sobre justicia algorítmica y auditoría de modelos.",
      calificacionMinimaAprobatoria: 70,
      preguntas: [
        {
          id: "preg-3-1",
          cuestionarioId: "cues-mod-3",
          enunciado: "¿Por qué retirar un atributo protegido (ej. género) no garantiza la ausencia de sesgo en el modelo?",
          opciones: [
            { id: "opt-3-1-a", texto: "Porque el compilador automáticamente restaura la columna faltante." },
            { id: "opt-3-1-b", texto: "Porque otras variables neutras pueden actuar como 'proxies' altamente correlacionadas con el atributo protegido." },
            { id: "opt-3-1-c", texto: "Porque los modelos de red neuronal no leen datos tabulares." },
            { id: "opt-3-1-d", texto: "Solo es cierto si el tamaño de muestra es menor a 1,000 registros." }
          ],
          opcionCorrectaId: "opt-3-1-b",
          explicacion: "Las redes neuronales y árboles de decisión son excelentes detectando correlaciones implícitas en variables sustitutas como pasatiempos o ubicación."
        },
        {
          id: "preg-3-2",
          cuestionarioId: "cues-mod-3",
          enunciado: "En un sistema de otorgamiento de créditos, la igualdad de falsos positivos entre grupos garantiza:",
          opciones: [
            { id: "opt-3-2-a", texto: "Que personas solventes no sean denegadas con mayor tasa en un grupo que en otro." },
            { id: "opt-3-2-b", texto: "Que el banco obtenga las máximas utilidades posibles sin importar el riesgo." },
            { id: "opt-3-2-c", texto: "Que el algoritmo no necesite supervisión regulatoria." },
            { id: "opt-3-2-d", texto: "Que no existan préstamos incobrables." }
          ],
          opcionCorrectaId: "opt-3-2-a",
          explicacion: "Balancear las tasas de error es fundamental para evitar que un grupo sufra desproporcionadamente la denegación errónea de oportunidades."
        },
        {
          id: "preg-3-3",
          cuestionarioId: "cues-mod-3",
          enunciado: "¿Qué significa el enfoque 'Human-in-the-loop'?",
          opciones: [
            { id: "opt-3-3-a", texto: "Que los humanos programen sin usar frameworks modernos." },
            { id: "opt-3-3-b", texto: "Que en decisiones con consecuencias legales o vitales, una persona capacitada revise y tenga poder de veto sobre la predicción automatizada." },
            { id: "opt-3-3-c", texto: "Un bucle 'while' infinito en el hilo principal del servidor." },
            { id: "opt-3-3-d", texto: "Reemplazar a todo el personal con agentes autónomos." }
          ],
          opcionCorrectaId: "opt-3-3-b",
          explicacion: "Garantiza rendición de cuentas, empatía contextual y supervisión frente a casos atípicos o fallos de generalización."
        }
      ]
    }
  },
  {
    id: "modulo-4",
    numero: 4,
    titulo: "Ciberseguridad Ética, Hackeo Defensivo y Responsabilidad Legal",
    descripcion:
      "Explora el marco jurídico de delitos informáticos, divulgación coordinada de vulnerabilidades, pruebas de intrusión éticas y la protección de infraestructuras críticas.",
    objetivos: [
      "Distinguir hacking ético de intrusión no autorizada según los marcos jurídicos.",
      "Dominar las pautas de divulgación coordinada (Coordinated Vulnerability Disclosure).",
      "Evaluar la responsabilidad legal ante brechas y fuga de secretos de infraestructura."
    ],
    planEstudio: [
      "1. Legislación en ciberdelitos (Convenio de Budapest y legislaciones locales)",
      "2. Hacking ético, contratos de autorización previa y alcance de pruebas",
      "3. Programas de Bug Bounty y políticas de Safe Harbor para investigadores",
      "4. Negligencia técnica y responsabilidad civil/penal en fugas de credenciales"
    ],
    duracionHoras: 5,
    estado: "bloqueado",
    simuladorCompletado: false,
    cuestionarioAprobado: false,
    leccion: {
      id: "lec-mod-4",
      moduloId: "modulo-4",
      titulo: "Límites Legales y Éticos en Seguridad Ofensiva",
      descripcion: "Cómo investigar y reportar fallos de seguridad dentro de la legalidad estricta.",
      duracionEstimadaMinutos: 25,
      completada: false,
      ultimaSeccionGuardada: 0,
      secciones: [
        {
          id: "sec-4-1",
          titulo: "1. La línea entre curiosidad e intrusión no consentida",
          contenido:
            "Bajo el Convenio de Budapest y la mayoría de códigos penales, acceder o permanecer en un sistema sin autorización expresa de su propietario constituye delito, sin importar que la intención del investigador haya sido 'solo avisar'.",
          orden: 1
        },
        {
          id: "sec-4-2",
          titulo: "2. Safe Harbor y acuerdos de Bug Bounty",
          contenido:
            "Los programas formales de recompensas por errores establecen reglas de compromiso claras. Mientras el investigador actúe dentro del alcance (in-scope) y no altere datos ni interrumpa el servicio, goza de inmunidad legal acordada.",
          orden: 2
        },
        {
          id: "sec-4-3",
          titulo: "3. La custodia de credenciales y secretos de producción",
          contenido:
            "Dejar llaves API maestras o certificados en repositorios públicos en GitHub por descuido no es solo torpeza técnica: ante una filtración de datos de usuarios puede derivar en responsabilidad civil por negligencia grave.",
          orden: 3
        }
      ]
    },
    flashcards: [
      {
        id: "fc-4-1",
        moduloId: "modulo-4",
        categoria: "Marco Legal",
        pregunta: "¿Qué elemento es indispensable para que una prueba de penetración sea legal?",
        respuesta:
          "Consentimiento explícito, formal y documentado por escrito por parte del titular legítimo de la infraestructura antes de ejecutar cualquier escaneo o ataque."
      },
      {
        id: "fc-4-2",
        moduloId: "modulo-4",
        categoria: "Investigación",
        pregunta: "¿Qué es la 'Prueba de Concepto Mínima' (Minimal PoC)?",
        respuesta:
          "Demostrar la existencia de la falla con la menor intrusión posible, sin exfiltrar bases de datos enteras ni alterar registros productivos."
      },
      {
        id: "fc-4-3",
        moduloId: "modulo-4",
        categoria: "Ética",
        pregunta: "¿Por qué no se debe exigir dinero a cambio de reportar un fallo de seguridad si no hay un programa de Bug Bounty previo?",
        respuesta:
          "Porque legalmente se clasifica como extorsión informática y coacción, anulando cualquier postura de buena fe del investigador."
      }
    ],
    simulador: {
      id: "sim-mod-4",
      moduloId: "modulo-4",
      titulo: "El Puerto Expuesto del Servicio Municipal de Agua",
      contexto:
        "Mientras investigas la seguridad de dispositivos IoT en tu ciudad para tu tesis de maestría, descubres una IP pública con un panel SCADA de bombeo de agua municipal sin contraseña de acceso.",
      dilema:
        "Uno de tus compañeros sugiere publicar la captura en Twitter etiquetando al alcalde para obligarlos a cerrarlo de inmediato, mientras que otro sugiere usar un exploit para descargar los logs y demostrar que cualquiera pudo manipular los niveles de cloro.",
      rolesInvolucrados: [
        "Investigador Ético (Tú)",
        "Autoridad Municipal y Equipo de TI",
        "Población que consume agua potable",
        "Equipo de Respuesta a Incidentes (CERT Nacional)"
      ],
      preguntasGuia: [
        "¿Cuáles son los riesgos vitales de publicar un fallo crítico en redes sociales antes de que sea parchado?",
        "¿Cómo formular un reporte confidencial ante el CERT competente?",
        "¿Hasta qué punto explorar el panel sin cruzar la línea de delito informático?"
      ]
    },
    cuestionario: {
      id: "cues-mod-4",
      moduloId: "modulo-4",
      titulo: "Evaluación: Ciberseguridad y Normatividad Jurídica",
      descripcion: "Evalúa tus conocimientos sobre delitos informáticos y divulgación ética.",
      calificacionMinimaAprobatoria: 70,
      preguntas: [
        {
          id: "preg-4-1",
          cuestionarioId: "cues-mod-4",
          enunciado: "¿Qué diferencia al hacking ético del ciberdelito según la legislación penal?",
          opciones: [
            { id: "opt-4-1-a", texto: "El tipo de herramientas de software que se utilizan." },
            { id: "opt-4-1-b", texto: "La autorización legal previa y por escrito del dueño del sistema sobre el alcance de las pruebas." },
            { id: "opt-4-1-c", texto: "Si se realiza de noche o de día." },
            { id: "opt-4-1-d", texto: "El salario de quien realiza la prueba." }
          ],
          opcionCorrectaId: "opt-4-1-b",
          explicacion: "Sin autorización expresa del propietario, cualquier acceso o sondeo vulnera la legislación penal."
        },
        {
          id: "preg-4-2",
          cuestionarioId: "cues-mod-4",
          enunciado: "Si encuentras una inyección SQL en la base de un banco comercial, ¿cuál es el procedimiento ético?",
          opciones: [
            { id: "opt-4-2-a", texto: "Descargar los registros de las cuentas más ricas para demostrar que el impacto es real." },
            { id: "opt-4-2-b", texto: "Detener la prueba al comprobar la inyección, documentar el PoC mínimo y canalizarlo por el canal oficial de seguridad del banco." },
            { id: "opt-4-2-c", texto: "Amenazar con vender la información si no contratan tu consultora." },
            { id: "opt-4-2-d", texto: "Instalar una puerta trasera para monitorear si alguien más lo descubre." }
          ],
          opcionCorrectaId: "opt-4-2-b",
          explicacion: "El investigador ético demuestra la vulnerabilidad mínimamente sin extraer datos personales de terceros ni alterar servicios."
        },
        {
          id: "preg-4-3",
          cuestionarioId: "cues-mod-4",
          enunciado: "¿Qué garantiza una cláusula 'Safe Harbor' en un programa de Bug Bounty?",
          opciones: [
            { id: "opt-4-3-a", texto: "Que la empresa pagará como mínimo 10,000 USD por cualquier reporte." },
            { id: "opt-4-3-b", texto: "El compromiso de no emprender acciones legales contra los investigadores que respeten los términos y reglas del programa." },
            { id: "opt-4-3-c", texto: "El derecho a piratear licencias de software propietario." },
            { id: "opt-4-3-d", texto: "Inmunidad ante cualquier delito fuera del ámbito informático." }
          ],
          opcionCorrectaId: "opt-4-3-b",
          explicacion: "Brinda certidumbre jurídica al investigador de buena fe que respeta los límites establecidos."
        }
      ]
    }
  },
  {
    id: "modulo-5",
    numero: 5,
    titulo: "Propiedad Intelectual, Licenciamiento Open Source y Sostenibilidad",
    descripcion:
      "Domina los regímenes de licencias de software (GPL, MIT, Apache 2.0), patentes de software, derechos de autor en la era de la IA generativa y la huella ecológica digital.",
    objetivos: [
      "Distinguir licencias permisivas (MIT, BSD) de licencias con copyleft fuerte (GPL, AGPL).",
      "Gestionar la conformidad de licencias en la cadena de suministro de dependencias (SBOM).",
      "Evaluar la sostenibilidad ambiental y huella de carbono de arquitecturas de software."
    ],
    planEstudio: [
      "1. Derechos de autor (Copyright) vs. Copyleft: Filosofía y mecánicas legales",
      "2. Análisis de licencias virales y su impacto en proyectos cerrados y en la nube (AGPL)",
      "3. Propiedad intelectual y código generado por modelos de IA (Copilot, Codex)",
      "4. Green Computing: Eficiencia energética y responsabilidad ecológica en centros de datos"
    ],
    duracionHoras: 5,
    estado: "bloqueado",
    simuladorCompletado: false,
    cuestionarioAprobado: false,
    leccion: {
      id: "lec-mod-5",
      moduloId: "modulo-5",
      titulo: "Licenciamiento, Código Abierto y Green Computing",
      descripcion: "Deberes de atribución, reciprocidad legal y el impacto ecológico de la computación.",
      duracionEstimadaMinutos: 30,
      completada: false,
      ultimaSeccionGuardada: 0,
      secciones: [
        {
          id: "sec-5-1",
          titulo: "1. La trampa del copyleft no intencionado",
          contenido:
            "Incorporar una biblioteca bajo licencia GPLv3 en un software propietario que se distribuye a clientes obliga legalmente a licenciar la totalidad de la obra derivada bajo GPLv3 y liberar el código fuente completo.",
          orden: 1
        },
        {
          id: "sec-5-2",
          titulo: "2. Licencias en la era SaaS: La Affero GPL (AGPL)",
          contenido:
            "Para evitar que proveedores de la nube consuman software copyleft sin devolver mejoras ofreciéndolo como servicio en red sin 'distribución física', nació la AGPL, que exige poner a disposición el código fuente a usuarios que interactúan vía red.",
          orden: 2
        },
        {
          id: "sec-5-3",
          titulo: "3. Responsabilidad ambiental y Green Software",
          contenido:
            "El entrenamiento de modelos gigantescos y la ejecución ineficiente de microservicios consume gigawatts de electricidad. Diseñar software eficiente no solo optimiza costos: reduce las emisiones de carbono globales de la industria digital.",
          orden: 3
        }
      ]
    },
    flashcards: [
      {
        id: "fc-5-1",
        moduloId: "modulo-5",
        categoria: "Licencias",
        pregunta: "¿Qué diferencia sustancial existe entre la licencia MIT y la GNU GPL v3?",
        respuesta:
          "MIT es permisiva (permite incorporar el código en proyectos comerciales cerrados manteniendo atribución); GPLv3 es recíproca/copyleft (exige que cualquier obra derivada sea también abierta bajo GPL)."
      },
      {
        id: "fc-5-2",
        moduloId: "modulo-5",
        categoria: "Cloud / SaaS",
        pregunta: "¿Por qué se diseñó la licencia GNU AGPL (Affero GPL)?",
        respuesta:
          "Para cerrar el vacío legal de la nube: obliga a compartir el código fuente a quienes interactúan con el software a través de una red informática (SaaS)."
      },
      {
        id: "fc-5-3",
        moduloId: "modulo-5",
        categoria: "Green IT",
        pregunta: "¿Qué es el 'Green Software' o ingeniería de software sostenible?",
        respuesta:
          "La disciplina de concebir arquitecturas, algoritmos y patrones de infraestructura que minimicen el consumo eléctrico y la emisión de gases de efecto invernadero."
      }
    ],
    simulador: {
      id: "sim-mod-5",
      moduloId: "modulo-5",
      titulo: "El Algoritmo de Compresión AGPL en la Nube Bancaria",
      contexto:
        "Trabajas como desarrollador principal en una pasarela de pagos fintech. Tienen problemas de latencia crítica en la sincronización de transacciones distribuidas.",
      dilema:
        "Un ingeniero junior integró una biblioteca de sincronización hiperrápida que resolvió el cuello de botella. Tras revisar la licencia previa al lanzamiento a bolsa, descubres que la biblioteca está bajo GNU AGPLv3. El director de tecnología pide 'no decir nada' porque el software corre en servidores privados y ningún cliente descarga binarios directamente.",
      rolesInvolucrados: [
        "Tech Lead (Tú)",
        "Director de Tecnología (CTO)",
        "Abogados corporativos y auditores de salida a bolsa",
        "Comunidad creadora de la biblioteca Open Source"
      ],
      preguntasGuia: [
        "¿Por qué la afirmación del CTO desconoce la naturaleza específica de la licencia AGPL?",
        "¿Cuáles son los riesgos legales, reputacionales y financieros si la empresa es auditada?",
        "¿Qué alternativas técnicas existen (reemplazo por librería MIT/Apache o compra de licencia comercial)?"
      ]
    },
    cuestionario: {
      id: "cues-mod-5",
      moduloId: "modulo-5",
      titulo: "Evaluación: Propiedad Intelectual y Sostenibilidad",
      descripcion: "Pon a prueba tu conocimiento sobre licencias, SBOM y Green Computing.",
      calificacionMinimaAprobatoria: 70,
      preguntas: [
        {
          id: "preg-5-1",
          cuestionarioId: "cues-mod-5",
          enunciado: "Si utilizas una biblioteca bajo licencia MIT en un producto comercial cerrado, ¿qué requisito legal debes cumplir obligatoriamente?",
          opciones: [
            { id: "opt-5-1-a", texto: "Liberar todo el código de tu producto en un repositorio público." },
            { id: "opt-5-1-b", texto: "Incluir el aviso de copyright original y la declaración de licencia MIT en tu documentación o distribución." },
            { id: "opt-5-1-c", texto: "Pagar una regalía del 5% al autor original." },
            { id: "opt-5-1-d", texto: "No se requiere absolutamente nada." }
          ],
          opcionCorrectaId: "opt-5-1-b",
          explicacion: "La licencia MIT es muy permisiva pero exige siempre conservar el aviso de copyright y la concesión de licencia en las copias sustanciales."
        },
        {
          id: "preg-5-2",
          cuestionarioId: "cues-mod-5",
          enunciado: "¿Cuál es el propósito primordial de un SBOM (Software Bill of Materials)?",
          opciones: [
            { id: "opt-5-2-a", texto: "Calcular el salario de los programadores de acuerdo a líneas de código." },
            { id: "opt-5-2-b", texto: "Contar con un inventario formal y verificable de todas las dependencias, licencias y versiones de terceros que componen el software." },
            { id: "opt-5-2-c", texto: "Un archivo de configuración para servidores Kubernetes." },
            { id: "opt-5-2-d", texto: "Un formato de base de datos de clave-valor." }
          ],
          opcionCorrectaId: "opt-5-2-b",
          explicacion: "El SBOM permite auditorías de seguridad (CVEs) y verificación estricta de cumplimiento de licencias en la cadena de suministro."
        },
        {
          id: "preg-5-3",
          cuestionarioId: "cues-mod-5",
          enunciado: "¿Cuál de las siguientes decisiones de ingeniería contribuye directamente a la sostenibilidad ecológica (Green Computing)?",
          opciones: [
            { id: "opt-5-3-a", texto: "Optimizar algoritmos para reducir ciclos de CPU innecesarios y escalar instancias solo ante demanda real." },
            { id: "opt-5-3-b", texto: "Mantener servidores encendidos al 100% las 24 horas por si surge tráfico imprevisto." },
            { id: "opt-5-3-c", texto: "Entrenar modelos de lenguaje desde cero todos los días sin usar pesos preentrenados." },
            { id: "opt-5-3-d", texto: "Desactivar la compresión de datos en redes." }
          ],
          opcionCorrectaId: "opt-5-3-a",
          explicacion: "La optimización algorítmica y el autoescalado eficiente reducen de manera cuantificable el gasto de electricidad y emisiones de carbono asociadas."
        }
      ]
    }
  }
];

export const EXAMEN_FINAL_SEMILLA: ExamenFinal = {
  id: "examen-final-global",
  titulo: "Examen Final Integrador de Ética y Legislación en Software",
  descripcion:
    "Evaluación comprensiva que abarca los 5 módulos formativos de Lethics. Requiere al menos 70% de aciertos para obtener la constancia y acreditación del curso.",
  calificacionMinimaAprobatoria: 70,
  preguntas: [
    {
      id: "ef-1",
      moduloOrigenNumero: 1,
      enunciado: "Ante un requerimiento urgente de dirección para ocultar un fallo de ciberseguridad que expone datos sensibles de clientes, la postura deontológica correcta del ingeniero es:",
      opciones: [
        { id: "ef-1-a", texto: "Cumplir la orden para proteger la confidencialidad corporativa y no ser despedido." },
        { id: "ef-1-b", texto: "Rehusarse a ocultar la brecha, documentar el riesgo de forma formal y exigir la notificación a los afectados conforme a la ley y al principio de interés público." },
        { id: "ef-1-c", texto: "Renunciar inmediatamente sin emitir ningún reporte ni registro." },
        { id: "ef-1-d", texto: "Publicar contraseñas de los directivos en foros públicos." }
      ],
      opcionCorrectaId: "ef-1-b",
      explicacion: "El código de ética antepone el bienestar y derecho de las personas por encima de las presiones corporativas."
    },
    {
      id: "ef-2",
      moduloOrigenNumero: 2,
      enunciado: "El principio de 'Privacidad por Defecto' (Privacy by Default) exige que:",
      opciones: [
        { id: "ef-2-a", texto: "El usuario deba desmarcar manualmente 20 casillas para evitar que sus datos se compartan." },
        { id: "ef-2-b", texto: "La configuración inicial del sistema aplique la máxima restricción de recolección y exposición de datos sin que el usuario tenga que intervenir." },
        { id: "ef-2-c", texto: "Los datos se envíen cifrados únicamente los fines de semana." },
        { id: "ef-2-d", texto: "La política de privacidad tenga más de 100 páginas técnicas." }
      ],
      opcionCorrectaId: "ef-2-b",
      explicacion: "Privacy by Default garantiza la protección pasiva: por defecto la privacidad es estricta."
    },
    {
      id: "ef-3",
      moduloOrigenNumero: 3,
      enunciado: "¿Por qué un modelo de IA puede incurrir en discriminación algorítmica aun cuando los datos de entrenamiento se hayan anonimizado?",
      opciones: [
        { id: "ef-3-a", texto: "Porque las variables correlacionadas (proxies) retienen la información del grupo protegido." },
        { id: "ef-3-b", texto: "Porque las CPUs no soportan operaciones éticas." },
        { id: "ef-3-c", texto: "Porque la anonimización borra la memoria del servidor." },
        { id: "ef-3-d", texto: "Solo ocurre si se utiliza Python." }
      ],
      opcionCorrectaId: "ef-3-a",
      explicacion: "Variables como consumo, léxico o geolocalización reconstruyen perfiles demográficos implícitamente."
    },
    {
      id: "ef-4",
      moduloOrigenNumero: 4,
      enunciado: "¿Qué diferencia medular existe entre una prueba de penetración autorizada y un delito de acceso ilícito?",
      opciones: [
        { id: "ef-4-a", texto: "El sistema operativo utilizado por el atacante." },
        { id: "ef-4-b", texto: "La existencia de un contrato escrito con consentimiento previo, alcance delimitado y ventanas de tiempo autorizadas." },
        { id: "ef-4-c", texto: "Que el tester use VPN." },
        { id: "ef-4-d", texto: "No existe ninguna diferencia ante la ley." }
      ],
      opcionCorrectaId: "ef-4-b",
      explicacion: "El consentimiento documentado del titular es la piedra angular que legitima el análisis de seguridad."
    },
    {
      id: "ef-5",
      moduloOrigenNumero: 5,
      enunciado: "Si una empresa desarrolla un SaaS consumido por millones vía web utilizando una librería bajo GNU AGPLv3 modificada internamente, la empresa está obligada a:",
      opciones: [
        { id: "ef-5-a", texto: "Pagar una suscripción anual a la Free Software Foundation." },
        { id: "ef-5-b", texto: "Poner a disposición de los usuarios de la red el código fuente completo correspondiente y sus modificaciones bajo la misma licencia." },
        { id: "ef-5-c", texto: "Cerrar su servicio inmediatamente." },
        { id: "ef-5-d", texto: "No tiene obligación alguna pues no distribuyó instaladores binarios." }
      ],
      opcionCorrectaId: "ef-5-b",
      explicacion: "La AGPL fue creada expresamente para obligar a liberar el código cuando se presta un servicio de red (SaaS)."
    }
  ]
};

export const INTENTOS_INICIALES_MOCK: IntentoCuestionario[] = [
  {
    id: "intento-semilla-01",
    cuestionarioId: "cues-mod-1",
    moduloId: "modulo-1",
    usuarioId: "usr_estudiante_01",
    calificacion: 75,
    aprobado: true,
    respuestasUsuario: {
      "preg-1-1": "opt-1-1-b",
      "preg-1-2": "opt-1-2-c",
      "preg-1-3": "opt-1-3-b",
      "preg-1-4": "opt-1-4-a"
    },
    fecha: "2026-11-15T16:30:00Z",
    totalPreguntas: 4,
    aciertos: 3
  }
];
