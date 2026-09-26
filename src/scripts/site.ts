// Comportamiento del sitio, portado del <script> del prototipo atoffice.html.
// Diferencias respecto al prototipo:
//  - Las vistas y los proyectos tienen URL propia (/works, /works/<slug>, /info, /es/…)
//    en vez de #hash; se navega con history.pushState y se respeta atrás/adelante.
//  - El idioma lo decide la URL (/es/…) en vez de localStorage.
import { pathFor, titles, type Lang, type View } from '@/i18n/ui';

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector(sel) as T;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => [...root.querySelectorAll(sel)] as T[];

const panel = $('#project');
const body = document.body;
const lang = (): Lang => (document.documentElement.lang === 'es' ? 'es' : 'en');
const view = (): View => body.dataset.view as View;

function parsePath(pathname: string): { lang: Lang; view: View; slug?: string } {
  const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  const l: Lang = parts[0] === 'es' ? 'es' : 'en';
  if (l === 'es') parts.shift();
  if (parts[0] === 'works') return { lang: l, view: 'works', slug: parts[1] };
  if (parts[0] === 'info') return { lang: l, view: 'info' };
  return { lang: l, view: 'home' };
}

function go(path: string, replace = false) {
  if (path.replace(/\/$/, '') === location.pathname.replace(/\/$/, '')) return;
  history[replace ? 'replaceState' : 'pushState'](null, '', path);
}

// ---------- Índice: filas de relleno (XXXXX) hasta llegar abajo sin barra ----------
const fillIndex = (function () {
  const list = $('.list');
  const idx = $('.index');
  const tpl = $('.row:last-of-type', idx).cloneNode(true) as HTMLElement;
  const base = $$('.row', idx).filter((r) => r.firstElementChild!.textContent !== 'XXXXX').length;
  return function fit() {
    const rowH = $('.row', idx).getBoundingClientRect().height;
    if (!rowH) return; // la lista está oculta; se ajusta al volver
    const cs = getComputedStyle(idx);
    const space = list.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const need = Math.max(base, Math.floor(space / rowH));
    let have = $$('.row', idx).length;
    while (have > need && have > base) { idx.lastElementChild!.remove(); have--; }
    while (have < need) { idx.appendChild(tpl.cloneNode(true)); have++; }
    // ajuste fino: ninguna fila debe sobrar por debajo del borde
    while (list.scrollHeight > list.clientHeight && have > base) { idx.lastElementChild!.remove(); have--; }
  };
})();

// La columna del centro mide justo lo que el texto más largo, y queda centrada
function fitMiddle() {
  let max = 0;
  $$('.row span:nth-child(2)').forEach((sp) => { max = Math.max(max, sp.scrollWidth); });
  if (max) document.documentElement.style.setProperty('--mid-w', Math.ceil(max) + 'px');
}
addEventListener('resize', () => { fitMiddle(); fillIndex(); });
new MutationObserver(() => { if (view() === 'works') fillIndex(); })
  .observe(body, { attributes: true, attributeFilter: ['data-view'] });
new MutationObserver(() => fitMiddle()).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
addEventListener('load', () => { fitMiddle(); fillIndex(); });
(document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { fitMiddle(); fillIndex(); });

// ---------- Logo: "al hamouti tamayo office" → "atoffice" (se repite al volver a la portada) ----------
(function logoIntro() {
  const logo = $('.home-logo');
  const parts = $$('.lc', logo);
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timer: number | undefined;
  function play() {
    clearTimeout(timer);
    logo.classList.remove('is-short');
    parts.forEach((p) => { p.style.transition = 'none'; p.style.width = 'auto'; p.style.width = p.scrollWidth + 'px'; });
    void logo.offsetWidth;
    parts.forEach((p) => { p.style.transition = ''; });
    if (still) { logo.classList.add('is-short'); return; }
    timer = window.setTimeout(() => logo.classList.add('is-short'), 1400);
  }
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { if (view() === 'home') play(); else logo.classList.add('is-short'); });
  new MutationObserver(() => { if (view() === 'home') play(); })
    .observe(body, { attributes: true, attributeFilter: ['data-view'] });
})();

// ---------- Proyectos ----------
const allRows = () => $$('.row');
let current: HTMLElement | null = $('.row.is-open');

