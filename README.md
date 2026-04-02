# Design Copilot

Copilot conversacional para diseñadores. Describe una pantalla en lenguaje natural y el copilot la construye respetando el design system — sin tocar Figma ni escribir código.

## Instalación

### Opción A — Plugin para Claude desktop (recomendado)

```bash
curl -fsSL https://raw.githubusercontent.com/david-delaiglesia/design-copilot/main/install.sh | bash
```

El script instala todo automáticamente y registra el skill en Claude desktop.

> **Repo privado:** cuando git pida credenciales, introduce tu usuario y un Personal Access Token de GitHub con scope `repo`.

### Opción B — Clonar el repo y trabajar directamente

Para contribuir al proyecto o trabajar con Claude Code sobre el repo:

```bash
git clone git@github.com:david-delaiglesia/design-copilot.git
cd design-copilot
bash setup.sh
```

`setup.sh` solo se ejecuta una vez al instalar. Configura las integraciones necesarias (como el MCP de Figma) según tu flujo de trabajo.

## Uso con Claude desktop (Opción A)

1. Abre **Claude desktop**
2. Escribe `/design-copilot`
3. Describe la pantalla que necesitas
4. El copilot hace las preguntas, genera el código y muestra la preview

## Uso con Claude Code (Opción B)

1. Abre el repo en Claude Code (`claude` desde la carpeta del repo)
2. Copia el prompt de inicio correspondiente a tu flujo desde `PROMPTS.md`
3. Pégalo en Claude Code al arrancar la sesión

**Sin Figma:** usa el prompt "Sin referencias de Figma"
**Con Figma:** usa el prompt "Con referencias de Figma" — asegúrate de que el MCP esté activo (`/mcp`)

## Actualizar

El mismo comando de instalación detecta si ya está instalado y actualiza a la última versión:

```bash
curl -fsSL https://raw.githubusercontent.com/david-delaiglesia/design-copilot/main/install.sh | bash
```

Si trabajas con el repo clonado (Opción B):

```bash
git pull
```

## Storybook de referencia

Los componentes del design system están documentados en el Storybook del repo `ds/`:

```bash
cd ds
npm install
npm run storybook
```

Abre `http://localhost:6006` para explorar los componentes disponibles, sus variantes y props.

## Estructura interna

```
design-copilot/
├── CLAUDE.md             → reglas del design system (fuente de verdad)
├── PROMPTS.md            → prompts de inicio para el equipo
├── setup.sh              → configuración inicial (ejecutar una vez)
├── install.sh            → instalación como plugin (Opción A)
├── .claude/skills/
│   └── design-copilot.md → el skill conversacional
├── ds/                   → design system (componentes + tokens + Storybook)
└── starter/              → proyecto React donde se generan las pantallas
```
