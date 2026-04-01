import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { DatePicker } from './DatePicker'

const Container = ({ children }: { children: React.ReactNode }) => (
  <div style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 24, padding: 24 }}>
    {children}
  </div>
)

const meta: Meta<typeof DatePicker> = {
  title: 'DS / SystemInputs / DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**DatePicker** — Nodo Figma: \`9874:6596\`

El picker usa el **date picker nativo del sistema** — Figma especifica explícitamente
"Date picker del sistema". Al hacer click en el campo o el icono de calendario,
se abre el selector nativo del navegador/SO.

### Formato
- Visualización: **dd/mm/yyyy** (europeo)
- Valor interno: **YYYY-MM-DD** (ISO, estándar HTML)

### Reglas críticas (CLAUDE.md)
- **Label siempre visible**
- **Validación on blur**
- Si el brief no especifica el formato → preguntar antes de implementar
- Si el brief no especifica si es fecha única o rango → preguntar antes de implementar
        `,
      },
    },
  },
  argTypes: {
    value: { control: 'text', description: 'Formato YYYY-MM-DD' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
    onBlur: { action: 'blurred' },
  },
  args: {
    label: 'Fecha',
    placeholder: 'dd/mm/yyyy',
  },
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const DPDefault: Story = {
  name: 'DatePicker / Sin fecha',
  args: { label: 'Fecha de incorporación' },
}

export const DPSelected: Story = {
  name: 'DatePicker / Con fecha',
  args: { label: 'Fecha de incorporación', value: '2025-08-16' },
}

export const DPError: Story = {
  name: 'DatePicker / Error',
  args: { label: 'Fecha de incorporación', error: 'La fecha es obligatoria' },
}

export const DPDisabled: Story = {
  name: 'DatePicker / Disabled',
  args: { label: 'Fecha de incorporación', value: '2025-08-16', disabled: true },
}

export const DPInteractive: Story = {
  name: 'DatePicker / Interactivo (validación on blur)',
  render: () => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    return (
      <Container>
        <DatePicker
          label="Fecha de incorporación"
          value={value}
          onChange={setValue}
          onBlur={(v) => {
            if (!v) setError('La fecha es obligatoria')
            else setError('')
          }}
          error={error}
          required
        />
      </Container>
    )
  },
}

export const AllDPStates: Story = {
  name: 'DatePicker / Todos los estados',
  render: () => (
    <Container>
      <DatePicker label="Sin fecha" />
      <DatePicker label="Con fecha" value="2025-08-16" />
      <DatePicker label="Error" error="La fecha es obligatoria" />
      <DatePicker label="Disabled" value="2025-08-16" disabled />
    </Container>
  ),
}
