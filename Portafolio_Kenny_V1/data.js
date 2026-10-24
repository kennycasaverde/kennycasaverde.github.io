/*
  ARCHIVO DE CONTENIDO — PORTAFOLIO KENNY V1.0
  Edita aquí textos y agrega evidencias siguiendo README.md.
  No elimines comas, llaves o corchetes sin revisar la sintaxis.
*/
window.PORTFOLIO_DATA = {
  profile: {
    name: "Kenny Alexis Casaverde Sosa",
    email: "kennycasaverde@gmail.com",
    linkedin: "https://www.linkedin.com/in/kennycasaverde/",
    youtube: "https://www.youtube.com/@KennyCasaverde",
    companiesUrl: "", // PON AQUÍ EL LINK DE "EMPRESAS" CUANDO LO TENGAS.
    cvFile: "assets/CV_Kenny_Casaverde_Publico.pdf"
  },

  experiences: [
    {
      id: "chancay",
      position: "Gestor de Flota",
      organization: "Equipo de Ingeniería Internacional Suramérica S.A.C.",
      context: "Centro de Control · Terminal Portuario de Chancay",
      period: "Octubre 2025 — Actualidad",
      dateFrom: "2025-10",
      current: true,
      summary: "Supervisión de vehículos autónomos y coordinación de incidencias técnicas y operativas en un entorno portuario automatizado.",
      responsibilities: [
        "Supervisión y monitoreo en tiempo real de vehículos autónomos (DCV / stackers) mediante FMS y VMP.",
        "Conducción remota de vehículos autónomos para atender problemas de tránsito.",
        "Seguimiento, diagnóstico y gestión de incidencias técnicas y operativas.",
        "Identificación y aislamiento de fallas de hardware y software; priorización y escalamiento de problemas.",
        "Coordinación con las áreas operativas y los equipos de soporte en campo."
      ],
      achievement: "Coordinación de la resolución de bloqueos de tránsito ocasionados por fallas técnicas imprevistas, junto con el equipo de soporte en campo.",
      tags: ["FMS / VMP", "DCV", "Diagnóstico técnico", "Operaciones automatizadas"],
      evidence: [
        // EJEMPLOS (NO PUBLICADOS): descomenta y reemplaza con TUS ARCHIVOS AUTORIZADOS.
        // {type: "image", src: "assets/evidencias/chancay/imagen-01.jpg", title: "Actividad profesional", description: "Descripción sin datos internos"},
        // {type: "youtube", url: "https://www.youtube.com/watch?v=ID_DEL_VIDEO", title: "Demostración autorizada"},
        // {type: "pdf", src: "assets/evidencias/chancay/constancia.pdf", title: "Constancia laboral"}
      ]
    },
    {
      id: "geoingenieros",
      position: "Asesor Comercial",
      organization: "Geoingenieros Consultores S.A.C.",
      context: "Equipos industriales de topografía · Sector público y privado",
      period: "2023 — 2025",
      dateFrom: "2023",
      current: false,
      summary: "Asesoría comercial especializada en equipos de topografía, gestión de licitaciones y atención a clientes corporativos.",
      responsibilities: [
        "Comercialización de equipos industriales de topografía.",
        "Gestión de procesos de licitación y ventas al Estado.",
        "Negociación y seguimiento de oportunidades con clientes corporativos.",
        "Desarrollo de estrategias de marketing y campañas comerciales."
      ],
      achievement: "Participación en la captación de clientes y el desarrollo comercial de equipos especializados.",
      tags: ["Equipos topográficos", "Licitaciones", "Ventas B2B", "Gestión comercial"],
      evidence: [
        // {type: "image", src: "assets/evidencias/geoingenieros/evento.jpg", title: "Participación en actividad comercial"}
      ]
    },
    {
      id: "artesco",
      position: "Asistente de Extrusión",
      organization: "Artesco S.A.",
      context: "Producción industrial · Proceso de extrusión",
      period: "2022",
      dateFrom: "2022",
      current: false,
      summary: "Apoyo en operaciones del proceso productivo, preparación de insumos y controles de calidad y seguridad.",
      responsibilities: [
        "Preparación y dosificación de insumos químicos utilizados en extrusión.",
        "Control de calidad durante el proceso productivo.",
        "Aplicación de normas de seguridad industrial en el área de producción."
      ],
      achievement: "Experiencia práctica en procesos de producción, control de materiales y estándares de seguridad.",
      tags: ["Manufactura", "Control de calidad", "Extrusión", "Seguridad industrial"],
      evidence: [
        // {type: "image", src: "assets/evidencias/artesco/produccion.jpg", title: "Actividad de producción"}
      ]
    }
  ],

  education: [
    {
      label: "Formación universitaria",
      title: "Ingeniería Electrónica",
      institution: "Universidad Tecnológica del Perú",
      period: "En curso",
      description: "Estudios en circuitos eléctricos y electrónicos, electrónica digital, microcontroladores y fundamentos de automatización."
    },
    {
      label: "Formación complementaria",
      title: "Programación en C para Microcontroladores",
      institution: "Udemy",
      period: "2025",
      description: "Formación en programación C aplicada al trabajo con microcontroladores."
    },
    {
      label: "Idiomas",
      title: "Inglés intermedio",
      institution: "Centro de Idiomas USMP",
      period: "2019",
      description: "Estudios de inglés de nivel intermedio."
    }
  ],

  skills: [
    {title: "Operaciones y sistemas", items: ["Monitoreo de flotas", "FMS y VMP", "Vehículos autónomos DCV", "Diagnóstico de incidencias"]},
    {title: "Electrónica y programación", items: ["Microcontroladores", "Programación", "Circuitos DC/AC", "Lógica digital"]},
    {title: "Gestión profesional", items: ["Excel avanzado", "Coordinación operativa", "Resolución de problemas", "Trabajo interdisciplinario"]}
  ],

  certifications: [
    // AGREGA AQUÍ CERTIFICADOS CONFIRMADOS, CON ARCHIVO O ENLACE DE VALIDACIÓN.
    // {title: "Nombre del certificado", issuer: "Institución", year: "2026", url: "assets/certificados/certificado.pdf"}
  ]
};
