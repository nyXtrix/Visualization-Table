import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VisualDashboardManagement from './features/VisualDashboardManagement'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VisualDashboardManagement />
  </StrictMode>,
)
