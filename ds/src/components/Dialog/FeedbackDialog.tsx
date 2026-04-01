/**
 * FeedbackDialog — Nodo Figma: 15721:17379
 *
 * Informa del resultado de una acción o pide confirmación.
 * No recoge datos — solo comunica y/o confirma.
 *
 * Tabla de patrones de botones:
 * - Confirmación de acción destructiva → 2 botones (Primary confirmar + Tertiary cancelar)
 * - Éxito tras completar una acción   → 1 botón (Primary cerrar/continuar)
 * - Error crítico que bloquea el flujo → 1 botón (Primary entendido/reintentar)
 * - Aviso antes de continuar          → 2 botones (Primary continuar + Tertiary cancelar)
 * - 0 botones → solo si el dialog se cierra automáticamente (especificar en brief)
 */

import React from 'react'
import Dialog from './Dialog'

export interface FeedbackDialogProps {
  /** Controla la visibilidad */
  open: boolean
  /** Callback al cerrar (Escape). Solo aplica si hay mecanismo de cierre sin botón */
  onClose?: () => void
  /**
   * Icono de estado — 80px. Si no se especifica en el brief, preguntar al diseñador.
   * Usar componente State del DS (check, error, warning, etc.)
   */
  icon?: React.ReactNode
  /** Título — Roboto Bold 20px */
  title: string
  /** Subtítulo — Roboto Regular 16px */
  subtitle?: string
  /**
   * Número de botones. Seguir siempre la tabla de patrones.
   * Si el brief no lo especifica, preguntar al diseñador.
   */
  numberOfButtons?: 0 | 1 | 2
  /** Etiqueta del botón Primary */
  primaryLabel?: string
  /** Callback del botón Primary */
  onPrimary?: () => void
  /** Etiqueta del botón Tertiary (solo con numberOfButtons=2) */
  secondaryLabel?: string
  /** Callback del botón Tertiary */
  onSecondary?: () => void
}

export default function FeedbackDialog({
  open,
  onClose,
  icon,
  title,
  subtitle,
  numberOfButtons = 1,
  primaryLabel = 'Continuar',
  onPrimary,
  secondaryLabel = 'Cancelar',
  onSecondary,
}: FeedbackDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="dialog-body">
        {/* ── Icono de estado 80px ── */}
        {icon != null && (
          <div style={{ width: 80, height: 80, flexShrink: 0 }}>
            {icon}
          </div>
        )}

        {/* ── Texto ── */}
        <div className="dialog-text">
          <p className="dialog-title">{title}</p>
          {subtitle != null && <p className="dialog-subtitle">{subtitle}</p>}
        </div>

        {/* ── Botones ── */}
        {numberOfButtons > 0 && (
          <div className="dialog-buttons dialog-buttons--gap-16">
            <button
              type="button"
              className="dialog-btn-primary"
              onClick={onPrimary}
            >
              <span className="dialog-btn-label">{primaryLabel}</span>
            </button>
            {numberOfButtons === 2 && (
              <button
                type="button"
                className="dialog-btn-tertiary"
                onClick={onSecondary}
              >
                <span className="dialog-btn-label">{secondaryLabel}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </Dialog>
  )
}
