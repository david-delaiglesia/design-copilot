import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'
import type { CardProps } from './Card'

// ─── Meta ──────────────────────────────────────────────────────────────────

const meta: Meta<typeof Card> = {
  title: 'DS / Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Card** — Nodo Figma: \`3806:22512\` (archivo \`FEljlfuJJLO8TzfwShLKoR\`)

### Reglas críticas (CLAUDE.md)
- **No anidar** Cards dentro de otras Cards
- **No añadir botones** dentro del slot de contenido
- \`height="2"\` siempre que el brief incluya contenido en el slot
- Si el brief no especifica si es clickable o informativa → preguntar al diseñador
- Anchura en mobile siempre variable — nunca fijar width
        `,
      },
    },
  },
  argTypes: {
    header: {
      control: 'boolean',
      description: 'Muestra el header (título + icono + chevron)',
      table: { defaultValue: { summary: 'true' } },
    },
    navigation: {
      control: 'boolean',
      description: 'Card clickable completa. Muestra chevron ›.',
      table: { defaultValue: { summary: 'true' } },
    },
    showIcon: {
      control: 'boolean',
      description: 'Muestra icono a la izquierda del título.',
      table: { defaultValue: { summary: 'true' } },
    },
    showContent: {
      control: 'boolean',
      description: 'Muestra el slot de contenido. Requiere height="2".',
      table: { defaultValue: { summary: 'false' } },
    },
    height: {
      control: 'select',
      options: ['1', '2', '3'],
      description: '1=solo título · 2=título+contenido · 3=título+subtítulo',
      table: { defaultValue: { summary: '1' } },
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carga — muestra skeleton.',
      table: { defaultValue: { summary: 'false' } },
    },
    title: { control: 'text' },
    subtitle: {
      control: 'text',
      description: 'Solo visible en height="3".',
    },
    icon: { control: false },
    image: {
      control: 'text',
      description: 'URL de imagen 32×32 (h1 y h3). Tiene prioridad sobre icon.',
    },
    imageAlt: { control: 'text' },
    imageShape: {
      control: 'radio',
      options: ['round', 'square'],
      description: '"round" → círculo completo | "square" → border-radius 8px',
      table: { defaultValue: { summary: 'round' } },
    },
    content: { control: false },
    onClick: { action: 'clicked' },
  },
  args: {
    header: true,
    navigation: true,
    showIcon: true,
    showContent: false,
    height: '1',
    loading: false,
    title: 'Title',
  },
}

export default meta
type Story = StoryObj<typeof Card>

// ─── Playground ─────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: '⚙️ Playground',
}

// ─── Height 1 — solo título ──────────────────────────────────────────────────

export const Height1NavIcon: Story = {
  name: 'Height 1 / Nav + Icon',
  args: { height: '1', navigation: true, showIcon: true },
}

export const Height1NavNoIcon: Story = {
  name: 'Height 1 / Nav, sin icono',
  args: { height: '1', navigation: true, showIcon: false },
}

export const Height1NoNavIcon: Story = {
  name: 'Height 1 / Informativa + Icon',
  args: { height: '1', navigation: false, showIcon: true },
}

export const Height1NoNavNoIcon: Story = {
  name: 'Height 1 / Informativa, sin icono',
  args: { height: '1', navigation: false, showIcon: false },
}

// ─── Height 3 — título + subtítulo ──────────────────────────────────────────

export const Height3NavIcon: Story = {
  name: 'Height 3 / Nav + Icon',
  args: {
    height: '3',
    navigation: true,
    showIcon: true,
    title: 'Title',
    subtitle: 'Subtitle',
  },
}

export const Height3NavNoIcon: Story = {
  name: 'Height 3 / Nav, sin icono',
  args: {
    height: '3',
    navigation: true,
    showIcon: false,
    title: 'Title',
    subtitle: 'Subtitle',
  },
}

// ─── Height 2 — título + contenido ──────────────────────────────────────────

const SampleContent = () => (
  <div
    style={{
      width: '100%',
      height: 120,
      borderRadius: 8,
      background: 'var(--fills\\/primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--label\\/tertiary)',
      fontSize: 12,
    }}
  >
    slot de contenido
  </div>
)

export const Height2NavIcon: Story = {
  name: 'Height 2 / Nav + Icon + contenido',
  args: {
    height: '2',
    navigation: true,
    showIcon: true,
    showContent: true,
    content: <SampleContent />,
  },
  render: (args: CardProps) => <Card {...args} content={<SampleContent />} />,
}

export const Height2NavNoIcon: Story = {
  name: 'Height 2 / Nav, sin icono + contenido',
  args: {
    height: '2',
    navigation: true,
    showIcon: false,
    showContent: true,
  },
  render: (args: CardProps) => <Card {...args} content={<SampleContent />} />,
}

export const Height2NoNavIcon: Story = {
  name: 'Height 2 / Informativa + Icon + contenido',
  args: {
    height: '2',
    navigation: false,
    showIcon: true,
    showContent: true,
  },
  render: (args: CardProps) => <Card {...args} content={<SampleContent />} />,
}

