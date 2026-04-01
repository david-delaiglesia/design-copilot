# CLAUDE.md — Design System Rules

Este archivo define cómo Claude Code debe trabajar con el design system para generar código consistente, correcto y alineado con los estándares del equipo.

Léelo completo antes de generar cualquier componente o vista.

---

## Contexto del proyecto

- **Stack web:** React + TypeScript
- **Referencia visual:** Figma (fuente de verdad)
- **Componentes en código:** Storybook (repo separado, en construcción)
- **Plataformas:** Web (React), iOS (SwiftUI), Android (Compose)

Este CLAUDE.md aplica al piloto web en React.

---

## Contexto de usuario

El producto es un back-office mobile-first para gestión de flotas de vehículos. Los usuarios son trabajadores operativos (conductores, gestores de flota) que usan la app en contextos de trabajo real — no usuarios técnicos. Las decisiones de UX deben priorizar claridad y rapidez de acción sobre riqueza funcional.

---

## Flujo de trabajo obligatorio

Antes de generar cualquier componente o vista:

1. Leer el brief completo
2. Identificar qué componentes del DS aplican
3. Leer el contexto de diseño del nodo de Figma correspondiente con `get_design_context`
4. Aplicar las reglas de este archivo
5. Si hay **cualquier ambigüedad o información que falta**, **preguntar al diseñador antes de implementar** — sin excepción

**Regla absoluta: nunca interpretar ni asumir. Siempre preguntar.**
**Coherencia entre vistas y secciones:** el orden de campos, jerarquía de información y patrones visuales deben ser consistentes en toda la aplicación — no solo dentro de una vista. Si un campo ocupa el primer puesto en una sección, debe ocuparlo en todas las secciones equivalentes.
Si Figma muestra un patrón visual claro que no existe en el DS, seguirlo fielmente — no sustituirlo por el componente del DS más parecido ni inventar una solución propia. Si el patrón de Figma parece incoherente con el sistema, preguntar antes de implementar.
Si el brief no especifica algo, no se interpreta, no se infiere, no se decide por cuenta propia. Se para y se pregunta. Esta regla tiene prioridad sobre cualquier otra consideración.

No generar nunca desde cero sin haber leído el nodo de Figma.

---

## Principios de decisión

### OK
- Usar siempre componentes del DS existentes
- Respetar jerarquía visual: Primary > Secondary > Tertiary
- Preguntar cuando el brief es ambiguo
- Validar on blur en todos los inputs
- Usar tokens de color y espaciado, nunca valores hardcodeados
- Implementar comportamiento responsive según breakpoints definidos

### KO
- Crear variantes de componentes que no existen en Figma
- Generar dos botones Primary en la misma vista
- Usar Button para navegar entre pantallas
- Poner botones dentro de Cards
- Anidar Cards dentro de Cards
- Hardcodear colores o tamaños sin usar variables CSS
- **Usar estilos inline (`style={{}}`) en JSX — todos los estilos van en clases CSS en `global.css` usando tokens del DS**
- Renderizar ListItems sueltos sin su caja contenedora (`.list-box`)
- Poner un gap distinto de 8px entre un título de sección (`.section-title`) y el bloque de contenido que le sigue (lista, card, bloque). **Siempre 8px de separación título→contenido, sin excepción**
- Añadir contenido no especificado en el brief
- Omitir el label en inputs
- Implementar sin leer el nodo de Figma
- **Interpretar, asumir o inferir cualquier dato no especificado en el brief — siempre preguntar antes**
- **Modificar un componente del DS por cuenta propia** — los componentes se usan tal cual están definidos, sin alterar su estructura, props o estilos internos
- **Inventar una solución cuando el componente no soporta algo** — en ese caso, parar y notificar (ver sección "Integridad de componentes")

---

## Integridad de componentes

**Los componentes del DS son inmutables.** Se usan tal cual están definidos — nunca se modifican, extienden ni adaptan por cuenta propia.

**Cuando el brief pide algo que un componente no permite:**
Parar. No inventar. No aproximar. Notificar al diseñador con este mensaje exacto:

