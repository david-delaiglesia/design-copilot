import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextInput, Dropdown, DatePicker } from './index'
import { Button } from '../Button/Button'

/**
 * Playground — System Inputs en uso real
 *
 * Formulario de alta de conductor con validación on blur.
 * Muestra cómo se comportan los tres inputs juntos en contexto.
 */

const meta: Meta = {
  title: 'DS / SystemInputs / ⚙️ Playground',
  tags: [],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Formulario de ejemplo que muestra los tres inputs en uso real:
- Validación **on blur** en cada campo
- Bloqueo del submit si hay errores
- Estado de carga del botón
- Comportamiento responsive (máx. 480px)
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj

const VEHICLE_TYPES = [
  { value: 'turismo', label: 'Turismo' },
  { value: 'furgoneta', label: 'Furgoneta' },
  { value: 'camion', label: 'Camión' },
  { value: 'moto', label: 'Motocicleta' },
]

const SHIFTS = [
  { value: 'manana', label: 'Turno mañana (06:00–14:00)' },
  { value: 'tarde', label: 'Turno tarde (14:00–22:00)' },
  { value: 'noche', label: 'Turno noche (22:00–06:00)' },
]

// ─── Form state helpers ───────────────────────────────────────────────────────

function validate(field: string, value: string): string {
  switch (field) {
    case 'name':
      if (!value.trim()) return 'El nombre es obligatorio'
      if (value.trim().length < 3) return 'Mínimo 3 caracteres'
      return ''
    case 'email':
      if (!value.trim()) return 'El email es obligatorio'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'El formato de email no es válido'
      return ''
    case 'password':
      if (!value) return 'La contraseña es obligatoria'
      if (value.length < 8) return 'Mínimo 8 caracteres'
      return ''
    case 'vehicleType':
      if (!value) return 'Selecciona un tipo de vehículo'
      return ''
    case 'shift':
      if (!value) return 'Selecciona un turno'
      return ''
    case 'startDate':
      if (!value) return 'La fecha de incorporación es obligatoria'
      return ''
    default:
      return ''
  }
}

// ─── Playground completo ─────────────────────────────────────────────────────

function PlaygroundForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    vehicleType: '',
    shift: '',
    startDate: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  function setField(field: string, value: string) {
    setValues((v) => ({ ...v, [field]: value }))
    // Si había error y el usuario empieza a escribir, lo limpiamos
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }))
  }

  function blurField(field: string, value: string) {
    const err = validate(field, value)
    setErrors((e) => ({ ...e, [field]: err }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Validar todos los campos
    const newErrors: Record<string, string> = {}
    Object.entries(values).forEach(([field, value]) => {
      const err = validate(field, value)
      if (err) newErrors[field] = err
    })
    setErrors(newErrors)
    if (Object.values(newErrors).some(Boolean)) return
    setSubmitted(true)
  }

  function handleReset() {
    setValues({ name: '', email: '', password: '', vehicleType: '', shift: '', startDate: '' })
    setErrors({})
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div style={{
        maxWidth: 480,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        fontFamily: 'Roboto, sans-serif',
      }}>
        <p style={{ color: 'var(--colors/cucumber-100)', fontSize: 16, fontWeight: 700 }}>
          ✓ Conductor registrado correctamente
        </p>
        <pre style={{
          fontSize: 12,
          color: 'var(--label/tertiary)',
          background: 'var(--fills/quaternary)',
          padding: 16,
          borderRadius: 8,
          overflow: 'auto',
        }}>
          {JSON.stringify(values, null, 2)}
        </pre>
        <Button priority="Tertiary" size="M" label="Volver al formulario" onClick={handleReset} />
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        maxWidth: 480,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 24,
      }}
    >
      <p style={{
        fontFamily: 'Roboto, sans-serif',
        fontSize: 20,
        fontWeight: 700,
        color: 'var(--label/secondary)',
        margin: 0,
      }}>
        Alta de conductor
      </p>

      {/* Datos personales */}
      <TextInput
        label="Nombre completo"
        placeholder="Introduce el nombre"
        value={values.name}
        onChange={(v) => setField('name', v)}
        onBlur={(v) => blurField('name', v)}
        error={errors.name}
        required
      />

      <TextInput
        label="Email"
        placeholder="conductor@flota.com"
        value={values.email}
        onChange={(v) => setField('email', v)}
        onBlur={(v) => blurField('email', v)}
        error={errors.email}
        required
      />

      <TextInput
        label="Contraseña"
        type="password"
        placeholder="Mínimo 8 caracteres"
        value={values.password}
        onChange={(v) => setField('password', v)}
        onBlur={(v) => blurField('password', v)}
        error={errors.password}
        required
      />

      {/* Separador */}
      <div style={{ height: 1, background: 'var(--separators/quaternary)' }} />

      {/* Configuración */}
      <Dropdown
        label="Tipo de vehículo asignado"
        placeholder="Selecciona un tipo"
        options={VEHICLE_TYPES}
        value={values.vehicleType}
        onChange={(v) => { setField('vehicleType', v) }}
        onBlur={() => blurField('vehicleType', values.vehicleType)}
        error={errors.vehicleType}
        required
      />

      <Dropdown
        label="Turno habitual"
        placeholder="Selecciona un turno"
        options={SHIFTS}
        value={values.shift}
        onChange={(v) => { setField('shift', v) }}
        onBlur={() => blurField('shift', values.shift)}
        error={errors.shift}
        required
      />

      <DatePicker
        label="Fecha de incorporación"
        value={values.startDate}
        onChange={(v) => setField('startDate', v)}
        onBlur={(v) => blurField('startDate', v)}
        error={errors.startDate}
        required
      />

      {/* Acciones — Primary + Tertiary (patrón Guardar/Cancelar de CLAUDE.md) */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <Button
          priority="Tertiary"
          size="M"
          label="Cancelar"
          type="button"
          onClick={handleReset}
        />
        <Button
          priority="Primary"
          size="M"
          label="Guardar conductor"
          type="submit"
        />
      </div>
    </form>
  )
}

