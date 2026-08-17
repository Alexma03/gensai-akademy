---
name: Mary Garzón · GensAI — Estanque claro
description: Sistema visual del rediseño 2026 — blanco tintado al verde, acentos duales, Spectral + Montserrat, loto sutil.
colors:
  growth-green: "#7BC143"
  growth-green-accessible: "#3F741F"
  growth-green-accessible-deep: "#2F5817"
  lotus-pink: "#F080A0"
  lotus-pink-accessible: "#A93A5F"
  lotus-pink-accessible-deep: "#812642"
  ink: "#1F2420"
  slate: "#2E352E"
  body-text: "#4A5248"
  quiet-text: "#667085"
  mist: "#F4F8F0"
  line: "#E3E9DD"
  pond-white: "#FDFEFB"
  deep-forest: "#232A23"
typography:
  display:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "clamp(1.9rem, 4vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.15
  title:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.25
  body:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Montserrat, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.25
rounded:
  soft: "8px"
  card: "16px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.growth-green-accessible}"
    textColor: "#FFFFFF"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-pink:
    backgroundColor: "{colors.lotus-pink-accessible}"
    textColor: "#FFFFFF"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.growth-green-accessible}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 26px"
  card:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "32px"
  input:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.soft}"
    padding: "14px 16px"
---

# Design System: Mary Garzón · GensAI — Estanque claro

## Overview

**Creative North Star: "El estanque claro"**

Una superficie de agua quieta y luminosa: blanco con un susurro de verde, tipografía editorial cálida y una sola flor de loto lavada en el fondo. El sistema habla bajito y con confianza: valida al visitante, explica con calma y deja claro el siguiente paso propio de cada recorrido.

Decidido en el ticket 03 del mapa `.scratch/rediseno/map.md` tras comparar 4 variantes en navegador. Sustituye al sistema anterior (Playfair Display, fidelidad 1:1 con la web original), que queda derogado.

**Key Characteristics:**