> "Ese cambio va en contra de lo definido en el design system. No es posible realizarlo con los componentes actuales. Si es necesario, escálalo para que alguien lo cree y lo suba al repositorio."

**Cuando el brief describe un patrón que no existe en el DS:**
Avisar antes de implementar:

> "Para [X] no existe un componente en el design system. ¿Quieres que lo construya con elementos base del DS, o lo escalamos para crear el componente?"

**Cuando hay incoherencia entre vistas:**
No implementar sin avisar:

> "Esto no es consistente con [pantalla existente] — en esa pantalla [campo X] aparece en [posición Y]. ¿Quieres ajustarlo o procedo de todas formas?"

---

## Dark y light mode

Todo proyecto piloto soporta ambos modos por defecto.

- Si el brief no especifica tema → usar configuración del dispositivo (`prefers-color-scheme`)
- Si el brief especifica un tema → aplicarlo, pero sin eliminar el soporte para el otro
- **Nunca forzar un tema sin que el brief lo indique explícitamente**
- Los tokens del DS ya contemplan ambos modos — usar siempre `var(--token)`, nunca valores hex

---

## PWA — obligatorio en todo proyecto piloto

Todo starter debe estar configurado como PWA para funcionar sin barra de navegador
al añadirse a la pantalla de inicio (iOS y Android).

**`public/manifest.json`** — debe existir con al menos:
```json
{
  "name": "[nombre del proyecto]",
  "short_name": "[nombre corto]",
  "start_url": "/",
  "display": "standalone",
  "background_color": "[valor de background/secondary del DS]",
  "theme_color": "[valor de background/secondary del DS]",
  "icons": []
}
```

**`index.html`** — debe incluir en `<head>`:
```html
<link rel="manifest" href="/manifest.json">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

Si alguno de estos archivos no existe o está incompleto → crearlo o completarlo
como parte de la generación. No es opcional.

---

## Breakpoints

| Nombre | Rango | Tab bar |
|---|---|---|
| Mobile (S) | 0 – 600px | Footer horizontal |
| Tablet (M) | 600 – 1280px | Lateral izquierdo vertical |
| Desktop (L) | 744px+ | Lateral izquierdo vertical |

---

## Layout

- Márgenes laterales mobile: 24px
- Espaciado vertical entre secciones: 32px (todos los dispositivos)
- **Padding entre el header y el primer elemento de cualquier vista: 32px** — sin excepciones
- **Distancia entre el título de sección y el bloque de contenido que encabeza: 8px** — sin excepciones
- **Distancia entre cards o bloques de contenido dentro de un mismo bloque: 8px** — sin excepciones
- **Todo listado o bloque de contenido lleva siempre un título de sección visible**, salvo que el brief indique explícitamente lo contrario
- Título y bloque de contenido deben estar siempre en el mismo contenedor — nunca en contenedores separados que acumulen padding
- Sin grid de columnas fijo — distribución por contenido y espacio disponible
- Header y Tab bar siempre fijos — nunca hacen scroll
- Todo el contenido hace scroll
- **Ancho máximo del área de contenido: 600px, centrada horizontalmente** (`max-width: 600px; margin: 0 auto`). Aplica en todos los breakpoints. En desktop/tablet el contenido nunca supera ese ancho aunque haya más espacio disponible.

## Clases utilitarias del starter

El starter incluye clases CSS listas para usar. **La IA debe usar estas clases en lugar de escribir estilos inline (`style={{}}`).** Si necesita un estilo no cubierto, debe crear una clase nueva en `global.css` — nunca inline.

| Clase | Uso |
|---|---|
| `.list-box` | **Obligatoria** — envuelve todo grupo de `ListItem`. Fondo, border-radius 16px, overflow hidden, sombra |
| `.detalle-block` | Bloque de datos key-value (filas label↔value). Fondo, border-radius, padding, sombra |
| `.listado-wrapper` | Wrapper de listados completos (padding 32px 24px 120px) |
| `.section-title` | Título de sección. **Gap de 8px** entre el título y el bloque de contenido que le sigue — irrenunciable |
| `.section-header` | Sección con título a la izquierda y acción a la derecha |
| `.dialog-inputs` | Agrupa inputs dentro de un Dialog (flex column, gap 16px) |
| `.action-center` | Centra un botón con padding inferior |
| `.delete-action` | Botón de eliminar en accessory de ListItem (tomato-100, sin fondo) |
| `.empty-state` / `.empty-state-text` | Estado vacío centrado |
| `.avatar` / `.avatar--large` / `.avatar--xlarge` | Avatar circular con iniciales |
| `.detalle-header-section` | Cabecera de detalle (avatar + nombre + email centrados) |

**Regla absoluta: cero `style={{}}` en JSX. Todo va en clases CSS con tokens del DS.**

---

## Tab Bar

- **El Tab Bar está presente en todas las vistas de la aplicación**, salvo que el brief indique explícitamente lo contrario.
- No se elimina ni se oculta al navegar en drill-down ni en vistas de detalle.
- Si el brief no menciona el Tab Bar, se incluye por defecto.
- **El logo va en el Tab Bar, nunca en el Header.** En web el Tab Bar lateral ya muestra el logo — el Header siempre se implementa con `showLogo={false}`.

---

## Tokens base

```css
/* Colores */
--colors/pitufo-100: #0a89ff          /* Acción principal */
--label/secondary: rgba(226,230,233,0.95)
--label/tertiary: rgba(171,179,186,0.85)
--label/oncolor: rgba(240,242,244,0.98)
--background-content-box/secondary: #2c2e2f
--background/tertiary: #2d2e2f
--fills/primary: rgba(99,102,105,0.36)
--fills/transparent: rgba(255,255,255,0)
--separators/quaternary: rgba(84,87,89,0.34)

