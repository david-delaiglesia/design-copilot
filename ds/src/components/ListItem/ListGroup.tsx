/**
 * ListGroup — Contenedor Card-like para ListItems
 *
 * Agrupa varias filas ListItem con el mismo look and feel que la Card:
 * - Fondo: background-content-box/secondary
 * - Border-radius: 16px
 * - Sombra: Shadow/Small
 * - Separador entre filas: separators/secondary (más visible que el standalone)
 * - El separador del PRIMER ítem se oculta automáticamente via CSS
 */

import React from 'react'
import './ListGroup.css'

export interface ListGroupProps {
  children: React.ReactNode
  className?: string
}

export default function ListGroup({ children, className }: ListGroupProps) {
  return (
    <div className={['list-group', className ?? ''].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
