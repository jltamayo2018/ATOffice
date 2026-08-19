// Transición compartida entre páginas: el contenido "sale" deslizándose
// hacia arriba y el de la página nueva "entra" desde abajo. El menú
// inferior no participa (ver transition:animate="none" en FooterNav.astro),
// así que da la sensación de que solo el contenido se desliza bajo un
// menú fijo — igual que pediste.
const pair = {
  old: {
    name: 'slide-out-up',
    duration: '0.4s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    fillMode: 'both',
  },
  new: {
    name: 'slide-in-up',
    duration: '0.4s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    fillMode: 'both',
  },
};

// Astro exige distinguir "forwards"/"backwards" (según el historial de
// navegación); usamos la misma pareja de animaciones en ambos sentidos.
export const slideUp = {
  forwards: pair,
  backwards: pair,
};
