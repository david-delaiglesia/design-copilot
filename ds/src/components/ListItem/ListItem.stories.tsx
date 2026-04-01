import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ListItem, ListGroup } from './index'
import type { ListItemProps } from './index'

// ─── Iconos placeholder ────────────────────────────────────────────────────────

const IconSlash = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
    <line x1="4" y1="4" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IconCar = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 9l1.5-4h9L14 9v3H2V9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="4.5" cy="12" r="1" fill="currentColor" />
    <circle cx="11.5" cy="12" r="1" fill="currentColor" />
  </svg>
)

const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const IconWarning = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2L14 13H2L8 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="8" y1="6" x2="8" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
  </svg>
)

// ─── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof ListItem> = {
  title: 'DS / ListItem',
  component: ListItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**ListItem** — Nodo Figma: \`14292:242\`
**ListGroup** — Nodo Figma: \`15720:16685\`

### Reglas críticas (CLAUDE.md)
- **Lines=1 por defecto** — solo aumentar si el brief incluye datos secundarios
- **El chevron es un icono, no un botón** — \`onClick\` siempre en la fila entera
- **Icono y trailing centrados** para Lines=1/2, **top-alineados** para Lines=+3
- **Usar \`ListGroup\`** para agrupar filas — aplica Card-like styling automáticamente
- **El divider del primer ítem se oculta** automáticamente dentro de un \`ListGroup\`
        `,
      },
    },
  },
  argTypes: {
    lines: { control: 'radio', options: ['1', '2', '+3'] },
    showChevron: { control: 'boolean' },
    showDivider: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  args: {
    title: 'Title',
    lines: '1',
    showChevron: true,
    showDivider: true,
  },
}

export default meta
type Story = StoryObj<typeof ListItem>

// ─── Lines=1 ───────────────────────────────────────────────────────────────────

export const Lines1: Story = {
  name: 'Lines=1 (default)',
  render: () => (
    <ListGroup style={{ maxWidth: 390 }}>
      <ListItem title="Juan López" icon={<IconUser />} accessory="12" onClick={() => {}} />
      <ListItem title="María García" icon={<IconUser />} accessory="8" onClick={() => {}} />
      <ListItem title="Carlos Ruiz" icon={<IconUser />} accessory="4" onClick={() => {}} />
    </ListGroup>
  ),
}

// ─── Lines=2 ───────────────────────────────────────────────────────────────────

export const Lines2: Story = {
  name: 'Lines=2 — Título + subtítulo',
  render: () => (
    <ListGroup style={{ maxWidth: 390 }}>
      <ListItem
        title="Juan López"
        subtitle="Conductor · Turno mañana"
        lines="2"
        icon={<IconUser />}
        accessory="12"
        onClick={() => {}}
      />
      <ListItem
        title="María García"
        subtitle="Conductora · Turno tarde"
        lines="2"
        icon={<IconUser />}
        accessory="8"
        onClick={() => {}}
      />
      <ListItem
        title="Carlos Ruiz"
        subtitle="Supervisor · Turno noche"
        lines="2"
        icon={<IconUser />}
        accessory="4"
        onClick={() => {}}
      />
    </ListGroup>
  ),
}

// ─── Lines=+3 ──────────────────────────────────────────────────────────────────

export const Lines3: Story = {
  name: 'Lines=+3 — Título + subtítulo + tag',
  render: () => (
    <ListGroup style={{ maxWidth: 390 }}>
      <ListItem
        title="Camión MAN TGX"
        subtitle="Matrícula: 4823 GHK · Ruta Madrid-Valencia"
        tag={{ label: 'Incidencia', icon: <IconWarning /> }}
        lines="+3"
        icon={<IconCar />}
        accessory="3"
        onClick={() => {}}
      />
      <ListItem
        title="Furgoneta Iveco Daily"
        subtitle="Matrícula: 1122 KLM · Ruta Barcelona-Zaragoza"
        tag={{ label: 'KO', icon: <IconWarning /> }}
        lines="+3"
        icon={<IconCar />}
        accessory="1"
        onClick={() => {}}
      />
    </ListGroup>
  ),
}

