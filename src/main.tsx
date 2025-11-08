import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './polyfills'
import './index.css'
import App from './App.tsx'

// Auto-connect wallet on page load
import { config } from './wagmiConfig'
import { reconnect } from '@wagmi/core'

// Try to reconnect to previously connected wallets
reconnect(config).catch((error) => {
  console.log('Auto-reconnect failed:', error)
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)