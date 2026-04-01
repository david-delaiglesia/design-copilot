import React from 'react'
import './Card.css'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type CardHeight = '1' | '2' | '3'

export interface CardProps {
  /** Muestra el header (título + icono opcional + chevron opcional). */
  header?: boolean
  /** La card completa es clickable. Muestra el chevron ›. */
  navigation?: boolean
  /**
   * Muestra el slot izquierdo del header (icono o imagen).
   * En height="2" este slot no existe — se ignora.
   */
  showIcon?: boolean
  /** Muestra el slot de contenido. Requiere height="2". */
  showContent?: boolean
  /**
   * Variante de layout:
   * - "1" → solo título (+ slot izquierdo opcional)
   * - "2" → título + slot de contenido
   * - "3" → título + subtítulo (layout horizontal con sombra)
   */
  height?: CardHeight
  /** Estado de carga — sustituye el contenido por skeleton. */
  loading?: boolean
  /** Texto del título. */
  title?: string
  /** Subtítulo. Solo visible en height="3". */
  subtitle?: string
  /**
   * Icono React para el slot izquierdo (16px en h1, 24px en h3).
   * Si se pasa también `image`, la imagen tiene prioridad.
   */
  icon?: React.ReactNode
  /**
   * URL de imagen para el slot izquierdo (32×32).
   * Disponible en height="1" y height="3". Tiene prioridad sobre `icon`.
   */
  image?: string
  /** Alt text para la imagen. Requerido cuando se usa `image`. */
  imageAlt?: string
  /**
   * Forma de la imagen:
   * - "round" → círculo completo (default)
   * - "square" → cuadrado con border-radius 8px
   */
  imageShape?: 'round' | 'square'
  /** Contenido del slot. Se renderiza cuando showContent=true y loading=false. */
  content?: React.ReactNode
  /** Handler de click. Solo activo cuando navigation=true. */
  onClick?: React.MouseEventHandler<HTMLDivElement>
  className?: string
}

// ─── Piezas internas ──────────────────────────────────────────────────────────

function IconPlaceholder({ size }: { size: 16 | 24 }) {
  return (
    <span
      className="card__icon-placeholder"
      aria-hidden="true"
      style={{ width: size, height: size }}
    />
  )
}

function Chevron() {
  return (
    <span className="card__chevron" aria-hidden="true">
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden="true">
        <path
          d="M1 1.5L4.5 5L1 8.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

function SkeletonBar({
  width,
  height,
  radius = 8,
}: {
  width: number | string
  height: number
  radius?: number
}) {
  return (
    <span
      className="card__skeleton-bar"
      style={{ width, height, borderRadius: radius }}
    />
  )
}

/**
 * Slot izquierdo: imagen circular (avatar) o icono.
 * Cuando se pasa `image`, renderiza un <img> 32×32 circular.
 * Cuando se pasa solo `icon`, respeta el tamaño nativo del icono.
 */
function LeftSlot({
  image,
  imageAlt = '',
  imageShape = 'round',
  icon,
  iconSize,
}: {
  image?: string
  imageAlt?: string
  imageShape?: 'round' | 'square'
  icon?: React.ReactNode
  iconSize: 16 | 24
}) {
  if (image) {
    return (
      <img
        src={image}
        alt={imageAlt}
        className={`card__avatar card__avatar--${imageShape}`}
      />
    )
  }
  return (
    <span className={iconSize === 24 ? 'card__icon card__icon--large' : 'card__icon'}>
      {icon ?? <IconPlaceholder size={iconSize} />}
    </span>
  )
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function Card({
  header = true,
  navigation = true,
  showIcon = true,
  showContent = false,
  height = '1',
  loading = false,
  title = 'Title',
  subtitle,
  icon,
  image,
  imageAlt = '',
  imageShape = 'round',
  content,
  onClick,
  className,
}: CardProps) {
  const navProps = navigation
    ? { role: 'button' as const, tabIndex: 0, onClick }
    : {}

  // ── Height = 3 (layout horizontal con sombra) ──────────────────────────
  if (height === '3') {
    if (showIcon) {
      // Layout: slot izquierdo (icono o imagen) + texto + chevron absoluto
      return (
        <div
          className={`card card--height-3-icon${navigation ? ' card--navigable' : ''}${className ? ` ${className}` : ''}`}
          {...navProps}
        >
          <div className="card__h3-left">
            <LeftSlot image={image} imageAlt={imageAlt} imageShape={imageShape} icon={icon} iconSize={24} />
            <div className="card__text-compact">
              <span className="card__title--compact">{title}</span>
              {subtitle && <span className="card__subtitle">{subtitle}</span>}
            </div>
          </div>
          {navigation && (
            <span className="card__chevron-absolute">
              <Chevron />
            </span>
          )}
        </div>
      )
    }

    // Layout sin icono: altura fija 71px, texto y chevron absolutos
    return (
      <div
        className={`card card--height-3-no-icon${navigation ? ' card--navigable' : ''}${className ? ` ${className}` : ''}`}
        {...navProps}
      >
        <div className="card__h3-text-absolute">
          <span className="card__title--compact">{title}</span>
          {subtitle && <span className="card__subtitle">{subtitle}</span>}
        </div>
        {navigation && (
          <span className="card__chevron-absolute">
            <Chevron />
          </span>
        )}
      </div>
    )
  }

  // ── Height = 1 / 2 (layout columna estándar) ───────────────────────────
  const classes = [
    'card',
    'card--standard',
    height === '1' ? 'card--height-1' : 'card--height-2',
    navigation ? 'card--navigable' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...navProps}>
      {/* Header */}
      {header && (
        <div className="card__header">
          <div className="card__title-group">
            {showIcon && !loading && (
              <LeftSlot image={image} imageAlt={imageAlt} imageShape={imageShape} icon={icon} iconSize={16} />
            )}
            {loading ? (
              <SkeletonBar width={154} height={32} radius={8} />
            ) : (
              <span className="card__title">{title}</span>
            )}
          </div>
          {navigation && !loading && <Chevron />}
        </div>
      )}

      {/* Contenido */}
      {showContent && !loading && content}

      {/* Skeleton de contenido */}
      {showContent && loading && (
        <div className="card__skeleton-content-row">
          <SkeletonBar width="100%" height={12} radius={4} />
          <SkeletonBar width={163} height={12} radius={4} />
        </div>
      )}
    </div>
  )
}

export default Card
