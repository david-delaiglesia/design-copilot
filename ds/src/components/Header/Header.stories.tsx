import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Header } from './Header'
import type { HeaderAction } from './Header'

// ─── Meta ──────────────────────────────────────────────────────────────────

const meta: Meta<typeof Header> = {
  title: 'DS / Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Header** — Nodo Figma: \`6018:17982\` (archivo \`FEljlfuJJLO8TzfwShLKoR\`)

### Tipos
| Tipo | Cuándo usarlo | Icono izquierdo |
|---|---|---|
| \`home\` | Pantalla accedida desde tab bar | Logo (opcional) |
| \`navigation\` | Drill-down desde otra pantalla | ← Volver |
| \`modal\` | Presentada sobre contenido existente | × Cerrar |
| \`menu\` | Home con menú de opciones oculto | ≡ Menú |

### Reglas críticas (CLAUDE.md)
- **Siempre fijo** — nunca hace scroll con el contenido
- **Logo no clickable** — solo decorativo
- **Máximo 3 acciones** — si el brief propone más → preguntar al diseñador
- Logo solo disponible en \`type="home"\`
- En tablet/desktop deja espacio para el Tab Bar lateral (78px)
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['home', 'navigation', 'modal', 'menu'],
      description: 'Patrón de navegación — determina el icono izquierdo',
      table: { defaultValue: { summary: 'home' } },
    },
    title: { control: 'text' },
    showTitle: {
      control: 'boolean',
      description: 'Muestra el título en navigation/modal/menu. Ignorado en home (siempre visible).',
      table: { defaultValue: { summary: 'false' } },
    },
    showLogo: {
      control: 'boolean',
      description: 'Muestra el logo. Solo aplica en type="home".',
      table: { defaultValue: { summary: 'true' } },
    },
    logo: { control: false },
    actions: { control: false },
    onBack: { action: 'back' },
    onClose: { action: 'close' },
    onMenuToggle: { action: 'menuToggle' },
    _static: {
      control: 'boolean',
      description: 'Solo Storybook: elimina position:fixed.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  args: {
    title: 'Título',
    showTitle: false,
    showLogo: true,
    _static: true,
  },
}

export default meta
type Story = StoryObj<typeof Header>

// ─── Iconos de acción de ejemplo ─────────────────────────────────────────────

const IconNotification = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconSearch = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IconFilter = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconMore = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="5" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="19" r="1.5" fill="currentColor" />
  </svg>
)

const ACTION_NOTIFICATION: HeaderAction = {
  icon: <IconNotification />, label: 'Notificaciones', onClick: () => {},
}
const ACTION_SEARCH: HeaderAction = {
  icon: <IconSearch />, label: 'Buscar', onClick: () => {},
}
const ACTION_FILTER: HeaderAction = {
  icon: <IconFilter />, label: 'Filtrar', onClick: () => {},
}
const ACTION_MORE: HeaderAction = {
  icon: <IconMore />, label: 'Más opciones', onClick: () => {},
}

// ─── type=home ───────────────────────────────────────────────────────────────

export const Home0Actions: Story = {
  name: 'Home / 0 acciones',
  args: { type: 'home', showLogo: true, actions: [] },
}

export const Home1Action: Story = {
  name: 'Home / 1 acción',
  args: { type: 'home', showLogo: true, actions: [ACTION_NOTIFICATION] },
}

export const Home2Actions: Story = {
  name: 'Home / 2 acciones',
  args: { type: 'home', showLogo: true, actions: [ACTION_NOTIFICATION, ACTION_SEARCH] },
}

export const Home3Actions: Story = {
  name: 'Home / 3 acciones (máximo)',
  args: { type: 'home', showLogo: true, actions: [ACTION_NOTIFICATION, ACTION_SEARCH, ACTION_MORE] },
}

export const HomeNoLogo: Story = {
  name: 'Home / Sin logo',
  args: { type: 'home', showLogo: false, actions: [ACTION_NOTIFICATION] },
}

// ─── type=navigation ─────────────────────────────────────────────────────────

export const NavigationNoTitle: Story = {
  name: 'Navigation / Sin título',
  args: { type: 'navigation', showTitle: false, actions: [] },
}

export const NavigationWithTitle: Story = {
  name: 'Navigation / Con título',
  args: { type: 'navigation', showTitle: true, title: 'Detalle vehículo', actions: [] },
}

export const NavigationWithActions: Story = {
  name: 'Navigation / Con acciones',
  args: {
    type: 'navigation',
    showTitle: true,
    title: 'Detalle vehículo',
    actions: [ACTION_FILTER, ACTION_MORE],
  },
}

// ─── type=modal ──────────────────────────────────────────────────────────────

export const ModalNoTitle: Story = {
  name: 'Modal / Sin título',
  args: { type: 'modal', showTitle: false, actions: [] },
}

export const ModalWithTitle: Story = {
  name: 'Modal / Con título',
  args: { type: 'modal', showTitle: true, title: 'Añadir conductor', actions: [] },
}

export const ModalWithActions: Story = {
  name: 'Modal / Con acciones',
  args: {
    type: 'modal',
    showTitle: true,
    title: 'Editar perfil',
    actions: [ACTION_MORE],
  },
}

// ─── type=menu ───────────────────────────────────────────────────────────────

export const MenuNoTitle: Story = {
  name: 'Menu / Sin título',
  args: { type: 'menu', showTitle: false, actions: [] },
}

export const MenuWithTitle: Story = {
  name: 'Menu / Con título',
  args: { type: 'menu', showTitle: true, title: 'Inicio', actions: [] },
}

// ─── Título largo ─────────────────────────────────────────────────────────────

export const LongTitle: Story = {
  name: 'Título largo (truncado)',
  args: {
    type: 'navigation',
    showTitle: true,
    title: 'Gestión de conductores activos en turno de mañana',
    actions: [ACTION_FILTER, ACTION_MORE],
  },
}

// ─── Playground (fijo en pantalla) ───────────────────────────────────────────

export const Playground: Story = {
  name: '⚙️ Playground',
  args: {
    type: 'home',
    title: 'Flota',
    showLogo: true,
    actions: [ACTION_NOTIFICATION, ACTION_SEARCH],
    _static: true,
  },
}

// ─── Vista de todos los tipos ─────────────────────────────────────────────────

export const AllTypes: Story = {
  name: 'Todos los tipos',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Header type="home"       title="Inicio"            showLogo showTitle={false} actions={[ACTION_NOTIFICATION, ACTION_SEARCH]} _static />
      <Header type="navigation" title="Detalle vehículo"  showTitle actions={[ACTION_MORE]} _static />
      <Header type="modal"      title="Añadir conductor"  showTitle actions={[]} _static />
      <Header type="menu"       title="Inicio"            showTitle={false} actions={[]} _static />
    </div>
  ),
}