let openProject = function (row: HTMLElement, push = true) {
  if (current === row) return closeProject();
  allRows().forEach((r) => r.classList.remove('is-open', 'is-active'));
  row.classList.add('is-open');
  const [code, type, year] = [...row.children].map((s) => s.textContent ?? '');
  const slug = row.dataset.slug;
  $('[data-field="code"]', panel).textContent = code;
  $('[data-field="type"]', panel).textContent = row.dataset.headType || type;
  const tpl = slug ? (document.getElementById('project-' + slug) as HTMLTemplateElement | null) : null;
  $('.project-content', panel).replaceChildren(tpl
    ? tpl.content.cloneNode(true)
    : Object.assign(document.createElement('div'), { className: 'project-body', textContent: 'Archiving in process...' }));
  panel.scrollTop = 0;
  $('[data-field="year"]', panel).textContent = year;
  panel.setAttribute('aria-hidden', 'false');
  body.classList.add('has-project');
  current = row;
  if (push) go(pathFor(lang(), 'works', slug));
  document.title = `${code} · ATOFFICE`;
  // Mantiene visible la fila pinchada cuando la lista se estrecha
  setTimeout(() => row.scrollIntoView({ block: 'nearest' }), 460);
};

let closeProject = function (push = true) {
  const had = !!current;
  body.classList.remove('has-project');
  panel.setAttribute('aria-hidden', 'true');
  if (current) { current.classList.remove('is-open'); current.focus({ preventScroll: true }); }
  current = null;
  if (had && push && view() === 'works') { go(pathFor(lang(), 'works')); document.title = titles.works[lang()]; }
};

const indexEl = $('.index');
indexEl.addEventListener('click', (e) => {
  const row = (e.target as Element).closest<HTMLElement>('.row');
  if (row) openProject(row);
});
indexEl.addEventListener('keydown', (e) => {
  const row = (e.target as Element).closest<HTMLElement>('.row');
  if (row && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openProject(row); }
});
$('[data-close]', panel).addEventListener('click', () => closeProject());
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  body.classList.contains('contact-open') ? closeContact() : closeProject();
});

// ---------- Tarjeta CONTACT ----------
const contactCard = $('#contact');
const contactLink = $('[data-contact]');
function openContact() {
  body.classList.add('contact-open');
  contactCard.setAttribute('aria-hidden', 'false');
  $('.contact-close', contactCard).focus();
}
function closeContact() {
  body.classList.remove('contact-open');
  contactCard.setAttribute('aria-hidden', 'true');
  if (location.hash === '#contact') history.replaceState(null, '', location.pathname);
  contactLink.focus();
}
contactCard.setAttribute('aria-hidden', 'true');
contactLink.addEventListener('click', (e) => { e.preventDefault(); openContact(); });
$$('[data-close-contact]').forEach((el) => el.addEventListener('click', closeContact));
if (location.hash === '#contact') openContact();

