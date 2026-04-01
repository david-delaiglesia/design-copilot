import React, { useId, useRef, useState, useEffect } from 'react'
import './inputs.shared.css'
import './Dropdown.css'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface DropdownOption {
  value: string
  label: string
}

export interface DropdownProps {
  /**
   * Label visible encima del campo.
   * CLAUDE.md: siempre requerido — nunca omitir.
   */
  label: string
  placeholder?: string
  options: DropdownOption[]
  value?: string
  onChange?: (value: string) => void
  /**
   * Callback al cerrar el panel (equivalente a on blur).
   * CLAUDE.md: validación on blur.
   */
  onBlur?: () => void
  disabled?: boolean
  error?: string
  required?: boolean
  name?: string
  id?: string
  className?: string
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function Dropdown({
  label,
  placeholder = 'Placeholder',
  options,
  value,
  onChange,
  onBlur,
  disabled = false,
  error,
  required = false,
  name,
  id: idProp,
  className,
}: DropdownProps) {
  const generatedId = useId()
  const inputId = idProp ?? generatedId
  const listId = `${inputId}-list`

  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((o) => o.value === value)
  const hasError = Boolean(error)

  // Cerrar al hacer click fuera
  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
        onBlur?.()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open, onBlur])

  function toggle() {
    if (disabled) return
    if (open) {
      setOpen(false)
      onBlur?.()
    } else {
      setOpen(true)
    }
  }

  function selectOption(opt: DropdownOption) {
    onChange?.(opt.value)
    setOpen(false)
    onBlur?.()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') { setOpen(false); onBlur?.() }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle() }
  }

  const boxClass = [
    'si-box',
    'dd-box',
    hasError ? 'si-box--error' : '',
    open ? 'dd-box--open' : '',
    disabled ? 'si-box--disabled' : '',
  ].filter(Boolean).join(' ')

  const labelClass = ['si-label', disabled ? 'si-label--disabled' : ''].filter(Boolean).join(' ')

  return (
    <div
      ref={wrapperRef}
      className={['si-wrapper', className ?? ''].filter(Boolean).join(' ')}
    >
      {/* Label */}
      <label htmlFor={inputId} className={labelClass}>
        {label}
      </label>

      {/* Hidden native select for form compatibility */}
      <select
        id={inputId}
        name={name}
        value={value ?? ''}
        required={required}
        disabled={disabled}
        aria-hidden="true"
        tabIndex={-1}
        style={{ display: 'none' }}
        onChange={() => {}}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      {/* Trigger visible */}
      <button
        type="button"
        className={boxClass}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={inputId}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${inputId}-error` : undefined}
      >
        <span className={[
          'si-value',
          selectedOption ? 'si-value--selected' : 'si-value--placeholder',
          disabled ? 'si-value--disabled' : '',
        ].filter(Boolean).join(' ')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`dd-chevron${open ? ' dd-chevron--open' : ''}`} aria-hidden="true">
          <IconChevron />
        </span>
      </button>

      {/* Panel de opciones */}
      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={label}
          className="dd-panel"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                className={`dd-option${isSelected ? ' dd-option--selected' : ''}`}
                onMouseDown={(e) => { e.preventDefault(); selectOption(opt) }}
              >
                {opt.label}
              </li>
            )
          })}
        </ul>
      )}

      {/* Error */}
      {hasError && (
        <p id={`${inputId}-error`} className="si-error-msg" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

function IconChevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default Dropdown
