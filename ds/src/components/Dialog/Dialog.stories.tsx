import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FeedbackDialog, InputDialog } from './index'
import { StateIcon } from '../../assets/icons'

// ─── Input placeholder (text) ────────────────────────────────────────────────
// En producción usar el componente SystemInput del DS

interface SimpleInputProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
}

function SimpleInput({ label = 'Label', placeholder = 'Placeholder', value, onChange }: SimpleInputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
      <p style={{
        fontFamily: 'var(--font-family)',
        fontSize: 12,
        fontWeight: 400,
        color: 'var(--label\\/tertiary)',
        margin: 0,
      }}>
        {label}
      </p>
      <div style={{
        background: 'var(--fills\\/primary)',
        borderRadius: 8,
        padding: '16px 24px',
        boxSizing: 'border-box',
      }}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            outline: 'none',
            fontFamily: 'var(--font-family)',
            fontSize: 14,
            fontWeight: 400,
            color: value ? 'var(--label\\/secondary)' : 'var(--label\\/tertiary)',
            caretColor: 'var(--colors\\/pitufo-100)',
          }}
        />
      </div>
    </div>
  )
}

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'DS / Dialog',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

// ─── FeedbackDialog stories ──────────────────────────────────────────────────

/** Éxito — 1 botón Primary */
export const FeedbackSuccess: StoryObj = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <div style={{ padding: 24 }}>
        <button onClick={() => setOpen(true)}>Abrir dialog (Éxito)</button>
        <FeedbackDialog
          open={open}
          onClose={() => setOpen(false)}
          icon={<StateIcon state="ok" size={80} />}
          title="¡Listo!"
          subtitle="El vehículo ha sido registrado correctamente."
          numberOfButtons={1}
          primaryLabel="Continuar"
          onPrimary={() => setOpen(false)}
        />
      </div>
    )
  },
}

/** Error crítico — 1 botón Primary */
export const FeedbackError: StoryObj = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <div style={{ padding: 24 }}>
        <button onClick={() => setOpen(true)}>Abrir dialog (Error)</button>
        <FeedbackDialog
          open={open}
          onClose={() => setOpen(false)}
          icon={<StateIcon state="ko" size={80} />}
          title="Error al guardar"
          subtitle="No se ha podido guardar el formulario. Comprueba tu conexión e inténtalo de nuevo."
          numberOfButtons={1}
          primaryLabel="Reintentar"
          onPrimary={() => setOpen(false)}
        />
      </div>
    )
  },
}

/** Confirmación de acción destructiva — 2 botones */
export const FeedbackDestructive: StoryObj = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <div style={{ padding: 24 }}>
        <button onClick={() => setOpen(true)}>Abrir dialog (Destructivo)</button>
        <FeedbackDialog
          open={open}
          onClose={() => setOpen(false)}
          icon={<StateIcon state="warning" size={80} />}
          title="¿Eliminar vehículo?"
          subtitle="Esta acción no se puede deshacer. El vehículo será eliminado permanentemente."
          numberOfButtons={2}
          primaryLabel="Eliminar"
          onPrimary={() => setOpen(false)}
          secondaryLabel="Cancelar"
          onSecondary={() => setOpen(false)}
        />
      </div>
    )
  },
}

/** 0 botones — se cierra solo (auto-close simulado a 2s) */
export const FeedbackAutoClose: StoryObj = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => {
      setOpen(true)
      setTimeout(() => setOpen(false), 2000)
    }
    return (
      <div style={{ padding: 24 }}>
        <button onClick={handleOpen}>Abrir dialog (Auto-close 2s)</button>
        <FeedbackDialog
          open={open}
          icon={<StateIcon state="ok" size={80} />}
          title="Guardado"
          subtitle="Los cambios se han guardado."
          numberOfButtons={0}
        />
      </div>
    )
  },
}

// ─── InputDialog stories ─────────────────────────────────────────────────────

/** Input type=text */
export const InputText: StoryObj = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('')
    return (
      <div style={{ padding: 24 }}>
        <button onClick={() => setOpen(true)}>Abrir Input Dialog (text)</button>
        <InputDialog
          open={open}
          onClose={() => { setOpen(false); setValue('') }}
          title="Añadir nota"
          subtitle="Escribe una nota para este vehículo."
          input={
            <SimpleInput
              label="Nota"
              placeholder="Escribe aquí..."
              value={value}
              onChange={setValue}
            />
          }
          primaryDisabled={value.trim() === ''}
          primaryLabel="Guardar"
          onPrimary={() => { setOpen(false); setValue('') }}
          secondaryLabel="Cancelar"
        />
      </div>
    )
  },
}

/** Input type=text con botón X de cierre */
export const InputTextWithClose: StoryObj = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('')
    return (
      <div style={{ padding: 24 }}>
        <button onClick={() => setOpen(true)}>Abrir Input Dialog (close=Yes)</button>
        <InputDialog
          open={open}
          onClose={() => { setOpen(false); setValue('') }}
          showClose
          title="Añadir nota"
          subtitle="Escribe una nota para este vehículo."
          input={
            <SimpleInput
              label="Nota"
              placeholder="Escribe aquí..."
              value={value}
              onChange={setValue}
            />
          }
          primaryDisabled={value.trim() === ''}
          primaryLabel="Guardar"
          onPrimary={() => { setOpen(false); setValue('') }}
          secondaryLabel="Cancelar"
        />
      </div>
    )
  },
}
