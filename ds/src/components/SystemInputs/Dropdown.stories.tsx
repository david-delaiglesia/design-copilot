import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Dropdown } from './Dropdown'

const Container = ({ children }: { children: React.ReactNode }) => (
  <div style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 24, padding: 24 }}>
    {children}
  </div>
)

const VEHICLE_TYPES: { value: string; label: string }[] = [
  { value: 'turismo', label: 'Turismo' },
  { value: 'furgoneta', label: 'Furgoneta' },
  { value: 'camion', label: 'Camión' },
  { value: 'moto', label: 'Motocicleta' },
]

const meta: Meta<typeof Dropdown> = {
  title: 'DS / SystemInputs / Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Dropdown** — Nodo Figma: \`748:183\`

### Reglas críticas (CLAUDE.md)
- **Label siempre visible**
- **Validación on blur** — se activa al cerrar el panel sin selección
- **No inventar opciones** — siempre requieren datos reales del brief
- Si las opciones no están en el brief → preguntar al diseñador
        `,
      },
    },
  },
  argTypes: {
    options: { control: false },
    onChange: { action: 'changed' },
    onBlur: { action: 'blurred' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Tipo de vehículo',
    placeholder: 'Selecciona una opción',
    options: VEHICLE_TYPES,
  },
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const DropdownDefault: Story = {
  name: 'Dropdown / Sin selección',
  args: { value: undefined },
}

export const DropdownSelected: Story = {
  name: 'Dropdown / Con selección',
  args: { value: 'turismo' },
}

export const DropdownError: Story = {
  name: 'Dropdown / Error',
  args: { value: undefined, error: 'Selecciona un tipo de vehículo' },
}

export const DropdownDisabled: Story = {
  name: 'Dropdown / Disabled',
  args: { value: 'turismo', disabled: true },
}

export const DropdownInteractive: Story = {
  name: 'Dropdown / Interactivo (validación on blur)',
  render: () => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    return (
      <Container>
        <Dropdown
          label="Tipo de vehículo"
          placeholder="Selecciona una opción"
          options={VEHICLE_TYPES}
          value={value}
          onChange={(v) => { setValue(v); setError('') }}
          onBlur={() => { if (!value) setError('El tipo de vehículo es obligatorio') }}
          error={error}
          required
        />
      </Container>
    )
  },
}

export const AllDropdownStates: Story = {
  name: 'Dropdown / Todos los estados',
  render: () => (
    <Container>
      <Dropdown label="Sin selección" placeholder="Selecciona..." options={VEHICLE_TYPES} />
      <Dropdown label="Con selección" value="furgoneta" options={VEHICLE_TYPES} />
      <Dropdown label="Error" error="Campo obligatorio" options={VEHICLE_TYPES} />
      <Dropdown label="Disabled" value="camion" options={VEHICLE_TYPES} disabled />
    </Container>
  ),
}
