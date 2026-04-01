import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../../../ds/src/tokens/tokens.css'
import './global.css'

document.documentElement.setAttribute('data-theme', 'dark')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
