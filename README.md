# atoffice

Sitio web de **ATOFFICE**, estudio de arquitectura y urbanismo en Madrid ([atoffice.es](https://www.atoffice.es)).

Construido con [Astro](https://astro.build) como generador de sitio estático, sin backend ni base de datos. El diseño es un port 1:1 del prototipo `atoffice.html` (v3, portada a sangre).

## Stack

- [Astro 4](https://astro.build) — renderizado estático
- TypeScript (vanilla, sin frameworks de UI)
- CSS plano (`src/styles/global.css`) e Instrument Sans autoalojada (`public/fonts/`)

## Cómo funciona

El sitio se comporta como una sola página: portada, WORKS e INFO están en el mismo documento y se cambia entre ellas sin recargar (`src/scripts/site.ts`). Aun así, cada vista tiene su URL real, que se renderiza en el servidor con la vista, el idioma y el proyecto abierto ya puestos:

| URL                     | Vista                         |
| :---------------------- | :---------------------------- |
| `/` · `/es`             | Portada                       |
| `/works` · `/es/works`  | Índice de proyectos           |
| `/works/<slug>`         | Índice con el proyecto abierto |
| `/info` · `/es/info`    | About, servicios y proceso    |
| `#contact`              | Abre la tarjeta de contacto   |

## Estructura

```
src/
├── layouts/Site.astro          # Página completa (portada, WORKS, INFO, menú)
├── components/
│   ├── InfoView.astro
│   ├── ContactPanel.astro
│   └── projects/               # Ficha de cada proyecto (EZ8, E4, O143, MOL1)
│       └── index.ts            # slug → ficha
├── data/projects.ts            # Filas del índice de WORKS
├── i18n/ui.ts                  # Idiomas, rutas y títulos
├── scripts/site.ts             # Interacción (tira de fotos, panel, idioma…)
├── styles/{global,fonts}.css
└── pages/                      # Rutas EN y /es/
public/img/                     # Imágenes del sitio
```

## Comandos

| Comando           | Acción                                              |
| :---------------- | :-------------------------------------------------- |
| `npm install`     | Instala las dependencias                            |
| `npm run dev`     | Servidor de desarrollo en `localhost:4321`          |
| `npm run build`   | Genera el sitio estático en `./dist/`               |
| `npm run preview` | Previsualiza el build de producción en local        |

## Añadir un proyecto

1. Añadir su fila en `src/data/projects.ts` (slug, código, tipo EN/ES, año).
2. Si ya tiene ficha: crear `src/components/projects/<CODIGO>.astro` (copiar una existente; las posiciones `--x/--y/--w/--h` son las del frame de Figma de 1320 px) y registrarla en `src/components/projects/index.ts`. Sin ficha, el panel muestra "Archiving in process...".
3. Imágenes en `public/img/<slug>/`.