// ---------- Navegación entre portada, WORKS e INFO ----------
const navLinks = $$<HTMLAnchorElement>('.nav a[data-view]');
function showView(v: View, push = true) {
  if (!['home', 'works', 'info'].includes(v)) v = 'home';
  if (v !== 'works') closeProject(false);
  body.dataset.view = v;
  navLinks.forEach((a) => {
    a.dataset.view === v ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
  if (push) go(pathFor(lang(), v));
  document.title = titles[v][lang()];
}
navLinks.forEach((a) => a.addEventListener('click', (e) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // abrir en pestaña nueva sigue funcionando
  e.preventDefault();
  showView(a.dataset.view as View);
}));

// Atrás / adelante del navegador
addEventListener('popstate', () => {
  const s = parsePath(location.pathname);
  if (s.lang !== lang()) setLang(s.lang, false);
  if (view() !== s.view) showView(s.view, false);
  if (s.view === 'works') {
    const row = s.slug ? $(`.row[data-slug="${s.slug}"]`) : null;
    if (row && row !== current) openProject(row, false);
    else if (!row && current) closeProject(false);
  }
});

// ---------- Barra vertical del panel de proyecto ----------
(function () {
  const bar = $('.pscroll');
  const thumb = $('.pscroll-thumb', bar);
  let grabOffset = 0, dragging = false;

  function update() {
    const track = bar.clientHeight;
    const { scrollHeight: sh, clientHeight: ch, scrollTop: st } = panel;
    bar.classList.toggle('is-hidden', sh <= ch + 1);
    const h = Math.max(40, (track * ch) / sh);
    thumb.style.height = h + 'px';
    thumb.style.transform = `translateY(${(track - h) * (st / Math.max(1, sh - ch))}px)`;
  }
  function scrollToPointer(clientY: number) {
    const r = bar.getBoundingClientRect();
    const h = thumb.offsetHeight;
    const ratio = (clientY - r.top - grabOffset) / Math.max(1, r.height - h);
    panel.scrollTop = Math.max(0, Math.min(1, ratio)) * (panel.scrollHeight - panel.clientHeight);
  }
  bar.addEventListener('pointerdown', (e) => {
    const t = thumb.getBoundingClientRect();
    grabOffset = e.target === thumb ? e.clientY - t.top : thumb.offsetHeight / 2;
    dragging = true; bar.classList.add('is-dragging'); bar.setPointerCapture(e.pointerId);
    scrollToPointer(e.clientY);
    e.preventDefault();
  });
  bar.addEventListener('pointermove', (e) => { if (dragging) scrollToPointer(e.clientY); });
  const stop = () => { dragging = false; bar.classList.remove('is-dragging'); };
  bar.addEventListener('pointerup', stop);
  bar.addEventListener('pointercancel', stop);
  // la rueda sobre la barra también mueve el proyecto
  bar.addEventListener('wheel', (e) => { panel.scrollTop += e.deltaY; }, { passive: true });

  panel.addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  new ResizeObserver(update).observe(panel);
  new MutationObserver(() => requestAnimationFrame(update)).observe(panel, { childList: true, subtree: true });
  panel.addEventListener('load', update, true);
  update();
})();

// ---------- Portada: tira de imágenes en movimiento ----------
// Se mueve despacio sola; la posición del cursor la acelera (derecha)
// o la frena hasta invertirla (izquierda). Rueda y arrastre también empujan.
(function () {
  const home = $('.home');
  const strip = $('.strip', home);
  const originals = [...strip.children] as HTMLElement[];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const BASE = reduce ? 0 : 0.02; // velocidad de reposo, en anchos de pantalla por segundo
  const FAST = 7;                 // multiplicador con el cursor en el borde derecho
  const BACK = 4;                 // multiplicador inverso con el cursor en el borde izquierdo

  let setWidth = 0, x = 0, v = 0, target = BASE, impulse = 0, last = performance.now();
  let dragging = false, dragX = 0, dragV = 0;
  let firstBuild = true;

  function build() {
    strip.querySelectorAll('[data-clone]').forEach((n) => n.remove());
    setWidth = originals.reduce((w, el) => {
      const cs = getComputedStyle(el);
      return w + el.getBoundingClientRect().width + parseFloat(cs.marginRight);
    }, 0);
    if (!setWidth) return; // la portada está oculta (se abrió en WORKS o INFO): se monta al volver
    // La tira arranca en el dormitorio (escritorio) o en la cocina (móvil).
    if (firstBuild) {
      const n = matchMedia('(max-width: 700px)').matches ? 2 : 1;
      const stripH = strip.getBoundingClientRect().height;
      if (stripH) {
        const units = originals.slice(0, n).reduce((u, el) => u + parseFloat(el.style.getPropertyValue('--w')), 0);
        x = ((units / 1767) * stripH) / innerWidth;
        firstBuild = false;
      }
    }
    const copies = Math.ceil((innerWidth * 2) / setWidth) + 1;
    for (let c = 0; c < copies; c++) originals.forEach((el) => {
      const k = el.cloneNode(true) as HTMLElement; k.dataset.clone = ''; k.setAttribute('aria-hidden', 'true'); strip.appendChild(k);
    });
  }

  function speedFor(clientX: number) {
    const n = Math.max(-1, Math.min(1, (clientX / innerWidth) * 2 - 1)); // -1 izquierda … 1 derecha
    return BASE + 0.02 * (n >= 0 ? n * n * FAST : -n * n * (BACK + 1)) * (reduce ? 0 : 1);
  }

  home.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse' && !dragging) target = speedFor(e.clientX); });
  home.addEventListener('pointerleave', () => { if (!dragging) target = BASE; });
  home.addEventListener('wheel', (e) => {
    impulse += ((Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) / innerWidth) * 0.12;
  }, { passive: true });

  // Pinchar para frenar en seco; arrastrar y soltar para lanzarla
  let lastMoveT = 0;
  home.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    dragging = true; dragX = e.clientX; dragV = 0; v = 0; impulse = 0; lastMoveT = performance.now();
    home.setPointerCapture(e.pointerId);
    home.classList.add('is-grabbing');
  });
  home.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastMoveT) / 1000;
    const dx = (dragX - e.clientX) / innerWidth;
    dragX = e.clientX; lastMoveT = now;
    x += dx;
    dragV = dragV * 0.6 + (dx / dt) * 0.4; // velocidad suavizada del gesto
  });
  const endDrag = (e?: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    home.classList.remove('is-grabbing');
    if (performance.now() - lastMoveT > 90) dragV = 0; // si se para antes de soltar, no se lanza
    v = Math.max(-3, Math.min(3, dragV));
    if (e && e.pointerType === 'mouse') target = speedFor(e.clientX);
  };
  home.addEventListener('pointerup', endDrag);
  home.addEventListener('pointercancel', endDrag);

  function tick(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (view() === 'home' && !setWidth) build();
    if (view() === 'home' && setWidth) {
      if (!dragging) {
        v += (target - v) * (1 - Math.exp(-dt * (Math.abs(v) > Math.abs(target) * 1.5 + 0.05 ? 1.1 : 2.2))); // inercia
        x += v * dt + impulse;
      }
      impulse *= Math.exp(-dt * 6);
      const w = setWidth / innerWidth; // ancho de un juego de imágenes en pantallas
      x = ((x % w) + w) % w;
      strip.style.transform = `translate3d(${-x * innerWidth}px,0,0)`;
    }
    requestAnimationFrame(tick);
  }

  // Mientras falten las fotos, se ve solo el hueco gris (sin icono de imagen rota)
  const hideBroken = (img: HTMLImageElement) => { img.style.visibility = 'hidden'; };
  document.addEventListener('error', (e) => { if ((e.target as Element).tagName === 'IMG') hideBroken(e.target as HTMLImageElement); }, true);
  strip.querySelectorAll('img').forEach((img) => { if (img.complete && !img.naturalWidth) hideBroken(img); });

  build();
  addEventListener('load', () => build());
  addEventListener('resize', () => { const r = setWidth ? (x * innerWidth) / setWidth : 0; build(); x = setWidth ? (r * setWidth) / innerWidth : 0; });
  v = 0; // arranca parada y acelera hasta la velocidad de reposo
  requestAnimationFrame(tick);
})();

