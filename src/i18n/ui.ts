export type Lang = 'en' | 'es';
export type View = 'home' | 'works' | 'info';

/** Ruta pública de una vista (y opcionalmente de un proyecto) en un idioma */
export function pathFor(lang: Lang, view: View, slug?: string): string {
  const base = lang === 'es' ? '/es' : '';
  if (view === 'works') return `${base}/works${slug ? `/${slug}` : ''}`;
  if (view === 'info') return `${base}/info`;
  return base || '/';
}

export const titles: Record<View, Record<Lang, string>> = {
  home: { en: 'ATOFFICE', es: 'ATOFFICE' },
  works: { en: 'Works · ATOFFICE', es: 'Proyectos · ATOFFICE' },
  info: { en: 'Info · ATOFFICE', es: 'Info · ATOFFICE' },
};

export const descriptions: Record<Lang, string> = {
  en: 'ATOFFICE — architecture and urban planning studio in Madrid.',
  es: 'ATOFFICE — estudio de arquitectura y urbanismo en Madrid.',
};
