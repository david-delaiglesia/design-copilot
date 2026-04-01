import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TabBar } from './TabBar'
import type { TabBarProps, TabItem } from './TabBar'

// ─── Meta ──────────────────────────────────────────────────────────────────

const meta: Meta<typeof TabBar> = {
  title: 'DS / TabBar',
  component: TabBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**TabBar** — Nodo Figma: \`9521:24631\` (archivo \`FEljlfuJJLO8TzfwShLKoR\`)

### Comportamiento por breakpoint
| Breakpoint | Layout | Posición |
|---|---|---|
| Mobile (< 600px) | Footer horizontal | \`fixed; bottom: 0\` |
| Tablet/Desktop (≥ 600px) | Sidebar vertical | \`fixed; left: 0; top: 0; height: 100%\` |

### Reglas críticas (CLAUDE.md)
- **Siempre icono + label** — nunca solo uno de los dos
- **Máximo 4 tabs** — si el brief propone más → preguntar al diseñador
- **Logo no clickable** — solo decorativo
- Labels largos se truncan con elipsis
- No usar para navegar entre páginas con routing de URL (eso es el sistema de navegación del producto)
        `,
      },
    },
  },
  argTypes: {
    tabs: { control: false },
    logo: { control: false },
    onTabChange: { action: 'tab changed' },
    _static: {
      control: 'boolean',
      description: 'Solo Storybook: elimina position:fixed para embeber en canvas.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof TabBar>

// ─── Iconos de ejemplo (currentColor) ────────────────────────────────────────

const IconHome = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
)

const IconVehicle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 17H3V11L5.5 5H18.5L21 11V17H19M5 17C5 18.1046 5.89543 19 7 19C8.10457 19 9 18.1046 9 17M5 17C5 15.8954 5.89543 15 7 15C8.10457 15 9 15.8954 9 17M19 17C19 18.1046 18.1046 19 17 19C15.8954 19 15 18.1046 15 17M19 17C19 15.8954 18.1046 15 17 15C15.8954 15 15 15.8954 15 17M9 17H15"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
)

const IconDriver = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IconReport = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 8H16M8 12H16M8 16H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IconSettings = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

// Logo de ejemplo (solo tablet)
const LogoApp = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <rect width="40" height="40" rx="10" fill="var(--colors\/pitufo-100)" />
    <path d="M10 20L20 10L30 20L20 30L10 20Z" fill="white" />
  </svg>
)

// ─── Sets de tabs reutilizables ───────────────────────────────────────────────

const TABS_2: TabItem[] = [
  { id: 'home',    label: 'Inicio',    icon: <IconHome /> },
  { id: 'fleet',   label: 'Flota',     icon: <IconVehicle /> },
]

const TABS_3: TabItem[] = [
  { id: 'home',    label: 'Inicio',    icon: <IconHome /> },
  { id: 'fleet',   label: 'Flota',     icon: <IconVehicle /> },
  { id: 'drivers', label: 'Conductores', icon: <IconDriver /> },
]

const TABS_4: TabItem[] = [
  { id: 'home',    label: 'Inicio',    icon: <IconHome /> },
  { id: 'fleet',   label: 'Flota',     icon: <IconVehicle /> },
  { id: 'drivers', label: 'Conductores', icon: <IconDriver /> },
  { id: 'reports', label: 'Informes',  icon: <IconReport /> },
]

// ─── Wrapper interactivo (gestiona estado activeTabId) ───────────────────────

function InteractiveTabBar(props: Omit<TabBarProps, 'onTabChange'> & { initialTab?: string }) {
  const { initialTab, ...rest } = props
  const [active, setActive] = useState(initialTab ?? rest.tabs[0]?.id ?? '')
  return <TabBar {...rest} activeTabId={active} onTabChange={setActive} />
}

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Mobile2Tabs: Story = {
  name: 'Mobile / 2 tabs',
  render: () => (
    <div style={{ minHeight: 200, position: 'relative' }}>
      <InteractiveTabBar tabs={TABS_2} activeTabId="home" _static />
    </div>
  ),
}

export const Mobile3Tabs: Story = {
  name: 'Mobile / 3 tabs',
  render: () => (
    <div style={{ minHeight: 200, position: 'relative' }}>
      <InteractiveTabBar tabs={TABS_3} activeTabId="home" _static />
    </div>
  ),
}

export const Mobile4Tabs: Story = {
  name: 'Mobile / 4 tabs',
  render: () => (
    <div style={{ minHeight: 200, position: 'relative' }}>
      <InteractiveTabBar tabs={TABS_4} activeTabId="home" _static />
    </div>
  ),
}

export const MobileActiveTab2: Story = {
  name: 'Mobile / Tab 2 activo',
  render: () => (
    <div style={{ minHeight: 200, position: 'relative' }}>
      <InteractiveTabBar tabs={TABS_4} activeTabId="fleet" _static />
    </div>
  ),
}

export const TabletSidebar2Tabs: Story = {
  name: 'Tablet / 2 tabs',
  render: () => (
    <div style={{ minHeight: 600, display: 'flex' }}>
      <InteractiveTabBar tabs={TABS_2} activeTabId="home" logo={<LogoApp />} _static />
    </div>
  ),
}

export const TabletSidebar3Tabs: Story = {
  name: 'Tablet / 3 tabs',
  render: () => (
    <div style={{ minHeight: 600, display: 'flex' }}>
      <InteractiveTabBar tabs={TABS_3} activeTabId="home" logo={<LogoApp />} _static />
    </div>
  ),
}

export const TabletSidebar4Tabs: Story = {
  name: 'Tablet / 4 tabs',
  render: () => (
    <div style={{ minHeight: 600, display: 'flex' }}>
      <InteractiveTabBar tabs={TABS_4} activeTabId="home" logo={<LogoApp />} _static />
    </div>
  ),
}

export const TabletActiveTab3: Story = {
  name: 'Tablet / Tab 3 activo',
  render: () => (
    <div style={{ minHeight: 600, display: 'flex' }}>
      <InteractiveTabBar tabs={TABS_4} activeTabId="drivers" logo={<LogoApp />} _static />
    </div>
  ),
}

export const LongLabels: Story = {
  name: 'Labels largos (truncado)',
  render: () => (
    <div style={{ minHeight: 200, position: 'relative' }}>
      <InteractiveTabBar
        tabs={[
          { id: 'a', label: 'Inicio de sesión',   icon: <IconHome /> },
          { id: 'b', label: 'Gestión de flota',    icon: <IconVehicle /> },
          { id: 'c', label: 'Conductores activos', icon: <IconDriver /> },
          { id: 'd', label: 'Informes detallados', icon: <IconReport /> },
        ]}
        activeTabId="a"
        _static
      />
    </div>
  ),
}

export const Playground: Story = {
  name: '⚙️ Playground (fijo en pantalla)',
  render: () => (
    <div style={{ minHeight: '100vh', background: 'var(--background\/primary)' }}>
      <p style={{
        padding: '24px',
        color: 'var(--label\/secondary)',
        fontFamily: 'Roboto, sans-serif',
        fontSize: 14,
      }}>
        ↓ Tab bar fija en la parte inferior (mobile) o izquierda (tablet+)
      </p>
      <InteractiveTabBar tabs={TABS_4} activeTabId="home" logo={<LogoApp />} />
    </div>
  ),
}
