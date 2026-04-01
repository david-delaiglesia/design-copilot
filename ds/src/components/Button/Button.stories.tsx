import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'
import type { ButtonProps } from './Button'

// ─── Meta ──────────────────────────────────────────────────────────────────

const meta: Meta<typeof Button> = {
  title: 'DS / Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Button** — Nodo Figma: \`3542:9866\` (archivo \`FEljlfuJJLO8TzfwShLKoR\`)

### Reglas críticas (CLAUDE.md)
- Máximo **un \`Primary\` por vista**
- Guardar/Cancelar → \`Primary\` / \`Tertiary\`
- \`type=Icon\` solo si espacio reducido Y acción universalmente reconocible
- **No usar para navegar** — es un disparador de acción
- \`type=Loading\` para estado de carga — nunca añadir spinner encima
- Disabled sin explicación visible → advertir al diseñador
        `,
      },
    },
  },
  argTypes: {
    priority: {
      description: 'Jerarquía visual. Máximo un Primary por vista.',
      control: 'select',
      options: ['Primary', 'Secondary', 'Tertiary'],
      table: {
        defaultValue: { summary: 'Primary' },
      },
    },
    size: {
      description: 'Tamaño del botón.',
      control: 'select',
      options: ['L', 'M', 'S'],
      table: {
        defaultValue: { summary: 'L' },
      },
    },
    state: {
      description: 'Estado interactivo. En producción se gestiona con CSS :hover/:active/:disabled.',
      control: 'select',
      options: ['Default', 'Hover', 'Pressed', 'Disabled'],
      table: {
        defaultValue: { summary: 'Default' },
      },
    },
    type: {
      description: 'Tipo de contenido del botón.',
      control: 'select',
      options: ['Label + Icon', 'Label', 'Icon', 'Loading'],
      table: {
        defaultValue: { summary: 'Label + Icon' },
      },
    },
    iconPosition: {
      description: 'Posición del icono. Solo aplica cuando type incluye icono.',
      control: 'select',
      options: ['Leading', 'Trailing', 'None'],
      table: {
        defaultValue: { summary: 'Leading' },
      },
    },
    label: {
      description: 'Texto del botón.',
      control: 'text',
      table: {
        defaultValue: { summary: 'Label' },
      },
    },
    icon: {
      description: 'Icono React (ReactNode). Si no se pasa, se renderiza un placeholder.',
      control: false,
    },
    onClick: {
      description: 'Handler de click. Nunca usar para navegación entre pantallas.',
      action: 'clicked',
    },
  },
  args: {
    priority: 'Primary',
    size: 'L',
    state: 'Default',
    type: 'Label + Icon',
    iconPosition: 'Leading',
    label: 'Label',
  },
}

export default meta
type Story = StoryObj<typeof Button>

// ─── Playground ────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: '⚙️ Playground',
  args: {},
}

// ─── Priority ──────────────────────────────────────────────────────────────

export const PriorityPrimary: Story = {
  name: 'Priority / Primary',
  args: { priority: 'Primary', type: 'Label', iconPosition: 'None' },
  parameters: {
    docs: {
      description: { story: 'Acción principal. Solo uno por vista.' },
    },
  },
}

export const PrioritySecondary: Story = {
  name: 'Priority / Secondary',
  args: { priority: 'Secondary', type: 'Label', iconPosition: 'None' },
}

export const PriorityTertiary: Story = {
  name: 'Priority / Tertiary',
  args: { priority: 'Tertiary', type: 'Label', iconPosition: 'None' },
  parameters: {
    docs: {
      description: { story: 'Sin fondo (fills/transparent). Usar para Cancelar.' },
    },
  },
}

// ─── Sizes ─────────────────────────────────────────────────────────────────

export const SizeL: Story = {
  name: 'Size / L — 56px',
  args: { size: 'L', type: 'Label + Icon', iconPosition: 'Leading' },
  parameters: {
    docs: { description: { story: 'Tamaño grande: 56px, radius 12px, font 16px.' } },
  },
}

export const SizeM: Story = {
  name: 'Size / M — 40px',
  args: { size: 'M', type: 'Label + Icon', iconPosition: 'Leading' },
  parameters: {
    docs: { description: { story: 'Tamaño medio: 40px, radius 100px (pill), font 14px.' } },
  },
}