export const Height2NoNavNoIcon: Story = {
  name: 'Height 2 / Informativa, sin icono + contenido',
  args: {
    height: '2',
    navigation: false,
    showIcon: false,
    showContent: true,
  },
  render: (args: CardProps) => <Card {...args} content={<SampleContent />} />,
}

export const Height2NoHeader: Story = {
  name: 'Height 2 / Sin header, solo contenido',
  args: {
    height: '2',
    header: false,
    navigation: false,
    showContent: true,
  },
  render: (args: CardProps) => <Card {...args} content={<SampleContent />} />,
}

// ─── Skeleton / Loading ──────────────────────────────────────────────────────

export const LoadingHeader: Story = {
  name: 'Loading / Solo header',
  args: {
    height: '1',
    navigation: false,
    showIcon: false,
    loading: true,
  },
}

export const LoadingHeaderContent: Story = {
  name: 'Loading / Header + contenido',
  args: {
    height: '2',
    navigation: false,
    showIcon: false,
    showContent: true,
    loading: true,
  },
}

export const LoadingContentOnly: Story = {
  name: 'Loading / Solo contenido',
  args: {
    height: '2',
    header: false,
    navigation: false,
    showContent: true,
    loading: true,
  },
}

// ─── Título largo (truncado) ─────────────────────────────────────────────────

export const LongTitle: Story = {
  name: 'Título largo — truncado con ellipsis',
  args: {
    height: '1',
    navigation: true,
    showIcon: true,
    title: 'Este es un título muy largo que debería truncarse con ellipsis',
  },
}

// ─── Avatar / Imagen ─────────────────────────────────────────────────────────

const AVATAR_URL = 'https://i.pravatar.cc/64'

export const Height1Avatar: Story = {
  name: 'Height 1 / Avatar',
  args: {
    height: '1',
    navigation: true,
    showIcon: true,
    title: 'María García',
    image: AVATAR_URL,
    imageAlt: 'Avatar María García',
  },
}

export const Height3Avatar: Story = {
  name: 'Height 3 / Avatar',
  args: {
    height: '3',
    navigation: true,
    showIcon: true,
    title: 'Juan López',
    subtitle: 'Conductor · Turno mañana',
    image: AVATAR_URL,
    imageAlt: 'Avatar Juan López',
  },
}

export const Height1AvatarSquare: Story = {
  name: 'Height 1 / Avatar cuadrado',
  args: {
    height: '1',
    navigation: true,
    showIcon: true,
    title: 'Matrícula 1234 ABC',
    image: AVATAR_URL,
    imageAlt: 'Foto vehículo',
    imageShape: 'square',
  },
}

export const Height3AvatarSquare: Story = {
  name: 'Height 3 / Avatar cuadrado',
  args: {
    height: '3',
    navigation: true,
    showIcon: true,
    title: 'Turismo Berlina',
    subtitle: 'Matrícula · 1234 ABC',
    image: AVATAR_URL,
    imageAlt: 'Foto vehículo',
    imageShape: 'square',
  },
}

export const AllAvatarVariants: Story = {
  name: 'Todas las variantes / Avatar',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      <Card height="1" navigation showIcon title="María García"
        image={AVATAR_URL} imageAlt="Avatar" imageShape="round" />
      <Card height="1" navigation showIcon title="Turismo Berlina"
        image={AVATAR_URL} imageAlt="Foto vehículo" imageShape="square" />
      <Card height="3" navigation showIcon title="Juan López"
        subtitle="Conductor · Turno mañana"
        image={AVATAR_URL} imageAlt="Avatar" imageShape="round" />
      <Card height="3" navigation showIcon title="Turismo Berlina"
        subtitle="Matrícula · 1234 ABC"
        image={AVATAR_URL} imageAlt="Foto vehículo" imageShape="square" />
      <Card height="3" navigation showIcon title="Sin foto"
        subtitle="Usa icono de fallback" />
    </div>
  ),
}

// ─── Grid de variantes ───────────────────────────────────────────────────────

export const AllHeight1Variants: Story = {
  name: 'Todas las variantes / Height 1',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      <Card height="1" navigation showIcon title="Nav + Icon" />
      <Card height="1" navigation showIcon={false} title="Nav, sin icono" />
      <Card height="1" navigation={false} showIcon title="Informativa + Icon" />
      <Card height="1" navigation={false} showIcon={false} title="Informativa, sin icono" />
    </div>
  ),
}

export const AllHeight3Variants: Story = {
  name: 'Todas las variantes / Height 3',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      <Card height="3" navigation showIcon title="Title" subtitle="Subtitle" />
      <Card height="3" navigation showIcon={false} title="Title" subtitle="Subtitle" />
    </div>
  ),
}

export const AllLoadingVariants: Story = {
  name: 'Todas las variantes / Loading',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      <Card height="1" navigation={false} showIcon={false} loading title="Title" />
      <Card height="2" navigation={false} showIcon={false} showContent loading title="Title" />
      <Card height="2" header={false} navigation={false} showContent loading title="Title" />
    </div>
  ),
}
