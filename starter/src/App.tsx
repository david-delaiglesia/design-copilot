import { useState } from 'react'
import { TabBar } from '@ds/TabBar'

// ─── Iconos placeholder ─────────────────────────────────────────────────────
// El copilot los reemplazará con los iconos correctos para cada proyecto

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AppLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="var(--colors\/pitufo-100)" />
      <path d="M12 24L24 12L36 24L24 36L12 24Z" fill="var(--label\/oncolor)" />
    </svg>
  )
}

// ─── Tabs ────────────────────────────────────────────────────────────────────
// El copilot añadirá las tabs reales al construir las pantallas

const tabs = [
  { id: 'home', label: 'Inicio', icon: <HomeIcon /> },
]

// ─── App ─────────────────────────────────────────────────────────────────────

function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <>
      {/* El copilot irá añadiendo pantallas aquí */}
      {activeTab === 'home' && (
        <div style={{
          padding: '32px 24px',
          color: 'var(--label\/tertiary)',
          fontSize: 16,
          textAlign: 'center',
          marginTop: 80,
        }}>
          Describe la pantalla que necesitas en el chat.
        </div>
      )}

      <TabBar
        tabs={tabs}
        activeTabId={activeTab}
        onTabChange={setActiveTab}
        logo={<AppLogo />}
      />
    </>
  )
}

export default App
