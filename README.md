# Mary Garzón · Gensai Akademy

Web de Mary Garzón y Gensai Akademy con Astro, React y Tailwind CSS. Conserva el sistema visual "Estanque claro" y organiza la oferta online de Geniotipo para adolescentes y adultos, AACC para familias y AACC para adultos.

## Stack

- Astro 7 para páginas estáticas, layouts y componentes sin JavaScript.
- React 19 solo para la navegación interactiva.
- Tailwind CSS 4 mediante el plugin oficial de Vite.
- pnpm 11 como gestor de paquetes.
- TypeScript en modo estricto.

## Desarrollo

```bash
pnpm install
pnpm dev
```

La aplicación estará disponible por defecto en `http://localhost:4321`.

## Verificación y producción

```bash
pnpm check
pnpm build
pnpm preview
```

`cf deploy` genera el Worker de Astro y lo publica en el subdominio `*.workers.dev` de Cloudflare.

```bash
cf deploy
```

## Arquitectura

```text
src/
├── components/
│   ├── atoms/       # Iconos, botones y badges
│   ├── molecules/   # Tarjetas, cabeceras y elementos de contenido
│   └── organisms/   # Navegación y footer
├── layouts/         # Metadatos, SEO y estructura global
├── pages/           # Rutas Astro y página 404
└── styles/          # Tokens, estilos globales y movimiento reducido
```

`PRODUCT.md` recoge el propósito y las decisiones de producto. `DESIGN.md` documenta el sistema visual y sus reglas de uso.

## Rutas

- `/`
- `/geniotipo`
- `/geniotipo-adolescentes`
- `/geniotipo-adultos`
- `/altas-capacidades-familias`
- `/altas-capacidades-adultos`
- `/sobre-mi`
- `/blog` + `/blog/<slug>` (colección de contenido en `src/content/blog/`)
- `/aviso-legal`, `/privacidad`, `/cookies`, `/condiciones` (borradores `noindex` hasta completar datos)
- `/404`

## Configuración pendiente

1. **WhatsApp Business**: incorporar el enlace profesional en `WHATSAPP_URL` de `src/config/links.ts`.
2. **Reserva Geniotipo**: incorporar el enlace de pago/reserva en `GENIOTIPO_BOOKING_URL` de `src/config/links.ts`.
3. **Foto de Mary**: sustituir los placeholders de `src/components/HomeContent.astro` y `src/pages/sobre-mi.astro`.
4. **Legal**: completar NIF, domicilio, contacto y revisión profesional de los cuatro borradores antes de retirar `noindex`.
5. Antes de publicar en otro dominio, actualizar `site` en `astro.config.mjs` y las URLs de `src/layouts/BaseLayout.astro`.
