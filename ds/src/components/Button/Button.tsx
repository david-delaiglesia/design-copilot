import React from 'react'
import './Button.css'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type ButtonPriority = 'Primary' | 'Secondary' | 'Tertiary'
export type ButtonSize = 'L' | 'M' | 'S'
export type ButtonState = 'Default' | 'Hover' | 'Pressed' | 'Disabled'
export type ButtonType = 'Label + Icon' | 'Label' | 'Icon' | 'Loading'
export type ButtonIconPosition = 'Leading' | 'Trailing' | 'None'

export interface ButtonProps {
  /** Jerarquía visual. Máximo un Primary por vista. */
  priority?: ButtonPriority
  /** Tamaño del botón. */
  size?: ButtonSize
  /** Estado interactivo. En código se gestiona con CSS; útil para Storybook. */
  state?: ButtonState
  /** Tipo de contenido del botón. */
  type?: ButtonType
  /** Posición del icono respecto al label. */
  iconPosition?: ButtonIconPosition
  /** Texto del botón. Siempre visible salvo type=Icon o type=Loading. */
  label?: string
  /** Icono React. Requerido cuando type incluye icono. */
  icon?: React.ReactNode
  /** Handler de click. Nunca usar para navegación entre pantallas. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  /** Clase CSS adicional. */
  className?: string
}

// ─── Spinner (Loading) ────────────────────────────────────────────────────────

function Spinner({ size }: { size: ButtonSize }) {
  const px = size === 'L' ? 32 : 24
  return (
    <span
      className={`btn-spinner btn-spinner--${px}`}
      aria-hidden="true"
      style={{ width: px, height: px }}
    />
  )
}

// ─── Icono placeholder ────────────────────────────────────────────────────────

function DefaultIcon({ size }: { size: ButtonSize }) {
  const px = size === 'L' ? 24 : 16
  return (
    <span
      className="btn-icon-placeholder"
      aria-hidden="true"
      style={{ width: px, height: px }}
    />
  )
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function Button({
  priority = 'Primary',
  size = 'L',
  state = 'Default',
  type = 'Label + Icon',
  iconPosition = 'Leading',
  label = 'Label',
  icon,
  onClick,
  className,
}: ButtonProps) {
  const isDisabled = state === 'Disabled'
  const isLoading = type === 'Loading'
  const isIconOnly = type === 'Icon'
  const hasIcon = type === 'Label + Icon' || isIconOnly

  const resolvedIcon = icon ?? <DefaultIcon size={size} />

  const classes = [
    'btn',
    `btn--${priority.toLowerCase()}`,
    `btn--size-${size.toLowerCase()}`,
    `btn--state-${state.toLowerCase()}`,
    isIconOnly ? 'btn--icon-only' : '',
    isLoading ? 'btn--loading' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={classes}
      disabled={isDisabled || isLoading}
      onClick={!isDisabled && !isLoading ? onClick : undefined}
      type="button"
      aria-label={isIconOnly ? label : undefined}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <Spinner size={size} />
      ) : (
        <>
          {hasIcon && iconPosition === 'Leading' && resolvedIcon}
          {!isIconOnly && (
            <span className="btn-label">{label}</span>
          )}
          {hasIcon && iconPosition === 'Trailing' && resolvedIcon}
        </>
      )}
    </button>
  )
}

export default Button
