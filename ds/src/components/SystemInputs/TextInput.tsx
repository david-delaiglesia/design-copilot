import React, { useId, useState } from 'react'
import './inputs.shared.css'
import './TextInput.css'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface TextInputProps {
  /**
   * Label visible encima del campo.
   * CLAUDE.md: siempre requerido — nunca omitir.
   */
  label: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  /**
   * Callback al perder el foco.
   * CLAUDE.md: validación on blur — el padre decide si hay error.
   */
  onBlur?: (value: string) => void
  /** Tipo de input: texto o contraseña (con toggle ojo). */
  type?: 'text' | 'password'
  disabled?: boolean
  /**
   * Mensaje de error. Si se pasa, aplica feedback=ko.
   * Si está vacío/undefined, no hay error.
   */
  error?: string
  required?: boolean
  name?: string
  id?: string
  className?: string
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function TextInput({
  label,
  placeholder = 'Placeholder',
  value = '',
  onChange,
  onBlur,
  type = 'text',
  disabled = false,
  error,
  required = false,
  name,
  id: idProp,
  className,
}: TextInputProps) {
  const generatedId = useId()
  const inputId = idProp ?? generatedId

  const [showPassword, setShowPassword] = useState(false)

  const hasError = Boolean(error)
  const inputType = type === 'password' && showPassword ? 'text' : type

  // Clases de estado de la caja
  const boxClass = [
    'si-box',
    'ti-box',
    hasError ? 'si-box--error' : '',
    disabled ? 'si-box--disabled' : '',
  ].filter(Boolean).join(' ')

  const labelClass = ['si-label', disabled ? 'si-label--disabled' : ''].filter(Boolean).join(' ')

  return (
    <div className={['si-wrapper', className ?? ''].filter(Boolean).join(' ')}>
      {/* Label */}
      <label htmlFor={inputId} className={labelClass}>
        {label}
      </label>

      {/* Caja */}
      <div className={boxClass}>
        <input
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className="ti-input"
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={(e) => onBlur?.(e.target.value)}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
        />

        {/* Toggle contraseña */}
        {type === 'password' && !disabled && (
          <button
            type="button"
            className="ti-eye-btn"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            tabIndex={-1}
          >
            {showPassword ? <IconEyeOff /> : <IconEye />}
          </button>
        )}

        {type === 'password' && disabled && (
          <span className="ti-eye-btn ti-eye-btn--disabled" aria-hidden="true">
            <IconEyeOff />
          </span>
        )}
      </div>

      {/* Error */}
      {hasError && (
        <p id={`${inputId}-error`} className="si-error-msg" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// ─── Iconos ───────────────────────────────────────────────────────────────────

function IconEye() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function IconEyeOff() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2 2L14 14M6.5 6.6C6.19 6.89 6 7.32 6 7.8C6 8.79 6.9 9.6 8 9.6C8.52 9.6 9 9.42 9.36 9.12M4.2 4.4C2.6 5.4 1 7.8 1 7.8C1 7.8 3.5 12.8 8 12.8C9.4 12.8 10.6 12.3 11.6 11.6M6.8 3.1C7.2 3 7.6 3 8 3C12.5 3 15 7.8 15 7.8C15 7.8 14.1 9.5 12.6 10.7"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

export default TextInput
