import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs } from './index'
import type { TabsProps } from './index'

// ─── Icono placeholder ──────────────────────────────────────────────────────

const IconSlash = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
    <line x1="4" y1="4" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

// ─── Meta ───────────────────────────────────────────────────────────────────

const meta: Meta<typeof Tabs> = {
  title: 'DS / Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tabs>

// ─── Wrapper controlado (estado local) ──────────────────────────────────────

function ControlledTabs(props: Omit<TabsProps, 'activeTab' | 'onChange'> & { initialTab?: string }) {
  const { initialTab, ...rest } = props
  const [active, setActive] = useState(initialTab ?? rest.tabs[0]?.id ?? '')
  return <Tabs {...rest} activeTab={active} onChange={setActive} />
}

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Priority=Primary, Type=Label — configuración por defecto */
export const PrimaryLabel: Story = {
  render: () => (
    <ControlledTabs
      tabs={[
        { id: 'tab1', label: 'Activos' },
        { id: 'tab2', label: 'Inactivos' },
      ]}
      priority="primary"
      type="label"
    />
  ),
}

/** Priority=Secondary, Type=Label */
export const SecondaryLabel: Story = {
  render: () => (
    <ControlledTabs
      tabs={[
        { id: 'tab1', label: 'Activos' },
        { id: 'tab2', label: 'Inactivos' },
      ]}
      priority="secondary"
      type="label"
    />
  ),
}

/** 3 tabs */
export const ThreeTabs: Story = {
  render: () => (
    <ControlledTabs
      tabs={[
        { id: 'tab1', label: 'Todos' },
        { id: 'tab2', label: 'Activos' },
        { id: 'tab3', label: 'Inactivos' },
      ]}
      priority="primary"
      type="label"
    />
  ),
}

/** 4 tabs */
export const FourTabs: Story = {
  render: () => (
    <ControlledTabs
      tabs={[
        { id: 'tab1', label: 'Todos' },
        { id: 'tab2', label: 'Activos' },
        { id: 'tab3', label: 'Inactivos' },
        { id: 'tab4', label: 'Archivados' },
      ]}
      priority="primary"
      type="label"
    />
  ),
}

/** Type=Label+Icon */
export const LabelIcon: Story = {
  render: () => (
    <ControlledTabs
      tabs={[
        { id: 'tab1', label: 'Vehículos', icon: <IconSlash /> },
        { id: 'tab2', label: 'Conductores', icon: <IconSlash /> },
      ]}
      priority="primary"
      type="label+icon"
    />
  ),
}

/** Type=Label+Badge */
export const LabelBadge: Story = {
  render: () => (
    <ControlledTabs
      tabs={[
        { id: 'tab1', label: 'Pendientes', badge: 3 },
        { id: 'tab2', label: 'Resueltas', badge: 12 },
      ]}
      priority="primary"
      type="label+badge"
    />
  ),
}

/** Priority=Secondary, Type=Label+Badge */
export const SecondaryBadge: Story = {
  render: () => (
    <ControlledTabs
      tabs={[
        { id: 'tab1', label: 'Pendientes', badge: 3 },
        { id: 'tab2', label: 'Resueltas', badge: 12 },
      ]}
      priority="secondary"
      type="label+badge"
    />
  ),
}
