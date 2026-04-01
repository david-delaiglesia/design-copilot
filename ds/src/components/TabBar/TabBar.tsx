import React from 'react'
import './TabBar.css'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface TabItem {
  /** Identificador único del tab */
  id: string
  /** Label visible. Se trunca con elipsis si es largo. */
  label: string
  /** Icono React (24px). Debe usar currentColor para responder al estado activo/inactivo. */
  icon: React.ReactNode
}

export interface TabBarProps {
  /**
   * Lista de tabs. Mínimo 2, máximo 4.
   * CLAUDE.md: si el brief propone más de 4 → preguntar al diseñador.
   */
  tabs: TabItem[]
  /** ID del tab actualmente activo. */
  activeTabId: string
  /** Callback al cambiar de tab. */
  onTabChange: (id: string) => void
  /**
   * Logo de la app (tablet/desktop solamente — se ignora en mobile).
   * No es clickable — solo decorativo.
   * Normalmente 48×48px.
   */
  logo?: React.ReactNode
  /**
   * Uso interno de Storybook: elimina el position:fixed para mostrar el
   * componente embebido en el canvas sin solapar el contenido.
   * No usar en producción.
   */
  _static?: boolean
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function TabBar({
  tabs,
  activeTabId,
  onTabChange,
  logo,
  _static = false,
}: TabBarProps) {
  return (
    <nav
      className={`tab-bar${_static ? ' tab-bar--static' : ''}`}
      aria-label="Navegación principal"
    >
      {/* Logo — solo visible en tablet/desktop, nunca clickable */}
      {logo && (
        <div className="tab-bar__logo" aria-hidden="true">
          {logo}
        </div>
      )}

      {/* Tabs */}
      <div className="tab-bar__items" role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-label={tab.label}
              className={`tab-bar__item${isActive ? ' tab-bar__item--active' : ''}`}
              onClick={() => onTabChange(tab.id)}
              type="button"
            >
              <span className="tab-bar__icon" aria-hidden="true">
                {tab.icon}
              </span>
              <span className="tab-bar__label">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default TabBar