// ---------- Servicios: solo un desplegable abierto a la vez ----------
$$<HTMLDetailsElement>('.services details').forEach((d) => {
  d.addEventListener('toggle', () => {
    if (!d.open) return;
    $$<HTMLDetailsElement>('details[open]', d.closest('.services')!).forEach((o) => { if (o !== d) o.open = false; });
  });
});

// ---------- Idioma EN / ES ----------
const toggle = $('[data-lang-toggle]');
function setLang(l: Lang, push = true) {
  document.documentElement.lang = l;
  $$('[data-es]').forEach((el) => { el.textContent = (l === 'es' ? el.dataset.es : el.dataset.en) ?? el.textContent; });
  $$('[data-es-aria-label]').forEach((el) => el.setAttribute('aria-label', (l === 'es' ? el.dataset.esAriaLabel : el.dataset.enAriaLabel) ?? ''));
  toggle.textContent = l === 'es' ? 'EN' : 'ES'; // el botón muestra el otro idioma
  toggle.setAttribute('aria-label', l === 'es' ? 'Switch to English' : 'Cambiar a español');
  navLinks.forEach((a) => { a.href = pathFor(l, a.dataset.view as View); });
  // si hay un proyecto abierto sin cabecera propia, su tipo se actualiza
  const open = $('.row.is-open');
  if (open && !open.dataset.headType) $('[data-field="type"]', panel).textContent = open.children[1].textContent;
  if (push) go(pathFor(l, view(), view() === 'works' ? current?.dataset.slug : undefined), true);
}
toggle.addEventListener('click', () => setLang(lang() === 'es' ? 'en' : 'es'));

// ---------- Móvil: el proyecto se despliega dentro de la lista (como studioapt) ----------
(function () {
  const mq = matchMedia('(max-width: 700px)');
  const home = panel.parentNode!, anchor = panel.nextSibling;
  const slot = document.createElement('li');
  slot.className = 'row-detail';
  function place() {
    const open = $('.row.is-open');
    if (mq.matches && open) { open.after(slot); slot.appendChild(panel); }
    else if (panel.parentNode !== home) { home.insertBefore(panel, anchor); slot.remove(); }
  }
  const baseOpen = openProject, baseClose = closeProject;
  openProject = function (row, push = true) {
    baseOpen(row, push);
    place();
    if (mq.matches && current === row) requestAnimationFrame(() => row.scrollIntoView({ block: 'start' }));
  };
  closeProject = function (push = true) { baseClose(push); place(); };
  mq.addEventListener('change', place);
  place(); // proyecto abierto desde la URL
  // cambiar de sección desde el menú cierra la hoja de contacto
  navLinks.forEach((a) => a.addEventListener('click', () => {
    if (body.classList.contains('contact-open')) closeContact();
  }));
})();
