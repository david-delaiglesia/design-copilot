/**
 * ListItem — Nodo Figma: 14292:242
 *
 * Reglas críticas (CLAUDE.md):
 * - Lines=1 por defecto
 * - El chevron es un icono, no un botón — onClick va en la fila entera
 * - Siempre divider entre filas (showDivider=true por defecto)
 * - Icono izquierdo opcional — preguntar al diseñador si el brief no lo especifica
 * - Accessory depende del contexto — preguntar si no está especificado
 */

import React from 'react'
import './ListItem.css'
import { Chevron } from '../../assets/icons'

export interface ListItemTag {
  label: string
  icon?: React.ReactNode
}

export interface ListItemProps {
  /** Texto principal */
  title: string
  /** Texto secundario — se muestra cuando lines="2" o lines="+3" */
  subtitle?: string
  /** Badge de etiqueta — solo se muestra cuando lines="+3" */
  tag?: ListItemTag
  /** Número de líneas de contenido. Por defecto: "1" */
  lines?: '1' | '2' | '+3'
  /** Icono opcional en la izquierda, dentro de un fondo 32×32 */
  icon?: React.ReactNode
  /** Contenido accesorio a la derecha (ej: número, texto corto) */
  accessory?: React.ReactNode
  /** Muestra el chevron › a la derecha. Por defecto: true */
  showChevron?: boolean
  /** Muestra el separador superior. Por defecto: true */
  showDivider?: boolean
  /** Hace toda la fila clickable */
  onClick?: () => void
  className?: string
}

export default function ListItem({
  title,
  subtitle,
  tag,
  lines = '1',
  icon,
  accessory,
  showChevron = true,
  showDivider = true,
  onClick,
  className,
}: ListItemProps) {
  const isMultiline = lines === '+3'
  const hasSubtitle = (lines === '2' || lines === '+3') && subtitle != null
  const hasTag = lines === '+3' && tag != null
  const isClickable = !!onClick

  return (
    <div
      className={[
        'li-row',
        icon == null ? 'li-row--no-icon' : '',
        isMultiline ? 'li-row--multiline' : '',
        isClickable ? 'li-row--clickable' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    >
      {/* ── Icono izquierdo ── */}
      {icon != null && (
        <div className={['li-icon-wrap', isMultiline ? 'li-icon-wrap--top' : ''].filter(Boolean).join(' ')}>
          <div className="li-icon-bg">{icon}</div>
        </div>
      )}

      {/* ── Contenido ── */}
      <div className={['li-contents', isMultiline ? 'li-contents--multiline' : ''].filter(Boolean).join(' ')}>
        {showDivider && <div className="li-divider" />}

        <div className={['li-body', isMultiline ? 'li-body--top' : ''].filter(Boolean).join(' ')}>
          {/* Área de texto */}
          <div className={['li-text', hasTag ? 'li-text--with-tag' : ''].filter(Boolean).join(' ')}>
            {hasTag ? (
              /* Lines=+3: envuelve título+subtítulo en bloque separado del tag */
              <div className="li-text-top">
                <p className="li-title">{title}</p>
                {hasSubtitle && <p className="li-subtitle">{subtitle}</p>}
              </div>
            ) : (
              <>
                <p className="li-title">{title}</p>
                {hasSubtitle && <p className="li-subtitle">{subtitle}</p>}
              </>
            )}

            {hasTag && (
              <div className="li-tag">
                {tag.icon != null && <span className="li-tag-icon">{tag.icon}</span>}
                <span className="li-tag-label">{tag.label}</span>
              </div>
            )}
          </div>

          {/* Trailing: accessory + chevron */}
          {(accessory != null || showChevron) && (
            <div className="li-trailing">
              {accessory != null && <span className="li-accessory">{accessory}</span>}
              {showChevron && (
                <span className="li-chevron" aria-hidden="true">
                  <Chevron />
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
