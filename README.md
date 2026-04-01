# Design Copilot

Copilot conversacional para diseñadores. Describe una pantalla en lenguaje natural y el copilot la construye respetando el design system — sin tocar Figma ni escribir código.

## Instalación

```bash
curl -fsSL https://raw.githubusercontent.com/david-delaiglesia/design-copilot/main/install.sh | bash
```

El script instala todo automáticamente y registra el skill en Claude desktop.

> **Repo privado:** cuando git pida credenciales, introduce tu usuario y un Personal Access Token de GitHub con scope `repo`.

## Uso

1. Abre **Claude desktop**
2. Escribe `/design-copilot`
3. Describe la pantalla que necesitas
4. El copilot hace las preguntas, genera el código y muestra la preview

## Actualizar

El mismo comando de instalación detecta si ya está instalado y actualiza a la última versión:

```bash
curl -fsSL https://raw.githubusercontent.com/david-delaiglesia/design-copilot/main/install.sh | bash
```

## Estructura interna

```
~/.design-copilot/        ← directorio de instalación
├── CLAUDE.md             → reglas del design system
├── .claude/skills/
│   └── design-copilot.md → el skill (se copia a ~/.claude/skills/)
├── ds/                   → design system (componentes + tokens)
└── starter/              → proyecto React donde se generan las pantallas
```