- Blanco estanque (#FDFEFB) como superficie dominante; niebla verdoso (#F4F8F0) para alternar secciones.
- Dos acentos con trabajo fijo: verde = acción, rosa = emoción. Nunca decoración aleatoria.
- Spectral con peso medium (no bold) y itálicas para la palabra emocional; Montserrat para leer y actuar.
- Loto como marca de agua sutil (16% de opacidad en el hero), nunca protagonista.
- Fotografía natural cálida (placeholder → fotos reales de Mary al publicar).
- Movimiento mínimo: una sola entrada coreografiada en el hero; nada más.

## Colors

### Base

- **Blanco Estanque** (`pond-white` #FDFEFB): fondo del body; blanco con tinte mínimo hacia el hue verde de marca. No usar crema/arena (cliché saturado).
- **Niebla** (`mist` #F4F8F0): alternancia de secciones.
- **Tinta** (`ink` #1F2420): titulares; verde-casi-negro cálido.
- **Texto Cuerpo** (`body-text` #4A5248): párrafos; gris verdoso cálido, contraste AA sobre ambas bases.
- **Línea** (`line` #E3E9DD): bordes discretos.
- **Bosque Profundo** (`deep-forest` #232A23): footer y paneles oscuros (con `slate`).

### Acentos

- **Verde Brote** (#7BC143 → accesible #3F741F): acciones, CTAs, palabras de énfasis, checkmarks.
- **Rosa Loto** (#F080A0 → accesible #A93A5F): momentos emocionales — sobre mí, testimonios, inteligencia emocional.
- **Retirados:** naranja y violeta ya no se usan en el sistema (tokens conservados en CSS solo por compatibilidad, sin uso nuevo).

**The Living Accent Rule.** Verde y rosa tienen función concreta: acción o emoción. Prohibido dispersarlos como decoración.

## Typography

**Display:** Spectral (Georgia de respaldo) — peso 500, nunca 700; la calidez viene de la forma, no de la fuerza.
**Body:** Montserrat (Arial de respaldo).

**The Emphasis Italic Rule.** La palabra emocional de un titular va en *itálica Spectral* y color de acento (máximo una por titular). Ejemplo canónico: "Una forma única de pensar, sentir y *crear*."

**The Two-Voice Rule.** Spectral nombra y emociona; Montserrat explica y permite actuar. No intercambiar.

**Jerarquía:** display fluido hasta 4.5rem · headline de sección ~2.5rem · title de tarjeta 1.5rem · body 1rem/1.75 con medida ≤ 70ch · label 0.875rem semibold. `text-wrap: balance` en titulares, `pretty` en prosa.

## Elevation

- **Ambient Card** (`0 12px 30px rgba(17,24,39,0.10)`): tarjetas principales, sin borde simultáneo.
- **Soft Lift** (`0 6px 12px rgba(17,24,39,0.08)`): hover sutil.
- Bordes de `line` como alternativa plana a la sombra. Un solo cue de profundidad por superficie.

## Components

- **Buttons:** píldora, altura táctil ≥ 44px. Primario verde accesible; rosa para la acción emocional principal (agendar); outline verde como secundario. Hover: +1px de elevación y tono profundo; foco visible 3-4px con offset.
- **Badges/Chips:** tinte del acento al 10-14%, texto en variante accesible. Contexto, no interacción.
- **Cards:** radio 16px, blanco sobre niebla o viceversa, padding 24-40px. Prohibidas las rejillas de tarjetas idénticas en secciones editoriales.
- **Inputs:** etiqueta visible encima, borde `line`, foco con borde verde + halo suave. Formulario mínimo: nombre, email, motivo, mensaje opcional.
- **FAQ:** `details/summary` nativo, icono + que rota 45°, schema FAQPage en JSON-LD.
- **Prose del blog:** clase `.prose-gensai` en global.css; H2 en Spectral medium, markers verdes, enlaces verdes subrayados.

## Páginas: patrones estructurales

1. **Hero de home:** tipográfico + loto al 16%. Mary Garzón aparece primero, seguida de la promesa paraguas y los accesos a los tres recorridos.
2. **Sección espejo:** tras el hero, 3 momentos en primera persona del visitante + cierre validante.
3. **Pasos:** "Así de sencillo" con 01/02/03 en Spectral light — los números ganan su sitio porque es una secuencia real.
4. **Bloque Mary:** retrato (placeholder → foto real), historia resumida, credenciales y CTA a `/sobre-mi`.
5. **CTA final "¿Empezamos?":** panel verde, una vez por página, nunca repetido.
6. **Páginas de servicio:** PageHero validante → qué es / cómo funciona / señales u outcomes → marco honesto (no psicología clínica) → FAQ → CTA.
7. **Blog:** colección de contenido real; artículo con schema Article, CTA suave al final.

## Do's and Don'ts

### Do:

- **Do** mantener el blanco estanque y la niebla como superficies dominantes.
- **Do** usar verde para acción y rosa para emoción, con las variantes accesibles para texto/interactivos.
- **Do** escribir en primera persona (Mary), con tuteo y honestidad de marco.
- **Do** componer cada breakpoint; móvil es una columna intencional.
- **Do** aplicar WCAG 2.2 AA, foco visible y `prefers-reduced-motion`.
- **Do** verificar que toda imagen de stock resuelve antes de referenciarla.

### Don't:

- **Don't** reintroducir Playfair Display, el fondo gris azulado ni el loto a pantalla completa (sistema anterior, derogado).
- **Don't** usar crema/arena como fondo de página.
- **Don't** añadir textos degradados, glassmorphism decorativo ni rayas laterales de color en tarjetas.
- **Don't** repetir la sección CTA más de una vez por página ni usar urgencias/pop-ups.
- **Don't** inventar cifras, testimonios ni credenciales. Los huecos se marcan y se rellenan con material real.
- **Don't** sobre-redondear (cards máx 16px) ni mezclar estilos de icono.