/* Tipografía */
--font-family: 'Roboto'
--font-label: 12px Regular
--font-control: 14px Regular
--font-body: 16px Regular / Medium / Bold
--font-title: 20px Bold

/* Forma */
--borderradius/full: 100px
```

---

## Componentes — reglas críticas

### Button (node-id: 3542:9866)
- Máximo un `Primary` por vista
- Guardar/Cancelar → Primary/Tertiary siempre
- `type=Icon` solo si espacio reducido Y acción universalmente reconocible
- No usar para navegar — es un disparador de acción
- Loading: usar `type=Loading`, no añadir spinner encima
- Disabled sin explicación visible → advertir al diseñador

### Imágenes de personas

- Las fotos o avatares de personas siempre usan forma **circular** — nunca cuadrada ni redondeada
- En componentes del DS que acepten `imageShape`, usar siempre `imageShape="round"` para personas
- El `li-icon-bg` del ListItem tiene `border-radius: 8px` por defecto — sobreescribir a `50%` cuando el contenido sea un avatar de persona

### Card (node-id: 3806:22512)
- No anidar Cards
- No añadir botones dentro del slot de contenido
- `height=2` siempre que haya contenido en el slot
- Si el contenido es complejo → preguntar antes de implementar
- Anchura mobile siempre variable, nunca fija

### System Inputs (text-input: 789:193 / dropdown: 748:183 / date-picker: 9874:6596)
- Todo input lleva label visible. Sin excepciones
- Validación on blur siempre
- Si hay error y el usuario intenta avanzar → bloquear la acción
- Formato date picker y obligatoriedad → preguntar si no está en el brief

### List Item (node-id: 14292:242)
- `Lines=1` por defecto
- Chevron (›) es icono, no botón — onClick en la fila entera
- Siempre divider entre filas
- Icono opcional según brief — preguntar si no se especifica
- **Caja obligatoria:** Todo grupo de ListItems va siempre dentro de un contenedor `.list-box` con `background-content-box/secondary`, `border-radius: 16px`, `overflow: hidden` y `shadow/small`. Los ListItems NUNCA van sueltos sobre el fondo de la app — sin excepción

### Dialogs

- **Los diálogos y modales nunca llevan botón de cierre (×)** — no usar `showClose` ni añadir ningún icono de cierre. El usuario cierra siempre a través de los botones de acción (Cancelar, Cerrar, etc.).
- Modal por defecto — overlay que bloquea el fondo
- Feedback Dialog: tipo de icono y número de botones según tabla de patrones
- Input Dialog: botón Primary siempre activo — error aparece en el campo al intentar avanzar
- No usar dialog para errores de validación de campos inline

### Tabs (node-id: 3735:22579)
- No son navegación — segmentan contenido dentro de una sección
- No añadir routing al cambiar de tab
- `Type=Label` por defecto
- Si el brief propone más de 5 tabs → preguntar al diseñador

### Header (node-id: 6018:17982)
- `home`: accedida desde tab bar
- `navigation`: drill-down desde otra pantalla, lleva back
- `modal`: presentada sobre contenido existente, lleva cierre
- `menu`: con menú de opciones oculto
- Logo no clickable
- Más de 3 acciones → preguntar al diseñador

### Tab Bar (node-id: 9521:24631)
- Mobile: `position: fixed; bottom: 0` con padding-bottom safe area
- Tablet/Desktop: `position: fixed; left: 0; top: 0; height: 100%`
- Siempre icono + label — nunca solo icono ni solo label
- Logo no clickable
- Label largo → truncar con elipsis
- Máximo 4 tabs — si el brief propone más, preguntar

---

## Cuándo preguntar al diseñador

La IA debe pausar y preguntar explícitamente cuando:

- El brief no especifica qué componente usar
- El brief propone contenido complejo dentro de una Card
- El brief no especifica si un campo es obligatorio
- El brief no especifica el formato del date picker
- El brief no especifica si un Loading bloquea la pantalla completa
- El brief propone más de 5 tabs o más de 3 acciones en el header
- El brief no especifica si una Card es clickable o informativa
- Cualquier caso no cubierto por este documento

Formato de pregunta obligatorio:
> "Antes de implementar [X], necesito confirmar: [pregunta concreta]. Si no se especifica, [comportamiento por defecto que aplicaré]."

---

## Lo que nunca hace la IA sin confirmación

- Crear variantes de componentes que no existen en Figma
- Añadir funcionalidad no especificada en el brief
- Decidir si un flujo es destructivo o no (siempre preguntar)
- Elegir iconos sin que estén especificados
- Definir el número de tabs si no está en el brief

---

## Referencia de archivos Figma

| Archivo | Contenido |
|---|---|
| `FEljlfuJJLO8TzfwShLKoR` | Mini-librería pruebas (piloto) |
| `avX9ClI5M1os1YNeop8tSs` | GUI Back Office Mobile (DS origen) |

---

## Sistema de color — cuándo usar cada token

Esta es la sección más crítica para mantener consistencia. **Nunca usar valores hex directamente — siempre usar el nombre del token.**

---

### Colores de acción y marca

| Token | Hex | Cuándo usar |
|---|---|---|
| `colors/pitufo-100` | `#0a89ff` | Acción principal, tab activo, botón Primary, elemento seleccionado |
| `colors/Pitufo-60` | `#0a89ff99` (60% opacidad) | Estado hover o pressed sobre elementos de acción. Nunca como color principal |
| `colors/pitufo-10` | `#0a89ff1a` | Fondo tenue de elementos seleccionados o activos. Nunca en texto |
| `colors/tomato-100` | `#ff4343` | Error, estado KO, acción destructiva, alerta crítica. Nunca decorativo |

