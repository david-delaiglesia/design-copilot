# Design Copilot

Copilot conversacional para diseñadores. Describe una pantalla en lenguaje natural y el copilot la construye respetando el design system.

## Setup

```bash
# 1. Clona el repo
git clone https://github.com/david-delaiglesia/design-copilot.git
cd design-copilot

# 2. Instala dependencias del DS
cd ds && npm install && cd ..

# 3. Instala dependencias del starter
cd starter && npm install && cd ..
```

## Uso

1. Abre la carpeta `design-copilot` en Claude desktop
2. Escribe `/design-copilot`
3. Describe la pantalla que necesitas
4. El copilot hace las preguntas, genera el código y te muestra la preview

## Estructura

```
design-copilot/
├── CLAUDE.md              → Reglas del design system
├── .claude/skills/
│   └── design-copilot.md → El copilot
├── ds/                    → Design system (componentes + tokens)
└── starter/               → Proyecto React donde se generan las pantallas
```
