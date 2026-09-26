import type { Lang } from '@/i18n/ui';

export type Project = {
  /** Ruta: /works/<slug> (y /es/works/<slug>) */
  slug: string;
  /** Código que se muestra en el índice y en la cabecera del panel */
  code: string;
  type: Record<Lang, string>;
  year: string;
  /**
   * Texto de la cabecera del panel si no coincide con el tipo del índice
   * (en el prototipo EZ8/O143 muestran "REFORMA" y MOL1 "URBANISM").
   */
  headType?: string;
  /** Fila resaltada en azul al entrar en WORKS */
  active?: boolean;
};

// Orden del índice de WORKS. Los proyectos con ficha tienen su componente en
// src/components/projects/ (registrado en src/components/projects/index.ts);
// el resto muestran "Archiving in process...".
// Las filas "XXXXX" de relleno las genera el script hasta llenar la pantalla.
export const projects: Project[] = [
  { slug: 'ez8', code: 'EZ8', type: { en: 'Renovation', es: 'Reforma' }, year: '2025', headType: 'REFORMA' },
  { slug: 'e4', code: 'E4', type: { en: 'Housing', es: 'Vivienda' }, year: '2025' },
  { slug: 'o143', code: 'O143', type: { en: 'Renovation', es: 'Reforma' }, year: '2026', headType: 'REFORMA' },
  { slug: 'pb6', code: 'PB6', type: { en: 'Renovation', es: 'Reforma' }, year: '2025' },
  { slug: 'fg19', code: 'FG19', type: { en: 'Renovation', es: 'Reforma' }, year: '2026' },
  { slug: 'mol1', code: 'MOL1', type: { en: 'Urbanism', es: 'Urbanismo' }, year: '2026', headType: 'URBANISM' },
  { slug: 'balmis', code: 'Balmis', type: { en: 'Housing', es: 'Vivienda' }, year: '2025' },
  { slug: 'd1', code: 'D1', type: { en: 'Housing', es: 'Vivienda' }, year: '2025' },
  { slug: 'lcs54', code: 'LCS54', type: { en: 'Renovation', es: 'Reforma' }, year: '2025' },
  { slug: 'mh5', code: 'MH5', type: { en: 'Renovation', es: 'Reforma' }, year: '2025', active: true },
  { slug: 'nba', code: 'NBA', type: { en: 'Sports & hospitality', es: 'Deportivo y hotelero' }, year: '2025' },
  { slug: 'du', code: 'DU', type: { en: 'Renovation', es: 'Reforma' }, year: '2026' },
];

/** Filas provisionales que ya aparecen en el prototipo antes del relleno automático */
export const placeholders: { type: Record<Lang, string>; year: string }[] = [
  { type: { en: 'Housing', es: 'Vivienda' }, year: '2026' },
  { type: { en: 'Housing', es: 'Vivienda' }, year: '2025' },
  { type: { en: 'XXXXX', es: 'XXXXX' }, year: '2025' },
  { type: { en: 'XXXXX', es: 'XXXXX' }, year: 'XXX' },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
