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
};

// Adding a project = one more object here + its images in
// public/images/projects/<slug>/ (cover.jpg y miniatura.jpg, esta última
// vertical, usada en el hover de la lista de Works). No page needs to change.
export const projects: Project[] = [
  {
    slug: 'balmis',
    title: 'Balmis',
    type: ['Residential'],
    location: 'Spain',
    year: '2023–2025',
    client: 'Private',
    phase: ['Strategy', 'Design', 'Licence development', 'Construction direction'],
    image: '/images/projects/balmis/cover.jpg',
    thumbnail: '/images/projects/balmis/miniatura.jpg',
    featured: true,
    description:
      'Single-storey homes with four open facades, where accessibility, solar orientation, and the dialogue between interior and exterior drive every design decision. The absence of vertical barriers and a fully exposed perimeter allow each space to extend into the landscape, prioritising natural light, cross ventilation, and spatial continuity.',
  },
  {
    slug: 'nba',
    title: 'NBA',
    type: ['Wellness', 'Hospitality'],
    location: 'Spain',
    year: '2024–2025',
    client: 'Private',
    phase: ['Design', 'Licence development'],
    image: '/images/projects/nba/cover.jpg',
    thumbnail: '/images/projects/nba/miniatura.jpg',
    featured: true,
    description:
      'A development combining an NBA-standard sports complex with a 5-star hotel. Designed for elite performance, wellness, and luxury, it features state-of-the-art training facilities and hospitality services. The center is oriented towards short- and long-term stays for youth programs under the NBA brand, while also accommodating large scale events, including major concerts. Both the building permit and activity license were successfully obtained.',
  },
  {
    slug: 'ez8',
    title: 'EZ8',
    type: ['Residential', 'Construction management'],
    location: 'Spain',
    year: '2024–2025',
    client: 'Private',
    phase: ['Design', 'Construction direction'],
    image: '/images/projects/ez8/cover.jpg',
    thumbnail: '/images/projects/ez8/miniatura.jpg',
    featured: false,
    description:
      'Comprehensive refurbishment of residential spaces where functionality, material clarity, and spatial continuity guide every intervention. Each project is approached as an opportunity to reinterpret existing layouts, enhancing natural light, circulation, and the relationship between spaces. Technical direction and on-site management ensure precise execution, coordinating all disciplines and maintaining design integrity throughout the construction process.',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