### Texto (label)

| Token | Hex | Cuándo usar |
|---|---|---|
| `label/onColor` | `#f0f2f4fa` | Texto sobre fondos de color (botón Primary, badge, elementos con fondo pitufo) |
| `label/higher-contrast` | `#ffffff` | Texto sobre fondos muy oscuros cuando se necesita máximo contraste. Botón Tertiary sobre fondo oscuro |
| `label/secondary` | `#e2e6e9f2` | Texto principal de contenido — títulos de Card, texto en listas, headers |
| `label/tertiary` | `#abb3bad9` | Texto secundario, labels de input, placeholders, tabs inactivas, tab bar inactivo |
| `label/quaternary` | `#61666bcc` | Texto de menor jerarquía, metadatos, información de soporte. Usar con criterio |
| `Label Color/Primary` | `#ffffff` | Reservado para casos especiales de texto primario en modo claro. Preguntar al diseñador si surge |

**Regla crítica de texto:**
- Texto sobre fondo de color → `label/onColor`
- Texto principal sobre fondo neutro → `label/secondary`
- Texto secundario o de soporte → `label/tertiary`
- Texto de acción (tab activa, elemento seleccionado) → `colors/pitufo-100`
- **Nunca mezclar `label/secondary` con `label/onColor` en el mismo contexto**

