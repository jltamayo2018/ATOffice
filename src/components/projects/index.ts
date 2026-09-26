import EZ8 from './EZ8.astro';
import E4 from './E4.astro';
import O143 from './O143.astro';
import MOL1 from './MOL1.astro';

// slug → ficha del proyecto. Un proyecto sin entrada aquí muestra "Archiving in process...".
export const projectPages: Record<string, typeof EZ8> = {
  ez8: EZ8,
  e4: E4,
  o143: O143,
  mol1: MOL1,
};
