import React, { useEffect } from 'react'
import type { Preview, Decorator } from '@storybook/react-vite'
import '../src/tokens/tokens.css'

// ─── Theme global ──────────────────────────────────────────────────────────
// Añade el botón de tema a la toolbar de Storybook.
// Aplica data-theme="dark"|"light" en <html> para que los tokens CSS cambien.

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'DS theme (dark / light)',
    defaultValue: 'dark',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'dark', icon: 'moon', title: 'Dark' },
        { value: 'light', icon: 'sun', title: 'Light' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
}

// ─── Theme decorator ───────────────────────────────────────────────────────
// Setea data-theme en <html> y adapta el fondo del canvas automáticamente.

// Valores exactos del token background/primary en cada tema (confirmado en Figma)
const BACKGROUNDS: Record<string, string> = {
  dark: '#101010',
  light: '#e4e6e7',
}

const ThemeDecorator: Decorator = (Story, context) => {
  const theme = (context.globals.theme as string) ?? 'dark'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.body.style.backgroundColor = BACKGROUNDS[theme] ?? BACKGROUNDS.dark
    return () => {
      document.documentElement.removeAttribute('data-theme')
      document.body.style.backgroundColor = ''
    }
  }, [theme])

  return <Story />
}

export const decorators = [ThemeDecorator]

// ─── Preview config ────────────────────────────────────────────────────────

const preview: Preview = {
  parameters: {
    // Desactivamos backgrounds addon — el tema ya gestiona el fondo.
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
