/**
 * Tabs — Nodo Figma: 3735:22579
 *
 * Reglas críticas (CLAUDE.md):
 * - No son navegación — segmentan contenido dentro de una sección
 * - No añadir routing al cambiar de tab
 * - Type=Label por defecto
 * - Máximo 5 tabs — si el brief propone más, preguntar al diseñador
 */

import React from 'react'
import './Tabs.css'

export interface TabItem {
  /** Identificador único de la tab */
  id: string
  /** Etiqueta visible */
  label: string
  /** Icono (solo visible con type="label+icon") */
  icon?: React.ReactNode
  /** Contador/badge (solo visible con type="label+badge") */
  badge?: string | number
}

export interface TabsProps {
  /** Lista de tabs — máximo 5 */
  tabs: TabItem[]
  /** ID de la tab activa */
  activeTab: string
  /** Callback al cambiar de tab */
  onChange: (id: string) => void
  /**
   * Estilo visual del selector activo.
   * - primary: fondo pitufo-100 (default)
   * - secondary: fondo fills/primary
   */
  priority?: 'primary' | 'secondary'
  /**
   * Tipo de contenido en cada tab.
   * - label: solo texto (default)
   * - label+icon: texto + icono a la derecha
   * - label+badge: texto + contador a la derecha
   */
  type?: 'label' | 'label+icon' | 'label+badge'
  className?: string
}

export default function Tabs({
  tabs,
  activeTab,
  onChange,
  priority = 'primary',
  type = 'label',
  className,
}: TabsProps) {
  return (
    <div
      className={['tabs', className ?? ''].filter(Boolean).join(' ')}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            className={[
              'tabs__tab',
              isActive ? `tabs__tab--active tabs__tab--active-${priority}` : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onChange(tab.id)}
            type="button"
          >
            <span className="tabs__label">{tab.label}</span>

            {type === 'label+icon' && tab.icon != null && (
              <span className="tabs__icon" aria-hidden="true">
                {tab.icon}
              </span>
            )}

            {type === 'label+badge' && tab.badge != null && (
              <span className="tabs__badge">{tab.badge}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
