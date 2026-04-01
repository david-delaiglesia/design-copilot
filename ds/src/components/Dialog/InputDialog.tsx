/**
 * InputDialog — Nodo Figma: 4062:2383
 *
 * Solicita un dato al usuario antes de continuar.
 * Siempre 2 botones: Primary (confirmar) + Tertiary (cancelar).
 * El Primary queda deshabilitado hasta que el input tenga valor.
 *
 * Elegir inputType según el dato:
 *   - dropdown   → opciones cerradas (selección de lista)
 *   - text       → texto libre de una línea
 *   - large-text → texto largo (multiline)
 *
 * Si el brief no especifica el tipo de input, preguntar al diseñador.
 */

import React from 'react'
import Dialog from './Dialog'
import { CloseIcon } from '../../assets/icons'

export interface InputDialogProps {
  /** Controla la visibilidad */
  open: boolean
  /** Callback al cerrar (X, Escape o Tertiary) */
  onClose?: () => void
  /**
   * Muestra botón X en la esquina superior derecha.
   * Usar cuando el brief especifica close=Yes.
   */
  showClose?: boolean
  /** Título — Roboto Bold 20px */
  title: string
  /** Subtítulo — Roboto Regular 16px */
  subtitle?: string
  /**
   * Slot para el componente de input (SystemInput del DS).
   * Aceptar texto, dropdown o large text según el brief.
   */
  input: React.ReactNode
  /** Etiqueta del botón Primary */
  primaryLabel?: string
  /** Callback del botón Primary */
  onPrimary?: () => void
  /**
   * Deshabilita el botón Primary.
   * Debe ser true cuando el input no tiene valor — implementar siempre.
   */
  primaryDisabled?: boolean
  /** Etiqueta del botón Tertiary */
  secondaryLabel?: string
  /** Callback del botón Tertiary (cancelar/cerrar) */
  onSecondary?: () => void
}

export default function InputDialog({
  open,
  onClose,
  showClose = false,
  title,
  subtitle,
  input,
  primaryLabel = 'Confirmar',
  onPrimary,
  primaryDisabled = false,
  secondaryLabel = 'Cancelar',
  onSecondary,
}: InputDialogProps) {
  const handleSecondary = () => {
    onSecondary?.()
    onClose?.()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      {/* Botón X de cierre (close=Yes) */}
      {showClose && (
        <button
          type="button"
          className="dialog-close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <CloseIcon />
        </button>
      )}

      <div className="dialog-body">
        {/* ── Texto ── */}
        <div className="dialog-text">
          <p className="dialog-title">{title}</p>
          {subtitle != null && <p className="dialog-subtitle">{subtitle}</p>}
        </div>

        {/* ── Input slot ── */}
        <div style={{ width: '100%' }}>
          {input}
        </div>

        {/* ── Botones: Primary + Tertiary, gap-24 (confirmado Figma) ── */}
        <div className="dialog-buttons dialog-buttons--gap-24">
          <button
            type="button"
            className="dialog-btn-primary"
            onClick={onPrimary}
            disabled={primaryDisabled}
          >
            <span className="dialog-btn-label">{primaryLabel}</span>
          </button>
          <button
            type="button"
            className="dialog-btn-tertiary"
            onClick={handleSecondary}
          >
            <span className="dialog-btn-label">{secondaryLabel}</span>
          </button>
        </div>
      </div>
    </Dialog>
  )
}
