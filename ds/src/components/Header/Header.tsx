import React from 'react'
import './Header.css'

// ─── Tipos ────────────────────────────────────────────────────────────────────

/**
 * Determina qué icono aparece a la izquierda y qué handler se activa:
 * - "home"       → accedida desde tab bar. Puede mostrar logo + título.
 * - "navigation" → drill-down desde otra pantalla. Muestra ← y llama onBack.
 * - "modal"      → presentada sobre contenido existente. Muestra × y llama onClose.
 * - "menu"       → pantalla home con menú de opciones. Muestra ≡ y llama onMenuToggle.
 */
export type HeaderType = 'home' | 'navigation' | 'modal' | 'menu'

export interface HeaderAction {
  /** Icono React (24px). Debe usar currentColor. */
  icon: React.ReactNode
  /** Aria-label accesible para el botón. */
  label: string
  onClick: () => void
}

export interface HeaderProps {
  /**
   * Patrón de navegación que determina el icono izquierdo y el handler.
   * CLAUDE.md: lo determina el patrón de navegación, no el contenido.
   */
  type?: HeaderType
  /** Texto del título. */
  title?: string
  /**
   * Muestra el título en navigation / modal / menu.
   * En type="home" el título siempre es visible — esta prop se ignora.
   */
  showTitle?: boolean
  /**
   * Muestra el logo (48×48px) a la izquierda del título.
   * Solo aplica en type="home". El logo nunca es clickable.
   */
  showLogo?: boolean
  /**
   * Contenido del logo. Solo visible en type="home" con showLogo=true.
   * Si no se pasa, se muestra el placeholder de la app.
   */
  logo?: React.ReactNode
  /**
   * Acciones en el lado derecho. Máximo 3.
   * CLAUDE.md: si el brief propone más de 3 → preguntar al diseñador.
   */
  actions?: HeaderAction[]
  /** Callback del botón ← (solo type="navigation"). */
  onBack?: () => void
  /** Callback del botón × (solo type="modal"). */
  onClose?: () => void
  /** Callback del botón ≡ (solo type="menu"). */
  onMenuToggle?: () => void
  /**
   * Uso interno de Storybook: elimina position:fixed.
   * No usar en producción.
   */
  _static?: boolean
  className?: string
}

// ─── Iconos inline ─────────────────────────────────────────────────────────

function IconBack() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19 12H5M5 12L11 6M5 12L11 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconMenu() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6H20M4 12H20M4 18H20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Logo placeholder para cuando no se pasa logo personalizado */
function LogoPlaceholder() {
  return (
    <div className="header__logo-placeholder" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect width="28" height="28" rx="7" fill="var(--colors\/pitufo-100)" />
        <path d="M7 14L14 7L21 14L14 21L7 14Z" fill="var(--label\/oncolor)" />
      </svg>
    </div>
  )
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function Header({
  type = 'home',
  title = 'Título',
  showTitle = false,
  showLogo = true,
  logo,
  actions = [],
  onBack,
  onClose,
  onMenuToggle,
  _static = false,
  className,
}: HeaderProps) {
  // Título siempre visible en "home"; controlado por showTitle en el resto
  const titleVisible = type === 'home' || showTitle

  // Icono izquierdo + handler para navigation / modal / menu
  const leftIcon = (() => {
    if (type === 'navigation') return <IconBack />
    if (type === 'modal')      return <IconClose />
    if (type === 'menu')       return <IconMenu />
    return null
  })()

  const leftHandler = (() => {
    if (type === 'navigation') return onBack
    if (type === 'modal')      return onClose
    if (type === 'menu')       return onMenuToggle
    return undefined
  })()

  return (
    <header
      className={[
        'header',
        _static ? 'header--static' : '',
        className ?? '',
      ].filter(Boolean).join(' ')}
    >
      {/* ── Lado izquierdo ── */}
      <div className="header__left">
        {/* Logo — solo en home */}
        {type === 'home' && showLogo && (
          <div className="header__logo" aria-hidden="true">
            {logo ?? <LogoPlaceholder />}
          </div>
        )}

        {/* Botón izquierdo — navigation / modal / menu */}
        {leftIcon && (
          <button
            type="button"
            className="header__icon-btn"
            onClick={leftHandler}
            aria-label={
              type === 'navigation' ? 'Volver' :
              type === 'modal'      ? 'Cerrar' :
              'Menú'
            }
          >
            {leftIcon}
          </button>
        )}

        {/* Título */}
        {titleVisible && (
          <h1 className="header__title">{title}</h1>
        )}
      </div>

      {/* ── Lado derecho — acciones ── */}
      {actions.length > 0 && (
        <div className="header__actions">
          {actions.slice(0, 3).map((action, i) => (
            <button
              key={i}
              type="button"
              className="header__icon-btn"
              onClick={action.onClick}
              aria-label={action.label}
            >
              {action.icon}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

export default Header
