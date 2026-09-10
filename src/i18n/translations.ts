// ============================================================
// ATOFFICE — Textos bilingües (EN / ES)
// Fuente única de verdad para todo el copy del sitio que existe
// en dos idiomas. La home en inglés es la versión principal
// (atoffice.es) y la española vive bajo /es/*.
//
// Para añadir/editar texto: solo hay que tocar este archivo,
// nunca los componentes ni las páginas.
// ============================================================

export type Lang = 'en' | 'es';

// ---------- Home ----------

export const homeManifesto: Record<Lang, string> = {
  en: `AToffice architecture through thoughtful design, creating spaces that
    balance aesthetics, function, and context. With experience across
    residential, commercial, and hospitality projects, we develop architecture
    that responds to people, place, and purpose. We collaborate closely with
    clients, consultants, and builders to deliver timeless, practical, and
    enduring environments.`,
  es: `En AToffice entendemos la arquitectura como un proceso de diseño
    reflexivo, creando espacios que equilibran estética, función y contexto.
    Con experiencia en proyectos residenciales, comerciales y hosteleros,
    desarrollamos una arquitectura que responde a las personas, al lugar y al
    propósito. Colaboramos estrechamente con clientes, consultores y
    constructoras para ofrecer entornos atemporales, prácticos y duraderos.`,
};

// ---------- Info: About / Servicios / Proceso ----------

type Service = { title: string; body: string };

type InfoContent = {
  aboutLabel: string;
  aboutText: string;
  servicesLabel: string;
  services: Service[];
  processLabel: string;
  processText: string;
};

export const infoContent: Record<Lang, InfoContent> = {
  en: {
    aboutLabel: 'About',
    aboutText:
      'Our approach is built on crossing disciplines and references without hierarchy: the technical and the cultural, the domestic and the urban, detail and strategy. We seek to identify connections, simplify complexity, and find a specific language for each project, without repeating formulas.',
    servicesLabel: 'Services',
    services: [
      {
        title: 'Technical Consulting and feasibility studies',
        body: 'Urban development feasibility: planning parameters, real buildable area, regulatory constraints, and protected status assessment. Construction cost estimation by use, location, and market conditions. Investment return analysis across different development scenarios. Technical due diligence for land or building acquisition.',
      },
      {
        title: 'Architecture & Interior Design',
        body: 'New-build, refurbishment, and renovation. Interior design. Intervention in protected buildings.',
      },
      {
        title: 'License & Permit Management',
        body: 'Drafting of technical documentation required for permit applications: basic project, execution project, and supporting reports: heritage, environmental, utilities, and infrastructure. Full permit preparation and processing, municipal and regional authorities. Fees, taxes, and administrative documentation management.',
      },
      {
        title: 'Construction Management',
        body: 'On-site supervision and quality control as construction director. Budget tracking, contractor liaison, and certification through to handover.',
      },
    ],
    processLabel: 'Process',
    processText:
      'Every project starts from two mutually dependent fronts. First, a reading of the site: its visible and invisible rules, its scale, light, memory, and boundaries. Second, a genuine understanding of the brief: how people live, what the space needs to provide, what tensions exist, and what opportunities arise. From there, we develop a project idea that goes beyond gesture, one that organizes the whole and guides the work through to completion.',
  },
  es: {
    aboutLabel: 'Estudio',
    aboutText:
      'Nuestro enfoque se basa en combinar disciplinas y referencias sin establecer jerarquías: lo técnico y lo cultural, lo doméstico y lo urbano, el detalle y la estrategia. Buscamos identificar conexiones, simplificar la complejidad y encontrar un lenguaje propio para cada proyecto, evitando repetir fórmulas.',
    servicesLabel: 'Servicios',
    services: [
      {
        title: 'Consultoría técnica y viabilidad',
        body: 'Viabilidad urbanística: planeamiento, edificabilidad real, condicionantes, normativa y grado de protección. Estimación de costes según uso, ubicación y mercado. Rentabilidad de la inversión en distintos escenarios. Due diligence técnica para compra de suelo o edificio.',
      },
      {
        title: 'Proyecto de arquitectura e interiorismo',
        body: 'Obra nueva, rehabilitación y reforma. Interiorismo. Intervención en edificios protegidos.',
      },
      {
        title: 'Licencias y permisos',
        body: 'Documentación técnica: proyecto básico, de ejecución e informes de patrimonio, medioambiente, suministros e infraestructuras. Tramitación integral ante administraciones municipales y autonómicas. Tasas, impuestos y documentación administrativa.',
      },
      {
        title: 'Dirección de obra',
        body: 'Dirección facultativa, supervisión y control de calidad. Seguimiento presupuestario, coordinación con contratistas y certificación hasta la entrega.',
      },
    ],
    processLabel: 'Proceso',
    processText:
      'Todo proyecto parte de dos dimensiones interdependientes. La primera es la lectura del lugar: sus reglas visibles e invisibles, su escala, su luz, su memoria y sus límites. La segunda es una comprensión profunda del encargo: cómo viven las personas, qué debe ofrecer el espacio, qué tensiones existen y qué oportunidades surgen. A partir de ahí, desarrollamos una idea de proyecto que trasciende el gesto formal: una idea capaz de articular el conjunto y guiar todo el proceso hasta su materialización.',
  },
};

