# atoffice

Sitio web de **atoffice**, estudio de arquitectura, interiorismo y consultoría técnica ([atoffice.es](https://www.atoffice.es)).

Construido con [Astro](https://astro.build) como generador de sitio estático, sin backend ni base de datos: el contenido de los proyectos se gestiona como datos tipados en TypeScript.

## Stack

- [Astro 4](https://astro.build) — framework y renderizado estático, con `astro:transitions` para las animaciones entre páginas
- [Swiper](https://swiperjs.com) — galerías / carruseles de imágenes
- TypeScript
- CSS plano con variables de diseño propias (`src/styles/tokens.css`)

## Estructura del proyecto

```
src/
├── pages/
│   ├── index.astro          # Home
│   ├── info.astro
│   ├── contact.astro
│   └── works/
│       ├── index.astro      # Listado de proyectos
│       └── [slug].astro     # Detalle de proyecto (ruta dinámica)
├── components/
│   ├── HeroGallery.astro
│   ├── ProjectList.astro
│   ├── ProjectDetail.astro
│   ├── WorksView.astro
│   ├── FooterNav.astro
│   └── ContactPanel.astro
├── layouts/
│   └── BaseLayout.astro     # Layout base (nav, panel de contacto, meta tags)
├── data/
│   └── projects.ts          # Catálogo de proyectos (fuente de contenido)
├── lib/
│   └── transitions.ts
└── styles/
    ├── global.css
    └── tokens.css

public/
└── images/
    ├── main/
    └── projects/<slug>/     # cover.jpg y miniatura.jpg por proyecto
```

## Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando           | Acción                                              |
| :----------------- | :--------------------------------------------------- |
| `npm install`       | Instala las dependencias                              |
| `npm run dev`       | Arranca el servidor de desarrollo en `localhost:4321` |
| `npm run build`     | Genera el sitio estático en `./dist/`                 |
| `npm run preview`   | Previsualiza el build de producción en local          |

## Añadir un proyecto nuevo

No hace falta tocar ninguna página. Basta con:

1. Añadir un objeto nuevo al array `projects` en [`src/data/projects.ts`](src/data/projects.ts) (slug, título, tipo, ubicación, año, cliente, fases, descripción...).
2. Colocar sus imágenes en `public/images/projects/<slug>/`:
   - `cover.jpg` — imagen de portada
   - `miniatura.jpg` — imagen vertical, usada en el hover del listado de proyectos (Works)

Si el proyecto debe aparecer destacado en la home, marcar `featured: true`.
