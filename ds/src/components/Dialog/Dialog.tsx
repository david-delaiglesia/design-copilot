/**
 * Dialog — shell modal con overlay
 *
 * Reglas críticas (CLAUDE.md):
 * - Modal por defecto — overlay que bloquea el fondo
 * - Siempre usar FeedbackDialog o InputDialog — nunca Dialog directamente en producción
 */

import React, { useEffect, useRef } from 'react'
import './Dialog.css'

export interface DialogProps {
  /** Controla la visibilidad del dialog */
  open: boolean
  /** Callback al cerrar (click en overlay o tecla Escape) */
  onClose?: () => void
  children: React.ReactNode
  className?: string
}

export default function Dialog({ open, onClose, children, className }: DialogProps) {
  const surfaceRef = useRef<HTMLDivElement>(null)

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  // Focus en el surface al abrir
  useEffect(() => {
    if (open) surfaceRef.current?.focus()
  }, [open])

  // Bloquear scroll del body mientras está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="dialog-overlay"
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        ref={surfaceRef}
        className={['dialog-surface', className ?? ''].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