// ---------- Contact panel ----------

export const contactContent: Record<
  Lang,
  { intro: string[]; emailLabel: string }
> = {
  en: {
    intro: [
      'Thank you for considering ATOFFICE for your project.',
      "We work with clients who value a rigorous process and are committed to the best possible outcome — regardless of project scale.",
      'Our work is structured around the specific demands of each project, which allows us to adapt the scope to your budget. To help us assess the commission, please share an overview of the project, its location, its current stage, the budget range, and what you are looking for from us.',
    ],
    emailLabel: 'for collaborations, enquiries, or info —',
  },
  es: {
    intro: [
      'Gracias por contar con ATOFFICE para tu proyecto.',
      'Trabajamos con clientes que valoran un proceso riguroso y que quieren llegar al mejor resultado, sea cual sea la escala del encargo.',
      'Nuestro trabajo se estructura en función de cada proyecto, tenemos flexibilidad para adaptar el trabajo a cada presupuesto. Para poder valorar el encargo, cuéntanos en qué consiste el proyecto, dónde está, en qué fase se encuentra, qué presupuesto manejas y qué necesitas de nosotras.',
    ],
    emailLabel: 'Para colaboraciones, consultas o información —',
  },
};

// ---------- Works: labels y traducción de datos de proyecto ----------

export const worksLabels: Record<
  Lang,
  { type: string; location: string; year: string; client: string; phase: string; close: string }
> = {
  en: { type: 'Type', location: 'Location', year: 'Year', client: 'Client', phase: 'Phase', close: 'Close' },
  es: { type: 'Tipo', location: 'Ubicación', year: 'Año', client: 'Cliente', phase: 'Fase', close: 'Cerrar' },
};

// Palabras de tipo/fase/ubicación/cliente que aparecen en src/data/projects.ts.
// Si se añade una palabra nueva en projects.ts, añadirla aquí también;
// si falta, se muestra tal cual (fallback al texto en inglés).
const wordMap: Record<string, string> = {
  Residential: 'Residencial',
  Wellness: 'Bienestar',
  Hospitality: 'Hostelería',
  'Construction management': 'Dirección de obra',
  Strategy: 'Estrategia',
  Design: 'Diseño',
  'Licence development': 'Desarrollo de licencia',
  'Construction direction': 'Dirección de obra',
  Spain: 'España',
  Private: 'Privado',
  // Categorías generales usadas en el listado completo de Works
  // (proyectos aún sin ficha propia — ver "Archiving in process").
  Renovation: 'Reforma',
  Housing: 'Vivienda',
  'Urban planning consulting': 'Asesoramiento urbanístico',
};

export function translateWord(word: string, lang: Lang): string {
  if (lang === 'en') return word;
  return wordMap[word] ?? word;
}

export function translateWords(words: string[], lang: Lang): string[] {
  return words.map((w) => translateWord(w, lang));
}

// ---------- Works: proyecto sin ficha todavía ----------
// Mensaje mostrado en el panel de detalle cuando el proyecto aún no
// tiene contenido (texto/imágenes) cargado — ver hasContent en
// src/data/projects.ts.
export const archivingLabel: Record<Lang, string> = {
  en: 'Archiving in process...',
  es: 'Archivo en proceso...',
};