export const FormularioAlta: Story = {
  name: 'Formulario — Alta de conductor',
  render: () => <PlaygroundForm />,
}

// ─── Playground minimalista: un campo por tipo ────────────────────────────────

export const InputsIsolados: Story = {
  name: 'Inputs aislados — comparativa',
  render: () => (
    <div style={{ maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 32, padding: 24 }}>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontFamily: 'Roboto', fontSize: 12, color: 'var(--label/tertiary)', margin: 0 }}>
          TextInput
        </p>
        <TextInput label="Default" placeholder="Placeholder" />
        <TextInput label="Con valor" value="Juan López" />
        <TextInput label="Error" value="no-email" error="Formato inválido" />
        <TextInput label="Disabled" placeholder="No disponible" disabled />
        <TextInput label="Password" type="password" placeholder="••••••••" />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontFamily: 'Roboto', fontSize: 12, color: 'var(--label/tertiary)', margin: 0 }}>
          Dropdown
        </p>
        <Dropdown label="Sin selección" placeholder="Selecciona..." options={VEHICLE_TYPES} />
        <Dropdown label="Con selección" value="furgoneta" options={VEHICLE_TYPES} />
        <Dropdown label="Error" error="Campo obligatorio" options={VEHICLE_TYPES} />
        <Dropdown label="Disabled" value="camion" options={VEHICLE_TYPES} disabled />
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontFamily: 'Roboto', fontSize: 12, color: 'var(--label/tertiary)', margin: 0 }}>
          DatePicker
        </p>
        <DatePicker label="Sin fecha" />
        <DatePicker label="Con fecha" value="2025-08-16" />
        <DatePicker label="Error" error="La fecha es obligatoria" />
        <DatePicker label="Disabled" value="2025-08-16" disabled />
      </section>

    </div>
  ),
}
