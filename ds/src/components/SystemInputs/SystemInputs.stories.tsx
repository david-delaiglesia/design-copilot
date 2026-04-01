import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextInput, Dropdown, DatePicker } from './index'
import type { DropdownOption } from './index'

// ─── Wrapper helpers ──────────────────────────────────────────────────────────

const Container = ({ children }: { children: React.ReactNode }) => (
  <div style={{ maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 24, padding: 24 }}>
    {children}
  </div>
)

// ─── TextInput Meta ───────────────────────────────────────────────────────────

const textInputMeta: Meta<typeof TextInput> = {
  title: 'DS / SystemInputs / TextInput',
  component: TextInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**TextInput** — Nodo Figma: \`789:193\`

### Reglas críticas (CLAUDE.md)
- **Label siempre visible** — nunca omitir
- **Validación on blur** — el padre llama \`onBlur\` y pasa el mensaje de error como prop \`error\`
- Si hay error y el usuario intenta avanzar → bloquear la acción
        `,
      },
    },
  },
  argTypes: {
    type: { control: 'radio', options: ['text', 'password'] },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
    onBlur: { action: 'blurred' },
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    value: '',
    type: 'text',
    disabled: false,
  },
}

export default textInputMeta
type TIStory = StoryObj<typeof TextInput>

export const TextDefault: TIStory = {
  name: 'TextInput / Default',
  args: { label: 'Nombre', placeholder: 'Introduce tu nombre' },
}

export const TextFilled: TIStory = {
  name: 'TextInput / Filled',
  args: { label: 'Nombre', value: 'Juan López' },
}

export const TextError: TIStory = {
  name: 'TextInput / Error',
  args: {
    label: 'Email',
    value: 'no-es-un-email',
    error: 'El formato de email no es válido',
  },
}

export const TextDisabled: TIStory = {
  name: 'TextInput / Disabled',
  args: { label: 'Email', placeholder: 'no disponible', disabled: true },
}

export const PasswordDefault: TIStory = {
  name: 'TextInput / Password default',
  args: { label: 'Contraseña', type: 'password', placeholder: '••••••••' },
}

export const PasswordError: TIStory = {
  name: 'TextInput / Password error',
  args: {
    label: 'Contraseña',
    type: 'password',
    value: '123',
    error: 'Mínimo 8 caracteres',
  },
}

export const TextInteractive: TIStory = {
  name: 'TextInput / Interactivo (validación on blur)',
  render: () => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    function handleBlur(v: string) {
      if (!v.trim()) {
        setError('El campo es obligatorio')
        setSuccess(false)
      } else if (v.length < 3) {
        setError('Mínimo 3 caracteres')
        setSuccess(false)
      } else {
        setError('')
      }
    }

    return (
      <Container>
        <TextInput
          label="Nombre del conductor"
          placeholder="Introduce el nombre"
          value={value}
          onChange={setValue}
          onBlur={handleBlur}
          error={error}
          required
        />
        <TextInput
          label="Contraseña"
          type="password"
          placeholder="Mínimo 8 caracteres"
          onBlur={(v) => {
            if (v.length < 8) setError('Mínimo 8 caracteres')
          }}
        />
      </Container>
    )
  },
}

export const AllTextStates: TIStory = {
  name: 'TextInput / Todos los estados',
  render: () => (
    <Container>
      <TextInput label="Default" placeholder="Placeholder" />
      <TextInput label="Filled" value="Juan López" />
      <TextInput label="Filled" value="juan@flota.com" />
      <TextInput label="Error" value="no-email" error="Formato inválido" />
      <TextInput label="Disabled" placeholder="No disponible" disabled />
      <TextInput label="Password" type="password" placeholder="••••••••" />
      <TextInput label="Password error" type="password" value="123" error="Mínimo 8 caracteres" />
    </Container>
  ),
}