### Fondos (background y fills)

| Token | Hex | Cuándo usar |
|---|---|---|
| `background-content-box/secondary` | `#2c2e2f` | Fondo de Cards, contenedores de contenido, header |
| `background/tertiary` | `#2d2e2f` | Fondo de dialogs, tab bar, overlays de componentes flotantes |
| `fills/primary` | `#6366695c` | Fondo de inputs (text-input, dropdown, date-picker) |
| `fills/quaternary` | `#6366692e` | Fondo muy sutil, menor peso que fills/primary. Elementos de baja jerarquía |
| `fills/transparent` | `#ffffff00` | Sin fondo — botón Tertiary, tab inactiva, slots vacíos |

**Regla crítica de fondos:**
- Input → siempre `fills/primary`
- Card → siempre `background-content-box/secondary`
- Dialog / Tab bar → siempre `background/tertiary`
- Botón Tertiary → `fills/transparent`
- **Nunca usar `background/tertiary` para Cards ni `background-content-box/secondary` para dialogs**

### Separadores

| Token | Hex | Cuándo usar |
|---|---|---|
| `separators/quaternary` | `#54575957` | Divider entre filas de lista, borde inferior del header, borde del tab bar |

### Estados interactivos

| Token | Hex | Cuándo usar |
|---|---|---|
| `misc/pressed` | `#191a1a4d` | Overlay de estado pressed sobre cualquier elemento interactivo |

---

## Jerarquía de color resumida

```
Acción / Selección activa    → colors/pitufo-100
Error / Destructivo          → colors/tomato-100
Texto sobre color            → label/onColor
Texto principal              → label/secondary
Texto secundario             → label/tertiary
Fondo Card                   → background-content-box/secondary
Fondo Dialog / Tab bar       → background/tertiary
Fondo Input                  → fills/primary
Sin fondo                    → fills/transparent
Separadores                  → separators/quaternary
```

---

## Errores frecuentes de color que la IA debe evitar

