export type Project = {
  slug: string;
  title: string;
  type: string[];
  location: string;
  year: string;
  client: string;
  phase: string[];
  image: string;
  thumbnail: string;
  featured: boolean;
  description: string;
  descriptionEs: string;
  // false = todavía no hay texto/imágenes de este proyecto: el panel de
  // detalle muestra el aviso "Archiving in process..." en vez de la ficha
  // completa (ver src/components/ProjectDetail.astro). En cuanto se rellenen
  // description/descriptionEs y las imágenes en public/images/projects/<slug>/,
  // basta con poner este campo a true para que se muestre la ficha normal.
  hasContent: boolean;
};

// Adding a project = one more object here + its images in
// public/images/projects/<slug>/ (cover.jpg y miniatura.jpg, esta última
// vertical, usada en el hover de la lista de Works). No page needs to change.
// type/location/client/phase se traducen automáticamente vía
// src/i18n/translations.ts (translateWord/translateWords); solo la
// descripción larga necesita su propia versión en español (descriptionEs).
//
// Orden: el mismo del listado completo de Works (dossier del estudio).
export const projects: Project[] = [
  {
    slug: 'ez8',
    title: 'EZ8',
    type: ['Renovation'],
    location: 'Spain',
    year: '2025',
    client: 'Private',
    phase: ['Design', 'Construction direction'],
    image: '/images/projects/ez8/cover.jpg',
    thumbnail: '/images/projects/ez8/miniatura.jpg',
    featured: false,
    description:
      'Comprehensive refurbishment of residential spaces where functionality, material clarity, and spatial continuity guide every intervention. Each project is approached as an opportunity to reinterpret existing layouts, enhancing natural light, circulation, and the relationship between spaces. Technical direction and on-site management ensure precise execution, coordinating all disciplines and maintaining design integrity throughout the construction process.',
    descriptionEs:
      'Reforma integral de espacios residenciales donde la funcionalidad, la claridad material y la continuidad espacial guían cada intervención. Cada proyecto se aborda como una oportunidad para reinterpretar la distribución existente, mejorando la luz natural, la circulación y la relación entre espacios. La dirección técnica y el seguimiento en obra garantizan una ejecución precisa, coordinando todas las disciplinas y manteniendo la integridad del diseño durante todo el proceso constructivo.',
    hasContent: true,
  },
  {
    slug: 'pb6',
    title: 'PB6',
    type: ['Renovation'],
    location: 'Spain',
    year: '2025',
    client: 'Private',
    phase: [],
    image: '/images/projects/pb6/cover.jpg',
    thumbnail: '/images/projects/pb6/miniatura.jpg',
    featured: false,
    description: '',
    descriptionEs: '',
    hasContent: false,
  },
  {
    slug: 'o26',
    title: 'O26',
    type: ['Renovation'],
    location: 'Spain',
    year: '2026',
    client: 'Private',
    phase: [],
    image: '/images/projects/o26/cover.jpg',
    thumbnail: '/images/projects/o26/miniatura.jpg',
    featured: false,
    description: '',
    descriptionEs: '',
    hasContent: false,
  },
  {
    slug: 'fg19',
    title: 'FG19',
    type: ['Urban planning consulting'],
    location: 'Spain',
    year: '2026',
    client: 'Private',
    phase: [],
    image: '/images/projects/fg19/cover.jpg',
    thumbnail: '/images/projects/fg19/miniatura.jpg',
    featured: false,
    description: '',
    descriptionEs: '',
    hasContent: false,
  },
  {
    slug: 'countryside-concept',
    title: 'Countryside concept',
    type: ['Renovation'],
    location: 'Spain',
    year: '2025',
    client: 'Private',
    phase: [],
    image: '/images/projects/countryside-concept/cover.jpg',
    thumbnail: '/images/projects/countryside-concept/miniatura.jpg',
    featured: false,
    description: '',
    descriptionEs: '',
    hasContent: false,
  },
  {
    slug: 'balmis',
    title: 'Balmis',
    type: ['Housing'],
    location: 'Spain',
    year: '2025',
    client: 'Private',
    phase: ['Strategy', 'Design', 'Licence development', 'Construction direction'],
    image: '/images/projects/balmis/cover.jpg',
    thumbnail: '/images/projects/balmis/miniatura.jpg',
    featured: true,
    description:
      'Single-storey homes with four open facades, where accessibility, solar orientation, and the dialogue between interior and exterior drive every design decision. The absence of vertical barriers and a fully exposed perimeter allow each space to extend into the landscape, prioritising natural light, cross ventilation, and spatial continuity.',
    descriptionEs:
      'Viviendas de una sola planta con las cuatro fachadas abiertas, donde la accesibilidad, la orientación solar y el diálogo entre interior y exterior guían cada decisión de diseño. La ausencia de barreras verticales y un perímetro completamente permeable permiten que cada espacio se extienda hacia el paisaje, priorizando la luz natural, la ventilación cruzada y la continuidad espacial.',
    hasContent: true,
  },
  {
    slug: 'd1',
    title: 'D1',
    type: ['Housing'],
    location: 'Spain',
    year: '2025',
    client: 'Private',
    phase: [],
    image: '/images/projects/d1/cover.jpg',
    thumbnail: '/images/projects/d1/miniatura.jpg',
    featured: false,
    description: '',
    descriptionEs: '',
    hasContent: false,
  },
  {
    slug: 'lcs54',
    title: 'LCS54',
    type: ['Renovation'],
    location: 'Spain',
    year: '2025',
    client: 'Private',
    phase: [],
    image: '/images/projects/lcs54/cover.jpg',
    thumbnail: '/images/projects/lcs54/miniatura.jpg',
    featured: false,
    description: '',
    descriptionEs: '',
    hasContent: false,
  },
  {
    slug: 'mh5',
    title: 'MH5',
    type: ['Renovation'],
    location: 'Spain',
    year: '2025',
    client: 'Private',
    phase: [],
    image: '/images/projects/mh5/cover.jpg',
    thumbnail: '/images/projects/mh5/miniatura.jpg',
    featured: false,
    description: '',
    descriptionEs: '',
    hasContent: false,
  },
  {
    slug: 'nba',
    title: 'NBA',
    type: ['Renovation'],
    location: 'Spain',
    year: '2025',
    client: 'Private',
    phase: ['Design', 'Licence development'],
    image: '/images/projects/nba/cover.jpg',
    thumbnail: '/images/projects/nba/miniatura.jpg',
    featured: true,
    description:
      'A development combining an NBA-standard sports complex with a 5-star hotel. Designed for elite performance, wellness, and luxury, it features state-of-the-art training facilities and hospitality services. The center is oriented towards short- and long-term stays for youth programs under the NBA brand, while also accommodating large scale events, including major concerts. Both the building permit and activity license were successfully obtained.',
    descriptionEs:
      'Un desarrollo que combina un complejo deportivo con estándar NBA y un hotel de 5 estrellas. Diseñado para el rendimiento de élite, el bienestar y el lujo, cuenta con instalaciones de entrenamiento de última generación y servicios hosteleros. El centro está orientado a estancias de corta y larga duración para programas juveniles bajo la marca NBA, y también puede acoger eventos de gran formato, incluidos grandes conciertos. Se obtuvieron tanto la licencia de obra como la licencia de actividad.',
    hasContent: true,
  },
  {
    slug: 'e4',
    title: 'E4',
    type: ['Urban planning consulting'],
    location: 'Spain',
    year: '2025',
    client: 'Private',
    phase: [],
    image: '/images/projects/e4/cover.jpg',
    thumbnail: '/images/projects/e4/miniatura.jpg',
    featured: false,
    description: '',
    descriptionEs: '',
    hasContent: false,
  },
  {
    slug: 'du',
    title: 'DU',
    type: ['Renovation'],
    location: 'Spain',
    year: '2026',
    client: 'Private',
    phase: [],
    image: '/images/projects/du/cover.jpg',
    thumbnail: '/images/projects/du/miniatura.jpg',
    featured: false,
    description: '',
    descriptionEs: '',
    hasContent: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
