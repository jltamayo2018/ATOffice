// Activa el blur-up de cualquier <img class="img-reveal"> de la página
// (ver la clase homónima en global.css). Si la imagen ya está en caché
// y llega "completa" antes de que se registre el listener, se marca
// como cargada al instante en vez de quedarse desenfocada para siempre.
export function initImgReveal() {
  const images = document.querySelectorAll<HTMLImageElement>('img.img-reveal');

  images.forEach((img) => {
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('is-loaded');
      return;
    }
    img.classList.remove('is-loaded');
    img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
  });
}

document.addEventListener('astro:page-load', initImgReveal);
