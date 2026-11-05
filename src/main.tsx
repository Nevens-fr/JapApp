import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Router from './app/router'
import { PersistenceProvider } from './database/local/PersistenceProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PersistenceProvider>
        <Router />
      </PersistenceProvider>
    </BrowserRouter>
  </StrictMode>,
)
