import React, { useId, useRef, useState } from 'react'
import './inputs.shared.css'
import './DatePicker.css'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface DatePickerProps {
  /**
   * Label visible encima del campo.
   * CLAUDE.md: siempre requerido — nunca omitir.
   */
  label: string
  /**
   * Placeholder cuando no hay fecha seleccionada.
   * Figma: "dd/mm/yyyy"
   */
  placeholder?: string
  /**
   * Valor en formato ISO (YYYY-MM-DD).
   * La visualización se convierte a dd/mm/yyyy.
   */
  value?: string
  onChange?: (value: string) => void
  /**
   * Callback al perder el foco.
   * CLAUDE.md: validación on blur.
   */
  onBlur?: (value: string) => void
  disabled?: boolean
  error?: string
  required?: boolean
  min?: string  // YYYY-MM-DD
  max?: string  // YYYY-MM-DD
  name?: string
  id?: string
  className?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Convierte YYYY-MM-DD → dd/mm/yyyy */
function formatDisplay(iso: string): string {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  if (!y || !m || !d) return iso
  return `${d}/${m}/${y}`
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function DatePicker({
  label,
  placeholder = 'dd/mm/yyyy',
  value = '',
  onChange,
  onBlur,
  disabled = false,
  error,
  required = false,
  min,
  max,
  name,
  id: idProp,
  className,
}: DatePickerProps) {
  const generatedId = useId()
  const inputId = idProp ?? generatedId
  const nativeRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)

  const hasError = Boolean(error)
  const hasValue = Boolean(value)
  const displayValue = hasValue ? formatDisplay(value) : ''

  const boxClass = [
    'si-box',
    'dp-box',
    focused ? 'dp-box--open' : '',
    hasError ? 'si-box--error' : '',
    disabled ? 'si-box--disabled' : '',
  ].filter(Boolean).join(' ')

  const labelClass = ['si-label', disabled ? 'si-label--disabled' : ''].filter(Boolean).join(' ')

  function openPicker() {
    if (disabled) return
    nativeRef.current?.showPicker?.()
    nativeRef.current?.focus()
  }

  return (
    <div className={['si-wrapper', className ?? ''].filter(Boolean).join(' ')}>
      {/* Label */}
      <label htmlFor={inputId} className={labelClass}>
        {label}
      </label>

      {/* Caja visible — actúa como trigger */}
      <div
        className={boxClass}
        onClick={openPicker}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPicker() } }}
        aria-haspopup="dialog"
        aria-label={`${label}: ${displayValue || placeholder}`}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${inputId}-error` : undefined}
      >
        <span className={[
          'si-value',
          !hasValue ? 'si-value--placeholder' : 'si-value--selected',
          disabled ? 'si-value--disabled' : '',
        ].filter(Boolean).join(' ')}>
          {displayValue || placeholder}
        </span>
        <span className="dp-calendar-icon" aria-hidden="true">
          <IconCalendar />
        </span>
      </div>

      {/* Input nativo oculto — gestiona el picker del sistema */}
      <input
        ref={nativeRef}
        id={inputId}
        name={name}
        type="date"
        value={value}
        required={required}
        disabled={disabled}
        min={min}
        max={max}
        className="dp-native"
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false)
          onBlur?.(e.target.value)
        }}
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Error */}
      {hasError && (
        <p id={`${inputId}-error`} className="si-error-msg" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

function IconCalendar() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 1V4M11 1V4M1.5 6H14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export default DatePicker