export const SizeS: Story = {
  name: 'Size / S — 32px',
  args: { size: 'S', type: 'Label + Icon', iconPosition: 'Leading' },
  parameters: {
    docs: { description: { story: 'Tamaño pequeño: 32px, radius 100px (pill), font 12px.' } },
  },
}

// ─── States ────────────────────────────────────────────────────────────────

export const StateDefault: Story = {
  name: 'State / Default',
  args: { state: 'Default' },
}

export const StateHover: Story = {
  name: 'State / Hover',
  args: { state: 'Hover' },
  parameters: {
    docs: { description: { story: 'Simula el estado :hover. Primary: pitufo-60 (60% opacidad).' } },
  },
}

export const StatePressed: Story = {
  name: 'State / Pressed',
  args: { state: 'Pressed' },
  parameters: {
    docs: { description: { story: 'Simula el estado :active con overlay misc/pressed.' } },
  },
}

export const StateDisabled: Story = {
  name: 'State / Disabled',
  args: { state: 'Disabled' },
  parameters: {
    docs: {
      description: {
        story:
          '⚠️ Disabled sin explicación visible — advertir al diseñador antes de implementar.',
      },
    },
  },
}

// ─── Types ─────────────────────────────────────────────────────────────────

export const TypeLabelIcon: Story = {
  name: 'Type / Label + Icon',
  args: { type: 'Label + Icon', iconPosition: 'Leading' },
}

export const TypeLabelIconTrailing: Story = {
  name: 'Type / Label + Icon (Trailing)',
  args: { type: 'Label + Icon', iconPosition: 'Trailing' },
}

export const TypeLabel: Story = {
  name: 'Type / Label',
  args: { type: 'Label', iconPosition: 'None' },
}

export const TypeIcon: Story = {
  name: 'Type / Icon',
  args: { type: 'Icon', iconPosition: 'None' },
  parameters: {
    docs: {
      description: {
        story:
          '⚠️ Solo si espacio reducido Y la acción es universalmente reconocible. Siempre usar `label` como aria-label.',
      },
    },
  },
}

export const TypeLoading: Story = {
  name: 'Type / Loading',
  args: { type: 'Loading' },
  parameters: {
    docs: {
      description: { story: 'Estado de carga. Nunca añadir spinner por encima — usar este type.' },
    },
  },
}

// ─── Combinaciones de Priority × State ────────────────────────────────────

export const AllPrioritiesDefault: Story = {
  name: 'All priorities / Default',
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button {...args} priority="Primary" />
      <Button {...args} priority="Secondary" />
      <Button {...args} priority="Tertiary" />
    </div>
  ),
  args: { state: 'Default', type: 'Label', iconPosition: 'None', size: 'L' },
}

export const AllPrioritiesHover: Story = {
  name: 'All priorities / Hover',
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button {...args} priority="Primary" />
      <Button {...args} priority="Secondary" />
      <Button {...args} priority="Tertiary" />
    </div>
  ),
  args: { state: 'Hover', type: 'Label', iconPosition: 'None', size: 'L' },
}

export const AllPrioritiesDisabled: Story = {
  name: 'All priorities / Disabled',
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button {...args} priority="Primary" />
      <Button {...args} priority="Secondary" />
      <Button {...args} priority="Tertiary" />
    </div>
  ),
  args: { state: 'Disabled', type: 'Label', iconPosition: 'None', size: 'L' },
}

// ─── Combinaciones de Size × Priority ─────────────────────────────────────

export const AllSizes: Story = {
  name: 'All sizes / Primary',
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button {...args} size="L" label="Size L" />
      <Button {...args} size="M" label="Size M" />
      <Button {...args} size="S" label="Size S" />
    </div>
  ),
  args: { priority: 'Primary', type: 'Label', iconPosition: 'None', state: 'Default' },
}

// ─── Patrón: Save / Cancel ─────────────────────────────────────────────────

export const PatternSaveCancel: Story = {
  name: 'Pattern / Save — Cancel',
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} priority="Tertiary" label="Cancelar" type="Label" iconPosition="None" />
      <Button {...args} priority="Primary" label="Guardar" type="Label" iconPosition="None" />
    </div>
  ),
  args: { size: 'L', state: 'Default' },
  parameters: {
    docs: {
      description: {
        story: 'Patrón Guardar/Cancelar: Primary + Tertiary. Nunca dos Primary juntos.',
      },
    },
  },
}