- ❌ Usar `label/secondary` para texto sobre botón Primary → usar `label/onColor`
- ❌ Usar `background-content-box/secondary` para dialogs → usar `background/tertiary`
- ❌ Usar `colors/pitufo-100` como color de texto general → solo para acción/selección
- ❌ Usar `colors/tomato-100` de forma decorativa → solo para error o destructivo
- ❌ Hardcodear hex directamente en lugar de usar el token
- ❌ Usar `label/higher-contrast` (#fff) donde debería ir `label/secondary` — son contextos distintos

---

## Sistema de color completo

### El DS tiene dos temas: dark y light

Los tokens son los mismos en ambos temas — los valores hex cambian según el tema activo. **Nunca hardcodear hex — siempre usar el nombre del token.** El sistema de temas se encarga de aplicar el valor correcto.

---

### Paleta de colores base (Colors)

Estos son los colores primitivos del sistema. **No usar directamente en componentes** — usar siempre los tokens semánticos.

| Token | Uso semántico |
|---|---|
| `colors/pitufo-100` | Acción principal, selección activa |
| `colors/pitufo-60` | Estado hover/pressed sobre acción |
| `colors/pitufo-10` | Fondo tenue de selección |
| `colors/tomato-100` | Error, estado KO, destructivo |
| `colors/tomato-60` | Estado hover sobre error |
| `colors/tomato-10` | Fondo tenue de error |
| `colors/cucumber-100` | Éxito, estado OK, validado |
| `colors/cucumber-60` | Estado hover sobre éxito |
| `colors/cucumber-10` | Fondo tenue de éxito |
| `colors/egg-100` | Advertencia, estado warning |
| `colors/egg-60` | Estado hover sobre advertencia |
| `colors/egg-10` | Fondo tenue de advertencia |
| `colors/plum-100` | Informativo, estado neutral destacado |
| `colors/plum-60` | Estado hover sobre informativo |
| `colors/plum-15` | Fondo tenue de informativo |
| `colors/valencia-100` | Color de acento alternativo |
| `colors/valencia-60` | Estado hover sobre valencia |
| `colors/valencia-10` | Fondo tenue de valencia |
| `colors/white` | Blanco puro |
| `colors/black` | Negro puro |

**Regla de uso de colores semánticos:**

```
Acción / Selección    → pitufo
Error / KO            → tomato
Éxito / OK            → cucumber
Advertencia           → egg
Informativo           → plum
```

Para cada color, la jerarquía es:
- `-100` — color principal, elementos de primer plano
- `-60` — hover/pressed, 60% opacidad
- `-10` o `-15` — fondo tenue, muy bajo contraste

---

### Tokens de fondo (Background)

| Token | Cuándo usar |
|---|---|
| `background/primary` | Fondo base de la aplicación — la pantalla completa |
| `background/secondary` | Fondo de nivel intermedio |
| `background/tertiary` | Fondo de dialogs, tab bar, overlays flotantes |
| `background-content-box/primary` | Contenedor de contenido de primer nivel |
| `background-content-box/secondary` | Cards, header — contenedor estándar |
| `background-content-box/tertiary` | Contenedor de menor jerarquía |
| `background-content-box/opposite` | Fondo invertido (contraste con el tema activo) |

**Jerarquía de profundidad:**
```
background/primary                    → capa base (pantalla)
  └── background-content-box/primary  → contenedor principal
        └── background-content-box/secondary  → Card, header
              └── background/tertiary  → dialog, tab bar (flotan sobre todo)
```

---

### Tokens de texto (Label)

| Token | Cuándo usar |
|---|---|
| `label/higher-contrast` | Máximo contraste — texto sobre fondos muy oscuros |
| `label/primary` | Texto de máxima jerarquía |
| `label/secondary` | Texto principal de contenido (títulos, body) |
| `label/tertiary` | Texto secundario, labels, placeholders, inactivos |
| `label/quaternary` | Texto de mínima jerarquía, metadatos |
| `label/on-color` | Texto sobre cualquier fondo de color (botón Primary, badge) |
| `label/opposite` | Texto invertido (contraste con el tema activo) |

**Regla crítica:** Nunca usar `label/secondary` sobre un fondo de color. Siempre `label/on-color`.

---

### Tokens de relleno (Fills)

| Token | Cuándo usar |
|---|---|
| `fills/primary` | Fondo de inputs (text-input, dropdown, date-picker) |
| `fills/secondary` | Relleno de segundo nivel |
| `fills/tertiary` | Contenedor de tabs (fondo pill del segmentado) |
| `fills/quaternary` | Relleno muy sutil, baja jerarquía |
| `fills/transparent` | Sin fondo — botón Tertiary, tab inactiva |

---

### Tokens de separación y estados

| Token | Cuándo usar |
|---|---|
| `separators/tertiary` | Separador de mayor peso visual |
| `separators/quaternary` | Separador estándar — divider listas, bordes header/tab bar |
| `misc/pressed` | Overlay de estado pressed sobre cualquier elemento |
| `misc/overlay` | Overlay de fondo en dialogs modales |

---

### Tabla de decisión rápida

```
¿Texto sobre fondo de color?          → label/on-color
¿Texto principal sobre fondo neutro?  → label/secondary
¿Texto secundario o placeholder?      → label/tertiary
¿Fondo de pantalla completa?          → background/primary
¿Fondo de Card o Header?              → background-content-box/secondary
¿Fondo de Dialog o Tab bar?           → background/tertiary
¿Fondo de Input?                      → fills/primary
¿Sin fondo (Tertiary button)?         → fills/transparent
¿Color de acción/selección?           → colors/pitufo-100
¿Color de error/KO?                   → colors/tomato-100
¿Color de éxito/OK?                   → colors/cucumber-100
¿Color de advertencia?                → colors/egg-100
¿Separador entre filas?               → separators/quaternary
¿Overlay modal?                       → misc/overlay
¿Estado pressed?                      → misc/pressed
```
