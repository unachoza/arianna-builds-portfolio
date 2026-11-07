import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Hydrate the prerendered markup in production; fall back to a fresh render
// (e.g. the Vite dev server, which ships an empty #root).
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