// ─── Todos los grupos ──────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'Todos los grupos',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 390 }}>
      {/* Lines=1 */}
      <div>
        <p style={{ fontFamily: 'Roboto', fontSize: 12, color: 'var(--label/tertiary)', margin: '0 0 8px 8px' }}>
          Lines=1
        </p>
        <ListGroup>
          <ListItem title="Sin icono" accessory="5" onClick={() => {}} />
          <ListItem title="Con icono" icon={<IconSlash />} accessory="12" onClick={() => {}} />
          <ListItem title="Sin accessory ni chevron" showChevron={false} />
        </ListGroup>
      </div>

      {/* Lines=2 — centrado vertical */}
      <div>
        <p style={{ fontFamily: 'Roboto', fontSize: 12, color: 'var(--label/tertiary)', margin: '0 0 8px 8px' }}>
          Lines=2 — icono y trailing centrados
        </p>
        <ListGroup>
          <ListItem
            title="Juan López"
            subtitle="Conductor · Turno mañana"
            lines="2"
            icon={<IconUser />}
            accessory="12"
            onClick={() => {}}
          />
          <ListItem
            title="Texto largo de subtítulo que puede truncarse con elipsis"
            subtitle="Subtítulo también bastante largo"
            lines="2"
            icon={<IconUser />}
            accessory="99"
            onClick={() => {}}
          />
        </ListGroup>
      </div>

      {/* Lines=+3 — top alineado */}
      <div>
        <p style={{ fontFamily: 'Roboto', fontSize: 12, color: 'var(--label/tertiary)', margin: '0 0 8px 8px' }}>
          Lines=+3 — icono y trailing al tope
        </p>
        <ListGroup>
          <ListItem
            title="Camión MAN TGX"
            subtitle="Matrícula: 4823 GHK · Ruta Madrid-Valencia"
            tag={{ label: 'Incidencia', icon: <IconWarning /> }}
            lines="+3"
            icon={<IconCar />}
            accessory="3"
            onClick={() => {}}
          />
          <ListItem
            title="Furgoneta Iveco Daily"
            subtitle="Matrícula: 1122 KLM"
            tag={{ label: 'KO', icon: <IconWarning /> }}
            lines="+3"
            icon={<IconCar />}
            accessory="1"
            onClick={() => {}}
          />
        </ListGroup>
      </div>
    </div>
  ),
}

// ─── Lista interactiva ─────────────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Lista interactiva',
  render: () => {
    const [selected, setSelected] = React.useState<string | null>(null)

    const items: ListItemProps[] = [
      { title: 'Juan López', subtitle: 'Conductor · Turno mañana', lines: '2', icon: <IconUser />, accessory: '12' },
      { title: 'María García', subtitle: 'Conductora · Turno tarde', lines: '2', icon: <IconUser />, accessory: '8' },
      { title: 'Carlos Ruiz', subtitle: 'Supervisor · Turno noche', lines: '2', icon: <IconUser />, accessory: '4' },
    ]

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 390 }}>
        <ListGroup>
          {items.map((item, i) => (
            <ListItem key={i} {...item} onClick={() => setSelected(item.title as string)} />
          ))}
        </ListGroup>
        {selected && (
          <p style={{ fontFamily: 'Roboto', fontSize: 14, color: 'var(--label/secondary)', margin: 0, paddingLeft: 8 }}>
            Seleccionado: <strong>{selected}</strong>
          </p>
        )}
      </div>
    )
  },
}

// ─── ListItem standalone (sin grupo) ──────────────────────────────────────────

export const Standalone: Story = {
  name: 'Standalone — sin ListGroup',
  render: () => (
    <div style={{ maxWidth: 390 }}>
      <ListItem title="Sin grupo" subtitle="Usa separators/quaternary" lines="2" icon={<IconSlash />} accessory="7" onClick={() => {}} showDivider={false} />
      <ListItem title="Segunda fila" subtitle="Con divider visible" lines="2" icon={<IconSlash />} accessory="3" onClick={() => {}} />
    </div>
  ),
}
